'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, ShieldCheck, Unlock, Sliders, Lock } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';

export const BentoGrid = () => {
  const features = [
    {
      icon: Layers,
      title: 'All Platforms Supported',
      desc: 'Seamlessly download media from Instagram, Pinterest, Twitter / X, TikTok, YouTube Shorts, and universal URLs.',
      tag: 'UNIVERSAL',
      span: 'md:col-span-2',
      highlight: true,
    },
    {
      icon: Zap,
      title: 'Blazing Fast Speed',
      desc: 'High-throughput edge CDN stream fetch delivers files in under 2 seconds.',
      tag: '< 2 SEC',
      span: 'md:col-span-1',
    },
    {
      icon: ShieldCheck,
      title: 'No Watermarks & 4K HD',
      desc: 'Get pure, clean original media resolution without added logos or compressive degradation.',
      tag: 'PURE QUALITY',
      span: 'md:col-span-1',
    },
    {
      icon: Unlock,
      title: '100% Free, Zero Signup',
      desc: 'No account creation, email requirement, or payment wall. Unlimited downloads for everyone.',
      tag: 'NO LOGIN',
      span: 'md:col-span-1',
    },
    {
      icon: Sliders,
      title: 'Flexible Format Selector',
      desc: 'Choose between 1080p Full HD, 720p, 480p, or extract high-bitrate Audio MP3 tracks.',
      tag: 'CUSTOM FORMATS',
      span: 'md:col-span-1',
    },
  ];

  return (
    <section className="relative z-10 py-24 bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/20 text-xs font-mono text-violet-300">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            ENGINE FEATURES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Built for <span className="gradient-text-vivid">Lightning Speed</span> & Absolute Privacy
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Downloadbits strips away annoying popups, aggressive ads, and wait timers. Save high-resolution social media content cleanly.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={item.span}
              >
                <TiltCard className="h-full flex flex-col justify-between p-7">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-violet-300">
                        {item.tag}
                      </span>
                    </div>

                    <div className="space-y-2 pt-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {item.highlight && (
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
                      <span>Instagram · Pinterest · Twitter/X · TikTok</span>
                      <span className="text-emerald-400">✓ 99.9% Uptime</span>
                    </div>
                  )}
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
