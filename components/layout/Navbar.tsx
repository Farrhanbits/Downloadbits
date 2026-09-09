'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, Sparkles, ArrowDownToLine } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsToolsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsToolsOpen(false);
    }, 150);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      {/* Floating Header Container matching Page Width (max-w-7xl) */}
      <div className="relative max-w-7xl mx-auto">
        <nav
          className={`w-full rounded-2xl px-6 py-3.5 bg-[#0c0c10]/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-violet-950/40 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'border-violet-500/35 bg-[#0c0c10]/95 shadow-violet-900/40' : ''
          }`}
        >
          {/* Modern Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-pink-500 p-[1px] shadow-lg shadow-violet-600/40 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[11px] bg-[#0c0c10] flex items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-pink-500/20 group-hover:opacity-100 transition-opacity" />
                <ArrowDownToLine className="w-5 h-5 text-violet-300 group-hover:text-white transition-colors relative z-10" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-0.5 font-sans">
                Download<span className="bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">bits</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                Media Engine
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {/* Tools Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors py-1.5 px-3.5 rounded-xl ${
                  isToolsOpen
                    ? 'text-violet-300 bg-violet-600/20 border border-violet-500/30'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Tools</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isToolsOpen ? 'rotate-180 text-violet-400' : 'text-zinc-400'
                  }`}
                />
              </button>
            </div>

            <Link
              href="/instagram-downloader"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Instagram
            </Link>

            <Link
              href="/pinterest-downloader"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Pinterest
            </Link>

            <Link
              href="/twitter-downloader"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Twitter / X
            </Link>

            <Link
              href="/how-it-works"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
          </div>

          {/* CTA Right Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/all-in-one-downloader"
              className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/35 hover:shadow-violet-600/55 hover:scale-105 transition-all duration-200 border border-violet-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-200" />
              <span>Paste & Download</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {isToolsOpen && (
            <MegaMenu
              onClose={() => setIsToolsOpen(false)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="md:hidden mt-3 p-5 rounded-2xl glass-card border border-white/15 bg-[#0c0c10]/95 backdrop-blur-2xl flex flex-col gap-3 shadow-2xl">
              <Link
                href="/instagram-downloader"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-zinc-200 font-medium text-sm"
              >
                Instagram Downloader
              </Link>
              <Link
                href="/pinterest-downloader"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-zinc-200 font-medium text-sm"
              >
                Pinterest Downloader
              </Link>
              <Link
                href="/twitter-downloader"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-zinc-200 font-medium text-sm"
              >
                Twitter / X Downloader
              </Link>
              <Link
                href="/all-in-one-downloader"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-zinc-200 font-medium text-sm"
              >
                Universal Downloader
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-zinc-200 font-medium text-sm"
              >
                How It Works
              </Link>
              <Link
                href="/all-in-one-downloader"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 text-center py-3 rounded-xl bg-violet-600 text-white font-bold text-sm shadow-lg shadow-violet-600/30"
              >
                Start Free Download
              </Link>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
