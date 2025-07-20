import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter/X" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "snapchat", label: "Snapchat" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "pinterest", label: "Pinterest" },
];
const TYPES = [
  { value: "bio", label: "Bio" },
  { value: "caption", label: "Caption" },
];
const TONES = [
  { value: "fun", label: "Fun" },
  { value: "professional", label: "Professional" },
  { value: "motivational", label: "Motivational" },
  { value: "trendy", label: "Trendy" },
  { value: "minimal", label: "Minimal" },
  { value: "creative", label: "Creative" },
  { value: "aesthetic", label: "Aesthetic" },
  { value: "sarcastic", label: "Sarcastic" },
  { value: "poetic", label: "Poetic" },
  { value: "bold", label: "Bold" },
  { value: "friendly", label: "Friendly" },
  { value: "inspirational", label: "Inspirational" },
];

// Static templates for demo (expand as needed)
const TEMPLATES = {
  bio: {
    fun: [
      "{keywords} | Making memories & spreading smiles! 😄",
      "{keywords} | Life's too short for boring bios! ✨",
      "{keywords} | Just vibing through life! 🌈",
      "{keywords} | Professional overthinker. 🤔",
      "{keywords} | I put the 'pro' in procrastinate! 💤",
    ],
    professional: [
      "{keywords} | Driven by passion, powered by coffee.",
      "{keywords} | Building my dreams one day at a time.",
      "{keywords} | Focused. Ambitious. Ready.",
      "{keywords} | Making impact, not just income.",
      "{keywords} | Results-driven and detail-oriented.",
    ],
    motivational: [
      "{keywords} | Dream big, hustle harder.",
      "{keywords} | Turning goals into reality.",
      "{keywords} | Inspiring others, one post at a time.",
      "{keywords} | Progress, not perfection.",
      "{keywords} | Believe. Achieve. Succeed.",
    ],
    trendy: [
      "{keywords} | Trending now! 🚀",
      "{keywords} | Catch flights, not feelings.",
      "{keywords} | Living my best life! #blessed",
      "{keywords} | New vibe, who dis?",
      "{keywords} | #OnFleek always.",
    ],
    minimal: [
      "{keywords}",
      "{keywords} | Less is more.",
      "{keywords} | Simplicity is key.",
      "{keywords} | Just me.",
      "{keywords} | Keep it simple.",
    ],
    creative: [
      "{keywords} | Creating my own sunshine.",
      "{keywords} | Art in progress.",
      "{keywords} | Imagination unleashed.",
      "{keywords} | Dreamer. Creator. Doer.",
      "{keywords} | Making magic from the mundane.",
    ],
    aesthetic: [
      "{keywords} | Chasing sunsets & good vibes.",
      "{keywords} | Soft tones, strong mind.",
      "{keywords} | Aesthetic soul in a digital world.",
      "{keywords} | Pastel dreams & golden beams.",
      "{keywords} | Curated chaos.",
    ],
    sarcastic: [
      "{keywords} | Professional eye-roller. 🙄",
      "{keywords} | I'm not lazy, just on energy-saving mode.",
      "{keywords} | My hobbies include eating and complaining.",
      "{keywords} | I'm not arguing, I'm just explaining why I'm right.",
      "{keywords} | I'm not short, I'm concentrated awesome.",
    ],
    poetic: [
      "{keywords} | Whispering dreams to the stars.",
      "{keywords} | Heart full of poetry, eyes full of wonder.",
      "{keywords} | Dancing with words in the moonlight.",
      "{keywords} | Soul painted in verses.",
      "{keywords} | Breathing in stanzas, exhaling stories.",
    ],
    bold: [
      "{keywords} | Unapologetically me.",
      "{keywords} | Breaking rules, not hearts.",
      "{keywords} | Fearless and fierce.",
      "{keywords} | Too glam to give a damn.",
      "{keywords} | Born to stand out.",
    ],
    friendly: [
      "{keywords} | Here to make friends, not followers.",
      "{keywords} | Smiles are always in style.",
      "{keywords} | Let's connect!",
      "{keywords} | Spreading kindness like confetti.",
      "{keywords} | Your new favorite account.",
    ],
    inspirational: [
      "{keywords} | Inspiring change, one post at a time.",
      "{keywords} | Be the reason someone believes in good people.",
      "{keywords} | Shine bright, inspire others.",
      "{keywords} | Empowered and unstoppable.",
      "{keywords} | Lifting others as I rise.",
    ],
  },
  caption: {
    fun: [
      "{keywords} | If you were looking for a sign, here it is! ✨",
      "{keywords} | Spreading good vibes only!",
      "{keywords} | Warning: contagious laughter ahead! 😂",
      "{keywords} | Fri-nally!",
      "{keywords} | Too cool for captions.",
    ],
    professional: [
      "{keywords} | Progress, not perfection.",
      "{keywords} | Networking mode: ON.",
      "{keywords} | Elevate your mindset.",
      "{keywords} | Making moves, not excuses.",
      "{keywords} | Leveling up, one post at a time.",
    ],
    motivational: [
      "{keywords} | Every day is a fresh start.",
      "{keywords} | Keep going, you're getting there!",
      "{keywords} | Success is a journey, not a destination.",
      "{keywords} | Hustle in silence, let success make the noise.",
      "{keywords} | Stay positive, work hard, make it happen.",
    ],
    trendy: [
      "{keywords} | #trendingnow",
      "{keywords} | New post, who dis?",
      "{keywords} | Catching the latest wave! 🌊",
      "{keywords} | Vibing with the trends.",
      "{keywords} | #OOTD on point.",
    ],
    minimal: [
      "{keywords}",
      "{keywords} | Simple & sweet.",
      "{keywords} | Less talk, more action.",
      "{keywords} | Captionless.",
      "{keywords} | Just this.",
    ],
    creative: [
      "{keywords} | Let the creativity flow.",
      "{keywords} | Art speaks where words are unable to explain.",
      "{keywords} | Creating magic, one post at a time.",
      "{keywords} | Turning ideas into reality.",
      "{keywords} | Color outside the lines.",
    ],
    aesthetic: [
      "{keywords} | Golden hour glow.",
      "{keywords} | Dreamy days & cozy nights.",
      "{keywords} | Aesthetic feels only.",
      "{keywords} | Pastel palette.",
      "{keywords} | Soft focus, sharp mind.",
    ],
    sarcastic: [
      "{keywords} | Insert witty caption here.",
      "{keywords} | I'm not lazy, just on energy-saving mode.",
      "{keywords} | I'm not a photographer, but I can picture us together.",
      "{keywords} | I'm not short, I'm concentrated awesome.",
      "{keywords} | This is my 'I don't care' face.",
    ],
    poetic: [
      "{keywords} | Words woven like dreams.",
      "{keywords} | In the garden of thoughts, I bloom.",
      "{keywords} | Verses in every view.",
      "{keywords} | Capturing moments, painting stories.",
      "{keywords} | Poetry in pixels.",
    ],
    bold: [
      "{keywords} | Unfiltered and unapologetic.",
      "{keywords} | Too bold to blend in.",
      "{keywords} | Making statements, not excuses.",
      "{keywords} | Born to stand out.",
      "{keywords} | Loud, proud, and unbowed.",
    ],
    friendly: [
      "{keywords} | Let's be friends!",
      "{keywords} | Smiles for miles.",
      "{keywords} | Tag your bestie!",
      "{keywords} | Good times, great company.",
      "{keywords} | Here for the fun!",
    ],
    inspirational: [
      "{keywords} | Inspire, empower, repeat.",
      "{keywords} | Shine bright, share light.",
      "{keywords} | Uplifting words for your feed.",
      "{keywords} | Be the change you wish to see.",
      "{keywords} | Dream big, post bigger.",
    ],
  },
};

// Emoji & symbol list (expandable)
const EMOJIS = [
  "😀", "😂", "😍", "🔥", "✨", "🌈", "🎉", "💯", "🥳", "😎", "🙌", "🤩", "🌟", "💡", "🎶", "📸", "📝", "🚀", "🌸", "🍕", "🍔", "🍦", "☕", "🎨", "🏆", "🏋️‍♂️", "🎮", "🐶", "🐱", "🌍", "💪", "👑", "🦄", "🧠", "💖", "🧿", "🦋", "🕺", "💃", "🛫", "🧳", "🧁", "🎤", "🎧", "📚", "🧘", "🛍️", "🕶️", "🦸", "🦸‍♀️", "🦸‍♂️", "🦹", "🦹‍♀️", "🦹‍♂️", "🧙", "🧙‍♀️", "🧙‍♂️", "🧚", "🧚‍♀️", "🧚‍♂️", "🧞", "🧞‍♀️", "🧞‍♂️", "🧜", "🧜‍♀️", "🧜‍♂️", "🧝", "🧝‍♀️", "🧝‍♂️", "🧛", "🧛‍♀️", "🧛‍♂️", "🧟", "🧟‍♀️", "🧟‍♂️", "🦸‍♂️", "🦸‍♀️", "🦹‍♂️", "🦹‍♀️", "🧙‍♂️", "🧙‍♀️", "🧚‍♂️", "🧚‍♀️", "🧞‍♂️", "🧞‍♀️", "🧜‍♂️", "🧜‍♀️", "🧝‍♂️", "🧝‍♀️", "🧛‍♂️", "🧛‍♀️", "🧟‍♂️", "🧟‍♀️"
];

// Platform-specific character limits
const PLATFORM_LIMITS: Record<string, { bio: number; caption: number }> = {
  instagram: { bio: 150, caption: 2200 },
  tiktok: { bio: 80, caption: 150 },
  twitter: { bio: 160, caption: 280 },
  facebook: { bio: 101, caption: 63206 },
  youtube: { bio: 1000, caption: 5000 },
  snapchat: { bio: 80, caption: 80 },
  whatsapp: { bio: 139, caption: 700 },
  telegram: { bio: 70, caption: 4096 },
  pinterest: { bio: 160, caption: 500 },
};

// Simple hashtag suggestion logic (expandable)
const SUGGESTED_HASHTAGS: Record<string, string[]> = {
  fun: ["#fun", "#goodvibes", "#lol", "#happy", "#smile"],
  professional: ["#career", "#success", "#networking", "#worklife", "#goals"],
  motivational: ["#motivation", "#inspiration", "#hustle", "#dreambig", "#nevergiveup"],
  trendy: ["#trending", "#viral", "#foryou", "#explore", "#now"],
  minimal: ["#minimal", "#simple", "#clean", "#aesthetic", "#lessismore"],
  creative: ["#creative", "#artsy", "#imagination", "#original", "#create"],
  aesthetic: ["#aesthetic", "#vibes", "#pastel", "#soft", "#moody"],
  sarcastic: ["#sarcasm", "#eyeroll", "#sassy", "#whatever", "#notimpressed"],
  poetic: ["#poetry", "#verses", "#dreamer", "#soulful", "#words"],
  bold: ["#bold", "#fearless", "#standout", "#confident", "#unapologetic"],
  friendly: ["#friends", "#community", "#connect", "#kindness", "#spreadlove"],
  inspirational: ["#inspire", "#empower", "#shine", "#uplift", "#positivity"],
};

// Formatter utilities
function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
function toAllCaps(str: string) {
  return str.toUpperCase();
}
function toLineBreaks(str: string) {
  return str.replace(/\s+/g, '\n');
}

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "ar", label: "العربية (Arabic)" },
  { value: "ur", label: "اردو (Urdu)" },
  { value: "hi", label: "हिन्दी (Hindi)" },
];

const STATIC_TRANSLATIONS: Record<string, Record<string, string>> = {
  es: { 'Your bio/caption will appear here...': 'Tu biografía/caption aparecerá aquí...' },
  fr: { 'Your bio/caption will appear here...': 'Votre bio/légende apparaîtra ici...' },
  de: { 'Your bio/caption will appear here...': 'Dein Bio/Untertitel erscheint hier...' },
  ar: { 'Your bio/caption will appear here...': 'سوف تظهر سيرتك الذاتية/التعليق هنا...' },
  ur: { 'Your bio/caption will appear here...': 'آپ کی بایو/کیپشن یہاں ظاہر ہوگی...' },
  hi: { 'Your bio/caption will appear here...': 'आपका बायो/कैप्शन यहाँ दिखाई देगा...' },
};

export default function BioCaptionGenerator() {
  const [platform, setPlatform] = useState("instagram");
  const [type, setType] = useState("bio");
  const [tone, setTone] = useState("fun");
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const charLimit = PLATFORM_LIMITS[platform]?.[type] || 150;
  const charCount = keywords.length;
  const overLimit = charCount > charLimit;

  const hashtagSuggestions = SUGGESTED_HASHTAGS[tone] || [];

  const [format, setFormat] = useState('none');
  const [abTest, setAbTest] = useState(false);
  const [language, setLanguage] = useState('en');

  // Load saved from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("zaptools_bio_caption_saved");
    if (savedData) setSaved(JSON.parse(savedData));
  }, []);

  // Save to localStorage
  const saveResult = (text: string) => {
    const newSaved = [text, ...saved.filter(s => s !== text)].slice(0, 10);
    setSaved(newSaved);
    localStorage.setItem("zaptools_bio_caption_saved", JSON.stringify(newSaved));
  };

  // Generate bios/captions
  const handleGenerate = () => {
    if (!keywords.trim()) return setResults(["Please enter some keywords or a description."]);
    const templates = TEMPLATES[type][tone];
    const generated = templates.map(t => t.replace("{keywords}", keywords.trim()));
    setResults(generated);
  };

  // Copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1200);
  };

  // Shareable link (URL-encoded)
  const getShareLink = (text: string) => {
    const base = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    return base + `?bio=${encodeURIComponent(text)}`;
  };

  // Insert emoji at cursor position
  const insertEmoji = (emoji: string) => {
    if (!inputRef) return;
    const el = inputRef;
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const newValue = keywords.slice(0, start) + emoji + keywords.slice(end);
    setKeywords(newValue);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  // Insert hashtag at cursor position
  const insertHashtag = (hashtag: string) => {
    if (!inputRef) return;
    const el = inputRef;
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const prefix = start > 0 && !/\s/.test(keywords[start - 1]) ? ' ' : '';
    const newValue = keywords.slice(0, start) + prefix + hashtag + keywords.slice(end);
    setKeywords(newValue);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length + hashtag.length, start + prefix.length + hashtag.length);
    }, 0);
  };

  // Formatter logic
  const formatText = (text: string) => {
    if (format === 'allcaps') return toAllCaps(text);
    if (format === 'title') return toTitleCase(text);
    if (format === 'linebreaks') return toLineBreaks(text);
    return text;
  };

  // Splitter logic
  const splitText = (text: string) => {
    if (text.length <= charLimit) return [text];
    const parts = [];
    let i = 0;
    while (i < text.length) {
      parts.push(text.slice(i, i + charLimit));
      i += charLimit;
    }
    return parts;
  };

  // Randomizer
  const handleSurpriseMe = () => {
    const randomTone = TONES[Math.floor(Math.random() * TONES.length)].value;
    setTone(randomTone);
    setTimeout(handleGenerate, 0);
  };

  return (
    <>
      <SEOHead 
        title="Bio & Caption Generator for Social Media | ZapTools"
        description="Generate catchy bios and captions for Instagram, TikTok, Twitter, and Facebook. Get creative ideas for your social media profiles and posts."
        keywords="bio generator, caption generator, instagram bio, tiktok bio, twitter bio, facebook bio, social media captions"
        url="https://zaptools.tech/tools/bio-caption-generator"
        contentType="tool"
        category="Social Media"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4 flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 max-w-2xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2 text-center">Bio & Caption Generator</h1>
          {/* Collapsible Instructions Box */}
          <div className="mb-6 w-full">
            <button
              type="button"
              className="flex items-center gap-2 font-bold text-blue-700 text-lg focus:outline-none mb-2"
              onClick={() => setShowInstructions(v => !v)}
              aria-expanded={showInstructions}
              aria-controls="instructions-box"
            >
              <span>ℹ️</span> How to Use
              <svg className={`w-5 h-5 transform transition-transform duration-200 ${showInstructions ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showInstructions && (
              <div id="instructions-box" className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 shadow-sm animate-fade-in">
                <ul className="list-disc list-inside text-sm text-blue-900 space-y-1">
                  <li>Select your <b>platform</b> (Instagram, TikTok, Twitter/X, Facebook, etc.).</li>
                  <li>Choose <b>Bio</b> or <b>Caption</b> and pick a <b>tone/style</b>.</li>
                  <li>Enter keywords or a short description (e.g. "travel lover, foodie, dreamer").</li>
                  <li>Click <b>Generate</b> to see creative results.</li>
                  <li>Copy, save, or share your favorite bios/captions.</li>
                  <li>Saved results appear below for quick access.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="mb-4 w-full flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-500 font-semibold mr-2">Language:</span>
            {LANGUAGES.map(lang => (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border-2 ${language === lang.value ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'}`}
                aria-pressed={language === lang.value}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Formatter & Splitter */}
          <div className="mb-4 w-full flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-500 font-semibold mr-2">Format:</span>
            <button onClick={() => setFormat('none')} className={`px-3 py-1 rounded-xl text-xs font-bold border-2 ${format === 'none' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'}`}>Normal</button>
            <button onClick={() => setFormat('allcaps')} className={`px-3 py-1 rounded-xl text-xs font-bold border-2 ${format === 'allcaps' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'}`}>ALL CAPS</button>
            <button onClick={() => setFormat('title')} className={`px-3 py-1 rounded-xl text-xs font-bold border-2 ${format === 'title' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'}`}>Title Case</button>
            <button onClick={() => setFormat('linebreaks')} className={`px-3 py-1 rounded-xl text-xs font-bold border-2 ${format === 'linebreaks' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'}`}>Line Breaks</button>
          </div>

          {/* A/B Test & Surprise Me */}
          <div className="mb-4 w-full flex flex-wrap gap-2 items-center">
            <button onClick={handleSurpriseMe} className="px-4 py-2 rounded-xl bg-yellow-100 text-yellow-800 font-bold hover:bg-yellow-200 transition-colors duration-200 border-2 border-yellow-200">🎲 Surprise Me!</button>
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input type="checkbox" checked={abTest} onChange={e => setAbTest(e.target.checked)} className="form-checkbox rounded border-gray-300 text-blue-600" />
              A/B Test Mode
            </label>
          </div>

          {/* Form */}
          <form className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-center w-full" onSubmit={e => { e.preventDefault(); handleGenerate(); }}>
            <select
              value={platform}
              onChange={e => setPlatform(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-semibold bg-gray-50 w-full sm:w-auto"
              aria-label="Select platform"
            >
              {PLATFORMS.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-semibold bg-gray-50 w-full sm:w-auto"
              aria-label="Select type"
            >
              {TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <select
              value={tone}
              onChange={e => setTone(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-semibold bg-gray-50 w-full sm:w-auto"
              aria-label="Select tone"
            >
              {TONES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </form>
          <input
            ref={el => setInputRef(el)}
            type="text"
            value={keywords}
            onChange={e => setKeywords(e.target.value.slice(0, charLimit))}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-semibold bg-gray-50 mb-4"
            placeholder="Enter keywords or a short description..."
            aria-label="Enter keywords or description"
            maxLength={charLimit + 20}
          />
          {/* Emoji Picker */}
          <div className="mb-2 w-full flex flex-wrap gap-1 items-center">
            {EMOJIS.slice(0, 24).map((emoji, idx) => (
              <button
                key={idx}
                type="button"
                className="text-xl p-1 rounded hover:bg-blue-100 focus:outline-none"
                onClick={() => insertEmoji(emoji)}
                tabIndex={0}
                aria-label={`Insert emoji ${emoji}`}
              >
                {emoji}
              </button>
            ))}
            <span className="ml-2 text-xs text-gray-400">+ more</span>
          </div>

          {/* Hashtag Suggestions */}
          {hashtagSuggestions.length > 0 && (
            <div className="mb-4 w-full flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500 font-semibold mr-2">Suggestions:</span>
              {hashtagSuggestions.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="px-2 py-1 rounded-xl text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100 transition-colors"
                  onClick={() => insertHashtag(tag)}
                  tabIndex={0}
                  aria-label={`Insert hashtag ${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Character Counter */}
          <div className="mb-4 w-full text-right text-xs">
            <span className={overLimit ? "text-red-500 font-bold" : "text-gray-500"}>
              {charCount} / {charLimit} characters
            </span>
            {overLimit && <span className="ml-2 text-red-500">Over limit! Will be trimmed.</span>}
          </div>

          <button
            onClick={handleGenerate}
            className="w-full mb-6 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="button"
          >
            Generate
          </button>

          {/* AI Generation (Coming Soon) */}
          <div className="mb-8 w-full flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xs animate-pulse">AI</span>
              <span className="font-semibold text-gray-700">AI-Powered Generation</span>
              <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-200 text-yellow-900 font-bold text-xs ml-2">Coming Soon</span>
            </div>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-400 font-semibold text-center cursor-not-allowed mb-2"
              placeholder="Describe your ideal bio or caption... (AI coming soon)"
              disabled
            />
            <button
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold shadow-lg opacity-60 cursor-not-allowed"
              disabled
            >
              Generate with AI
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mb-8 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold text-xs">Results</span>
                <span className="text-gray-500 text-sm">({results.length})</span>
              </div>
              <div className="flex flex-col gap-2">
                {results.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                    <span className="text-sm text-gray-700 font-mono truncate max-w-xs">{r}</span>
                    <button
                      onClick={() => handleCopy(r)}
                      className={`ml-1 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-bold hover:bg-blue-200 transition-colors ${copied === r ? 'ring-2 ring-green-400 bg-green-50 text-green-700' : ''}`}
                      title="Copy"
                    >
                      {copied === r ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={() => saveResult(r)}
                      className="ml-1 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-bold hover:bg-green-200 transition-colors"
                      title="Save"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleCopy(getShareLink(r))}
                      className="ml-1 px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-xs font-bold hover:bg-purple-200 transition-colors"
                      title="Copy Share Link"
                    >
                      Share
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Results */}
          {saved.length > 0 && (
            <div className="mb-8 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold text-xs">Saved</span>
                <span className="text-gray-500 text-sm">({saved.length})</span>
              </div>
              <div className="flex flex-col gap-2">
                {saved.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                    <span className="text-sm text-gray-700 font-mono truncate max-w-xs">{r}</span>
                    <button
                      onClick={() => handleCopy(r)}
                      className={`ml-1 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-bold hover:bg-blue-200 transition-colors ${copied === r ? 'ring-2 ring-green-400 bg-green-50 text-green-700' : ''}`}
                      title="Copy"
                    >
                      {copied === r ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Preview */}
          <div className="mb-8 w-full flex flex-col items-center">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-2xl shadow p-4 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold shadow">Z</div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-base">@yourusername</span>
                  <span className="text-xs text-gray-400">{PLATFORMS.find(p => p.value === platform)?.label}</span>
                </div>
              </div>
              <div className="w-full text-gray-800 text-sm bg-white rounded-xl p-3 border border-gray-100 shadow-inner min-h-[48px] text-left whitespace-pre-line">
                {splitText(formatText(keywords)).map((part, idx) => (
                  <div key={idx}>{part}</div>
                ))}
                {!keywords && <span className="text-gray-400">{STATIC_TRANSLATIONS[language]?.['Your bio/caption will appear here...'] || 'Your bio/caption will appear here...'}</span>}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 