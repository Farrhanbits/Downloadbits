'use client';

import React from 'react';
import { DownloadEngine } from '@/components/downloader/DownloadEngine';
import { StepCards } from '@/components/sections/StepCards';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

export default function InstagramDownloaderPage() {
  const igFaqs = [
    {
      q: 'How do I download Instagram Reels in 1080p HD without watermark?',
      a: 'Simply copy the link of any Instagram Reel, paste it into the input box above, and click Download. Downloadbits will fetch the original 1080p video file without watermarks.',
    },
    {
      q: 'Can I download Instagram Carousel photo posts and multi-slide videos?',
      a: 'Yes! When you paste a carousel post link, Downloadbits parses all individual photos and videos so you can save them individually or all at once.',
    },
    {
      q: 'Can I extract audio MP3 from Instagram Reels?',
      a: 'Absolutly. In the resolution selector after pasting your link, select "Audio Only (MP3)" to extract high-quality background audio tracks.',
    },
    {
      q: 'Is downloading Instagram videos legal and private?',
      a: 'Yes, downloading public content for personal reference and offline viewing is permitted. We never store your downloaded media on our servers.',
    },
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero Header */}
      <section className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono font-bold tracking-wider">
          <Instagram className="w-4 h-4" />
          INSTAGRAM MEDIA DOWNLOADER
        </div>

        <h1 className="font-gt-super text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Download Instagram{' '}
          <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
            Reels, Posts &amp; Stories
          </span>
        </h1>

        <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Fast, free, and watermark-free Instagram video &amp; photo downloader. Save high-resolution Reels, carousel posts, and audio tracks in seconds.
        </p>

        {/* Downloader Input Engine with integrated tab selector */}
        <div className="pt-4 max-w-3xl mx-auto">
          <DownloadEngine defaultPlatform="instagram" />
        </div>
      </section>

      {/* 3 Steps */}
      <StepCards platformName="Instagram" />

      {/* Cross-Link Tools Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-8 rounded-2xl glass-card bg-gradient-to-r from-violet-950/40 via-[#0c0c10] to-purple-950/40 border border-violet-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-gt-super text-xl font-bold text-white">Need to download from other platforms?</h3>
            <p className="text-sm text-zinc-400 mt-1">Downloadbits supports Pinterest, Twitter / X, and YouTube Shorts as well.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/pinterest-downloader" className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold hover:border-violet-400 text-zinc-200">
              Pinterest Downloader →
            </Link>
            <Link href="/twitter-downloader" className="px-4 py-2.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 shadow-lg shadow-violet-600/30">
              Twitter / X Tool →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion customFaqs={igFaqs} title="Instagram Downloader FAQ" />
    </div>
  );
}
