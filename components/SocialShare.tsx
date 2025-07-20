"use client";
import { useState } from 'react';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  hashtags?: string[];
  className?: string;
}

export default function SocialShare({
  url = typeof window !== 'undefined' ? window.location.href : 'https://zaptools.tech',
  title = 'ZapTools - Free Online Tools',
  description = 'Convert, compress, and create with our free online tools. No sign-up required!',
  image = 'https://zaptools.tech/og-image.jpg',
  hashtags = ['zaptools', 'onlinetools', 'productivity'],
  className = ''
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
    description: encodeURIComponent(description),
    image: encodeURIComponent(image),
    hashtags: hashtags.join(',')
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareData.url}&text=${shareData.title}&hashtags=${shareData.hashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareData.url}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${shareData.url}&description=${shareData.description}&media=${shareData.image}`,
    whatsapp: `https://wa.me/?text=${shareData.title}%20${shareData.url}`,
    telegram: `https://t.me/share/url?url=${shareData.url}&text=${shareData.title}`
  };

  const handleShare = (platform: string) => {
    const shareUrl = shareUrls[platform as keyof typeof shareUrls];
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <span className="text-sm font-medium text-gray-700">Share:</span>
      
      {/* Facebook */}
      <button
        onClick={() => handleShare('facebook')}
        className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 group"
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
        </svg>
      </button>

      {/* Twitter/X */}
      <button
        onClick={() => handleShare('twitter')}
        className="w-10 h-10 bg-black rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 group"
        aria-label="Share on X (Twitter)"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.53 7.477l-4.79 6.37-4.79-6.37H2.5l6.5 8.5-6.5 8.5h5.45l4.8-6.37 4.8 6.37h5.45l-6.5-8.5 6.5-8.5z"/>
        </svg>
      </button>

      {/* LinkedIn */}
      <button
        onClick={() => handleShare('linkedin')}
        className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center hover:bg-blue-800 transition-colors duration-300 group"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>

      {/* Pinterest */}
      <button
        onClick={() => handleShare('pinterest')}
        className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center hover:bg-red-700 transition-colors duration-300 group"
        aria-label="Share on Pinterest"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.004 2.003c-5.514 0-9.997 4.484-9.997 9.997 0 4.418 2.865 8.166 6.908 9.497-.096-.807-.183-2.047.038-2.929.2-.803 1.287-5.122 1.287-5.122s-.329-.658-.329-1.631c0-1.527.886-2.669 1.99-2.669.938 0 1.391.705 1.391 1.551 0 .946-.603 2.36-.914 3.677-.26 1.099.553 1.995 1.638 1.995 1.965 0 3.478-2.072 3.478-5.062 0-2.646-1.904-4.5-4.624-4.5-3.154 0-5.012 2.364-5.012 4.81 0 .954.366 1.98.824 2.537.092.112.105.21.077.323-.084.34-.273 1.08-.31 1.229-.05.2-.162.243-.376.147-1.401-.573-2.273-2.372-2.273-3.819 0-3.112 2.263-6.687 6.759-6.687 3.633 0 6.033 2.62 6.033 5.44 0 3.74-2.08 6.53-5.156 6.53-1.033 0-2.006-.56-2.338-1.19l-.636 2.42c-.192.74-.712 1.668-1.062 2.234.8.247 1.646.381 2.53.381 5.514 0 9.997-4.484 9.997-9.997s-4.483-9.997-9.997-9.997z"/>
        </svg>
      </button>

      {/* WhatsApp */}
      <button
        onClick={() => handleShare('whatsapp')}
        className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center hover:bg-green-700 transition-colors duration-300 group"
        aria-label="Share on WhatsApp"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group ${
          copied 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-gray-600 hover:bg-gray-700'
        }`}
        aria-label="Copy link"
      >
        {copied ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
} 