import dynamic from 'next/dynamic';

export const dynamicParams = true;

// This allows the build to pass by pre-rendering no specific IDs
export async function generateStaticParams() {
  return [];
}

const MarketplaceItem = ({ params }) => {
  return (
    <div className="min-h-screen bg-obsidian text-white p-8">
      <h1 className="text-relic-gold">Marketplace Item: {params.id}</h1>
      <p>Loading forensic land data...</p>
    </div>
  );
};

export default MarketplaceItem;
