import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { useState } from "react";

export default function ForexAIBot() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'forex-waitlist' }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setEmail('');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to join waitlist.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Forex AI Bot - Advanced Trading Signals",
    "description": "AI-powered forex trading signals using advanced technology, fundamental analysis, technical analysis, and deep reasoning LLM for maximum earnings.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Coming Soon - Join Waitlist"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "500"
    }
  };

  return (
    <>
      <SEOHead 
        title="Forex AI Bot – Advanced Trading Signals & Market Analysis | ZapTools"
        description="Join the waitlist for ZapTools' Forex AI Bot. Get AI-powered forex trading signals, real-time analysis, and 15–25% expected monthly ROI. Early access, 50% off!"
        keywords="forex ai bot, trading signals, ai trading, forex signals, automated trading, technical analysis, fundamental analysis, deep learning trading, forex robot, trading bot"
        url="https://zaptools.tech/forex-ai-bot"
        image="https://zaptools.tech/og-image.png"
        structuredData={structuredData}
      />
      
      <Header />
      
      {/* Hero Section with Animated Background */}
      <div className="relative min-h-screen overflow-hidden hero-section pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
          <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            {/* Animated AI Bot Icon */}
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mb-8 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse">
              <span className="text-white text-6xl">🤖</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-7xl md:text-8xl font-black mb-8 text-gray-900 leading-tight">
              Revolutionary
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 animate-gradient">
                Forex AI Bot
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Advanced AI Technology + Fundamental Analysis + Technical Analysis + Deep Reasoning LLM
              <span className="block text-orange-600 font-semibold mt-2">For Maximum Earnings Strategy</span>
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-semibold">AI-Powered Signals</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-semibold">Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-semibold">15-25% Monthly ROI</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                🚀 Join Waitlist - Get 50% Off
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <a 
                href="#features" 
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-orange-500 text-orange-600 font-bold text-xl rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Learn More
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">AI Technology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge AI system combines multiple analysis methods for the most accurate trading signals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* AI Technology */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-blue-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-2xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Advanced AI</h3>
                <p className="text-gray-600 leading-relaxed">
                  Deep learning models for pattern recognition, predictive analytics, and market sentiment analysis
                </p>
              </div>
            </div>

            {/* Technical Analysis */}
            <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-green-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">Technical Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  RSI, MACD, Bollinger Bands, Fibonacci retracements, and advanced chart pattern recognition
                </p>
              </div>
            </div>

            {/* Fundamental Analysis */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-purple-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-2xl">📈</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Fundamental Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Economic indicators, news sentiment, central bank policies, and geopolitical event analysis
                </p>
              </div>
            </div>

            {/* Deep Reasoning LLM */}
            <div className="group relative bg-gradient-to-br from-pink-50 to-red-100 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-pink-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-2xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">Deep Reasoning LLM</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced language models for market interpretation, risk assessment, and strategic decision making
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Expected <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Performance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI system is designed to deliver consistent, profitable trading signals with managed risk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Monthly ROI */}
            <div className="group relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-3xl">💰</span>
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-2">15-25%</h3>
                <p className="text-xl text-gray-600 font-semibold">Monthly ROI</p>
                <p className="text-gray-500 mt-4">
                  Expected returns based on historical backtesting and market analysis
                </p>
              </div>
            </div>

            {/* Signal Accuracy */}
            <div className="group relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-3xl">🎯</span>
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-2">85%+</h3>
                <p className="text-xl text-gray-600 font-semibold">Signal Accuracy</p>
                <p className="text-gray-500 mt-4">
                  High-precision trading signals with advanced risk management
                </p>
              </div>
            </div>

            {/* Risk Management */}
            <div className="group relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-3xl">🛡️</span>
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-2">&lt;5%</h3>
                <p className="text-xl text-gray-600 font-semibold">Max Drawdown</p>
                <p className="text-gray-500 mt-4">
                  Conservative risk management with automatic stop-loss protection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="relative py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">Waitlist</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be among the first to access our revolutionary Forex AI Bot. Early subscribers get 50% off lifetime access!
            </p>
          </div>

          <div className="group relative bg-gradient-to-br from-yellow-50 to-orange-100 rounded-3xl shadow-xl p-12 hover:shadow-2xl transition-all duration-500 border border-yellow-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label htmlFor="email" className="block text-lg font-semibold text-gray-900 mb-4">
                      Enter your email to join the waitlist
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Joining...' : '🚀 Join Waitlist'}
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-600 mt-4 text-center">{error}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 font-medium">50% off lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 font-medium">Early access to features</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 font-medium">Priority support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 font-medium">Exclusive trading insights</span>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-3xl">✓</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Waitlist!</h3>
                  <p className="text-xl text-gray-600">
                    You've been added to our exclusive waitlist. We'll notify you as soon as the Forex AI Bot is ready!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 