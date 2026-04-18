import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    if (endpointSecret && sig) {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } else {
      // Fallback for development/testing without secrets
      event = JSON.parse(payload);
      console.warn('⚠️ Webhook signature verification skipped. Use only in development.');
    }
  } catch (err) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const plotId = session.metadata?.plot_id;

    console.log(`🔔 Payment received for plot: ${plotId}`);

    if (plotId) {
      try {
        // [MISSION: PERSISTENT GOLD STATE]
        // Update the plots table in Supabase: status = 'reserved'
        // and link the transaction via stripe_payment_id
        const { error } = await supabaseAdmin
          .from('plots')
          .update({ 
            status: 'escrowed',
            stripe_payment_id: session.id // Linking the transaction for audits
          })
          .eq('id', plotId);

        if (error) {
          console.error(`❌ Database Update Error: ${error.message}`);
          throw error;
        }

        console.log(`✅ Plot ${plotId} status set to 'escrowed'`);
      } catch (dbError) {
        return NextResponse.json({ error: 'Failed to update plot status' }, { status: 500 });
      }
    } else {
      console.warn('⚠️ No plot_id found in session metadata');
    }
  }

  return NextResponse.json({ received: true });
}

