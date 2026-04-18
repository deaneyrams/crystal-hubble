import { NextResponse } from 'next/server';
import { runFullOracleAudit } from '@/lib/oracle-audit';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request) {
  try {
    const { plotId } = await request.json();

    if (!plotId) {
      return NextResponse.json({ error: 'plotId is required' }, { status: 400 });
    }

    // Set up Server-Sent Events stream
    const customReadable = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          
          const sendMsg = (data) => {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
          }

          sendMsg({ status: 'started', message: 'Initiating Multi-Sig Audit...', check: null });
          
          // Use the new state-of-the-art verification logic
          const { verified } = await runFullOracleAudit(plotId, (progress) => {
              sendMsg(progress);
          });

          if (verified) {
             // [MISSION: INITIATE ORACLE VERIFICATION]
             // Update the Supabase plot status from 'reserved' to 'verified'
             const { error } = await supabaseAdmin
               .from('plots')
               .update({ status: 'verified' })
               .eq('id', plotId);

             if (error) {
                 console.error(`❌ Supabase Update Error: ${error.message}`);
             } else {
                 console.log(`✅ Plot ${plotId} verified in Supabase.`);
             }
          }

          sendMsg({ 
            status: 'finished', 
            plotId,
            timestamp: new Date().toISOString(),
            verified
          });
          
          controller.close();
        }
    });

    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Oracle Audit Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
