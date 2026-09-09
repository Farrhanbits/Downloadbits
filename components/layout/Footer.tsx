'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Heart,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Framer,
  ArrowDownToLine,
  Sparkles,
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050506] pt-16 pb-12 text-zinc-400 overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-pink-500 p-[1px] shadow-lg shadow-violet-600/40">
                <div className="w-full h-full rounded-[11px] bg-[#0c0c10] flex items-center justify-center text-white">
                  <ArrowDownToLine className="w-4 h-4 text-violet-300" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-0.5">
                Download<span className="bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">bits</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Download anything, instantly. The fastest, watermark-free multi-platform media downloader for Instagram, Pinterest, Twitter/X, and YouTube.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="https://x.com/farhanbits"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter / X"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-600/10 hover:text-sky-400 transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/farhanbits"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-pink-600/10 hover:text-pink-400 transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/farrhan-ahmed"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-blue-400 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Farrhanbits"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-600/10 hover:text-purple-300 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.framer.com/@farhanbits/"
                target="_blank"
                rel="noopener noreferrer"
                title="Framer Portfolio"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-pink-600/10 hover:text-pink-300 transition-all duration-200"
              >
                <Framer className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Popular Tools Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Popular Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/instagram-downloader" className="hover:text-violet-300 transition-colors">
                  Instagram Downloader
                </Link>
              </li>
              <li>
                <Link href="/pinterest-downloader" className="hover:text-violet-300 transition-colors">
                  Pinterest Downloader
                </Link>
              </li>
              <li>
                <Link href="/twitter-downloader" className="hover:text-violet-300 transition-colors">
                  Twitter / X Downloader
                </Link>
              </li>
              <li>
                <Link href="/youtube-downloader" className="hover:text-violet-300 transition-colors">
                  YouTube Downloader
                </Link>
              </li>
              <li>
                <Link href="/all-in-one-downloader" className="hover:text-violet-300 transition-colors">
                  Universal Downloader
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/how-it-works" className="hover:text-violet-300 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/all-in-one-downloader" className="hover:text-violet-300 transition-colors">
                  Supported Formats
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-violet-300 transition-colors">
                  FAQ & Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-violet-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-violet-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3 text-xs text-zinc-500">
          <ShieldAlert className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> Downloadbits is an independent online utility tool for personal media backup. We do not host, store, or retransmit any copyrighted videos or photos on our servers. All media files belong to their respective content creators.
          </p>
        </div>

        {/* Centered Glowing Developer Badge & Copyright */}
        <div className="mt-10 flex flex-col items-center justify-center gap-5 text-center">
          {/* Centered Glowing Badge */}
          <a
            href="https://farhanbits.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-950/80 via-purple-950/80 to-pink-950/80 border border-violet-500/40 hover:border-pink-400/80 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_35px_rgba(236,72,153,0.5)] transition-all duration-300 hover:scale-[1.03]"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-xs font-mono font-medium text-zinc-300 group-hover:text-white transition-colors">
              Designed &amp; Developed with{' '}
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5 animate-bounce" /> by{' '}
              <span className="font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300 bg-clip-text text-transparent underline decoration-violet-400/60 underline-offset-4">
                farhanbits
              </span>
            </span>
          </a>

          {/* Copyright notice */}
          <p className="text-xs text-zinc-500 font-mono">
            © {new Date().getFullYear()} Downloadbits. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
