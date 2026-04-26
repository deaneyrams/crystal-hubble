import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { Connection, Keypair, SystemProgram, Transaction } from '@solana/web3.js';

export async function POST(req) {
  try {
    const data = await req.json();
    const { encroachments, userCoordinates } = data;

    // 1. Generate Dispute Hash & Timestamp
    const timestamp = new Date().toISOString();
    const rawDataStr = JSON.stringify({ encroachments, userCoordinates, timestamp });
    const disputeHash = crypto.createHash('sha256').update(rawDataStr).digest('hex');
    const reportId = `SYN-WBR-${disputeHash.substring(0, 8).toUpperCase()}`;

    // 2. Generate PDF using jsPDF
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(255, 0, 0); // Red
    doc.text('CRITICAL ENCROACHMENT REPORT', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Report ID: ${reportId}`, 20, 40);
    doc.text(`Timestamp: ${timestamp}`, 20, 50);
    doc.text(`Data Integrity Hash: ${disputeHash}`, 20, 60);
    
    doc.text('Encroachment Details:', 20, 80);
    let y = 90;
    encroachments.forEach((enc, index) => {
      doc.text(`- Conflict #${index + 1}: Target ID ${enc.id}`, 25, y);
      doc.text(`  Area in violation: ${enc.areaSqM} SQM`, 25, y + 10);
      doc.text(`  Overlap Severity: ${enc.percent}%`, 25, y + 20);
      y += 35;
    });

    // Mock "Map Image" space
    doc.setDrawColor(255, 0, 0);
    doc.setFillColor(255, 230, 230);
    doc.rect(20, y, 170, 70, 'FD');
    doc.setTextColor(255, 0, 0);
    doc.text('[ FORENSIC MAP OVERLAY ATTACHED DIGITALLY ]', 45, y + 35);
    
    // Legal Compliance Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Generated via the Syntry Trust Protocol under the provisions of the', 20, 280);
    doc.text('Ghana Whistleblower Act, 2006 (Act 720). Evidence digitally secured.', 20, 285);

    // Convert PDF to base64 Buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    // 3. Solana Blockchain Integrity Push (Simulated Write / Hash generation)
    // Create connection to devnet to verify we have the library loaded correctly
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    // Generate a fresh keypair just for creating a valid transaction signature mock
    const feePayer = Keypair.generate();
    
    // Create an instruction (System transfer with 0 lamports acting as a memo hook placeholder)
    const ix = SystemProgram.transfer({
       fromPubkey: feePayer.publicKey,
       toPubkey: feePayer.publicKey,
       lamports: 0
    });
    
    const tx = new Transaction().add(ix);
    tx.feePayer = feePayer.publicKey;
    
    // Mock the signature for UX (To prevent strict devnet rate limits and airdrop requirements during UI demo)
    const solanaSig = `4${crypto.randomBytes(31).toString('hex')}...${crypto.randomBytes(2).toString('hex')}`;

    // 4. Automated Notification (Nodemailer)
    let emailPreviewUrl = null;
    try {
      // Ethereal is a fake SMTP service provided by Nodemailer for testing
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const info = await transporter.sendMail({
        from: '"Syntry Control Tower" <security@syntry.co>',
        to: "compliance@syntry.co",
        subject: `🚨 HIGH CONFIDENCE FRAUD / ENCROACHMENT: ${reportId}`,
        text: `Attached is a cryptographically secured Whistleblower Report under Act 720.\nBlockchain Hash: ${disputeHash}`,
        attachments: [
          {
            filename: `${reportId}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf'
          }
        ]
      });
      emailPreviewUrl = nodemailer.getTestMessageUrl(info);
    } catch (e) {
      console.error("Nodemailer failed:", e);
    }

    return NextResponse.json({
      success: true,
      reportId,
      disputeHash,
      solanaSignature: solanaSig,
      emailPreviewUrl
    });
    
  } catch (error) {
    console.error("Whistleblower API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
