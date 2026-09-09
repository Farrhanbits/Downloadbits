import { NextRequest, NextResponse } from 'next/server';
import { detectPlatform, PLATFORMS } from '@/lib/platform-detect';

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

    const platform = detectPlatform(url);

    // Simulate link parsing speed
    await new Promise((resolve) => setTimeout(resolve, 600));

    let title = 'Social Media Video Clip';
    let duration = '0:30';
    let author = '@creator_handle';
    let videoStream = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    let filenamePrefix = 'Downloadbits';

    if (platform.id === 'instagram') {
      title = 'Instagram Reel — Cyberpunk Motion Concept';
      duration = '0:35';
      author = '@instagram_creator';
      videoStream = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      filenamePrefix = 'Downloadbits_Instagram_Reel';
    } else if (platform.id === 'pinterest') {
      title = 'Pinterest Idea Pin — Minimalist UI Design Inspiration';
      duration = '0:18';
      author = '@pinterest_designer';
      videoStream = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
      filenamePrefix = 'Downloadbits_Pinterest_Pin';
    } else if (platform.id === 'twitter') {
      title = 'Twitter / X Clip — 60fps WebGL Animation';
      duration = '0:45';
      author = '@twitter_user';
      videoStream = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      filenamePrefix = 'Downloadbits_Twitter_Video';
    } else {
      title = 'Universal Media Stream';
      duration = '1:00';
      author = '@social_creator';
      videoStream = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
      filenamePrefix = 'Downloadbits_Media';
    }

    const timestamp = Date.now();

    return NextResponse.json({
      success: true,
      url,
      platform,
      metadata: {
        title,
        author,
        duration,
        thumbnail: platform.sampleThumbnail,
        qualities: [
          {
            label: '1080p Ultra HD (MP4)',
            size: '18.4 MB',
            value: '1080p',
            downloadUrl: `/api/download-file?url=${encodeURIComponent(videoStream)}&filename=${filenamePrefix}_1080p_${timestamp}.mp4`,
            filename: `${filenamePrefix}_1080p_${timestamp}.mp4`,
          },
          {
            label: '720p HD (MP4)',
            size: '9.2 MB',
            value: '720p',
            downloadUrl: `/api/download-file?url=${encodeURIComponent(videoStream)}&filename=${filenamePrefix}_720p_${timestamp}.mp4`,
            filename: `${filenamePrefix}_720p_${timestamp}.mp4`,
          },
          {
            label: '480p SD (MP4)',
            size: '4.1 MB',
            value: '480p',
            downloadUrl: `/api/download-file?url=${encodeURIComponent(videoStream)}&filename=${filenamePrefix}_480p_${timestamp}.mp4`,
            filename: `${filenamePrefix}_480p_${timestamp}.mp4`,
          },
          {
            label: 'Audio Only (MP3 320kbps)',
            size: '2.4 MB',
            value: 'mp3',
            downloadUrl: `/api/download-file?url=${encodeURIComponent('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')}&filename=${filenamePrefix}_Audio_${timestamp}.mp3`,
            filename: `${filenamePrefix}_Audio_${timestamp}.mp3`,
          },
        ],
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to parse media link.' },
      { status: 500 }
    );
  }
}
