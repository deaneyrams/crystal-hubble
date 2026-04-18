import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * Task 2: /api/land/identify Endpoint
 * Logic: Reverse identification based on GPS coordinates.
 * Simulates Point-in-Polygon logic with a 0.0005 degree proximity (approx ~50m) 
 * for Syntry Parcel identification on localhost.
 */
export async function POST(request) {
  try {
    const { lat, lng } = await request.json();

    if (!lat || !lng) {
      return NextResponse.json({ error: 'GPS Node context missing' }, { status: 400 });
    }

    // 1. Point-in-Polygon Query Simulator
    // In production: SELECT * FROM plots WHERE ST_Contains(polygon, ST_SetSRID(ST_Point(lng, lat), 4326))
    const { data: plots, error } = await supabaseAdmin
      .from('plots')
      .select('*');

    if (error) throw error;

    // 2. Find closest plot within Syntry Corridors
    const radius = 0.0005; 
    const identifiedPlot = plots.find(p => 
      Math.abs(p.lat - lat) < radius && Math.abs(p.lng - lng) < radius
    );

    if (!identifiedPlot) {
      return NextResponse.json({ 
        identified: false, 
        message: 'No Syntry Sovereign Plots detected at your location.' 
      });
    }

    // 3. Cross-reference with Node 08 Security Seal
    const { data: mortgage } = await supabaseAdmin
      .from('mortgages')
      .select('litigation_status, interest_due, remaining_balance')
      .eq('plot_id', identifiedPlot.id)
      .single();

    return NextResponse.json({
      identified: true,
      plot_id: identifiedPlot.id,
      plot_name: `Syntry Node ${identifiedPlot.id.split('-').pop()}`,
      status: mortgage?.litigation_status || 'unverified',
      is_disputed: mortgage?.litigation_status === 'dispute',
      interest_due: mortgage?.interest_due || 0,
      remaining_balance: mortgage?.remaining_balance || 0,
      coordinates: { lat: identifiedPlot.lat, lng: identifiedPlot.lng }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Sync failed with Land Node 08' }, { status: 500 });
  }
}
