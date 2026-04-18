const { authenticator } = require('otplib');
const QRCode = require('qrcode');
import { supabaseAdmin } from './supabase-admin';

/**
 * Task 1: TOTP Setup Logic
 * Generates a Base32 secret and a QR code for Google Authenticator.
 */
export async function setupTOTP(userId, email) {
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(email, 'SYNTRY', secret);
  
  const qrCodeUrl = await QRCode.toDataURL(otpauth);

  // Store secret securely in private user_security table
  const { error } = await supabaseAdmin
    .from('user_security')
    .upsert({ 
      user_id: userId, 
      totp_secret: secret,
      totp_enabled: false, // Not enabled until first verification
      updated_at: new Date().toISOString()
    });

  if (error) throw error;

  return { secret, qrCodeUrl };
}

/**
 * Verifies the first TOTP code and enables 2FA.
 */
export async function verifyAndEnableTOTP(userId, token) {
  const { data: security } = await supabaseAdmin
    .from('user_security')
    .select('totp_secret')
    .eq('user_id', userId)
    .single();

  if (!security?.totp_secret) return false;

  const isValid = authenticator.check(token, security.totp_secret);

  if (isValid) {
    await supabaseAdmin
      .from('user_security')
      .update({ totp_enabled: true })
      .eq('user_id', userId);
  }

  return isValid;
}

/**
 * Task 2: SMS Fallback Logic
 * Sends a 6-digit OTP via SMS (Simulated via Flutterwave/Firebase API)
 */
export async function sendSMSOTP(userId, phoneNumber) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log(`[SYNTRY SECURE] Sending SMS OTP ${otp} to ${phoneNumber}...`);
    
    // In production: Use Firebase Auth or Flutterwave SMS API
    // await flutterwave.sms.send({ phone: phoneNumber, message: `Your SYNTRY code: ${otp}` });

    await supabaseAdmin
      .from('user_security')
      .update({ 
          sms_otp: otp, 
          sms_otp_expires: new Date(Date.now() + 5 * 60000).toISOString() // 5m expiry
      })
      .eq('user_id', userId);

    return true;
}

/**
 * Task 3: Transaction Guard
 * High-value move verification ( > 5000 GHS )
 */
export async function verifyTransaction2FA(userId, token, amount) {
    const { data: security } = await supabaseAdmin
      .from('user_security')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!security) return { success: false, error: 'Security profile not found' };

    // Rate Limiter Check (Task 4)
    if (security.failed_attempts >= 3) {
        const lockoutTime = new Date(security.last_failed_at).getTime() + (30 * 60000);
        if (Date.now() < lockoutTime) {
            return { success: false, error: 'Locked out. Retry in 30 minutes.' };
        } else {
            // Reset attempts after lockout
            await supabaseAdmin.from('user_security').update({ failed_attempts: 0 }).eq('user_id', userId);
        }
    }

    let isValid = false;

    // Prioritize Authenticator for High-Value moves
    if (amount > 5000 && security.totp_enabled) {
        isValid = authenticator.check(token, security.totp_secret);
    } else {
        // Fallback to SMS OTP
        isValid = token === security.sms_otp && new Date() < new Date(security.sms_otp_expires);
    }

    if (isValid) {
        await supabaseAdmin.from('user_security').update({ failed_attempts: 0 }).eq('user_id', userId);
        return { success: true };
    } else {
        const newAttempts = (security.failed_attempts || 0) + 1;
        await supabaseAdmin.from('user_security').update({ 
            failed_attempts: newAttempts,
            last_failed_at: new Date().toISOString()
        }).eq('user_id', userId);
        
        return { 
            success: false, 
            error: newAttempts >= 3 ? 'Max attempts reached. Locked for 30 min.' : 'Invalid code.' 
        };
    }
}
