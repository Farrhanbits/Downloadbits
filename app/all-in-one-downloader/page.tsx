'use client';

import React from 'react';
import { DownloadEngine } from '@/components/downloader/DownloadEngine';
import { StepCards } from '@/components/sections/StepCards';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { Layers, Instagram, Pin, Twitter, Youtube, Video } from 'lucide-react';

export default function AllInOneDownloaderPage() {
  const supported = [
    { name: 'Instagram', desc: 'Reels, Carousel Photos, Stories & Audio', icon: Instagram, color: 'text-pink-400' },
    { name: 'Pinterest', desc: 'Idea Pins, HD Wallpapers & Board Media', icon: Pin, color: 'text-red-500' },
    { name: 'Twitter / X', desc: '1080p HD Videos, GIFs & Tweet Attachments', icon: Twitter, color: 'text-sky-400' },
    { name: 'YouTube Shorts', desc: 'Shorts Video Clips & Background MP3', icon: Youtube, color: 'text-red-600' },
    { name: 'TikTok', desc: 'Watermark-Free MP4 & Sound Extraction', icon: Video, color: 'text-cyan-400' },
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero Header */}
      <section className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-bold tracking-wider">
          <Layers className="w-4 h-4" />
          UNIVERSAL MEDIA DOWNLOADER
        </div>

        <h1 className="font-gt-super text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          All-in-One <span className="gradient-text-vivid">Universal Media Downloader</span>
        </h1>

        <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Paste any video or photo link from Instagram, Pinterest, Twitter / X, TikTok, or YouTube. Our intelligent engine auto-detects the platform and returns original HD files.
        </p>

        {/* Downloader Input Box */}
        <div className="pt-4 max-w-3xl mx-auto">
          <DownloadEngine defaultPlatform="unknown" />
        </div>
      </section>

      {/* Supported Platforms Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-3 mb-10">
          <h2 className="font-gt-super text-2xl sm:text-3xl font-bold text-white">Supported Platforms &amp; Media Formats</h2>
          <p className="text-sm text-zinc-400">Works with all major social networks without requiring specialized apps.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supported.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className="p-6 rounded-2xl glass-card bg-[#0c0c10]/90 border border-white/10 space-y-3 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                  <Icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 Steps */}
      <StepCards platformName="Any Platform" />

      {/* FAQ */}
      <FAQAccordion title="Universal Downloader FAQ" />
    </div>
  );
}
