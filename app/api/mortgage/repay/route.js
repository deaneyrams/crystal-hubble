import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * Task 2: /api/mortgage/repay Endpoint
 * Logic: Apply an asymmetric payment waterfall (Interest first, then Principal).
 * Standard APR: 27.5%
 */
export async function POST(request) {
  try {
    const { userId, plotId, amount } = await request.json();

    if (!userId || !plotId || !amount) {
      return NextResponse.json({ error: 'Payload missing critical node data' }, { status: 400 });
    }

    // 1. Fetch current mortgage state
    const { data: mortgage, error: fetchError } = await supabaseAdmin
      .from('mortgages')
      .select('*')
      .eq('plot_id', plotId)
      .single();

    if (fetchError || !mortgage) {
      if (plotId === 'SYN-VLT-08' || userId === 'demo-user-123') {
        // Demo Fallback
        const demoInterest = 1250.00;
        let interestPaid = Math.min(amount, demoInterest);
        let principalPaid = amount > demoInterest ? amount - demoInterest : 0;
        return NextResponse.json({ 
          success: true, 
          applied_to_interest: interestPaid, 
          applied_to_principal: principalPaid, 
          remaining_balance: 85200.00 - principalPaid 
        });
      }
      return NextResponse.json({ error: 'Mortgage Node not found' }, { status: 404 });
    }

    // 2. Node 08 Litigation Check (Sad Path Handling)
    if (mortgage.litigation_status === 'dispute') {
      return NextResponse.json({ error: 'NODE 08: Repayment locked due to land dispute' }, { status: 403 });
    }

    // 3. Asymmetric Waterfall Calculation
    // Total amount = Interest Paid + Principal Reduction
    const interestDue = mortgage.interest_due || 0;
    let interestPaid = 0;
    let principalPaid = 0;

    if (amount <= interestDue) {
      interestPaid = amount;
    } else {
      interestPaid = interestDue;
      principalPaid = amount - interestDue;
    }

    // Update remaining balance
    const newBalance = (mortgage.remaining_balance || 0) - principalPaid;
    const newInterestDue = interestDue - interestPaid;

    // 4. Persistence
    const { error: updateError } = await supabaseAdmin
      .from('mortgages')
      .update({
        remaining_balance: newBalance,
        interest_due: newInterestDue,
        last_payment_at: new Date().toISOString()
      })
      .eq('id', mortgage.id);

    if (updateError) throw updateError;

    // 5. Broadcast to Big Investors (Email/SMS simulation)
    console.log(`[SYNTRY BROADCAST] Payment of GH₵${amount} received. Senior Interest: GH₵${interestPaid}, Junior Principal: GH₵${principalPaid}. Total ARR updated.`);

    return NextResponse.json({ 
      success: true, 
      applied_to_interest: interestPaid, 
      applied_to_principal: principalPaid, 
      remaining_balance: newBalance 
    });

  } catch (error) {
    console.error('Mortgage Repay Error:', error);
    return NextResponse.json({ error: 'Sync error with Security Node' }, { status: 500 });
  }
}
