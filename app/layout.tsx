import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuroraBackground } from '@/components/ui/AuroraBackground';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
});

const playfairDisplay = Playfair_Display({
  weight: ['700', '900'],
  subsets: ['latin'],
  variable: '--font-gt-super',
});

export const metadata: Metadata = {
  title: 'Downloadbits — Fast, Free Multi-Platform Social Media Downloader',
  description:
    'Download Instagram Reels, Pinterest Pins, Twitter/X videos, and universal media links instantly in 1080p HD without watermarks or signup.',
  keywords: [
    'instagram reel downloader',
    'pinterest video downloader',
    'twitter video downloader',
    'download social media video free',
    'no watermark downloader',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${dmSerif.variable} ${playfairDisplay.variable} dark`}
    >
      <body className="min-h-screen flex flex-col bg-[#050506] text-[#F5F5F7] antialiased selection:bg-violet-600 selection:text-white">
        <AuroraBackground />
        <Navbar />
        <main className="flex-1 relative z-10 pt-28 md:pt-32">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
