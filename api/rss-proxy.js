import Parser from 'rss-parser';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const rssUrl = 'https://www.google.com/alerts/feeds/05137730699034624849/8827199792792435479';

  try {
    const response = await fetch(rssUrl);
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
    const xml = await response.text();
    const parser = new Parser();
    const feed = await parser.parseString(xml);
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
