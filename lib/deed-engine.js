import crypto from 'crypto';

// Simulated Immutable Ledger Lock State
if (!global.lockedAudits) {
  global.lockedAudits = new Set();
}

/**
 * Generates the structured Digital Packet that meets Land Act 2020 standards
 * specifically bundled for the Ashifla-Otatten digital conveyancing audit.
 */
export function generateDeedSchema(plot, paymentDetails) {
  const timestamp = Date.now();
  
  // Geospatial Lock
  const geospatialLock = {
    lat: plot.lat || 5.6814,
    lng: plot.lng || -0.1149,
    coordHash: crypto.createHash('sha256').update(`${plot.lat || 5.6814},${plot.lng || -0.1149}`).digest('hex')
  };

  // Identity Hash (Simulated owner/CEO identity mapping)
  const identityHash = crypto.createHash('sha256').update(`Owner_Syntry_${plot.id}_${timestamp}`).digest('hex');

  // Compliance Proof (70% Statutory Premium)
  const complianceProof = {
    amountPaid: paymentDetails?.amount || (plot.value * 0.7),
    status: "70% PAID",
    actDirective: "Land Act 2020 (Act 1036) - March 11, 2026",
    receiptHash: crypto.createHash('sha256').update(`Receipt_${plot.id}_70pct`).digest('hex')
  };

  return {
    version: "Sovereign Link v1.0",
    plotId: plot.id,
    auditTimestamp: timestamp,
    geospatialLock,
    identityHash,
    complianceProof,
    registrar: "GELIS NextGen Oracle"
  };
}

/**
 * Locks the plot data to simulate writing to an immutable ledger.
 * Once locked, the data becomes Read-Only to prevent "Double-Sales".
 */
export function lockSovereignAudit(plotId) {
  if (global.lockedAudits.has(plotId)) {
    return { success: false, error: "Plot is already irrevocably locked on the ledger." };
  }
  
  global.lockedAudits.add(plotId);
  return { success: true, message: "Immutable Lock Applied." };
}

/**
 * Verifies if a plot has been locked.
 */
export function isAuditLocked(plotId) {
  return global.lockedAudits.has(plotId);
}
