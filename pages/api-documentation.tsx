import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function APIDocumentation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>API Documentation - ZapTools</title>
        <meta name="description" content="ZapTools API documentation - integrate our tools into your workflows with our powerful API (coming soon)." />
        <meta name="keywords" content="ZapTools API, text to handwriting API, PDF API, OCR API, developer tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 API Documentation</h1>
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
              Coming Soon
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              We're building a powerful API so developers and businesses can integrate ZapTools features directly into their workflows.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">🔧 Planned endpoints:</h2>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Text to handwriting conversion API
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  PDF merge/compress API
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  OCR (Image to Text) API
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Text formatting API
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-900 mb-4">Each API will include:</h2>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Secure token-based access
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  JSON input/output format
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Rate limits for fair usage
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Webhook support for async tasks
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-6">
              <h2 className="text-xl font-semibold text-purple-900 mb-2">📬 Want early access to our APIs?</h2>
              <a href="mailto:info@inventix-studio.online" className="text-purple-600 hover:text-purple-800 font-medium">
                Contact info@inventix-studio.online
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 