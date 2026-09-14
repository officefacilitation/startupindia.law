import { resolve } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

function readDevVars() {
  const varsPath = resolve('.dev.vars');
  const env = {};
  if (fs.existsSync(varsPath)) {
    const lines = fs.readFileSync(varsPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        env[trimmed.substring(0, idx).trim()] = trimmed.substring(idx + 1).trim();
      }
    }
  }
  return env;
}

function localApiPlugin() {
  return {
    name: 'cloudflare-pages-api-local-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url ? req.url.split('?')[0] : '';
        if (pathname !== '/api/submit') {
          return next();
        }

        try {
          const { onRequestPost, onRequestOptions } = await import('./functions/api/submit.js');
          const devEnv = { ...process.env, ...readDevVars() };

          if (req.method === 'OPTIONS') {
            const webReq = new Request(`http://${req.headers.host || 'localhost'}${req.url}`, {
              method: 'OPTIONS',
              headers: req.headers,
            });
            const webRes = await onRequestOptions({ request: webReq, env: devEnv });
            res.statusCode = webRes.status;
            webRes.headers.forEach((val, key) => res.setHeader(key, val));
            return res.end();
          }

          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', (chunk) => {
              bodyStr += chunk;
            });
            req.on('end', async () => {
              try {
                const webReq = new Request(`http://${req.headers.host || 'localhost'}${req.url}`, {
                  method: 'POST',
                  headers: req.headers,
                  body: bodyStr || undefined,
                });

                const webRes = await onRequestPost({ request: webReq, env: devEnv });
                res.statusCode = webRes.status;
                webRes.headers.forEach((val, key) => res.setHeader(key, val));
                const responseText = await webRes.text();
                res.end(responseText);
              } catch (err) {
                console.error('Local API dev error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Local server error: ' + err.message }));
              }
            });
            return;
          }
        } catch (e) {
          console.warn('Could not handle local API request:', e);
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [localApiPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        services: resolve('services.html'),
        work: resolve('work.html'),
        contact: resolve('contact.html'),
        about: resolve('about.html'),
        updates: resolve('updates.html'),
      },
    },
  },
});
