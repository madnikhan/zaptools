"use client";
import Link from "next/link";
import { useState } from "react";
import ForexAnnouncementBanner from "./ForexAnnouncementBanner";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (category: string) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  const toolCategories = {
    "text": {
      name: "Text Tools",
      icon: "📝",
      tools: [
        { name: "Text to Handwriting", href: "/tools/text-to-handwriting", description: "Convert text to handwriting" },
        { name: "Word Counter", href: "/tools/word-counter", description: "Count words and characters" },
        { name: "Character Counter", href: "/tools/character-counter", description: "Count characters and paragraphs" },
        { name: "Password Generator", href: "/tools/password-generator", description: "Generate secure passwords" },
        { name: "Fancy Fonts Converter", href: "/tools/fancy-fonts-converter", description: "Convert to stylish fonts" },
        { name: "Emoji Picker", href: "/tools/emoji-picker", description: "Find and copy emojis" },
      ]
    },
    "image": {
      name: "Image Tools",
      icon: "🖼️",
      tools: [
        { name: "Image Compressor", href: "/tools/image-compressor", description: "Compress images online" },
        { name: "Profile Image Resizer", href: "/tools/profile-image-resizer", description: "Resize for social media" },
        { name: "Story Cover Maker", href: "/tools/story-cover-maker", description: "Create story covers" },
        { name: "Color Palette Generator", href: "/tools/color-palette-generator", description: "Generate color schemes" },
      ]
    },
    "file": {
      name: "File Tools",
      icon: "📁",
      tools: [
        { name: "PDF Merger & Splitter", href: "/tools/pdf-merger-splitter", description: "Merge or split PDFs" },
        { name: "Video Downloader", href: "/tools/video-downloader", description: "Download videos" },
        { name: "Base64 Encoder/Decoder", href: "/tools/base64-encoder-decoder", description: "Encode/decode data" },
      ]
    },
    "social": {
      name: "Social Media",
      icon: "📱",
      tools: [
        { name: "Hashtag Generator", href: "/tools/hashtag-generator", description: "Generate trending hashtags" },
        { name: "Bio & Caption Generator", href: "/tools/bio-caption-generator", description: "Create engaging content" },
        { name: "QR Code Generator", href: "/tools/qr-code-generator", description: "Create QR codes" },
        { name: "URL Shortener", href: "/tools/url-shortener", description: "Shorten long URLs" },
        { name: "Link in Bio Builder", href: "/tools/link-in-bio-builder", description: "Build bio pages" },
        { name: "Social Media Audit", href: "/tools/social-media-audit-checklist", description: "Audit your profiles" },
      ]
    }
  };

  return (
    <>
      <ForexAnnouncementBanner />
      <header className="bg-white sticky top-0 z-50 border-none shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-black text-lg">Z</span>
              </div>
              <div>
                <span className="text-2xl font-black text-gray-900">ZapTools</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {Object.entries(toolCategories).map(([key, category]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => toggleDropdown(key)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium rounded-lg transition-all duration-200"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {activeDropdown === key && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      </div>
                      <div className="p-2">
                        {category.tools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                              <span className="text-sm">⚡</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-blue-600">{tool.name}</div>
                              <div className="text-sm text-gray-500">{tool.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Forex AI Bot Link */}
              <Link
                href="/forex-ai-bot"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-medium rounded-lg transition-all duration-200"
              >
                <span className="text-lg">🤖</span>
                <span>Forex AI Bot</span>
              </Link>
              
              {/* Blog Link */}
              <Link
                href="/blog"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium rounded-lg transition-all duration-200"
              >
                <span className="text-lg">📝</span>
                <span>Blog</span>
              </Link>
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Link 
                href="/tools/text-to-handwriting"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Try Tools
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Categories */}
                {Object.entries(toolCategories).map(([key, category]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1 pl-6">
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                        >
                          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs">⚡</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{tool.name}</div>
                            <div className="text-xs text-gray-500">{tool.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Mobile Blog Link */}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/blog"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs">📝</span>
                    </div>
                    <span className="font-medium">Blog</span>
                  </Link>
                </div>

                {/* Mobile Forex AI Bot Link */}
                <div className="pt-2">
                  <Link
                    href="/forex-ai-bot"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg transition-all duration-200 shadow-lg"
                  >
                    <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                      <span className="text-xs">🤖</span>
                    </div>
                    <span className="font-medium">Forex AI Bot</span>
                  </Link>
                </div>
                
                {/* Mobile CTA Button */}
                <div className="pt-4 border-t border-gray-200">
                  <Link 
                    href="/tools/text-to-handwriting"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Try Tools
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Backdrop for dropdowns */}
        {activeDropdown && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </header>
    </>
  );
} 