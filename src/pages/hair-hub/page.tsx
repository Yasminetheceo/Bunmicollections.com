import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const HairHubPage = () => {
  const [showAll, setShowAll] = useState(false);
  const blogPosts = [
    {
      id: 6,
      image: 'https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/9dbf93c4274aafc2ddd68fa1f1d98518.png',
      category: 'Hair Education',
      title: 'Raw Hair vs. Virgin Hair: Which One Is Actually Yours?',
      excerpt: 'They\'re often used as though they\'re the same thing — they\'re not. Here\'s what actually separates raw hair from virgin hair, and how to know which one belongs in your signature style.',
      readTime: '10 min read',
      link: '/hair-hub/raw-hair-vs-virgin-hair'
    },
    {
      id: 1,
      image: 'https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/fbcd3028c8fadc909809c5a3a0a92e34.jpeg',
      category: 'Hair Care',
      title: 'Hair Extensions for your Lifestyle',
      excerpt: 'Discover how to build a hair extension signature intentionally — one that fits your real life, your identity, and every version of who you are.',
      readTime: '8 min read',
      link: '/hair-hub/hair-extensions-for-your-lifestyle'
    },
    {
      id: 2,
      image: 'https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/6b50897d248df1fc0e0dcbe950600482.png',
      category: 'Hair Education',
      title: 'Popular Low-Maintenance Hair Textures for Busy Women in 2026',
      excerpt: 'Great hair that demands more maintenance than you bargained for is just as frustrating as poor quality hair. Here are the textures that keep up with your life.',
      readTime: '7 min read',
      link: '/hair-hub/how-to-care-for-your-hair-extensions'
    },
    {
      id: 3,
      image: 'https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/36211ad2357285b6c153a0c8cd8c76d6.jpeg',
      category: 'Hair Care',
      title: 'Intentional Hair Choices: A Complete Care Guide for Hair Extensions',
      excerpt: 'The money you spend is only one part of the equation. The greater investment lies in what follows — the knowledge you take in and the routines you stick to.',
      readTime: '10 min read',
      link: '/hair-hub/choosing-the-right-hair-texture'
    },
    {
      id: 4,
      image: 'https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/e698d4cc0984a4b61b619cb542bd1bcb.png',
      category: 'Hair Education',
      title: '4 Mistakes Ruining Your Hair Extensions Every Summer',
      excerpt: 'Summer heat, salt water, and humidity can ruin your extensions faster than you think. Learn the 4 common mistakes and how to protect your hair all season.',
      readTime: '9 min read',
      link: '/hair-hub/4-mistakes-ruining-your-hair-extensions-every-summer'
    },
    {
      id: 5,
      image: 'https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/9d41e8e2a2c28bcdc36229d0edf6c848.png',
      category: 'Hair Education',
      title: 'Your Summer Signature',
      excerpt: 'Explore two of our most versatile hair extension textures that give you a minimum of three distinct looks — from beach resort to fine dining within the same install.',
      readTime: '7 min read',
      link: '/hair-hub/your-summer-signature'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero - Minimal light style matching Shop page */}
      <section className="pt-32 pb-16 bg-[#FAF8F5] text-center">
        <p className="font-['Inter'] text-xs tracking-[0.3em] uppercase text-[#631D26] mb-4">
          The Bunmi Collection
        </p>
        <h1 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-[#1a1a1a] mb-5">
          Consultation Hub
        </h1>
        <p className="font-['Inter'] text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          A curated space for understanding hair extensions with clarity and confidence. Explore our articles on textures, care, and selection, or book a Signature Consultation for personalized guidance.
        </p>
      </section>

      {/* Consultation Section */}
      <section className="py-16 md:py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
                <img
                  src="https://cdn.shopify.com/s/files/1/0728/1138/0928/files/Signature_Consultation_Image_2_2.png?v=1773165540"
                  alt="Hair Consultation"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <p className="font-['Inter'] text-xs tracking-[0.3em] uppercase text-[#D19B6D] mb-3">
                Signature Style Consultation
              </p>
              <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl lg:text-5xl text-[#631D26] mb-6 leading-tight">
                Ready to Transform<br />Your Hair?
              </h2>
              <div className="space-y-4 mb-8">
                <p className="font-['Inter'] text-sm md:text-base text-gray-600 leading-relaxed">
                  A personalized, education-driven experience created for the woman who wants clarity before investing in extensions.
                </p>
                <p className="font-['Inter'] text-sm md:text-base text-gray-600 leading-relaxed">
                  We review your natural hair, lifestyle, maintenance preferences, and styling goals to determine which BUNMI texture will blend seamlessly with your hair.
                </p>
                <p className="font-['Inter'] text-sm md:text-base text-gray-600 leading-relaxed">
                  You'll leave with a clear texture recommendation, installation guidance, a purchase credit, and a curated sample set of all BUNMI textures — so you can feel and compare before committing.
                </p>
              </div>

              {/* Price badge */}
              <div className="flex items-stretch gap-0 mb-8 rounded-lg overflow-hidden border border-[#5D2E2E]/20">
                <div className="bg-[#631D26] text-white px-6 py-4 flex flex-col items-center justify-center min-w-[90px]">
                  <span className="font-['Bebas_Neue'] text-3xl leading-none">$75</span>
                  <span className="font-['Inter'] text-xs opacity-80 mt-1">per session</span>
                </div>
                <div className="flex-1 bg-[#FAF3EC] px-5 py-4 flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line text-[#D19B6D] text-base"></i>
                    <span className="font-['Inter'] text-sm text-gray-700">45 Minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-calendar-check-line text-[#D19B6D] text-base"></i>
                    <span className="font-['Inter'] text-sm text-gray-700">Limited Appointments Monthly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-gift-line text-[#D19B6D] text-base"></i>
                    <span className="font-['Inter'] text-sm text-gray-700">Includes Sample Set + Purchase Credit</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <a
                href="https://form.jotform.com/260684429009158"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#631D26] text-white px-8 py-4 rounded-lg font-['Inter'] font-medium text-base hover:bg-[#4A2424] transition-colors duration-300 whitespace-nowrap cursor-pointer text-center block"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl lg:text-5xl text-[#631D26] mb-4">
              Hair Extension Education&nbsp;
            </h2>
            <p className="font-['Inter'] text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Educational guides to help you choose, care for, and understand hair extensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(showAll ? blogPosts : blogPosts.slice(0, 3)).map((post) => (
              <article key={post.id} className="group cursor-pointer flex flex-col">
                <a href={post.link} className="flex flex-col flex-1">
                  {/* Image */}
                  <div className="w-full h-[260px] rounded-xl overflow-hidden mb-5">
                    {post.video ? (
                      <video
                        src={post.video}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ objectPosition: '50% 25%' }}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex flex-col flex-1 text-center px-2">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="font-['Inter'] text-[10px] tracking-[0.25em] uppercase text-[#D19B6D] border border-[#D19B6D] px-3 py-1 rounded-full whitespace-nowrap">{post.category}</span>
                      <span className="flex items-center gap-1.5 font-['Inter'] text-xs text-gray-400 whitespace-nowrap">
                        <i className="ri-time-line text-[#D19B6D]"></i>
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[#631D26] mb-3 group-hover:text-[#D19B6D] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed mb-5 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center justify-center gap-2 font-['Inter'] text-sm font-medium text-[#631D26] border-b border-[#631D26] pb-0.5 group-hover:text-[#D19B6D] group-hover:border-[#D19B6D] transition-colors duration-300 mx-auto">
                      Read Article
                      <i className="ri-arrow-right-line"></i>
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {/* More Articles Toggle */}
          {blogPosts.length > 3 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 font-['Inter'] text-sm font-medium text-[#631D26] border border-[#631D26] px-6 py-2.5 rounded-full hover:bg-[#631D26] hover:text-white transition-colors duration-300 whitespace-nowrap cursor-pointer"
              >
                More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HairHubPage;