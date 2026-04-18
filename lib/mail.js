import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendBondEmail = async (to, assetData) => {
  const { propertyName, acquisitionPercent, assetId, bondPdfBase64 } = assetData;

  const msg = {
    to,
    from: 'exchange@syntry.co', // Use a verified sender
    subject: `Sovereign Allocation Captured: ${propertyName}`,
    text: `Welcome to the Exchange. Your allocation of ${acquisitionPercent}% for asset ${assetId} has been securely vaulted.`,
    html: `
      <div style="background-color: #0D1B2A; color: #FFFFFF; font-family: sans-serif; padding: 40px; border-radius: 20px;">
        <h1 style="color: #D4AF37; text-transform: uppercase; letter-spacing: 2px;">Welcome to the Exchange</h1>
        <p style="font-size: 18px; color: #94A3B8;">Asset Allocation Confirmed: <strong style="color: #FFFFFF;">${propertyName}</strong></p>
        
        <div style="background-color: #162A3E; padding: 20px; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2); margin: 20px 0;">
          <p style="margin: 5px 0; font-size: 14px; color: #94A3B8;">Acquisition Status: <span style="color: #FFFFFF;">${acquisitionPercent}% Statutory Fraction</span></p>
          <p style="margin: 5px 0; font-size: 14px; color: #94A3B8;">Vault Node ID: <span style="color: #FFFFFF;">${assetId}</span></p>
        </div>

        <p style="font-size: 14px; color: #94A3B8; line-height: 1.6;">
          Your digital indenture and 3D Asset Bond are attached to this message. You can view your live asset monitor at any time by entering your Sovereign Vault.
        </p>

        <a href="https://syntry.co/vault" style="display: inline-block; background-color: #D4AF37; color: #0D1B2A; text-decoration: none; padding: 15px 30px; border-radius: 50px; font-weight: bold; text-transform: uppercase; font-size: 12px; margin-top: 20px;">
          Enter the Vault →
        </a>
      </div>
    `,
    attachments: [
      {
        content: bondPdfBase64,
        filename: `Sovereign_Bond_${assetId}.pdf`,
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ],
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw error;
  }
};
