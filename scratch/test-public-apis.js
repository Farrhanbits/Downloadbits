async function testPublicAPIs() {
  const igUrl = 'https://www.instagram.com/reel/C3_805qROyD/';

  console.log('--- Test 1: Publer.io Media Fetch ---');
  try {
    const res = await fetch('https://publer.io/api/v1/media/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Origin': 'https://publer.io',
        'Referer': 'https://publer.io/tools/media-downloader',
      },
      body: JSON.stringify({ url: igUrl })
    });
    console.log('Publer status:', res.status);
    const data = await res.json();
    console.log('Publer result:', JSON.stringify(data).slice(0, 300));
  } catch (e) {
    console.error('Publer error:', e.message);
  }

  console.log('\n--- Test 2: Inflat / SaveFrom / FastDL ---');
  try {
    const res = await fetch(`https://api.fastdl.app/api/v1/instagram?url=${encodeURIComponent(igUrl)}`);
    console.log('FastDL status:', res.status);
    const data = await res.json();
    console.log('FastDL data:', data);
  } catch (e) {
    console.error('FastDL error:', e.message);
  }

  console.log('\n--- Test 3: Instagram GraphQL Public Endpoint ---');
  try {
    // Extract shortcode
    const shortcode = 'C3_805qROyD';
    const res = await fetch(`https://www.instagram.com/graphql/query/?query_hash=b3055315caf7d228da3044261daf3e6d&variables=${encodeURIComponent(JSON.stringify({ shortcode }))}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'X-IG-App-ID': '936619743392459',
      }
    });
    console.log('IG GraphQL status:', res.status);
    const data = await res.json();
    const media = data?.data?.shortcode_media;
    if (media) {
      console.log('IG Title/Caption:', media.edge_media_to_caption?.edges[0]?.node?.text?.slice(0, 50));
      console.log('IG Video URL:', media.video_url ? 'FOUND' : 'NONE');
      console.log('IG Display URL:', media.display_url ? 'FOUND' : 'NONE');
      console.log('IG Author:', media.owner?.username);
    }
  } catch (e) {
    console.error('IG GraphQL error:', e.message);
  }
}

testPublicAPIs();
