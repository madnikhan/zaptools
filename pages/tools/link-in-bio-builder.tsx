import { useState } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

export default function LinkInBioBuilder() {
  const [profileName, setProfileName] = useState("Your Name");
  const [profileBio, setProfileBio] = useState("Digital creator & content enthusiast");
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <SEOHead
        title="Link in Bio Page Builder | ZapTools"
        description="Create a simple, customizable link in bio landing page for Instagram, TikTok, and more. Free and easy to use."
        keywords="link in bio, link in bio builder, instagram link in bio, tiktok link in bio, social media landing page"
        url="https://zaptools.tech/tools/link-in-bio-builder"
        contentType="tool"
        category="Social Media"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Link in Bio Page Builder</h1>
            <p className="text-xl text-gray-700 mb-6">Create your own link in bio landing page</p>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <button
              type="button"
              className="flex items-center gap-2 font-bold text-blue-700 text-lg focus:outline-none mb-2"
              onClick={() => setShowInstructions(v => !v)}
              aria-expanded={showInstructions}
            >
              <span>ℹ️</span> How to Use
              <svg className={`w-5 h-5 transform transition-transform duration-200 ${showInstructions ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showInstructions && (
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-6 shadow-sm animate-fade-in">
                <ul className="list-disc list-inside text-sm text-blue-900 space-y-2">
                  <li><strong>Customize your profile</strong> with name, bio, and profile picture</li>
                  <li><strong>Add your links</strong> to social media, websites, and more</li>
                  <li><strong>Choose a theme</strong> that matches your brand</li>
                  <li><strong>Preview your page</strong> in real-time</li>
                  <li><strong>Export as HTML</strong> to host on your own domain</li>
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Builder */}
            <div className="space-y-6">
              {/* Profile Settings */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Links Management */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Links</h2>
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-4">🔗</div>
                  <p>Link management coming soon!</p>
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Export</h2>
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-4">📥</div>
                  <p>Export options coming soon!</p>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Live Preview</h2>
                <div className="border rounded-xl p-6 mx-auto max-w-sm">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">{profileName}</h1>
                    <p className="text-gray-600">{profileBio}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-full px-4 py-3 text-center font-semibold bg-blue-500 text-white rounded-xl">
                      📷 Instagram
                    </div>
                    <div className="w-full px-4 py-3 text-center font-semibold bg-red-500 text-white rounded-xl">
                      📺 YouTube
                    </div>
                    <div className="w-full px-4 py-3 text-center font-semibold bg-gray-500 text-white rounded-xl">
                      🌐 Website
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 