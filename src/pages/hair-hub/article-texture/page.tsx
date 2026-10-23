import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';

const sections = [
  { id: 'washing', label: 'Washing' },
  { id: 'brushing', label: 'Brushing' },
  { id: 'detangling', label: 'Detangling' },
  { id: 'storing', label: 'Storing' },
  { id: 'heat-styling', label: 'Heat Styling' },
  { id: 'bedtime', label: 'Bedtime Routine' },
];

interface UseAvoidBlockProps {
  useItems: string[];
  avoidItems: string[];
}

const UseAvoidBlock = ({ useItems, avoidItems }: UseAvoidBlockProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
    {/* What to Use */}
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
      <div className="px-6 py-3 bg-[#631D26]">
        <p className="font-['Bebas_Neue'] text-xs tracking-[0.3em] text-[#D19B6D] uppercase">What to Use</p>
      </div>
      <ul className="px-6 py-5 space-y-3">
        {useItems.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-checkbox-circle-fill text-[#D19B6D] text-base"></i>
            </span>
            <span className="font-['Inter'] text-sm text-white/85 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
    {/* What to Avoid */}
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
      <div className="px-6 py-3 bg-[#4A1A20]">
        <p className="font-['Bebas_Neue'] text-xs tracking-[0.3em] text-[#D19B6D] uppercase">What to Avoid</p>
      </div>
      <ul className="px-6 py-5 space-y-3">
        {avoidItems.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-close-circle-fill text-[#9B7B6A] text-base"></i>
            </span>
            <span className="font-['Inter'] text-sm text-white/85 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ArticleTexturePage = () => {
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
          src="https://storage.readdy-site.link/project_files/8b56b708-1c0b-4207-bad0-cfa098753cfc/12040170-3524-47cc-adeb-820d869bb0e4_XLRpPQ8E.jpeg?v=436e2cffb2a0c3e3425b804a2806aa29"
          alt="A Complete Care Guide for Hair Extensions"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4">
          <span className="inline-block border border-[#D19B6D] text-[#D19B6D] px-5 py-1.5 text-[10px] font-['Inter'] font-semibold uppercase tracking-[0.25em] mb-5 rounded-full">
            Hair Care
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl lg:text-8xl text-white text-center leading-none max-w-5xl">
            Intentional Hair Choices:<br />A Complete Care Guide
          </h1>
          <div className="flex items-center gap-4 mt-6 text-white/60 text-xs font-['Inter'] tracking-widest uppercase">
            <span>Bunmi Collection</span>
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            <span>Hair Care</span>
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
              "The greater investment lies in what follows: the knowledge you take in and the routines you stick to."
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
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Introduction</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              When we think of investing in great hair, we often think of "buying" premium hair, but as straightforward as that sounds, that's not the whole picture.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              The money you spend is only one part of the equation. The greater investment lies in what follows: the knowledge you take in and the routines you stick to. These are the things that determine whether your hair remains a statement piece or quietly fades into the background.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              In our last article, we walked through the art of choosing hair extensions that fit your lifestyle: knowing what to look for, what to avoid, and how to make a purchase you won't regret. But acquisition is only the first step.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              One thing that sets a BUNMI lady apart is this: we do not just invest in quality hair, we invest in quality knowledge.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Even the finest hair, meticulously sourced, can underperform when it's not cared for correctly. And more often than not, it's not due to carelessness. It is the reality of a full, demanding life that leaves little room for research, routine, or the kind of guidance that should have come with your purchase in the first place.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              By the end of this article, you will have a clear, practical understanding of the core routines that protect your investment — washing, detangling, brushing, heat styling, bedtime, and storage — so that your hair continues to perform exactly the way it should, years after purchase.
            </p>
          </section>

          {/* Washing */}
          <section id="washing" className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Washing</h2>
            </div>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">How often is enough?</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Because extensions are not rooted in your scalp, they receive none of the natural oils your own hair benefits from. This makes them inherently drier and far less forgiving of overwashing. Washing too frequently strips away whatever moisture remains and causes damage, while washing too infrequently allows product residue and scalp buildup to accumulate, leading to dullness and matting over time.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              For ladies with oilier scalps or highly active lifestyles, washing your hair extensions once every two weeks is ideal. Ladies who have drier scalps or maintain a much more sedentary lifestyle can go much longer between washes — typically once a month, or whenever you notice product buildup beginning to affect the texture or appearance.
            </p>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">Before you step into the shower</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Always brush your extensions thoroughly before washing — not after. Hair in its wet state is at its most fragile and most susceptible to breakage, so the goal is to arrive at the wash with hair that is already free of knots. The less manipulation required while your hair is wet, the better.
            </p>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">The wash itself</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Use lukewarm water throughout, never hot. Direct the water downward as you rinse, following the hair's natural direction rather than against it. Apply your shampoo at the scalp, working it gently through the roots without scrubbing at the wefts. Allow it to travel down the length of the hair as you rinse rather than working it through aggressively.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Conditioner goes only on mid-lengths to ends, not at the root or near the weft areas. Moisture near this part weakens sew-ins. Leave the conditioner on for a few minutes before rinsing thoroughly; product left sitting in the hair is one of the most common causes of long-term buildup.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              After washing, gently squeeze excess water from the hair with a soft towel. Never rub or twist. Follow immediately with a blow dryer on a medium heat setting, directing the airflow downward. Pay particular attention to the root areas, as they need to be completely dry. Leaving the roots damp after washing creates the conditions for mildew and weakens the attachment points that hold everything in place.
            </p>

            <UseAvoidBlock
              useItems={[
                'Sulfate-free shampoo — sulfates are harsh detergents that strip away moisture',
                'A lightweight, moisturizing conditioner applied from mid-lengths to ends',
                'A leave-in conditioner or detangling spray post-wash',
                'A microfibre towel for gentle drying',
              ]}
              avoidItems={[
                'Sulfate-heavy or alcohol-based shampoos',
                'Hot water',
                'Washing hair upside down — this creates unnecessary tangling',
                'Going to bed before your hair is completely dry',
              ]}
            />
          </section>

          {/* Brushing */}
          <section id="brushing" className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Brushing</h2>
            </div>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">How often is enough?</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Brush your extensions at least twice a day: once in the morning and once before bed. For days when your hair has been worn up or exposed to wind, a midday brush is worthwhile. The goal is to address small tangles before they have time to develop into larger ones.
            </p>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">The right technique</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              Before reaching for your brush, hold the hair firmly at the section above where you intend to brush. This one habit alone protects your attachment points from unnecessary tension and is one of the most important things you can do to extend the life of your extensions. Always begin at the ends and work upward in small sections. Never from root to tip. If you meet any resistance, stay gentle. Forcing a brush through a knot only makes the tension worse.
            </p>

            <UseAvoidBlock
              useItems={[
                'A wide-tooth comb for gentle initial detangling before brushing',
                'A detangling brush',
                'A leave-in conditioner',
              ]}
              avoidItems={[
                'Fine-tooth combs',
                'Brushing from root to tip, particularly when tangles are present',
                'Brushing wet hair aggressively without a detangling product applied first',
              ]}
            />
          </section>

          {/* Detangling */}
          <section id="detangling" className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Detangling</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Detangling is not the same as brushing, and treating them as interchangeable is where much of the avoidable damage happens. Brushing is maintenance. Detangling is an intervention that requires a slower, more deliberate process, and it uses different tools and techniques.
            </p>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">Start with your hands</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Before any tool touches a knot, work through it with your fingers first. Fingers are your most sensitive instrument; they allow you to feel where a tangle begins and ends, and to loosen the outer layers gently before introducing a comb or brush. This step alone prevents a significant amount of unnecessary breakage.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Divide the hair into manageable sections. Work from the bottom upward, completing each section fully before moving to the next. Hold the hair above the section you are working on at all times. This distributes tension away from the roots. Rushing through a tangle causes shedding and breakage that compounds over time.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              For stubborn knots, apply a detangling spray or leave-in conditioner directly to the area and allow it a moment to penetrate before you continue. The slip it provides makes an enormous difference. For anything approaching matting, a deeper conditioning treatment is applied and left on for several minutes before detangling; force is not the appropriate response.
            </p>

            <UseAvoidBlock
              useItems={[
                'Your fingers — always start here',
                'A detangling spray or leave-in conditioner to soften knots before working through them',
                'A wide-tooth comb or dedicated detangling brush as your follow-through tool',
              ]}
              avoidItems={[
                'Pulling at knots without preparation — this is the fastest route to shedding and breakage',
                'Starting at the root when a tangle is present',
                'Fine-tooth combs',
                'Rushing the process',
              ]}
            />
          </section>

          {/* Storing */}
          <section id="storing" className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Storing</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Women who invest in premium extensions and then store them carelessly are, in effect, shortening the life of their purchase from the moment they take them out. This section applies primarily to removable extensions, though the principles of keeping hair clean, dry, and tangle-free apply universally.
            </p>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">Before putting them away</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Extensions should always be clean and fully dry before storage. Any residual moisture sealed into storage — even a small amount — creates the conditions for mildew and breaks down the hair's texture over time. Once dry, brush them through completely so they go into storage smooth, not matted. Storing tangled hair only allows the tangle to set.
            </p>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">The right way to store</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              An extension hanger is the most practical option for women who wear their extensions regularly. Hanging keeps the hair in its natural fall, prevents compression, and maintains the texture between uses. Another good option is a hair mannequin. For longer-term storage, a silk or satin bag is ideal. Its smooth fabric creates minimal friction against hair fibers, prevents static, and does not draw moisture out the way synthetic fabrics do. A breathable storage box lined with a soft fabric works as an alternative if hanging is not possible.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              Store in a cool, dry location away from direct sunlight.{' '}
              <a
                href="https://www.sciencedirect.com/science/article/abs/pii/S1011134404000375"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="underline underline-offset-2 text-[#631D26] hover:text-[#8B2635] transition-colors duration-200"
              >
                UV exposure fades color and degrades the hair's structure gradually
              </a>
              , so bathrooms — which combine humidity, heat, and occasional sunlight — are among the worst places to store extensions.
            </p>

            <UseAvoidBlock
              useItems={[
                'A dedicated extension hanger for regular wearers',
                'A silk or satin drawstring bag or pouch',
                'A breathable storage box if hanging is not an option',
              ]}
              avoidItems={[
                'Plastic bags — they trap moisture and create frizz-inducing static',
                'Storing damp extensions under any circumstances',
                'Folding or compressing extensions under other items',
                'Bathroom storage due to too much humidity and heat',
              ]}
            />
          </section>

          {/* Heat Styling */}
          <section id="heat-styling" className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Heat Styling</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              A first step in understanding this is recognizing that your natural hair and extensions should not be treated the same way. Our scalp produces natural oils that travel down the hair shaft and offer a degree of built-in protection against heat and stress. Extensions receive none of this. They are working without a safety net, and because heat damage on extensions is permanent, the margin for error is smaller than most women realize.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              This does not mean heat styling is off the table, but it requires a more deliberate approach.
            </p>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">Temperature</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Your tool may go up to 230°C, but using the highest temperature isn't always the right choice. According to PubMed's research on human hair, irreversible structural damage begins above 140°C, and significant keratin degradation occurs at and beyond 200°C. While these studies referenced natural hair and not extensions, it's a rule of thumb to always use the lowest temperature that still achieves the result you want — not the highest your tool allows — because its oils cannot be replenished like those of your natural hair. Treat heat protectors as an essential part of your heat styling routine.
            </p>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">Before you style</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              Extensions must be completely dry before any heat is applied. Applying heat to even slightly damp hair causes moisture inside the shaft to essentially boil, producing damage that cannot be undone. Apply your heat protectant section by section before you begin.
            </p>

            <UseAvoidBlock
              useItems={[
                'A heat protectant applied to dry hair before every session',
                'Heat tools with adjustable temperature control',
                'A lightweight serum applied to ends only after styling',
              ]}
              avoidItems={[
                'Heat on damp hair, under any circumstances',
                'Multiple passes over the same section at high heat',
                'Daily heat styling without moisture replenishment between sessions',
              ]}
            />
          </section>

          {/* Bedtime Routine */}
          <section id="bedtime" className="py-12 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">The Bedtime Routine</h2>
            </div>

            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Eight hours of movement and friction against a pillowcase, every single day, can be stressful for your hair. For women who skip any form of bedtime preparation, the cumulative effect over weeks becomes visible in texture and tangles. The good news is that a bedtime routine takes under five minutes with the right knowledge and helps extend the life of your extensions by months.
            </p>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">What to do before bed</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Start by brushing your extensions thoroughly. Going to sleep on tangles only allows them to tighten and mat overnight, making the morning far more work than it needs to be. Once brushed, secure your hair in a loose, low braid or low ponytail using a soft, seamless fabric scrunchie. Tight styles or rubber elastics create pressure at the attachment points and cause breakage at the hairline over time.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              If your hair often feels dry, apply a small amount of lightweight oil or leave-in conditioner to the mid-lengths and ends before bed, but never near the roots. This provides overnight moisture to the parts of your extensions most prone to drying out.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-8">
              Never go to bed with damp hair. This is non-negotiable. Moisture left at the roots creates bacterial buildup on the scalp. If you wash your hair in the evenings, ensure the roots are thoroughly dried before lying down, even if it means a quick five minutes with the dryer on a low setting focused on the roots.
            </p>

            <p className="font-['Bebas_Neue'] text-base tracking-[0.15em] text-[#631D26] uppercase mb-3">Consider a pillowcase change</p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              If you do nothing else, do this: replace your cotton pillowcase with a silk or satin one. Cotton creates significantly more friction against the hair shaft than smooth fabrics, and that friction — repeated every single night — contributes to frizz, cuticle damage, and tangling over time. A silk pillowcase is a small, inexpensive investment that works quietly in the background every night without requiring any extra effort from you. For added protection, a silk bonnet or scarf worn over a loose braid offers the highest level of coverage, particularly useful for textured extensions or longer lengths where there is more surface area exposed during sleep.
            </p>

            <UseAvoidBlock
              useItems={[
                'A silk or satin pillowcase',
                'A soft, seamless scrunchie',
                'A silk bonnet or a satin scarf for additional coverage',
                'A lightweight oil or leave-in conditioner applied to ends only',
              ]}
              avoidItems={[
                'Sleeping with hair completely loose',
                'Tight elastics or rubber bands at any point near the attachments',
                'Damp hair at bedtime',
                'Cotton pillowcases without a protective layer over them',
              ]}
            />
          </section>

          {/* Conclusion */}
          <section className="py-12 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#631D26]" />
              <h2 className="font-['Bebas_Neue'] text-xl tracking-[0.2em] text-[#631D26] uppercase">Conclusion</h2>
            </div>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              Knowledge remains the best investment you can make after the purchase itself. Great hair care is not about doing more. It is about doing the right things, in the right order, with the right tools.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9] mb-5">
              One last thing worth saying: not all extensions are the same, and not all care routines should be either. The right washing frequency, the right products, and the right handling approach for straight, silky extensions are not the same as what works best for a deep wave or a kinky curl. Texture matters, and the details matter.
            </p>
            <p className="font-['Inter'] text-base text-gray-700 leading-[1.9]">
              This is why every BUNMI lady receives a personalized hair care guide tailored specifically to the texture they purchase. We believe that guidance should come with the hair, and not be left for you to piece together on your own.
            </p>

            {/* Closing Pull Quote */}
            <div className="my-10 pl-6 border-l-4 border-[#D19B6D] bg-[#FAF8F5] py-6 pr-6 rounded-r-lg">
              <p className="font-['Inter'] text-lg text-gray-700 leading-[1.9] italic">
                Now's the time to treat your hair extensions like the quality investment that they are — and with this guide, you have everything you need to do exactly that.
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

export default ArticleTexturePage;
