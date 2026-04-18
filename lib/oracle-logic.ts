/**
 * Phase 8: Sovereign AI Oracle Logic
 * Predictive yield forecasting and risk mitigation protocols.
 */

// Simulates checking if coordinates are near West Hills Mall (1090000/381000 approximate bounds)
function isNearWestHills(coordinates) {
  // In a real system, this would use Turf.js or PostGIS.
  // For the sandbox, we do a basic string match to the Ashifla-Otatten anchor.
  return coordinates.includes("1090000 N") && coordinates.includes("381000 E");
}

export function getAppreciationForecast(currentValue, coordinates) {
  // 1. Baseline Expansion Rate for Greater Accra (6-10%)
  const baseRate = 0.08; // 8% average
  
  // 2. The West Hills Bonus (+2%)
  const hasInfrastructureBonus = isNearWestHills(coordinates);
  const totalAnnualRate = hasInfrastructureBonus ? baseRate + 0.02 : baseRate;

  // 3. Extrapolate 36 Months (3 Years Compound Interest)
  const projectionMonths = 36;
  let projectedValue = currentValue;
  
  const monthlyDataPoints = [];
  
  // Roughly compound monthly for the chart
  const monthlyRate = totalAnnualRate / 12;
  
  for (let i = 0; i <= projectionMonths; i++) {
    monthlyDataPoints.push({
      month: i,
      label: `Month ${i}`,
      value: Math.round(projectedValue)
    });
    projectedValue = projectedValue * (1 + monthlyRate);
  }

  return {
    success: true,
    baseValuation: currentValue,
    targetValuation: Math.round(projectedValue), // Should hit ~$415k for a $331k input over 3 years
    annualGrowthRate: totalAnnualRate * 100, // e.g., 10%
    infrastructureBonusApplied: hasInfrastructureBonus,
    timeframeMonths: projectionMonths,
    chartData: monthlyDataPoints
  };
}

export function getOracleRiskAnalysis(litigationOverlapPercent) {
  if (litigationOverlapPercent === 0) {
    return {
      level: "LOW-RISK",
      message: "✅ SECURITY ALERT: 0% Litigative Overlap. Asset is in the Top 5% of Secure Accra Land."
    };
  } else if (litigationOverlapPercent > 0 && litigationOverlapPercent <= 10) {
    return {
      level: "MODERATE-RISK",
      message: "⚠️ WARNING: Boundary disputes detected nearby. Proceed with Title Indemnity Insurance."
    };
  } else {
    return {
      level: "HIGH-RISK",
      message: "⛔ CRITICAL: Active E-Justice Court Injunction overlap. Do not proceed to escrow."
    };
  }
}

export function getOracleRecommendation(plotStatus) {
  if (plotStatus === 'IN-REGISTRATION' || plotStatus === 'CERTIFICATED' || plotStatus === 'MINTED - IMMUTABLE') {
    return "Oracle Move: Asset is ready for Phase 7 fractionalization. Recommending a $5,000 Minimum Entry to capture diaspora capital flows.";
  } else if (plotStatus === 'verified' || plotStatus === 'escrowed') {
    return "Oracle Move: Phase 4 compliance threshold met. Immediate recommendation to Mint Digital Packets to lock geospatial audit trail.";
  } else {
    return "Oracle Move: Asset is pending. Recommending pushing 70% Premia acquisition to clear Phase 1 regulatory escrow.";
  }
}
