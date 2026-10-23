import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

const ArticleLifestylePage = () => {
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
          src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/fbcd3028c8fadc909809c5a3a0a92e34.jpeg"
          alt="Hair Extensions for your Lifestyle"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4">
          <span className="inline-block border border-[#D19B6D] text-[#D19B6D] px-5 py-1.5 text-[10px] font-['Inter'] font-semibold uppercase tracking-[0.25em] mb-5 rounded-full">
            Hair Care
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl lg:text-8xl text-white text-center leading-none max-w-4xl">
            Hair Extensions<br />for your Lifestyle
          </h1>
          <div className="flex items-center gap-4 mt-6 text-white/60 text-xs font-['Inter'] tracking-widest uppercase">
            <span>Bunmi Collection</span>
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            <span>Hair Education</span>
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            <span>8 min read</span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="pb-24">
        <div className="max-w-[720px] mx-auto px-6 lg:px-0">

          {/* Intro Pull Quote */}
          <div className="py-14 border-b border-gray-100">
            <p className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[#631D26] leading-snug text-center">
              "What if choosing hair extensions didn't have to feel like a guessing game?"
            </p>
          </div>

          {/* Introduction */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Introduction</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Have you ever been at a fine dining restaurant, overwhelmed by several palates on the menu and finding it impossible to choose?
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              It's a feeling many psychologists call a <em>choice overload</em> and we know it too well; that moment when too many options turns into no decision at all, and if you've ever tried to choose the right hair extensions and walked away more confused than when you started, you already know exactly what it feels like.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              The world of premium hair extensions can be a lot. Somewhere between the different hair textures, laces, density and so on; even the most decisive woman in the boardroom finds herself scrolling endlessly, no closer to a choice than when she first started. Because when everything looks beautiful, nothing feels certain.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              When we're overwhelmed, our brains don't make logical choices. They reach for the familiar, the easiest, or whatever a friend happened to recommend — and that's okay, but not really your best decision long term.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              So what if choosing hair extensions didn't have to feel that way? What if, instead of guessing, you could build a hair extension signature intentionally — one that fits your real life, your identity, and every version of who you are? That's exactly what we're here to help you do.
            </p>
          </section>

          {/* Why Build Section */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Why Build Your Hair Extensions Around Your Lifestyle?</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Many women value hair as an extension of their beauty, others see it as part of their femininity, but more than these, we consider hair to be an element of confidence and boldness. <strong className="text-[#631D26] font-semibold">Hair is confidence made visible.</strong> Something that speaks to our presence in the rooms we come into, and this is precisely why we choose intentionally.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              And because your life asks different things of you depending on the room, your lifestyle is always the most honest place to start.
            </p>

            {/* Highlighted Block */}
            <div className="my-10 pl-6 border-l-4 border-[#D19B6D] bg-[#FAF8F5] py-6 pr-6 rounded-r-lg">
              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] italic">
                We think of your signature style kind of the way we think about our clothes: each piece serves a specific version of your life. Work, casual dates, errands, dinners. Each texture fulfills a need in those very moments, so that you show up your best every single time.
              </p>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              To help you build yours, we've created a set of lifestyle archetypes to guide your choices. By the end, you'll know exactly which extensions belong in your signature style and why.
            </p>
          </section>

          {/* Archetypes Intro */}
          <section className="py-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Lifestyle Archetypes</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-12">
              In reality, the modern lady rarely fits neatly into one version. You may be a team lead at work and a gold star mom on weekends, or a lifestyle influencer who also values solace and a private life. These archetypes aren't boxes. Think of them as mirrors — each one reflecting a different season, role, or version of you. Read through and you might be surprised how many feel familiar.
            </p>

            {/* Archetype 01 — The Executive Lady */}
            <div className="mb-16">
              {/* Number + Title */}
              <div className="flex items-start gap-6 mb-6">
                <span className="font-['Bebas_Neue'] text-6xl text-[#631D26]/10 leading-none select-none">01</span>
                <div className="pt-2">
                  <h3 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#631D26] leading-tight">The Executive Lady</h3>
                  <p className="font-['Inter'] text-sm text-[#9B7B6A] italic mt-1">Your mornings are strategic — and this includes your hair.</p>
                </div>
              </div>

              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
                The alarm goes off at 5:45. Lunches are packed, a small person has been kissed goodbye. By 7:30 you're out the door, hair intact and the day's agenda memorized. By noon you'd have chaired two meetings, made three decisions, and still looked completely unrattled doing it. This is the executive lady.
              </p>
              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
                For you, hair is more of a vocabulary. It communicates credibility before you're introduced, and consistency long after work ends. So what it cannot do is demand your attention on a day that's already spoken for.
              </p>
              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
                Your extensions need to hold their shape across a full day without much adjustment or effort. They need to look as deliberate at the end of the week as they did at the beginning. Ideal extensions would have minimal shedding and strand movement, low maintenance, and of course — the boss look.
              </p>

              {/* Recommendation Callout */}
              <div className="bg-[#631D26] text-white rounded-lg px-8 py-7 flex items-start gap-5 mt-8">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-award-line text-2xl text-[#D19B6D]"></i>
                </div>
                <div>
                  <p className="font-['Bebas_Neue'] text-xs tracking-[0.2em] text-[#D19B6D] uppercase mb-1">Recommended for this archetype</p>
                  <p className="font-['Inter'] text-base font-semibold text-white mb-1">The BUNMI Wave</p>
                  <p className="font-['Inter'] text-sm text-white/75 leading-relaxed">
                    Popularly known for its longevity, low shedding and soft waves that stay in place — curated specifically for the corporate executive lady who doesn't have time for hair that needs constant managing.
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-12">
              <span className="flex-1 h-px bg-gray-100" />
              <span className="w-2 h-2 rounded-full bg-[#D19B6D]" />
              <span className="w-2 h-2 rounded-full bg-[#631D26]" />
              <span className="w-2 h-2 rounded-full bg-[#D19B6D]" />
              <span className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Archetype 02 — The Soft Muse */}
            <div className="mb-16">
              <div className="flex items-start gap-6 mb-6">
                <span className="font-['Bebas_Neue'] text-6xl text-[#631D26]/10 leading-none select-none">02</span>
                <div className="pt-2">
                  <h3 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#631D26] leading-tight">The Soft Muse</h3>
                  <p className="font-['Inter'] text-sm text-[#9B7B6A] italic mt-1">To you, living well is its own full-time role — and you take it seriously.</p>
                </div>
              </div>

              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
                You made a decision somewhere along the way, that you would stop waiting until you had "more time" to take care of yourself.
              </p>
              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
                Your week has a rhythm that belongs to you. Pilates on Tuesday. A long lunch with your closest friends on Thursday. A slow Saturday morning that you protect with the same energy you bring to everything else. And woven into all of it, the particular kind of joy that comes from knowing your children are watching a woman who takes care of herself, and desire to grow up caring for themselves.
              </p>
              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
                For a woman who has made her wellbeing a priority, hair that causes tension, scalp stress, or long-term damage simply isn't an option.
              </p>

              {/* Highlighted Block */}
              <div className="my-8 pl-6 border-l-4 border-[#D19B6D] bg-[#FAF8F5] py-6 pr-6 rounded-r-lg">
                <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] italic">
                  All BUNMI extensions were sourced with maximum care and health considerations, running each extension through skin and scalp testing before bringing it to you.
                </p>
              </div>

              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
                This lady chose a life that feels as good as it looks — and her hair is no exception.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-12">
              <span className="flex-1 h-px bg-gray-100" />
              <span className="w-2 h-2 rounded-full bg-[#D19B6D]" />
              <span className="w-2 h-2 rounded-full bg-[#631D26]" />
              <span className="w-2 h-2 rounded-full bg-[#D19B6D]" />
              <span className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Archetype 03 — The Bold Creative */}
            <div className="mb-16">
              <div className="flex items-start gap-6 mb-6">
                <span className="font-['Bebas_Neue'] text-6xl text-[#631D26]/10 leading-none select-none">03</span>
                <div className="pt-2">
                  <h3 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#631D26] leading-tight">The Bold Creative</h3>
                  <p className="font-['Inter'] text-sm text-[#9B7B6A] italic mt-1">The one who loves a statement.</p>
                </div>
              </div>

              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
                You understood before most people did that in the creative industry, you are always the work. The image, the portfolio, the presence… all of it speaks. And your hair has always been one of the most articulate things about your image.
              </p>
              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
                Your hair needs to be a canvas as much as a constant. It needs to hold up beautifully. It needs to carry a personal signature strong enough to be recognizable across every platform, every event you walk into. And occasionally, when you simply want something new, it needs to be ready to transform with you without hesitation or damage.
              </p>
              <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
                You want versatile pieces you can build on and return to.
              </p>

              {/* Recommendation Callout */}
              <div className="bg-[#631D26] text-white rounded-lg px-8 py-7 flex items-start gap-5 mt-8">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-award-line text-2xl text-[#D19B6D]"></i>
                </div>
                <div>
                  <p className="font-['Bebas_Neue'] text-xs tracking-[0.2em] text-[#D19B6D] uppercase mb-1">Recommended for this archetype</p>
                  <p className="font-['Inter'] text-base font-semibold text-white mb-1">BUNMI's Kinky Straight & Kinky Curly</p>
                  <p className="font-['Inter'] text-sm text-white/75 leading-relaxed">
                    Built for exactly this kind of creative relationship with hair. They are known for their high versatility, giving different looks under different styling which is perfect when your life doesn't follow a predictable script.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Making Your Choice Section */}
          <section className="py-12 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Making Your Choice</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-6">
              Somewhere in these lines you found yourself. Perhaps in one archetype, perhaps a bit of you in all three. Either way, you now know the hair qualities to look out for when assessing your lifestyle.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Now comes the more personal part. Because knowing your archetype is only the beginning. Building your actual signature requires a slightly more honest conversation and here's a few questions to start it off:
            </p>

            {/* Questions List */}
            <div className="space-y-6 mb-10">
              {/* Question 1 */}
              <div className="pl-6 border-l-4 border-[#D19B6D] py-3">
                <p className="font-['Bebas_Neue'] text-lg text-[#631D26] tracking-wide uppercase mb-2">1. What does my average week actually look like and does my hair currently keep up with it?</p>
                <p className="font-['Inter'] text-sm text-gray-600 leading-relaxed">
                  Start with reality. Not the week you plan for; the one that actually happens.
                </p>
              </div>

              {/* Question 2 */}
              <div className="pl-6 border-l-4 border-[#D19B6D] py-3">
                <p className="font-['Bebas_Neue'] text-lg text-[#631D26] tracking-wide uppercase mb-2">2. When I imagine my best hair day, what does it actually look like — and how often does that happen?</p>
              </div>

              {/* Question 3 */}
              <div className="pl-6 border-l-4 border-[#D19B6D] py-3">
                <p className="font-['Bebas_Neue'] text-lg text-[#631D26] tracking-wide uppercase mb-2">3. Do I have a consistent scalp care routine I need my extensions to work around?</p>
              </div>

              {/* Question 4 */}
              <div className="pl-6 border-l-4 border-[#D19B6D] py-3">
                <p className="font-['Bebas_Neue'] text-lg text-[#631D26] tracking-wide uppercase mb-2">4. Am I looking for something permanent, semi-permanent, or flexible?</p>
                <p className="font-['Inter'] text-sm text-gray-600 leading-relaxed">
                  Neither is wrong. But knowing the answer changes everything about what you should be choosing.
                </p>
              </div>

              {/* Question 5 */}
              <div className="pl-6 border-l-4 border-[#631D26] py-3">
                <p className="font-['Bebas_Neue'] text-lg text-[#631D26] tracking-wide uppercase mb-2">5. Who else does my hair need to work for besides me?</p>
                <p className="font-['Inter'] text-sm text-gray-600 leading-relaxed">
                  Consider your kids' health or nature of your job. Good hair should never get in the way.
                </p>
              </div>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-6">
              Premium hair extensions were never about choosing the most popular option on the shelf. It was always about choosing the right one for the life you're actually living.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-6">
              You now know which version of your life your hair needs to show up for, and more importantly, what it needs to do when it gets there — and that changes everything about how you choose.
            </p>

            {/* Closing Pull Quote */}
            <div className="my-10 pl-6 border-l-4 border-[#D19B6D] bg-[#FAF8F5] py-6 pr-6 rounded-r-lg">
              <p className="font-['Inter'] text-lg text-gray-700 leading-[1.9] italic">
                Your signature is waiting. All that's left is to build it — and we've made that part seamless through our transparency policy.
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

export default ArticleLifestylePage;