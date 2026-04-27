import PropertyClient from './PropertyClient';

export async function generateStaticParams() {
  // Pre-render the IDs identified in the marketplace
  // In a real app, you might fetch this from a DB.
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ];
}

export default function Page({ params }) {
  const { id } = params;
  return <PropertyClient id={id} />;
}
