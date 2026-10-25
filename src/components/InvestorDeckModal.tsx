import React, { useState } from 'react';
import { generatePitchDeckPdf } from '../utils/generatePitchDeckPdf.ts';
import { CONTACT_INFO } from '../data/content.ts';
import { submitInvestorInquiry } from '../utils/formSubmissionService.ts';

interface InvestorDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvestorDeckModal: React.FC<InvestorDeckModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [entity, setEntity] = useState('');
  const [ticketSize, setTicketSize] = useState('₦50M - ₦250M');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await submitInvestorInquiry({
      name: fullName,
      email,
      phone,
      entity: entity || 'Private Healthcare Investor',
      ticketSize,
    });

    // 1. Trigger direct download of the official 12-slide PDF in /public/
    try {
      const link = document.createElement('a');
      link.href = '/EHMCARE_Investor_Presentation_2026.pdf';
      link.download = 'EHMCARE_Investor_Presentation_2026.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // 2. Fallback to dynamic generator
      generatePitchDeckPdf({
        name: fullName,
        email,
        phone,
        entity: entity || 'Private Investor',
        ticketSize,
      });
    }

    setIsSubmitting(false);
    setDownloadSuccess(true);
  };

  const handleResetAndClose = () => {
    setDownloadSuccess(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setEntity('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fadeIn"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#eceef0] overflow-hidden max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#004c22] text-[#ffffff] px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#166534]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#acf770] flex items-center justify-center text-[#004c22] shrink-0 font-bold">
              <span className="material-symbols-outlined text-[24px]">description</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[17px] leading-tight">EHMCARE Investor Presentation 2026</h3>
                <span className="bg-[#166534] text-[#acf770] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ₦12B Valuation
                </span>
              </div>
              <p className="text-[12px] text-[#93e0a2]">Official 12-Slide Confidential Memorandum & Feasibility</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-[#166534] text-[#ffffff] flex items-center justify-center hover:bg-[#00210b] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="p-4 rounded-xl bg-[#f2f4f6] border border-[#eceef0] space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#356b00]">
                Institutional Syndication Summary
              </span>
              <span className="text-[11px] font-semibold text-[#004c22] bg-[#a6f4b5] px-2.5 py-0.5 rounded-full">
                Dr. Adeyemi Isaaq Alabi (CEO) • RC: 8490484
              </span>
            </div>
            <h4 className="text-[15px] sm:text-[16px] font-bold text-[#004c22] leading-snug">
              Integrated Healthcare Built for Nigeria — Traditional & Modern Medicine Coordinated Ecosystem
            </h4>
            <p className="text-[12.5px] text-[#404940] leading-relaxed">
              Targeting ₦8.5B ($6.0M) capital raise across 3 milestone phases at ₦12B pre-money valuation (41.5% equity). Projected Year 3 revenue of ₦7.8B with 30% EBITDA margin and month 20 breakeven.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-2.5 rounded-lg bg-white border border-[#eceef0] text-center">
                <span className="text-[10px] text-[#404940] uppercase font-bold block">Pre-Money Val.</span>
                <p className="text-[15px] font-extrabold text-[#004c22]">₦12 Billion</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#eceef0] text-center">
                <span className="text-[10px] text-[#404940] uppercase font-bold block">Target Raise</span>
                <p className="text-[15px] font-extrabold text-[#356b00]">₦8.5 Billion</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#eceef0] text-center">
                <span className="text-[10px] text-[#404940] uppercase font-bold block">Y3 Proj. Rev.</span>
                <p className="text-[15px] font-extrabold text-[#004c22]">₦7.8 Billion</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#eceef0] text-center">
                <span className="text-[10px] text-[#404940] uppercase font-bold block">Breakeven</span>
                <p className="text-[15px] font-extrabold text-[#356b00]">Month 20</p>
              </div>
            </div>
          </div>

          {!downloadSuccess ? (
            <form onSubmit={handleDownload} className="space-y-3 pt-1">
              <div className="bg-[#ffffff] p-3 rounded-lg border border-[#e0e3e5] space-y-2.5">
                <p className="text-[12px] font-bold text-[#004c22] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  <span>Investor Credentials & Direct PDF Access</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-[#191c1e]">
                      Full Name / Representative <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. K. Ibrahim"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-[#191c1e]">
                      Gmail / Corporate Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="investor@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-[#191c1e]">
                      Phone Number (WhatsApp / Calls) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11.5px] font-bold text-[#191c1e]">Fund / Institutional Entity</label>
                    <input
                      type="text"
                      placeholder="e.g. Health Capital Partners"
                      value={entity}
                      onChange={(e) => setEntity(e.target.value)}
                      className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11.5px] font-bold text-[#191c1e]">Indicative Investment Scope</label>
                  <select
                    value={ticketSize}
                    onChange={(e) => setTicketSize(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none cursor-pointer"
                  >
                    <option value="₦50M - ₦250M (Private Individual / Angel)">₦50M - ₦250M (Private Individual / Angel)</option>
                    <option value="₦250M - ₦500M (Family Office / Syndicate)">₦250M - ₦500M (Family Office / Syndicate)</option>
                    <option value="₦500M - ₦1.5B (Institutional / Board Seat Option)">₦500M - ₦1.5B (Institutional / Board Seat Option)</option>
                    <option value="₦1.5B - ₦3.5B (Lead Institutional Investor)">₦1.5B - ₦3.5B (Lead Institutional Investor)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#404940]">
                <span className="material-symbols-outlined text-[#356b00] text-[16px]">lock</span>
                <span>Immediate PDF download. Your contact is logged into EHMCare Investor Registry & dispatched to executive leadership.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-[#004c22] text-white font-bold text-[14px] hover:bg-[#166534] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                <span>{isSubmitting ? 'Generating PDF...' : 'Download Official 12-Slide Pitch Deck (PDF)'}</span>
              </button>
            </form>
          ) : (
            <div className="p-5 rounded-xl bg-[#acf770]/30 border border-[#acf770] text-center space-y-3 animate-fadeIn">
              <span className="material-symbols-outlined text-[#356b00] text-[40px]">check_circle</span>
              <h5 className="text-[17px] font-bold text-[#004c22]">
                Official Presentation Downloaded & Dispatched
              </h5>
              <p className="text-[13px] text-[#404940] max-w-md mx-auto leading-relaxed">
                The <strong>EHMCARE_Investor_Presentation_2026.pdf</strong> file has been saved to your downloads. Your contact details ({email} • {phone}) were registered with <strong>ehmcaree@gmail.com</strong> for confidential syndicate review.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href="/EHMCARE_Investor_Presentation_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#ffffff] text-[#004c22] font-bold text-[12px] border border-[#eceef0] hover:bg-[#f2f4f6] flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  <span>Open PDF in Tab</span>
                </a>

                <a
                  href="/EHMCARE_Investor_Presentation_2026.pdf"
                  download="EHMCARE_Investor_Presentation_2026.pdf"
                  className="px-4 py-2.5 rounded-lg bg-[#004c22] text-white font-bold text-[12px] hover:bg-[#166534] flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Direct Download (.PDF)</span>
                </a>

                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsAppRaw}?text=Hello%20Dr.%20Adeyemi%20Alabi,%20I%20have%20reviewed%20the%20EHMCARE%20₦12B%20Investor%20Deck%20and%20would%20like%20to%20schedule%20an%20executive%20briefing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#acf770] text-[#0c2000] font-bold text-[12px] flex items-center gap-1.5 hover:bg-[#9de860] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Direct WhatsApp: {CONTACT_INFO.whatsAppPhone}</span>
                </a>
              </div>

              <div className="mt-3 p-2.5 bg-white/80 rounded-lg border border-[#acf770] text-[11px] text-[#404940] text-left">
                <span className="font-bold text-[#004c22]">File Storage Location:</span> The presentation file is served at <code className="bg-[#f2f4f6] px-1 py-0.5 rounded text-[#004c22] font-semibold">/public/EHMCARE_Investor_Presentation_2026.pdf</code>. You can replace or upload any new PDF version directly into this folder anytime!
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f2f4f6] px-5 sm:px-6 py-3 border-t border-[#eceef0] flex items-center justify-between text-[11px] text-[#404940]">
          <span>EHMCARE CLINIC LTD • RC 8490484 • 4 Sofoluwe St, Ilorin</span>
          <button
            onClick={handleResetAndClose}
            className="font-bold text-[#004c22] hover:underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
