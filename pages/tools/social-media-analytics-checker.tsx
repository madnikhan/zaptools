import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

export default function SocialMediaAnalyticsChecker() {
  return (
    <>
      <SEOHead 
        title="Social Media Analytics Checker | ZapTools"
        description="Check engagement rates, follower growth, and best posting times for Instagram, TikTok, Twitter, and Facebook. Free analytics tool by ZapTools."
        keywords="social media analytics, engagement checker, instagram analytics, tiktok analytics, twitter analytics, facebook analytics"
        url="https://zaptools.tech/tools/social-media-analytics-checker"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 max-w-xl w-full text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-6">Social Media Analytics Checker</h1>
          <p className="text-lg text-gray-700 mb-8">Check your social media analytics and engagement. Coming soon!</p>
        </div>
      </main>
      <Footer />
    </>
  );
} 