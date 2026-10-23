import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    stars: 5,
    text: "Hey Bunmi, I'm at my 8 week mark with my BUNMI Kinky Straight 20,22,24 inch extensions. I got this sew-in early June & the hair is still holding up. I do my maintenance on it every 3 weeks by washing the hair & my scalp. Times where I can't get to it my hair is still blended and neat. I'm glad I used kinky straight because of how natural it looks on me.",
    location: "Indianapolis, IN",
    initials: "A.M.",
  },
  {
    stars: 5,
    text: "Hi! I just wanted to say that I absolutely loved everything about my hair. I had my extensions in for 8 weeks and I'm really looking forward to reusing them! The BUNMI Kinky Curl was so versatile, and I received so many compliments every time I styled it. A lot of people even thought it was my natural hair, which I loved!",
    location: "Dallas, TX",
    initials: "J.R.",
  },
  {
    stars: 5,
    text: "My order arrived in about a week, and upon inspection, I was impressed by the softness of the hair and that it had no factory odor. I wore the hair for approximately six weeks, washing it bi-weekly. It was so easy to maintain with minimal shedding. Overall, I am extremely satisfied with both the quality of the extensions and the exceptional customer service I received before and after my purchase.",
    location: "Chicago, IL",
    initials: "T.W.",
  },
];

const BrandStory = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActiveIndex((prev) => Math.min(prev + 1, testimonials.length - 1));
      else setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-[#FAF7F4] overflow-hidden">
      <style>{`
        @keyframes floatQuote {
          0%, 100% { transform: translateY(0px); opacity: 0.35; }
          50% { transform: translateY(-6px); opacity: 0.5; }
        }
        .quote-float { animation: floatQuote 4s ease-in-out infinite; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-animate { animation: fadeSlideUp 0.6s ease forwards; opacity: 0; }
        .card-animate-1 { animation-delay: 0.1s; }
        .card-animate-2 { animation-delay: 0.25s; }
        .card-animate-3 { animation-delay: 0.4s; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .header-animate { animation: fadeIn 0.7s ease forwards; opacity: 0; }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className={`text-center mb-16 ${visible ? "header-animate" : "opacity-0"}`}>
          <p className="font-['Inter'] text-xs tracking-[0.3em] uppercase text-[#C9847A] mb-3">
            Real Stories
          </p>
          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-[#3D1A1A] mb-4">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E8B4B0]"></div>
            <i className="ri-heart-fill text-[#E8B4B0] text-sm"></i>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E8B4B0]"></div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 flex flex-col ${visible ? `card-animate card-animate-${i + 1}` : "opacity-0"}`}
              style={{
                background: i === 1
                  ? "linear-gradient(145deg, #fff0ee, #fde8e4)"
                  : "linear-gradient(145deg, #ffffff, #fdf5f5)",
                boxShadow: "0 4px 30px rgba(200, 120, 110, 0.08)",
                border: "1px solid rgba(232, 180, 176, 0.3)",
              }}
            >
              <div
                className="absolute top-5 right-7 font-['Playfair_Display'] text-8xl leading-none select-none quote-float"
                style={{ color: "rgba(232, 180, 176, 0.35)" }}
              >
                &ldquo;
              </div>
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <i key={s} className="ri-star-fill text-[#E8A598] text-base"></i>
                ))}
              </div>
              <p className="font-['Inter'] text-[#5A3535] text-sm leading-7 flex-1 mb-8">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-[#F0D8D5]">
                <div>
                  <p className="font-['Inter'] text-[#3D1A1A] text-xs font-semibold tracking-wide">Verified Buyer</p>
                  <p className="font-['Inter'] text-[#C9847A] text-xs">{t.location}</p>
                </div>
                <div className="ml-auto w-5 h-5 flex items-center justify-center">
                  <i className="ri-verified-badge-fill text-[#E8A598] text-base"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="relative rounded-3xl p-7 flex flex-col flex-shrink-0 w-full"
                  style={{
                    background: i === 1
                      ? "linear-gradient(145deg, #fff0ee, #fde8e4)"
                      : "linear-gradient(145deg, #ffffff, #fdf5f5)",
                    boxShadow: "0 4px 30px rgba(200, 120, 110, 0.08)",
                    border: "1px solid rgba(232, 180, 176, 0.3)",
                  }}
                >
                  <div
                    className="absolute top-5 right-7 font-['Playfair_Display'] text-8xl leading-none select-none quote-float"
                    style={{ color: "rgba(232, 180, 176, 0.35)" }}
                  >
                    &ldquo;
                  </div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <i key={s} className="ri-star-fill text-[#E8A598] text-base"></i>
                    ))}
                  </div>
                  <p className="font-['Inter'] text-[#5A3535] text-sm leading-7 flex-1 mb-8">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-[#F0D8D5]">
                    <div>
                      <p className="font-['Inter'] text-[#3D1A1A] text-xs font-semibold tracking-wide">Verified Buyer</p>
                      <p className="font-['Inter'] text-[#C9847A] text-xs">{t.location}</p>
                    </div>
                    <div className="ml-auto w-5 h-5 flex items-center justify-center">
                      <i className="ri-verified-badge-fill text-[#E8A598] text-base"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`cursor-pointer transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? "w-6 h-2 bg-[#C9847A]"
                    : "w-2 h-2 bg-[#E8B4B0]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom trust line */}
        <div className="text-center mt-14 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.instagram.com/stories/highlights/17911739045083877/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#631D26] text-white font-['Inter'] font-medium text-sm rounded-full hover:bg-[#4A2323] transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-instagram-line text-base w-4 h-4 flex items-center justify-center"></i>
            View More Testimonials
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScDlVy4yFBMczmWpQF9ZkPq_iNWQlubXah4DwL2vsBeEcoGPA/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#631D26] font-['Inter'] font-medium text-sm rounded-full border border-[#631D26] hover:bg-[#631D26] hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-edit-line text-base w-4 h-4 flex items-center justify-center"></i>
            Share Yours
          </a>
        </div>

      </div>
    </section>
  );
};

export default BrandStory;
