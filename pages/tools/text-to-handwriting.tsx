import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import SocialShare from "../../components/SocialShare";
import dynamic from 'next/dynamic';
import { useCallback } from 'react';

// Dynamically import GIF for SSR safety
let GIF: any;
if (typeof window !== 'undefined') {
  GIF = require('gif.js').default || require('gif.js');
}

// Set gif.js worker script path
const GIF_WORKER_PATH = typeof window !== 'undefined' ? '/gif.worker.js' : '';

// Handwriting fonts data
const handwritingFonts = [
  { name: "Neat Handwriting", value: "neat", preview: "The quick brown fox" },
  { name: "Casual Script", value: "casual", preview: "The quick brown fox" },
  { name: "Cursive Elegant", value: "cursive", preview: "The quick brown fox" },
  { name: "Print Style", value: "print", preview: "The quick brown fox" },
  { name: "School Handwriting", value: "school", preview: "The quick brown fox" },
  { name: "Messy Notes", value: "messy", preview: "The quick brown fox" },
  { name: "Calligraphy", value: "calligraphy", preview: "The quick brown fox" },
  { name: "Doodle Style", value: "doodle", preview: "The quick brown fox" },
  { name: "Signature", value: "signature", preview: "The quick brown fox" },
  { name: "Note Taking", value: "notes", preview: "The quick brown fox" },
  { name: "Journal Style", value: "journal", preview: "The quick brown fox" },
  { name: "Letter Writing", value: "letter", preview: "The quick brown fox" },
  { name: "Creative Writing", value: "creative", preview: "The quick brown fox" },
  { name: "Formal Script", value: "formal", preview: "The quick brown fox" },
  { name: "Personal Notes", value: "personal", preview: "The quick brown fox" },
  { name: "Study Notes", value: "study", preview: "The quick brown fox" },
  { name: "Artistic Hand", value: "artistic", preview: "The quick brown fox" },
  { name: "Quick Notes", value: "quick", preview: "The quick brown fox" },
  { name: "Elegant Script", value: "elegant", preview: "The quick brown fox" },
  { name: "Modern Hand", value: "modern", preview: "The quick brown fox" },
];

const colorOptions = [
  { name: "Black", value: "#000000" },
  { name: "Blue", value: "#2563eb" },
  { name: "Green", value: "#16a34a" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Red", value: "#dc2626" },
  { name: "Brown", value: "#92400e" },
  { name: "Gray", value: "#6b7280" },
  { name: "Pink", value: "#ec4899" },
];

const effects = [
  { name: "None", value: "none" },
  { name: "Shadow", value: "shadow" },
  { name: "Glow", value: "glow" },
  { name: "Outline", value: "outline" },
  { name: "3D", value: "3d" },
  { name: "Emboss", value: "emboss" },
  { name: "Engrave", value: "engrave" },
  { name: "Double Shadow", value: "double-shadow" },
  { name: "Neon", value: "neon" },
  { name: "Inset", value: "inset" },
  { name: "Raised", value: "raised" },
  { name: "Sunken", value: "sunken" },
  { name: "Blur", value: "blur" },
  { name: "Soft Shadow", value: "soft-shadow" },
  { name: "Hard Shadow", value: "hard-shadow" },
  { name: "Retro", value: "retro" },
  { name: "Comic", value: "comic" },
  { name: "Fire", value: "fire" },
  { name: "Ice", value: "ice" },
  { name: "Rainbow", value: "rainbow" },
];

const animations = [
  { name: "None", value: "none" },
  { name: "Typewriter", value: "typewriter" },
  { name: "Wave", value: "wave" },
  { name: "Bounce", value: "bounce" },
  { name: "Fade In", value: "fade-in" },
  { name: "Slide In", value: "slide-in" },
  { name: "Flicker", value: "flicker" },
  { name: "Pulse", value: "pulse" },
  { name: "Zoom In", value: "zoom-in" },
  { name: "Zoom Out", value: "zoom-out" },
  { name: "Rotate", value: "rotate" },
  { name: "Shake", value: "shake" },
  { name: "Swing", value: "swing" },
  { name: "Jello", value: "jello" },
  { name: "Rubber Band", value: "rubber-band" },
  { name: "Flash", value: "flash" },
  { name: "Flip", value: "flip" },
  { name: "Roll In", value: "roll-in" },
  { name: "Pop", value: "pop" },
  { name: "Heartbeat", value: "heartbeat" },
  { name: "Color Cycle", value: "color-cycle" },
];

export default function TextToHandwriting() {
  const [text, setText] = useState("Hello, this is a sample text that will be converted to handwriting!");
  const [selectedFont, setSelectedFont] = useState("neat");
  const [fontSize, setFontSize] = useState(24);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left");
  const [textColor, setTextColor] = useState("#000000");
  const [selectedEffect, setSelectedEffect] = useState("none");
  const [customColor, setCustomColor] = useState("#000000");
  const [showCustomColor, setShowCustomColor] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [selectedAnimation, setSelectedAnimation] = useState("none");
  const [downloadFormat, setDownloadFormat] = useState("png");
  const [darkMode, setDarkMode] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text to Handwriting Converter",
    "url": "https://zaptools.tech/tools/text-to-handwriting",
    "description": "Convert digital text into beautiful handwritten notes with multiple fonts, colors, and effects. Free online tool with no registration required.",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "20+ handwriting fonts",
      "Custom colors and effects",
      "Multiple export formats",
      "Real-time preview",
      "No registration required"
    ]
  };

  const getFontFamily = (fontValue: string): string => {
    const fontMap: { [key: string]: string } = {
      neat: "'Indie Flower', cursive",
      casual: "'Shadows Into Light', cursive",
      cursive: "'Dancing Script', cursive",
      print: "'Architects Daughter', cursive",
      school: "'Patrick Hand', cursive",
      messy: "'Caveat', cursive",
      calligraphy: "'Great Vibes', cursive",
      doodle: "'Kalam', cursive",
      signature: "'Satisfy', cursive",
      notes: "'Reenie Beanie', cursive",
      journal: "'Homemade Apple', cursive",
      letter: "'Cedarville Cursive', cursive",
      creative: "'Rock Salt', cursive",
      formal: "'Allura', cursive",
      personal: "'Permanent Marker', cursive",
      study: "'Just Another Hand', cursive",
      artistic: "'Sacramento', cursive",
      quick: "'Gloria Hallelujah', cursive",
      elegant: "'Alex Brush', cursive",
      modern: "'Pacifico', cursive",
    };
    return fontMap[fontValue] || fontMap.neat;
  };

  const getEffectStyle = (effect: string, color: string): string => {
    switch (effect) {
      case "shadow":
        return `text-shadow: 2px 2px 4px rgba(0,0,0,0.3)`;
      case "glow":
        return `text-shadow: 0 0 10px ${color}, 0 0 20px ${color}`;
      case "outline":
        return `-webkit-text-stroke: 1px ${color}; color: transparent;`;
      case "3d":
        return `text-shadow: 1px 1px 0px ${color}, 2px 2px 0px ${color}, 3px 3px 0px ${color}`;
      default:
        return "";
    }
  };

  const getTextStyle = (): React.CSSProperties => {
    const fontFamily = getFontFamily(selectedFont);
    const effectStyle = getEffectStyle(selectedEffect, textColor);
    const isOutline = selectedEffect === "outline";

    let style: React.CSSProperties = {
      fontFamily,
      fontSize: `${fontSize}px`,
      textAlign,
      color: textColor,
    };

    if (isOutline) {
      style = {
        ...style,
        WebkitTextStroke: `1px ${textColor}`,
        color: "transparent",
      } as React.CSSProperties;
    }

    // Effects
    switch (selectedEffect) {
      case "shadow":
        style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)";
        break;
      case "glow":
        style.textShadow = `0 0 10px ${textColor}, 0 0 20px ${textColor}`;
        break;
      case "3d":
        style.textShadow = `1px 1px 0px ${textColor}, 2px 2px 0px ${textColor}, 3px 3px 0px ${textColor}`;
        break;
      case "emboss":
        style.textShadow = `1px 1px 0 #fff, 2px 2px 1px #aaa`;
        break;
      case "engrave":
        style.textShadow = `-1px -1px 1px #333, 1px 1px 1px #fff`;
        break;
      case "double-shadow":
        style.textShadow = `2px 2px 0 #000, 4px 4px 0 #888`;
        break;
      case "neon":
        style.textShadow = `0 0 5px ${textColor}, 0 0 10px ${textColor}, 0 0 20px #fff`;
        break;
      case "inset":
        style.textShadow = `inset 1px 1px 2px #000`;
        break;
      case "raised":
        style.textShadow = `1px 1px 0 #fff, 2px 2px 0 #000`;
        break;
      case "sunken":
        style.textShadow = `1px 1px 0 #000, 2px 2px 0 #fff`;
        break;
      case "blur":
        style.filter = `blur(1px)`;
        break;
      case "soft-shadow":
        style.textShadow = `0 2px 8px #888`;
        break;
      case "hard-shadow":
        style.textShadow = `4px 4px 0 #000`;
        break;
      case "retro":
        style.textShadow = `2px 2px 0 #ff0, 4px 4px 0 #f00`;
        break;
      case "comic":
        style.textShadow = `2px 2px 0 #fff, 4px 4px 0 #000`;
        break;
      case "fire":
        style.textShadow = `0 0 2px #ff0, 0 0 10px #f00, 0 0 20px #f00`;
        break;
      case "ice":
        style.textShadow = `0 0 2px #0ff, 0 0 10px #00f, 0 0 20px #00f`;
        break;
      case "rainbow":
        style.background = `linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)`;
        style.WebkitBackgroundClip = "text";
        style.WebkitTextFillColor = "transparent";
        style.backgroundClip = "text";
        break;
    }

    return style;
  };

  const downloadAsImage = async (format: string) => {
    if (!previewRef.current) return;
    setIsConverting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const link = document.createElement('a');
      if (format === 'gif' && selectedAnimation !== 'none') {
        // Animated GIF export
        const frameCount = 24; // 24 frames for ~1s at 24fps
        const duration = 1000; // ms
        const delay = duration / frameCount;
        const gif = new GIF({
          workers: 2,
          quality: 10,
          width: previewRef.current.offsetWidth,
          height: previewRef.current.offsetHeight,
          workerScript: GIF_WORKER_PATH,
        });
        // Debug: log gif.js events
        gif.on('start', () => console.log('GIF: start'));
        gif.on('progress', (p: any) => console.log('GIF: progress', p));
        gif.on('abort', () => { console.log('GIF: abort'); setIsConverting(false); });
        gif.on('error', (err: any) => { console.error('GIF: error', err); setIsConverting(false); alert('GIF export failed.'); });
        let finished = false;
        const finishTimeout = setTimeout(() => {
          if (!finished) {
            setIsConverting(false);
            alert('GIF export timed out.');
          }
        }, 20000); // 20s timeout
        // Temporarily add animation class
        previewRef.current.classList.add(`zap-anim-${selectedAnimation}`);
        for (let i = 0; i < frameCount; i++) {
          previewRef.current.style.setProperty('--zap-anim-progress', (i / frameCount).toString());
          await new Promise((res) => setTimeout(res, delay));
          const canvas = await html2canvas(previewRef.current, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: true,
          });
          gif.addFrame(canvas, { delay });
        }
        previewRef.current.classList.remove(`zap-anim-${selectedAnimation}`);
        gif.on('finished', function(blob: any) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `handwriting-${Date.now()}.gif`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          setIsConverting(false);
        });
        gif.render();
        return;
      }
      // Non-animated or non-GIF export
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      if (format === 'pdf') {
        const jsPDF = (await import('jspdf')).default;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('handwriting.pdf');
      } else {
        canvas.toBlob((blob) => {
          if (blob) {
            link.href = URL.createObjectURL(blob);
            link.download = `handwriting.${format}`;
            link.click();
          }
        }, `image/${format}`);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Error generating download. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <>
      <SEOHead 
        title="Text to Handwriting Converter"
        description="Convert your digital text into beautiful handwritten notes with our free online tool. Choose from 20+ fonts, custom colors, and effects. No registration required!"
        keywords="text to handwriting, handwriting converter, digital handwriting, handwritten notes, text to cursive, handwriting fonts, online handwriting tool, free handwriting generator"
        url="https://zaptools.tech/tools/text-to-handwriting"
        image="https://zaptools.tech/og-text-to-handwriting.jpg"
        type="website"
        structuredData={structuredData}
      />
      
      <Head>
        <title>Text to Handwriting Converter - ZapTools</title>
        <meta name="description" content="Convert your digital text into realistic handwriting with 20+ fonts, custom colors, gradients, and effects. Download as PNG, JPG, SVG, GIF, or PDF." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Shadows+Into+Light&family=Dancing+Script&family=Architects+Daughter&family=Patrick+Hand&family=Caveat&family=Great+Vibes&family=Kalam&family=Satisfy&family=Reenie+Beanie&family=Homemade+Apple&family=Cedarville+Cursive&family=Rock+Salt&family=Allura&family=Permanent+Marker&family=Just+Another+Hand&family=Sacramento&family=Gloria+Hallelujah&family=Alex+Brush&family=Pacifico&display=swap" rel="stylesheet" />
      </Head>

      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl">
              <span className="text-white text-3xl">✍️</span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-4">
              Text to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Handwriting</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Convert your digital text into realistic handwriting with 20+ fonts, custom colors, gradients, and effects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls Panel */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                {/* Text Input */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Enter Your Text
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent resize-none text-lg font-medium placeholder-gray-400 transition-all duration-300"
                    placeholder="Type or paste your text here..."
                  />
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <span>Characters: {charCount}</span>
                    <span>Words: {wordCount}</span>
                  </div>
                </div>

                {/* Font Selection */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Handwriting Style
                  </label>
                  <select
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-lg font-medium transition-all duration-300"
                  >
                    {handwritingFonts.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size Slider */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>12px</span>
                    <span>72px</span>
                  </div>
                </div>

                {/* Text Alignment */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Text Alignment
                  </label>
                  <div className="flex gap-2">
                    {['left', 'center', 'right', 'justify'].map((align) => (
                      <button
                        key={align}
                        onClick={() => setTextAlign(align as "left" | "center" | "right")}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                          textAlign === align
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {align.charAt(0).toUpperCase() + align.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Options */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Text Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setTextColor(color.value)}
                        className={`w-12 h-12 rounded-2xl border-4 transition-all duration-300 ${
                          textColor === color.value
                            ? 'border-blue-400 shadow-lg scale-110'
                            : 'border-transparent hover:border-blue-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                    <button
                      onClick={() => setShowCustomColor(!showCustomColor)}
                      className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl border-4 border-transparent hover:border-blue-300 hover:scale-105 transition-all duration-300 flex items-center justify-center"
                      title="Custom Color"
                    >
                      <span className="text-white text-lg">+</span>
                    </button>
                  </div>
                  {showCustomColor && (
                    <div className="mt-3">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => {
                          setCustomColor(e.target.value);
                          setTextColor(e.target.value);
                        }}
                        className="w-full h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                {/* Effects */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Text Effects
                  </label>
                  <select
                    value={selectedEffect}
                    onChange={(e) => setSelectedEffect(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-lg font-medium transition-all duration-300"
                  >
                    {effects.map((effect) => (
                      <option key={effect.value} value={effect.value}>
                        {effect.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Download Options */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Download Format
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {['png', 'jpg', 'svg', 'gif', 'pdf'].map((format) => (
                      <button
                        key={format}
                        type="button"
                        onClick={() => setDownloadFormat(format)}
                        disabled={isConverting}
                        className={`py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${downloadFormat === format ? 'ring-2 ring-blue-400' : ''}`}
                      >
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadAsImage(downloadFormat)}
                    disabled={isConverting}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isConverting ? 'Converting...' : `Download as ${downloadFormat.toUpperCase()}`}
                  </button>
                </div>

                {/* Text Animation (GIF only) */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Text Animation <span className="text-xs text-blue-500">(GIF only)</span>
                  </label>
                  <select
                    value={selectedAnimation}
                    onChange={(e) => setSelectedAnimation(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-lg font-medium transition-all duration-300"
                    disabled={downloadFormat !== 'gif'}
                  >
                    {animations.map((anim) => (
                      <option key={anim.value} value={anim.value}>{anim.name}</option>
                    ))}
                  </select>
                  {downloadFormat !== 'gif' && (
                    <div className="text-xs text-gray-400 mt-1">Select GIF format to enable animations.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Preview</h2>
              <div 
                ref={previewRef}
                className="min-h-[400px] p-8 bg-white border-2 border-gray-200 rounded-2xl"
                style={{ 
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #f0f0f0 1px, transparent 0)',
                  backgroundSize: '20px 20px'
                }}
              >
                <div
                  className={`whitespace-pre-wrap break-words ${downloadFormat === 'gif' && selectedAnimation !== 'none' ? `zap-anim-${selectedAnimation}` : ''}`}
                  style={{
                    ...getTextStyle(),
                    display: 'inline-block',
                    width: '100%',
                  }}
                >
                  {text || "Your handwriting will appear here..."}
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className={`mt-12 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 border`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>📖 How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Step-by-Step Guide</h3>
                <ol className={`space-y-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Enter or paste your text in the input area above</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Choose your preferred handwriting style from the font dropdown</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Customize colors, size, and effects using the controls</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Preview your handwriting in real-time on the right</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
                    <span>Download as PNG, PDF, or GIF when satisfied</span>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Pro Tips</h3>
                <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use different fonts for variety in your projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Adjust line spacing for better readability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Try different colors to match your brand or theme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use GIF export for animated handwriting effects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Experiment with different paper textures for authenticity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className={`mt-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 border`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>✨ Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✍️</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Multiple Fonts</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  8 realistic handwriting styles including cursive, print, and artistic fonts
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎨</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Custom Colors</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Choose any color for text, background, and paper texture
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📄</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Multiple Formats</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Export as PNG, PDF, or animated GIF with custom settings
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Real-time Preview</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  See changes instantly as you type and adjust settings
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎭</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Special Effects</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Add paper texture, shadows, and realistic handwriting effects
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Mobile Friendly</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Works perfectly on all devices with responsive design
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

      <style jsx global>{`
        @keyframes zap-typewriter { from { width: 0; } to { width: 100%; } }
        .zap-anim-typewriter { overflow: hidden; white-space: nowrap; border-right: 2px solid #333; animation: zap-typewriter 2s steps(40, end) 1s 1 normal both; }
        @keyframes zap-wave { 0%,100%{transform:translateY(0)} 20%{transform:translateY(-10px)} 40%{transform:translateY(10px)} 60%{transform:translateY(-10px)} 80%{transform:translateY(10px)} }
        .zap-anim-wave { display: inline-block; animation: zap-wave 2s infinite; }
        @keyframes zap-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        .zap-anim-bounce { animation: zap-bounce 1s infinite; }
        @keyframes zap-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .zap-anim-fade-in { animation: zap-fade-in 2s ease-in; }
        @keyframes zap-slide-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .zap-anim-slide-in { animation: zap-slide-in 1s ease-out; }
        @keyframes zap-flicker { 0%,100%{opacity:1} 10%{opacity:0.1} 20%{opacity:1} 30%{opacity:0.3} 40%{opacity:1} 50%{opacity:0.5} 60%{opacity:1} 70%{opacity:0.2} 80%{opacity:1} 90%{opacity:0.7} }
        .zap-anim-flicker { animation: zap-flicker 1.5s infinite; }
        @keyframes zap-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        .zap-anim-pulse { animation: zap-pulse 1s infinite; }
        @keyframes zap-zoom-in { from { transform: scale(0.5); } to { transform: scale(1); } }
        .zap-anim-zoom-in { animation: zap-zoom-in 0.7s ease; }
        @keyframes zap-zoom-out { from { transform: scale(1.5); } to { transform: scale(1); } }
        .zap-anim-zoom-out { animation: zap-zoom-out 0.7s ease; }
        @keyframes zap-rotate { from { transform: rotate(-360deg); } to { transform: rotate(0); } }
        .zap-anim-rotate { animation: zap-rotate 1.5s linear; }
        @keyframes zap-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-10px)} 40%{transform:translateX(10px)} 60%{transform:translateX(-10px)} 80%{transform:translateX(10px)} }
        .zap-anim-shake { animation: zap-shake 0.7s infinite; }
        @keyframes zap-swing { 20%{transform:rotate(15deg)} 40%{transform:rotate(-10deg)} 60%{transform:rotate(5deg)} 80%{transform:rotate(-5deg)} 100%{transform:rotate(0)} }
        .zap-anim-swing { display: inline-block; animation: zap-swing 1s infinite; }
        @keyframes zap-jello { 0%,100%{transform:scale3d(1,1,1)} 30%{transform:scale3d(1.25,0.75,1)} 40%{transform:scale3d(0.75,1.25,1)} 50%{transform:scale3d(1.15,0.85,1)} 65%{transform:scale3d(.95,1.05,1)} 75%{transform:scale3d(1.05,.95,1)} }
        .zap-anim-jello { animation: zap-jello 1s both; }
        @keyframes zap-rubber-band { 0%{transform:scale3d(1,1,1)} 30%{transform:scale3d(1.25,0.75,1)} 40%{transform:scale3d(0.75,1.25,1)} 50%{transform:scale3d(1.15,0.85,1)} 65%{transform:scale3d(.95,1.05,1)} 75%{transform:scale3d(1.05,.95,1)} 100%{transform:scale3d(1,1,1)} }
        .zap-anim-rubber-band { animation: zap-rubber-band 1s; }
        @keyframes zap-flash { 0%,100%{opacity:1} 50%{opacity:0} }
        .zap-anim-flash { animation: zap-flash 1s infinite; }
        @keyframes zap-flip { from { transform: rotateY(90deg); } to { transform: rotateY(0); } }
        .zap-anim-flip { animation: zap-flip 0.7s; }
        @keyframes zap-roll-in { from { transform: translateX(-100%) rotate(-120deg); } to { transform: translateX(0) rotate(0); } }
        .zap-anim-roll-in { animation: zap-roll-in 1s; }
        @keyframes zap-pop { 0%{transform:scale(0.5)} 80%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .zap-anim-pop { animation: zap-pop 0.5s; }
        @keyframes zap-heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.3)} 28%{transform:scale(1)} 42%{transform:scale(1.3)} 70%{transform:scale(1)} }
        .zap-anim-heartbeat { animation: zap-heartbeat 1.2s infinite; }
        @keyframes zap-color-cycle { 0%{color:#f00} 20%{color:#ff0} 40%{color:#0f0} 60%{color:#0ff} 80%{color:#00f} 100%{color:#f0f} }
        .zap-anim-color-cycle { animation: zap-color-cycle 2s infinite; }
      `}</style>
    </>
  );
} 