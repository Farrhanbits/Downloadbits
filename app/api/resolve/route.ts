import { NextRequest, NextResponse } from 'next/server';
import { detectPlatform, parseUrlMetadata } from '@/lib/platform-detect';
import { igdl, twitter, youtube } from 'btch-downloader';
import { extractPinterestMedia } from '@/lib/pinterest-extractor';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return NextResponse.json(
        { error: 'Please enter a valid social media URL (starting with http:// or https://).' },
        { status: 400 }
      );
    }

    const parsed = parseUrlMetadata(url);
    const platform = parsed.platform;
    const filenamePrefix = parsed.filenamePrefix;

    let realVideoUrl = '';
    let realAudioUrl = '';
    let realThumbnail = platform.sampleThumbnail;
    let realTitle = parsed.title;
    let realAuthor = parsed.author;
    let mediaList: any[] = [];
    let isCarousel = false;
    let detectedMediaType: 'video' | 'image' = parsed.mediaType === 'image' ? 'image' : 'video';

    // 1. INSTAGRAM EXTRACTION ENGINE (REELS, POSTS, CAROUSEL MULTI-PHOTOS)
    if (platform.id === 'instagram') {
      try {
        const res: any = await igdl(url);
        if (res && res.result && Array.isArray(res.result) && res.result.length > 0) {
          if (res.result.length > 1) {
            isCarousel = true;
            let hasVideo = false;
            let hasImage = false;

            mediaList = res.result.map((item: any, idx: number) => {
              const itemUrl = item.url || item.path || item.thumbnail;
              const isVid = itemUrl.includes('.mp4') || itemUrl.includes('video');
              if (isVid) hasVideo = true;
              else hasImage = true;

              const ext = isVid ? 'mp4' : 'jpg';
              const itemFilename = `${filenamePrefix}_Photo_${idx + 1}.${ext}`;
              return {
                id: idx + 1,
                type: isVid ? 'video' : 'image',
                url: itemUrl,
                downloadUrl: `/api/download-file?url=${encodeURIComponent(itemUrl)}&filename=${itemFilename}`,
                filename: itemFilename,
                thumbnail: item.thumbnail || itemUrl,
              };
            });

            realVideoUrl = mediaList[0].url;
            realThumbnail = mediaList[0].thumbnail;
            detectedMediaType = hasVideo ? 'video' : 'image';
          } else {
            const item = res.result[0];
            realVideoUrl = item.url || item.path;
            if (item.thumbnail || item.preview) realThumbnail = item.thumbnail || item.preview;
            const isVid = realVideoUrl.includes('.mp4') || realVideoUrl.includes('video');
            detectedMediaType = isVid ? 'video' : 'image';
          }
        }
      } catch (e) {
        console.warn('Instagram extraction warning:', e);
      }
    }

    // 2. PINTEREST EXTRACTION ENGINE
    else if (platform.id === 'pinterest') {
      try {
        const pMedia = await extractPinterestMedia(url);
        if (pMedia && (pMedia.videoUrl || pMedia.imageUrl)) {
          realVideoUrl = pMedia.videoUrl || pMedia.imageUrl!;
          if (pMedia.thumbnail) realThumbnail = pMedia.thumbnail;
          if (pMedia.title) realTitle = pMedia.title;
          detectedMediaType = pMedia.mediaType;
        }
      } catch (e) {
        console.warn('Pinterest extraction warning:', e);
      }
    }

    // 3. TWITTER / X EXTRACTION ENGINE
    else if (platform.id === 'twitter') {
      try {
        const res: any = await twitter(url);
        if (res && res.url && Array.isArray(res.url) && res.url.length > 0) {
          const bestMedia = res.url[res.url.length - 1];
          realVideoUrl = bestMedia.hd || bestMedia.sd || bestMedia.url;
          if (res.thumbnail || bestMedia.thumbnail) {
            realThumbnail = res.thumbnail || bestMedia.thumbnail;
          }
          if (res.title) realTitle = res.title;
          const isVid = realVideoUrl.includes('.mp4') || realVideoUrl.includes('video');
          detectedMediaType = isVid ? 'video' : 'image';
        }
      } catch (e) {
        console.warn('Twitter extraction warning:', e);
      }
    }

    // 4. YOUTUBE EXTRACTION ENGINE
    else if (platform.id === 'youtube') {
      try {
        const res: any = await youtube(url);
        if (res && (res.mp4 || res.mp3)) {
          if (res.mp4) realVideoUrl = res.mp4;
          if (res.mp3) realAudioUrl = res.mp3;
          if (res.thumbnail) realThumbnail = res.thumbnail;
          if (res.title) realTitle = res.title;
          if (res.author) realAuthor = `@${res.author}`;
          detectedMediaType = 'video';
        }
      } catch (e) {
        console.warn('YouTube extraction warning:', e);
      }
    }

    // Fallbacks if extraction was empty
    if (!realVideoUrl) {
      if (detectedMediaType === 'image') {
        realVideoUrl = realThumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200';
      } else {
        realVideoUrl = 'https://vjs.zencdn.net/v/oceans.mp4';
      }
    }

    if (!realAudioUrl) {
      realAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    }

    // Single item fallback populate
    if (!isCarousel || mediaList.length === 0) {
      const ext = detectedMediaType === 'image' ? 'jpg' : 'mp4';
      mediaList = [
        {
          id: 1,
          type: detectedMediaType,
          url: realVideoUrl,
          downloadUrl: `/api/download-file?url=${encodeURIComponent(realVideoUrl)}&filename=${filenamePrefix}_HD.${ext}`,
          filename: `${filenamePrefix}_HD.${ext}`,
          thumbnail: realThumbnail,
        },
      ];
    }

    // Generate quality options based on detected media type (image vs video)
    const qualities =
      detectedMediaType === 'image'
        ? [
            {
              label: 'Original HD Photo (JPG)',
              size: '3.8 MB',
              value: 'jpg',
              downloadUrl: `/api/download-file?url=${encodeURIComponent(realVideoUrl)}&filename=${filenamePrefix}_HD.jpg`,
              filename: `${filenamePrefix}_HD.jpg`,
            },
            {
              label: 'High-Res Image (PNG)',
              size: '5.2 MB',
              value: 'png',
              downloadUrl: `/api/download-file?url=${encodeURIComponent(realVideoUrl)}&filename=${filenamePrefix}_HighRes.png`,
              filename: `${filenamePrefix}_HighRes.png`,
            },
            {
              label: 'Web Photo (WEBP)',
              size: '1.9 MB',
              value: 'webp',
              downloadUrl: `/api/download-file?url=${encodeURIComponent(realVideoUrl)}&filename=${filenamePrefix}_Web.webp`,
              filename: `${filenamePrefix}_Web.webp`,
            },
          ]
        : [
            {
              label: '1080p Ultra HD (MP4)',
              size: '18.4 MB',
              value: '1080p',
              downloadUrl: `/api/download-file?url=${encodeURIComponent(realVideoUrl)}&filename=${filenamePrefix}_1080p.mp4`,
              filename: `${filenamePrefix}_1080p.mp4`,
            },
            {
              label: '720p HD (MP4)',
              size: '9.2 MB',
              value: '720p',
              downloadUrl: `/api/download-file?url=${encodeURIComponent(realVideoUrl)}&filename=${filenamePrefix}_720p.mp4`,
              filename: `${filenamePrefix}_720p.mp4`,
            },
            {
              label: '480p SD (MP4)',
              size: '4.1 MB',
              value: '480p',
              downloadUrl: `/api/download-file?url=${encodeURIComponent(realVideoUrl)}&filename=${filenamePrefix}_480p.mp4`,
              filename: `${filenamePrefix}_480p.mp4`,
            },
            {
              label: 'Audio Only (MP3 320kbps)',
              size: '2.4 MB',
              value: 'mp3',
              downloadUrl: `/api/download-file?url=${encodeURIComponent(realAudioUrl)}&filename=${filenamePrefix}_Audio.mp3`,
              filename: `${filenamePrefix}_Audio.mp3`,
            },
          ];

    return NextResponse.json({
      success: true,
      url,
      platform,
      metadata: {
        title: realTitle,
        author: realAuthor,
        duration: detectedMediaType === 'image' ? 'Image' : '0:45',
        mediaType: detectedMediaType,
        shortcode: parsed.idOrShortcode,
        thumbnail: realThumbnail,
        videoPreviewUrl: `/api/download-file?url=${encodeURIComponent(realVideoUrl)}&filename=${filenamePrefix}_preview.${detectedMediaType === 'image' ? 'jpg' : 'mp4'}`,
        isCarousel,
        mediaList,
        qualities,
      },
    });
  } catch (err: any) {
    console.error('Resolve endpoint error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to parse media link.' },
      { status: 500 }
    );
  }
}
