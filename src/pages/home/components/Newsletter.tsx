import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);

      const response = await fetch('https://readdy.ai/api/form/d6kqs794a3uojp5fg1hg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#631D26] relative overflow-hidden">
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="max-w-[600px] mx-auto px-4 sm:px-8 text-center relative z-10">
        {/* Heading */}
        <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl lg:text-5xl text-white mb-3 sm:mb-4">
          Join Our VIP List
        </h2>

        {/* Subtext */}
        <p className="text-[#D19B6D] text-base sm:text-lg font-['Inter'] mb-8 sm:mb-10">
          Get exclusive access to new collections and special offers
        </p>

        {/* Newsletter Form */}
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 mb-4"
          data-readdy-form
          id="newsletter-form"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full sm:flex-1 h-12 sm:h-14 px-5 sm:px-6 bg-[#4A2323] text-white placeholder-gray-400 rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[#D19B6D] font-['Inter'] text-sm"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto h-12 sm:h-14 px-7 sm:px-8 bg-[#D19B6D] text-[#631D26] font-['Inter'] font-semibold text-sm sm:text-base rounded-full sm:rounded-l-none sm:rounded-r-full hover:bg-[#C49B2E] transition-all duration-300 flex items-center justify-center cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <i className="ri-loader-4-line animate-spin text-xl"></i>
            ) : (
              <>
                SUBSCRIBE
                <i className="ri-arrow-right-line ml-2 text-xl"></i>
              </>
            )}
          </button>
        </form>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <p className="text-[#D19B6D] text-sm font-['Inter'] mb-2">
            Thank you for subscribing! Check your email for exclusive offers.
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-300 text-sm font-['Inter'] mb-2">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Privacy Text */}
        <p className="text-gray-400 text-xs font-['Inter']">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;