async function testScrapers2() {
  // Test Pinterest Scraping
  console.log('--- Test 1: Pinterest Pin PWA Data Parsing ---');
  try {
    const pinUrl = 'https://www.pinterest.com/pin/1234567890/';
    const res = await fetch('https://www.pinterest.com/pin/1120411338501062635/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    console.log('Pinterest status:', res.status);
    const html = await res.text();
    const ogVideo = html.match(/property="og:video" content="([^"]+)"/);
    const ogImage = html.match(/property="og:image" content="([^"]+)"/);
    const ogTitle = html.match(/property="og:title" content="([^"]+)"/);
    console.log('Pinterest og:video:', ogVideo ? ogVideo[1] : 'NONE');
    console.log('Pinterest og:image:', ogImage ? ogImage[1] : 'NONE');
    console.log('Pinterest og:title:', ogTitle ? ogTitle[1] : 'NONE');
  } catch (e) {
    console.error('Pinterest error:', e.message);
  }

  // Test TikTok TikWM
  console.log('\n--- Test 2: TikWM (TikTok) ---');
  try {
    const res = await fetch('https://www.tikwm.com/api/?url=https://www.tiktok.com/@tiktok/video/7311111111111111111', {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    console.log('TikWM status:', res.status);
    const text = await res.text();
    console.log('TikWM response:', text.slice(0, 200));
  } catch (e) {
    console.error('TikWM error:', e.message);
  }

  // Test Twitsave (Twitter)
  console.log('\n--- Test 3: Twitsave (Twitter/X) ---');
  try {
    const res = await fetch('https://twitsave.com/info?url=https://twitter.com/X/status/1602356557678551040', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });
    console.log('Twitsave status:', res.status);
    const html = await res.text();
    const downloadMatch = html.match(/href="([^"]+download[^"]+)"/) || html.match(/src="([^"]+\.mp4[^"]*)"/);
    const titleMatch = html.match(/<p class="text-gray-600[^"]*">([\s\S]*?)<\/p>/);
    console.log('Twitsave download link:', downloadMatch ? downloadMatch[1] : 'NONE');
    console.log('Twitsave title:', titleMatch ? titleMatch[1].trim() : 'NONE');
  } catch (e) {
    console.error('Twitsave error:', e.message);
  }

  // Test SaveIG / SnapInsta (Instagram)
  console.log('\n--- Test 4: SaveIG API ---');
  try {
    const params = new URLSearchParams();
    params.append('q', 'https://www.instagram.com/reel/C3_805qROyD/');
    params.append('t', 'media');

    const res = await fetch('https://saveig.app/api/ajaxSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: params.toString()
    });
    console.log('SaveIG status:', res.status);
    const data = await res.json();
    console.log('SaveIG data status:', data.status);
    if (data.data) {
      console.log('SaveIG data HTML snippet:', data.data.slice(0, 300));
    }
  } catch (e) {
    console.error('SaveIG error:', e.message);
  }
}

testScrapers2();
