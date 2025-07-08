import express from 'express';
import cors from 'cors';
import Parser from 'rss-parser';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// RSS Proxy Endpoint
app.get('/api/rss-proxy', async (req, res) => {
  try {
    const rssUrl = 'http://feeds.bbci.co.uk/news/education/rss.xml';
    console.log('Fetching RSS feed from:', rssUrl);
    
    const response = await fetch(rssUrl);
    const xml = await response.text();
    
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
    console.log('Successfully parsed feed with items:', feed.items?.length || 0);
    
    // Return a simplified response with just the items
    res.status(200).json({
      items: feed.items || []
    });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`RSS Proxy endpoint: http://localhost:${port}/api/rss-proxy`);
  console.log(`Health check: http://localhost:${port}/health`);
});
