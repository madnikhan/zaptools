import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { useState } from 'react';

export default function Contact() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ZapTools",
    "description": "Get in touch with the ZapTools team for support, feedback, or business inquiries.",
    "url": "https://zaptools.tech/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "ZapTools",
      "parentOrganization": {
        "@type": "Organization",
        "name": "InventiveByte LLC",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1001 S. Main St. STE 600",
          "addressLocality": "Kalispell",
          "addressRegion": "MT",
          "postalCode": "59901",
          "addressCountry": "US"
        }
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "info@inventix-studio.online",
          "availableLanguage": "English"
        },
        {
          "@type": "ContactPoint",
          "contactType": "business",
          "email": "info@inventix-studio.online",
          "availableLanguage": "English"
        }
      ]
    }
  };

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess('Your message has been sent!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to send message.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead 
        title="Contact Us"
        description="Get in touch with the ZapTools team. We're here to help with support, feedback, business inquiries, and feature requests."
        keywords="contact zaptools, support, feedback, business inquiry, customer service, inventivebyte llc"
        url="https://zaptools.tech/contact"
        structuredData={structuredData}
      />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you! Get in touch for support, feedback, or business inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                {/* Email Support */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Support</h3>
                    <p className="text-gray-600 mb-2">For all support, business, and general inquiries</p>
                    <a href="mailto:info@inventix-studio.online" className="text-blue-600 hover:text-blue-700 font-medium">
                      info@inventix-studio.online
                    </a>
                  </div>
                </div>

                {/* Company Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Company Address</h3>
                    <p className="text-gray-600 mb-2">InventiveByte LLC (Parent Company)</p>
                    <address className="text-gray-600 not-italic">
                      1001 S. Main St. STE 600<br />
                      Kalispell, MT 59901<br />
                      USA
                    </address>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Response Time</h3>
                    <p className="text-gray-600">
                      We typically respond within 24 hours during business days. For urgent technical issues, please include "URGENT" in your subject line.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select a subject</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="business">Business Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={handleChange}
                    disabled={loading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                {success && <div className="text-green-600 mt-2 text-sm">{success}</div>}
                {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is a demo form. For immediate assistance, please email us directly at{' '}
                  <a href="mailto:info@inventix-studio.online" className="underline font-medium">
                    info@inventix-studio.online
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Other Ways to Connect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="/help-center" className="block p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors text-center">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Help Center</h3>
                <p className="text-gray-600 text-sm">Find answers to common questions and tutorials</p>
              </a>
              <a href="/faq" className="block p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors text-center">
                <div className="text-3xl mb-3">❓</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">FAQ</h3>
                <p className="text-gray-600 text-sm">Frequently asked questions and quick answers</p>
              </a>
              <a href="/feature-request" className="block p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors text-center">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature Request</h3>
                <p className="text-gray-600 text-sm">Suggest new tools or features you'd like to see</p>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
} 