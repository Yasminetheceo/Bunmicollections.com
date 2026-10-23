import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import {
  SectionHeading,
  TwoWaySplit,
  ChoiceColumns,
  Callout,
  AskYourself,
} from './components/ArticleBlocks';

const sections = [
  { id: 'what-they-mean', label: 'What They Mean' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'budget', label: 'Budget' },
  { id: 'experience', label: 'Experience' },
  { id: 'over-time', label: 'Over Time' },
  { id: 'which-yours', label: 'Which Is Yours?' },
  { id: 'bunmi-raw', label: 'BUNMI Raw Straight' },
];

const ArticleRawVsVirginPage = () => {
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

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
          src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/2e81eab4c679b912a03427eff160d204.png"
          alt="Raw Hair vs Virgin Hair - Which One Is Actually Yours"
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4">
          <span className="inline-block border border-[#D19B6D] text-[#D19B6D] px-5 py-1.5 text-[10px] font-['Inter'] font-semibold uppercase tracking-[0.25em] mb-5 rounded-full">
            Hair Education
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl lg:text-8xl text-white text-center leading-none max-w-5xl">
            Raw Hair vs. Virgin Hair:<br />Which One Is Actually Yours?
          </h1>
          <div className="flex items-center gap-4 mt-6 text-white/60 text-xs font-['Inter'] tracking-widest uppercase">
            <span>Bunmi Collection</span>
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            <span>Hair Education</span>
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            <span>10 min read</span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="pb-24">
        <div className="max-w-[720px] mx-auto px-6 lg:px-0">

          {/* Intro Pull Quote */}
          <div className="py-14 border-b border-gray-100">
            <p className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[#631D26] leading-snug text-center">
              "The difference isn't quality. It's about what they're made for."
            </p>
          </div>

          {/* Jump to Section */}
          <div className="py-10 border-b border-gray-100">
            <p className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#9B7B6A] mb-5">Jump to a section</p>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className="font-['Inter'] text-xs font-medium text-[#631D26] border border-[#631D26]/30 px-4 py-2 rounded-full hover:bg-[#631D26] hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Introduction */}
          <section className="py-12 border-b border-gray-100">
            <SectionHeading>Introduction</SectionHeading>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              You&rsquo;ve probably seen &ldquo;raw hair&rdquo; and &ldquo;virgin hair&rdquo; used as though they&rsquo;re two names for the same thing. They&rsquo;re not.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              And if you&rsquo;re deciding what belongs in your collection, that difference matters. Not because one is automatically better, but because they offer two very different hair experiences.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              <strong className="text-[#631D26] font-semibold">Virgin hair</strong> gives you a consistent look you already know you love. <strong className="text-[#631D26] font-semibold">Raw hair</strong> gives you the freedom to style it to your own preference.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              One is made for the woman who knows the exact look she wants. The other is for the woman who wants something more natural &mdash; hair she can shape into her own signature.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-6">
              So the question isn&rsquo;t &ldquo;Which one is better?&rdquo; It&rsquo;s &ldquo;Which one is actually for me?&rdquo;
            </p>
            <Callout>
              In this guide, we&rsquo;re breaking down what separates raw hair from virgin hair, and helping you decide which one belongs in your signature style.
            </Callout>
          </section>

          {/* What They Mean */}
          <section id="what-they-mean" className="py-12 border-b border-gray-100">
            <SectionHeading>First, What Do &ldquo;Raw&rdquo; and &ldquo;Virgin&rdquo; Actually Mean?</SectionHeading>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Before we talk about which one belongs in your collection, let&rsquo;s clear up what these two terms actually mean.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              In the hair industry, they&rsquo;re often used loosely, as if raw and virgin are simply different tiers of quality. They aren&rsquo;t. The real difference comes down to how the hair is sourced and processed.
            </p>

            {/* Definition Cards */}
            <div className="grid grid-cols-1 gap-5 mb-4">
              <div className="bg-[#631D26] text-white rounded-xl px-8 py-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D19B6D]/20">
                    <i className="ri-leaf-line text-[#D19B6D] text-base"></i>
                  </span>
                  <h3 className="font-['Bebas_Neue'] text-2xl tracking-wide">What Is Raw Hair?</h3>
                </div>
                <p className="font-['Inter'] text-sm text-white/80 leading-[1.9] mb-4">
                  Raw hair is hair kept as close to its natural state as possible, with no processing at the strand level. It&rsquo;s sourced from a single donor, washed, and sold with its natural cuticle intact and aligned in one direction. In plain terms, the outer layer that protects each strand hasn&rsquo;t been stripped away like it is with most processed hair. That&rsquo;s part of why raw hair holds up so well over time.
                </p>
                <p className="font-['Inter'] text-sm text-white/80 leading-[1.9]">
                  That means this hair carries the same characteristics as your own natural hair, and it&rsquo;s treated as such. You&rsquo;ll notice natural variation in the way it moves, responds to water, and behaves in different conditions. That&rsquo;s part of its character.
                </p>
              </div>

              <div className="bg-[#FAF8F5] rounded-xl px-8 py-7 border border-[#D19B6D]/25">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D19B6D]/20">
                    <i className="ri-fire-line text-[#D19B6D] text-base"></i>
                  </span>
                  <h3 className="font-['Bebas_Neue'] text-2xl tracking-wide text-[#631D26]">What Is Virgin Hair?</h3>
                </div>
                <p className="font-['Inter'] text-sm text-gray-700 leading-[1.9] mb-4">
                  Virgin hair is also human hair that hasn&rsquo;t been chemically altered at the strand level. The difference is that our virgin textures are steam-processed to create the consistent patterns you know and love. That&rsquo;s how we offer textures like BUNMI Kinky Straight, BUNMI Kinky Curly, and BUNMI Wave with a predictable appearance from bundle to bundle.
                </p>
                <p className="font-['Inter'] text-sm text-gray-700 leading-[1.9]">
                  In simple terms: <strong className="text-[#631D26] font-semibold">virgin hair is your texture, perfected. Raw hair is your texture, left to your personal expression.</strong>
                </p>
              </div>
            </div>

            {/* Inline Image Band */}
            <div className="grid grid-cols-2 gap-4 my-10">
              <div className="w-full h-[280px] md:h-[360px] rounded-xl overflow-hidden">
                <img
                  src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/9dbf93c4274aafc2ddd68fa1f1d98518.png"
                  alt="Raw hair natural movement"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-full h-[280px] md:h-[360px] rounded-xl overflow-hidden">
                <img
                  src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/8a34eeaf2e911135901498b81bd854fe.png"
                  alt="Virgin hair consistent texture"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              Both are beautiful. Both have their place. The question is which experience is right for you, and that&rsquo;s where it gets personal. Your choice comes down to what you need your hair to do.
            </p>
          </section>

          {/* Decision 1 — Lifestyle */}
          <section id="lifestyle" className="py-12 border-b border-gray-100">
            <SectionHeading>1. What Does Your Lifestyle Demand From Your Hair?</SectionHeading>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-2">
              Before you choose a texture, think about your actual week. Work. Business. School. Family. Social plans. The gym. Everything that already has a place on your calendar.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              Your hair has to fit into all of it.
            </p>

            <TwoWaySplit
              leftLabel="If your week is already full"
              leftText="You don't need another thing that requires extra thought. This is where virgin hair fits. The textures are consistent, so you know how your hair will look and behave every time you wear it. You know your texture, you know your style, you get on with your day."
              rightLabel="If you have more room to experiment"
              rightText="Your hair is part of how you express yourself. You enjoy trying different styles and seeing how your hair responds. Raw hair retains more of its natural character, with its own movement and personality. No two pieces look identical, and that's exactly what makes it interesting."
            />

            <AskYourself>
              what does my typical week actually look like? A packed schedule that values predictability points to virgin hair. Room to be dynamic points to raw hair.
            </AskYourself>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              Neither choice is more impressive than the other. It&rsquo;s about choosing the hair that works with the life you&rsquo;re actually living.
            </p>
          </section>

          {/* Decision 2 — Budget */}
          <section id="budget" className="py-12 border-b border-gray-100">
            <SectionHeading>2. What Is Your Budget?</SectionHeading>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-2">
              Let&rsquo;s talk about money. Not because the most expensive hair is automatically the best hair. It isn&rsquo;t. Your budget helps you decide which qualities matter enough to you to pay for.
            </p>

            <TwoWaySplit
              leftLabel="If you have a smaller budget"
              leftText="Virgin hair is the smart choice. You get beautiful, high-quality hair with a consistent texture without stretching your budget, since raw hair sits at a higher price point. If consistency is what you want, there's no reason to pay extra for characteristics you don't particularly care about."
              rightLabel="If you have more room in your budget"
              rightText="Raw hair is worth the investment when you value what makes it different. You're paying for less processing, natural variation, and a piece you can keep in your collection and return to over time."
            />

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-4">
              Here&rsquo;s what matters most: a higher price doesn&rsquo;t automatically make something the right choice for you.
            </p>

            <AskYourself>
              what am I actually paying for, and do I value it? If yes, raw is worth the investment. If no, virgin gives you exactly what you need without spending more for the sake of it.
            </AskYourself>

            <Callout>
              The goal isn&rsquo;t to spend more. It&rsquo;s to invest intentionally.
            </Callout>
          </section>

          {/* Decision 3 — Experience */}
          <section id="experience" className="py-12 border-b border-gray-100">
            <SectionHeading>3. How Comfortable Are You With Extensions?</SectionHeading>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-2">
              If you&rsquo;ve worn extensions for years, you know what you like. You know the textures that work for you and how you like to style your hair. If you&rsquo;re newer to extensions, wanting more certainty makes sense.
            </p>

            <TwoWaySplit
              leftLabel="If you're still discovering what works"
              leftText="Virgin hair is the easier place to start. You have more texture options, and because the pattern is defined and polished, it's easier to know exactly what you're getting. When you see a texture you love, you can choose it with confidence."
              rightLabel="If you know your way around extensions"
              rightText="Raw hair is worth exploring. It has fewer defined texture options because it isn't processed into a uniform pattern. Instead, you get the natural character of the hair itself and room for variation — something that feels more natural, more dynamic, and fully in your control."
            />

            <Callout>
              If you already know what you like and want something with real natural character, raw hair is calling your name.
            </Callout>
          </section>

          {/* Decision 4 — Over Time */}
          <section id="over-time" className="py-12 border-b border-gray-100">
            <SectionHeading>4. How Do You Want Your Hair to Serve You Over Time?</SectionHeading>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-2">
              Think beyond your first install. You might wear your hair for a few months and move on to something new. Or you might build a collection of pieces you return to again and again. These are two different ways of buying hair.
            </p>

            <TwoWaySplit
              leftLabel="If you're buying for your current rotation"
              leftText="Virgin hair is the right choice. Its consistent texture makes it easy to choose a signature look you already love, and gives you the freedom to move on to something new whenever you want. There's nothing wrong with buying for now."
              rightLabel="If you're building a collection"
              rightText="Raw hair makes more sense. With proper care, quality raw hair is worn, stored, and brought back into your rotation for years. You're treating the hair as an investment, and a higher upfront cost makes sense when you're buying something you intend to keep."
            />

            <AskYourself>
              do I want this hair for this season, or a piece I&rsquo;ll keep coming back to? For now, virgin. For the long term, raw is worth the investment.
            </AskYourself>
          </section>

          {/* Which Is Yours */}
          <section id="which-yours" className="py-12 border-b border-gray-100">
            <SectionHeading>So, Which One Is Actually Yours?</SectionHeading>

            <ChoiceColumns
              leftLabel="Virgin Hair Is Yours If"
              leftItems={[
                'Your schedule is full and you don\u2019t want to do too much',
                'You want a beautiful, consistent signature style without spending more than you need to',
                'You\u2019re still discovering which textures work for you',
                'You like changing your look and want more defined texture options',
                'You want to know exactly what you\u2019re getting before you buy',
              ]}
              rightLabel="Raw Hair Is Yours If"
              rightItems={[
                'You have room to experiment with your hair',
                'You care about natural character and variation in the hair',
                'You\u2019re comfortable with extensions and already know what you like',
                'You\u2019re ready to invest in the qualities that matter to you',
                'You want pieces you\u2019ll keep in your collection and return to over time',
              ]}
            />

            <Callout>
              You don&rsquo;t choose raw hair because it&rsquo;s the more expensive option. You choose it because you genuinely prefer what makes it different.
            </Callout>
          </section>

          {/* BUNMI Raw Straight */}
          <section id="bunmi-raw" className="py-12">
            <SectionHeading>If Raw Hair Sounds Like You, Meet BUNMI Raw Straight</SectionHeading>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              We didn&rsquo;t rush into selling raw hair. We waited until we had something worth calling raw.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              We started testing raw hair in 2022. Every batch went through wash after wash, color after color, wear after wear, long before we ever called it ready.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              We&rsquo;re introducing our first raw texture: <strong className="text-[#631D26] font-semibold">BUNMI Raw Straight</strong>.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              It&rsquo;s sourced from a single donor, washed, and sold with the cuticle intact and aligned in one direction. It has not been chemically treated at the strand level. The outer layer of every strand is untouched, exactly the way it should be.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              This isn&rsquo;t the &ldquo;better&rdquo; version of our virgin textures. BUNMI Raw Straight is made for a different woman: one who doesn&rsquo;t need every strand to behave the same, who wants natural movement and flexibility, and who knows genuine raw hair the moment she sees it.
            </p>

            {/* Product Highlight */}
            <div className="bg-[#631D26] text-white rounded-xl overflow-hidden">
              <div className="px-8 py-3 bg-[#4A1A20]">
                <p className="font-['Bebas_Neue'] text-xs tracking-[0.3em] text-[#D19B6D] uppercase">Our First Raw Drop</p>
              </div>
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="relative w-full md:w-56 h-80 md:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/0d1518ae421715f69668a68e101d4e58.png"
                    alt="BUNMI Raw Straight"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 px-8 py-7 flex flex-col justify-center">
                  <p className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#D19B6D] mb-2">Introducing</p>
                  <h3 className="font-['Bebas_Neue'] text-3xl text-white mb-3">The BUNMI Raw Straight</h3>
                  <p className="font-['Inter'] text-sm text-white/75 leading-relaxed mb-6">
                    Naturally straight with a soft, authentic feel from root to end. Completely unprocessed, with the cuticle intact and aligned in one direction, so it takes heat and color exceptionally well.
                  </p>
                  <div className="inline-flex items-center gap-2 font-['Inter'] text-sm font-medium text-[#D19B6D] border-b border-[#D19B6D] pb-0.5 w-fit">
                    <i className="ri-calendar-event-line"></i>
                    Available September 23, 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Limited Drop Band */}
            <div className="mt-6 relative rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                <div className="relative w-full h-[260px] md:h-[300px]">
                  <img
                    src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/299f4b67bca0c5b1fe2abb89c56341f4.png"
                    alt="BUNMI Raw Straight limited release"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="bg-[#FAF8F5] px-8 py-10 flex flex-col justify-center">
                  <p className="font-['Inter'] text-xs tracking-[0.25em] uppercase text-[#D19B6D] mb-3">Limited Release</p>
                  <h3 className="font-['Bebas_Neue'] text-3xl text-[#631D26] mb-3">This Is Our First Raw Drop</h3>
                  <p className="font-['Inter'] text-sm text-gray-600 leading-[1.9]">
                    BUNMI Raw Straight is coming, and availability will be limited. Will be available for purchase September 23, 2026.
                  </p>
                </div>
              </div>
            </div>

            <Callout>
              The right question was never about price. It&rsquo;s about what&rsquo;s right for you.
            </Callout>
          </section>

          {/* CTA Section */}
          <div className="mt-4 mb-8 bg-[#FAF8F5] rounded-xl overflow-hidden">
            <div className="px-10 py-12 text-center">
              <span className="inline-block w-10 h-[2px] bg-[#D19B6D] mb-6" />
              <h3 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#631D26] mb-3">
                Ready to Find Your Signature Style?
              </h3>
              <p className="font-['Inter'] text-sm text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Browse the collection and let&rsquo;s help you find your signature style.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-[#631D26] text-white px-10 py-4 rounded-full font-['Inter'] font-medium text-sm tracking-widest uppercase hover:bg-[#4A1A20] transition-colors duration-300 whitespace-nowrap cursor-pointer"
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

export default ArticleRawVsVirginPage;