const btch = require('btch-downloader');

console.log('Available btch functions:', Object.keys(btch));

async function testFunctions() {
  const pinUrl = 'https://www.pinterest.com/pin/743797682226065582/';
  const twUrl = 'https://twitter.com/X/status/1750000000000000000';
  const ytUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const tiktokUrl = 'https://www.tiktok.com/@tiktok/video/7311111111111111111';

  console.log('\n--- Testing youtube() ---');
  try {
    const res = await btch.youtube(ytUrl);
    console.log('YouTube Result:', res);
  } catch (e) {
    console.error('YouTube Error:', e.message);
  }

  console.log('\n--- Testing tiktok() ---');
  try {
    const res = await btch.tiktok(tiktokUrl);
    console.log('TikTok Result:', res);
  } catch (e) {
    console.error('TikTok Error:', e.message);
  }
}

testFunctions();
