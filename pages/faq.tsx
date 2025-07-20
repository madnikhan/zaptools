import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FAQ - Frequently Asked Questions - ZapTools</title>
        <meta name="description" content="Find answers to frequently asked questions about ZapTools - free online tools, privacy, mobile support, and more." />
        <meta name="keywords" content="ZapTools FAQs, free tool support, mobile-friendly tools, data privacy online tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 FAQ – Frequently Asked Questions</h1>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q1: Are ZapTools completely free to use?</h3>
              <p className="text-green-600 font-medium">✅ Yes, all our tools are 100% free to use with no sign-up required.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q2: Do you store the data I upload?</h3>
              <p className="text-blue-600 font-medium">🔒 No. Most of our tools run in-browser and we do not store your input or files.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q3: Can I use ZapTools on mobile devices?</h3>
              <p className="text-purple-600 font-medium">📱 Yes, our website is fully responsive and optimized for smartphones and tablets.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q4: How do you make money?</h3>
              <p className="text-yellow-600 font-medium">💰 We monetize through non-intrusive ads using Google AdSense.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q5: Will you add more tools in the future?</h3>
              <p className="text-red-600 font-medium">🚀 Absolutely. We constantly add new features based on community feedback.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q6: Can I request a custom tool or feature?</h3>
              <p className="text-gray-700">
                Yes — <a href="/feature-request" className="text-blue-600 hover:text-blue-800 underline">Submit a Feature Request</a>
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Keywords:</strong> ZapTools FAQs, free tool support, mobile-friendly tools, data privacy online tools
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 