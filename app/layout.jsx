import '@/app/globals.css';
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
  title: 'SYNTRY — Sovereign Real Estate Exchange',
  description: 'Grounded Truth through 8 Layers of Verification. Unlock the true value of your land.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('dark')` }} />
        <style dangerouslySetInnerHTML={{ __html: `
          body { background-color: #050508 !important; color: white !important; margin: 0; padding: 0; font-family: sans-serif; }
          .min-h-screen { min-height: 100vh; }
        ` }} />
      </head>
      <body className="bg-syntry-obsidian text-white antialiased font-sans min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
