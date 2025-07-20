import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
          <h1 className="text-4xl font-black text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-700 mb-4">Your privacy matters.</p>
          <p className="text-gray-600 mb-4">
            ZapTools.tech does not collect personally identifiable information unless you choose to contact us directly. Our tools are designed to process data in-browser whenever possible, so your information stays with you.
          </p>
          <p className="text-gray-600 mb-4">
            We use Google Analytics and Google AdSense to understand traffic and display relevant ads. These platforms may collect anonymized browsing data via cookies.
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>How Google uses data from sites like ours</li>
          </ul>
          <p className="text-gray-600">
            By using ZapTools.tech, you consent to our use of cookies and analytics.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
} 