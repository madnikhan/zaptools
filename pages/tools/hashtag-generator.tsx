import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

const HASHTAG_DB: Record<string, Record<string, string[]>> = {
  instagram: {
    travel: ["#travel", "#wanderlust", "#travelgram", "#adventure", "#explore", "#vacation", "#instatravel", "#nature", "#trip", "#travelphotography"],
    food: ["#food", "#foodie", "#instafood", "#yummy", "#delicious", "#foodstagram", "#foodlover", "#foodporn", "#homemade", "#foodgasm"],
    fitness: ["#fitness", "#fit", "#workout", "#gym", "#motivation", "#fitfam", "#health", "#training", "#lifestyle", "#fitnessmotivation"],
    fashion: ["#fashion", "#style", "#ootd", "#fashionblogger", "#instafashion", "#fashionista", "#outfitoftheday", "#streetstyle", "#trend", "#lookbook"],
    music: ["#music", "#musician", "#song", "#singer", "#instamusic", "#musiclover", "#nowplaying", "#newmusic", "#musiclife", "#artist"],
    art: ["#art", "#artist", "#artwork", "#illustration", "#drawing", "#painting", "#sketch", "#creative", "#artoftheday", "#instaart"],
    photography: ["#photography", "#photo", "#photographer", "#photooftheday", "#naturephotography", "#portrait", "#landscape", "#photoshoot", "#instaphoto", "#travelphotography"],
    technology: ["#technology", "#tech", "#innovation", "#gadgets", "#technews", "#future", "#smart", "#digital", "#startup", "#engineering"],
    gaming: ["#gaming", "#gamer", "#videogames", "#game", "#instagaming", "#gamers", "#playstation", "#xbox", "#pcgaming", "#esports"],
    business: ["#business", "#entrepreneur", "#startup", "#success", "#motivation", "#marketing", "#work", "#inspiration", "#leadership", "#money"],
    motivation: ["#motivation", "#inspiration", "#success", "#motivational", "#quotes", "#goals", "#mindset", "#believe", "#dreambig", "#positivity"],
    education: ["#education", "#learning", "#study", "#student", "#school", "#teacher", "#knowledge", "#university", "#college", "#studymotivation"],
    health: ["#health", "#wellness", "#healthy", "#fitness", "#nutrition", "#lifestyle", "#selfcare", "#mentalhealth", "#healthylifestyle", "#workout"],
    beauty: ["#beauty", "#makeup", "#skincare", "#fashion", "#beautiful", "#style", "#hair", "#cosmetics", "#glam", "#beautyblogger"],
    sports: ["#sports", "#sport", "#football", "#basketball", "#soccer", "#tennis", "#athlete", "#fitness", "#workout", "#training"],
    pets: ["#pets", "#pet", "#dog", "#cat", "#puppy", "#kitten", "#animal", "#petstagram", "#dogsofinstagram", "#catsofinstagram"],
    memes: ["#memes", "#meme", "#funny", "#lol", "#dankmemes", "#humor", "#instamemes", "#memesdaily", "#funnymemes", "#relatable"],
    diy: ["#diy", "#crafts", "#handmade", "#homedecor", "#doityourself", "#creative", "#crafting", "#diyprojects", "#makersgonnamake", "#upcycle"],
    default: ["#instagood", "#photooftheday", "#love", "#beautiful", "#happy", "#cute", "#follow", "#like4like", "#picoftheday", "#selfie"]
  },
  tiktok: {
    travel: ["#travel", "#fyp", "#explore", "#wanderlust", "#adventure", "#tiktoktravel", "#vacation", "#nature", "#trip", "#viral"],
    food: ["#food", "#foodie", "#foryou", "#delicious", "#tiktokfood", "#yum", "#recipe", "#cooking", "#foodtok", "#viral"],
    fitness: ["#fitness", "#fit", "#workout", "#gym", "#motivation", "#fitfam", "#health", "#training", "#lifestyle", "#viral"],
    fashion: ["#fashion", "#style", "#ootd", "#tiktokfashion", "#fashionista", "#trend", "#lookbook", "#outfit", "#viral", "#foryou"],
    music: ["#music", "#musician", "#song", "#singer", "#instamusic", "#musiclover", "#nowplaying", "#newmusic", "#musiclife", "#artist"],
    art: ["#art", "#artist", "#artwork", "#illustration", "#drawing", "#painting", "#sketch", "#creative", "#artoftheday", "#instaart"],
    photography: ["#photography", "#photo", "#photographer", "#photooftheday", "#naturephotography", "#portrait", "#landscape", "#photoshoot", "#instaphoto", "#travelphotography"],
    technology: ["#technology", "#tech", "#innovation", "#gadgets", "#technews", "#future", "#smart", "#digital", "#startup", "#engineering"],
    gaming: ["#gaming", "#gamer", "#videogames", "#game", "#instagaming", "#gamers", "#playstation", "#xbox", "#pcgaming", "#esports"],
    business: ["#business", "#entrepreneur", "#startup", "#success", "#motivation", "#marketing", "#work", "#inspiration", "#leadership", "#money"],
    motivation: ["#motivation", "#inspiration", "#success", "#motivational", "#quotes", "#goals", "#mindset", "#believe", "#dreambig", "#positivity"],
    education: ["#education", "#learning", "#study", "#student", "#school", "#teacher", "#knowledge", "#university", "#college", "#studymotivation"],
    health: ["#health", "#wellness", "#healthy", "#fitness", "#nutrition", "#lifestyle", "#selfcare", "#mentalhealth", "#healthylifestyle", "#workout"],
    beauty: ["#beauty", "#makeup", "#skincare", "#fashion", "#beautiful", "#style", "#hair", "#cosmetics", "#glam", "#beautyblogger"],
    sports: ["#sports", "#sport", "#football", "#basketball", "#soccer", "#tennis", "#athlete", "#fitness", "#workout", "#training"],
    pets: ["#pets", "#pet", "#dog", "#cat", "#puppy", "#kitten", "#animal", "#petstagram", "#dogsofinstagram", "#catsofinstagram"],
    memes: ["#memes", "#meme", "#funny", "#lol", "#dankmemes", "#humor", "#instamemes", "#memesdaily", "#funnymemes", "#relatable"],
    diy: ["#diy", "#crafts", "#handmade", "#homedecor", "#doityourself", "#creative", "#crafting", "#diyprojects", "#makersgonnamake", "#upcycle"],
    default: ["#foryou", "#fyp", "#viral", "#trending", "#explore", "#tiktok", "#funny", "#music", "#love", "#life"]
  },
  twitter: {
    travel: ["#travel", "#wanderlust", "#adventure", "#explore", "#vacation", "#nature", "#trip", "#travelTuesday", "#travelphotography", "#instatravel"],
    food: ["#food", "#foodie", "#yum", "#delicious", "#foodstagram", "#foodlover", "#foodpics", "#foodblogger", "#foodgasm", "#instafood"],
    fitness: ["#fitness", "#fit", "#workout", "#gym", "#motivation", "#fitfam", "#health", "#training", "#lifestyle", "#fitnessmotivation"],
    fashion: ["#fashion", "#style", "#ootd", "#fashionblogger", "#fashionista", "#trend", "#lookbook", "#outfit", "#instafashion", "#streetstyle"],
    music: ["#music", "#musician", "#song", "#singer", "#instamusic", "#musiclover", "#nowplaying", "#newmusic", "#musiclife", "#artist"],
    art: ["#art", "#artist", "#artwork", "#illustration", "#drawing", "#painting", "#sketch", "#creative", "#artoftheday", "#instaart"],
    photography: ["#photography", "#photo", "#photographer", "#photooftheday", "#naturephotography", "#portrait", "#landscape", "#photoshoot", "#instaphoto", "#travelphotography"],
    technology: ["#technology", "#tech", "#innovation", "#gadgets", "#technews", "#future", "#smart", "#digital", "#startup", "#engineering"],
    gaming: ["#gaming", "#gamer", "#videogames", "#game", "#instagaming", "#gamers", "#playstation", "#xbox", "#pcgaming", "#esports"],
    business: ["#business", "#entrepreneur", "#startup", "#success", "#motivation", "#marketing", "#work", "#inspiration", "#leadership", "#money"],
    motivation: ["#motivation", "#inspiration", "#success", "#motivational", "#quotes", "#goals", "#mindset", "#believe", "#dreambig", "#positivity"],
    education: ["#education", "#learning", "#study", "#student", "#school", "#teacher", "#knowledge", "#university", "#college", "#studymotivation"],
    health: ["#health", "#wellness", "#healthy", "#fitness", "#nutrition", "#lifestyle", "#selfcare", "#mentalhealth", "#healthylifestyle", "#workout"],
    beauty: ["#beauty", "#makeup", "#skincare", "#fashion", "#beautiful", "#style", "#hair", "#cosmetics", "#glam", "#beautyblogger"],
    sports: ["#sports", "#sport", "#football", "#basketball", "#soccer", "#tennis", "#athlete", "#fitness", "#workout", "#training"],
    pets: ["#pets", "#pet", "#dog", "#cat", "#puppy", "#kitten", "#animal", "#petstagram", "#dogsofinstagram", "#catsofinstagram"],
    memes: ["#memes", "#meme", "#funny", "#lol", "#dankmemes", "#humor", "#instamemes", "#memesdaily", "#funnymemes", "#relatable"],
    diy: ["#diy", "#crafts", "#handmade", "#homedecor", "#doityourself", "#creative", "#crafting", "#diyprojects", "#makersgonnamake", "#upcycle"],
    default: ["#trending", "#news", "#nowplaying", "#breaking", "#update", "#follow", "#tweet", "#retweet", "#hashtag", "#viral"]
  },
  facebook: {
    travel: ["#travel", "#wanderlust", "#adventure", "#explore", "#vacation", "#nature", "#trip", "#travelphotography", "#instatravel", "#exploring"],
    food: ["#food", "#foodie", "#delicious", "#foodstagram", "#foodlover", "#foodpics", "#foodblogger", "#homemade", "#foodgasm", "#instafood"],
    fitness: ["#fitness", "#fit", "#workout", "#gym", "#motivation", "#fitfam", "#health", "#training", "#lifestyle", "#fitnessmotivation"],
    fashion: ["#fashion", "#style", "#ootd", "#fashionblogger", "#fashionista", "#trend", "#lookbook", "#outfit", "#instafashion", "#streetstyle"],
    music: ["#music", "#musician", "#song", "#singer", "#instamusic", "#musiclover", "#nowplaying", "#newmusic", "#musiclife", "#artist"],
    art: ["#art", "#artist", "#artwork", "#illustration", "#drawing", "#painting", "#sketch", "#creative", "#artoftheday", "#instaart"],
    photography: ["#photography", "#photo", "#photographer", "#photooftheday", "#naturephotography", "#portrait", "#landscape", "#photoshoot", "#instaphoto", "#travelphotography"],
    technology: ["#technology", "#tech", "#innovation", "#gadgets", "#technews", "#future", "#smart", "#digital", "#startup", "#engineering"],
    gaming: ["#gaming", "#gamer", "#videogames", "#game", "#instagaming", "#gamers", "#playstation", "#xbox", "#pcgaming", "#esports"],
    business: ["#business", "#entrepreneur", "#startup", "#success", "#motivation", "#marketing", "#work", "#inspiration", "#leadership", "#money"],
    motivation: ["#motivation", "#inspiration", "#success", "#motivational", "#quotes", "#goals", "#mindset", "#believe", "#dreambig", "#positivity"],
    education: ["#education", "#learning", "#study", "#student", "#school", "#teacher", "#knowledge", "#university", "#college", "#studymotivation"],
    health: ["#health", "#wellness", "#healthy", "#fitness", "#nutrition", "#lifestyle", "#selfcare", "#mentalhealth", "#healthylifestyle", "#workout"],
    beauty: ["#beauty", "#makeup", "#skincare", "#fashion", "#beautiful", "#style", "#hair", "#cosmetics", "#glam", "#beautyblogger"],
    sports: ["#sports", "#sport", "#football", "#basketball", "#soccer", "#tennis", "#athlete", "#fitness", "#workout", "#training"],
    pets: ["#pets", "#pet", "#dog", "#cat", "#puppy", "#kitten", "#animal", "#petstagram", "#dogsofinstagram", "#catsofinstagram"],
    memes: ["#memes", "#meme", "#funny", "#lol", "#dankmemes", "#humor", "#instamemes", "#memesdaily", "#funnymemes", "#relatable"],
    diy: ["#diy", "#crafts", "#handmade", "#homedecor", "#doityourself", "#creative", "#crafting", "#diyprojects", "#makersgonnamake", "#upcycle"],
    default: ["#facebook", "#like", "#share", "#friends", "#social", "#community", "#love", "#photo", "#instagood", "#fun"]
  },
  youtube: { default: ["#youtube", "#subscribe", "#like", "#video", "#vlog", "#youtuber", "#newvideo", "#trending", "#viral", "#shorts"] },
  youtube_shorts: { default: ["#shorts", "#youtubeshorts", "#viral", "#trending", "#funny", "#music", "#comedy", "#challenge", "#new", "#explore"] },
  twitch: { default: ["#twitch", "#streamer", "#gaming", "#livestream", "#gamer", "#twitchstreamer", "#twitchtv", "#live", "#follow", "#chat"] },
  snapchat: { default: ["#snapchat", "#snap", "#story", "#snapfam", "#snapstreak", "#snaplife", "#snapcode", "#filter", "#friends", "#fun"] },
  whatsapp: { default: ["#whatsapp", "#chat", "#status", "#group", "#message", "#call", "#video", "#voice", "#share", "#connect"] },
  telegram: { default: ["#telegram", "#channel", "#group", "#bot", "#chat", "#update", "#news", "#share", "#community", "#connect"] },
  pinterest: { default: ["#pinterest", "#pin", "#inspiration", "#ideas", "#design", "#art", "#style", "#home", "#diy", "#creative"] },
};

const TOPICS = [
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "fitness", label: "Fitness" },
  { value: "fashion", label: "Fashion" },
  { value: "music", label: "Music" },
  { value: "art", label: "Art" },
  { value: "photography", label: "Photography" },
  { value: "technology", label: "Technology" },
  { value: "gaming", label: "Gaming" },
  { value: "business", label: "Business" },
  { value: "motivation", label: "Motivation" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "beauty", label: "Beauty" },
  { value: "sports", label: "Sports" },
  { value: "pets", label: "Pets" },
  { value: "memes", label: "Memes" },
  { value: "diy", label: "DIY" },
  { value: "default", label: "General" },
];

const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter/X" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "youtube_shorts", label: "YouTube Shorts" },
  { value: "twitch", label: "Twitch" },
  { value: "snapchat", label: "Snapchat" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "pinterest", label: "Pinterest" },
];

// Add static trending hashtags and popularity data
const TRENDING_HASHTAGS: Record<string, string[]> = {
  instagram: ["#instagood", "#love", "#fashion", "#photooftheday", "#beautiful", "#happy", "#cute", "#tbt", "#like4like", "#followme"],
  tiktok: ["#foryou", "#fyp", "#viral", "#trending", "#tiktok", "#duet", "#funny", "#music", "#dance", "#explore"],
  twitter: ["#trending", "#news", "#nowplaying", "#breaking", "#update", "#follow", "#tweet", "#retweet", "#hashtag", "#viral"],
  facebook: ["#facebook", "#like", "#share", "#friends", "#social", "#community", "#love", "#photo", "#instagood", "#fun"],
  youtube: ["#youtube", "#subscribe", "#like", "#video", "#vlog", "#youtuber", "#newvideo", "#trending", "#viral", "#shorts"],
  youtube_shorts: ["#shorts", "#youtubeshorts", "#viral", "#trending", "#funny", "#music", "#comedy", "#challenge", "#new", "#explore"],
  twitch: ["#twitch", "#streamer", "#gaming", "#livestream", "#gamer", "#twitchstreamer", "#twitchtv", "#live", "#follow", "#chat"],
  snapchat: ["#snapchat", "#snap", "#story", "#snapfam", "#snapstreak", "#snaplife", "#snapcode", "#filter", "#friends", "#fun"],
  whatsapp: ["#whatsapp", "#chat", "#status", "#group", "#message", "#call", "#video", "#voice", "#share", "#connect"],
  telegram: ["#telegram", "#channel", "#group", "#bot", "#chat", "#update", "#news", "#share", "#community", "#connect"],
  pinterest: ["#pinterest", "#pin", "#inspiration", "#ideas", "#design", "#art", "#style", "#home", "#diy", "#creative"],
};

const HASHTAG_POPULARITY: Record<string, Record<string, 'High' | 'Medium' | 'Low'>> = {
  instagram: {
    "#instagood": "High", "#love": "High", "#fashion": "High", "#photooftheday": "High", "#beautiful": "High", "#happy": "Medium", "#cute": "Medium", "#tbt": "Medium", "#like4like": "Medium", "#followme": "Low"
  },
  tiktok: {
    "#foryou": "High", "#fyp": "High", "#viral": "High", "#trending": "High", "#tiktok": "Medium", "#duet": "Medium", "#funny": "Medium", "#music": "Medium", "#dance": "Low", "#explore": "Low"
  },
  twitter: {
    "#trending": "High", "#news": "High", "#nowplaying": "Medium", "#breaking": "Medium", "#update": "Medium", "#follow": "Medium", "#tweet": "Low", "#retweet": "Low", "#hashtag": "Low", "#viral": "High"
  },
  facebook: {
    "#facebook": "High", "#like": "High", "#share": "High", "#friends": "Medium", "#social": "Medium", "#community": "Medium", "#love": "Medium", "#photo": "Low", "#instagood": "Low", "#fun": "Low"
  },
  youtube: {"#youtube": "High", "#subscribe": "High", "#like": "Medium", "#video": "Medium", "#vlog": "Medium", "#youtuber": "High", "#newvideo": "Medium", "#trending": "High", "#viral": "High", "#shorts": "High"},
  youtube_shorts: {"#shorts": "High", "#youtubeshorts": "High", "#viral": "High", "#trending": "High", "#funny": "Medium", "#music": "Medium", "#comedy": "Medium", "#challenge": "Medium", "#new": "Low", "#explore": "Low"},
  twitch: {"#twitch": "High", "#streamer": "High", "#gaming": "High", "#livestream": "Medium", "#gamer": "Medium", "#twitchstreamer": "High", "#twitchtv": "Medium", "#live": "Medium", "#follow": "Medium", "#chat": "Low"},
  snapchat: {"#snapchat": "High", "#snap": "High", "#story": "High", "#snapfam": "Medium", "#snapstreak": "Medium", "#snaplife": "Medium", "#snapcode": "Low", "#filter": "Low", "#friends": "Medium", "#fun": "Low"},
  whatsapp: {"#whatsapp": "High", "#chat": "High", "#status": "Medium", "#group": "Medium", "#message": "Medium", "#call": "Low", "#video": "Low", "#voice": "Low", "#share": "Medium", "#connect": "Low"},
  telegram: {"#telegram": "High", "#channel": "High", "#group": "Medium", "#bot": "Medium", "#chat": "Medium", "#update": "Low", "#news": "Low", "#share": "Medium", "#community": "Medium", "#connect": "Low"},
  pinterest: {"#pinterest": "High", "#pin": "High", "#inspiration": "High", "#ideas": "Medium", "#design": "Medium", "#art": "Medium", "#style": "Medium", "#home": "Low", "#diy": "Low", "#creative": "Low"},
};

// Add static banned/overused hashtags
const BANNED_HASHTAGS = ["#like4like", "#followme", "#f4f", "#l4l", "#instasex", "#tagsforlikes"];

const FORMATTING_OPTIONS = [
  { value: "space", label: "Spaces (default)" },
  { value: "comma", label: "Comma Separated" },
  { value: "newline", label: "Line Breaks" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "ur", label: "اردو (Urdu)" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "ar", label: "العربية (Arabic)" },
];

// Add Arabic hashtags for Instagram travel
const HASHTAG_SETS_MULTI: Record<string, Record<string, Record<string, Record<string, string[]>>>> = {
  instagram: {
    travel: {
      en: {
        viral: ["#travel", "#wanderlust", "#travelgram", "#adventure", "#explore", "#vacation", "#instatravel", "#nature", "#trip", "#travelphotography"],
      },
      es: {
        viral: ["#viajar", "#aventura", "#explorar", "#vacaciones", "#naturaleza", "#viaje", "#fotografiadeviajes", "#turismo", "#mochilero", "#descubrir"],
      },
      fr: {
        viral: ["#voyage", "#aventure", "#explorer", "#vacances", "#nature", "#trip", "#photodevoyage", "#tourisme", "#routard", "#decouvrir"],
      },
      de: {
        viral: ["#reisen", "#abenteuer", "#erkunden", "#urlaub", "#natur", "#reise", "#reiseblog", "#tourismus", "#entdecken", "#fotoreise"],
      },
      ur: {
        viral: ["#سفر", "#مہم", "#دریافت", "#چھٹیاں", "#قدرت", "#سفرنامہ", "#سیاحت", "#خوابوں_کا_سفر", "#پاکستان", "#دنیا_کی_سیر"],
      },
      hi: {
        viral: ["#यात्रा", "#सफर", "#घूमना", "#अवकाश", "#प्रकृति", "#यात्रावृतांत", "#पर्यटन", "#सपनोंकीयात्रा", "#भारत", "#दुनियाकीसैर"],
      },
      ar: {
        viral: ["#سفر", "#رحلة", "#مغامرة", "#استكشاف", "#عطلة", "#طبيعة", "#تصوير_سفر", "#سياحة", "#رحلات", "#اكتشاف_العالم"],
      },
    },
    // ... add more topics/languages as needed
  },
  // ... add more platforms as needed
};

const SET_TYPES = [
  { value: "viral", label: "🔥 Viral Set" },
  { value: "niche", label: "🌱 Niche Set" },
  { value: "safe", label: "️ Safe Set" },
];

const HASHTAG_SETS: Record<string, Record<string, Record<string, string[]>>> = {
  instagram: {
    travel: {
      viral: ["#travel", "#wanderlust", "#travelgram", "#adventure", "#explore", "#vacation", "#instatravel", "#nature", "#trip", "#travelphotography"],
      niche: ["#solotravel", "#traveladdict", "#travelblog", "#travelpics", "#travelguide", "#travelersnotebook", "#travelcommunity", "#travelgoals", "#traveldeeper", "#travelmoments"],
      safe: ["#travel", "#nature", "#explore", "#adventure", "#trip", "#vacation", "#travelphotography", "#instatravel", "#beautifuldestinations", "#travelmore"]
    },
    food: {
      viral: ["#food", "#foodie", "#instafood", "#yummy", "#delicious", "#foodstagram", "#foodlover", "#foodporn", "#homemade", "#foodgasm"],
      niche: ["#foodblog", "#foodpics", "#foodphotography", "#foodiesofinstagram", "#foodies", "#foodgram", "#foodlovers", "#foodaddict", "#foodforthought", "#foodstyling"],
      safe: ["#food", "#yummy", "#delicious", "#homemade", "#foodphotography", "#foodstagram", "#foodlover", "#foodgasm", "#tasty", "#foodies"]
    },
    default: {
      viral: ["#instagood", "#photooftheday", "#love", "#beautiful", "#happy", "#cute", "#follow", "#like4like", "#picoftheday", "#selfie"],
      niche: ["#instadaily", "#igers", "#bestoftheday", "#instamood", "#instalike", "#instapic", "#instaphoto", "#instalove", "#instaquote", "#instafollow"],
      safe: ["#instagood", "#photooftheday", "#love", "#beautiful", "#happy", "#cute", "#follow", "#picoftheday", "#selfie", "#smile"]
    }
  },
  tiktok: {
    travel: {
      viral: ["#travel", "#fyp", "#explore", "#wanderlust", "#adventure", "#tiktoktravel", "#vacation", "#nature", "#trip", "#viral"],
      niche: ["#solotravel", "#traveladdict", "#travelblog", "#travelpics", "#travelguide", "#travelersnotebook", "#travelcommunity", "#travelgoals", "#traveldeeper", "#travelmoments"],
      safe: ["#travel", "#nature", "#explore", "#adventure", "#trip", "#vacation", "#tiktoktravel", "#wanderlust", "#beautifuldestinations", "#travelmore"]
    },
    default: {
      viral: ["#foryou", "#fyp", "#viral", "#trending", "#explore", "#tiktok", "#funny", "#music", "#love", "#life"],
      niche: ["#tiktokchallenge", "#tiktoktrend", "#tiktokers", "#tiktokdance", "#tiktokfun", "#tiktokvideo", "#tiktokmemes", "#tiktokers", "#tiktokcommunity", "#tiktoklife"],
      safe: ["#foryou", "#fyp", "#viral", "#trending", "#explore", "#tiktok", "#funny", "#music", "#love", "#life"]
    }
  },
  // ... add twitter, facebook, etc. as needed
};

export default function HashtagGenerator() {
  const [platform, setPlatform] = useState("instagram");
  const [topic, setTopic] = useState("travel");
  const [setType, setSetType] = useState("viral");
  const [copied, setCopied] = useState<string | null>(null);
  const [format, setFormat] = useState("space");
  const [savedSets, setSavedSets] = useState<string[][]>([]);
  const [recentSets, setRecentSets] = useState<string[][]>([]);
  const [language, setLanguage] = useState("en");
  const [showInstructions, setShowInstructions] = useState(false);

  // Use multi-language hashtag set if available
  const hashtags = HASHTAG_SETS_MULTI[platform]?.[topic]?.[language]?.[setType]
    || HASHTAG_SETS[platform]?.[topic]?.[setType]
    || HASHTAG_DB[platform][topic]
    || HASHTAG_DB[platform]["default"];

  // Load saved sets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("zaptools_hashtag_saved_sets");
    if (saved) setSavedSets(JSON.parse(saved));
  }, []);

  // Load recent sets from localStorage
  useEffect(() => {
    const recent = localStorage.getItem("zaptools_hashtag_recent_sets");
    if (recent) setRecentSets(JSON.parse(recent));
  }, []);

  // Save to localStorage
  const saveCurrentSet = () => {
    const newSets = [hashtags, ...savedSets].slice(0, 10);
    setSavedSets(newSets);
    localStorage.setItem("zaptools_hashtag_saved_sets", JSON.stringify(newSets));
  };

  // Shareable link (URL-encoded)
  const getShareLink = () => {
    const base = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    return base + `?hashtags=${encodeURIComponent(formatHashtags(hashtags))}`;
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(getShareLink());
    setCopied("share");
    setTimeout(() => setCopied(null), 1200);
  };

  // Format hashtags for copy
  const formatHashtags = (tags: string[]) => {
    if (format === "comma") return tags.join(", ");
    if (format === "newline") return tags.join("\n");
    return tags.join(" ");
  };

  // Add to recent sets when copying all
  const handleCopyAll = () => {
    navigator.clipboard.writeText(formatHashtags(hashtags));
    setCopied("all");
    // Save to recent sets
    const newRecents = [hashtags, ...recentSets.filter(set => formatHashtags(set) !== formatHashtags(hashtags))].slice(0, 10);
    setRecentSets(newRecents);
    localStorage.setItem("zaptools_hashtag_recent_sets", JSON.stringify(newRecents));
    setTimeout(() => setCopied(null), 1200);
  };

  const handleCopyOne = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopied(tag);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <SEOHead 
        title="Hashtag Generator for Instagram, TikTok, Twitter, Facebook | ZapTools"
        description="Generate trending and relevant hashtags for your social media posts. Boost your reach on Instagram, TikTok, Twitter, and Facebook with ZapTools' free hashtag generator."
        keywords="hashtag generator, instagram hashtags, tiktok hashtags, twitter hashtags, facebook hashtags, social media tools"
        url="https://zaptools.tech/tools/hashtag-generator"
        contentType="tool"
        category="Social Media"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4 flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 max-w-2xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2 text-center">Hashtag Generator</h1>
          <p className="text-lg text-gray-700 mb-2 text-center">Generate trending and relevant hashtags for your social media posts. Select a platform, topic, and language to get started!</p>

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
                  <li>Select your <b>platform</b> (Instagram, TikTok, Twitter/X, Facebook, YouTube, YouTube Shorts, Twitch, Snapchat, WhatsApp, Telegram, Pinterest).</li>
                  <li>Choose a <b>topic</b> and <b>language</b> for your hashtags.</li>
                  <li>Pick a <b>Hashtag Set</b> tab: <b>Viral</b>, <b>Niche</b>, or <b>Safe</b>.</li>
                  <li>Copy individual hashtags or use <b>Copy All</b> for the full set.</li>
                  <li>Change <b>Copy Format</b> (spaces, commas, line breaks) as needed.</li>
                  <li><b>Save</b> your favorite sets or <b>share</b> them with a link.</li>
                  <li>Recently copied and saved sets appear below for quick access.</li>
                  <li>Banned/overused hashtags are <span className='line-through text-red-500'>struck out</span> and cannot be copied.</li>
                  <li>Hover or tap badges for hashtag popularity info.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="mb-4 flex flex-wrap justify-center gap-2 w-full">
            <span className="text-sm text-gray-500 font-semibold mr-2">Language:</span>
            {LANGUAGES.map(lang => (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-200 border-2 ${language === lang.value ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'}`}
                aria-pressed={language === lang.value}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Platform & Topic Selectors */}
          <form className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-center w-full">
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
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-semibold bg-gray-50 w-full sm:w-auto"
              aria-label="Select topic"
            >
              {TOPICS.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </form>

          {/* Hashtag Set Tabs */}
          <div className="mb-6 flex justify-center gap-2 w-full">
            {SET_TYPES.map(set => (
              <button
                key={set.value}
                onClick={() => setSetType(set.value)}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 border-2 ${setType === set.value ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600 shadow-lg' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'}`}
                aria-pressed={setType === set.value}
              >
                {set.label}
              </button>
            ))}
          </div>

          {/* AI Hashtag Suggestions Coming Soon */}
          <div className="mb-8 w-full flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xs animate-pulse">AI</span>
              <span className="font-semibold text-gray-700">Hashtag Suggestions</span>
              <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-200 text-yellow-900 font-bold text-xs ml-2">Coming Soon</span>
            </div>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-400 font-semibold text-center cursor-not-allowed mb-2"
              placeholder="Describe your post or paste your caption..."
              disabled
            />
            <button
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold shadow-lg opacity-60 cursor-not-allowed"
              disabled
            >
              Generate Hashtags with AI (Coming Soon)
            </button>
          </div>

          {/* Trending Now Section */}
          <div className="mb-8 w-full flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold text-xs">Trending Now</span>
              <span className="text-gray-500 text-sm">on {PLATFORMS.find(p => p.value === platform)?.label}</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {TRENDING_HASHTAGS[platform].map(tag => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-xl bg-pink-50 text-pink-700 font-semibold text-sm shadow-sm">
                  {tag}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${HASHTAG_POPULARITY[platform][tag] === 'High' ? 'bg-green-200 text-green-800' : HASHTAG_POPULARITY[platform][tag] === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-700'}`}>{HASHTAG_POPULARITY[platform][tag]}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Copy Formatting Options */}
          <div className="mb-4 flex flex-wrap justify-center gap-2 w-full">
            <span className="text-sm text-gray-500 font-semibold mr-2">Copy Format:</span>
            {FORMATTING_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setFormat(opt.value)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-200 border-2 ${format === opt.value ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'}`}
                aria-pressed={format === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Hashtag List */}
          <div className="mb-4 flex flex-wrap gap-2 justify-center w-full">
            {hashtags.map(tag => {
              const isBanned = BANNED_HASHTAGS.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleCopyOne(tag)}
                  className={`px-3 py-1 rounded-xl font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-1
                    ${isBanned ? 'bg-gray-200 text-gray-400 line-through cursor-not-allowed' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}
                    ${copied === tag ? 'ring-2 ring-green-400 bg-green-50 text-green-700' : ''}`}
                  aria-label={`Copy ${tag}`}
                  disabled={isBanned}
                  title={isBanned ? 'This hashtag is banned or overused and should be avoided.' : undefined}
                >
                  {isBanned && <span className="text-red-500 mr-1" title="Banned/Overused">⚠️</span>}
                  {tag}
                  {/* Popularity badge for each hashtag */}
                  {HASHTAG_POPULARITY[platform][tag] && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${HASHTAG_POPULARITY[platform][tag] === 'High' ? 'bg-green-200 text-green-800' : HASHTAG_POPULARITY[platform][tag] === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-700'}`}>{HASHTAG_POPULARITY[platform][tag]}</span>
                  )}
                  {copied === tag && <span className="ml-1">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Save & Share Buttons */}
          <div className="mb-4 flex flex-col sm:flex-row gap-2 justify-center w-full">
            <button
              onClick={saveCurrentSet}
              className="px-4 py-2 rounded-xl bg-green-100 text-green-800 font-bold hover:bg-green-200 transition-colors duration-200 border-2 border-green-200"
              type="button"
            >
              💾 Save Set
            </button>
            <button
              onClick={handleCopyShareLink}
              className={`px-4 py-2 rounded-xl bg-blue-100 text-blue-800 font-bold hover:bg-blue-200 transition-colors duration-200 border-2 border-blue-200 ${copied === 'share' ? 'ring-2 ring-green-400 bg-green-50 text-green-700' : ''}`}
              type="button"
            >
              🔗 {copied === 'share' ? 'Link Copied!' : 'Copy Share Link'}
            </button>
          </div>

          {/* Copy All Button */}
          <button
            onClick={handleCopyAll}
            className={`w-full mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${copied === 'all' ? 'ring-2 ring-green-400 bg-green-600' : ''}`}
            aria-label="Copy all hashtags"
          >
            {copied === 'all' ? 'Copied!' : 'Copy All Hashtags'}
          </button>

          {/* Saved Sets Section */}
          {savedSets.length > 0 && (
            <div className="mb-8 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold text-xs">Saved Sets</span>
                <span className="text-gray-500 text-sm">(up to 10)</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {savedSets.map((set, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                    <span className="text-xs text-gray-700 font-mono truncate max-w-xs">{formatHashtags(set)}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(formatHashtags(set))}
                      className="ml-1 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-bold hover:bg-blue-200 transition-colors"
                      title="Copy this set"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent History Section */}
          {recentSets.length > 0 && (
            <div className="mb-8 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-bold text-xs">Recent History</span>
                <span className="text-gray-500 text-sm">(last 10 copied sets)</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {recentSets.map((set, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                    <span className="text-xs text-gray-700 font-mono truncate max-w-xs">{formatHashtags(set)}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(formatHashtags(set))}
                      className="ml-1 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-bold hover:bg-blue-200 transition-colors"
                      title="Copy this set"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
} 