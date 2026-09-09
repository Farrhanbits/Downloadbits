const { igdl, pinterest, twitter, youtube, tiktok } = require('btch-downloader');

async function testBtch() {
  const igUrl = 'https://www.instagram.com/p/DdCHEUwq2VA/';
  const pinUrl = 'https://www.pinterest.com/pin/1120411338501062635/';
  const twUrl = 'https://twitter.com/X/status/1602356557678551040';

  console.log('--- Testing btch-downloader Instagram ---');
  try {
    const res = await igdl(igUrl);
    console.log('IGDL Result:', res);
  } catch (e) {
    console.error('IGDL Error:', e.message);
  }

  console.log('\n--- Testing btch-downloader Pinterest ---');
  try {
    const res = await pinterest(pinUrl);
    console.log('Pinterest Result:', res);
  } catch (e) {
    console.error('Pinterest Error:', e.message);
  }

  console.log('\n--- Testing btch-downloader Twitter ---');
  try {
    const res = await twitter(twUrl);
    console.log('Twitter Result:', res);
  } catch (e) {
    console.error('Twitter Error:', e.message);
  }
}

testBtch();
