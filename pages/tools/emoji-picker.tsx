import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

// Emoji data (sample, can be expanded)
const EMOJI_CATEGORIES = [
  { key: "smileys", label: "Smileys", icon: "😃" },
  { key: "people", label: "People", icon: "🧑" },
  { key: "animals", label: "Animals", icon: "🐶" },
  { key: "food", label: "Food", icon: "🍕" },
  { key: "activities", label: "Activities", icon: "⚽" },
  { key: "travel", label: "Travel", icon: "✈️" },
  { key: "objects", label: "Objects", icon: "💡" },
  { key: "symbols", label: "Symbols", icon: "❤️" },
  { key: "flags", label: "Flags", icon: "🏳️" },
];

const EMOJIS: Record<string, { emoji: string; name: string }[]> = {
  smileys: [
    { emoji: "😀", name: "Grinning Face" },
    { emoji: "😂", name: "Face with Tears of Joy" },
    { emoji: "😍", name: "Smiling Face with Heart-Eyes" },
    { emoji: "😎", name: "Smiling Face with Sunglasses" },
    { emoji: "🥰", name: "Smiling Face with Hearts" },
    { emoji: "😢", name: "Crying Face" },
    { emoji: "😡", name: "Pouting Face" },
    { emoji: "😱", name: "Face Screaming in Fear" },
    { emoji: "🤔", name: "Thinking Face" },
    { emoji: "😴", name: "Sleeping Face" },
  ],
  people: [
    { emoji: "🧑", name: "Person" },
    { emoji: "👩", name: "Woman" },
    { emoji: "👨", name: "Man" },
    { emoji: "👶", name: "Baby" },
    { emoji: "🧓", name: "Older Person" },
    { emoji: "👮", name: "Police Officer" },
    { emoji: "🧑‍🎓", name: "Student" },
    { emoji: "🧑‍💻", name: "Technologist" },
    { emoji: "🧑‍🍳", name: "Cook" },
    { emoji: "🧑‍🚀", name: "Astronaut" },
  ],
  animals: [
    { emoji: "🐶", name: "Dog" },
    { emoji: "🐱", name: "Cat" },
    { emoji: "🦁", name: "Lion" },
    { emoji: "🐮", name: "Cow" },
    { emoji: "🐸", name: "Frog" },
    { emoji: "🐵", name: "Monkey" },
    { emoji: "🐔", name: "Chicken" },
    { emoji: "🐧", name: "Penguin" },
    { emoji: "🐢", name: "Turtle" },
    { emoji: "🐬", name: "Dolphin" },
  ],
  food: [
    { emoji: "🍎", name: "Apple" },
    { emoji: "🍕", name: "Pizza" },
    { emoji: "🍔", name: "Burger" },
    { emoji: "🍟", name: "Fries" },
    { emoji: "🍣", name: "Sushi" },
    { emoji: "🍩", name: "Doughnut" },
    { emoji: "🍦", name: "Ice Cream" },
    { emoji: "🍉", name: "Watermelon" },
    { emoji: "🍌", name: "Banana" },
    { emoji: "🥑", name: "Avocado" },
  ],
  activities: [
    { emoji: "⚽", name: "Soccer Ball" },
    { emoji: "🏀", name: "Basketball" },
    { emoji: "🏈", name: "Football" },
    { emoji: "🎾", name: "Tennis" },
    { emoji: "🏓", name: "Ping Pong" },
    { emoji: "🏸", name: "Badminton" },
    { emoji: "🥊", name: "Boxing Glove" },
    { emoji: "🏆", name: "Trophy" },
    { emoji: "🎮", name: "Video Game" },
    { emoji: "🎲", name: "Game Die" },
  ],
  travel: [
    { emoji: "✈️", name: "Airplane" },
    { emoji: "🚗", name: "Car" },
    { emoji: "🚕", name: "Taxi" },
    { emoji: "🚎", name: "Bus" },
    { emoji: "🚢", name: "Ship" },
    { emoji: "🚀", name: "Rocket" },
    { emoji: "🚲", name: "Bicycle" },
    { emoji: "🏍️", name: "Motorcycle" },
    { emoji: "🚉", name: "Train" },
    { emoji: "🗽", name: "Statue of Liberty" },
  ],
  objects: [
    { emoji: "💡", name: "Light Bulb" },
    { emoji: "📱", name: "Mobile Phone" },
    { emoji: "💻", name: "Laptop" },
    { emoji: "⌚", name: "Watch" },
    { emoji: "📷", name: "Camera" },
    { emoji: "🎧", name: "Headphone" },
    { emoji: "🔑", name: "Key" },
    { emoji: "🔒", name: "Lock" },
    { emoji: "🖊️", name: "Pen" },
    { emoji: "📚", name: "Books" },
  ],
  symbols: [
    { emoji: "❤️", name: "Red Heart" },
    { emoji: "✨", name: "Sparkles" },
    { emoji: "🔥", name: "Fire" },
    { emoji: "⭐", name: "Star" },
    { emoji: "💯", name: "Hundred Points" },
    { emoji: "✅", name: "Check Mark" },
    { emoji: "❌", name: "Cross Mark" },
    { emoji: "⚠️", name: "Warning" },
    { emoji: "🔔", name: "Bell" },
    { emoji: "🎉", name: "Party Popper" },
  ],
  flags: [
    { emoji: "🏳️", name: "White Flag" },
    { emoji: "🏴", name: "Black Flag" },
    { emoji: "🏁", name: "Chequered Flag" },
    { emoji: "🇺🇸", name: "United States" },
    { emoji: "🇬🇧", name: "United Kingdom" },
    { emoji: "🇨🇦", name: "Canada" },
    { emoji: "🇦🇺", name: "Australia" },
    { emoji: "🇮🇳", name: "India" },
    { emoji: "🇵🇰", name: "Pakistan" },
    { emoji: "🇯🇵", name: "Japan" },
  ],
};

const RECENT_KEY = "zaptools_emoji_recent";

export default function EmojiPicker() {
  const [category, setCategory] = useState("smileys");
  const [search, setSearch] = useState("");
  const [recent, setRecent] = useState<{ emoji: string; name: string }[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) {
      setRecent(JSON.parse(stored));
    }
  }, []);

  const handleCopy = (emoji: string, name: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(null), 1200);
    // Save to recent
    setRecent((prev) => {
      const updated = [{ emoji, name }, ...prev.filter(e => e.emoji !== emoji)].slice(0, 16);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Filter emojis by search
  const filteredEmojis = search
    ? Object.values(EMOJIS).flat().filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.emoji.includes(search)
      )
    : EMOJIS[category];

  return (
    <>
      <SEOHead
        title="Emoji & Symbol Picker for Social Media | ZapTools"
        description="Copy and paste emojis and special symbols for your social media posts. Free online emoji picker by ZapTools."
        keywords="emoji picker, symbol picker, copy emoji, social media emoji, instagram emoji, tiktok emoji, twitter emoji, facebook emoji"
        url="https://zaptools.tech/tools/emoji-picker"
        contentType="tool"
        category="Social Media"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 max-w-2xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2 text-center">Emoji & Symbol Picker</h1>
          <p className="text-lg text-gray-700 mb-6 text-center">Copy and paste emojis and symbols for your posts. Search, browse, and tap to copy!</p>

          {/* Search Bar */}
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search emoji (e.g. heart, smile, flag)"
            className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-semibold bg-gray-50"
            aria-label="Search emoji"
          />

          {/* Category Tabs */}
          <div className="mb-4 flex flex-wrap justify-center gap-2 w-full">
            {EMOJI_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => { setCategory(cat.key); setSearch(""); }}
                className={`px-3 py-1 rounded-xl text-xl font-bold transition-all duration-200 border-2 ${category === cat.key ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'}`}
                aria-pressed={category === cat.key}
                title={cat.label}
              >
                <span className="mr-1">{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>

          {/* Recently Used */}
          {recent.length > 0 && (
            <div className="mb-6 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold text-xs">Recently Used</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {recent.map(e => (
                  <button
                    key={e.emoji}
                    onClick={() => handleCopy(e.emoji, e.name)}
                    className={`px-3 py-2 rounded-xl text-2xl font-bold transition-all duration-200 border-2 bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 focus:outline-none ${copied === e.emoji ? 'ring-2 ring-green-400 bg-green-50 text-green-700' : ''}`}
                    aria-label={`Copy ${e.name}`}
                  >
                    {e.emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Emoji Grid */}
          <div className="w-full grid grid-cols-8 gap-3 mb-6">
            {filteredEmojis.map(e => (
              <button
                key={e.emoji}
                onClick={() => handleCopy(e.emoji, e.name)}
                className={`px-2 py-2 rounded-xl text-2xl font-bold transition-all duration-200 border-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 focus:outline-none ${copied === e.emoji ? 'ring-2 ring-green-400 bg-green-50 text-green-700' : ''}`}
                aria-label={`Copy ${e.name}`}
                title={e.name}
              >
                {e.emoji}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center">Tap any emoji to copy. Your recently used emojis are saved in your browser.</p>
        </div>
      </main>
      <Footer />
    </>
  );
} 