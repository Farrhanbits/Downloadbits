import React from 'react';
import { StepCards } from '@/components/sections/StepCards';
import { ShieldCheck, Zap, Lock, RefreshCw, FileCheck } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="py-16 max-w-5xl mx-auto px-4 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          How <span className="gradient-text-vivid">Downloadbits</span> Works
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl mx-auto">
          Under the hood of Downloadbits’ high-speed stream parsing and media extraction architecture.
        </p>
      </div>

      <StepCards platformName="Social Networks" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-7 rounded-2xl glass-card bg-[#0c0c10] border border-white/10 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Edge Stream Resolution</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            When you paste a link, our serverless edge resolvers inspect public HTTP metadata headers, extracting direct MP4/JPEG endpoints without requiring login cookies or user accounts.
          </p>
        </div>

        <div className="p-7 rounded-2xl glass-card bg-[#0c0c10] border border-white/10 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Zero File Storage & Privacy</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We never store, cache, or rehost user-downloaded media on our disks. The media buffer is streamed straight to your device and discarded immediately.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="px-6 py-3 rounded-full bg-violet-600 text-white font-bold text-sm hover:bg-violet-500 shadow-lg shadow-violet-600/30">
          Start Downloading Now →
        </Link>
      </div>
    </div>
  );
}
