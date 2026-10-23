import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

const ArticleSummerSignaturePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/9d41e8e2a2c28bcdc36229d0edf6c848.png"
          alt="Your Summer Signature - Hair Textures That Serve You All Summer"
          className="w-full h-full object-cover" style={{ objectPosition: '50% 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4">
          <span className="inline-block border border-[#D19B6D] text-[#D19B6D] px-5 py-1.5 text-[10px] font-['Inter'] font-semibold uppercase tracking-[0.25em] mb-5 rounded-full">
            Hair Education
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl lg:text-8xl text-white text-center leading-none max-w-5xl">
            Your Summer Signature
          </h1>
          <p className="font-['Inter'] text-sm md:text-base text-white/70 mt-4 max-w-xl text-center leading-relaxed">
            Explore hair extensions that serve you all summer — from beach resorts to fine dining, within the same install.
          </p>
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
              "Summer is too full and spontaneous to be limited to one look."
            </p>
          </div>

          {/* Introduction */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Introduction</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              When we think of summer, there's this splash of bright colors that pops up in our minds. We're thinking: sunny outdoors, vacations, hangouts. It comes with that good, wholesome feeling of having somewhere to be and looking forward to it. It's spontaneous, it's vibrant, and it demands a look that can keep up.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              And if you're reading this, you likely have at least one place to be this summer. A beach resort. A wedding. A fine diner. A girls' trip that's been in the group chat since February. Most of us are already building mood boards for each of these moments. The outfits, the accessories, the hair — all summing up to the perfect summer experience. So yes, the pressure is real. "What hair extension do I get for the summer?" is one of the top questions we ask ourselves at this time of year.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Here's where many ladies get it wrong. They invest in a beautiful texture that works perfectly for one or two occasions, but isn't as versatile for most of the summer. One install that looks gorgeous at the beach and looks out of place at a wedding the following weekend. Summer is too full and spontaneous to be limited to one look.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              And so for this reason, we're walking you through two of our top versatile hair extensions for the summer, that don't just look beautiful but provide a range in style. We're talking a minimum of three distinct looks per texture, each one ready to match wherever summer takes you, from that beach resort to a fine dining restaurant within the same install.
            </p>
          </section>

          {/* BUNMI WAVE Section */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-2xl tracking-[0.2em] text-[#631D26] uppercase">BUNMI Wave</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              If there's one texture that was made for summer, it's the BUNMI Wave. In its natural state, it falls into loose, effortless waves — the perfect look for a beach vacation. It's breathtaking, and it belongs at every outdoor setting summer has to offer: beach resorts, garden picnics, brunches, waterfall hikes, a lazy afternoon at the park. There's zero effort required, simply because it's in its natural element.
            </p>

            {/* Image: BUNMI Wave Natural */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden my-8">
              <img
                src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/8bbea4e38e116d22af85122f16edb71e.png"
                alt="BUNMI Wave in its natural state — loose effortless waves"
                className="w-full h-full object-cover" style={{ objectPosition: '50% 30%' }}
              />
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              But here's where it earns its place as one of summer's most versatile textures. The same wavy texture, when curled, becomes a different look entirely. Full, defined, bombshell curls that look good at a dinner, red carpet, or a black-tie wedding. The curls hold their shape all day, whether you go the heat route or opt for heatless curlers.
            </p>

            {/* Image: BUNMI Wave Curled */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden my-8">
              <img
                src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/41f62718ecf58686ac3bc389817554fc.png"
                alt="BUNMI Wave curled — full defined bombshell curls"
                className="w-full h-full object-cover" style={{ objectPosition: '50% 30%' }}
              />
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Lastly, when you want something in between that's polished but effortless, you may opt for a sleek front curl using its closure, with the rest of your hair straightened into a bun. This chic style goes well with both formal and casual settings. You may as well pull it into a sleek ponytail on the days you want to avoid the heat entirely and still show up beautifully.
            </p>

            {/* Image: BUNMI Wave Sleek */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden my-8">
              <img
                src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/e64de835d17c6eee829283a6f04b2cf0.png"
                alt="BUNMI Wave with sleek front curl and bun"
                className="w-full h-full object-cover" style={{ objectPosition: '50% 30%' }}
              />
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              It's practical for you if you are physically active throughout the summer. Perhaps you enjoy hikes, camping, or amusement parks. This way, you get to keep the heat out while still maintaining the same polished presence.
            </p>

            {/* Image: BUNMI Wave Ponytail */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden my-8">
              <img
                src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/fe65aa89c67a615a2dd824da52756de1.png"
                alt="BUNMI Wave pulled into a sleek ponytail for active summer days"
                className="w-full h-full object-cover" style={{ objectPosition: '50% 30%' }}
              />
            </div>

            {/* Tips from BUNMI - Wave */}
            <div className="bg-[#FAF8F5] rounded-xl p-8 mb-6 border border-[#D19B6D]/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-['Bebas_Neue'] text-lg tracking-[0.15em] text-[#D19B6D] uppercase">How to Repurpose Your BUNMI Wave</span>
                <span className="flex-1 h-[1px] bg-[#D19B6D]/30" />
              </div>
              <ul className="space-y-5">
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">1</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    <strong className="text-[#631D26]">Natural Waves —</strong> Wear it as-is for beach resorts, garden picnics, brunches, and outdoor settings. Zero effort, maximum impact.
                  </p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">2</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    <strong className="text-[#631D26]">Bombshell Curls —</strong> Curl it for dinners, red carpet events, and black-tie weddings. The curls hold all day with heat or heatless curlers.
                  </p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">3</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    <strong className="text-[#631D26]">Sleek & Polished —</strong> Go for a sleek front curl with a bun or ponytail for formal occasions, active days, hikes, or whenever you want the heat off your neck.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* BUNMI KINKY CURLY Section */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-2xl tracking-[0.2em] text-[#631D26] uppercase">BUNMI Kinky Curly</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              If the BUNMI Wave is your "elegant" go-to, the BUNMI Kinky Curly is your "bold" one. Kinky curly brings the kind of fullness and personality that summer calls for. An absolute essential for you if you love volume and you're looking for a good blend with your type 4 natural hair.
            </p>


            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              In its natural curl pattern, the BUNMI Kinky Curly gives you defined, beautiful curls that give volume to your summer looks. It's the kind of texture that makes a statement without trying — full, confident, and unapologetically bold.
            </p>

            {/* Image: Kinky Curly Look 2 */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden my-8">
              <img
                src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/4a707bc89356a876a3f1bc530f85d727.png"
                alt="BUNMI Kinky Curly styled — versatile summer look"
                className="w-full h-full object-cover" style={{ objectPosition: '50% 30%' }}
              />
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              If you prefer volume without the curls, you may also blow-dry your curls out to achieve a fuller, straighter look. The amazing part about this is that all textures always return to their natural state when washed. So don't be afraid to blow-dry — your texture is resilient and will bounce right back.
            </p>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              And for a third dimension entirely, flexi rods give you a new curl pattern on demand. You get looser curls that sit between their natural state and blow-dry — offering yet another distinct look from the same texture.
            </p>

            {/* Image: Kinky Curly Look 1 */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden my-8">
              <img
                src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/feee647b958fe4b2c3fa466203c8d1d8.png"
                alt="BUNMI Kinky Curly natural curls — defined and bold"
                className="w-full h-full object-cover" style={{ objectPosition: '50% 30%' }}
              />
            </div>


            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              However, your curls love moisture, and summer can sometimes work against that. A little extra care goes a long way. Keeping the curls hydrated and refreshed means they'll maintain their definition and stay gorgeous throughout the season, not just the first week.

Here’s how you can show up in your BUNMI Kinky Curly this summer.
            </p>

          </section>

          {/* Conclusion */}
          <section className="py-12 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Conclusion</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Summer comes with spontaneity and a full social calendar, and these textures help you move confidently through it all. They make choosing the right summer install simpler and less time-consuming due to their versatility — minimum three looks per texture, each ready to match wherever the season takes you.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              The BUNMI Wave gives you elegance and range: effortless beach waves, bombshell curls for formal evenings, and sleek polished styles for active days. The BUNMI Kinky Curly brings boldness and volume: defined natural curls, voluminous blow-dry looks, and soft flexi rod patterns — all from one texture.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              With either texture, you're never stuck with just one look. You walk into every summer moment — beach resort, wedding, dinner, brunch — feeling fully yourself, fully prepared, and fully unforgettable.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              Summer is calling, and you need a signature style that elevates you all through the season. The right texture doesn't just complete your look — it frees you to enjoy every moment without worrying about whether your hair will keep up.
            </p>

            {/* Closing Pull Quote */}
            <div className="my-10 pl-6 border-l-4 border-[#D19B6D] bg-[#FAF8F5] py-6 pr-6 rounded-r-lg">
              <p className="font-['Inter'] text-lg text-gray-700 leading-[1.9] italic">
                You walk into every summer moment feeling fully yourself, fully prepared, and fully unforgettable.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <div className="mt-4 mb-8 bg-[#FAF8F5] rounded-xl overflow-hidden">
            <div className="px-10 py-12 text-center">
              <span className="inline-block w-10 h-[2px] bg-[#D19B6D] mb-6" />
              <h3 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#631D26] mb-3">
                Book Your Signature Style Consultation
              </h3>
              <p className="font-['Inter'] text-sm text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Get personalized expert advice for your hair this summer, plus a sample set of every BUNMI texture delivered to your doorstep.
              </p>
              <a
                href="https://form.jotform.com/260684429009158"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#631D26] text-white px-10 py-4 rounded-full font-['Inter'] font-medium text-sm tracking-widest uppercase hover:bg-[#4A1A20] transition-colors duration-300 whitespace-nowrap cursor-pointer"
              >
                Book Consultation
              </a>
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

export default ArticleSummerSignaturePage;