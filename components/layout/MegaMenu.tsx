'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Pin, Twitter, Youtube, Layers, ArrowUpRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose, onMouseEnter, onMouseLeave }) => {
  const tools = [
    {
      name: 'Instagram Downloader',
      href: '/instagram-downloader',
      desc: 'Save Reels, Carousel Posts, Stories & Photos in HD without watermarks.',
      icon: Instagram,
      color: 'from-pink-500 to-rose-600',
      badge: 'POPULAR',
    },
    {
      name: 'Pinterest Downloader',
      href: '/pinterest-downloader',
      desc: 'Download Idea Pins, HD Videos, Boards & high-res images instantly.',
      icon: Pin,
      color: 'from-red-500 to-rose-600',
      badge: 'FAST',
    },
    {
      name: 'Twitter / X Downloader',
      href: '/twitter-downloader',
      desc: 'Grab 1080p Twitter videos, GIFs, and media attachments with 1-click.',
      icon: Twitter,
      color: 'from-sky-400 to-blue-600',
      badge: '1080P',
    },
    {
      name: 'YouTube Downloader',
      href: '/youtube-downloader',
      desc: 'Download YouTube Shorts, 1080p Full HD Videos, and extract MP3 tracks.',
      icon: Youtube,
      color: 'from-red-600 to-amber-600',
      badge: 'SHORTS',
    },
    {
      name: 'Universal Downloader',
      href: '/all-in-one-downloader',
      desc: 'All-platform auto-detect downloader. Works with any video or photo link.',
      icon: Layers,
      color: 'from-violet-500 to-purple-600',
      badge: 'ALL-IN-ONE',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 right-0 mt-3 w-full z-50"
    >
      <div className="w-full rounded-2xl p-6 bg-[#0c0c10]/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-violet-950/60 text-zinc-100">
        {/* Mega Menu Top Bar */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-violet-400">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Select Media Downloader Tool</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% Free · No Signup Required</span>
          </div>
        </div>

        {/* 5 Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={onClose}
                className="group relative flex flex-col justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-violet-500/40 transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-violet-900/50 text-violet-300 border border-violet-700/50">
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors flex items-center gap-1">
                      {tool.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-violet-400" />
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 text-[10px] font-mono text-violet-400 group-hover:text-violet-300 flex items-center justify-between">
                  <span>Open Tool</span>
                  <span>→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mega Menu Bottom Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Safe & Private
            </span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" /> Ultra HD 1080p Stream
            </span>
          </div>
          <Link
            href="/all-in-one-downloader"
            onClick={onClose}
            className="text-violet-400 hover:text-violet-300 font-bold hover:underline flex items-center gap-1"
          >
            Universal Auto-Detect Tool →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
