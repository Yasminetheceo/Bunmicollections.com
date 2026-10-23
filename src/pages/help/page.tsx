import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const faqs = [
  {
    id: 1,
    question: 'What is your return and exchange policy?',
    answer: 'Due to the hygienic nature of hair extensions and to maintain the highest quality standards for all guests, all sales are final.\n\nExchanges are only accepted if:\n• The item was received defective,\n• You notify us within 3 days of delivery,\n• The item remains unused, uninstalled, and in original packaging with seals intact.\n\nFor approval, email hello@bunmicollection.com with order number, photos, and details. If approved, the customer will be responsible for the return shipping label.',
  },
  {
    id: 2,
    question: 'When will I receive my order?',
    answer: 'At Bunmi, every order is handled with intention and care.\n\nBecause many of our pieces are prepared upon order, please allow 3–5 business days for processing before shipment. Once your order has been prepared, it will be shipped via our selected carrier.\n\nEstimated delivery time after shipment: 2–5 business days (U.S.)\nTotal estimated timeframe: 5–10 business days from order date.\n\nYou will receive a confirmation email with tracking information once your order has shipped.',
  },
  {
    id: 3,
    question: 'Are Bunmi extensions made with 100% human hair?',
    answer: 'Yes. All Bunmi extensions are made from 100% ethically sourced human hair. Each texture is carefully selected and tested to ensure natural movement, longevity, and seamless blending with textured hair. Our collections are designed to maintain their softness, fullness, and integrity with proper care.',
  },
  {
    id: 4,
    question: 'What is the Signature Style Consultation?',
    answer: 'The Signature Style Consultation is a 45-minute personalized session designed to help you confidently choose the right Bunmi texture for your natural hair and lifestyle. During the consultation, we review your hair type, maintenance preferences, and styling goals to recommend the texture and installation approach that will blend most naturally with your hair.\n\nYou will also receive physical samples of each Bunmi texture and a consultation credit applied toward your purchase once you select your extensions.',
  },
  {
    id: 5,
    question: 'Can I dye or color my extensions?',
    answer: 'Yes. Because Bunmi extensions are made from 100% human hair, they can be professionally colored. However, we recommend working with an experienced stylist to achieve your desired shade while preserving the integrity of the hair.\n\nLightening or bleaching should always be done carefully to maintain the longevity of your extensions.',
  },
  {
    id: 6,
    question: 'How do I care for my hair extensions?',
    answer: 'To maintain the softness and longevity of your extensions, we recommend gentle care and minimal product buildup. Detangle regularly using a wide-tooth comb or paddle brush, apply lightweight moisture products when needed, and wash the hair periodically to remove buildup.\n\nFor detailed care instructions and maintenance guidance, visit your preferred texture and review the hair care tab, where we share step-by-step care guides for each texture.',
  },
  {
    id: 7,
    question: 'How many bundles do I need?',
    answer: 'The number of bundles depends on your desired length and overall fullness. Most installations require 2–3 bundles for a natural look, while longer lengths or fuller styles may require 3–4 bundles.\n\nYour stylist can recommend the best bundle count for your installation, or you can book a Signature Style Consultation for personalized guidance.',
  },
];

const FAQItem = ({ question, answer, link }: { question: string; answer: string; link?: { label: string; href: string } }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E8D5C4]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
      >
        <span className={`font-['Bebas_Neue'] text-lg md:text-xl transition-colors duration-300 ${open ? 'text-[#631D26]' : 'text-[#3D1F1F] group-hover:text-[#631D26]'}`}>
          {question}
        </span>
        <span className={`w-7 h-7 flex items-center justify-center flex-shrink-0 ml-4 rounded-full border transition-all duration-300 ${open ? 'bg-[#631D26] border-[#631D26] text-white' : 'border-[#C4A882] text-[#9B7B6A] group-hover:border-[#631D26] group-hover:text-[#631D26]'}`}>
          <i className={`text-sm transition-transform duration-300 ${open ? 'ri-subtract-line' : 'ri-add-line'}`}></i>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? 'max-h-[600px] pb-6' : 'max-h-0'}`}>
        <p className="font-['Inter'] text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
          {answer}
        </p>
        {link && (
          <a
            href={link.href}
            className="inline-flex items-center gap-2 mt-4 font-['Inter'] text-sm font-medium text-[#631D26] border border-[#631D26] px-4 py-2 rounded-md hover:bg-[#631D26] hover:text-white transition-colors duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-file-text-line text-sm"></i>
            {link.label}
          </a>
        )}
      </div>
    </div>
  );
};

const HelpPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.message.length > 500) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      const res = await fetch('https://readdy.ai/api/form/d6lq55s6fojmejgaj5c0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setSubmitStatus(res.ok ? 'success' : 'error');
      if (res.ok) setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero - Minimal light style matching Shop page */}
      <section className="pt-32 pb-16 bg-[#FAF8F5] text-center">
        <p className="font-['Inter'] text-xs tracking-[0.3em] uppercase text-[#631D26] mb-4">
          The Bunmi Collection
        </p>
        <h1 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-[#1a1a1a] mb-5">
          Help &amp; faq
        </h1>
        <p className="font-['Inter'] text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Find answers to common questions about orders, shipping, returns, and product care.
        </p>
      </section>

      {/* FAQ + Contact Split */}
      <section className="py-16 md:py-24 bg-[#FAF8F5] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left — FAQs */}
            <div>
              <p className="font-['Inter'] text-[10px] tracking-[0.25em] text-[#9B7B6A] uppercase mb-2">Common Questions</p>
              <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#631D26] mb-8">
                Frequently Asked
              </h2>
              <div>
                {faqs.map(faq => (
                  <FAQItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    link={faq.id === 2 ? { label: 'View Full Shipping Policy', href: '/shipping-policy' } : undefined}
                  />
                ))}
              </div>
            </div>

            {/* Right — Contact */}
            <div>
              <p className="font-['Inter'] text-[10px] tracking-[0.25em] text-[#9B7B6A] uppercase mb-2">Still Need Help?</p>
              <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#631D26] mb-4">
                Get In Touch
              </h2>
              <p className="font-['Inter'] text-sm text-gray-600 mb-8 leading-relaxed">
                Can&apos;t find the answer you&apos;re looking for? Reach out to our team and we&apos;ll get back to you as soon as possible.
              </p>

              <a
                href="mailto:hello@bunmicollection.com"
                className="inline-flex items-center gap-3 bg-[#631D26] text-white px-8 py-4 rounded-lg font-['Inter'] font-medium text-sm tracking-widest uppercase hover:bg-[#4A2424] transition-colors duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-mail-line text-base"></i>
                Email Us
              </a>

              <div className="mt-10 pt-8 border-t border-[#E8D5C4] grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#631D26]/10 flex-shrink-0">
                    <i className="ri-mail-line text-[#631D26] text-base"></i>
                  </div>
                  <div>
                    <p className="font-['Inter'] text-[10px] tracking-widest text-[#9B7B6A] uppercase mb-1">Email Us</p>
                    <p className="font-['Inter'] text-sm text-[#3D1F1F]">hello@bunmicollection.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#631D26]/10 flex-shrink-0">
                    <i className="ri-time-line text-[#631D26] text-base"></i>
                  </div>
                  <div>
                    <p className="font-['Inter'] text-[10px] tracking-widest text-[#9B7B6A] uppercase mb-1">Response Time</p>
                    <p className="font-['Inter'] text-sm text-[#3D1F1F]">Within 24–48 hours</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpPage;
