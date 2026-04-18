import './globals.css';

export const metadata = {
  title: 'SYNTRY — Property Markets. Unified.',
  description: 'SYNTRY is the synchronised entry into every property market.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{'html,body{background:#050508!important;color:white!important;}'}</style>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('dark')` }} />
      </head>
      <body className="antialiased font-sans bg-[#050508] text-white" style={{ backgroundColor: '#050508', color: 'white' }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
