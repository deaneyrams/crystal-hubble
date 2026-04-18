export async function submitToGelis(deedHash, plotData) {
  // Simulate network latency for the secure handshake
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Format the .syntry payload specifically for the GELIS 2.0 Electronic Portal
  const gelisPayload = {
    registryEndpoint: "gelis-api.lands.gov.gh/v2/enrollment",
    primaryKey: deedHash,
    payloadVersion: "Syntry-Phase5-1.0",
    submissionTimestamp: new Date().toISOString(),
    assetData: {
      geospatialAnchor: "1090000 N / 381000 E", 
      acreage: "49.51 Acres",
      marketValuation: plotData.value,
      status: "MINTED - IMMUTABLE"
    },
    clearances: {
      legalAudit: true,
      taxDutyCleared: true,
      graConfirmation: "GRA-2026-OK"
    }
  };

  // Simulate a successful Lands Commission enrollment
  const enrollmentId = `GELIS-ENR-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return {
    success: true,
    enrollmentId,
    timestamp: gelisPayload.submissionTimestamp,
    submittedPayload: gelisPayload,
    message: "Handshake Complete. Asset pending Final Digital Gazetting."
  };
}
