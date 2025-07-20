import { useState, useRef } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

interface EncodingResult {
  input: string;
  output: string;
  type: 'encode' | 'decode';
  timestamp: Date;
}

export default function Base64EncoderDecoder() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [urlSafe, setUrlSafe] = useState(false);
  const [history, setHistory] = useState<EncodingResult[]>([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Encode text to Base64
  const encodeToBase64 = (text: string, urlSafeMode: boolean = false) => {
    try {
      let encoded = btoa(text);
      if (urlSafeMode) {
        encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      }
      return encoded;
    } catch (error) {
      return "Error: Unable to encode text";
    }
  };

  // Decode Base64 to text
  const decodeFromBase64 = (text: string, urlSafeMode: boolean = false) => {
    try {
      let decoded = text;
      if (urlSafeMode) {
        decoded = decoded.replace(/-/g, '+').replace(/_/g, '/');
        // Add padding if needed
        while (decoded.length % 4) {
          decoded += '=';
        }
      }
      return atob(decoded);
    } catch (error) {
      return "Error: Invalid Base64 string";
    }
  };

  // Handle text processing
  const processText = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    let result = "";
    if (mode === 'encode') {
      result = encodeToBase64(inputText, urlSafe);
    } else {
      result = decodeFromBase64(inputText, urlSafe);
    }

    setOutputText(result);

    // Add to history
    const newEntry: EncodingResult = {
      input: inputText,
      output: result,
      type: mode,
      timestamp: new Date()
    };
    setHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
  };

  // Handle file processing
  const processFile = async () => {
    if (!fileInput) return;

    try {
      const arrayBuffer = await fileInput.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binaryString = '';
      
      for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
      }

      const encoded = btoa(binaryString);
      setInputText(encoded);
      setOutputText(`File: ${fileInput.name} (${fileInput.size} bytes)`);
      setFileName(fileInput.name);
    } catch (error) {
      setOutputText("Error: Unable to process file");
    }
  };

  // Copy text to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // Clear all
  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setFileInput(null);
    setFileName("");
  };

  // Swap input/output
  const swapText = () => {
    setInputText(outputText);
    setOutputText(inputText);
  };

  // Validate Base64 string
  const isValidBase64 = (str: string) => {
    try {
      return btoa(atob(str)) === str;
    } catch {
      return false;
    }
  };

  // Auto-detect mode
  const autoDetectMode = () => {
    if (!inputText.trim()) return;
    
    // Check if input looks like Base64
    const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/;
    const isBase64 = base64Pattern.test(inputText) && inputText.length % 4 === 0;
    
    if (isBase64 && mode === 'encode') {
      setMode('decode');
    } else if (!isBase64 && mode === 'decode') {
      setMode('encode');
    }
  };

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileInput(file);
      setFileName(file.name);
      setInputText("");
      setOutputText("");
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <SEOHead
        title="Base64 Encoder/Decoder | ZapTools"
        description="Free online Base64 encoder and decoder. Convert text to Base64 and vice versa. Support for files, URL-safe encoding, and validation."
        keywords="base64 encoder, base64 decoder, base64 converter, text encoding, file encoding, url safe base64"
        url="https://zaptools.tech/tools/base64-encoder-decoder"
        contentType="tool"
        category="Web & Utility"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Base64 Encoder/Decoder</h1>
            <p className="text-xl text-gray-700 mb-6">Convert text and files to Base64 format and back</p>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <button
              type="button"
              className="flex items-center gap-2 font-bold text-blue-700 text-lg focus:outline-none mb-2"
              onClick={() => setShowInstructions(v => !v)}
              aria-expanded={showInstructions}
            >
              <span>🔧</span> How to Use
              <svg className={`w-5 h-5 transform transition-transform duration-200 ${showInstructions ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showInstructions && (
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-6 shadow-sm animate-fade-in">
                <ul className="list-disc list-inside text-sm text-blue-900 space-y-2">
                  <li><strong>Text Encoding:</strong> Enter text and convert to Base64 format</li>
                  <li><strong>Text Decoding:</strong> Paste Base64 string to decode back to text</li>
                  <li><strong>File Encoding:</strong> Upload files to convert to Base64</li>
                  <li><strong>URL Safe:</strong> Use URL-safe characters for web compatibility</li>
                  <li><strong>Auto-detect:</strong> Automatically detect if input is Base64</li>
                  <li><strong>History:</strong> View your recent encoding/decoding operations</li>
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              {/* Mode Selection */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mode</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setMode('encode')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${mode === 'encode' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <h3 className="font-bold text-gray-900">🔒 Encode</h3>
                    <p className="text-sm text-gray-600">Convert text to Base64</p>
                  </button>
                  <button
                    onClick={() => setMode('decode')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${mode === 'decode' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <h3 className="font-bold text-gray-900">🔓 Decode</h3>
                    <p className="text-sm text-gray-600">Convert Base64 to text</p>
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Options</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={urlSafe}
                      onChange={(e) => setUrlSafe(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">URL Safe Encoding</span>
                  </label>
                  <p className="text-xs text-gray-500">
                    Uses - and _ instead of + and / for web compatibility
                  </p>
                </div>
              </div>

              {/* File Upload */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">File Upload</h2>
                <div className="space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="*/*"
                  />
                  <button
                    onClick={triggerFileInput}
                    className="w-full px-6 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors duration-200"
                  >
                    📁 Choose File
                  </button>
                  {fileName && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">Selected: {fileName}</p>
                      <button
                        onClick={processFile}
                        className="mt-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Process File
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={processText}
                    className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors duration-200"
                  >
                    {mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}
                  </button>
                  <button
                    onClick={autoDetectMode}
                    className="w-full px-6 py-3 bg-gray-500 text-white font-bold rounded-xl hover:bg-gray-600 transition-colors duration-200"
                  >
                    🔍 Auto-detect
                  </button>
                  <button
                    onClick={swapText}
                    className="w-full px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors duration-200"
                  >
                    ↔️ Swap
                  </button>
                  <button
                    onClick={clearAll}
                    className="w-full px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors duration-200"
                  >
                    🗑️ Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Column - Input/Output */}
            <div className="lg:col-span-2 space-y-6">
              {/* Input */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {mode === 'encode' ? 'Input Text' : 'Base64 String'}
                </h2>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                  className="w-full h-48 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.ctrlKey && e.key === 'Enter') {
                      processText();
                    }
                  }}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">
                    {inputText.length} characters
                  </span>
                  {mode === 'decode' && inputText && (
                    <span className={`text-sm ${isValidBase64(inputText) ? 'text-green-600' : 'text-red-600'}`}>
                      {isValidBase64(inputText) ? '✓ Valid Base64' : '✗ Invalid Base64'}
                    </span>
                  )}
                </div>
              </div>

              {/* Output */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
                  </h2>
                  {outputText && (
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                    >
                      {copiedText === outputText ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  )}
                </div>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Output will appear here..."
                  className="w-full h-48 p-4 border border-gray-300 rounded-xl resize-none bg-gray-50"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">
                    {outputText.length} characters
                  </span>
                  {outputText && (
                    <span className="text-sm text-gray-500">
                      Size: {new Blob([outputText]).size} bytes
                    </span>
                  )}
                </div>
              </div>

              {/* History */}
              {history.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Operations</h2>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {history.map((entry, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-xs px-2 py-1 rounded ${entry.type === 'encode' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {entry.type === 'encode' ? '🔒 Encoded' : '🔓 Decoded'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {entry.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-gray-900 mb-1">Input:</p>
                          <p className="text-gray-600 font-mono text-xs truncate">{entry.input}</p>
                          <p className="font-medium text-gray-900 mb-1 mt-2">Output:</p>
                          <p className="text-gray-600 font-mono text-xs truncate">{entry.output}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 