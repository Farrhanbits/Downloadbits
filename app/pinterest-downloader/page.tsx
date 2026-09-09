'use client';

import React from 'react';
import { DownloadEngine } from '@/components/downloader/DownloadEngine';
import { StepCards } from '@/components/sections/StepCards';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Pin } from 'lucide-react';
import Link from 'next/link';

export default function PinterestDownloaderPage() {
  const pinterestFaqs = [
    {
      q: 'How do I download Pinterest videos and Idea Pins?',
      a: 'Copy the URL of the Pinterest Pin from your app or browser, paste it into the box above, and click Download. You will get direct MP4 video download links in full quality.',
    },
    {
      q: 'Can I download high-resolution Pinterest images and original PNGs?',
      a: 'Yes! Downloadbits fetches the maximum uncompressed image file available on Pinterest servers.',
    },
    {
      q: 'Does Pinterest Downloader work on mobile devices?',
      a: 'Yes, it works smoothly on iOS (Safari, Chrome) and Android devices without installing third-party apps.',
    },
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero Header */}
      <section className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-wider">
          <Pin className="w-4 h-4" />
          PINTEREST ALL-IN-ONE DOWNLOADER
        </div>

        <h1 className="font-gt-super text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Download Pinterest{' '}
          <span className="bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent">
            Pins, Videos &amp; Boards
          </span>
        </h1>

        <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          The ultimate Pinterest video and image downloader. Save high-resolution Idea Pins, aesthetic wallpapers, and motion clips cleanly.
        </p>

        {/* Downloader Input Engine */}
        <div className="pt-4 max-w-3xl mx-auto">
          <DownloadEngine defaultPlatform="pinterest" />
        </div>
      </section>

      {/* 3 Steps */}
      <StepCards platformName="Pinterest" />

      {/* Cross Links */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-8 rounded-2xl glass-card bg-[#0c0c10] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-gt-super text-xl font-bold text-white">Explore Other Media Tools</h3>
            <p className="text-sm text-zinc-400 mt-1">Download high-definition videos from Instagram and Twitter with 1 click.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/instagram-downloader" className="px-4 py-2.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 shadow-lg shadow-violet-600/30">
              Instagram Downloader →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion customFaqs={pinterestFaqs} title="Pinterest Downloader FAQ" />
    </div>
  );
}
