import { useState } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

export default function VideoDownloader() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const analyzeVideo = async () => {
    if (!url.trim()) return;
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <>
      <SEOHead
        title="Video Downloader for Instagram, TikTok, Twitter, Facebook | ZapTools"
        description="Download public videos from Instagram, TikTok, Twitter, and Facebook. Free online video downloader by ZapTools. (For personal use only, respect copyright laws.)"
        keywords="video downloader, instagram video downloader, tiktok video downloader, twitter video downloader, facebook video downloader"
        url="https://zaptools.tech/tools/video-downloader"
        contentType="tool"
        category="Content Management"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Video Downloader</h1>
            <p className="text-xl text-gray-700 mb-6">Download public videos from your favorite platforms</p>
            
            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-2xl mx-auto">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Important:</strong> This tool is for downloading your own content or publicly available videos for personal use only. 
                Please respect copyright laws and platform terms of service.
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <button
              type="button"
              className="flex items-center gap-2 font-bold text-blue-700 text-lg focus:outline-none mb-2"
              onClick={() => setShowInstructions(v => !v)}
              aria-expanded={showInstructions}
            >
              <span>ℹ️</span> How to Use
              <svg className={`w-5 h-5 transform transition-transform duration-200 ${showInstructions ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showInstructions && (
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-6 shadow-sm animate-fade-in">
                <ul className="list-disc list-inside text-sm text-blue-900 space-y-2">
                  <li><strong>Paste the video URL</strong> from any supported platform</li>
                  <li><strong>Click "Analyze Video"</strong> to extract video information</li>
                  <li><strong>Choose your preferred quality</strong> and format</li>
                  <li><strong>Download</strong> your video safely and securely</li>
                  <li><strong>Respect copyright</strong> - only download content you own or have permission to download</li>
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - URL Input */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Video URL</h2>
                <div className="space-y-4">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste video URL here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <button
                    onClick={analyzeVideo}
                    disabled={isAnalyzing || !url.trim()}
                    className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isAnalyzing ? '🔄 Analyzing...' : '🔍 Analyze Video'}
                  </button>
                </div>
              </div>

              {/* Supported Platforms */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Supported Platforms</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "YouTube", icon: "📺", formats: "MP4, WebM, 3GP" },
                    { name: "Instagram", icon: "📸", formats: "MP4" },
                    { name: "TikTok", icon: "🎵", formats: "MP4" },
                    { name: "Twitter/X", icon: "🐦", formats: "MP4" },
                    { name: "Facebook", icon: "📘", formats: "MP4" },
                    { name: "Vimeo", icon: "🎬", formats: "MP4, WebM" }
                  ].map(platform => (
                    <div
                      key={platform.name}
                      className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl">{platform.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{platform.name}</h3>
                        <p className="text-xs text-gray-500">{platform.formats}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Video Info & Download Options */}
            <div className="space-y-6">
              {/* Video Information */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Video Information</h2>
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-4">🎬</div>
                  <p>Enter a video URL and click "Analyze Video" to get started</p>
                </div>
              </div>

              {/* Download Options */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Download Options</h2>
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-4">📥</div>
                  <p>Download options will appear here after video analysis</p>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">💡 Tips</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Only download videos you own or have permission to download</li>
                  <li>• Higher quality videos take longer to download</li>
                  <li>• Some videos may be protected and unavailable for download</li>
                  <li>• Check your internet connection for large files</li>
                  <li>• Respect platform terms of service and copyright laws</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 