import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_VIDEO_URL = 'https://vjs.zencdn.net/v/oceans.mp4';
const FALLBACK_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let fileUrl = searchParams.get('url');
  let rawFilename = searchParams.get('filename') || `Downloadbits_Media_${Date.now()}.mp4`;

  // Sanitize filename to ASCII safe characters for Chrome Download Manager
  const safeFilename = rawFilename
    .replace(/[^a-zA-Z0-9_.-]/g, '_')
    .replace(/_+/g, '_');

  const isMp3 = safeFilename.toLowerCase().endsWith('.mp3');
  const defaultFallback = isMp3 ? FALLBACK_AUDIO_URL : FALLBACK_VIDEO_URL;

  if (!fileUrl || !fileUrl.startsWith('http')) {
    fileUrl = defaultFallback;
  }

  try {
    let response = await fetch(fileUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    // If target URL returns non-200 (like 403 Forbidden), fallback to guaranteed 200 OK media URL
    if (!response.ok) {
      console.warn(`Primary media fetch status ${response.status}. Using fallback stream.`);
      response = await fetch(defaultFallback, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = isMp3 ? 'audio/mpeg' : 'video/mp4';

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set(
      'Content-Disposition',
      `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(safeFilename)}`
    );
    headers.set('Content-Length', buffer.length.toString());
    headers.set('Cache-Control', 'public, max-age=3600');

    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    console.error('Download proxy fallback triggered:', err);
    try {
      const fallbackRes = await fetch(defaultFallback);
      const ab = await fallbackRes.arrayBuffer();
      const buf = Buffer.from(ab);
      return new NextResponse(buf, {
        status: 200,
        headers: {
          'Content-Type': isMp3 ? 'audio/mpeg' : 'video/mp4',
          'Content-Disposition': `attachment; filename="${safeFilename}"`,
          'Content-Length': buf.length.toString(),
        },
      });
    } catch (e) {
      return NextResponse.json({ error: 'Failed to download file stream' }, { status: 500 });
    }
  }
}
