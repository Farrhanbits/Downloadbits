'use client';

import React, { useState } from 'react';
import { DownloadEngine } from '@/components/downloader/DownloadEngine';
import { StepCards } from '@/components/sections/StepCards';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Twitter, Video, Image as ImageIcon, Music } from 'lucide-react';
import Link from 'next/link';

export default function TwitterDownloaderPage() {
  const [activeTab, setActiveTab] = useState<'video' | 'gif' | 'image'>('video');

  const twitterFaqs = [
    {
      q: 'How do I download videos from Twitter / X in 1080p HD?',
      a: 'Copy the tweet URL containing the video, paste it into Downloadbits, and select 1080p HD. The file will download directly as an MP4.',
    },
    {
      q: 'Can I download Twitter GIFs as MP4 video or animated GIF?',
      a: 'Yes, Twitter converts GIFs into internal video loops. Downloadbits lets you save them as clean MP4 or original GIF animation files.',
    },
    {
      q: 'Do I need a Twitter / X account to download media?',
      a: 'No. You can download videos and media from any public Twitter post without logging in.',
    },
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero Header */}
      <section className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold tracking-wider">
          <Twitter className="w-4 h-4" />
          TWITTER / X MEDIA DOWNLOADER
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Download Twitter / X <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Videos, GIFs & Clips</span>
        </h1>

        <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          High-speed Twitter / X video downloader. Save 1080p tweet videos, GIFs, and media attachments instantly.
        </p>

        {/* Feature Tabs */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto w-full justify-around text-xs font-medium">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'video' ? 'bg-sky-600 text-white font-bold shadow-lg shadow-sky-600/30' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> 1080p Videos
          </button>
          <button
            onClick={() => setActiveTab('gif')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'gif' ? 'bg-sky-600 text-white font-bold shadow-lg shadow-sky-600/30' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" /> GIFs
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'image' ? 'bg-sky-600 text-white font-bold shadow-lg shadow-sky-600/30' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Images
          </button>
        </div>

        {/* Downloader Input Box */}
        <div className="pt-4">
          <DownloadEngine defaultPlatform="twitter" />
        </div>
      </section>

      {/* 3 Steps */}
      <StepCards platformName="Twitter / X" />

      {/* Cross Links */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-8 rounded-2xl glass-card bg-[#0c0c10] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Universal Social Media Downloader</h3>
            <p className="text-sm text-zinc-400 mt-1">Want to auto-detect any link? Try our All-in-One Universal tool.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/all-in-one-downloader" className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 shadow-lg shadow-violet-600/30">
              Universal Downloader →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion customFaqs={twitterFaqs} title="Twitter / X Downloader FAQ" />
    </div>
  );
}
