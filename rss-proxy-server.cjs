const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');

const app = express();
const port = 4000;
const parser = new Parser();

app.use(cors());

app.get('/api/rss-proxy', async (req, res) => {
  const rssUrl = 'https://www.google.com/alerts/feeds/05137730699034624849/8827199792792435479';
  try {
    const feed = await parser.parseURL(rssUrl);
    res.json(feed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`RSS Proxy server running at http://localhost:${port}/api/rss-proxy`);
});
