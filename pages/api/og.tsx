import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { 
    title = 'ZapTools', 
    description = 'Free Online Tools',
    type = 'tool', // 'tool', 'blog', 'page'
    category = '',
    readTime = ''
  } = req.query;

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  };

  // Clean and truncate inputs
  const cleanTitle = truncateText(String(title), 60);
  const cleanDescription = truncateText(String(description), 120);
  const cleanCategory = String(category);
  const cleanReadTime = String(readTime);
  const contentType = String(type);

  // Dynamic color schemes based on content type
  const getColorScheme = () => {
    switch (contentType) {
      case 'blog':
        return {
          primary: '#10B981', // Green for blog posts
          secondary: '#059669',
          accent: '#34D399',
          text: '#1F2937',
          bg: '#F0FDF4'
        };
      case 'tool':
        return {
          primary: '#3B82F6', // Blue for tools
          secondary: '#1D4ED8',
          accent: '#60A5FA',
          text: '#1F2937',
          bg: '#EFF6FF'
        };
      default:
        return {
          primary: '#8B5CF6', // Purple for general pages
          secondary: '#7C3AED',
          accent: '#A78BFA',
          text: '#1F2937',
          bg: '#F5F3FF'
        };
    }
  };

  const colors = getColorScheme();

  // Create enhanced SVG-based OG image
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Main gradient -->
        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${colors.secondary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:1" />
        </linearGradient>
        
        <!-- Background pattern -->
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1" opacity="0.1"/>
        </pattern>
        
        <!-- Glow effect -->
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <!-- Drop shadow -->
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.15"/>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#mainGradient)"/>
      <rect width="1200" height="630" fill="url(#grid)"/>
      
      <!-- Background decorative elements -->
      <circle cx="100" cy="100" r="80" fill="white" opacity="0.05"/>
      <circle cx="1100" cy="150" r="60" fill="white" opacity="0.05"/>
      <circle cx="150" cy="500" r="40" fill="white" opacity="0.05"/>
      <circle cx="1050" cy="480" r="50" fill="white" opacity="0.05"/>
      <circle cx="950" cy="100" r="30" fill="white" opacity="0.05"/>
      
      <!-- Main content area -->
      <rect x="100" y="80" width="1000" height="470" rx="20" fill="white" opacity="0.95" filter="url(#shadow)"/>
      
      <!-- Header section -->
      <rect x="100" y="80" width="1000" height="80" rx="20" fill="${colors.primary}" opacity="0.1"/>
      
      <!-- Logo and branding -->
      <circle cx="150" cy="120" r="25" fill="${colors.primary}"/>
      <text x="150" y="130" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="white">Z</text>
      
      <!-- ZapTools branding -->
      <text x="200" y="110" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${colors.text}">ZapTools</text>
      <text x="200" y="135" font-family="Arial, sans-serif" font-size="14" fill="${colors.text}" opacity="0.7">Free Online Tools</text>
      
      <!-- Content type badge -->
      ${contentType === 'blog' ? `
        <rect x="1050" y="95" width="40" height="25" rx="12.5" fill="${colors.primary}"/>
        <text x="1070" y="112" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="white">BLOG</text>
      ` : contentType === 'tool' ? `
        <rect x="1050" y="95" width="40" height="25" rx="12.5" fill="${colors.primary}"/>
        <text x="1070" y="112" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="white">TOOL</text>
      ` : ''}
      
      <!-- Category badge (if provided) -->
      ${cleanCategory ? `
        <rect x="1000" y="95" width="${Math.max(60, cleanCategory.length * 8)}" height="25" rx="12.5" fill="${colors.accent}" opacity="0.8"/>
        <text x="${1000 + (Math.max(60, cleanCategory.length * 8) / 2)}" y="112" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="white">${cleanCategory.toUpperCase()}</text>
      ` : ''}
      
      <!-- Main title -->
      <text x="150" y="220" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="${colors.text}">${cleanTitle}</text>
      
      <!-- Description -->
      <text x="150" y="280" font-family="Arial, sans-serif" font-size="24" fill="${colors.text}" opacity="0.8" style="max-width: 900px;">${cleanDescription}</text>
      
      <!-- Read time for blog posts -->
      ${contentType === 'blog' && cleanReadTime ? `
        <circle cx="150" cy="340" r="8" fill="${colors.primary}"/>
        <text x="170" y="345" font-family="Arial, sans-serif" font-size="16" fill="${colors.text}" opacity="0.7">${cleanReadTime} min read</text>
      ` : ''}
      
      <!-- Feature highlights -->
      <g transform="translate(150, ${contentType === 'blog' ? 380 : 340})">
        <circle cx="0" cy="0" r="4" fill="${colors.primary}"/>
        <text x="15" y="5" font-family="Arial, sans-serif" font-size="16" fill="${colors.text}" opacity="0.7">No Registration Required</text>
        
        <circle cx="0" cy="30" r="4" fill="${colors.primary}"/>
        <text x="15" y="35" font-family="Arial, sans-serif" font-size="16" fill="${colors.text}" opacity="0.7">100% Free to Use</text>
        
        <circle cx="0" cy="60" r="4" fill="${colors.primary}"/>
        <text x="15" y="65" font-family="Arial, sans-serif" font-size="16" fill="${colors.text}" opacity="0.7">Instant Results</text>
      </g>
      
      <!-- Call to action -->
      <rect x="150" y="${contentType === 'blog' ? 520 : 480}" width="200" height="40" rx="20" fill="${colors.primary}"/>
      <text x="250" y="${contentType === 'blog' ? 545 : 505}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">Try Now</text>
      
      <!-- URL -->
      <text x="1050" y="620" font-family="Arial, sans-serif" font-size="14" text-anchor="end" fill="white" opacity="0.8">zaptools.tech</text>
      
      <!-- Decorative accent lines -->
      <line x1="100" y1="160" x2="1100" y2="160" stroke="${colors.primary}" stroke-width="2" opacity="0.3"/>
      <line x1="100" y1="165" x2="1100" y2="165" stroke="${colors.accent}" stroke-width="1" opacity="0.2"/>
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.status(200).send(svg);
} 