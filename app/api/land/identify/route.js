import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import * as turf from '@turf/turf';

/**
 * SYNTRY Geospatial Engine: Land Identification & Validation
 * Logic: Reverse identification + Ghana Standard Measurement Audit
 */
export async function POST(request) {
  try {
    const { lat, lng, polygon } = await request.json();

    let measurementAudit = null;

    // 1. Ghana Standard Measurement Audit (Turf.js)
    if (polygon) {
      const geojson = { type: 'Feature', geometry: polygon, properties: {} };
      const areaSqM = turf.area(geojson);
      const areaSqFt = areaSqM * 10.7639;
      
      // Standard Constants
      const FULL_PLOT_SQFT = 7000; // 70x100
      const HALF_PLOT_SQFT = 5000; // 50x100
      const ACRE_SQFT = 43560;

      const plots = (areaSqFt / FULL_PLOT_SQFT).toFixed(2);
      const acres = (areaSqFt / ACRE_SQFT).toFixed(2);

      let classification = 'Custom Polygon';
      let discrepancy = false;

      if (Math.abs(areaSqFt - FULL_PLOT_SQFT) < 500) {
        classification = 'Standard Full Plot (70x100)';
      } else if (Math.abs(areaSqFt - HALF_PLOT_SQFT) < 500) {
        classification = 'Standard Half Plot (50x100)';
      } else if (Math.abs(areaSqFt - 10000) < 500) {
        classification = 'Custom Plot (100x100)';
      }

      measurementAudit = {
        sqM: areaSqM.toFixed(2),
        sqFt: areaSqFt.toFixed(2),
        plots,
        acres,
        classification,
        discrepancy
      };
    }

    if (!lat || !lng) {
      return NextResponse.json({ error: 'GPS Node context missing' }, { status: 400 });
    }

    // 2. Point-in-Polygon Query Simulator
    const { data: plots, error } = await supabaseAdmin.from('plots').select('*');
    if (error) throw error;

    const radius = 0.0005; 
    const identifiedPlot = plots.find(p => 
      Math.abs(p.lat - lat) < radius && Math.abs(p.lng - lng) < radius
    );

    if (!identifiedPlot) {
      return NextResponse.json({ 
        identified: false, 
        measurementAudit,
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
      coordinates: { lat: identifiedPlot.lat, lng: identifiedPlot.lng },
      measurementAudit
    });

  } catch (error) {
    console.error('Land Identification Error:', error);
    return NextResponse.json({ error: 'Sync failed with Land Node 08' }, { status: 500 });
  }
}
