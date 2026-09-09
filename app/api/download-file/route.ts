import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get('url');
  const filename = searchParams.get('filename') || `Downloadbits_Media_${Date.now()}.mp4`;

  if (!fileUrl) {
    return NextResponse.json({ error: 'Missing file url' }, { status: 400 });
  }

  try {
    const response = await fetch(fileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch media from target server. Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || 'video/mp4';
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Length', arrayBuffer.byteLength.toString());
    headers.set('Cache-Control', 'no-cache');

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    console.error('Download-file proxy error:', err);
    return NextResponse.json(
      { error: err?.message || 'Download proxy failed to stream file.' },
      { status: 500 }
    );
  }
}
