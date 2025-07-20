import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CookiePolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
          <h1 className="text-4xl font-black text-gray-900 mb-6">Cookie Policy</h1>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Improve your browsing experience</li>
            <li>Understand how users interact with our tools</li>
            <li>Display relevant Google AdSense ads</li>
          </ul>
          <p className="text-gray-600 mb-4">
            You can clear or block cookies using your browser settings. Continued use of this site means you accept our cookie usage.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
} 