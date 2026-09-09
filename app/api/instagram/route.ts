import { NextRequest, NextResponse } from 'next/server';
import { igdl } from 'btch-downloader';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string' || !url.includes('instagram.com')) {
      return NextResponse.json({ error: 'Please enter a valid Instagram URL.' }, { status: 400 });
    }

    const res = await igdl(url);

    if (!res || !res.result || !Array.isArray(res.result) || res.result.length === 0) {
      return NextResponse.json(
        { error: 'Could not extract media from this Instagram link. The post may be private or unavailable.' },
        { status: 422 }
      );
    }

    const item = res.result[0];
    const videoUrl = item.url || (item as any).path;
    const thumbnail = item.thumbnail || (item as any).preview;

    return NextResponse.json({
      success: true,
      platform: 'instagram',
      media: {
        videoUrl,
        thumbnail,
        filename: (item as any).filename || `Downloadbits_Instagram_${Date.now()}.mp4`,
      },
    });
  } catch (err: any) {
    console.error('Instagram extraction error:', err);
    return NextResponse.json(
      { error: err?.message || 'Instagram extraction failed. Please try again.' },
      { status: 500 }
    );
  }
}
