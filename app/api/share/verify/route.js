import { NextResponse } from 'next/server';
import { verifyAndConsumeToken } from '@/lib/sovereign-crypto';

export async function POST(request) {
  try {
    const { token } = await request.json();
    if (!token) return NextResponse.json({ valid: false, error: 'Token missing' }, { status: 400 });

    const result = await verifyAndConsumeToken(token);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ valid: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
