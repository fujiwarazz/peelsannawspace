import { withContentlayer } from "next-contentlayer2";

// For GitHub Pages **project** sites the app is served from /<repo>/, so a
// basePath is required. The deploy workflow injects NEXT_PUBLIC_BASE_PATH
// automatically (empty for <user>.github.io user/org pages).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static HTML export -> ./out
  reactStrictMode: true,
  trailingSlash: true, // GitHub Pages serves /route/index.html
  images: {
    unoptimized: true, // no image optimization server on GH Pages
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default withContentlayer(nextConfig);
