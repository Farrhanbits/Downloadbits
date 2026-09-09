import { pinterest } from 'btch-downloader';

export interface PinterestMediaResult {
  title: string;
  videoUrl?: string | null;
  imageUrl?: string | null;
  thumbnail?: string | null;
  mediaType: 'video' | 'image';
}

export async function extractPinterestMedia(inputUrl: string): Promise<PinterestMediaResult | null> {
  let finalUrl = inputUrl.trim();

  // 1. Follow pin.it shortened link redirects
  if (finalUrl.includes('pin.it')) {
    try {
      const resp = await fetch(finalUrl, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
      });
      if (resp.url) {
        finalUrl = resp.url;
      }
    } catch (e) {
      console.warn('Failed to resolve pin.it redirect:', e);
    }
  }

  // 2. Try btch-downloader library first
  try {
    const res: any = await pinterest(finalUrl);
    if (res && res.result) {
      const vid = res.result.video || res.result.videos;
      const img = res.result.image || res.result.thumbnail || res.result.url;
      if (vid || img) {
        const isVid = !!vid;
        return {
          title: res.result.title || 'Pinterest Pin Media',
          videoUrl: vid || null,
          imageUrl: img || null,
          thumbnail: img || vid,
          mediaType: isVid ? 'video' : 'image',
        };
      }
    }
  } catch (e) {
    console.warn('btch-downloader pinterest failed, attempting HTML scraping fallback...', e);
  }

  // 3. Fallback: Scraping Pinterest Pin Webpage
  try {
    const resp = await fetch(finalUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!resp.ok) {
      console.warn(`Pinterest fetch returned status ${resp.status}`);
    }

    const html = await resp.text();

    // Extract Title
    let title = 'Pinterest Pin';
    const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) || html.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].replace(' - Pinterest', '').replace('&quot;', '"').trim();
    }

    // Extract Video URL
    let videoUrl: string | null = null;
    const ogVideoMatch =
      html.match(/<meta\s+property="og:video(?::secure_url)?"\s+content="([^"]+)"/i) ||
      html.match(/<meta\s+name="og:video"\s+content="([^"]+)"/i);

    if (ogVideoMatch && ogVideoMatch[1]) {
      videoUrl = ogVideoMatch[1];
    } else {
      // Regex search for v1.pinimg.com video mp4 urls
      const mp4Matches =
        html.match(/https:\\\/\\\/v1\.pinimg\.com\\\/videos\\\/[^\s"']+\.mp4/g) ||
        html.match(/https:\/\/v1\.pinimg\.com\/videos\/[^\s"']+\.mp4/g);
      if (mp4Matches && mp4Matches.length > 0) {
        videoUrl = mp4Matches[0].replace(/\\\//g, '/');
      }
    }

    // Extract Image URL
    let imageUrl: string | null = null;
    const ogImageMatch =
      html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) ||
      html.match(/<meta\s+name="og:image"\s+content="([^"]+)"/i);

    if (ogImageMatch && ogImageMatch[1]) {
      imageUrl = ogImageMatch[1];
    } else {
      const imgMatches =
        html.match(/https:\\\/\\\/i\.pinimg\.com\\\/[^\s"']+\.(?:jpg|png|jpeg|webp)/g) ||
        html.match(/https:\/\/i\.pinimg\.com\/[^\s"']+\.(?:jpg|png|jpeg|webp)/g);
      if (imgMatches && imgMatches.length > 0) {
        imageUrl = imgMatches[0].replace(/\\\//g, '/');
      }
    }

    // Upgrade image to full-resolution 'originals'
    if (imageUrl && (imageUrl.includes('/736x/') || imageUrl.includes('/474x/') || imageUrl.includes('/236x/'))) {
      imageUrl = imageUrl.replace(/\/(?:736x|474x|236x)\//, '/originals/');
    }

    if (videoUrl || imageUrl) {
      return {
        title,
        videoUrl,
        imageUrl,
        thumbnail: imageUrl || videoUrl,
        mediaType: videoUrl ? 'video' : 'image',
      };
    }
  } catch (e) {
    console.error('Pinterest HTML scraper error:', e);
  }

  return null;
}
