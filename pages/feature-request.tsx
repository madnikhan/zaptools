import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FeatureRequest() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Feature Request - ZapTools</title>
        <meta name="description" content="Suggest new features and tools for ZapTools. We love building tools that solve real problems - share your ideas with us!" />
        <meta name="keywords" content="request new online tool, suggest website features, tool idea submission" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 Feature Request</h1>
            <p className="text-lg text-gray-600">Got an idea? We're all ears.</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              We love building tools that solve real problems. If there's a feature or tool you'd love to see on ZapTools.tech, let us know!
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8">
              <h2 className="text-xl font-semibold text-purple-900 mb-4">🧠 Examples of great feature requests:</h2>
              <ul className="space-y-2 text-purple-800">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  New tool ideas (e.g., text summarizer, bulk file rename)
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Customization options (e.g., font styles, dark mode)
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Accessibility improvements
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  Advanced export settings
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">📤 Suggest here:</h2>
              <a href="mailto:info@inventix-studio.online" className="text-blue-600 hover:text-blue-800 font-medium">
                info@inventix-studio.online
              </a>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6">
              <p className="text-green-800">
                Your idea could be the next viral tool on ZapTools!
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Keywords:</strong> request new online tool, suggest website features, tool idea submission
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 