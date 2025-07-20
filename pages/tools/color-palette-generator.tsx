import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  name?: string;
}

interface Palette {
  id: string;
  name: string;
  colors: Color[];
  type: 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'custom';
}

const COLOR_SCHEMES = [
  { name: "Monochromatic", value: "monochromatic", description: "Variations of a single color" },
  { name: "Analogous", value: "analogous", description: "Colors next to each other on the color wheel" },
  { name: "Complementary", value: "complementary", description: "Colors opposite each other on the color wheel" },
  { name: "Triadic", value: "triadic", description: "Three colors equally spaced on the color wheel" },
  { name: "Tetradic", value: "tetradic", description: "Four colors forming a rectangle on the color wheel" }
];

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#FF6B6B");
  const [selectedScheme, setSelectedScheme] = useState("monochromatic");
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [currentPalette, setCurrentPalette] = useState<Color[]>([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // Convert RGB to Hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  // Generate color palette based on scheme
  const generatePalette = (hex: string, scheme: string) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors: Color[] = [];

    switch (scheme) {
      case "monochromatic":
        colors.push(
          { hex, rgb, hsl },
          { hex: rgbToHex(rgb.r + 20, rgb.g + 20, rgb.b + 20), rgb: { r: rgb.r + 20, g: rgb.g + 20, b: rgb.b + 20 }, hsl: rgbToHsl(rgb.r + 20, rgb.g + 20, rgb.b + 20) },
          { hex: rgbToHex(rgb.r + 40, rgb.g + 40, rgb.b + 40), rgb: { r: rgb.r + 40, g: rgb.g + 40, b: rgb.b + 40 }, hsl: rgbToHsl(rgb.r + 40, rgb.g + 40, rgb.b + 40) },
          { hex: rgbToHex(rgb.r - 20, rgb.g - 20, rgb.b - 20), rgb: { r: rgb.r - 20, g: rgb.g - 20, b: rgb.b - 20 }, hsl: rgbToHsl(rgb.r - 20, rgb.g - 20, rgb.b - 20) },
          { hex: rgbToHex(rgb.r - 40, rgb.g - 40, rgb.b - 40), rgb: { r: rgb.r - 40, g: rgb.g - 40, b: rgb.b - 40 }, hsl: rgbToHsl(rgb.r - 40, rgb.g - 40, rgb.b - 40) }
        );
        break;

      case "analogous":
        for (let i = -2; i <= 2; i++) {
          const newH = (hsl.h + i * 30 + 360) % 360;
          const newRgb = hslToRgb(newH, hsl.s, hsl.l);
          colors.push({
            hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            rgb: newRgb,
            hsl: { h: newH, s: hsl.s, l: hsl.l }
          });
        }
        break;

      case "complementary":
        colors.push(
          { hex, rgb, hsl },
          { hex: rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b), rgb: { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b }, hsl: rgbToHsl(255 - rgb.r, 255 - rgb.g, 255 - rgb.b) }
        );
        // Add variations
        for (let i = 1; i <= 3; i++) {
          const variation = { r: Math.max(0, Math.min(255, rgb.r + i * 20)), g: Math.max(0, Math.min(255, rgb.g + i * 20)), b: Math.max(0, Math.min(255, rgb.b + i * 20)) };
          colors.push({
            hex: rgbToHex(variation.r, variation.g, variation.b),
            rgb: variation,
            hsl: rgbToHsl(variation.r, variation.g, variation.b)
          });
        }
        break;

      case "triadic":
        for (let i = 0; i < 3; i++) {
          const newH = (hsl.h + i * 120) % 360;
          const newRgb = hslToRgb(newH, hsl.s, hsl.l);
          colors.push({
            hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            rgb: newRgb,
            hsl: { h: newH, s: hsl.s, l: hsl.l }
          });
        }
        break;

      case "tetradic":
        for (let i = 0; i < 4; i++) {
          const newH = (hsl.h + i * 90) % 360;
          const newRgb = hslToRgb(newH, hsl.s, hsl.l);
          colors.push({
            hex: rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            rgb: newRgb,
            hsl: { h: newH, s: hsl.s, l: hsl.l }
          });
        }
        break;
    }

    return colors;
  };

  // Check color contrast for accessibility
  const getContrastRatio = (color1: Color, color2: Color) => {
    const getLuminance = (color: Color) => {
      const { r, g, b } = color.rgb;
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  // Copy color to clipboard
  const copyColor = async (color: Color, format: 'hex' | 'rgb' | 'hsl') => {
    let text = '';
    switch (format) {
      case 'hex':
        text = color.hex;
        break;
      case 'rgb':
        text = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
        break;
      case 'hsl':
        text = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
        break;
    }
    
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(text);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  // Save palette
  const savePalette = () => {
    const newPalette: Palette = {
      id: Date.now().toString(),
      name: `Palette ${palettes.length + 1}`,
      colors: currentPalette,
      type: selectedScheme as any
    };
    setPalettes([...palettes, newPalette]);
  };

  // Export palette as CSS
  const exportCSS = () => {
    const css = `/* Color Palette */
:root {
${currentPalette.map((color, index) => `  --color-${index + 1}: ${color.hex};`).join('\n')}
}

/* Usage */
.color-1 { color: var(--color-1); }
.color-2 { color: var(--color-2); }
.color-3 { color: var(--color-3); }
.color-4 { color: var(--color-4); }
.color-5 { color: var(--color-5); }`;

    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate palette when base color or scheme changes
  useEffect(() => {
    const colors = generatePalette(baseColor, selectedScheme);
    setCurrentPalette(colors);
  }, [baseColor, selectedScheme]);

  return (
    <>
      <SEOHead
        title="Free Online Color Palette Generator | Zaptools"
        description="Create beautiful color palettes instantly with our free online color palette generator. Perfect for designers, developers, and creatives. No signup required!"
        url="https://zaptools.tech/tools/color-palette-generator"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Color Palette Generator</h1>
            <p className="text-xl text-gray-700 mb-6">Generate beautiful color palettes for your designs</p>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <button
              type="button"
              className="flex items-center gap-2 font-bold text-blue-700 text-lg focus:outline-none mb-2"
              onClick={() => setShowInstructions(v => !v)}
              aria-expanded={showInstructions}
            >
              <span>🎨</span> How to Use
              <svg className={`w-5 h-5 transform transition-transform duration-200 ${showInstructions ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showInstructions && (
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-6 shadow-sm animate-fade-in">
                <h2>How to Use the Color Palette Generator</h2>
                <ol>
                  <li>Enter your base color or select from the color picker.</li>
                  <li>Choose the palette type (analogous, complementary, etc.).</li>
                  <li>Click "Generate" to see your palette.</li>
                  <li>Copy or download your palette for your project.</li>
                </ol>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              {/* Base Color */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Base Color</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pick a Color</label>
                    <input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-full h-16 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="font-medium">HEX:</span>
                      <p className="font-mono">{baseColor}</p>
                    </div>
                    <div>
                      <span className="font-medium">RGB:</span>
                      <p className="font-mono">{hexToRgb(baseColor).r}, {hexToRgb(baseColor).g}, {hexToRgb(baseColor).b}</p>
                    </div>
                    <div>
                      <span className="font-medium">HSL:</span>
                      <p className="font-mono">{rgbToHsl(hexToRgb(baseColor).r, hexToRgb(baseColor).g, hexToRgb(baseColor).b).h}°, {rgbToHsl(hexToRgb(baseColor).r, hexToRgb(baseColor).g, hexToRgb(baseColor).b).s}%, {rgbToHsl(hexToRgb(baseColor).r, hexToRgb(baseColor).g, hexToRgb(baseColor).b).l}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Scheme */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Color Scheme</h2>
                <div className="space-y-3">
                  {COLOR_SCHEMES.map(scheme => (
                    <button
                      key={scheme.value}
                      onClick={() => setSelectedScheme(scheme.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${selectedScheme === scheme.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <h3 className="font-bold text-gray-900">{scheme.name}</h3>
                      <p className="text-sm text-gray-600">{scheme.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={savePalette}
                    className="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors duration-200"
                  >
                    💾 Save Palette
                  </button>
                  <button
                    onClick={exportCSS}
                    className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors duration-200"
                  >
                    📄 Export CSS
                  </button>
                </div>
              </div>

              {/* Saved Palettes */}
              {palettes.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Saved Palettes</h2>
                  <div className="space-y-3">
                    {palettes.map(palette => (
                      <div key={palette.id} className="p-3 border border-gray-200 rounded-lg">
                        <h3 className="font-bold text-gray-900 text-sm mb-2">{palette.name}</h3>
                        <div className="flex gap-1">
                          {palette.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded border border-gray-300"
                              style={{ backgroundColor: color.hex }}
                              title={color.hex}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Palette Preview */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Generated Palette</h2>
                <div className="space-y-4">
                  {currentPalette.map((color, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div
                        className="w-16 h-16 rounded-lg border border-gray-300"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">HEX:</span>
                            <p className="font-mono">{color.hex}</p>
                          </div>
                          <div>
                            <span className="font-medium">RGB:</span>
                            <p className="font-mono">{color.rgb.r}, {color.rgb.g}, {color.rgb.b}</p>
                          </div>
                          <div>
                            <span className="font-medium">HSL:</span>
                            <p className="font-mono">{color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyColor(color, 'hex')}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                        >
                          {copiedColor === color.hex ? '✓' : 'HEX'}
                        </button>
                        <button
                          onClick={() => copyColor(color, 'rgb')}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                        >
                          {copiedColor === `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})` ? '✓' : 'RGB'}
                        </button>
                        <button
                          onClick={() => copyColor(color, 'hsl')}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                        >
                          {copiedColor === `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)` ? '✓' : 'HSL'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessibility Check */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Accessibility Check</h2>
                <div className="space-y-3">
                  {currentPalette.slice(0, 3).map((color1, index1) => 
                    currentPalette.slice(index1 + 1, 4).map((color2, index2) => {
                      const contrast = getContrastRatio(color1, color2);
                      const isAccessible = contrast >= 4.5;
                      return (
                        <div key={`${index1}-${index2}`} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded border border-gray-300"
                              style={{ backgroundColor: color1.hex }}
                            />
                            <span className="text-sm">vs</span>
                            <div
                              className="w-8 h-8 rounded border border-gray-300"
                              style={{ backgroundColor: color2.hex }}
                            />
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Contrast: {contrast.toFixed(2)}:1</p>
                            <p className={`text-xs ${isAccessible ? 'text-green-600' : 'text-red-600'}`}>
                              {isAccessible ? '✓ Accessible' : '✗ Poor contrast'}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
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