import { NextResponse } from 'next/server';
import { verifyAndEnableTOTP } from '@/lib/security-engine';

export async function POST(request) {
  try {
    const { userId, token } = await request.json();
    const success = await verifyAndEnableTOTP(userId, token);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
