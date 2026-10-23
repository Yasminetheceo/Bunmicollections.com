import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

interface ProductImage {
  id: string;
  image: string;
  imageAlt: string;
  name: string;
}

const SUPABASE_URL = 'https://evrirvmydyritseahgmk.supabase.co/functions/v1/featured-products';

const KINKY_EXTRA_IMAGES = [
  'https://storage.readdy-site.link/project_files/8b56b708-1c0b-4207-bad0-cfa098753cfc/6ca7f6d2-ae3c-4b66-ad16-52e01166881c_CGtSt86I.jpeg?v=caf736852e6b2c38963f9b533d7481c9',
  'https://storage.readdy-site.link/project_files/8b56b708-1c0b-4207-bad0-cfa098753cfc/efc72de8-ae60-4e58-aae2-9bea0e225130_Lb9Rd6UL.png?v=afbd583ce771b8371e98eadcffd896dd',
];

const WAVE_IMAGES = [
  'https://storage.readdy-site.link/project_files/8b56b708-1c0b-4207-bad0-cfa098753cfc/4ab3f21d-94e7-48b9-9a4e-0107f42e67e3_4iGuwGri.jpeg?v=192a9c0122172e8029af0bedfb7741b5',
  'https://storage.readdy-site.link/project_files/8b56b708-1c0b-4207-bad0-cfa098753cfc/937b212a-888a-4baf-b4e8-b50dd93d3dab_CT4wgA1o.jpeg?v=6b4f9c26206a4b2315bf5df3a4e61a29',
];

const ArticleCarePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [productImages, setProductImages] = useState<Record<string, ProductImage>>({});
  const [kinkySlideIndex, setKinkySlideIndex] = useState(0);
  const [waveSlideIndex, setWaveSlideIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch(SUPABASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, ProductImage> = {};
        (data.products ?? []).forEach((p: any) => {
          const title = (p.name ?? '').toLowerCase();
          if (title.includes('kinky straight')) {
            map['kinky-straight'] = { id: p.id, image: p.image, imageAlt: p.imageAlt, name: p.name };
          } else if (title.includes('wave') || title.includes('wavy')) {
            map['wave'] = { id: p.id, image: p.image, imageAlt: p.imageAlt, name: p.name };
          }
        });
        setProductImages(map);
      })
      .catch(() => {});
  }, []);

  const getProductLink = (key: string) => {
    const p = productImages[key];
    if (!p) return '/shop';
    const numericId = p.id.split('/').pop();
    return `/shop/${numericId}`;
  };

  const kinkyImg = productImages['kinky-straight']?.image;
  const kinkyAlt = productImages['kinky-straight']?.imageAlt ?? 'BUNMI Kinky Straight';
  const waveImg = productImages['wave']?.image;
  const waveAlt = productImages['wave']?.imageAlt ?? 'BUNMI Wave';

  const kinkySlides = KINKY_EXTRA_IMAGES;

  const prevKinky = useCallback(() => {
    setKinkySlideIndex((i) => (i - 1 + kinkySlides.length) % kinkySlides.length);
  }, [kinkySlides.length]);

  const nextKinky = useCallback(() => {
    setKinkySlideIndex((i) => (i + 1) % kinkySlides.length);
  }, [kinkySlides.length]);

  useEffect(() => {
    const timer = setInterval(nextKinky, 3500);
    return () => clearInterval(timer);
  }, [nextKinky]);

  const nextWave = useCallback(() => {
    setWaveSlideIndex((i) => (i + 1) % WAVE_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextWave, 3500);
    return () => clearInterval(timer);
  }, [nextWave]);

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#631D26] z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src="https://storage.readdy-site.link/project_files/8b56b708-1c0b-4207-bad0-cfa098753cfc/910b03cd-3b0b-4f16-a129-efcb683c3bee_0KnGyraV.jpeg?v=dd89115422cd5a44b72db7474b25c11a"
          alt="Popular Low-Maintenance Hair Textures for Busy Women in 2026"
          className="w-full h-full object-cover" style={{ objectPosition: '50% 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4">
          <span className="inline-block border border-[#D19B6D] text-[#D19B6D] px-5 py-1.5 text-[10px] font-['Inter'] font-semibold uppercase tracking-[0.25em] mb-5 rounded-full">
            Hair Education
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl lg:text-8xl text-white text-center leading-none max-w-5xl">
            Popular Low-Maintenance<br />Hair Textures for Busy Women
          </h1>
          <div className="flex items-center gap-4 mt-6 text-white/60 text-xs font-['Inter'] tracking-widest uppercase">
            <span>Bunmi Collection</span>
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            <span>Hair Education</span>
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            <span>7 min read</span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="pb-24">
        <div className="max-w-[720px] mx-auto px-6 lg:px-0">

          {/* Intro Pull Quote */}
          <div className="py-14 border-b border-gray-100">
            <p className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[#631D26] leading-snug text-center">
              "Explore hair textures that keep up with your life."
            </p>
          </div>

          {/* Introduction */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Introduction</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Hair extensions have been a part of many women's lives for a long time now. Still, if there's one thing you may have just started to realize, it's that great quality hair that demands more maintenance than you bargained for is, for you, just as frustrating as poor quality hair.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Or maybe you haven't quite put your finger on it yet. You just know that your premium hair investment doesn't always feel premium, and you're not sure why. That's because that feeling is not attached to the hair alone, but to how it works for you. Think about your skincare routine. You could pick up the most expensive, highest-quality serum on the shelf, and it still won't do what you need it to if it's missing the specific ingredient your skin actually needs right now. It is a quality product, but without the right fit, it just sits on your skin or, in the worst-case scenario, damages it. Your extensions work the same way. Your hair can be excellent, and still not work for you if the texture isn't in your maintenance range.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              More women in 2026 are searching for low-maintenance hair due to our current realities. Our lives are fuller, with busier schedules and bigger dreams. We have so much to think about: our careers, family, relationships, long-term goals, and everything else competing for your time and energy. So, when the hair investment you paid good money for consistently takes a lot more time and effort, it stops feeling like something meant for you.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              If you're currently working on balancing your time and protecting your energy, low-maintenance textures like these are essential for helping you gain more control over your day.
            </p>
          </section>

          {/* Kinky Straight Section */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Premium Kinky Straight Textures</h2>
            </div>
            <p className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#D19B6D] mb-8 ml-11">
              Featuring the Signature Collection &mdash; BUNMI Kinky Straight
            </p>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              The sudden buzz for kinky textures in recent years definitely comes with its reasons. Aside from the fact that many ladies with Type 4 hair absolutely love kinky textures for their seamless natural blend, their straight options are super simple to maintain. Honestly, when we say low-maintenance with this texture, we mean it in the most literal sense.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Here's what women in 2026 are loving the most about the texture, and precisely why they are choosing it:
            </p>

            {/* Benefits List */}
            <div className="space-y-5 mb-10">
              <div className="flex gap-5 items-start">
                <span className="font-['Bebas_Neue'] text-4xl text-[#631D26]/10 leading-none select-none flex-shrink-0 w-10 text-right">1</span>
                <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] pt-1">
                  It requires very few products, so you can leave your product drawer closed. A lot of items you'd typically pick off the shelf, such as waxes, mousses, gels, and holding sprays, are hardly needed for the Kinky Straight. This means simpler morning routines for you.
                </p>
              </div>
              <div className="flex gap-5 items-start">
                <span className="font-['Bebas_Neue'] text-4xl text-[#631D26]/10 leading-none select-none flex-shrink-0 w-10 text-right">2</span>
                <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] pt-1">
                  These textures also provide a lot of volume without the excess weight on your head. Each bundle of BUNMI Kinky Straight weighs only 3–3.5 oz, making it extremely lightweight for the fullness it provides. You get to look like you have a lot of hair without the heaviness.
                </p>
              </div>
              <div className="flex gap-5 items-start">
                <span className="font-['Bebas_Neue'] text-4xl text-[#631D26]/10 leading-none select-none flex-shrink-0 w-10 text-right">3</span>
                <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] pt-1">
                  It tolerates heat styling. Premium kinky textures are very friendly when it comes to straightening and tonging. Despite its original straight state, it can be layered and curled to achieve multiple low-maintenance looks.
                </p>
              </div>
              <div className="flex gap-5 items-start">
                <span className="font-['Bebas_Neue'] text-4xl text-[#631D26]/10 leading-none select-none flex-shrink-0 w-10 text-right">4</span>
                <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] pt-1">
                  It lasts you a really long time. Our BUNMI Kinky Straight specifically has been tested to last for more than 4 years with the right care. This isn't just about longevity; it means less spending, fewer installs, and less decision fatigue in the long run.
                </p>
              </div>
              <div className="flex gap-5 items-start">
                <span className="font-['Bebas_Neue'] text-4xl text-[#631D26]/10 leading-none select-none flex-shrink-0 w-10 text-right">5</span>
                <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] pt-1">
                  Our BUNMI Kinky Straight comes with an extra-low-maintenance edge and closure options up to 7x7 inches, which is one of the largest available. With this, you can achieve a full, natural-looking frontal result without actually installing a frontal.
                </p>
              </div>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              If you don't fancy spending hours on high-maintenance extensions and you're ready to have more control over your time and energy without compromising how you show up, this texture is a great start. And when we say so, we don't mean a "good for now" start, but one that stays good for a long time.
            </p>

            {/* Product Highlight — Kinky Straight */}
            <div className="bg-[#631D26] text-white rounded-xl overflow-hidden">
              <div className="px-8 py-3 bg-[#4A1A20]">
                <p className="font-['Bebas_Neue'] text-xs tracking-[0.3em] text-[#D19B6D] uppercase">Product Highlight</p>
              </div>
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Slideshow */}
                <div className="relative w-full md:w-48 h-72 md:h-auto flex-shrink-0 bg-[#4A1A20] overflow-hidden">
                  {kinkySlides.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`${kinkyAlt} ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                      style={{
                        opacity: idx === kinkySlideIndex ? 1 : 0,
                        objectPosition: idx === 0 ? 'center 32%' : 'top center',
                        transform: idx === 0 ? 'scale(1.3)' : 'scale(1)',
                        transformOrigin: 'center center',
                      }}
                    />
                  ))}
                  {kinkySlides.length === 0 && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-[#D19B6D]/40 border-t-[#D19B6D] rounded-full animate-spin" />
                    </div>
                  )}
                  {/* Dots */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {kinkySlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setKinkySlideIndex(idx)}
                        className="w-1.5 h-1.5 rounded-full transition-colors cursor-pointer"
                        style={{ background: idx === kinkySlideIndex ? '#D19B6D' : 'rgba(255,255,255,0.4)' }}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-1 px-8 py-7 flex flex-col justify-center">
                  <p className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#D19B6D] mb-2">Signature Collection</p>
                  <h3 className="font-['Bebas_Neue'] text-3xl text-white mb-3">The BUNMI Kinky Straight</h3>
                  <p className="font-['Inter'] text-sm text-white/75 leading-relaxed mb-6">
                    The BUNMI Kinky Straight is part of our signature collection for this reason, and if that's the standard you're holding your hair to, this texture is just one click away.
                  </p>
                  <Link
                    to={getProductLink('kinky-straight')}
                    className="inline-flex items-center gap-2 font-['Inter'] text-sm font-medium text-[#D19B6D] border-b border-[#D19B6D] pb-0.5 hover:text-white hover:border-white transition-colors duration-300 whitespace-nowrap w-fit cursor-pointer"
                  >
                    Discover the BUNMI Kinky Straight
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Wavy Textures Section */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Premium Wavy Textures</h2>
            </div>
            <p className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#D19B6D] mb-8 ml-11">
              Featuring the Signature Collection &mdash; BUNMI Wave
            </p>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              This texture tops the chart for both low maintenance and longevity. Compared to curly textures, this texture offers a bit of bounce without the kind of maintenance curly hair demands. Here's why BUNMI ladies are choosing this texture:
            </p>

            {/* Benefits List */}
            <div className="space-y-5 mb-10">
              <div className="flex gap-5 items-start">
                <span className="font-['Bebas_Neue'] text-4xl text-[#631D26]/10 leading-none select-none flex-shrink-0 w-10 text-right">1</span>
                <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] pt-1">
                  The waves hold up without much of your effort. You won't have to constantly prep your curl pattern throughout the day, especially in formal settings where every woman's wish is just for their hair to "behave."
                </p>
              </div>
              <div className="flex gap-5 items-start">
                <span className="font-['Bebas_Neue'] text-4xl text-[#631D26]/10 leading-none select-none flex-shrink-0 w-10 text-right">2</span>
                <div className="pt-1">
                  <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-3">
                    It performs perfectly during heat styling and just as well with heatless curlers. If you're not a fan of sitting down for a curling session or you have difficulty using a tong at home, investing in heatless curlers is a low-maintenance add-on that works well with this texture.
                  </p>
                  <div className="pl-5 border-l-4 border-[#D19B6D] bg-[#FAF8F5] py-4 pr-5 rounded-r-lg">
                    <p className="font-['Inter'] text-sm text-gray-600 leading-relaxed italic">
                      PS. Since you're here, we'll share this with you first: Our heatless curlers are on the way! They're currently being refined to meet our standard, and will be ready for you soon.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <span className="font-['Bebas_Neue'] text-4xl text-[#631D26]/10 leading-none select-none flex-shrink-0 w-10 text-right">3</span>
                <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] pt-1">
                  It maintains a similar maintenance range as the Kinky Straight. It requires minimal product and lasts more than 4 years with consistent care.
                </p>
              </div>
              <div className="flex gap-5 items-start">
                <span className="font-['Bebas_Neue'] text-4xl text-[#631D26]/10 leading-none select-none flex-shrink-0 w-10 text-right">4</span>
                <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] pt-1">
                  It also comes with closure sizes up to 7x7 inches, which takes care of the need for a full frontal install. This means less time and cost spent on your install.
                </p>
              </div>
            </div>

            {/* Product Highlight — Wave */}
            <div className="bg-[#631D26] text-white rounded-xl overflow-hidden">
              <div className="px-8 py-3 bg-[#4A1A20]">
                <p className="font-['Bebas_Neue'] text-xs tracking-[0.3em] text-[#D19B6D] uppercase">Product Highlight</p>
              </div>
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Slideshow */}
                <div className="relative w-full md:w-48 h-72 md:h-auto flex-shrink-0 bg-[#4A1A20] overflow-hidden">
                  {WAVE_IMAGES.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`${waveAlt} ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                      style={{
                        opacity: idx === waveSlideIndex ? 1 : 0,
                        objectPosition: idx === 0 ? 'center 25%' : 'top center',
                        transform: idx === 0 ? 'scale(1.3)' : 'scale(1)',
                        transformOrigin: 'center center',
                      }}
                    />
                  ))}
                  {/* Dots */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {WAVE_IMAGES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setWaveSlideIndex(idx)}
                        className="w-1.5 h-1.5 rounded-full transition-colors cursor-pointer"
                        style={{ background: idx === waveSlideIndex ? '#D19B6D' : 'rgba(255,255,255,0.4)' }}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-1 px-8 py-7 flex flex-col justify-center">
                  <p className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#D19B6D] mb-2">Signature Collection</p>
                  <h3 className="font-['Bebas_Neue'] text-3xl text-white mb-3">The BUNMI Wave</h3>
                  <p className="font-['Inter'] text-sm text-white/75 leading-relaxed mb-6">
                    If you want the same low-maintenance benefits while exploring a sleeker texture, perhaps for your formal occasions, the BUNMI Wave is a texture that lets you show up confident with little effort.
                  </p>
                  <Link
                    to={getProductLink('wave')}
                    className="inline-flex items-center gap-2 font-['Inter'] text-sm font-medium text-[#D19B6D] border-b border-[#D19B6D] pb-0.5 hover:text-white hover:border-white transition-colors duration-300 whitespace-nowrap w-fit cursor-pointer"
                  >
                    Discover the BUNMI Wave
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="py-12 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Conclusion</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              At the end of the day, it's all about finding hair textures that align with your maintenance limits. When it does, it doesn't just enhance your appearance; it also improves how you feel throughout the day and how much mental space you conserve. On a final note, it influences how you carry yourself in the rooms you're in.
            </p>

            {/* Closing Pull Quote */}
            <div className="my-10 pl-6 border-l-4 border-[#D19B6D] bg-[#FAF8F5] py-6 pr-6 rounded-r-lg">
              <p className="font-['Inter'] text-lg text-gray-700 leading-[1.9] italic">
                If you've pictured any of these textures on you, explore our full collection.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <div className="mt-4 mb-8 bg-[#FAF8F5] rounded-xl overflow-hidden">
            <div className="px-10 py-12 text-center">
              <span className="inline-block w-10 h-[2px] bg-[#D19B6D] mb-6" />
              <h3 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#631D26] mb-3">
                Ready to Find Your Signature Style?
              </h3>
              <p className="font-['Inter'] text-sm text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Browse the collection and let's help you find your signature style.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-[#631D26] text-white px-10 py-4 rounded-full font-['Inter'] font-medium text-sm tracking-widest uppercase hover:bg-[#4A2323] transition-colors duration-300 whitespace-nowrap cursor-pointer"
              >
                Browse Collection
              </Link>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center pb-4">
            <Link
              to="/hair-hub"
              className="inline-flex items-center gap-2 font-['Inter'] text-sm text-[#9B7B6A] hover:text-[#631D26] transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-arrow-left-line text-base"></i>
              Back to Hair Hub
            </Link>
          </div>

        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticleCarePage;
