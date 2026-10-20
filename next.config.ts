import type { NextConfig } from "next";

/**
 * Fully static site: `npm run build` writes plain HTML/CSS/JS into the `out/` folder.
 * Upload the contents of `out/` to any static host (Netlify, Vercel, Hostinger, cPanel, S3, GitHub Pages...).
 */
const nextConfig: NextConfig = {
  output: "export",
  // /about -> /about/index.html  (works on every static host without rewrite rules)
  trailingSlash: true,
  images: {
    // Static export has no image-optimisation server, so images are served
    // straight from their online source (Unsplash placeholders for now).
    unoptimized: true,
  },
};

export default nextConfig;
