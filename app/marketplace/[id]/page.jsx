import React from 'react';

export const dynamicParams = true;

// Fix: Return a placeholder ID so Next.js has something to statically validate
export async function generateStaticParams() {
  return [{ id: 'placeholder' }];
}

const MarketplaceItem = ({ params }) => {
  const { id } = params;

  return (
    <div className="min-h-screen bg-syntry-obsidian text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-syntry-amber text-4xl font-medium mb-4">Syntry Marketplace</h1>
      <div className="bg-black/20 p-6 rounded-lg border border-syntry-amber/20 max-w-2xl w-full">
        <h2 className="text-xl mb-2">Forensic Land Data for: {id}</h2>
        <p className="text-gray-400">
          Fetching immutable records from the Sovereign Node...
        </p>
        {id === 'placeholder' && (
          <p className="mt-4 text-xs text-syntry-amber/50 italic">
            [Build-time validation path active]
          </p>
        )}
      </div>
    </div>
  );
};

export default MarketplaceItem;
