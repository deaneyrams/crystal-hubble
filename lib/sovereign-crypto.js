"use server";

import crypto from 'crypto';


// Use a distinct secret for URL signing (in production, use an environment variable)
const SOVEREIGN_SECRET = process.env.SOVEREIGN_SECRET || 'syntry-2026-s0v3r3ign-k3y';

// In-memory set to track consumed "One-Time" nonces.
// Note: In a real production environment with multiple serverless instances, 
// this would need to be stored in Redis or Database to ensure it works across all edge nodes.
// For Next.js dev server, global helps persist across Hot Module Reloads.
if (!global.usedSovereignTokens) {
  global.usedSovereignTokens = new Set();
}

/**
 * Generates a signed, one-time-use token for a specific plot.
 */
export async function generateSovereignToken(plotId) {
  const timestamp = Date.now();
  const exp = timestamp + (24 * 60 * 60 * 1000); // 24 hours
  const nonce = crypto.randomBytes(16).toString('hex');
  const oneTime = true;

  const payload = {
    plotId,
    timestamp,
    exp,
    nonce,
    oneTime
  };

  const payloadString = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto.createHmac('sha256', SOVEREIGN_SECRET)
                          .update(payloadString)
                          .digest('base64url'); // base64url is URL-safe

  // The generated token is the base64 payload and the signature separated by an underscore
  return `${payloadString}_${signature}`;
}

/**
 * Validates the token and consumes it if it's a one-time token.
 * Returns the decoded payload if valid, or an error object if invalid/expired/consumed.
 */
export async function verifyAndConsumeToken(token) {
  if (!token || typeof token !== 'string') {
     return { valid: false, error: 'Invalid token format' };
  }

  const parts = token.split('_');
  if (parts.length !== 2) {
    return { valid: false, error: 'Malformed token' };
  }

  const [payloadString, signature] = parts;

  // Re-verify the signature
  const expectedSignature = crypto.createHmac('sha256', SOVEREIGN_SECRET)
                                  .update(payloadString)
                                  .digest('base64url');
  
  // Use timingSafeEqual to prevent timing attacks
  const buf1 = Buffer.from(signature);
  const buf2 = Buffer.from(expectedSignature);

  if (buf1.length !== buf2.length || !crypto.timingSafeEqual(buf1, buf2)) {
     return { valid: false, error: 'Signature verification failed. The physical linkage is broken.' };
  }

  try {
     const payloadJson = Buffer.from(payloadString, 'base64').toString('utf8');
     const payload = JSON.parse(payloadJson);

     // Check Expiry (TTL)
     if (Date.now() > payload.exp) {
        return { valid: false, error: 'Access Denied: This Sovereign Link has breached its 24-hour TTL and is permanently expired.' };
     }

     // Check One-Time Use Consumption
     if (payload.oneTime) {
         if (global.usedSovereignTokens.has(payload.nonce)) {
             return { valid: false, error: 'Access Denied: 🛡️ SOVEREIGN SECURITY - This One-Time Link has already been viewed and is now permanently sealed.' };
         }
         
         // Consume the token (record the nonce)
         global.usedSovereignTokens.add(payload.nonce);
     }

     return { valid: true, payload };
     
  } catch (e) {
     return { valid: false, error: 'Failed to read payload' };
  }
}
