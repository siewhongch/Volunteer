import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import healthHandler from './api/health.ts';
import onemapHandler from './api/onemap.ts';
import indexHandler from './api/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Root API route
  app.get('/api', (req, res) => indexHandler(req, res));
  
  // Health check endpoint in /api/health.ts
  app.all('/api/health', (req, res) => healthHandler(req, res));

  // OneMap SG live proxy / serverless endpoint in /api/onemap.ts
  app.all('/api/onemap', (req, res) => onemapHandler(req, res));
  app.all('/api/onemap/search', (req, res) => onemapHandler(req, res));

  if (isProduction) {
    // Serve production static assets from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Mount Vite dev server in middleware mode
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`High School Volunteer Server running at http://0.0.0.0:${PORT}`);
    console.log(`API Health: http://0.0.0.0:${PORT}/api/health`);
    console.log(`OneMap SG API: http://0.0.0.0:${PORT}/api/onemap`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
