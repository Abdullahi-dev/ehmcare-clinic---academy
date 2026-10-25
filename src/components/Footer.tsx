import React, { useState } from 'react';
import { IMAGES, CONTACT_INFO } from '../data/content.ts';
import { NavigationTab } from '../types.ts';
import { submitNewsletterSubscription } from '../utils/formSubmissionService.ts';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenBooking: () => void;
  onOpenEnrollment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const [activeModalPolicy, setActiveModalPolicy] = useState<'privacy' | 'terms' | null>(null);
  const [footerEmail, setFooterEmail] = useState('');
  const [footerStatus, setFooterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [footerMsg, setFooterMsg] = useState('');

  const handleFooterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(footerEmail.trim())) {
      setFooterStatus('error');
      setFooterMsg('Please enter a valid email');
      return;
    }
    setFooterStatus('loading');

    await submitNewsletterSubscription(footerEmail.trim(), 'Footer Subscriber', 'all');

    try {
      localStorage.setItem('ehmcare_newsletter_email', footerEmail.trim().toLowerCase());
    } catch {
      // Fallback
    }
    setFooterStatus('success');
    setFooterMsg('Subscribed!');
  };

  return (
    <footer className="w-full bg-[#f2f4f6] mt-10 pt-10 pb-8 border-t border-[#e0e3e5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Responsive 1 col (mobile) -> 2 cols (tablet) -> 4 cols (desktop) -> 5 cols (xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8 mb-8">
          {/* Col 0: Brand & Facility Addresses */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col min-w-0">
            <button
              onClick={() => onNavigate('treatments-and-tcm-care')}
              className="flex items-center gap-2 mb-2 text-left cursor-pointer"
            >
              <img
                alt="EHMCare Logo"
                className="h-9 w-auto object-contain shrink-0 bg-white/90 rounded p-0.5"
                src={IMAGES.logo}
              />
              <div className="flex flex-col">
                <span className="text-[19px] text-[#004c22] font-bold leading-tight tracking-tight">EHMCare</span>
                <span className="text-[10px] text-[#404940] font-bold tracking-wider uppercase leading-none whitespace-nowrap">
                  INTEGRATED HEALTHCARE
                </span>
              </div>
            </button>
            <p className="text-[13px] text-[#404940] mb-3 leading-relaxed">
              Nigeria's benchmark institutional facility for integrated clinical acupuncture, Chinese medicine, botanical pharmacology, and healthcare professional training.
            </p>
            <div className="text-[11px] text-[#404940] space-y-1.5">
              <p className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[#191c1e]">Call Line:</span>
                <a href={CONTACT_INFO.callHref} className="text-[#004c22] font-bold hover:underline">
                  {CONTACT_INFO.callPhone}
                </a>
              </p>
              <p className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[#191c1e]">WhatsApp:</span>
                <a
                  href={CONTACT_INFO.whatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#004c22] font-bold hover:underline"
                >
                  {CONTACT_INFO.whatsAppPhone}
                </a>
              </p>
              <p>
                <span className="font-bold text-[#191c1e]">Ilorin Center:</span> 7 Sofoluwe Street, Saboke, South, Ilorin 240223, Kwara State
              </p>
              <p>
                <span className="font-bold text-[#191c1e]">Abuja Center:</span> Maitama District, Abuja FCT
              </p>
            </div>
          </div>

          {/* Col 1: Clinic & Treatments */}
          <div className="min-w-0">
            <h4 className="text-[15px] sm:text-[16px] text-[#004c22] font-bold mb-3">Clinic & Treatments</h4>
            <ul className="space-y-1.5 text-[13px] text-[#404940]">
              <li>
                <button
                  onClick={() => onNavigate('treatments-and-tcm-care')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Acupuncture & Electro-Therapy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('treatments-and-tcm-care')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Neurological & Stroke Rehab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('treatments-and-tcm-care')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Reproductive & Fertility Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('treatments-and-tcm-care')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Cupping, Moxibustion & Guasha
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('treatments-and-tcm-care')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Naturopathic Hydrotherapy & Detox
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('treatments-and-tcm-care')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Herbal Prescriptions & Granules
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('treatments-and-tcm-care')}
                  className="hover:text-[#004c22] font-semibold transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <span>TCM & Treatments FAQ</span>
                  <span className="material-symbols-outlined text-[13px]">help_outline</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: EHMCare Academy */}
          <div className="min-w-0">
            <h4 className="text-[15px] sm:text-[16px] text-[#004c22] font-bold mb-3">EHMCare Academy</h4>
            <ul className="space-y-1.5 text-[13px] text-[#404940]">
              <li>
                <button
                  onClick={() => onNavigate('enroll-in-academy')}
                  className="hover:text-[#004c22] font-bold text-[#004c22] transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <span>Enroll in Academy (Admissions)</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ehmcare-academy')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Diploma in Holistic Medicine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ehmcare-academy')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Clinical Acupuncture Practicum
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('student-lms-portal')}
                  className="hover:text-[#004c22] font-bold transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <span>Student LMS Portal</span>
                  <span className="material-symbols-outlined text-[14px]">school</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ehmcare-academy')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Seminars & Intensive Workshops
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Divisions & Expansion */}
          <div className="min-w-0">
            <h4 className="text-[15px] sm:text-[16px] text-[#004c22] font-bold mb-3">Divisions & Expansion</h4>
            <ul className="space-y-1.5 text-[13px] text-[#404940]">
              <li>
                <button
                  onClick={() => onNavigate('future-divisions')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Diagnostic Center & Imaging Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('future-divisions')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  General Hospital Inpatient Wing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('future-divisions')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Botanical Drug Formulation Unit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('investor-and-global-partners')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Investor Pitch Deck & Feasibility
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('investor-and-global-partners')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Capital Allocation & Projections
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Media & Connect */}
          <div className="min-w-0">
            <h4 className="text-[15px] sm:text-[16px] text-[#004c22] font-bold mb-3">Media & Connect</h4>
            <ul className="space-y-1.5 text-[13px] text-[#404940]">
              <li>
                <button
                  onClick={() => onNavigate('patient-stories-and-videos')}
                  className="hover:text-[#191c1e] transition-colors cursor-pointer text-left"
                >
                  Patient Stories & Videos
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#004c22] font-bold transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <span>Online Booking Desk</span>
                  <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                </button>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#191c1e] transition-colors flex items-center gap-1"
                >
                  <span>Instagram @ehmcare</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#191c1e] transition-colors flex items-center gap-1"
                >
                  <span>YouTube Clinic Channel</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.callHref}
                  className="hover:text-[#004c22] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Helpline: {CONTACT_INFO.callPhone}</span>
                  <span className="material-symbols-outlined text-[13px]">call</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('admin-portal')}
                  className="hover:text-[#004c22] font-extrabold text-[#004c22] transition-colors cursor-pointer text-left flex items-center gap-1.5 mt-1 pt-1 border-t border-[#d8dadc]"
                >
                  <span className="material-symbols-outlined text-[15px]">admin_panel_settings</span>
                  <span>Admin Dashboard Portal</span>
                </button>
              </li>
            </ul>

            {/* Quick Newsletter in Footer */}
            <div className="mt-4 pt-3 border-t border-[#e0e3e5]">
              <p className="text-[12px] font-bold text-[#004c22] mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">mail</span>
                <span>Health & Academy Digest</span>
              </p>
              <p className="text-[11px] text-[#404940] mb-2 leading-tight">
                Get bi-weekly holistic remedies & training updates.
              </p>
              {footerStatus === 'success' ? (
                <div className="p-2 rounded-lg bg-[#acf770]/30 border border-[#356b00]/30 text-[#0c2000] text-[11px] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#004c22]">check_circle</span>
                  <span>{footerMsg || 'Subscribed successfully!'}</span>
                </div>
              ) : (
                <form onSubmit={handleFooterSubscribe} className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <input
                      type="email"
                      value={footerEmail}
                      onChange={(e) => {
                        setFooterEmail(e.target.value);
                        if (footerStatus === 'error') setFooterStatus('idle');
                      }}
                      placeholder="Your email..."
                      className="w-full px-2.5 py-1.5 text-[12px] rounded-lg bg-white border border-[#d0d3d5] text-[#191c1e] placeholder-[#8e9193] focus:outline-none focus:border-[#004c22]"
                    />
                    <button
                      type="submit"
                      disabled={footerStatus === 'loading'}
                      className="px-3 py-1.5 rounded-lg bg-[#004c22] text-white text-[11px] font-bold hover:bg-[#166534] transition-colors shrink-0 cursor-pointer disabled:opacity-70"
                      title="Subscribe to newsletter"
                    >
                      {footerStatus === 'loading' ? '...' : 'Join'}
                    </button>
                  </div>
                  {footerStatus === 'error' && (
                    <p className="text-[#ba1a1a] text-[10px] font-semibold">{footerMsg}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar: Zero Overflow & Fluid Stacking on Mobile/Tablet/Desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6 border-t border-[#e0e3e5]">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-[11px] font-bold text-[#404940]">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#e0e3e5]">
              <span className="material-symbols-outlined text-[#004c22] text-[14px]">verified</span>
              <span>Clinical Practice Certification</span>
            </div>
            <a
              href={CONTACT_INFO.callHref}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#e0e3e5] hover:bg-[#d8dadc] transition-colors text-[#004c22]"
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span>{CONTACT_INFO.callPhone}</span>
            </a>
            <a
              href={CONTACT_INFO.whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#acf770] text-[#0c2000] hover:bg-[#9de860] transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">chat</span>
              <span className="font-bold">WhatsApp: {CONTACT_INFO.whatsAppPhone}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4 text-[11px] text-[#404940]">
            <button
              onClick={() => setActiveModalPolicy('privacy')}
              className="hover:text-[#191c1e] transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModalPolicy('terms')}
              className="hover:text-[#191c1e] transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Clinical Terms of Service
            </button>
            <span className="text-center">© 2025 EHMCare Integrated Healthcare. All rights reserved.</span>
          </div>
        </div>

        {/* Modal for Privacy and Clinical Terms (replaces window.alert) */}
        {activeModalPolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#eceef0]">
              <div className="flex items-center justify-between pb-3 border-b border-[#eceef0]">
                <h3 className="text-[17px] font-bold text-[#004c22]">
                  {activeModalPolicy === 'privacy' ? 'Patient Confidentiality & Privacy Policy' : 'Clinical Practice Terms of Service'}
                </h3>
                <button
                  onClick={() => setActiveModalPolicy(null)}
                  className="p-1 rounded-lg text-[#404940] hover:bg-[#f2f4f6]"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="py-4 text-[13px] text-[#404940] leading-relaxed space-y-2">
                {activeModalPolicy === 'privacy' ? (
                  <>
                    <p>
                      EHMCare adheres strictly to the Nigeria Data Protection Regulation (NDPR) and international healthcare confidentiality protocols.
                    </p>
                    <p>
                      All diagnostic assessments, pulse records, and medical files collected during in-clinic consultations and tele-health sessions are encrypted and accessible exclusively by authorized clinical preceptors.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      EHMCare operates under accredited traditional and complementary healthcare guidelines. All practitioners maintain verified licenses in traditional Chinese medicine, acupuncture, and botanical pharmacotherapy.
                    </p>
                    <p>
                      Clinical triage appointments and diagnostic regimens are designed to complement ongoing medical care.
                    </p>
                  </>
                )}
              </div>
              <div className="pt-3 border-t border-[#eceef0] flex justify-end">
                <button
                  onClick={() => setActiveModalPolicy(null)}
                  className="px-4 py-2 bg-[#004c22] text-white text-[12px] font-bold rounded-lg hover:bg-[#166534]"
                >
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
