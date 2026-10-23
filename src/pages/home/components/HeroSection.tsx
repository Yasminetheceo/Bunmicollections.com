import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#1a0a0a]">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 25%' }}
        >
          <source
            src="https://cdn.shopify.com/videos/c/o/v/13e23da3e66242ee87e13412702c8799.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Hero Content — fully centered */}
      <div className="relative min-h-screen flex flex-col items-center justify-end text-center px-4 pb-32">

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '680ms',
            transition: 'opacity 0.7s ease-out 0.68s, transform 0.7s ease-out 0.68s',
          }}
        >
          <a
            href="#bunmi-collection"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('bunmi-collection')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center px-8 sm:px-12 py-3.5 sm:py-4 bg-[#631D26] text-white font-['Inter'] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-[#4a2424] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            SHOP COLLECTION
          </a>

          <Link
            to="/hair-hub"
            className="inline-flex items-center px-8 sm:px-12 py-3.5 sm:py-4 bg-white text-[#631D26] font-['Inter'] font-medium text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-[#F5E6E8] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Start With a Consultation
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes heroDotPulse {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(212,175,55,0.6); }
          50% { transform: scale(1.6); opacity: 0.8; box-shadow: 0 0 0 6px rgba(212,175,55,0); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
