import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

export default function AboutUs() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZapTools",
    "url": "https://zaptools.tech",
    "logo": "https://zaptools.tech/logo.png",
    "description": "Free online tools for productivity, file conversion, and digital tasks. No registration required, always free.",
    "parentOrganization": {
      "@type": "Organization",
      "name": "InventiveByte LLC",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1001 S. Main St. STE 600",
        "addressLocality": "Kalispell",
        "addressRegion": "MT",
        "postalCode": "59901",
        "addressCountry": "US"
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@inventix-studio.online"
    }
  };

  return (
    <>
      <SEOHead 
        title="About Us"
        description="Learn about ZapTools, a free online toolkit created by InventiveByte LLC. Discover our mission to provide powerful, accessible tools for everyone."
        keywords="about zaptools, inventivebyte llc, free online tools, company information, mission statement"
        url="https://zaptools.tech/about-us"
        structuredData={structuredData}
      />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              About ZapTools
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering productivity through free, accessible online tools
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At ZapTools, we believe that powerful digital tools should be accessible to everyone, regardless of their technical expertise or budget. Our mission is to provide a comprehensive suite of free online utilities that help individuals and businesses work more efficiently.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We're committed to creating tools that are not only powerful and reliable but also intuitive and user-friendly. No downloads, no registrations, no hidden costs—just pure productivity at your fingertips.
            </p>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">ZapTools</h3>
                <p className="text-gray-600 mb-4">
                  ZapTools is a comprehensive online toolkit designed to streamline your digital workflow. We focus on creating tools that solve real problems with simplicity and efficiency.
                </p>
                <div className="space-y-2 text-gray-600">
                  <div>🌐 <strong>Website:</strong> <a href="https://zaptools.tech" className="text-blue-600 hover:underline">zaptools.tech</a></div>
                  <div>📧 <strong>Email:</strong> <a href="mailto:info@inventix-studio.online" className="text-blue-600 hover:underline">info@inventix-studio.online</a></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Parent Company</h3>
                <p className="text-gray-600 mb-4">
                  ZapTools is proudly developed and maintained by InventiveByte LLC, a technology company dedicated to creating innovative digital solutions.
                </p>
                <div className="space-y-2 text-gray-600">
                  <div>🏢 <strong>Company:</strong> InventiveByte LLC</div>
                  <div>📍 <strong>Address:</strong> 1001 S. Main St. STE 600</div>
                  <div>🏙️ <strong>City:</strong> Kalispell, MT 59901</div>
                  <div>🌍 <strong>Country:</strong> USA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl mb-4">🔓</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Accessibility</h3>
                <p className="text-gray-600 text-sm">
                  We believe everyone deserves access to powerful tools, regardless of their technical background or financial situation.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Simplicity</h3>
                <p className="text-gray-600 text-sm">
                  Complex problems deserve simple solutions. We focus on creating intuitive tools that just work.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy</h3>
                <p className="text-gray-600 text-sm">
                  Your data stays yours. We process everything locally and never store your files or information.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              ZapTools is developed by a dedicated team of engineers, designers, and product specialists at InventiveByte LLC. We're passionate about creating tools that make a difference in people's daily workflows.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team combines technical expertise with user-centered design principles to deliver tools that are both powerful and easy to use. We're constantly learning, iterating, and improving based on user feedback and emerging technologies.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl mb-6">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                Contact Us
              </a>
              <a 
                href="/feature-request" 
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                Request Feature
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
} 