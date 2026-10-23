import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import BrandStory from './components/BrandStory';
import SignatureLady from './components/SignatureLady';

const MarqueeBanner = () => (
  <div className="bg-[#631D26] overflow-hidden" style={{ height: '44px' }}>
    <div className="flex items-center h-full" style={{ width: 'max-content', animation: 'marquee 35s linear infinite' }}>
      {Array.from({ length: 2 }).map((_, groupIndex) => (
        <div key={groupIndex} className="flex items-center whitespace-nowrap">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="flex items-center">
              <img
                src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/cc57d7ec2a805b76f96d99d4222225a2.png"
                alt="Bunmi Collection"
                className="h-5 w-auto object-contain mx-6"
              />
              <span className="text-white/50 text-xs">•</span>
            </span>
          ))}
        </div>
      ))}
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBanner />
        <FeaturedProducts />
        <SignatureLady />
        <BrandStory />
      </main>
      <Footer />
    </div>
  );
};

export default Home;