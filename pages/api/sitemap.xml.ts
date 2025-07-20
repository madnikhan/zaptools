import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from '../../lib/blog';

const baseUrl = 'https://zaptools.tech';

const staticUrls = [
  '', 'about-us', 'contact', 'privacy-policy', 'terms-of-service', 'cookie-policy',
  'help-center', 'faq', 'report-bug', 'feature-request', 'api-documentation', 'status', 'accessibility', 'blog'
];

const toolUrls = [
  'tools/text-to-handwriting', 'tools/word-counter', 'tools/password-generator', 'tools/pdf-merger-splitter',
  'tools/image-compressor', 'tools/qr-code-generator', 'tools/url-shortener', 'tools/color-palette-generator',
  'tools/character-counter', 'tools/base64-encoder-decoder', 'tools/story-cover-maker', 'tools/video-downloader',
  'tools/link-in-bio-builder', 'tools/profile-image-resizer', 'tools/social-media-audit-checklist',
  'tools/fancy-fonts-converter', 'tools/emoji-picker', 'tools/bio-caption-generator', 'tools/hashtag-generator',
  'tools/social-media-analytics-checker', 'tools/social-media-post-scheduler', 'tools/word-counter'
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const blogPosts = getAllPosts(); // Should return [{ slug, date }]

  res.setHeader('Content-Type', 'application/xml');
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static pages
  staticUrls.forEach(path => {
    xml += `  <url>\n    <loc>${baseUrl}/${path}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Tool pages
  toolUrls.forEach(path => {
    xml += `  <url>\n    <loc>${baseUrl}/${path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  });

  // Blog posts
  blogPosts.forEach(post => {
    xml += `  <url>\n    <loc>${baseUrl}/blog/${post.slug}</loc>\n    <lastmod>${post.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;
  res.status(200).send(xml);
} 