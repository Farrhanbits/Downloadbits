const { aio, ttdl, threads, pinterest, twitter } = require('btch-downloader');

async function testAIO() {
  console.log('--- Test 1: ttdl (TikTok) ---');
  try {
    const res = await ttdl('https://www.tiktok.com/@tiktok/video/7311111111111111111');
    console.log('ttdl Result:', res);
  } catch (e) {
    console.error('ttdl Error:', e.message);
  }

  console.log('\n--- Test 2: aio (All-in-one for Pinterest & Twitter) ---');
  try {
    const pinRes = await aio('https://www.pinterest.com/pin/1120411338501062635/');
    console.log('aio Pinterest Result:', pinRes);
  } catch (e) {
    console.error('aio Pinterest Error:', e.message);
  }

  try {
    const twRes = await aio('https://twitter.com/X/status/1602356557678551040');
    console.log('aio Twitter Result:', twRes);
  } catch (e) {
    console.error('aio Twitter Error:', e.message);
  }
}

testAIO();
