import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
          <h1 className="text-4xl font-black text-gray-900 mb-6">Terms of Service</h1>
          <ul className="list-decimal pl-6 text-gray-600 mb-4 space-y-1">
            <li>Free Use: All tools are offered for free without guarantees.</li>
            <li>No Liability: We are not liable for any data loss or damages from tool usage.</li>
            <li>User Responsibility: You are responsible for the data you upload or generate.</li>
            <li>Ad Use: This website uses ads for monetization. Ad content is served by third parties.</li>
          </ul>
          <p className="text-gray-600">
            Use of ZapTools.tech means you agree to these terms.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
} 