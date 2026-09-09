const { igdl, pinterest, twitter, youtube, tiktok } = require('btch-downloader');

async function testAll() {
  console.log('--- Testing IG Multiple Carousel Extraction ---');
  try {
    // IG Carousel Post link with multiple images
    const igPostUrl = 'https://www.instagram.com/p/C3_805qROyD/';
    const res = await igdl(igPostUrl);
    console.log('IG Multi Result Count:', res.result ? res.result.length : 0);
    if (res.result) {
      res.result.forEach((item, i) => {
        console.log(`  Item ${i+1}:`, item.url ? item.url.slice(0, 70) : 'no url', 'thumbnail:', item.thumbnail ? 'YES' : 'NO');
      });
    }
  } catch (e) {
    console.error('IG Carousel Error:', e.message);
  }

  console.log('\n--- Testing Pinterest Video/Image Extraction ---');
  try {
    const pinVideoUrl = 'https://www.pinterest.com/pin/1120411338501062635/';
    const res = await pinterest(pinVideoUrl);
    console.log('Pinterest Raw Result:', res);
  } catch (e) {
    console.error('Pinterest Error:', e.message);
  }

  console.log('\n--- Testing Twitter / X Video Extraction ---');
  try {
    const twUrl = 'https://twitter.com/X/status/1602356557678551040';
    const res = await twitter(twUrl);
    console.log('Twitter Raw Result:', res);
  } catch (e) {
    console.error('Twitter Error:', e.message);
  }

  console.log('\n--- Testing YouTube Extraction ---');
  try {
    const ytUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const res = await youtube(ytUrl);
    console.log('YouTube Raw Result:', res);
  } catch (e) {
    console.error('YouTube Error:', e.message);
  }
}

testAll();
