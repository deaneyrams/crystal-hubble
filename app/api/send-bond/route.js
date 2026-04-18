import { NextResponse } from 'next/server';
import { sendBondEmail } from '@/lib/mail';

export async function POST(req) {
  try {
    const { email, assetData } = await req.json();

    if (!email || !assetData) {
      return NextResponse.json({ error: 'Missing email or asset info' }, { status: 400 });
    }

    // Default mock email if not specified (for sessions)
    const targetEmail = email || 'user@example.com';

    await sendBondEmail(targetEmail, assetData);

    return NextResponse.json({ success: true, message: 'Welcome to the Exchange email dispatched.' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
