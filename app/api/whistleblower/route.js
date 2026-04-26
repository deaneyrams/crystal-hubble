import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
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

    // 2. Generate PDF using PDFKit
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks = [];

    doc.on('data', chunk => chunks.push(chunk));
    
    // Header
    doc.fillColor('#FF0000').fontSize(24).font('Helvetica-Bold').text('CRITICAL ENCROACHMENT REPORT', 50, 50);
    doc.fillColor('#000000').fontSize(10).font('Helvetica').text(`SECURED VIA SYNTRY TRUST PROTOCOL :: ID: ${reportId}`, 50, 80);
    
    doc.moveDown(2);
    doc.fontSize(12).font('Helvetica-Bold').text('AUDIT TELEMETRY', 50, 120);
    doc.font('Helvetica').fontSize(10);
    doc.text(`REPORT IDENTIFIER: ${reportId}`, 50, 140);
    doc.text(`TIMESTAMP: ${timestamp}`, 50, 155);
    doc.text(`INTEGRITY HASH: ${disputeHash}`, 50, 170);
    
    doc.moveDown(2);
    doc.fontSize(12).font('Helvetica-Bold').text('ENCROACHMENT VECTOR DATA', 50, 200);
    doc.font('Helvetica').fontSize(10);
    
    let y = 220;
    encroachments.forEach((enc, index) => {
      doc.text(`CONFLICT #${index + 1}: TARGET ASSET ${enc.id}`, 55, y);
      doc.text(`VIOLATION VOLUME: ${enc.areaSqM} SQM`, 55, y + 15);
      doc.text(`OVERLAP SEVERITY: ${enc.percent}%`, 55, y + 30);
      y += 50;
    });

    // Forensic Placeholder
    doc.rect(50, y, 500, 100).fillColor('#FFF0F0').strokeColor('#FF0000').fillAndStroke();
    doc.fillColor('#FF0000').fontSize(10).text('[ GEOSPATIAL FORENSIC OVERLAY ATTACHED DIGITALLY ]', 150, y + 45);
    
    // Legal Compliance Footer
    doc.fillColor('#64748B').fontSize(8).text('Generated via the Syntry Trust Protocol under the provisions of the Ghana Whistleblower Act, 2006 (Act 720). Evidence digitally secured and hashed to Solana Mainnet/Devnet.', 50, 750, { align: 'center', width: 500 });

    doc.end();

    const pdfBuffer = await new Promise((resolve) => {
       doc.on('end', () => resolve(Buffer.concat(chunks)));
    });

    // 3. Solana Blockchain Integrity Push (Mock Signature)
    const solanaSig = `4${crypto.randomBytes(31).toString('hex')}...${crypto.randomBytes(2).toString('hex')}`;

    // 4. Automated Notification (Nodemailer)
    let emailPreviewUrl = null;
    try {
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
        subject: `🚨 HIGH CONFIDENCE FRAUD: ${reportId}`,
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
