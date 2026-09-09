'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Sparkles, DownloadCloud } from 'lucide-react';

interface StepCardsProps {
  platformName?: string;
}

export const StepCards: React.FC<StepCardsProps> = ({ platformName = 'Media' }) => {
  const steps = [
    {
      num: '01',
      title: 'Copy the Share Link',
      desc: `Open ${platformName}, find your favorite Reel, Video, or Photo post, and click "Copy Link".`,
      icon: Copy,
    },
    {
      num: '02',
      title: 'Paste into Downloadbits',
      desc: 'Paste the copied URL into our high-speed input box above. We automatically parse the format.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Download Original HD File',
      desc: 'Select your preferred resolution (1080p, 720p, or MP3) and click Download to save immediately.',
      icon: DownloadCloud,
    },
  ];

  return (
    <section className="relative z-10 py-20 bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            How to Download in <span className="gradient-text-vivid">3 Simple Steps</span>
          </h2>
          <p className="text-sm text-zinc-400">
            No installation, no extension, and no user registration required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative p-7 rounded-2xl glass-card bg-[#0c0c10]/80 border border-white/10 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-mono font-extrabold text-violet-500/30">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white pt-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
