import { NextResponse } from 'next/server';
import { setupTOTP } from '@/lib/security-engine';

export async function POST(request) {
  try {
    const { userId, email } = await request.json();
    const setup = await setupTOTP(userId, email);
    return NextResponse.json(setup);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
