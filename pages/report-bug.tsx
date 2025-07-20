import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ReportBug() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Report a Bug - ZapTools</title>
        <meta name="description" content="Report bugs and issues with ZapTools. Help us improve our online tools by reporting any problems you encounter." />
        <meta name="keywords" content="bug report online tool, ZapTools error, report tool not working, file tool issue" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 Report a Bug</h1>
            <p className="text-lg text-gray-600">Found a glitch? Let's squash it together.</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              If something isn't working as expected on ZapTools.tech, please let us know immediately.
            </p>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
              <h2 className="text-xl font-semibold text-red-900 mb-4">How to report a bug:</h2>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Tool name
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Description of what went wrong
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Screenshot or screen recording (if possible)
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Browser/device you're using
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">📩 Email:</h2>
              <a href="mailto:info@inventix-studio.online" className="text-blue-600 hover:text-blue-800 font-medium">
                info@inventix-studio.online
              </a>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6">
              <p className="text-green-800">
                We typically resolve bugs within <strong>24–72 hours</strong>. Your feedback helps us improve for everyone.
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Keywords:</strong> bug report online tool, ZapTools error, report tool not working, file tool issue
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 