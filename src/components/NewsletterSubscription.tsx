import React, { useState, useEffect } from 'react';
import { submitNewsletterSubscription } from '../utils/formSubmissionService.ts';

interface NewsletterSubscriptionProps {
  variant?: 'section' | 'card';
  className?: string;
  onSubscribeSuccess?: (email: string) => void;
}

type TopicCategory = 'all' | 'health-tips' | 'academy-updates';

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  variant = 'section',
  className = '',
  onSubscribeSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<TopicCategory>('all');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  // Check existing subscription in localStorage
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('ehmcare_newsletter_email');
      if (savedEmail) {
        setSubscribedEmail(savedEmail);
      }
    } catch {
      // Ignore localStorage errors in private mode
    }
  }, []);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email format (e.g. name@example.com).');
      return;
    }

    setStatus('loading');

    submitNewsletterSubscription(email.trim(), fullName.trim(), selectedTopic).then(() => {
      try {
        localStorage.setItem('ehmcare_newsletter_email', email.trim().toLowerCase());
        setSubscribedEmail(email.trim().toLowerCase());
      } catch {
        // Fallback
      }

      setStatus('success');
      if (onSubscribeSuccess) {
        onSubscribeSuccess(email.trim());
      }
    });
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setFullName('');
    setErrorMessage('');
  };

  if (variant === 'card') {
    return (
      <div className={`bg-[#004c22] text-[#ffffff] rounded-2xl p-6 sm:p-8 shadow-xl border border-[#acf770]/20 ${className}`}>
        <div className="flex items-center gap-2 text-[#acf770] text-[12px] font-bold uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-[18px]">mark_email_read</span>
          <span>EHMCare Dispatch</span>
        </div>
        <h3 className="text-[20px] sm:text-[22px] font-bold leading-tight mb-2">
          Clinical Health Tips & Academy Updates
        </h3>
        <p className="text-[13px] text-[#e0e3e5] mb-5 leading-relaxed">
          Receive weekly meridian therapy insights, herbal pharmacotherapy guides, and upcoming academy intake announcements directly to your inbox.
        </p>

        {status === 'success' ? (
          <div className="p-4 rounded-xl bg-[#acf770]/20 border border-[#acf770]/40 text-[#ffffff] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#acf770]">
              <span className="material-symbols-outlined text-[22px]">check_circle</span>
              <span className="font-bold text-[14px]">Subscription Confirmed!</span>
            </div>
            <p className="text-[12px] text-[#e0e3e5]">
              You're all set to receive clinical tips and academy digests at <strong className="text-white">{email || subscribedEmail}</strong>.
            </p>
            <button
              onClick={handleReset}
              className="text-[11px] text-[#acf770] hover:underline font-semibold self-start mt-1 cursor-pointer"
            >
              Subscribe another email address
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#404940] text-[18px]">
                mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-[#191c1e] text-[13px] placeholder-[#8e9193] focus:outline-none focus:ring-2 focus:ring-[#acf770]"
              />
            </div>
            {status === 'error' && (
              <p className="text-[#ffb4ab] text-[11px] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                <span>{errorMessage}</span>
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-2.5 rounded-xl bg-[#acf770] text-[#0c2000] font-bold text-[13px] hover:bg-[#9de860] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-[#0c2000] border-t-transparent rounded-full animate-spin"></span>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Join Newsletter</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    );
  }

  // Full section variant (default for bottom of main page)
  return (
    <section className={`w-full bg-gradient-to-b from-[#f2f4f6] to-[#e8ecef] py-16 sm:py-20 border-t border-[#e0e3e5] relative overflow-hidden ${className}`}>
      {/* Subtle decorative background shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#acf770]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#004c22]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#004c22] rounded-3xl shadow-2xl overflow-hidden border border-[#a6f4b5]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Context, Value Proposition & Highlights */}
            <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between text-white relative">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#356b00]/80 border border-[#acf770]/30 text-[#acf770] text-[11px] font-bold uppercase tracking-wider mb-5">
                  <span className="material-symbols-outlined text-[16px]">mark_email_read</span>
                  <span>EHMCare Dispatch • Free Bi-Weekly Digest</span>
                </div>

                <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#ffffff] tracking-tight leading-[1.15] mb-4">
                  Stay Updated on Natural Healing & Academy Insights
                </h2>

                <p className="text-[14px] sm:text-[15px] text-[#e0e3e5] leading-relaxed mb-8">
                  Get physician-vetted acupuncture and botanical medicine case notes, seasonal meridian wellness regimens, and priority notices for new diploma intakes at our Ilorin campus.
                </p>

                {/* Key Benefits List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 mb-6">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="material-symbols-outlined text-[#acf770] text-[22px] shrink-0">spa</span>
                    <div>
                      <h4 className="text-[13px] font-bold text-white">Clinical Health Tips</h4>
                      <p className="text-[11px] text-[#e0e3e5]">Acupressure protocols, herbal formulas & pain relief advice.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="material-symbols-outlined text-[#acf770] text-[22px] shrink-0">school</span>
                    <div>
                      <h4 className="text-[13px] font-bold text-white">Academy & Admissions</h4>
                      <p className="text-[11px] text-[#e0e3e5]">Diploma intakes, tuition scholarships & practicum alerts.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="material-symbols-outlined text-[#acf770] text-[22px] shrink-0">medical_services</span>
                    <div>
                      <h4 className="text-[13px] font-bold text-white">Case Recovery Notes</h4>
                      <p className="text-[11px] text-[#e0e3e5]">Stroke rehabilitation & chronic ailment breakthroughs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="material-symbols-outlined text-[#acf770] text-[22px] shrink-0">event_available</span>
                    <div>
                      <h4 className="text-[13px] font-bold text-white">Seminars & Masterclasses</h4>
                      <p className="text-[11px] text-[#e0e3e5]">Early invitations to free live webinars and hands-on workshops.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/15 text-[11px] text-[#e0e3e5]">
                <span className="material-symbols-outlined text-[#acf770] text-[18px]">verified_user</span>
                <span>Strict NDPR healthcare privacy compliant. 1-click unsubscribe at any time. No spam, ever.</span>
              </div>
            </div>

            {/* Right Column: Interactive Subscription Form */}
            <div className="lg:col-span-6 bg-[#ffffff] p-8 sm:p-10 lg:p-12 flex flex-col justify-center text-[#191c1e]">
              {status === 'success' ? (
                <div className="text-center py-6 sm:py-8 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#a6f4b5]/40 text-[#004c22] mx-auto flex items-center justify-center">
                    <span className="material-symbols-outlined text-[36px]">check_circle</span>
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#e8f5e9] text-[#004c22] text-[11px] font-bold uppercase tracking-wider">
                      Welcome to the EHMCare Community
                    </span>
                    <h3 className="text-[24px] font-extrabold text-[#004c22] mt-2">
                      You're Officially Subscribed!
                    </h3>
                    <p className="text-[14px] text-[#404940] mt-2 max-w-md mx-auto">
                      Thank you for joining. We have queued your first clinical bulletin and welcome guide to:
                    </p>
                    <p className="text-[15px] font-bold text-[#191c1e] mt-1 bg-[#f2f4f6] py-1.5 px-4 rounded-lg inline-block border border-[#e0e3e5]">
                      {email || subscribedEmail}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f7f9fb] border border-[#eceef0] text-left text-[12px] text-[#404940] space-y-1.5 max-w-md mx-auto">
                    <p className="font-bold text-[#191c1e] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#004c22] text-[16px]">task_alt</span>
                      <span>Selected Topics:</span>
                    </p>
                    <p className="pl-5 text-[#004c22] font-semibold">
                      {selectedTopic === 'all'
                        ? 'Health Tips + Academy Updates & Case Studies'
                        : selectedTopic === 'health-tips'
                        ? 'Clinical Health Tips & Herbal Prescriptions'
                        : 'Academy Updates, Cohorts & Masterclasses'}
                    </p>
                    <p className="pl-5 text-[11px] text-[#6b7280]">
                      Frequency: Bi-weekly every 2nd and 4th Thursday morning.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-[#004c22] text-white text-[13px] font-bold hover:bg-[#166534] transition-colors cursor-pointer"
                    >
                      Subscribe Another Email
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-[22px] sm:text-[24px] font-bold text-[#004c22] tracking-tight">
                      Subscribe to the Bulletin
                    </h3>
                    <p className="text-[13px] text-[#404940] mt-1">
                      Choose which updates you'd like to receive directly from our clinical preceptors.
                    </p>
                  </div>

                  {/* Topic Preference Selector */}
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-[#191c1e] block">
                      Select Your Preferred Focus:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedTopic('all')}
                        className={`px-3 py-2.5 rounded-xl text-left border text-[12px] font-bold transition-all flex flex-col justify-center cursor-pointer ${
                          selectedTopic === 'all'
                            ? 'bg-[#004c22] text-white border-[#004c22] shadow-sm'
                            : 'bg-[#f7f9fb] text-[#404940] border-[#eceef0] hover:border-[#004c22]/40'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">all_inclusive</span>
                          <span>All Updates</span>
                        </span>
                        <span className={`text-[10px] font-normal mt-0.5 ${selectedTopic === 'all' ? 'text-[#acf770]' : 'text-[#6b7280]'}`}>
                          Health + Academy
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTopic('health-tips')}
                        className={`px-3 py-2.5 rounded-xl text-left border text-[12px] font-bold transition-all flex flex-col justify-center cursor-pointer ${
                          selectedTopic === 'health-tips'
                            ? 'bg-[#004c22] text-white border-[#004c22] shadow-sm'
                            : 'bg-[#f7f9fb] text-[#404940] border-[#eceef0] hover:border-[#004c22]/40'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">spa</span>
                          <span>Health Tips</span>
                        </span>
                        <span className={`text-[10px] font-normal mt-0.5 ${selectedTopic === 'health-tips' ? 'text-[#acf770]' : 'text-[#6b7280]'}`}>
                          Wellness & remedies
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTopic('academy-updates')}
                        className={`px-3 py-2.5 rounded-xl text-left border text-[12px] font-bold transition-all flex flex-col justify-center cursor-pointer ${
                          selectedTopic === 'academy-updates'
                            ? 'bg-[#004c22] text-white border-[#004c22] shadow-sm'
                            : 'bg-[#f7f9fb] text-[#404940] border-[#eceef0] hover:border-[#004c22]/40'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">school</span>
                          <span>Academy</span>
                        </span>
                        <span className={`text-[10px] font-normal mt-0.5 ${selectedTopic === 'academy-updates' ? 'text-[#acf770]' : 'text-[#6b7280]'}`}>
                          Courses & training
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Name field (optional) */}
                  <div className="space-y-1.5">
                    <label htmlFor="nl-name" className="text-[12px] font-bold text-[#191c1e] flex items-center justify-between">
                      <span>Full Name (Optional)</span>
                      <span className="text-[11px] font-normal text-[#6b7280]">For personalized briefings</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#404940] text-[18px]">
                        person
                      </span>
                      <input
                        id="nl-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Alaba / Mrs. Fatima"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f9fb] border border-[#e0e3e5] text-[14px] text-[#191c1e] placeholder-[#8e9193] focus:outline-none focus:border-[#004c22] focus:bg-white focus:ring-2 focus:ring-[#a6f4b5]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email address field (required) */}
                  <div className="space-y-1.5">
                    <label htmlFor="nl-email" className="text-[12px] font-bold text-[#191c1e] flex items-center justify-between">
                      <span>Email Address <span className="text-[#ba1a1a]">*</span></span>
                      {subscribedEmail && (
                        <span className="text-[11px] text-[#004c22] font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[12px]">check</span>
                          Saved previously
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#404940] text-[18px]">
                        mail
                      </span>
                      <input
                        id="nl-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        placeholder="name@organization.com or personal email"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f9fb] border text-[14px] text-[#191c1e] placeholder-[#8e9193] focus:outline-none focus:border-[#004c22] focus:bg-white focus:ring-2 focus:ring-[#a6f4b5]/40 transition-all ${
                          status === 'error' ? 'border-[#ba1a1a] bg-[#fff8f7]' : 'border-[#e0e3e5]'
                        }`}
                        required
                      />
                    </div>
                    {status === 'error' && (
                      <p className="text-[#ba1a1a] text-[11px] font-bold flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        <span>{errorMessage}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-3.5 rounded-xl bg-[#004c22] text-[#ffffff] font-bold text-[14px] hover:bg-[#166534] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px] text-[#acf770]">send</span>
                          <span>Subscribe for Health Tips & Academy Updates</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Anti-spam notice */}
                  <p className="text-[11px] text-[#6b7280] text-center leading-relaxed">
                    By subscribing, you agree to receive EHMCare newsletters. We respect patient & subscriber confidentiality under the NDPR. You can opt out at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
