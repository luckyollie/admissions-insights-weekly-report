import Parser from 'rss-parser';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  // Test with a public RSS feed (BBC News)
  const rssUrl = 'http://feeds.bbci.co.uk/news/education/rss.xml';

  try {
    const response = await fetch(rssUrl);
    const xml = await response.text();
    
    // Log the first 500 characters of the response for debugging
    console.log('RSS Feed Response (first 500 chars):', xml.substring(0, 500));
    
    if (!response.ok) {
      console.error('RSS Feed Error:', { status: response.status, statusText: response.statusText });
      return res.status(500).json({ 
        error: 'Failed to fetch RSS feed', 
        status: response.status,
        statusText: response.statusText 
      });
    }
    
    const parser = new Parser();
    const feed = await parser.parseString(xml);
    console.log('Parsed Feed Items:', feed.items ? feed.items.length : 0);
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
