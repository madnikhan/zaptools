import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Accessibility() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Accessibility Statement
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our commitment to making ZapTools accessible to everyone
            </p>
          </div>

          {/* Commitment Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              ZapTools is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the 
              relevant accessibility standards.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that technology should be accessible to everyone, regardless of their 
              abilities or the devices they use. Our goal is to provide an inclusive experience 
              that works for all users.
            </p>
          </div>

          {/* Standards Compliance */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Standards Compliance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">WCAG 2.1 Compliance</h3>
                <p className="text-gray-600 mb-4">
                  We strive to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, 
                  which include:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Perceivable content and interface elements</li>
                  <li>Operable user interface and navigation</li>
                  <li>Understandable information and operation</li>
                  <li>Robust content and compatibility</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Standards</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Section 508 compliance</li>
                  <li>ADA Title III requirements</li>
                  <li>Mobile accessibility standards</li>
                  <li>Keyboard navigation support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Accessibility Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl mb-4">👁️</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Visual Accessibility</h3>
                <p className="text-gray-600 text-sm">
                  High contrast options, resizable text, and clear typography for better readability
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl mb-4">⌨️</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Keyboard Navigation</h3>
                <p className="text-gray-600 text-sm">
                  Full keyboard accessibility with logical tab order and keyboard shortcuts
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl mb-4">🔊</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Screen Reader Support</h3>
                <p className="text-gray-600 text-sm">
                  Proper ARIA labels, semantic HTML, and screen reader-friendly content
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Mobile Accessibility</h3>
                <p className="text-gray-600 text-sm">
                  Touch-friendly interfaces and responsive design for all devices
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Color Considerations</h3>
                <p className="text-gray-600 text-sm">
                  Color is not used as the only way to convey information
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Performance</h3>
                <p className="text-gray-600 text-sm">
                  Fast loading times and optimized performance for assistive technologies
                </p>
              </div>
            </div>
          </div>

          {/* Testing */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Testing & Evaluation</h2>
            <p className="text-gray-600 mb-6">
              We regularly test our website for accessibility using a combination of automated tools 
              and manual testing methods:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Automated Testing</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Lighthouse accessibility audits</li>
                  <li>axe-core automated testing</li>
                  <li>WAVE Web Accessibility Evaluator</li>
                  <li>Continuous integration testing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Manual Testing</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Keyboard-only navigation testing</li>
                  <li>Screen reader compatibility</li>
                  <li>Color contrast verification</li>
                  <li>User experience testing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Feedback & Support</h2>
            <p className="text-gray-600 mb-6">
              We welcome your feedback on the accessibility of ZapTools. If you experience 
              accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>📧 Email: info@inventix-studio.online</li>
                  <li>📞 Phone: +1 (555) 123-4567</li>
                  <li>📝 Contact Form: <a href="/contact" className="text-blue-600 hover:underline">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Response Time</h3>
                <p className="text-gray-600">
                  We aim to respond to accessibility feedback within 2 business days. 
                  Your input helps us improve our services for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Continuous Improvement */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Continuous Improvement</h2>
            <p className="text-xl mb-6">
              Accessibility is an ongoing commitment. We continuously work to improve 
              our website's accessibility based on user feedback and evolving standards.
            </p>
            <p className="text-lg opacity-90">
              Last updated: June 2025
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
} 