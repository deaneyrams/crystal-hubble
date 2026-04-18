import { supabase } from './supabase';

/**
 * Task 1: Asymmetric Ledger System
 * Processes a variable payment and distributes it to Absa (Senior) and Investors (Junior).
 */
export async function processAsymmetricPayment(mortgageId: string, amountPaid: number) {
  // 1. Fetch Mortgage State
  const { data: mortgage, error: mortgageError } = await supabase
    .from('mortgages')
    .select('*')
    .eq('id', mortgageId)
    .single();

  if (!mortgage || mortgageError) throw new Error("Mortgage sequence not found.");

  // 2. Calculate Monthly Interest Due
  // Simplified calculation (Annual / 12)
  const monthlyRate = (mortgage.interest_rate_annual / 100) / 12;
  const interestDue = mortgage.remaining_principal * monthlyRate;
  
  // 3. Apply Interest Distribution (Split by Share %)
  let interestPaidAbsa = Math.min(interestDue * (mortgage.absa_share_percent / 100), amountPaid);
  let remainingPaid = amountPaid - interestPaidAbsa;
  
  let interestPaidInvestors = Math.min(interestDue * (mortgage.investor_share_percent / 100), remainingPaid);
  remainingPaid -= interestPaidInvestors;
  
  // 4. Surplus becomes Principal Reduction
  const principalApplied = Math.min(mortgage.remaining_principal, remainingPaid);
  const newPrincipal = mortgage.remaining_principal - principalApplied;

  // 5. Update Ledger (Atomic Transaction in SQL or separate calls for sandbox)
  const { error: ledgerError } = await supabase.from('mortgage_payments').insert({
    mortgage_id: mortgageId,
    amount_paid: amountPaid,
    interest_paid_absa: interestPaidAbsa,
    interest_paid_investors: interestPaidInvestors,
    principal_applied: principalApplied,
    transaction_hash: `SYN-TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  });

  // 6. Update Primary Balance
  await supabase.from('mortgages').update({
    remaining_principal: newPrincipal,
    updated_at: new Date().toISOString()
  }).eq('id', mortgageId);

  // 7. Dispatch Yield to Investors
  if (interestPaidInvestors > 0) {
    await distributeYield(mortgageId, interestPaidInvestors);
  }

  return {
    success: true,
    summary: {
       interestPaidAbsa,
       interestPaidInvestors,
       principalApplied,
       newBalance: newPrincipal
    }
  };
}

/**
 * Distributes Yield to all participating investors in the junior tranche.
 */
async function distributeYield(mortgageId: string, amountToDistribute: number) {
   // In production, split this between multiple users based on their 'packets' owned.
   // Simulation: Disburse to one primary investor wallet for demonstration
   console.log(`Disbursing yield: GH₵${amountToDistribute} to junior tranche investors...`);
   // Logic for wallet credits would go here
}

/**
 * Task 2: Absa Bank & Collateral Integration
 * Connects to Absa Developer Portal and monitors ground-truth health.
 */
export async function runCollateralHealthCheck(mortgageId: string) {
  const { data: mortgage } = await supabase.from('mortgages').select('*, plots(*)').eq('id', mortgageId).single();
  if (!mortgage) return;

  // Simulate API handshake with Ministerial Node 08
  // Check if current 'plots.status' has changed to 'disputed' or contains and 'alert'
  const isTitleSecure = mortgage.plots.status === 'verified';
  const lastUpdateDate = new Date(mortgage.plots.updated_at);
  const checkFreshness = (new Date().getTime() - lastUpdateDate.getTime()) / (1000 * 3600 * 24); // days

  let healthStatus = 'green';
  if (!isTitleSecure || checkFreshness > 30) {
     healthStatus = 'caution';
     // Trigger automated alert (Simulation)
     console.warn(`[Syntry Guardian] CAUTION: Ground-Truth deviation detected for Mortgage ${mortgageId}`);
  }

  await supabase.from('mortgages').update({
     collateral_status: healthStatus,
     last_collateral_check: new Date().toISOString()
  }).eq('id', mortgageId);

  return healthStatus;
}
