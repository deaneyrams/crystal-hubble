/**
 * Syntry 2026 Stamping & Taxation Engine
 */

export function calculateStampDuty(valuation) {
  // 2026 GRA 1% Ad Valorem Rate
  return valuation * 0.01;
}

export function calculateVATAndLevies(valuation) {
  // 20% Unified (15% VAT + 5% Levies) for developer tier
  const totalRate = 0.20;
  const vatRate = 0.15;
  const levyRate = 0.05;

  return {
    vatPercentage: 20,
    totalVatAmount: valuation * totalRate,
    breakdown: {
      vat: valuation * vatRate,
      levies: valuation * levyRate,
    }
  };
}

export function generateSovereignHash() {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `SYN-DEED-2026-${randomSuffix}`;
}
