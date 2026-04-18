/**
 * Phase 7: SEC Sandbox KYC Engine
 * Enforces "Accredited" vs "Retail" gating for Syntry fractional assets.
 */

export async function validateGhanaCard(ghanaCardId) {
  // Simulate API delay to National Identification Authority
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Basic format check for Ghana Card (e.g., GHA-123456789-0)
  const isValidFormat = /^GHA-\d{9}-\d$/.test(ghanaCardId);
  if (!isValidFormat) {
    return {
      success: false,
      message: "Invalid Ghana Card Format. Expected format: GHA-123456789-0",
      tier: null,
      kycHash: null
    };
  }

  // Simulate SEC Sandbox Logic
  // For the sandbox, any valid card ending in '1' or '2' is "Accredited".
  // Everything else is flagged as "Retail".
  const lastDigit = parseInt(ghanaCardId.slice(-1));
  const isAccredited = lastDigit === 1 || lastDigit === 2;

  const mockName = `Investor-${ghanaCardId.split('-')[1].substring(0, 4)}`;
  const kycHash = `KYC-${Math.floor(100000 + Math.random() * 900000)}-2026`;

  return {
    success: true,
    investorName: mockName,
    tier: isAccredited ? "ACCREDITED" : "RETAIL",
    kycHash,
    message: isAccredited 
      ? "KYC Verified: Eligible for Sandbox Participation" 
      : "Access Denied: SEC Pilot restricted to Accredited Investors only."
  };
}
