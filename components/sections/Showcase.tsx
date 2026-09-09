'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Sparkles, Instagram, Pin, Twitter, Layers } from 'lucide-react';
import Link from 'next/link';

export const Showcase = () => {
  const showcaseItems = [
    {
      title: 'Instagram Reels & Carousel Downloader',
      category: 'Instagram / Reels',
      icon: Instagram,
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
      route: '/instagram-downloader',
      resolution: '1080p Full HD',
      size: '18.4 MB',
    },
    {
      title: 'Pinterest High-Res Idea Pins & Videos',
      category: 'Pinterest / Pins',
      icon: Pin,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      route: '/pinterest-downloader',
      resolution: '4K Ultra Image',
      size: '8.2 MB',
    },
    {
      title: 'Twitter / X 60fps Clips & GIFs',
      category: 'Twitter / Clips',
      icon: Twitter,
      image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=800&auto=format&fit=crop',
      route: '/twitter-downloader',
      resolution: '1080p 60fps',
      size: '24.1 MB',
    },
    {
      title: 'Universal All-Platform Auto Resolution',
      category: 'Universal / Auto',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
      route: '/all-in-one-downloader',
      resolution: 'Source Original',
      size: 'Auto Stream',
    },
  ];

  return (
    <section className="relative z-10 py-24 bg-[#0c0c10]/70 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/20 text-xs font-mono text-violet-300">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              SHOWCASE GALLERY
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              See <span className="gradient-text-vivid">Downloadbits</span> in Action
            </h2>
            <p className="text-base text-zinc-400">
              Explore how media from different platforms is instantly converted into clean, high-bitrate downloadable streams.
            </p>
          </div>

          <Link
            href="/all-in-one-downloader"
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors"
          >
            <span>Try Universal Downloader</span> →
          </Link>
        </div>

        {/* 2x2 Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={item.route}
                  className="group relative block rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-violet-500/50 transition-all duration-300 shadow-xl"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-black/60">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-black/30 to-transparent" />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-zinc-200 border border-white/10 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-violet-400" />
                        {item.category}
                      </span>
                    </div>

                    {/* Center Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-violet-600/80 backdrop-blur-md text-white flex items-center justify-center shadow-xl shadow-violet-600/50 group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400 font-mono">
                        <span>Quality: {item.resolution}</span>
                        <span>•</span>
                        <span>Size: {item.size}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-violet-600 text-zinc-300 group-hover:text-white transition-colors">
                      <Download className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
