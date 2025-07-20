import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import SocialShare from "../../components/SocialShare";

const PLATFORMS = [
  { value: "instagram", label: "Instagram", limits: { bio: 150, caption: 2200, comment: 2200 } },
  { value: "tiktok", label: "TikTok", limits: { bio: 80, caption: 150, comment: 150 } },
  { value: "twitter", label: "Twitter/X", limits: { bio: 160, caption: 280, comment: 280 } },
  { value: "facebook", label: "Facebook", limits: { bio: 101, caption: 63206, comment: 8000 } },
  { value: "youtube", label: "YouTube", limits: { bio: 1000, caption: 5000, comment: 10000 } },
  { value: "snapchat", label: "Snapchat", limits: { bio: 80, caption: 80, comment: 80 } },
  { value: "whatsapp", label: "WhatsApp", limits: { bio: 139, caption: 700, comment: 700 } },
  { value: "telegram", label: "Telegram", limits: { bio: 70, caption: 4096, comment: 4096 } },
  { value: "pinterest", label: "Pinterest", limits: { bio: 160, caption: 500, comment: 500 } },
  { value: "linkedin", label: "LinkedIn", limits: { bio: 2000, caption: 3000, comment: 1000 } },
];

const CONTENT_TYPES = [
  { value: "bio", label: "Bio/Profile" },
  { value: "caption", label: "Post Caption" },
  { value: "comment", label: "Comment" },
];

const PLATFORM_TIPS = {
  instagram: {
    bio: "Keep it concise and include a call-to-action. Use line breaks for better readability.",
    caption: "Use emojis and hashtags strategically. First 125 characters are most important.",
    comment: "Engage authentically. Use emojis to add personality."
  },
  tiktok: {
    bio: "Very limited space. Focus on your niche and include a key hashtag.",
    caption: "Keep it short and punchy. Use trending hashtags for discoverability.",
    comment: "Short, engaging comments work best on TikTok."
  },
  twitter: {
    bio: "Include keywords and hashtags. Show personality in 160 characters.",
    caption: "280 characters is the sweet spot. Use hashtags but don't overdo it.",
    comment: "Engage in conversations. Use mentions and hashtags appropriately."
  },
  facebook: {
    bio: "Tell your story. Include personal details and interests.",
    caption: "Longer captions work well. Include questions to encourage engagement.",
    comment: "Be conversational and authentic in your comments."
  },
  youtube: {
    bio: "Detailed descriptions work well. Include links and keywords.",
    caption: "Use keywords for SEO. Include timestamps and links.",
    comment: "Engage with your community. Ask questions and respond to others."
  },
  snapchat: {
    bio: "Keep it fun and casual. Use emojis and be creative.",
    caption: "Very short space. Make every character count.",
    comment: "Quick, fun responses work best."
  },
  whatsapp: {
    bio: "Simple and clear. Include your status or mood.",
    caption: "Informal and personal. Use emojis naturally.",
    comment: "Casual and friendly tone works best."
  },
  telegram: {
    bio: "Concise and informative. Include key details.",
    caption: "Longer content works well. Use formatting options.",
    comment: "Detailed responses are welcome."
  },
  linkedin: {
    bio: "Professional and detailed. Include your expertise and achievements.",
    caption: "Professional tone. Include insights and value.",
    comment: "Professional and constructive comments."
  }
};

export default function CharacterCounter() {
  const [platform, setPlatform] = useState("instagram");
  const [contentType, setContentType] = useState("caption");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const currentLimit = PLATFORMS.find(p => p.value === platform)?.limits[contentType] || 280;
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split('\n').length : 0;
  const remainingChars = currentLimit - charCount;
  const isOverLimit = charCount > currentLimit;
  const isNearLimit = remainingChars <= 20 && remainingChars > 0;

  const getStatusColor = () => {
    if (isOverLimit) return "text-red-600";
    if (isNearLimit) return "text-yellow-600";
    if (remainingChars <= 50) return "text-orange-600";
    return "text-green-600";
  };

  const getProgressColor = () => {
    if (isOverLimit) return "bg-red-500";
    if (isNearLimit) return "bg-yellow-500";
    if (remainingChars <= 50) return "bg-orange-500";
    return "bg-green-500";
  };

  const getProgressWidth = () => {
    const percentage = (charCount / currentLimit) * 100;
    return Math.min(percentage, 100);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (error) {
      console.log("Clipboard read failed:", error);
    }
  };

  const getCurrentTip = () => {
    return PLATFORM_TIPS[platform]?.[contentType] || "Write engaging content that fits your platform's style.";
  };

  // Calculate various metrics
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const charactersNoSpacesNoPunctuation = text.replace(/[^\w]/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lines = text === '' ? 0 : text.split('\n').length;
  const sentences = text === '' ? 0 : text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  const paragraphs = text === '' ? 0 : text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
  const spaces = (text.match(/\s/g) || []).length;
  const punctuation = (text.match(/[.,!?;:'"()\[\]{}]/g) || []).length;
  const numbers = (text.match(/\d/g) || []).length;
  const letters = (text.match(/[a-zA-Z]/g) || []).length;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Character Counter",
    "url": "https://zaptools.tech/tools/character-counter",
    "description": "Free online character counter tool. Count characters, words, lines, and analyze text with detailed statistics.",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEOHead 
        title="Character Counter - Free Online Text Analyzer"
        description="Free online character counter tool. Count characters, words, lines, and analyze text with detailed statistics. No registration required!"
        keywords="character counter, text analyzer, word counter, text statistics, character count, writing tool"
        url="https://zaptools.tech/tools/character-counter"
        contentType="tool"
        category="Writing"
      />
      
      <Header />
      
      <div className={`min-h-screen py-20 px-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl">
              <span className="text-white text-3xl">🔢</span>
            </div>
            <h1 className="text-5xl font-black text-center mb-6">
              <span className="text-blue-700">Character</span> <span className="text-blue-600">Counter</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Count characters for social media platforms and analyze your text with detailed statistics.
            </p>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`mt-4 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg'
              }`}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Text Input */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                {/* Platform Selection */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Platform & Content Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-lg font-medium transition-all duration-300"
                    >
                      {PLATFORMS.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                    <select
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-lg font-medium transition-all duration-300"
                    >
                      {CONTENT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Text Input */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Enter Your Text
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`Write your ${contentType} for ${PLATFORMS.find(p => p.value === platform)?.label}...`}
                    className="w-full h-96 p-6 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent resize-none text-lg font-medium placeholder-gray-400 transition-all duration-300"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={handleClear}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-all duration-300"
                      >
                        Clear
                      </button>
                      <button
                        onClick={handlePaste}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-all duration-300"
                      >
                        Paste
                      </button>
                      <button
                        onClick={handleCopy}
                        disabled={!text}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          text
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Characters: {characters.toLocaleString()} | Words: {words.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Platform Tip */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 Platform Tip</h4>
                  <p className="text-sm text-gray-600">{getCurrentTip()}</p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-6">
              {/* Character Limit Progress */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  📊 Character Limit
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Limit:</span>
                    <span className="font-bold text-lg text-gray-900">{currentLimit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Used:</span>
                    <span className={`font-bold text-lg ${getStatusColor()}`}>{charCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Remaining:</span>
                    <span className={`font-bold text-lg ${getStatusColor()}`}>{remainingChars.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${getProgressColor()}`}
                      style={{ width: `${getProgressWidth()}%` }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <span className={`text-sm font-semibold ${getStatusColor()}`}>
                      {isOverLimit ? 'Over limit!' : isNearLimit ? 'Near limit!' : 'Good to go!'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Basic Counts */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  📈 Basic Counts
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Characters:</span>
                    <span className="font-bold text-lg text-gray-900">{characters.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Characters (no spaces):</span>
                    <span className="font-bold text-lg text-gray-900">{charactersNoSpaces.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Words:</span>
                    <span className="font-bold text-lg text-gray-900">{words.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Lines:</span>
                    <span className="font-bold text-lg text-gray-900">{lines.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sentences:</span>
                    <span className="font-bold text-lg text-gray-900">{sentences.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Paragraphs:</span>
                    <span className="font-bold text-lg text-gray-900">{paragraphs.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  🔍 Detailed Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Letters:</span>
                    <span className="font-bold text-lg text-gray-900">{letters.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Numbers:</span>
                    <span className="font-bold text-lg text-gray-900">{numbers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Spaces:</span>
                    <span className="font-bold text-lg text-gray-900">{spaces.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Punctuation:</span>
                    <span className="font-bold text-lg text-gray-900">{punctuation.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">📖 How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Step-by-Step Guide</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Select your social media platform and content type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Enter or paste your text in the input area</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Watch real-time character count and limit tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Review detailed analysis and platform-specific tips</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
                    <span>Copy your optimized text when ready</span>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Pro Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use platform-specific tips for better engagement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Monitor character limits to avoid truncation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Analyze character distribution for optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use the paste button to quickly import existing content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Check different content types for the same platform</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-8 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">✨ Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Platform Specific</h3>
                <p className="text-sm text-gray-600">
                  Support for all major social media platforms with accurate character limits
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Real-time Tracking</h3>
                <p className="text-sm text-gray-600">
                  Visual progress bar and instant feedback on character limits
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💡</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Platform Tips</h3>
                <p className="text-sm text-gray-600">
                  Get platform-specific advice for better content optimization
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔍</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Detailed Analysis</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive character, word, and text structure analysis
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Instant Results</h3>
                <p className="text-sm text-gray-600">
                  Get all statistics immediately as you type with no delays
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📋</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Easy Copy/Paste</h3>
                <p className="text-sm text-gray-600">
                  One-click copy and paste functionality for seamless workflow
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