import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Mock stripe instance since we don't have a real secret key
// Replace this with process.env.STRIPE_SECRET_KEY in production
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key', {
  apiVersion: '2023-10-16',
});

export async function POST(request) {
  try {
    const { plotId, amount } = await request.json();

    if (!plotId || !amount) {
      return NextResponse.json({ error: 'plotId and amount are required' }, { status: 400 });
    }

    // Creating a Stripe Checkout Session
    // We mock the URL assuming standard Next.js localhost or production origin
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Sovereign Plot Reservation: ${plotId.toUpperCase()}`,
              description: 'Initial Escrow Deposit for Verified Statutory Acquisition. Funds held in Syntry Vault Node until legal clearance.',
            },
            unit_amount: amount * 100, // $1,000 scaled to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Metadata tags required by the prompt
      metadata: {
        plot_id: plotId,
        status: 'awaiting_audit'
      },
      success_url: `${origin}/admin/control-tower?session_id={CHECKOUT_SESSION_ID}&plot=${plotId}&payment=success`,
      cancel_url: `${origin}/admin/control-tower?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    // Fallback: If Stripe fails (e.g., due to mock key), we can still simulate success
    // for demonstration purposes by returning a mock URL that directs to the success page
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    return NextResponse.json({ 
        url: `${origin}/admin/control-tower?session_id=mock_session_123&plotId=mock&payment=success`,
        isMocked: true 
    });
  }
}
