import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import SocialShare from "../../components/SocialShare";

export default function WordCounter() {
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Calculate various metrics
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lines = text === '' ? 0 : text.split('\n').length;
  const sentences = text === '' ? 0 : text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  const paragraphs = text === '' ? 0 : text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
  
  // Reading time calculation (average 200 words per minute)
  const readingTimeMinutes = Math.ceil(words / 200);
  const readingTimeSeconds = Math.round((words / 200) * 60);
  
  // Speaking time calculation (average 150 words per minute)
  const speakingTimeMinutes = Math.ceil(words / 150);
  const speakingTimeSeconds = Math.round((words / 150) * 60);

  // Most common words
  const getMostCommonWords = () => {
    const wordCount: { [key: string]: number } = {};
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
    
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  };

  const commonWords = getMostCommonWords();

  // Text statistics
  const averageWordLength = words > 0 ? (charactersNoSpaces / words).toFixed(1) : 0;
  const averageSentenceLength = sentences > 0 ? (words / sentences).toFixed(1) : 0;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Word Counter",
    "url": "https://zaptools.tech/tools/word-counter",
    "description": "Free online word counter tool. Count characters, words, lines, and analyze text statistics with detailed insights.",
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
        title="Word Counter Online – Free & Accurate | Zaptools"
        description="Count words and characters in your text instantly with our free online word counter. Fast, accurate, and no signup needed. Try it now!"
        url="https://zaptools.tech/tools/word-counter"
      />
      
      <Header />
      
      <div className={`min-h-screen py-20 px-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl">
              <span className="text-white text-3xl">📊</span>
            </div>
            <h1 className="text-5xl font-black text-center mb-6">
              <span className="text-blue-700">Word</span> <span className="text-blue-600">Counter</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Analyze your text with detailed statistics and insights. Count characters, words, lines, and more.
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
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Enter Your Text
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or paste your text here to analyze it..."
                    className="w-full h-96 p-6 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent resize-none text-lg font-medium placeholder-gray-400 transition-all duration-300"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setText('')}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-all duration-300"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(text)}
                        disabled={!text}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          text
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Copy
                      </button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Characters: {characters.toLocaleString()} | Words: {words.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-6">
              {/* Basic Counts */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  📈 Basic Counts
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Characters:</span>
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

              {/* Reading Time */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  ⏱️ Reading Time
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Reading (200 wpm):</span>
                    <span className="font-bold text-lg text-gray-900">
                      {readingTimeMinutes}m {readingTimeSeconds % 60}s
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Speaking (150 wpm):</span>
                    <span className="font-bold text-lg text-gray-900">
                      {speakingTimeMinutes}m {speakingTimeSeconds % 60}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Analysis */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  📊 Text Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average word length:</span>
                    <span className="font-bold text-lg text-gray-900">{averageWordLength} characters</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average sentence length:</span>
                    <span className="font-bold text-lg text-gray-900">{averageSentenceLength} words</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Most Common Words */}
          {commonWords.length > 0 && (
            <div className="mt-8 bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔤 Most Common Words</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {commonWords.map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{item.count}</div>
                    <div className="text-sm text-gray-600 font-medium">{item.word}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to Use Section */}
          <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">📖 How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Step-by-Step Guide</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Enter or paste your text in the input area above</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Watch real-time statistics update as you type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Review detailed analysis including reading time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Check most common words for content analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
                    <span>Use the copy button to save your text if needed</span>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Pro Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Perfect for checking essay word counts and limits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use reading time to estimate presentation duration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Analyze content by checking most common words</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Monitor character count for social media posts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Check average sentence length for readability</span>
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
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Real-time Analysis</h3>
                <p className="text-sm text-gray-600">
                  Get instant statistics as you type with detailed character, word, and line counts
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⏱️</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Reading Time</h3>
                <p className="text-sm text-gray-600">
                  Calculate reading and speaking time based on average reading speeds
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔤</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Word Frequency</h3>
                <p className="text-sm text-gray-600">
                  Identify most common words to analyze content and writing patterns
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📈</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Text Statistics</h3>
                <p className="text-sm text-gray-600">
                  Advanced metrics including average word length and sentence structure
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Mobile Friendly</h3>
                <p className="text-sm text-gray-600">
                  Works perfectly on all devices with responsive design and touch support
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Instant Results</h3>
                <p className="text-sm text-gray-600">
                  No waiting time - get all statistics immediately as you type
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