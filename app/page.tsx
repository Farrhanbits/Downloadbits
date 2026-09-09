import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { DownloadEngine } from '@/components/downloader/DownloadEngine';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { Showcase } from '@/components/sections/Showcase';
import { StepCards } from '@/components/sections/StepCards';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12 overflow-hidden">
      {/* Clean Centered Hero Section */}
      <section className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-36 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Centered Badge */}
          <div className="inline-flex items-center justify-center">
            <Badge arrow iconDot>
              NEW ENGINE V2.4 — INSTANT PARSE
            </Badge>
          </div>

          {/* Centered Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.15]">
            Download anything,{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              instantly.
            </span>
          </h1>

          {/* Centered Description */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The modern, watermark-free media downloader for Instagram Reels, Pinterest Pins, Twitter / X clips, and all social platforms.
          </p>

          {/* Centered URL Input Engine */}
          <div className="pt-2 max-w-2xl mx-auto">
            <DownloadEngine />
          </div>

          {/* Centered Trust Metric Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>170,000+ Downloads Today</span>
            </div>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <span>No Registration Required</span>
            </div>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>1080p Ultra HD</span>
            </div>
          </div>
        </div>

        {/* Smooth Gradient Fade at Bottom of Banner — prevents sudden black border line */}
        <div className="absolute -bottom-12 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#050506]/70 to-[#050506] pointer-events-none z-10" />
      </section>

      {/* Bento Feature Grid */}
      <div className="relative z-20">
        <BentoGrid />
      </div>

      {/* 3-Step Process */}
      <StepCards platformName="Social Media" />

      {/* Showcase Gallery */}
      <Showcase />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Accordion */}
      <FAQAccordion />
    </div>
  );
}
