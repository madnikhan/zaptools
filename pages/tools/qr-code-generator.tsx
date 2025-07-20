import { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEOHead from '../../components/SEOHead';
import SocialShare from '../../components/SocialShare';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState(256);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [errorCorrection, setErrorCorrection] = useState('M');
  const [isGenerating, setIsGenerating] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [qrStyle, setQrStyle] = useState('squares');
  const [margin, setMargin] = useState(4);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code using QR Server API
  const generateQRCode = async () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    try {
      const params = new URLSearchParams({
        data: text,
        size: size.toString(),
        color: foregroundColor.replace('#', ''),
        bgcolor: backgroundColor.replace('#', ''),
        qzone: margin.toString(),
        format: 'png',
        ecc: errorCorrection
      });

      const url = `https://api.qrserver.com/v1/create-qr-code/?${params}`;
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-generate when text changes
  useEffect(() => {
    if (text.trim()) {
      const timeoutId = setTimeout(generateQRCode, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setQrCodeUrl('');
    }
  }, [text, size, foregroundColor, backgroundColor, errorCorrection, margin]);

  // Download QR code
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-code-${text.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy QR code to clipboard
  const copyQRCode = async () => {
    if (!qrCodeUrl) return;
    
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      alert('QR code copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy QR code:', error);
      alert('Failed to copy QR code to clipboard');
    }
  };

  // Quick templates
  const quickTemplates = [
    { name: 'Website', value: 'https://example.com', icon: '🌐' },
    { name: 'Email', value: 'mailto:info@inventix-studio.online', icon: '📧' },
    { name: 'Phone', value: 'tel:+1234567890', icon: '📞' },
    { name: 'WiFi', value: 'WIFI:S:MyWiFi;T:WPA;P:mypassword123;;', icon: '📶' },
    { name: 'Text', value: 'Hello World!', icon: '📝' },
  ];

  const applyTemplate = (template: string) => {
    setText(template);
  };

  return (
    <>
      <SEOHead
        title="QR Code Generator - ZapTools"
        description="Generate custom QR codes instantly. Free QR code generator with color customization, multiple formats, and download options."
        keywords="qr code generator, qr code, custom qr code, qr code maker, qr code creator"
        url="https://zaptools.tech/tools/qr-code-generator"
        contentType="tool"
        category="Utilities"
      />
      <Header />
      <div className={`min-h-screen py-20 px-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl">
              <span className="text-white text-3xl">📱</span>
            </div>
            <h1 className="text-5xl font-black mb-4">
              QR Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Generator</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Create custom QR codes instantly. Perfect for websites, contact info, WiFi networks, and more.
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
            {/* Controls Panel */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                {/* Quick Templates */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Quick Templates
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {quickTemplates.map((template, idx) => (
                      <button
                        key={idx}
                        onClick={() => applyTemplate(template.value)}
                        className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-all duration-300 text-gray-700"
                      >
                        <div className="text-lg mb-1">{template.icon}</div>
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Input */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Content (URL, Text, Contact Info, etc.)
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter URL, text, or any content to encode..."
                    className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-lg font-medium placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                {/* Size Control */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Size: {size}px
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>128px</span>
                    <span>512px</span>
                  </div>
                </div>

                {/* Color Controls */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Colors
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        QR Code Color
                      </label>
                      <input
                        type="color"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="w-full h-12 rounded-xl cursor-pointer border-2 border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Background Color
                      </label>
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-full h-12 rounded-xl cursor-pointer border-2 border-gray-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Correction */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Error Correction
                  </label>
                  <select
                    value={errorCorrection}
                    onChange={(e) => setErrorCorrection(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-lg font-medium transition-all duration-300"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>

                {/* Download Options */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Download Options
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={downloadQRCode}
                      disabled={!qrCodeUrl || isGenerating}
                      className="py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Download PNG
                    </button>
                    <button
                      onClick={copyQRCode}
                      disabled={!qrCodeUrl || isGenerating}
                      className="py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Preview */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">QR Code Preview</h2>
              <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-2xl border-2 border-gray-200">
                {isGenerating ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Generating QR Code...</p>
                  </div>
                ) : qrCodeUrl ? (
                  <div className="text-center">
                    <img 
                      src={qrCodeUrl} 
                      alt="Generated QR Code" 
                      className="max-w-full h-auto rounded-xl shadow-lg"
                    />
                    <p className="text-sm text-gray-500 mt-4 max-w-xs">
                      {text.length > 50 ? text.substring(0, 50) + '...' : text}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-lg font-medium">Your QR code will appear here</p>
                    <p className="text-sm">Enter content above to generate</p>
                  </div>
                )}
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
                    <span>Enter your content (URL, text, contact info, etc.) in the input field</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Use quick templates for common QR code types</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Customize size, colors, and error correction level</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Preview your QR code in real-time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
                    <span>Download as PNG or copy to clipboard</span>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Pro Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use higher error correction for better scanning reliability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Choose contrasting colors for better readability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Larger sizes work better for printing and scanning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Test your QR code with different scanning apps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use WiFi QR codes to share network credentials easily</span>
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
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Instant Generation</h3>
                <p className="text-sm text-gray-600">
                  Generate QR codes instantly with real-time preview as you type
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎨</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Custom Colors</h3>
                <p className="text-sm text-gray-600">
                  Customize QR code and background colors to match your brand
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Multiple Formats</h3>
                <p className="text-sm text-gray-600">
                  Support for URLs, text, contact info, WiFi networks, and more
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔧</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Error Correction</h3>
                <p className="text-sm text-gray-600">
                  Choose from 4 levels of error correction for better reliability
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📥</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Easy Download</h3>
                <p className="text-sm text-gray-600">
                  Download as PNG or copy to clipboard with one click
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📋</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Quick Templates</h3>
                <p className="text-sm text-gray-600">
                  Pre-built templates for common QR code use cases
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
} 