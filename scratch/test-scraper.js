const fs = require('fs');

async function testScrapers() {
  const testIgUrl = 'https://www.instagram.com/p/DdCHEUwq2VA/';
  const testTwitterUrl = 'https://twitter.com/X/status/1750000000000000000';
  const testTiktokUrl = 'https://www.tiktok.com/@tiktok/video/7100000000000000000';

  console.log('--- Testing Cobalt API ---');
  try {
    const res = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify({ url: testIgUrl })
    });
    console.log('Cobalt status:', res.status);
    const text = await res.text();
    console.log('Cobalt response:', text.slice(0, 300));
  } catch (e) {
    console.error('Cobalt error:', e.message);
  }

  console.log('\n--- Testing Instagram Embed Parsing ---');
  try {
    const embedUrl = 'https://www.instagram.com/p/DdCHEUwq2VA/embed/captioned/';
    const res = await fetch(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    console.log('IG Embed status:', res.status);
    const html = await res.text();
    
    // Look for video or image URLs in embed HTML
    const videoMatch = html.match(/src="([^"]+\.mp4[^"]*)"/) || html.match(/video_url":"([^"]+)"/);
    const imgMatch = html.match(/class="EmbeddedMediaImage"[^>]*src="([^"]+)"/) || html.match(/display_url":"([^"]+)"/);
    const captionMatch = html.match(/class="Caption"[^>]*>([\s\S]*?)<\/div>/);
    const authorMatch = html.match(/class="UsernameText"[^>]*>([^<]+)</);

    console.log('IG Video found:', videoMatch ? videoMatch[1].replace(/\\u0026/g, '&').slice(0, 100) : 'NONE');
    console.log('IG Image found:', imgMatch ? imgMatch[1].replace(/\\u0026/g, '&').slice(0, 100) : 'NONE');
    console.log('IG Author found:', authorMatch ? authorMatch[1] : 'NONE');
  } catch (e) {
    console.error('IG Embed error:', e.message);
  }

  console.log('\n--- Testing TikWM API (TikTok) ---');
  try {
    const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent('https://www.tiktok.com/@scout2015/video/6718335390841097477')}`);
    const data = await res.json();
    console.log('TikWM status:', data.code);
    if (data.data) {
      console.log('TikTok title:', data.data.title);
      console.log('TikTok video play URL:', data.data.play ? 'FOUND' : 'NONE');
      console.log('TikTok cover:', data.data.cover ? 'FOUND' : 'NONE');
    }
  } catch (e) {
    console.error('TikWM error:', e.message);
  }

  console.log('\n--- Testing VxTwitter API (Twitter) ---');
  try {
    const res = await fetch('https://api.vxtwitter.com/Twitter/status/1602356557678551040');
    const data = await res.json();
    console.log('VxTwitter title:', data.text ? data.text.slice(0, 50) : 'NONE');
    console.log('VxTwitter media:', data.media_urls);
  } catch (e) {
    console.error('VxTwitter error:', e.message);
  }
}

testScrapers();
