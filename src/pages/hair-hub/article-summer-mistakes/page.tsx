import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

const ArticleSummerMistakesPage = () => {
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
          src="https://static.readdy.ai/image/fadb589bdce069ad17e86fea08d34f73/e698d4cc0984a4b61b619cb542bd1bcb.png"
          alt="Summer Hair Care"
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 35%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4">
          <span className="inline-block border border-[#D19B6D] text-[#D19B6D] px-5 py-1.5 text-[10px] font-['Inter'] font-semibold uppercase tracking-[0.25em] mb-5 rounded-full">
            Hair Education
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl lg:text-8xl text-white text-center leading-none max-w-5xl">
            4 Mistakes Ruining Your<br />Hair Extensions Every Summer
          </h1>
          <div className="flex items-center gap-4 mt-6 text-white/60 text-xs font-['Inter'] tracking-widest uppercase">
            <span>Bunmi Collection</span>
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            <span>Hair Education</span>
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            <span>9 min read</span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="pb-24">
        <div className="max-w-[720px] mx-auto px-6 lg:px-0">

          {/* Intro Pull Quote */}
          <div className="py-14 border-b border-gray-100">
            <p className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[#631D26] leading-snug text-center">
              "Hair that lasts all summer starts with intentional care."
            </p>
          </div>

          {/* Introduction */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Introduction</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              One of the most popular discussions in the ladies' group chats during summer is how to curate the perfect look for vacation — and 70% of this conversation revolves around hairstyles. Because, as the saying goes, "When you have your hair done, you can never look bad."
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Sadly, a conversation we don't often have is how we can hold up those perfectly curated hairstyles through the harsh realities of summer.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Everyone loves summer. No doubt. It's that season that makes you want to drop everything and book a flight. But there's the rising temperatures, the excessive sweating, the increased outdoor activities — these things test not just your hair extensions but every bit of patience you have when maintaining your signature style.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              The last thing you want is your hair extensions going frizzy after a good day at the beach resort, your leave-out getting damaged due to heat styling, or your scalp getting irritated from buildup and sweat. To get the best out of your summer experience, it's important to keep the balance between looking good and actually feeling good. We don't want to spend so much getting a beautiful texture that ought to last 4+ years only to have it ruined by week three.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              In the sections ahead, you'll learn about the 4 common mistakes that ruin hair extensions during summer and how to walk around them — so your texture serves you all season long.
            </p>
          </section>

          {/* Mistake 1: Skipping Hydration */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Mistake 1: Skipping Hydration and Moisture</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Of all the threats summer poses to your hair extensions, moisture loss is the most silent and the most damaging. Unlike breakage you can see or frizz you can feel, dryness creeps in gradually — and by the time you notice it, it's already taken a toll.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Summer heat alone is enough to pull moisture from your extensions over time. Add salt water from the ocean and chlorine from swimming pools into the mix, and you have a combination that strips your hair fast. These elements are particularly aggressive because of how they interact with the hair cuticle. When your extensions come in contact with salt water or chlorine, these substances absorb into the cuticle and draw out moisture from the inside out. The result? Dry, brittle, frizzy hair that breaks easily and loses its texture long before the season is over.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Imagine your first summer outing out of a list of five was the beach, and your extensions were ruined before you could even attend the others. It's a frustrating situation that is entirely avoidable with the right preparation. According to Skinkraft, hair acts like a sponge. When it is already dry or unprotected, it has a significantly higher capacity to absorb contaminants like chlorine or salt from swimming pools and the ocean.
            </p>

            {/* Tips from BUNMI */}
            <div className="bg-[#FAF8F5] rounded-xl p-8 mb-6 border border-[#D19B6D]/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-['Bebas_Neue'] text-lg tracking-[0.15em] text-[#D19B6D] uppercase">Tips from BUNMI</span>
                <span className="flex-1 h-[1px] bg-[#D19B6D]/30" />
              </div>
              <ul className="space-y-5">
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">1</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    After any water activity, rinse your hair thoroughly with fresh, clean water as soon as possible. Do not wait until the next day.
                  </p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">2</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    Follow up with a clarifying shampoo to remove any remaining salt or chlorine residue, then deep condition. This step is non-negotiable. Deep conditioning restores the moisture that water activities strip away and keeps your extensions soft, manageable, and lasting longer.
                  </p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">3</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    Between water activities, keep your extensions lightly moisturized. A light leave-in conditioner or hair oil applied regularly helps maintain hydration throughout the summer.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Mistake 2: Daily Heat Styling */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Mistake 2: Daily Heat Styling Your Extensions</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Summer already comes with a lot of heat — and your extensions feel it too. When you layer daily heat styling on top of the humidity and rising temperatures your hair is already navigating, you accelerate dryness, frizz, and breakage.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Heat styling tools like flat irons and curling tongs work by temporarily altering the structure of the hair shaft. In isolation, occasional use with the right protectant is manageable. But daily use during a season where your extensions are already under environmental pressure is a fast track to damage.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              For ladies who love a leave-out install, we understand how necessary it feels to have it straightened out — especially with straight extensions, where a seamless blend is everything. But summer is not the ideal season for leave-outs, simply because you'd constantly be choosing between a seamless blend and the health of your natural hair. And with the rise in traction alopecia, that's a trade-off worth reconsidering.
            </p>

            {/* Tips from BUNMI */}
            <div className="bg-[#FAF8F5] rounded-xl p-8 mb-6 border border-[#D19B6D]/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-['Bebas_Neue'] text-lg tracking-[0.15em] text-[#D19B6D] uppercase">Tips from BUNMI</span>
                <span className="flex-1 h-[1px] bg-[#D19B6D]/30" />
              </div>
              <ul className="space-y-5">
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">1</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    For your extensions, explore heatless styling options like flexi rods or heatless curlers to minimize heat exposure. Your hair will thank you by mid-July.
                  </p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">2</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    If you must use heat styling, do so sparingly and always apply a heat protectant beforehand. This is not optional in summer.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Mistake 3: Skipping Maintenance */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Mistake 3: Skipping Your Maintenance Routine</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Amid all the fun and excitement summer brings, it's perfectly understandable to let routines slip. But when it comes to your hair extensions, skipping wash days, rushing through your detangling sessions, and neglecting your moisturizing routine will cost you more than you bargained for.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              The high humidity that comes with summer makes extensions far more prone to tangling, sweat buildup, and product accumulation. For women who spend a lot of time outdoors or are physically active through the season, a consistent maintenance routine is not a luxury — it is what stands between you and extensions that fall apart before summer is even over.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              All hair extensions require maintenance regardless of texture. But if you're on the curly side, your routine will need even more intentionality. Curly textures are more prone to tangling and frizz in humid conditions, which means gentle, thorough detangling is especially critical.
            </p>

            {/* Tips from BUNMI */}
            <div className="bg-[#FAF8F5] rounded-xl p-8 mb-6 border border-[#D19B6D]/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-['Bebas_Neue'] text-lg tracking-[0.15em] text-[#D19B6D] uppercase">Tips from BUNMI</span>
                <span className="flex-1 h-[1px] bg-[#D19B6D]/30" />
              </div>
              <ul className="space-y-5">
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">1</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    Wash your hair every 2–3 weeks to minimize product buildup and sweat accumulation.
                  </p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">2</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    Never rush your detangling routine. Taking your time here prevents unnecessary shedding and preserves the integrity of your extensions.
                  </p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">3</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    Lightly moisturize your hair consistently throughout the week — but avoid layering too many products at once, as this contributes to buildup.
                  </p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">4</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    Never go to bed with damp hair, especially after a long day outdoors. Blow dry any excess sweat or moisture before sleeping.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Mistake 4: Not Protecting at Night */}
          <section className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Mistake 4: Not Protecting Your Hair at Night</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              A mistake that often goes unmentioned in summer hair conversations is what happens after the day is done. You've been out in the heat, perhaps near water, perhaps sweating through an event — and then you go to bed without protecting your hair. That nightly neglect adds up faster than you think.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Summer means more outdoor activity, more sweat, more exposure. Going to bed without properly protecting your extensions leads to tangling, matting, friction damage from your pillowcase, and a gradual loss of texture that compounds night after night. Your hair doesn't get a break just because you're asleep — and without protection, it's working against you while you rest.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              This is a simple habit to build, and the difference it makes across a full summer is remarkable.
            </p>

            {/* Tips from BUNMI */}
            <div className="bg-[#FAF8F5] rounded-xl p-8 mb-6 border border-[#D19B6D]/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-['Bebas_Neue'] text-lg tracking-[0.15em] text-[#D19B6D] uppercase">Tips from BUNMI</span>
                <span className="flex-1 h-[1px] bg-[#D19B6D]/30" />
              </div>
              <ul className="space-y-5">
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">1</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    Always sleep with a silk bonnet. Silk reduces friction against the hair shaft, helping your extensions retain moisture and their natural texture overnight.
                  </p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">2</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    If you wear curly textures, take it a step further: section your hair and loosely twist each section before putting on your bonnet. This preserves your curl pattern and significantly reduces the tangling and frizz that comes from sleeping without structure.
                  </p>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#631D26] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-['Inter'] text-xs font-bold">3</span>
                  </span>
                  <p className="font-['Inter'] text-sm text-gray-700 leading-[1.8]">
                    If you don't like bonnets, a silk or satin pillowcase is a solid alternative — though a bonnet offers more consistent protection.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Conclusion */}
          <section className="py-12 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Conclusion</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              The perfect summer starts with planning — not just your looks, but how you want to sustain them through the season. Many times, we browse the internet for random tips, but what really makes the difference is how personalized your plan is to fit your lifestyle and preferences.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              That is exactly what we created the Signature Style Consultation for. The Signature Style Consultation by BUNMI offers you personalized expert advice for your hair this summer. You also get a sample set of every BUNMI texture delivered to your doorstep, so you can test each texture before committing. And it offers you credit towards your purchase when you are finally ready.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              One right move at a time — this is how your standard is maintained all summer. The season is almost here, so book your Signature Consultation today and plan your summer confidently.
            </p>

            {/* Closing Pull Quote */}
            <div className="my-10 pl-6 border-l-4 border-[#D19B6D] bg-[#FAF8F5] py-6 pr-6 rounded-r-lg">
              <p className="font-['Inter'] text-lg text-gray-700 leading-[1.9] italic">
                One right move at a time — this is how your standard is maintained all summer.
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

export default ArticleSummerMistakesPage;