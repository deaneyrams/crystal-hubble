import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone } = body;

    // Simulate validation
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required for 2FA' }, { status: 400 });
    }

    // Secure Logging (Masked Data)
    const maskedPhone = phone.length > 4 ? `+*** *** **${phone.slice(-4)}` : '***';
    console.log(`\n[SYNTRY AUTOMATION] Sending Sovereign Vault Activation to ${maskedPhone}...`);
    console.log(`
Welcome to the Exchange, Pioneer! 🇬🇭

Your private Sovereign Vault is now active at Syntry.co.

Your account is currently at 20% Verification. To unlock full 3D Ground-Truth maps and our litigation-free legal reports, please finish your profile here: https://syntry.co/dashboard

What's waiting for you:
🛡️ Node 08 Verified Assets: Litigation-free plots in Ashifla & Pokuase.
🔒 Secure Escrow: Your funds stay in the Vault until you get your site plan.
💎 Sovereign Status: Complete your first reservation to earn your Digital Certificate.

I am your dedicated Syntry Advisor. If you have any questions about our Ashifla-Otatten launch or our $3,318 Fractional Packets, just reply to this chat.

The future of land is liquid. Welcome to Syntry.
    `);

    // Mock Code for UI Flow
    const mockCode = '080808';

    return NextResponse.json({ 
      success: true, 
      message: 'Secure activation dispatched.',
      debug_code: mockCode 
    });

  } catch (error) {
    console.error('WhatsApp dispatch failed:', error);
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 500 });
  }
}
