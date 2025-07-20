import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

export default function SocialMediaPostScheduler() {
  return (
    <>
      <SEOHead 
        title="Social Media Post Scheduler | ZapTools"
        description="Draft and schedule posts for Instagram, TikTok, Twitter, and Facebook. Plan your content calendar with ZapTools' free social media post scheduler."
        keywords="social media scheduler, post scheduler, instagram scheduler, tiktok scheduler, twitter scheduler, facebook scheduler"
        url="https://zaptools.tech/tools/social-media-post-scheduler"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 max-w-xl w-full text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-6">Social Media Post Scheduler</h1>
          <p className="text-lg text-gray-700 mb-8">Draft and schedule posts for your favorite platforms. Coming soon!</p>
        </div>
      </main>
      <Footer />
    </>
  );
} 