/**
 * Cloudflare Worker entrypoint for startupindia.law
 * Handles API routes (/api/submit) and serves static assets from /dist
 */
import { onRequestPost, onRequestOptions } from './functions/api/submit.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle /api/submit endpoint
    if (url.pathname === '/api/submit') {
      if (request.method === 'OPTIONS') {
        return onRequestOptions({ request, env });
      }
      if (request.method === 'POST') {
        return onRequestPost({ request, env });
      }
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Serve static assets from the assets binding (dist directory)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', { status: 404 });
  },
};
