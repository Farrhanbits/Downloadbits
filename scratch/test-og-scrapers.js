async function testOGScrapers() {
  const igShortcode = 'DdCHEUwq2VA';

  console.log('--- Testing ddinstagram.com OG parsing ---');
  try {
    const res = await fetch(`https://ddinstagram.com/p/${igShortcode}/`, {
      headers: {
        'User-Agent': 'telegrambot (like twitterbot/1.0)',
      }
    });
    console.log('ddinstagram status:', res.status);
    const html = await res.text();
    const ogVideo = html.match(/meta property="og:video" content="([^"]+)"/);
    const ogImage = html.match(/meta property="og:image" content="([^"]+)"/);
    const ogTitle = html.match(/meta property="og:title" content="([^"]+)"/);

    console.log('og:video:', ogVideo ? ogVideo[1] : 'NONE');
    console.log('og:image:', ogImage ? ogImage[1] : 'NONE');
    console.log('og:title:', ogTitle ? ogTitle[1] : 'NONE');
  } catch (e) {
    console.error('ddinstagram error:', e.message);
  }

  console.log('\n--- Testing fixupx.com OG parsing (Twitter) ---');
  try {
    const res = await fetch('https://fixupx.com/Twitter/status/1602356557678551040', {
      headers: {
        'User-Agent': 'telegrambot',
      }
    });
    console.log('fixupx status:', res.status);
    const html = await res.text();
    const ogVideo = html.match(/meta property="og:video" content="([^"]+)"/) || html.match(/meta property="og:video:secure_url" content="([^"]+)"/);
    const ogImage = html.match(/meta property="og:image" content="([^"]+)"/);
    const ogTitle = html.match(/meta property="og:title" content="([^"]+)"/);

    console.log('Twitter og:video:', ogVideo ? ogVideo[1] : 'NONE');
    console.log('Twitter og:image:', ogImage ? ogImage[1] : 'NONE');
    console.log('Twitter og:title:', ogTitle ? ogTitle[1] : 'NONE');
  } catch (e) {
    console.error('fixupx error:', e.message);
  }

  console.log('\n--- Testing Cobalt API v10 ---');
  try {
    const res = await fetch('https://api.cobalt.tools/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://www.instagram.com/reel/C3_805qROyD/'
      })
    });
    console.log('Cobalt v10 status:', res.status);
    const data = await res.json();
    console.log('Cobalt v10 data:', data);
  } catch (e) {
    console.error('Cobalt v10 error:', e.message);
  }
}

testOGScrapers();
