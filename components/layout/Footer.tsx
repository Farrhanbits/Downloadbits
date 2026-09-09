'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Heart, Github, Twitter, Instagram, ArrowDownToLine, Code2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050506] pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Download anything, instantly. The fastest, watermark-free multi-platform media downloader for Instagram, Pinterest, Twitter/X, and more.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/50 hover:text-violet-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/50 hover:text-violet-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/50 hover:text-violet-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools Links */}
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
                  Pinterest Video Downloader
                </Link>
              </li>
              <li>
                <Link href="/twitter-downloader" className="hover:text-violet-300 transition-colors">
                  Twitter / X Downloader
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
                  Supported Media Formats
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
            <strong>Disclaimer:</strong> Downloadbits is an independent online personal utility tool for media content backup. We do not host, store, or retransmit any copyrighted videos or photos on our servers. All media files belong to their respective content creators and owners. Please obtain permission from the original creator before downloading copyrighted material.
          </p>
        </div>

        {/* Bottom Bar with Developer Credit */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Downloadbits. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono">
            <Code2 className="w-3.5 h-3.5 text-violet-400" />
            <span>Designed & Developed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by</span>
            <a
              href="https://farhanbits.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-violet-300 hover:text-pink-400 transition-colors underline decoration-violet-500/50 underline-offset-4"
            >
              farhanbits
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
