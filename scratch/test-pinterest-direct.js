async function testPinterestDirect() {
  const pinUrls = [
    'https://www.pinterest.com/pin/1120411338501062635/',
    'https://www.pinterest.com/pin/743797682226065582/',
    'https://pin.it/5vGk3fJ'
  ];

  for (const url of pinUrls) {
    console.log(`\n--- Fetching Pinterest URL: ${url} ---`);
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        redirect: 'follow'
      });

      console.log('Final URL:', res.url, 'Status:', res.status);
      const html = await res.text();

      // Parse OpenGraph meta tags
      const ogVideo = html.match(/property="og:video" content="([^"]+)"/i) || html.match(/content="([^"]+\.mp4[^"]*)"/i);
      const ogImage = html.match(/property="og:image" content="([^"]+)"/i) || html.match(/name="og:image" content="([^"]+)"/i);
      const ogTitle = html.match(/property="og:title" content="([^"]+)"/i) || html.match(/<title>([^<]+)<\/title>/i);

      // Parse JSON-LD or Pinterest PWA script
      const pwaMatch = html.match(/<script id="__PWA_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
      let pwaData = null;
      if (pwaMatch) {
        try {
          pwaData = JSON.parse(pwaMatch[1]);
        } catch (e) {}
      }

      console.log('og:title:', ogTitle ? ogTitle[1] : 'NONE');
      console.log('og:image:', ogImage ? ogImage[1] : 'NONE');
      console.log('og:video:', ogVideo ? ogVideo[1] : 'NONE');
      console.log('PWA Data script found:', pwaData ? 'YES' : 'NO');
    } catch (e) {
      console.error('Error fetching Pinterest:', e.message);
    }
  }
}

testPinterestDirect();
