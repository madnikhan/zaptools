import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import SocialShare from "../../components/SocialShare";

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
      alert('Please select at least one character type!');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Password Generator",
    "url": "https://zaptools.tech/tools/password-generator",
    "description": "Generate strong, secure passwords with customizable options. Free online password generator tool.",
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
        title="Password Generator - Free Online Tool"
        description="Generate strong, secure passwords with customizable options. Choose length, character types, and copy instantly. Free online password generator tool."
        keywords="password generator, secure password, random password, strong password, password creator, online password tool"
        url="https://zaptools.tech/tools/password-generator"
        contentType="tool"
        category="Security"
      />
      
      <Header />
      
      <div className={`min-h-screen py-20 px-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl">
              <span className="text-white text-3xl">🔐</span>
            </div>
            <h1 className="text-5xl font-black text-center mb-6">
              <span className="text-blue-700">Password</span> <span className="text-blue-600">Generator</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Generate strong, secure passwords instantly. Customize length and character types.
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
                {/* Password Display */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Generated Password
                  </label>
                  <div className="bg-gray-100 rounded-2xl p-4 border-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={password}
                        readOnly
                        className="flex-1 bg-transparent text-lg font-mono outline-none text-gray-900"
                        placeholder="Your password will appear here..."
                      />
                      <button
                        onClick={copyToClipboard}
                        className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Length */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Password Length: {length}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>4</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Character Types */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Character Types
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-700">
                      <input
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      Include Uppercase Letters (A-Z)
                    </label>
                    <label className="flex items-center text-gray-700">
                      <input
                        type="checkbox"
                        checked={includeLowercase}
                        onChange={(e) => setIncludeLowercase(e.target.checked)}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      Include Lowercase Letters (a-z)
                    </label>
                    <label className="flex items-center text-gray-700">
                      <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      Include Numbers (0-9)
                    </label>
                    <label className="flex items-center text-gray-700">
                      <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      Include Symbols (!@#$%^&*)
                    </label>
                  </div>
                </div>

                {/* Generate Button */}
                <div>
                  <button
                    onClick={generatePassword}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Generate New Password
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength & Info */}
            <div className="space-y-6">
              {/* Password Strength */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  🛡️ Password Strength
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Length:</span>
                    <span className="font-bold text-lg text-gray-900">{length} characters</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Character types:</span>
                    <span className="font-bold text-lg text-gray-900">
                      {[includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length}/4
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Possible combinations:</span>
                    <span className="font-bold text-lg text-gray-900">
                      {(() => {
                        let chars = 0;
                        if (includeUppercase) chars += 26;
                        if (includeLowercase) chars += 26;
                        if (includeNumbers) chars += 10;
                        if (includeSymbols) chars += 32;
                        return Math.pow(chars, length).toExponential(2);
                      })()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Tips */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  🔒 Security Tips
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use at least 12 characters for better security</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Include a mix of uppercase, lowercase, numbers, and symbols</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Never reuse passwords across different accounts</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Consider using a password manager for better security</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Change passwords regularly, especially for important accounts</span>
                  </div>
                </div>
              </div>

              {/* Password Examples */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  💡 Password Examples
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="font-mono text-gray-900">Kj9#mN2$pL5@</div>
                    <div className="text-gray-500 mt-1">Strong (12 chars, all types)</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="font-mono text-gray-900">MyP@ssw0rd!</div>
                    <div className="text-gray-500 mt-1">Medium (11 chars, mixed)</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="font-mono text-gray-900">password123</div>
                    <div className="text-gray-500 mt-1">Weak (common pattern)</div>
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
                    <span>Adjust the password length using the slider (4-50 characters)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Select which character types to include in your password</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Click "Generate New Password" to create a new password</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Use the "Copy" button to copy the password to your clipboard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
                    <span>Check the strength indicator and security tips for guidance</span>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Pro Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use longer passwords (16+ characters) for maximum security</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Enable all character types for stronger passwords</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Generate multiple passwords and choose the strongest one</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Store passwords securely in a password manager</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use different passwords for each account</span>
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
                  <span className="text-white text-2xl">🔐</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Secure Generation</h3>
                <p className="text-sm text-gray-600">
                  Generate cryptographically secure passwords using browser's random number generator
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚙️</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Customizable Options</h3>
                <p className="text-sm text-gray-600">
                  Choose password length and character types to meet your specific requirements
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Strength Analysis</h3>
                <p className="text-sm text-gray-600">
                  Get detailed analysis of password strength and possible combinations
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📋</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">One-Click Copy</h3>
                <p className="text-sm text-gray-600">
                  Copy passwords instantly to clipboard with a single click
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔒</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Security Tips</h3>
                <p className="text-sm text-gray-600">
                  Get expert advice on creating and managing secure passwords
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Mobile Friendly</h3>
                <p className="text-sm text-gray-600">
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
    </>
  );
}
