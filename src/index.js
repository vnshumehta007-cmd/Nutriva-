export default {
  async fetch(request, env) {
    // Cloudflare Workers with Static Assets automatically serves files from assets.directory.
    // If no static asset matches, this fallback handles the request.
    return env.ASSETS ? env.ASSETS.fetch(request) : new Response("Not Found", { status: 404 });
  }
};
