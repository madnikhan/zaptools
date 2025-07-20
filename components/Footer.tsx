import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">Z</span>
              </div>
              <div>
                <span className="text-2xl font-black">ZapTools</span>
                <div className="text-sm text-gray-400 -mt-1">Free Online Tools</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Convert, compress, and create — all in one place. No sign-up required, always free, 
              and designed for speed and simplicity.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors duration-300" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              {/* X (Twitter) */}
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-black transition-colors duration-300" aria-label="X (Twitter)">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 7.477l-4.79 6.37-4.79-6.37H2.5l6.5 8.5-6.5 8.5h5.45l4.8-6.37 4.8 6.37h5.45l-6.5-8.5 6.5-8.5z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-400 transition-colors duration-300" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.212 2.092-1.271 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.291 2.393 1.271 3.373.98.98 2.092 1.212 3.373 1.271C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.291 3.373-1.271.98-.98 1.212-2.092 1.271-3.373.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.291-2.393-1.271-3.373-.98-.98-2.092-1.212-3.373-1.271C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-red-600 transition-colors duration-300" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* Pinterest */}
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-red-500 transition-colors duration-300" aria-label="Pinterest">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2.003c-5.514 0-9.997 4.484-9.997 9.997 0 4.418 2.865 8.166 6.908 9.497-.096-.807-.183-2.047.038-2.929.2-.803 1.287-5.122 1.287-5.122s-.329-.658-.329-1.631c0-1.527.886-2.669 1.99-2.669.938 0 1.391.705 1.391 1.551 0 .946-.603 2.36-.914 3.677-.26 1.099.553 1.995 1.638 1.995 1.965 0 3.478-2.072 3.478-5.062 0-2.646-1.904-4.5-4.624-4.5-3.154 0-5.012 2.364-5.012 4.81 0 .954.366 1.98.824 2.537.092.112.105.21.077.323-.084.34-.273 1.08-.31 1.229-.05.2-.162.243-.376.147-1.401-.573-2.273-2.372-2.273-3.819 0-3.112 2.263-6.687 6.759-6.687 3.633 0 6.033 2.62 6.033 5.44 0 3.74-2.08 6.53-5.156 6.53-1.033 0-2.006-.56-2.338-1.19l-.636 2.42c-.192.74-.712 1.668-1.062 2.234.8.247 1.646.381 2.53.381 5.514 0 9.997-4.484 9.997-9.997s-4.483-9.997-9.997-9.997z"/></svg>
              </a>
            </div>
          </div>

          {/* Tools Section */}
          <div>
            <h3 className="text-lg font-bold mb-6">Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools/text-to-handwriting" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Text to Handwriting
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-merger-splitter" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Merge PDFs
                </Link>
              </li>
              <li>
                <Link href="/tools/image-compressor" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-code-generator" className="text-gray-400 hover:text-white transition-colors duration-300">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/word-counter" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="/tools/password-generator" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Password Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help-center" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/report-bug" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Report a Bug
                </Link>
              </li>
              <li>
                <Link href="/feature-request" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Feature Request
                </Link>
              </li>
              <li>
                <Link href="/api-documentation" className="text-gray-400 hover:text-white transition-colors duration-300">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@inventix-studio.online" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span className="text-xl">📧</span> info@inventix-studio.online
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <div>© 2025 ZapTools. All rights reserved. Made with ❤️ for the community.</div>
              <div className="mt-1 text-xs">A product of <a href="https://inventivebyte.com" className="text-blue-400 hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">InventiveByte LLC</a></div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/status" className="text-gray-400 hover:text-white transition-colors duration-300">
                Status
              </Link>
              <Link href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors duration-300">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors duration-300">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 