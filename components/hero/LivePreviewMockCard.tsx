'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Check, Download, Zap, FileVideo, Music } from 'lucide-react';

export const LivePreviewMockCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="glass-card rounded-2xl p-5 bg-[#0c0c10]/90 border border-violet-500/30 shadow-2xl shadow-violet-950/40 space-y-4">
        {/* Mock Window Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-zinc-300">downloadbits-stream-preview.ts</span>
          </div>
          <span className="text-violet-400 flex items-center gap-1 text-[11px]">
            <Sparkles className="w-3 h-3" /> Live Engine
          </span>
        </div>

        {/* Video Thumbnail Mock */}
        <div className="relative rounded-xl overflow-hidden bg-black/60 border border-white/10 aspect-video group">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
            alt="Live Stream Preview"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 rounded-full bg-violet-600/90 text-white font-mono text-[10px] uppercase font-bold tracking-wider backdrop-blur-md">
                INSTAGRAM REEL · 1080P
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[11px]">
                0:45
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-lg shadow-violet-600/50">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white line-clamp-1">
                  Cyberpunk Motion Design Concept
                </p>
                <p className="text-[11px] text-zinc-300 font-mono">@design_innovator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resolution Options Row */}
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <div className="p-2 rounded-lg bg-violet-900/30 border border-violet-500/40 text-violet-300 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <FileVideo className="w-3.5 h-3.5" />
              <span>1080p HD</span>
            </div>
            <Check className="w-3.5 h-3.5 text-violet-400" />
          </div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-zinc-400 flex items-center gap-1.5">
            <FileVideo className="w-3.5 h-3.5" />
            <span>720p</span>
          </div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-zinc-400 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-pink-400" />
            <span>Audio MP3</span>
          </div>
        </div>

        {/* Speed Indicator */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-300 font-mono">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Download Speed</span>
          </div>
          <span className="font-mono text-violet-400 font-bold">18.4 MB/s (Ultra-Fast)</span>
        </div>
      </div>
    </motion.div>
  );
};
