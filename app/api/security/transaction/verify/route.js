import { NextResponse } from 'next/server';
import { verifyTransaction2FA } from '@/lib/security-engine';

export async function POST(request) {
  try {
    const { userId, token, amount } = await request.json();

    // Task 1: Sandbox Testing Mode for 2FA
    if (process.env.NODE_ENV === 'development' && token === '773901') {
      console.log('[SECURITY SANDBOX] Bypass active for 773901 on localhost');
      return NextResponse.json({ success: true, sandbox: true });
    }

    const result = await verifyTransaction2FA(userId, token, amount);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
