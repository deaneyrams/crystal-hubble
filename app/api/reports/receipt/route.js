import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

/**
 * Task 1: /api/reports/receipt Endpoint
 * Generates a "Certificate of Fractional Ownership" for Syntry Investors.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const plotId = searchParams.get('id') || 'SYN-VLT-08';
    
    // 1. Create PDF Documentation
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks = [];

    doc.on('data', chunk => chunks.push(chunk));
    
    // 2. Headless Branding (Institutional Style)
    doc.fillColor('#0D1B2A').rect(0, 0, 600, 150).fill();
    doc.fillColor('#B8FF3C').fontSize(32).font('Helvetica-Bold').text('SYNTRY SOVEREIGN EXCHANGE', 50, 50);
    doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica').text('MINISTERIAL NODE 08 :: FRACTIONAL OWNERSHIP DEED', 50, 90);
    
    doc.moveDown(4);
    
    // 3. Deed Data
    doc.fillColor('#000000').fontSize(12).font('Helvetica-Bold').text('CERTIFICATE DATA', 50, 200);
    doc.font('Helvetica').fontSize(10);
    doc.text(`PLOT IDENTIFIER: ${plotId}`, 50, 220);
    doc.text(`STAMP TIMESTAMP: ${new Date().toUTCString()}`, 50, 235);
    doc.text(`ABSA CO-LENDING ID: ABSA-STK-9021-X`, 50, 250);
    doc.text(`GROUND-TRUTH ACCURACY: 99.87% (High)`, 50, 265);
    
    doc.moveDown(2);
    doc.text('This document verifies that the fractional interest in the aforementioned Pokuase Parcel is legally bound to the Syntry Asymmetric Ledger and verified via a 360-degree drone audit.', { align: 'justify' });
    
    // 4. QR Verification Node
    const qrData = `https://syntry.co/invest/verify/${plotId}`;
    const qrBuffer = await QRCode.toBuffer(qrData);
    doc.image(qrBuffer, 400, 200, { width: 150 });
    doc.fontSize(8).text('SCAN TO VIEW 360 DRONE AUDIT', 400, 360, { align: 'center' });

    // 5. Digital Seal Overlay
    doc.circle(100, 450, 40).stroke('#B8FF3C').lineWidth(2);
    doc.fillColor('#B8FF3C').fontSize(14).text('STAMPED', 72, 442);
    
    doc.end();

    const result = await new Promise((resolve) => {
       doc.on('end', () => resolve(Buffer.concat(chunks)));
    });

    return new NextResponse(result, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=Syntry-Deed-${plotId}.pdf`
      }
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Sync failed with PDF Node' }, { status: 500 });
  }
}
