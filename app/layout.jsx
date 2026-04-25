import './globals.css';
import '../app/globals.css'; // Redundant import to force detection
import { Inter, IBM_Plex_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'SYNTRY — Property Markets. Unified.',
  description: 'SYNTRY is the synchronised entry into every property market.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('dark')` }} />
      </head>
      <body className="bg-[#050508] text-white antialiased font-sans min-h-screen" style={{ backgroundColor: '#050508' }} suppressHydrationWarning>
        <div id="syntry-root-context" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
