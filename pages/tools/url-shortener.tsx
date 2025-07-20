import { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  clicks: number;
  qrCode?: string;
}

export default function URLShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showQR, setShowQR] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load saved URLs from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shortenedUrls');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setShortenedUrls(parsed.map((url: any) => ({
            ...url,
            createdAt: new Date(url.createdAt)
          })));
        } catch (e) {
          console.error('Failed to load saved URLs:', e);
        }
      }
    }
  }, []);

  // Save URLs to localStorage
  const saveUrls = (urls: ShortenedUrl[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shortenedUrls', JSON.stringify(urls));
    }
  };

  // Generate random slug
  const generateSlug = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Validate URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Generate QR code URL
  const generateQRCode = (url: string) => {
    const params = new URLSearchParams({
      data: url,
      size: '200',
      format: 'png'
    });
    return `https://api.qrserver.com/v1/create-qr-code/?${params}`;
  };

  // Shorten URL
  const shortenUrl = async () => {
    if (!originalUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setIsGenerating(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const slug = customSlug.trim() || generateSlug();
      let shortUrl = '';
      if (typeof window !== 'undefined') {
        shortUrl = `${window.location.origin}/s/${slug}`;
      } else {
        shortUrl = `/s/${slug}`;
      }
      const newShortenedUrl: ShortenedUrl = {
        id: Date.now().toString(),
        originalUrl,
        shortUrl,
        createdAt: new Date(),
        clicks: 0,
        qrCode: generateQRCode(shortUrl)
      };

      const updatedUrls = [newShortenedUrl, ...shortenedUrls];
      setShortenedUrls(updatedUrls);
      saveUrls(updatedUrls);

      setSuccess('URL shortened successfully!');
      setOriginalUrl('');
      setCustomSlug('');
    } catch (error) {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess('Copied to clipboard!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (error) {
      setError('Failed to copy to clipboard');
    }
  };

  // Delete URL
  const deleteUrl = (id: string) => {
    const updatedUrls = shortenedUrls.filter(url => url.id !== id);
    setShortenedUrls(updatedUrls);
    saveUrls(updatedUrls);
    setSuccess('URL deleted successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  // Track click (simulated)
  const trackClick = (id: string) => {
    const updatedUrls = shortenedUrls.map(url => 
      url.id === id ? { ...url, clicks: url.clicks + 1 } : url
    );
    setShortenedUrls(updatedUrls);
    saveUrls(updatedUrls);
  };

  // Quick examples
  const quickExamples = [
    'https://www.google.com',
    'https://github.com',
    'https://stackoverflow.com',
    'https://www.youtube.com'
  ];

  const applyExample = (example: string) => {
    setOriginalUrl(example);
  };

  return (
    <>
      <SEOHead
        title="URL Shortener - ZapTools"
        description="Shorten long URLs instantly. Free URL shortener with custom slugs, QR codes, and click tracking."
        keywords="url shortener, link shortener, short url, custom slug, qr code generator, click tracking"
        url="https://zaptools.tech/tools/url-shortener"
        contentType="tool"
        category="Utilities"
      />
      <Header />
      <div className={`min-h-screen py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl mb-6 shadow-xl">
              <span className="text-white text-3xl">🔗</span>
            </div>
            <h1 className={`text-5xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              URL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Shortener</span>
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Transform long URLs into short, shareable links. Perfect for social media, marketing, and easy sharing.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 border`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Shorten Your URL</h2>
              
              {/* Quick Examples */}
              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Quick Examples</label>
                <div className="grid grid-cols-2 gap-2">
                  {quickExamples.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyExample(example)}
                      className={`p-2 rounded-xl text-xs font-medium transition-all duration-300 truncate ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {example.replace(/^https?:\/\//, '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* URL Input */}
              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Long URL
                </label>
                <input
                  type="url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url-that-needs-shortening"
                  className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-200 placeholder-gray-400'
                  }`}
                />
              </div>

              {/* Custom Slug */}
              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Custom Slug (Optional)
                </label>
                <div className="flex">
                  <span className={`inline-flex items-center px-3 rounded-l-xl border border-r-0 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-500'
                  }`}>
                    {typeof window !== 'undefined' ? window.location.origin : ''}/s/
                  </span>
                  <input
                    type="text"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                    placeholder="my-custom-link"
                    className={`flex-1 p-4 border-2 rounded-r-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-200 placeholder-gray-400'
                    }`}
                  />
                </div>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Only letters, numbers, hyphens, and underscores allowed
                </p>
              </div>

              {/* Generate Button */}
              <button
                onClick={shortenUrl}
                disabled={isGenerating || !originalUrl.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? 'Shortening...' : 'Shorten URL'}
              </button>

              {/* Dark Mode Toggle */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 border`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Your Shortened URLs</h2>
              
              {shortenedUrls.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-4xl">🔗</span>
                  </div>
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No shortened URLs yet
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Shorten your first URL to see it here
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {shortenedUrls.map((url) => (
                    <div key={url.id} className={`p-4 rounded-xl border-2 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            {url.shortUrl}
                          </p>
                          <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {url.originalUrl}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <button
                            onClick={() => copyToClipboard(url.shortUrl)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Copy URL"
                          >
                            📋
                          </button>
                          <button
                            onClick={() => setShowQR(showQR === url.id ? null : url.id)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Show QR Code"
                          >
                            📱
                          </button>
                          <button
                            onClick={() => deleteUrl(url.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete URL"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      
                      {/* QR Code */}
                      {showQR === url.id && url.qrCode && (
                        <div className="mt-3 p-3 bg-white dark:bg-gray-600 rounded-lg">
                          <img 
                            src={url.qrCode} 
                            alt="QR Code" 
                            className="w-24 h-24 mx-auto"
                          />
                        </div>
                      )}
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Created: {url.createdAt.toLocaleDateString()}
                        </span>
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Clicks: {url.clicks}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          {success && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-800">{success}</p>
            </div>
          )}

          {/* How to Use Section */}
          <div className={`mt-12 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 border`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>📖 How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Step-by-Step Guide</h3>
                <ol className={`space-y-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Enter your long URL in the input field (include http:// or https://)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Optionally add a custom slug for a branded short URL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Click "Shorten URL" to generate your short link</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Copy the short URL or generate a QR code for sharing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
                    <span>Track clicks and manage your URLs in the results section</span>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Pro Tips</h3>
                <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use custom slugs to create memorable, branded URLs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Generate QR codes for easy mobile sharing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Monitor click statistics to track link performance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use quick examples to test the tool functionality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>All URLs are stored locally - your data stays private</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className={`mt-12 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 border`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>✨ Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Custom Slugs</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create memorable, branded short URLs
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Click Tracking</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Monitor how many times your links are clicked
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>QR Codes</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Generate QR codes for easy mobile sharing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 