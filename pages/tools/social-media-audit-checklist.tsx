import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  platform: string;
  tip?: string;
  completed: boolean;
}

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const PLATFORMS: Platform[] = [
  { id: "instagram", name: "Instagram", icon: "📸", color: "from-pink-500 to-purple-600" },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "from-black to-gray-800" },
  { id: "twitter", name: "Twitter/X", icon: "🐦", color: "from-blue-400 to-blue-600" },
  { id: "facebook", name: "Facebook", icon: "📘", color: "from-blue-600 to-blue-800" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "from-blue-700 to-blue-900" },
  { id: "youtube", name: "YouTube", icon: "📺", color: "from-red-500 to-red-700" },
];

const AUDIT_CHECKLISTS: ChecklistItem[] = [
  // Profile Optimization
  { id: "profile_photo", text: "Profile photo is high-quality and professional", category: "Profile", platform: "all", tip: "Use a clear, well-lit photo that represents your brand", completed: false },
  { id: "bio_complete", text: "Bio/description is complete and compelling", category: "Profile", platform: "all", tip: "Include keywords, value proposition, and call-to-action", completed: false },
  { id: "link_bio", text: "Link in bio is working and relevant", category: "Profile", platform: "all", tip: "Update regularly and track clicks", completed: false },
  { id: "username_consistent", text: "Username is consistent across platforms", category: "Profile", platform: "all", tip: "Use the same handle when possible for brand recognition", completed: false },
  { id: "cover_photo", text: "Cover photo is optimized and on-brand", category: "Profile", platform: "all", tip: "Use high-resolution images that reflect your brand", completed: false },

  // Content Strategy
  { id: "content_calendar", text: "Have a content calendar and posting schedule", category: "Content", platform: "all", tip: "Plan content 2-4 weeks ahead", completed: false },
  { id: "content_mix", text: "Content mix includes various types (photos, videos, stories)", category: "Content", platform: "all", tip: "Mix educational, entertaining, and promotional content", completed: false },
  { id: "brand_voice", text: "Consistent brand voice and messaging", category: "Content", platform: "all", tip: "Define your tone and stick to it", completed: false },
  { id: "hashtag_strategy", text: "Using relevant hashtags strategically", category: "Content", platform: "all", tip: "Research trending and niche hashtags", completed: false },
  { id: "captions_engaging", text: "Captions are engaging and encourage interaction", category: "Content", platform: "all", tip: "Ask questions and include calls-to-action", completed: false },

  // Engagement
  { id: "respond_comments", text: "Responding to comments within 24 hours", category: "Engagement", platform: "all", tip: "Set aside time daily for community management", completed: false },
  { id: "like_follow", text: "Engaging with followers' content", category: "Engagement", platform: "all", tip: "Like, comment, and share relevant content", completed: false },
  { id: "dm_responses", text: "Responding to direct messages promptly", category: "Engagement", platform: "all", tip: "Use saved replies for common questions", completed: false },
  { id: "user_generated", text: "Sharing user-generated content", category: "Engagement", platform: "all", tip: "Encourage and showcase customer content", completed: false },
  { id: "collaborations", text: "Collaborating with other creators/brands", category: "Engagement", platform: "all", tip: "Build relationships with complementary accounts", completed: false },

  // Analytics & Performance
  { id: "track_metrics", text: "Regularly tracking key metrics", category: "Analytics", platform: "all", tip: "Monitor engagement rate, reach, and follower growth", completed: false },
  { id: "best_times", text: "Posting at optimal times for your audience", category: "Analytics", platform: "all", tip: "Use analytics to find when your audience is most active", completed: false },
  { id: "content_performance", text: "Analyzing which content performs best", category: "Analytics", platform: "all", tip: "Review top-performing posts and replicate success", completed: false },
  { id: "competitor_analysis", text: "Monitoring competitor activity", category: "Analytics", platform: "all", tip: "Learn from competitors' successful strategies", completed: false },
  { id: "roi_tracking", text: "Tracking ROI from social media efforts", category: "Analytics", platform: "all", tip: "Measure conversions and sales from social media", completed: false },

  // Platform-Specific
  // Instagram
  { id: "instagram_stories", text: "Using Instagram Stories daily", category: "Platform-Specific", platform: "instagram", tip: "Stories increase visibility and engagement", completed: false },
  { id: "instagram_reels", text: "Creating Instagram Reels regularly", category: "Platform-Specific", platform: "instagram", tip: "Reels get more reach than regular posts", completed: false },
  { id: "instagram_igtv", text: "Using IGTV for longer content", category: "Platform-Specific", platform: "instagram", tip: "Perfect for tutorials and detailed content", completed: false },
  { id: "instagram_highlights", text: "Organized Story Highlights", category: "Platform-Specific", platform: "instagram", tip: "Create themed highlights for easy navigation", completed: false },

  // TikTok
  { id: "tiktok_trending", text: "Following trending sounds and challenges", category: "Platform-Specific", platform: "tiktok", tip: "Stay current with viral trends", completed: false },
  { id: "tiktok_duets", text: "Creating duets and collaborations", category: "Platform-Specific", platform: "tiktok", tip: "Increase reach through collaborations", completed: false },
  { id: "tiktok_hashtags", text: "Using trending TikTok hashtags", category: "Platform-Specific", platform: "tiktok", tip: "Research trending hashtags in your niche", completed: false },
  { id: "tiktok_consistency", text: "Posting 1-3 times daily", category: "Platform-Specific", platform: "tiktok", tip: "Consistency is key for TikTok algorithm", completed: false },

  // Twitter
  { id: "twitter_threads", text: "Creating engaging Twitter threads", category: "Platform-Specific", platform: "twitter", tip: "Threads increase engagement and reach", completed: false },
  { id: "twitter_retweets", text: "Retweeting relevant content", category: "Platform-Specific", platform: "twitter", tip: "Build relationships through sharing", completed: false },
  { id: "twitter_polls", text: "Using Twitter polls for engagement", category: "Platform-Specific", platform: "twitter", tip: "Polls increase interaction and feedback", completed: false },
  { id: "twitter_spaces", text: "Participating in Twitter Spaces", category: "Platform-Specific", platform: "twitter", tip: "Join conversations in your industry", completed: false },

  // Facebook
  { id: "facebook_groups", text: "Active in relevant Facebook groups", category: "Platform-Specific", platform: "facebook", tip: "Groups are great for community building", completed: false },
  { id: "facebook_live", text: "Going live on Facebook regularly", category: "Platform-Specific", platform: "facebook", tip: "Live videos get more reach", completed: false },
  { id: "facebook_events", text: "Creating and promoting Facebook events", category: "Platform-Specific", platform: "facebook", tip: "Events help build community", completed: false },
  { id: "facebook_ads", text: "Using Facebook ads strategically", category: "Platform-Specific", platform: "facebook", tip: "Target your ideal audience", completed: false },

  // LinkedIn
  { id: "linkedin_articles", text: "Publishing LinkedIn articles", category: "Platform-Specific", platform: "linkedin", tip: "Articles establish thought leadership", completed: false },
  { id: "linkedin_networking", text: "Networking with industry professionals", category: "Platform-Specific", platform: "linkedin", tip: "Connect with people in your field", completed: false },
  { id: "linkedin_company", text: "Optimized company page", category: "Platform-Specific", platform: "linkedin", tip: "Complete all company page sections", completed: false },
  { id: "linkedin_endorsements", text: "Getting skill endorsements", category: "Platform-Specific", platform: "linkedin", tip: "Ask colleagues for endorsements", completed: false },

  // YouTube
  { id: "youtube_thumbnails", text: "Creating eye-catching thumbnails", category: "Platform-Specific", platform: "youtube", tip: "Thumbnails are crucial for click-through rates", completed: false },
  { id: "youtube_seo", text: "Optimizing video titles and descriptions", category: "Platform-Specific", platform: "youtube", tip: "Use relevant keywords for better discoverability", completed: false },
  { id: "youtube_playlists", text: "Organizing content into playlists", category: "Platform-Specific", platform: "youtube", tip: "Playlists increase watch time", completed: false },
  { id: "youtube_community", text: "Using YouTube Community tab", category: "Platform-Specific", platform: "youtube", tip: "Engage with subscribers through community posts", completed: false },
];

const STORAGE_KEY = "zaptools_audit_checklist";

export default function SocialMediaAuditChecklist() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [checklist, setChecklist] = useState<ChecklistItem[]>(AUDIT_CHECKLISTS);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTips, setShowTips] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChecklist(parsed);
      } catch (e) {
        console.error('Failed to load saved checklist:', e);
      }
    }
  }, []);

  const saveChecklist = (updatedChecklist: ChecklistItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChecklist));
  };

  const toggleItem = (id: string) => {
    const updated = checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    saveChecklist(updated);
  };

  const resetChecklist = () => {
    const reset = checklist.map(item => ({ ...item, completed: false }));
    setChecklist(reset);
    saveChecklist(reset);
  };

  const exportResults = () => {
    const completed = checklist.filter(item => item.completed);
    const incomplete = checklist.filter(item => !item.completed);
    
    const report = `Social Media Audit Report - ${new Date().toLocaleDateString()}

COMPLETED ITEMS (${completed.length}/${checklist.length}):
${completed.map(item => `✅ ${item.text}`).join('\n')}

INCOMPLETE ITEMS (${incomplete.length}):
${incomplete.map(item => `❌ ${item.text}`).join('\n')}

PROGRESS: ${Math.round((completed.length / checklist.length) * 100)}% complete

Generated by ZapTools Social Media Audit Checklist`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `social-media-audit-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredChecklist = checklist.filter(item => 
    selectedPlatform === "all" || item.platform === "all" || item.platform === selectedPlatform
  );

  const completedCount = filteredChecklist.filter(item => item.completed).length;
  const totalCount = filteredChecklist.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const categories = [...new Set(filteredChecklist.map(item => item.category))];

  return (
    <>
      <SEOHead
        title="Social Media Audit Checklist | ZapTools"
        description="Interactive checklist for optimizing your social media profiles and posts for growth. Free online audit tool by ZapTools."
        keywords="social media audit, audit checklist, instagram audit, tiktok audit, twitter audit, facebook audit"
        url="https://zaptools.tech/tools/social-media-audit-checklist"
        contentType="tool"
        category="Social Media"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Social Media Audit Checklist</h1>
            <p className="text-xl text-gray-700 mb-6">Optimize your social media presence for maximum growth and engagement</p>
            
            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Progress: {completedCount}/{totalCount} items</span>
                <span className="text-sm font-bold text-blue-600">{progressPercentage}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Platform Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {PLATFORMS.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-200 border-2 ${selectedPlatform === platform.id ? `bg-gradient-to-r ${platform.color} text-white border-transparent shadow-lg` : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                >
                  <span className="text-lg">{platform.icon}</span>
                  {platform.name}
                </button>
              ))}
              <button
                onClick={() => setSelectedPlatform("all")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-200 border-2 ${selectedPlatform === "all" ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white border-transparent shadow-lg' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
              >
                <span className="text-lg">🌐</span>
                All Platforms
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={resetChecklist}
                className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors duration-200"
              >
                🔄 Reset All
              </button>
              <button
                onClick={exportResults}
                className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors duration-200"
              >
                📊 Export Report
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <button
              type="button"
              className="flex items-center gap-2 font-bold text-blue-700 text-lg focus:outline-none mb-2"
              onClick={() => setShowInstructions(v => !v)}
              aria-expanded={showInstructions}
            >
              <span>ℹ️</span> How to Use This Audit
              <svg className={`w-5 h-5 transform transition-transform duration-200 ${showInstructions ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showInstructions && (
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-6 shadow-sm animate-fade-in">
                <ul className="list-disc list-inside text-sm text-blue-900 space-y-2">
                  <li><strong>Select a platform</strong> to focus on specific items, or choose "All Platforms" for a complete audit</li>
                  <li><strong>Check off items</strong> as you complete them - your progress is automatically saved</li>
                  <li><strong>Hover over items</strong> to see helpful tips and recommendations</li>
                  <li><strong>Export your report</strong> to share with your team or track progress over time</li>
                  <li><strong>Reset the checklist</strong> to start fresh or conduct regular audits</li>
                </ul>
              </div>
            )}
          </div>

          {/* Checklist by Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map(category => {
              const categoryItems = filteredChecklist.filter(item => item.category === category);
              const completedInCategory = categoryItems.filter(item => item.completed).length;
              const categoryProgress = categoryItems.length > 0 ? Math.round((completedInCategory / categoryItems.length) * 100) : 0;

              return (
                <div key={category} className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                    <span className="text-sm font-semibold text-blue-600">{completedInCategory}/{categoryItems.length}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${categoryProgress}%` }}
                    ></div>
                  </div>

                  <div className="space-y-3">
                    {categoryItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-xl border-2 transition-all duration-200 hover:bg-gray-50"
                        onMouseEnter={() => setShowTips(item.id)}
                        onMouseLeave={() => setShowTips(null)}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleItem(item.id)}
                          className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label className={`text-sm font-medium cursor-pointer ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                            {item.text}
                          </label>
                          {showTips === item.id && item.tip && (
                            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-xs text-yellow-800">💡 {item.tip}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 border border-gray-100 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Audit Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">{completedCount}</div>
                <div className="text-sm text-green-700">Completed Items</div>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <div className="text-3xl font-bold text-red-600 mb-2">{totalCount - completedCount}</div>
                <div className="text-sm text-red-700">Remaining Items</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">{progressPercentage}%</div>
                <div className="text-sm text-blue-700">Overall Progress</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Complete this audit regularly to keep your social media strategy optimized and up-to-date!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 