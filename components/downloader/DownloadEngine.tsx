'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Play,
  Pause,
  FileVideo,
  Music,
  RefreshCw,
  Zap,
  Globe,
  Instagram,
  Pin,
  Twitter,
  Youtube,
  DownloadCloud,
  Images,
  Image as ImageIcon,
  Video,
} from 'lucide-react';
import { detectPlatform, PLATFORMS, PlatformMetadata } from '@/lib/platform-detect';
import confetti from 'canvas-confetti';

type DownloadState = 'idle' | 'fetching' | 'preview' | 'downloading' | 'success' | 'error';
type CategoryTab = 'reels' | 'posts' | 'stories' | 'audio';

interface DownloadEngineProps {
  defaultPlatform?: string;
  className?: string;
}

export const DownloadEngine: React.FC<DownloadEngineProps> = ({
  defaultPlatform,
  className = '',
}) => {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState<CategoryTab>('reels');
  const [state, setState] = useState<DownloadState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [metadata, setMetadata] = useState<any>(null);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [progress, setProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState('14.2 MB/s');
  const [activeDownloadUrl, setActiveDownloadUrl] = useState('');
  const [activeFilename, setActiveFilename] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Tab definitions matching UI mockup
  const tabs = [
    { id: 'reels' as CategoryTab, label: 'Reels', icon: Video, placeholder: 'Paste Reel, Short or Video link...' },
    { id: 'posts' as CategoryTab, label: 'Photos / Posts', icon: Images, placeholder: 'Paste Photo, Carousel or Pin link...' },
    { id: 'stories' as CategoryTab, label: 'Stories', icon: Sparkles, placeholder: 'Paste Social Story link...' },
    { id: 'audio' as CategoryTab, label: 'Audio MP3', icon: Music, placeholder: 'Paste Video link for MP3 extraction...' },
  ];

  // Dynamic Typewriter Placeholder fallback
  const placeholders = [
    'Paste Instagram Reel, Carousel or Story link...',
    'Paste Pinterest Pin, Video or Board link...',
    'Paste Twitter / X post video or photo link...',
    'Paste YouTube Video or Short link...',
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const currentTabObj = tabs.find((t) => t.id === activeTab);
  const activePlaceholder = currentTabObj?.placeholder || placeholders[placeholderIndex];

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
    setIsPlaying(false);

    try {
      const res = await fetch('/api/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch media details.');
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

  const togglePlayVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStartDownload = () => {
    const selectedObj = metadata?.qualities?.find((q: any) => q.value === selectedQuality);
    const targetUrl = selectedObj?.downloadUrl || activeDownloadUrl;
    const isImage = metadata?.mediaType === 'image';
    const defaultExt = isImage ? 'jpg' : 'mp4';
    const targetName = selectedObj?.filename || activeFilename || `Downloadbits_Media_${Date.now()}.${defaultExt}`;

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

  const handleDownloadAllCarousel = () => {
    if (!metadata || !metadata.mediaList) return;
    setState('downloading');
    setProgress(0);

    // Download each item in carousel sequentially
    metadata.mediaList.forEach((item: any, idx: number) => {
      setTimeout(() => {
        triggerBrowserDownload(item.downloadUrl, item.filename);
      }, idx * 400);
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setState('success');
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#8B5CF6', '#C084FC', '#7C3AED', '#E879F9'],
          });
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  const handleReset = () => {
    setUrl('');
    setState('idle');
    setMetadata(null);
    setProgress(0);
    setErrorMessage('');
    setActiveDownloadUrl('');
    setActiveFilename('');
    setIsPlaying(false);
  };

  const renderPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case 'Instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'Pin':
        return <Pin className="w-4 h-4 text-red-500" />;
      case 'Twitter':
        return <Twitter className="w-4 h-4 text-sky-400" />;
      case 'Youtube':
        return <Youtube className="w-4 h-4 text-red-600" />;
      default:
        return <Globe className="w-4 h-4 text-violet-400" />;
    }
  };

  return (
    <div className={`w-full max-w-3xl mx-auto space-y-5 ${className}`}>
      {/* Sleek Category Filter Tabs Bar (matching requested UI) */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[#0c0c10]/90 border border-white/10 backdrop-blur-xl shadow-xl max-w-full overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 text-white font-bold shadow-[0_0_22px_rgba(236,72,153,0.45)] border border-pink-400/50 scale-[1.02]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white animate-pulse' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Bar Card */}
      <div className="relative p-2.5 rounded-2xl glass-card bg-[#0c0c10]/95 border border-white/15 shadow-2xl shadow-violet-950/40">
        <form onSubmit={handleResolve} className="flex flex-col sm:flex-row items-center gap-2">
          {/* Detected Platform Indicator Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 shrink-0">
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
              placeholder={activePlaceholder}
              className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white px-2 py-1 rounded bg-white/5"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={!url.trim() || state === 'fetching'}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm transition-all duration-300 shrink-0 ${
              !url.trim() || state === 'fetching'
                ? 'bg-white/10 text-zinc-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 text-white shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {state === 'fetching' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-violet-300" />
                <span>Parsing...</span>
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
            <h4 className="text-sm font-bold text-zinc-100">Fetching Media Streams & Photos...</h4>
            <p className="text-xs text-zinc-400">
              Extracting HD media files and photos for {detectedPlatform.name}.
            </p>
          </motion.div>
        )}

        {/* PREVIEW READY STATE */}
        {state === 'preview' && metadata && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 sm:p-6 rounded-2xl glass-card bg-[#141319]/95 border border-violet-500/40 space-y-4 shadow-2xl text-left"
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-900/60 text-violet-300 border border-violet-700/50 font-mono">
                  {metadata.mediaType === 'image' ? 'Photo / Image' : metadata.mediaType || 'Media Stream'}
                </span>
                <span className="text-xs text-zinc-400 font-mono font-semibold">{metadata.author}</span>
              </div>
              <span className="text-xs font-mono text-violet-400">#{metadata.shortcode}</span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-zinc-100 line-clamp-2 leading-snug">
              {metadata.title}
            </h3>

            {/* MULTI-PHOTO CAROUSEL GRID (If post contains multiple photos/images) */}
            {metadata.isCarousel && metadata.mediaList && metadata.mediaList.length > 1 ? (
              <div className="space-y-4 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                    <Images className="w-4 h-4 text-pink-400" />
                    Carousel Post ({metadata.mediaList.length} Photos/Items Found)
                  </span>
                  <button
                    onClick={handleDownloadAllCarousel}
                    className="px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-pink-600/30 transition-all self-start sm:self-auto"
                  >
                    <DownloadCloud className="w-3.5 h-3.5" />
                    <span>Download All Photos ({metadata.mediaList.length})</span>
                  </button>
                </div>

                {/* Grid of photos/media */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
                  {metadata.mediaList.map((item: any) => (
                    <div
                      key={item.id}
                      className="relative rounded-xl overflow-hidden bg-black/60 border border-white/10 group aspect-square flex flex-col justify-between p-2"
                    >
                      <img
                        src={item.thumbnail}
                        alt={`Photo ${item.id}`}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                        <button
                          onClick={() => triggerBrowserDownload(item.downloadUrl, item.filename)}
                          className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-bold shadow-lg flex items-center gap-1 hover:bg-violet-500"
                        >
                          <Download className="w-3 h-3" />
                          <span>Photo #{item.id}</span>
                        </button>
                      </div>
                      <span className="relative z-10 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white self-start">
                        #{item.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* SINGLE VIDEO / IMAGE PREVIEW */
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-1">
                {/* Playable Video / Image Preview Container */}
                <div className="relative w-full sm:w-44 h-40 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0 group">
                  {metadata.mediaType === 'image' ? (
                    <img
                      src={metadata.thumbnail}
                      alt={metadata.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        src={metadata.videoPreviewUrl}
                        poster={metadata.thumbnail}
                        controls={false}
                        playsInline
                        loop
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay Play/Pause Button */}
                      <button
                        onClick={togglePlayVideo}
                        className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors flex items-center justify-center text-white"
                      >
                        <div className="w-10 h-10 rounded-full bg-violet-600/90 backdrop-blur-md flex items-center justify-center shadow-lg shadow-violet-600/50 group-hover:scale-110 transition-transform">
                          {isPlaying ? (
                            <Pause className="w-5 h-5 fill-white" />
                          ) : (
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          )}
                        </div>
                      </button>
                    </>
                  )}

                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-200">
                    {metadata.duration}
                  </span>
                </div>

                {/* Format Selector */}
                <div className="flex-1 space-y-3 min-w-0 w-full">
                  <p className="text-[11px] text-zinc-400 font-mono truncate">
                    Target File: <span className="text-violet-300 font-semibold">{activeFilename}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {metadata.qualities.map((q: any) => (
                      <button
                        key={q.value}
                        onClick={() => handleSelectQuality(q)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                          selectedQuality === q.value
                            ? 'bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold border border-pink-400 shadow-md shadow-pink-600/30'
                            : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                      >
                        {q.value === 'mp3' ? (
                          <Music className="w-3 h-3 text-pink-400" />
                        ) : q.value === 'jpg' || q.value === 'png' || q.value === 'webp' ? (
                          <ImageIcon className="w-3 h-3 text-pink-400" />
                        ) : (
                          <FileVideo className="w-3 h-3 text-violet-400" />
                        )}
                        <span>{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA Download Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={metadata.isCarousel ? handleDownloadAllCarousel : handleStartDownload}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-[1.01] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>
                  {metadata.isCarousel
                    ? `Download All ${metadata.mediaList.length} Photos`
                    : metadata.mediaType === 'image'
                    ? `Download HD Image (${selectedQuality.toUpperCase()})`
                    : `Start HD Download (${selectedQuality.toUpperCase()})`}
                </span>
              </button>
              <button
                onClick={handleReset}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Download another link"
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
            className="p-5 rounded-2xl glass-card bg-[#141319]/95 border border-violet-500/50 space-y-4 text-left"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-violet-300 font-semibold flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Streaming files to Downloads...
              </span>
              <span className="text-zinc-400">Speed: {downloadSpeed}</span>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 rounded-full shadow-lg shadow-pink-500/50"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="truncate max-w-[280px] font-mono text-zinc-300">{activeFilename}</span>
              <span className="font-bold text-white font-mono">{progress}%</span>
            </div>
          </motion.div>
        )}

        {/* SUCCESS STATE WITH DIRECT FILE DOWNLOAD */}
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
                Your media files have been downloaded directly to your computer.
              </p>
            </div>

            {/* Direct Re-Download Button */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono text-zinc-300">
              <span className="truncate max-w-[240px] text-zinc-400">{activeFilename}</span>
              <a
                href={activeDownloadUrl}
                download={activeFilename}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shrink-0 shadow-md shadow-emerald-600/30"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>Re-Download File</span>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md shadow-pink-600/30"
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
            className="p-5 rounded-2xl glass-card bg-rose-950/20 border border-rose-500/40 space-y-3 text-left"
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
