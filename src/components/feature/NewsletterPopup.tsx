import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

const POPUP_KEY = 'bunmi_popup_shown';

const NewsletterPopup = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(POPUP_KEY);
    if (alreadyShown) return;

    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setMounted(true);
      sessionStorage.setItem(POPUP_KEY, 'true');
    };

    // 60-second timer
    const timer = setTimeout(trigger, 60000);

    // Exit intent: mouse leaving the top of the viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        trigger();
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const showTimer = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(showTimer);
  }, [mounted]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setMounted(false), 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email: trimmed },
      });

      if (error) {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again.');
        return;
      }

      if (data?.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data?.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ transition: 'opacity 0.4s ease', opacity: visible ? 1 : 0 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-sm bg-[#FAF5F0] shadow-2xl overflow-hidden"
        style={{
          transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(16px)',
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-[#631D26]" />

        <div className="px-8 py-9">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#631D26] text-white hover:bg-[#3D1F1F] transition-colors cursor-pointer rounded-full z-20"
            aria-label="Close"
          >
            <i className="ri-close-line text-base" />
          </button>

          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#631D26]/10 mx-auto mb-3">
                <i className="ri-check-line text-2xl text-[#631D26]" />
              </div>
              <p className="font-['Bebas_Neue'] text-xl text-[#631D26] tracking-wider mb-1">
                Welcome to the Society!
              </p>
              <p className="font-['Inter'] text-sm text-[#9B7B6A]">
                You're on the list. Expect exclusive updates soon.
              </p>
              <button
                onClick={handleClose}
                className="whitespace-nowrap mt-5 px-6 py-2 bg-[#631D26] hover:bg-[#3D1F1F] text-white font-['Bebas_Neue'] text-sm tracking-[0.2em] uppercase transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="font-['Bebas_Neue'] text-xs tracking-[0.3em] text-[#9B7B6A] uppercase mb-2">
                Exclusive Membership
              </p>
              <h2 className="font-['Bebas_Neue'] text-3xl text-[#631D26] tracking-wider leading-tight mb-2">
                JOIN THE BUNMI SOCIETY
              </h2>
              <div className="w-10 h-0.5 bg-[#631D26] mb-5" />

              <ul className="font-['Inter'] text-sm text-[#3D1F1F] mb-6 space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#631D26] flex-shrink-0" />
                  First access to private releases.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#631D26] flex-shrink-0" />
                  A seat at the table when shaping our next textures.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#631D26] flex-shrink-0" />
                  Signature hair care routines built for longevity and timeliness.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#631D26] flex-shrink-0" />
                  For women whose standards are non-negotiable.
                </li>
              </ul>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 text-sm font-['Inter'] bg-white border border-[#D4B8A8] focus:border-[#631D26] focus:outline-none text-[#3D1F1F] placeholder-[#C4A898] transition-colors"
                />

                {errorMsg && (
                  <p className="font-['Inter'] text-xs text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="whitespace-nowrap w-full py-3 bg-[#631D26] hover:bg-[#3D1F1F] disabled:opacity-60 text-white font-['Bebas_Neue'] text-sm tracking-[0.25em] uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-base" />
                      Joining...
                    </>
                  ) : (
                    'Join the Society'
                  )}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={handleClose}
                  className="whitespace-nowrap font-['Inter'] text-xs text-[#9B7B6A] hover:text-[#631D26] underline underline-offset-2 transition-colors cursor-pointer bg-transparent border-none"
                >
                  No Thanks
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
