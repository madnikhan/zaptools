import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import SocialShare from "../components/SocialShare";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRecentPosts, BlogPost } from '../lib/blog';
import { GetStaticProps } from 'next';
import { format } from 'date-fns';

export const getStaticProps: GetStaticProps = async () => {
  const recentPosts = getRecentPosts(3);
  return {
    props: {
      recentPosts,
    },
    revalidate: 60, // Optional: ISR
  };
};

export default function Home({ recentPosts }: { recentPosts: BlogPost[] }) {
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    // Check if banner is visible
    const bannerClosed = localStorage.getItem('forex-banner-closed');
    setBannerVisible(!bannerClosed);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ZapTools",
    "url": "https://zaptools.tech",
    "description": "Free online tools for productivity, file conversion, and digital tasks. No registration required, always free.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://zaptools.tech/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free online tools"
    }
  };

  return (
    <div className={bannerVisible ? 'forex-banner-visible' : ''}>
      <Head>
        <meta name="google-site-verification" content="2La5Qqcv07Mn6eF4CmZiW2cug7YgL3lC_NKKGbDKFUM" />
      </Head>
      
      <SEOHead 
        title="ZapTools - Free Online Tools for Everyone"
        description="Free online tools for productivity, file conversion, and digital tasks. Convert, compress, and create — all in one place. No sign-up required, always free."
        keywords="free online tools, productivity tools, file converter, image compressor, pdf merger, qr code generator, password generator, word counter, text to handwriting, url shortener"
        url="https://zaptools.tech"
        image="https://zaptools.tech/og-image.jpg"
        structuredData={structuredData}
      />
      
      <Header />
      
      {/* Hero Section with Animated Background */}
      <div className={`relative min-h-screen overflow-hidden hero-section ${bannerVisible ? 'pt-24' : 'pt-32'}`}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            {/* Animated Logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl mb-8 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse">
              <span className="text-white text-4xl font-black">Z</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-7xl md:text-8xl font-black mb-8 text-gray-900 leading-tight">
              Free Online Tools for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                Everyone
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Convert, compress, and create — all in one place. 
              <span className="text-blue-600 font-semibold"> No sign-up required</span>, 
              <span className="text-purple-600 font-semibold"> always free</span>, 
              and designed for speed and simplicity.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-semibold">No Registration</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-semibold">Always Free</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-semibold">Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Powerful Tools for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Every Need</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From text conversion to file processing, we've got you covered with our growing collection of free online tools.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="space-y-12">
            {/* Featured Tool - Forex AI Bot */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🚀 Featured Tool</h3>
              <div className="grid grid-cols-1 gap-8">
                <Link href="/forex-ai-bot" className="block">
                  <div className="group relative bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-yellow-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 via-orange-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-white text-3xl">🤖</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">Forex AI Bot - Coming Soon</h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        Revolutionary AI-powered forex trading signals using Advanced AI Technology + Fundamental Analysis + Technical Analysis + Deep Reasoning LLM for maximum earnings.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-orange-600 font-bold text-lg">
                          Join Waitlist - Get 50% Off
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">15-25% ROI</span>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">85%+ Accuracy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Text & Writing Tools */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">📝 Text & Writing Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Text to Handwriting Tool */}
                <Link href="/tools/text-to-handwriting" className="block">
                  <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-white text-3xl">✍️</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Text to Handwriting</h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        Convert your digital text into realistic handwriting. Perfect for personal notes, 
                        creative projects, and unique content.
                      </p>
                      <div className="flex items-center text-blue-600 font-bold text-lg">
                        Try it now
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Word Counter */}
                <Link href="/tools/word-counter" className="block">
                  <div className="group relative bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-green-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-white text-3xl">📊</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                        <span className="text-blue-700">Word</span> Counter
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        Count words, characters, and paragraphs in your text with detailed statistics and reading time estimates.
                      </p>
                      <div className="flex items-center text-green-600 font-bold text-lg">
                        Try it now
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Password Generator */}
                <Link href="/tools/password-generator" className="block">
                  <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-purple-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-white text-3xl">🔐</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Password Generator</h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        Generate secure, random passwords with customizable options and strength analysis.
                      </p>
                      <div className="flex items-center text-purple-600 font-bold text-lg">
                        Try it now
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* File & Media Tools */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">📁 File & Media Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Merge PDFs Tool */}
                <Link href="/tools/pdf-merger-splitter" className="block">
                  <div className="group relative bg-gradient-to-br from-blue-50 to-purple-100 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-blue-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-white text-3xl">📄</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">PDF Merger & Splitter</h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        Combine multiple PDF files into one document or split large PDFs. Simple, fast, and secure.
                      </p>
                      <div className="flex items-center text-blue-600 font-bold text-lg">
                        Try it now
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Image Compressor Tool */}
                <Link href="/tools/image-compressor" className="block">
                  <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-orange-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-white text-3xl">🖼️</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">Image Compressor</h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        Reduce image file sizes without losing quality. Perfect for web optimization with advanced features.
                      </p>
                      <div className="flex items-center text-orange-600 font-bold text-lg">
                        Try it now
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* QR Code Generator */}
                <Link href="/tools/qr-code-generator" className="block">
                  <div className="group relative bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-teal-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-white text-3xl">📱</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">QR Code Generator</h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        Create custom QR codes for websites, contact info, WiFi networks, and more with styling options.
                      </p>
                      <div className="flex items-center text-teal-600 font-bold text-lg">
                        Try it now
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Web & Utility Tools */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🌐 Web & Utility Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* URL Shortener */}
                <Link href="/tools/url-shortener" className="block">
                  <div className="group relative bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-indigo-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-white text-3xl">🔗</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">URL Shortener</h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        Transform long URLs into short, shareable links with custom slugs and QR codes.
                      </p>
                      <div className="flex items-center text-indigo-600 font-bold text-lg">
                        Try it now
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Color Palette Generator */}
                <Link href="/tools/color-palette-generator" className="block">
                  <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-pink-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-white text-3xl">🎨</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">Color Palette Generator</h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        Create beautiful color palettes with monochromatic, analogous, complementary, and more schemes.
                      </p>
                      <div className="flex items-center text-pink-600 font-bold text-lg">
                        Try it now
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Base64 Encoder/Decoder */}
                <Link href="/tools/base64-encoder-decoder" className="block">
                  <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-emerald-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-white text-3xl">🔧</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">Base64 Encoder/Decoder</h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                        Convert text and files to Base64 format and back. Support for URL-safe encoding and validation.
                      </p>
                      <div className="flex items-center text-emerald-600 font-bold text-lg">
                        Try it now
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-gray-900 mb-6">
            Popular Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our most frequently used tools for quick access.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Link href="/tools/color-palette-generator" className="block bg-white rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white text-3xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Color Palette Generator</h3>
              <p className="text-gray-600 leading-relaxed">Create beautiful color palettes with various schemes.</p>
            </Link>
            <Link href="/tools/word-counter" className="block bg-white rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Word Counter</h3>
              <p className="text-gray-600 leading-relaxed">Count words, characters, and paragraphs with detailed statistics.</p>
            </Link>
            <Link href="/tools/pdf-merger-splitter" className="block bg-white rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white text-3xl">📄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">PDF Merger & Splitter</h3>
              <p className="text-gray-600 leading-relaxed">Combine or split PDF files effortlessly.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Forex AI Bot Announcement Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-orange-400 rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-red-400 rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-yellow-500 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mb-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="text-white text-4xl">🤖</span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Coming Soon: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">AI-Powered Forex Trading</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Revolutionary trading signals powered by Advanced AI Technology + Fundamental Analysis + Technical Analysis + Deep Reasoning LLM
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700">🧠 Advanced AI</span>
              <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700">📊 Multi-Analysis</span>
              <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700">⚡ Real-time Signals</span>
              <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700">💰 Maximum Earnings</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🧠</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced AI Technology</h3>
                    <p className="text-gray-600">Deep learning models for pattern recognition, predictive analytics, and market sentiment analysis.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Analysis Approach</h3>
                    <p className="text-gray-600">Combines technical indicators, fundamental data, and sentiment analysis for comprehensive market insights.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Trading Signals</h3>
                    <p className="text-gray-600">Instant notifications with entry/exit points, stop-loss levels, and risk-reward ratios.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - CTA */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center">
                <h3 className="text-3xl font-black text-gray-900 mb-4">
                  🚀 Join the Waitlist
                </h3>
                <p className="text-gray-600 mb-6">
                  Get <span className="font-bold text-orange-600">50% off</span> the launch price and be among the first to access our AI-powered trading signals.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-gray-700">500+ traders already on waitlist</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-gray-700">Expected ROI: 15-25% monthly</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-gray-700">Professional-grade insights</span>
                  </div>
                </div>

                <Link 
                  href="/forex-ai-bot"
                  className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Join Waitlist - Get 50% Off
                </Link>

                <p className="text-sm text-gray-500 mt-4">
                  📧 We'll notify you at launch • 🔒 No spam, ever
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ZapTools</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best online tools experience with speed, security, and simplicity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Process your files and data instantly with our optimized tools and cloud infrastructure.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Secure</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Your files are processed locally and never stored on our servers. Your privacy is our priority.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Always Free</h3>
              <p className="text-gray-600 text-lg leading-relaxed">No hidden costs, no premium features - everything is completely free, forever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust ZapTools for their daily online tool needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <a 
              href="/tools/text-to-handwriting" 
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Try Our First Tool
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a 
              href="/blog" 
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Read Our Blog
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          
          {/* Social Sharing */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Share ZapTools with Friends</h3>
            <SocialShare 
              title="ZapTools - Free Online Tools for Everyone"
              description="Convert, compress, and create with our free online tools. No sign-up required, always free!"
              hashtags={['zaptools', 'onlinetools', 'productivity', 'freetools']}
              className="justify-center"
            />
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map(post => (
              <div key={post.slug} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-left">
                <a href={`/blog/${post.slug}`} className="text-2xl font-bold text-blue-700 hover:underline block mb-2">{post.title}</a>
                <div className="text-gray-500 text-sm mb-2">{format(new Date(post.date), 'MMMM dd, yyyy')}</div>
                <p className="mb-2 text-gray-700">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">Read more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
