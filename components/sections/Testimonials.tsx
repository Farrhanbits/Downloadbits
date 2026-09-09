'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      name: 'Alex Vance',
      handle: '@alex_motion',
      role: 'Motion Designer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      quote:
        'Downloadbits is by far the cleanest social video downloader I have ever used. Zero spam ads, 1080p quality, and downloads start in less than a second.',
      rating: 5,
    },
    {
      name: 'Sarah Chen',
      handle: '@sarah_creatives',
      role: 'Content Strategist',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      quote:
        'I save mood board pins and Instagram reference reels daily for clients. The auto-platform detection works like magic!',
      rating: 5,
    },
    {
      name: 'Marcus Brody',
      handle: '@marcus_vfx',
      role: 'Video Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      quote:
        'Audio MP3 extraction from Twitter clips is super clean and fast. Finally a site that doesn’t look like a 2005 ad trap.',
      rating: 5,
    },
  ];

  return (
    <section className="relative z-10 py-24 bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/20 text-xs font-mono text-violet-300">
            ★ LOVED BY CREATORS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Trusted by <span className="gradient-text-vivid">170,000+</span> Creators Daily
          </h2>
          <p className="text-base text-zinc-400">
            Here is what designers, editors, and social media managers say about Downloadbits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 rounded-2xl glass-card bg-[#0c0c10]/80 border border-white/10 space-y-5 relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-violet-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                  <p className="text-xs text-zinc-500 font-mono">{rev.handle} · {rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
