/**
 * Prefix an absolute public asset path with the configured basePath so that
 * static assets (images, audio) resolve correctly on GitHub Pages project
 * sites served from /<repo>/. `next/link` and `next/image` handle basePath
 * automatically, but raw <img>/<audio> `src` attributes do not.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
