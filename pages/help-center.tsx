import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Help Center - ZapTools</title>
        <meta name="description" content="Get help with ZapTools - your all-in-one guide to using our free online tools effectively." />
        <meta name="keywords" content="how to use ZapTools, online tool help, file converter help, text-to-handwriting support" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📄 Help Center</h1>
            <p className="text-lg text-gray-600">Your all-in-one guide to getting the most out of our free online tools</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Whether you're converting files, generating handwritten text, compressing images, or using advanced utilities, 
              this Help Center is here to support you.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Get help with:</h2>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Understanding how each tool works
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Troubleshooting common issues
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Accessing tool tutorials
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Reporting bugs or requesting features
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-6">
              <p className="text-green-800">
                <strong>Still need help?</strong> Contact Support — we're happy to assist you.
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Keywords:</strong> how to use ZapTools, online tool help, file converter help, text-to-handwriting support
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 