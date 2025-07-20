import { useState, useRef } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

export default function StoryCoverMaker() {
  const [text, setText] = useState("My Story");
  const [backgroundColor, setBackgroundColor] = useState("#FF6B6B");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState(24);
  const [selectedSize, setSelectedSize] = useState({ name: "Instagram Story", width: 1080, height: 1920 });
  const [showInstructions, setShowInstructions] = useState(false);

  const downloadCover = () => {
    // Download functionality will be implemented
    alert('Download functionality coming soon!');
  };

  const coverSizes = [
    { name: "Instagram Story", width: 1080, height: 1920 },
    { name: "Instagram Highlight", width: 1080, height: 1080 },
    { name: "Instagram Post", width: 1080, height: 1080 },
    { name: "TikTok", width: 1080, height: 1920 }
  ];

  return (
    <>
      <SEOHead
        title="Story & Highlight Cover Maker | ZapTools"
        description="Create custom highlight covers and story backgrounds for Instagram and other social platforms. Free online cover maker by ZapTools."
        keywords="story cover maker, highlight cover maker, instagram story cover, instagram highlight cover, social media cover maker"
        url="https://zaptools.tech/tools/story-cover-maker"
        contentType="tool"
        category="Social Media"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Story & Highlight Cover Maker</h1>
            <p className="text-xl text-gray-700 mb-6">Create custom covers for your stories and highlights</p>
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
                  <li><strong>Choose a size</strong> for your target platform (Instagram Story, Highlight, etc.)</li>
                  <li><strong>Add your text</strong> and customize colors and fonts</li>
                  <li><strong>Preview in real-time</strong> as you make changes</li>
                  <li><strong>Download</strong> your cover in high resolution</li>
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              {/* Size Selector */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Size</h2>
                <div className="grid grid-cols-2 gap-3">
                  {coverSizes.map(size => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedSize.name === size.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900 text-sm mb-1">{size.name}</h3>
                        <p className="text-xs text-gray-600">{size.width} × {size.height}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Customization */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Text Customization</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your text..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Size: {fontSize}px</label>
                    <input
                      type="range"
                      min="12"
                      max="60"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Colors</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full h-12 border border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-12 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Download */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Download</h2>
                <button
                  onClick={downloadCover}
                  className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors duration-200"
                >
                  📥 Download Cover ({selectedSize.width} × {selectedSize.height})
                </button>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Live Preview</h2>
                <div className="flex justify-center">
                  <div
                    className="relative border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg flex items-center justify-center"
                    style={{
                      width: selectedSize.width / 4,
                      height: selectedSize.height / 4,
                      backgroundColor: backgroundColor,
                      fontSize: `${fontSize / 4}px`,
                      color: textColor,
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {text || "Your Text Here"}
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>Size: {selectedSize.width} × {selectedSize.height} pixels</p>
                  <p>Aspect Ratio: {selectedSize.width === selectedSize.height ? "1:1" : "9:16"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 