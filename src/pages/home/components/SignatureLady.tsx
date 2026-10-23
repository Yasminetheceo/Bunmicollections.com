import { useEffect, useRef, useState } from 'react';

const SignatureLady = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="signature-lady" className="relative bg-[#FAF7F4] overflow-hidden py-16 px-6">

      {/* Subtle background ornament */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-['Playfair_Display'] text-[22vw] font-bold italic text-[#631D26]/[0.03] leading-none whitespace-nowrap"
        >
          BUNMI
        </span>
      </div>

      <div className="relative max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <div
          className="flex items-center justify-center gap-4 mb-8 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '100ms',
          }}
        >
          <div className="w-10 h-px bg-[#D19B6D]"></div>
          <p className="font-['Inter'] text-[10px] tracking-[0.4em] text-[#D19B6D] uppercase font-semibold">
            The Signature Lady
          </p>
          <div className="w-10 h-px bg-[#D19B6D]"></div>
        </div>

        {/* Heading */}
        <div
          className="transition-all duration-700 mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '220ms',
          }}
        >
          <h2 className="font-['Bebas_Neue'] text-4xl xl:text-5xl text-[#631D26] leading-tight">
            You Were Never<br />Meant to Blend In
          </h2>
        </div>

        {/* Gold ornament divider */}
        <div
          className="flex items-center justify-center gap-2 mb-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: '340ms',
          }}
        >
          <div className="w-8 h-px bg-[#D19B6D]/50"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D19B6D]"></div>
          <div className="w-2 h-px bg-[#D19B6D]"></div>
          <div className="w-2 h-2 rounded-full border border-[#D19B6D]"></div>
          <div className="w-2 h-px bg-[#D19B6D]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D19B6D]"></div>
          <div className="w-8 h-px bg-[#D19B6D]/50"></div>
        </div>

        {/* Body text */}
        <div
          className="space-y-5 mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '440ms',
          }}
        >
          <p className="font-['Inter'] text-gray-500 text-sm leading-relaxed">
            BUNMI Collection was created for the woman who walks boldly in her identity — one who
understands that how she shows up is a reflection of her strength.
          </p>
          <p className="font-['Inter'] text-gray-500 text-sm leading-relaxed">
            We are here for the woman of substance. The one who leads with confidence, lives with
purpose, and is unafraid to take up space. Through intentional education, refined beauty
solutions, and service rooted in trust and transparency, we help her curate a signature style
that is entirely her own.
          </p>
          <p className="font-['Playfair_Display'] text-[#631D26] text-lg italic font-medium pt-2">
            &ldquo;Your signature style is waiting.&rdquo;
          </p>
        </div>

        {/* CTA */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '580ms',
          }}
        >
          <a
            href="/shop"
            className="inline-flex items-center px-8 sm:px-12 py-3.5 sm:py-4 bg-[#631D26] text-white font-['Inter'] font-semibold text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-[#4a2424] transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Discover Your Signature Style
          </a>
        </div>

      </div>
    </section>
  );
};

export default SignatureLady;
