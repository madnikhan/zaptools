import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  structuredData?: object;
  contentType?: 'tool' | 'blog' | 'page';
  category?: string;
  readTime?: number;
}

export default function SEOHead({
  title = "ZapTools - Free Online Tools for Everyone",
  description = "Convert, compress, and create with our free online tools. No sign-up required, always free, and designed for speed and simplicity.",
  keywords = "free online tools, productivity tools, file converter, image compressor, PDF tools, text to handwriting, word counter, password generator, QR code generator, URL shortener",
  image,
  url = "https://zaptools.tech",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "ZapTools Team",
  section,
  tags = [],
  structuredData,
  contentType = 'page',
  category = '',
  readTime
}: SEOHeadProps) {
  const fullTitle = title.includes("ZapTools") ? title : `${title} | ZapTools`;
  const fullUrl = url || "https://zaptools.tech";
  
  // Generate enhanced OG image URL if not provided
  const ogImageUrl = image || `https://zaptools.tech/api/og?title=${encodeURIComponent(fullTitle)}&description=${encodeURIComponent(description)}&type=${contentType}${category ? `&category=${encodeURIComponent(category)}` : ''}${readTime ? `&readTime=${readTime}` : ''}`;
  
  return (
    <Head>
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="2La5Qqcv07Mn6eF4CmZiW2cug7YgL3lC_NKKGbDKFUM" />
      
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:image:type" content={ogImageUrl?.endsWith('.svg') ? 'image/svg+xml' : ogImageUrl?.endsWith('.png') ? 'image/png' : 'image/jpeg'} />
      <meta property="og:image:secure_url" content={ogImageUrl} />
      <meta property="og:site_name" content="ZapTools" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />
      
      {/* Article specific meta tags */}
      {type === "article" && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  );
} 