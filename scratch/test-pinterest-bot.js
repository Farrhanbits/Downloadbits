async function testPinterestBot() {
  const pinUrls = [
    'https://www.pinterest.com/pin/1120411338501062635/',
    'https://www.pinterest.com/pin/743797682226065582/',
    'https://www.pinterest.com/pin/687391544321303975/'
  ];

  const userAgents = [
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Twitterbot/1.0',
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'TelegramBot (like TwitterBot)'
  ];

  for (const url of pinUrls) {
    console.log(`\n================ Testing Pin: ${url} ================`);
    for (const ua of userAgents) {
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': ua,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
          redirect: 'follow'
        });

        const html = await res.text();
        const ogVideo = html.match(/property="og:video" content="([^"]+)"/i) || html.match(/name="og:video" content="([^"]+)"/i) || html.match(/content="([^"]+\.mp4[^"]*)"/i);
        const ogImage = html.match(/property="og:image" content="([^"]+)"/i) || html.match(/name="og:image" content="([^"]+)"/i) || html.match(/src="([^"]+i\.pinimg\.com\/originals\/[^"]+)"/i) || html.match(/src="([^"]+i\.pinimg\.com\/736x\/[^"]+)"/i);
        const ogTitle = html.match(/property="og:title" content="([^"]+)"/i) || html.match(/<title>([^<]+)<\/title>/i);

        console.log(`[UA: ${ua.slice(0, 20)}] Status: ${res.status}`);
        console.log('  og:title:', ogTitle ? ogTitle[1].slice(0, 50) : 'NONE');
        console.log('  og:image:', ogImage ? ogImage[1].slice(0, 80) : 'NONE');
        console.log('  og:video:', ogVideo ? ogVideo[1].slice(0, 80) : 'NONE');
        if (ogImage || ogVideo) {
          console.log('  >>> SUCCESS WITH THIS UA! <<<');
          break;
        }
      } catch (e) {
        console.error('Error:', e.message);
      }
    }
  }
}

testPinterestBot();
