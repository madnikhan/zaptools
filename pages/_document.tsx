import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#3B82F6" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="2La5Qqcv07Mn6eF4CmZiW2cug7YgL3lC_NKKGbDKFUM" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="ZapTools Team" />
        <meta name="copyright" content="ZapTools" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ZapTools" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zaptools" />
        <meta name="twitter:creator" content="@zaptools" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/og-image.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ZapTools",
              "url": "https://zaptools.tech",
              "logo": "https://zaptools.tech/logo.png",
              "description": "Free online tools for productivity, file conversion, and digital tasks. No sign-up required, always free.",
              "foundingDate": "2025",
              "parentOrganization": {
                "@type": "Organization",
                "name": "InventiveByte LLC",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "1001 S. Main St. STE 600",
                  "addressLocality": "Kalispell",
                  "addressRegion": "MT",
                  "postalCode": "59901",
                  "addressCountry": "US"
                }
              },
              "sameAs": [
                "https://facebook.com/zaptools",
                "https://twitter.com/zaptools",
                "https://instagram.com/zaptools",
                "https://youtube.com/zaptools",
                "https://pinterest.com/zaptools"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@inventix-studio.online"
              }
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ZapTools",
              "url": "https://zaptools.tech",
              "description": "Free online tools for productivity, file conversion, and digital tasks",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://zaptools.tech/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* Structured Data - WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ZapTools",
              "url": "https://zaptools.tech",
              "description": "Free online tools for productivity, file conversion, and digital tasks",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />

        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3053031448533499"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
