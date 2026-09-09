'use client';

import React from 'react';
import { DownloadEngine } from '@/components/downloader/DownloadEngine';
import { StepCards } from '@/components/sections/StepCards';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Youtube } from 'lucide-react';
import Link from 'next/link';

export default function YoutubeDownloaderPage() {
  const youtubeFaqs = [
    {
      q: 'How do I download YouTube Shorts and 1080p HD Videos?',
      a: 'Copy the URL of any YouTube video or Short, paste it into Downloadbits, and click Download. Select 1080p HD MP4 to save the video immediately.',
    },
    {
      q: 'Can I extract Audio MP3 from YouTube Videos?',
      a: 'Yes! Select the "Audio Only (MP3 320kbps)" format option to extract and download high-bitrate background audio tracks.',
    },
    {
      q: 'Is downloading YouTube videos free and private?',
      a: 'Yes, 100% free with no registration required. We process streams directly in your browser without storing video files on our servers.',
    },
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero Header */}
      <section className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-wider">
          <Youtube className="w-4 h-4" />
          YOUTUBE &amp; SHORTS DOWNLOADER
        </div>

        <h1 className="font-gt-super text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Download YouTube{' '}
          <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Videos, Shorts &amp; MP3
          </span>
        </h1>

        <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          High-speed YouTube video &amp; audio extractor. Save 1080p Full HD Shorts and extract 320kbps MP3 tracks instantly.
        </p>

        {/* Downloader Input Engine */}
        <div className="pt-4 max-w-3xl mx-auto">
          <DownloadEngine defaultPlatform="youtube" />
        </div>
      </section>

      {/* 3 Steps */}
      <StepCards platformName="YouTube" />

      {/* Cross Links */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-8 rounded-2xl glass-card bg-[#0c0c10] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-gt-super text-xl font-bold text-white">Universal Social Media Tool Suite</h3>
            <p className="text-sm text-zinc-400 mt-1">Download videos &amp; photos from Instagram, Pinterest, and Twitter/X as well.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/all-in-one-downloader" className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 shadow-lg shadow-violet-600/30">
              Universal Downloader →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion customFaqs={youtubeFaqs} title="YouTube Downloader FAQ" />
    </div>
  );
}
