'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Play,
  FileVideo,
  Music,
  RefreshCw,
  Zap,
  Globe,
  Instagram,
  Pin,
  Twitter,
  DownloadCloud,
} from 'lucide-react';
import { detectPlatform, PLATFORMS, PlatformMetadata } from '@/lib/platform-detect';
import confetti from 'canvas-confetti';

type DownloadState = 'idle' | 'fetching' | 'preview' | 'downloading' | 'success' | 'error';

interface DownloadEngineProps {
  defaultPlatform?: string;
  className?: string;
}

export const DownloadEngine: React.FC<DownloadEngineProps> = ({
  defaultPlatform,
  className = '',
}) => {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<DownloadState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [metadata, setMetadata] = useState<any>(null);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [progress, setProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState('14.2 MB/s');
  const [activeDownloadUrl, setActiveDownloadUrl] = useState('');
  const [activeFilename, setActiveFilename] = useState('');

  // Typewriter placeholder effect for Hero
  const placeholders = [
    'Paste Instagram Reel or Story link here...',
    'Paste Pinterest Pin or Video link here...',
    'Paste Twitter / X post video link here...',
    'Paste any social media media link...',
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const detectedPlatform: PlatformMetadata = url.trim()
    ? detectPlatform(url)
    : defaultPlatform && PLATFORMS[defaultPlatform as keyof typeof PLATFORMS]
    ? PLATFORMS[defaultPlatform as keyof typeof PLATFORMS]
    : PLATFORMS.unknown;

  // Real Browser File Download Helper
  const triggerBrowserDownload = (downloadUrl: string, filename: string) => {
    try {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to trigger native download:', err);
      window.open(downloadUrl, '_blank');
    }
  };

  const handleResolve = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setState('fetching');
    setErrorMessage('');

    try {
      const res = await fetch('/api/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch video details.');
      }

      setMetadata(data.metadata);
      if (data.metadata.qualities && data.metadata.qualities.length > 0) {
        setSelectedQuality(data.metadata.qualities[0].value);
        setActiveDownloadUrl(data.metadata.qualities[0].downloadUrl);
        setActiveFilename(data.metadata.qualities[0].filename);
      }
      setState('preview');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Unsupported link or network error. Please try again.');
      setState('error');
    }
  };

  const handleSelectQuality = (q: any) => {
    setSelectedQuality(q.value);
    setActiveDownloadUrl(q.downloadUrl);
    setActiveFilename(q.filename);
  };

  const handleStartDownload = () => {
    const selectedObj = metadata?.qualities?.find((q: any) => q.value === selectedQuality);
    const targetUrl = selectedObj?.downloadUrl || activeDownloadUrl;
    const targetName = selectedObj?.filename || activeFilename || `Downloadbits_Media_${Date.now()}.mp4`;

    setState('downloading');
    setProgress(0);

    // Trigger REAL browser file download immediately
    triggerBrowserDownload(targetUrl, targetName);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setState('success');
          // Fire celebration confetti
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#8B5CF6', '#C084FC', '#7C3AED', '#E879F9'],
          });
          return 100;
        }
        const nextSpeed = (14 + Math.random() * 8).toFixed(1);
        setDownloadSpeed(`${nextSpeed} MB/s`);
        return prev + 25;
      });
    }, 200);
  };

  const handleReset = () => {
    setUrl('');
    setState('idle');
    setMetadata(null);
    setProgress(0);
    setErrorMessage('');
    setActiveDownloadUrl('');
    setActiveFilename('');
  };

  const renderPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case 'Instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'Pin':
        return <Pin className="w-4 h-4 text-red-500" />;
      case 'Twitter':
        return <Twitter className="w-4 h-4 text-sky-400" />;
      default:
        return <Globe className="w-4 h-4 text-violet-400" />;
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto space-y-4 ${className}`}>
      {/* Input Bar Card */}
      <div className="relative p-2.5 rounded-2xl glass-card bg-[#0c0c10]/90 border border-white/15 shadow-2xl shadow-violet-950/30">
        <form onSubmit={handleResolve} className="flex flex-col sm:flex-row items-center gap-2">
          {/* Detected Platform Indicator Badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 shrink-0">
            {renderPlatformIcon(detectedPlatform.iconName)}
            <span className="text-xs font-semibold text-zinc-300">
              {detectedPlatform.name}
            </span>
          </div>

          {/* Text Input */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (state !== 'idle' && state !== 'fetching') setState('idle');
              }}
              placeholder={placeholders[placeholderIndex]}
              className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={!url.trim() || state === 'fetching'}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shrink-0 ${
              !url.trim() || state === 'fetching'
                ? 'bg-white/10 text-zinc-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-600 via-purple-600 to-violet-500 text-white shadow-lg shadow-violet-600/40 hover:shadow-violet-600/60 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {state === 'fetching' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-violet-300" />
                <span>Fetching...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-violet-200 fill-violet-200" />
                <span>Download</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Dynamic Animated Content States */}
      <AnimatePresence mode="wait">
        {/* FETCHING STATE */}
        {state === 'fetching' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-2xl glass-card bg-[#141319]/90 border border-violet-500/30 text-center space-y-3"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-600/20 text-violet-400 animate-pulse">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h4 className="text-sm font-bold text-zinc-100">Fetching Media Stream...</h4>
            <p className="text-xs text-zinc-400">
              Resolving high-speed download link for {detectedPlatform.name}.
            </p>
          </motion.div>
        )}

        {/* PREVIEW READY STATE */}
        {state === 'preview' && metadata && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-2xl glass-card bg-[#141319]/95 border border-violet-500/40 space-y-4 shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Media Thumbnail */}
              <div className="relative w-full sm:w-32 h-28 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 group">
                <img
                  src={metadata.thumbnail}
                  alt={metadata.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[10px] font-mono text-zinc-300">
                  {metadata.duration}
                </span>
              </div>

              {/* Details & Quality Selector */}
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-violet-900/50 text-violet-300 border border-violet-700/50">
                    Direct Stream Ready
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{metadata.author}</span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2 leading-snug">
                  {metadata.title}
                </h3>

                {/* Quality Options Radio/Buttons */}
                <div className="pt-1 flex flex-wrap items-center gap-2">
                  {metadata.qualities.map((q: any) => (
                    <button
                      key={q.value}
                      onClick={() => handleSelectQuality(q)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                        selectedQuality === q.value
                          ? 'bg-violet-600 text-white font-bold border border-violet-400 shadow-md shadow-violet-600/30'
                          : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
                      }`}
                    >
                      {q.value === 'mp3' ? (
                        <Music className="w-3 h-3 text-pink-400" />
                      ) : (
                        <FileVideo className="w-3 h-3 text-violet-400" />
                      )}
                      <span>{q.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleStartDownload}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/40 hover:shadow-violet-600/60 hover:scale-[1.01] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Start HD Download ({selectedQuality.toUpperCase()})</span>
              </button>
              <button
                onClick={handleReset}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Download another"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* DOWNLOADING STATE */}
        {state === 'downloading' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-2xl glass-card bg-[#141319]/95 border border-violet-500/50 space-y-4"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-violet-300 font-semibold flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Saving file to Downloads...
              </span>
              <span className="text-zinc-400">Speed: {downloadSpeed}</span>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-violet-500/50"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Streaming: {activeFilename}</span>
              <span className="font-bold text-white">{progress}%</span>
            </div>
          </motion.div>
        )}

        {/* SUCCESS STATE WITH DIRECT FILE LINK */}
        {state === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-2xl glass-card bg-[#141319]/95 border border-emerald-500/40 text-center space-y-4 shadow-2xl"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-100">Saved to Your Downloads!</h3>
              <p className="text-xs text-zinc-400">
                Your media file has been downloaded directly to your computer.
              </p>
            </div>

            {/* Direct Re-Download Link for Native OS */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono text-zinc-300">
              <span className="truncate max-w-[240px] text-zinc-400">{activeFilename}</span>
              <a
                href={activeDownloadUrl}
                download={activeFilename}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shrink-0"
              >
                <DownloadCloud className="w-3.5 h-3.5" />
                <span>Re-Download File</span>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-xs flex items-center gap-2 hover:bg-violet-500 transition-colors shadow-md shadow-violet-600/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Download Another Link</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ERROR STATE */}
        {state === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-2xl glass-card bg-rose-950/20 border border-rose-500/40 space-y-3"
          >
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h4 className="text-sm font-bold text-rose-200">Unable to Fetch Media</h4>
            </div>
            <p className="text-xs text-rose-300/80 leading-relaxed">
              {errorMessage}
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={handleResolve}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-white/5 text-zinc-400 text-xs hover:text-white"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
