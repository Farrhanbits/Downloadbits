export type PlatformType = 'instagram' | 'pinterest' | 'twitter' | 'youtube' | 'tiktok' | 'unknown';

export interface PlatformMetadata {
  id: PlatformType;
  name: string;
  iconName: string;
  color: string;
  badgeBg: string;
  placeholder: string;
  sampleThumbnail: string;
  supportedFormats: string[];
}

export const PLATFORMS: Record<PlatformType, PlatformMetadata> = {
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    iconName: 'Instagram',
    color: '#E1306C',
    badgeBg: 'rgba(225, 48, 108, 0.15)',
    placeholder: 'Paste Instagram Reel, Post or Story link...',
    sampleThumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
    supportedFormats: ['Reels (MP4)', 'Carousel Photos', 'Stories', 'Audio MP3'],
  },
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest',
    iconName: 'Pin',
    color: '#E60023',
    badgeBg: 'rgba(230, 0, 35, 0.15)',
    placeholder: 'Paste Pinterest Pin or Video link...',
    sampleThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    supportedFormats: ['Idea Pins (MP4)', 'HD Images (PNG/JPG)', 'GIFs'],
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter / X',
    iconName: 'Twitter',
    color: '#1DA1F2',
    badgeBg: 'rgba(29, 161, 242, 0.15)',
    placeholder: 'Paste Twitter or X post video link...',
    sampleThumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=800&auto=format&fit=crop',
    supportedFormats: ['HD Video (1080p)', 'GIFs', 'High-Res Images'],
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    iconName: 'Youtube',
    color: '#FF0000',
    badgeBg: 'rgba(255, 0, 0, 0.15)',
    placeholder: 'Paste YouTube Video or Short link...',
    sampleThumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=800&auto=format&fit=crop',
    supportedFormats: ['Shorts (MP4)', '1080p HD Video', 'Audio MP3'],
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    iconName: 'Video',
    color: '#00F2FE',
    badgeBg: 'rgba(0, 242, 254, 0.15)',
    placeholder: 'Paste TikTok video link...',
    sampleThumbnail: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop',
    supportedFormats: ['No Watermark MP4', 'Original Sound MP3'],
  },
  unknown: {
    id: 'unknown',
    name: 'Universal Media',
    iconName: 'Globe',
    color: '#8B5CF6',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    placeholder: 'Paste any Instagram, Pinterest, Twitter or social media link...',
    sampleThumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    supportedFormats: ['Auto-Detected HD Video', 'Photos', 'Audio Extract'],
  },
};

export function detectPlatform(url: string): PlatformMetadata {
  if (!url || typeof url !== 'string') return PLATFORMS.unknown;
  const clean = url.trim().toLowerCase();

  if (clean.includes('instagram.com') || clean.includes('instagr.am')) {
    return PLATFORMS.instagram;
  }
  if (clean.includes('pinterest.com') || clean.includes('pin.it')) {
    return PLATFORMS.pinterest;
  }
  if (clean.includes('twitter.com') || clean.includes('x.com')) {
    return PLATFORMS.twitter;
  }
  if (clean.includes('youtube.com') || clean.includes('youtu.be')) {
    return PLATFORMS.youtube;
  }
  if (clean.includes('tiktok.com')) {
    return PLATFORMS.tiktok;
  }

  return PLATFORMS.unknown;
}

export function parseUrlMetadata(url: string) {
  const platform = detectPlatform(url);
  const clean = url.trim();

  let idOrShortcode = 'media';
  let author = '@creator';
  let mediaType = 'Video';
  let title = 'Social Media Video Clip';

  if (platform.id === 'instagram') {
    const reelMatch = clean.match(/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/i);
    const userMatch = clean.match(/instagram\.com\/([A-Za-z0-9_.-]+)\/(?:p|reel)/i);
    if (reelMatch) idOrShortcode = reelMatch[1];
    if (userMatch) author = `@${userMatch[1]}`;
    else author = '@instagram_creator';

    mediaType = clean.includes('/reel') ? 'Reel' : 'Post';
    title = `Instagram ${mediaType} (#${idOrShortcode}) — 1080p Original Stream`;
  } else if (platform.id === 'pinterest') {
    const pinMatch = clean.match(/(?:pin\/|pin\.it\/)([0-9A-Za-z_-]+)/i);
    if (pinMatch) idOrShortcode = pinMatch[1];
    mediaType = 'Pin';
    author = '@pinterest_creator';
    title = `Pinterest Idea ${mediaType} (#${idOrShortcode}) — HD Media`;
  } else if (platform.id === 'twitter') {
    const tweetMatch = clean.match(/(?:twitter\.com|x\.com)\/([A-Za-z0-9_]+)\/status\/([0-9]+)/i);
    if (tweetMatch) {
      author = `@${tweetMatch[1]}`;
      idOrShortcode = tweetMatch[2];
    }
    mediaType = 'Video Clip';
    title = `Twitter / X ${mediaType} (#${idOrShortcode}) — 1080p HD`;
  } else if (platform.id === 'tiktok') {
    const ttMatch = clean.match(/tiktok\.com\/@([A-Za-z0-9_.-]+)\/video\/([0-9]+)/i);
    if (ttMatch) {
      author = `@${ttMatch[1]}`;
      idOrShortcode = ttMatch[2];
    }
    mediaType = 'TikTok Video';
    title = `TikTok Watermark-Free Video (#${idOrShortcode})`;
  } else {
    idOrShortcode = 'stream_' + Math.floor(Math.random() * 10000);
    title = `Universal Media Stream (#${idOrShortcode})`;
  }

  return {
    platform,
    idOrShortcode,
    author,
    mediaType,
    title,
    filenamePrefix: `Downloadbits_${platform.name.replace(/[^a-zA-Z0-9]/g, '')}_${idOrShortcode}`,
  };
}
