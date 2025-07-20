import Link from 'next/link';
import SEOHead from '../components/SEOHead';

export default function Custom404() {
  return (
    <>
      <SEOHead title="404 – Page Not Found | Zaptools" description="Sorry, the page you are looking for does not exist. Find your way back to Zaptools." url="https://zaptools.tech/404" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-8">
        <div className="text-7xl font-black text-blue-500 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="mb-6 text-gray-600">Sorry, the page you are looking for does not exist or has been moved.</p>
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline font-semibold">Go to Homepage</Link>
        </div>
        <div className="text-left max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-2">Popular Tools</h2>
          <ul className="list-disc list-inside text-blue-600">
            <li><Link href="/tools/color-palette-generator">Color Palette Generator</Link></li>
            <li><Link href="/tools/word-counter">Word Counter</Link></li>
            <li><Link href="/tools/pdf-merger-splitter">PDF Merger & Splitter</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
} 