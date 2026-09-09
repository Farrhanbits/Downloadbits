import { NextRequest, NextResponse } from 'next/server';
import { extractPinterestMedia } from '@/lib/pinterest-extractor';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string' || (!url.includes('pinterest.com') && !url.includes('pin.it'))) {
      return NextResponse.json({ error: 'Please enter a valid Pinterest URL.' }, { status: 400 });
    }

    const mediaResult = await extractPinterestMedia(url);

    if (mediaResult && (mediaResult.videoUrl || mediaResult.imageUrl)) {
      const mediaUrl = mediaResult.videoUrl || mediaResult.imageUrl!;
      const isVideo = mediaResult.mediaType === 'video';
      const extension = isVideo ? 'mp4' : 'jpg';

      return NextResponse.json({
        success: true,
        platform: 'pinterest',
        media: {
          videoUrl: mediaUrl,
          imageUrl: mediaResult.imageUrl || mediaUrl,
          thumbnail: mediaResult.thumbnail || mediaUrl,
          title: mediaResult.title,
          mediaType: mediaResult.mediaType,
          filename: `Downloadbits_Pinterest_${Date.now()}.${extension}`,
          downloadUrl: `/api/download-file?url=${encodeURIComponent(mediaUrl)}&filename=Downloadbits_Pinterest_${Date.now()}.${extension}`,
        },
      });
    }

    return NextResponse.json(
      { error: 'Could not extract media from this Pinterest pin. Please verify the URL and try again.' },
      { status: 422 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Pinterest extraction failed.' },
      { status: 500 }
    );
  }
}
