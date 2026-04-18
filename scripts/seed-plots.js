/** 
 * Syntry Sovereign Asset Exchange - Seeding Script
 * This script populates the 'plots' table with initial high-visibility assets.
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Requires service role for bulk insert/bypass RLS

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const initialPlots = [
  { id: 'SYN-ASH-01', lat: 5.6814, lng: -0.1149, value: 331892, status: 'verified', location: 'West Hills Corridor', name: 'Ashifla-Otatten Reserve' },
  { id: 'SYN-AM-A', lat: 5.7000, lng: -0.3000, value: 36000, status: 'verified', location: 'Amasaman', name: 'Amasaman Obom Site A' },
  { id: 'SYN-AM-B', lat: 5.7010, lng: -0.3010, value: 31000, status: 'verified', location: 'Amasaman', name: 'Amasaman Obom Site B' },
  { id: 'SYN-AM-L', lat: 5.7050, lng: -0.3050, value: 40000, status: 'verified', location: 'Amasaman', name: 'Amasaman Lakeview' },
  { id: 'SYN-PO-D', lat: 5.6933, lng: -0.2858, value: 130000, status: 'verified', location: 'Pokuase', name: 'Pokuase Dedeman' },
  { id: 'SYN-EL-H', lat: 5.6500, lng: -0.1500, value: 450000, status: 'verified', location: 'East Legon Hills', name: 'East Legon Hills' },
  { id: 'SYN-PO-O', lat: 5.6940, lng: -0.2860, value: 8525000, status: 'verified', location: 'Pokuase', name: 'Pokuase Overhead' }
];

async function seed() {
  console.log('--- SEEDING SYNTRY SOVEREIGN EXCHANGE ---');
  
  for (const plot of initialPlots) {
    const { error } = await supabase.from('plots').upsert(plot);
    if (error) {
       console.error(`Failed to seed ${plot.id}:`, error.message);
    } else {
       console.log(`Successfully seeded ${plot.id}`);
    }
  }
  
  console.log('--- SEEDING COMPLETE ---');
}

seed();
