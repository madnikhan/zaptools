import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ForexAnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const closed = localStorage.getItem('forex-banner-closed');
    setVisible(!closed);
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('forex-banner-closed', '1');
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[100] flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-4 shadow-lg animate-fade-in-down" style={{ minHeight: 56 }}>
      <div className="flex items-center gap-4">
        <span className="text-lg md:text-xl">🚀 Forex AI Bot Coming Soon!</span>
        <Link href="/forex-ai-bot" className="bg-white text-orange-600 px-4 py-2 rounded-xl font-bold hover:bg-orange-100 transition-colors duration-200 ml-2" style={{ whiteSpace: 'nowrap' }}>
          Join Waitlist
        </Link>
      </div>
      <button onClick={handleClose} aria-label="Close banner" className="ml-4 text-white/80 hover:text-white text-2xl font-bold px-2 focus:outline-none">
        ×
      </button>
    </div>
  );
} 