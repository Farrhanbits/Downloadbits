import { NextRequest, NextResponse } from 'next/server';
import { twitter } from 'btch-downloader';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string' || (!url.includes('twitter.com') && !url.includes('x.com'))) {
      return NextResponse.json({ error: 'Please enter a valid Twitter / X URL.' }, { status: 400 });
    }

    const res: any = await twitter(url);

    if (res && res.url && Array.isArray(res.url) && res.url.length > 0) {
      const bestMedia = res.url[res.url.length - 1];
      const videoUrl = bestMedia.hd || bestMedia.sd || bestMedia.url;
      const thumbnail = res.thumbnail || bestMedia.thumbnail;

      return NextResponse.json({
        success: true,
        platform: 'twitter',
        media: {
          videoUrl,
          thumbnail,
          title: res.title || 'Twitter Video Clip',
          filename: `Downloadbits_Twitter_${Date.now()}.mp4`,
        },
      });
    }

    return NextResponse.json(
      { error: 'Could not extract media from this Twitter / X post.' },
      { status: 422 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Twitter extraction failed.' },
      { status: 500 }
    );
  }
}
