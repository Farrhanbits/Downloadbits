import { NextRequest, NextResponse } from 'next/server';
import { youtube } from 'btch-downloader';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string' || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
      return NextResponse.json({ error: 'Please enter a valid YouTube or Shorts URL.' }, { status: 400 });
    }

    const res: any = await youtube(url);

    if (res && (res.mp4 || res.mp3)) {
      return NextResponse.json({
        success: true,
        platform: 'youtube',
        media: {
          title: res.title || 'YouTube Video',
          author: res.author ? `@${res.author}` : '@youtube_creator',
          thumbnail: res.thumbnail || 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=800&auto=format&fit=crop',
          mp4Url: res.mp4,
          mp3Url: res.mp3,
          filename: `Downloadbits_YouTube_${Date.now()}.mp4`,
        },
      });
    }

    return NextResponse.json(
      { error: 'Could not extract media from this YouTube video.' },
      { status: 422 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'YouTube extraction failed.' },
      { status: 500 }
    );
  }
}
