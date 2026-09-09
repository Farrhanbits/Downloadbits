async function testIgOembed() {
  const url = 'https://www.instagram.com/p/C3_805qROyD/';
  
  console.log('--- Test 1: Instagram oEmbed ---');
  try {
    const res = await fetch(`https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}`);
    console.log('oEmbed status:', res.status);
    const data = await res.json();
    console.log('oEmbed data:', data);
  } catch (e) {
    console.error('oEmbed error:', e.message);
  }

  console.log('\n--- Test 2: Instagram HTML Fetch ---');
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });
    console.log('IG HTML status:', res.status);
    const html = await res.text();
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const metaOgTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/);
    const metaOgImage = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
    const metaOgVideo = html.match(/<meta[^>]+property="og:video"[^>]+content="([^"]+)"/);

    console.log('HTML Title:', titleMatch ? titleMatch[1] : 'NONE');
    console.log('OG Title:', metaOgTitle ? metaOgTitle[1] : 'NONE');
    console.log('OG Image:', metaOgImage ? metaOgImage[1] : 'NONE');
    console.log('OG Video:', metaOgVideo ? metaOgVideo[1] : 'NONE');
  } catch (e) {
    console.error('IG HTML error:', e.message);
  }
}

testIgOembed();
