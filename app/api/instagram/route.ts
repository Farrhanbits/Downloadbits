import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url, quality } = await req.json();
    if (!url) return NextResponse.json({ error: 'Missing URL' }, { status: 400 });

    return NextResponse.json({
      success: true,
      platform: 'instagram',
      downloadUrl: `https://samples.downloadbits.com/instagram_${quality || '1080p'}.mp4`,
      filename: `Downloadbits_Instagram_${Date.now()}.mp4`,
      quality: quality || '1080p',
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Instagram resolver failed' }, { status: 500 });
  }
}
