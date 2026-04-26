import { NextResponse } from 'next/server';
import * as turf from '@turf/turf';
import existingPolygons from '@/lib/existing-polygons.json';

export async function POST(req) {
  try {
    const data = await req.json();
    const { submittedPolygon } = data; // GeoJSON structure

    if (!submittedPolygon) {
       return NextResponse.json({ error: 'Missing polygon' }, { status: 400 });
    }

    // 1. Proximity Buffer: create a 50m radius around the boundary
    let buffer;
    try {
      buffer = turf.buffer(submittedPolygon, 50, { units: 'meters' });
    } catch(err) {
      return NextResponse.json({ error: 'Invalid Geometry provided for Buffer generation.' }, { status: 400 });
    }

    // 2. Notification Engine (Intersection check)
    const affectedNeighbors = [];
    
    existingPolygons.features.forEach(neighbor => {
       try {
          const overlap = turf.intersect(turf.featureCollection([buffer, neighbor]));
          if (overlap) {
             // 5. Privacy Guard: Strip PII, Return only ID and Shape
             affectedNeighbors.push({
                eventId: `EVT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
                plotId: neighbor.properties.id,
                zone: neighbor.properties.zone,
                proximityMeters: 50, // Approximation based on buffer intersect
                timestamp: new Date().toISOString(),
                // Providing the new verify-er’s shape for the neighbor's dashboard context securely
                suspectGeometry: submittedPolygon
             });
          }
       } catch (err) {
          // Geometry bounds errors occasionally from Turf intersections, safe to skip invalid nodes
       }
    });

    return NextResponse.json({
      success: true,
      alertCount: affectedNeighbors.length,
      triggers: affectedNeighbors
    });
    
  } catch (error) {
    console.error("Sentinel Proximity API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
