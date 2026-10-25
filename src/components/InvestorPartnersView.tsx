import React, { useState } from 'react';
import { INVESTOR_PITCH_DATA, CONTACT_INFO, IMAGES } from '../data/content.ts';

interface InvestorPartnersViewProps {
  onOpenDeck: () => void;
}

export const InvestorPartnersView: React.FC<InvestorPartnersViewProps> = ({
  onOpenDeck,
}) => {
  // Direct Pitch Deck Download State
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccessNotice, setDownloadSuccessNotice] = useState(false);

  // Principal Briefing Booking State
  const [briefingForm, setBriefingForm] = useState({
    repName: '',
    institution: '',
    email: '',
    phone: '',
    ticketSize: '₦250M - ₦500M ($175K - $350K)',
    format: 'Virtual Strategic Zoom Briefing',
    date: '2025-05-15',
    notes: '',
  });
  const [isBriefingTicketDropdownOpen, setIsBriefingTicketDropdownOpen] = useState(false);
  const [briefingSubmitted, setBriefingSubmitted] = useState(false);

  // Active Financial Filter Tab
  const [financialView, setFinancialView] = useState<'statement' | 'volume'>('statement');

  const ticketOptions = [
    {
      tier: 'Tier 1 • Syndicate Angel',
      range: '₦50M - ₦250M ($35K - $175K)',
      desc: 'Accredited private investors & syndication tranches',
      icon: 'savings',
    },
    {
      tier: 'Tier 2 • Institutional Tranche',
      range: '₦250M - ₦500M ($175K - $350K)',
      desc: 'Healthcare family offices & strategic private equity',
      icon: 'account_balance',
    },
    {
      tier: 'Tier 3 • Lead Syndicate & Board Seat',
      range: '₦500M - ₦1.5B ($350K - $1.0M)',
      desc: 'Board of Directors representation & audit observer rights',
      icon: 'stars',
    },
    {
      tier: 'Tier 4 • Anchor Sovereign / DFIs',
      range: '₦1.5B+ ($1.0M+)',
      desc: 'Institutional development finance & sovereign impact funds',
      icon: 'public',
    },
  ];

  // Immediate download trigger for official 12-slide Pitch Deck PDF
  const handleDirectDownload = () => {
    setIsDownloading(true);

    try {
      const existing = JSON.parse(localStorage.getItem('ehmcare_investor_leads') || '[]');
      existing.unshift({
        type: 'Official 12-Slide Pitch Deck Download',
        recipient: 'devabdultechnologies@gmail.com, ehmcaree@gmail.com',
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('ehmcare_investor_leads', JSON.stringify(existing));
    } catch {
      // ignore
    }

    try {
      fetch('/api/investor-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Direct Pitch Deck Download',
          recipient: 'devabdultechnologies@gmail.com, ehmcaree@gmail.com',
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => null);
    } catch {
      // ignore
    }

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/EHMCARE_Investor_Presentation_2026.pdf';
      link.download = 'EHMCARE_Investor_Presentation_2026.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
      setDownloadSuccessNotice(true);
      setTimeout(() => setDownloadSuccessNotice(false), 5000);
    }, 400);
  };

  const handleBriefingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const existing = JSON.parse(localStorage.getItem('ehmcare_briefing_requests') || '[]');
      existing.unshift({
        ...briefingForm,
        recipient: 'devabdultechnologies@gmail.com, ehmcaree@gmail.com',
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('ehmcare_briefing_requests', JSON.stringify(existing));
    } catch {
      // ignore
    }

    try {
      fetch('/api/investor-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...briefingForm,
          type: 'Principal Briefing Scheduled',
          recipient: 'devabdultechnologies@gmail.com, ehmcaree@gmail.com',
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => null);
    } catch {
      // ignore
    }

    setBriefingSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full bg-[#f8faf9] text-[#111827]">
      {/* Download Alert Toast */}
      {downloadSuccessNotice && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#004c22] text-white shadow-2xl border border-[#a6f4b5]/40 flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#acf770] text-[24px]">check_circle</span>
          <div>
            <p className="text-[13px] font-bold">12-Slide Pitch Deck Downloaded!</p>
            <p className="text-[11px] text-white/80">EHMCARE_Investor_Presentation_2026.pdf is ready on your device.</p>
          </div>
        </div>
      )}

      {/* =========================================================================
          1. HERO SECTION: Executive Strategy Dossier & Feasibility
          EHMCare Healthcare Expansion & Modern Diagnostic Wing
          Clean editorial prestige styling with ambient organic glow aura,
          top meta status bar, asymmetric narrative split, key metrics strip,
          and high-fidelity diagnostic visual blueprint.
          ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f2f4f6] via-[#f7f9fb] to-[#f7f9fb] pb-14 pt-8 border-b border-[#e5e7eb]">
        {/* Ambient organic depth glow aura */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-[#a6f4b5]/20 rounded-full blur-[110px]"></div>

        <div className="max-w-7xl mx-auto px-4 lg:px-10 relative z-10">
          {/* Top Series A Syndication Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#eceef0]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e0e3e5] shadow-xs border border-[#eceef0]">
              <span className="material-symbols-outlined text-[#004c22] text-[18px]">verified_user</span>
              <span className="text-[11px] tracking-wider uppercase text-[#004c22] font-bold">
                Executive Strategy Dossier &amp; Feasibility
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[#404940] text-[12px] font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-pulse"></span>
                <span className="font-bold text-[#052e16]">Entity:</span> EHMCARE CLINIC LTD (RC: {INVESTOR_PITCH_DATA.rcNumber})
              </span>
              <span className="hidden sm:inline text-[#d1d5db]">•</span>
              <span className="hidden sm:inline font-mono text-[#004c22]">Ref: EHM-SYND-2026-A1</span>
              <span className="hidden md:inline text-[#d1d5db]">•</span>
              <span className="text-[#166534] font-bold">Series A Syndicate Open (41.5% Pool)</span>
            </div>
          </div>

          {/* Main Asymmetric Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Proposition, CTAs, and Underwriting Metric Strip */}
            <div className="lg:col-span-7 flex flex-col">
              <h1 className="font-['Plus_Jakarta_Sans'] text-display-lg-mobile lg:text-display-lg text-[#004c22] tracking-tight mb-4 font-extrabold leading-tight">
                EHMCare Healthcare Expansion &amp; <span className="text-[#356b00]">Modern Diagnostic Wing</span>
              </h1>

              <p className="text-[17px] text-[#404940] leading-relaxed max-w-2xl mb-7">
                Institutional syndication round ($6.35M CapEx / ₦8.5B phased raise) establishing Nigeria’s premier synchronized medical campus: uniting high-resolution 1.5T MRI &amp; 64-Slice CT diagnostic imaging, a 50-bed inpatient tertiary hospital wing, WHO &amp; NAFDAC GMP botanical pharmaceutical mass manufacturing, and an accredited clinical academy.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <button
                  type="button"
                  onClick={handleDirectDownload}
                  disabled={isDownloading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#166534] hover:bg-[#004c22] text-[#ffffff] font-extrabold text-[14px] shadow-md transition-all cursor-pointer group disabled:opacity-75"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#acf770]">
                    {isDownloading ? 'sync' : 'download_for_offline'}
                  </span>
                  <span>{isDownloading ? 'Downloading Pitch Deck...' : 'Download Official Pitch Deck (.PDF)'}</span>
                </button>

                <a
                  href="#principal-briefing"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#e0e3e5] hover:bg-[#d8dadc] text-[#004c22] font-extrabold text-[14px] shadow-xs transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  <span>Schedule Executive Briefing</span>
                </a>

                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsAppRaw}?text=Hello%20Dr.%20Adeyemi%20Alabi,%20I%20am%20reviewing%20the%20EHMCARE%20Series%20A%20Executive%20Strategy%20Dossier.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-[14px] shadow-xs transition-all cursor-pointer"
                  title="Direct WhatsApp link with CEO Dr. Adeyemi Alabi"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp CEO</span>
                </a>
              </div>

              {/* Core Underwriting & Valuation Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-[#ffffff]/95 backdrop-blur-xs border border-[#eceef0] shadow-sm">
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[10.5px] uppercase font-bold text-[#6b7280] block leading-snug">Pre-Money Valuation</span>
                  <p className="text-[18px] sm:text-[22px] leading-tight font-black text-[#004c22] mt-0.5 truncate">
                    {INVESTOR_PITCH_DATA.valuationPreMoney}
                  </p>
                  <span className="text-[9.5px] sm:text-[10px] text-[#16a34a] font-semibold block mt-0.5 leading-snug">Baseline Entity Equity</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[10.5px] uppercase font-bold text-[#6b7280] block leading-snug">Target CapEx Raise</span>
                  <p className="text-[18px] sm:text-[22px] leading-tight font-black text-[#356b00] mt-0.5 truncate">
                    $6.35M
                  </p>
                  <span className="text-[9.5px] sm:text-[10px] text-[#4b5563] font-semibold block mt-0.5 leading-snug">₦8.5B Phased Round</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[10.5px] uppercase font-bold text-[#6b7280] block leading-snug">5-Yr Projected IRR</span>
                  <p className="text-[18px] sm:text-[22px] leading-tight font-black text-[#004c22] mt-0.5 truncate">
                    24.6%
                  </p>
                  <span className="text-[9.5px] sm:text-[10px] text-[#4b5563] font-semibold block mt-0.5 leading-snug">Month 20 EBITDA B/E</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[10.5px] uppercase font-bold text-[#6b7280] block leading-snug">Projected Y3 Revenue</span>
                  <p className="text-[18px] sm:text-[22px] leading-tight font-black text-[#166534] mt-0.5 truncate">
                    {INVESTOR_PITCH_DATA.yearThreeRevenue}
                  </p>
                  <span className="text-[9.5px] sm:text-[10px] text-[#16a34a] font-semibold block mt-0.5 leading-snug">30% EBITDA Margin</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Blueprint with Modern Diagnostic Wing */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#e6e8ea] border-2 border-[#eceef0] group">
                <div
                  className="w-full h-[430px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${IMAGES.futureDiagnostic}')` }}
                ></div>

                {/* Dark Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Frosted Clinical Blueprint Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#ffffff]/95 backdrop-blur-md shadow-lg border border-[#eceef0]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#004c22] text-[20px]">biotech</span>
                      <span className="text-[13px] font-extrabold text-[#191c1e]">
                        Modern Diagnostic Wing &amp; Hospital Blueprint
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold bg-[#acf770] text-[#00210b]">
                      Phase 1 &amp; 2 Validated
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#404940] line-clamp-2 leading-relaxed">
                    Integrated Ilorin (Sabo-Oke) &amp; Lekki healthcare master plan: combining 1.5T MRI, 64-Slice CT, 50-bed inpatient surgery, and NAFDAC-certified herbal manufacturing lines.
                  </p>
                </div>
              </div>

              {/* Floating Credential Badges */}
              <div className="absolute -top-3 -right-3 p-3 bg-[#004c22] text-[#ffffff] rounded-2xl shadow-xl flex items-center gap-2.5 border border-[#a6f4b5]/30">
                <span className="material-symbols-outlined text-[#acf770] text-[24px]">verified</span>
                <div className="flex flex-col pr-1 text-left">
                  <span className="text-[11px] leading-none font-extrabold">NNRA &amp; RRBN</span>
                  <span className="text-[10px] text-[#e6e8ea] mt-0.5">Pre-Approved Licensing</span>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-3 p-3 bg-[#ffffff] text-[#004c22] rounded-2xl shadow-xl flex items-center gap-2 border border-[#eceef0] hidden sm:flex">
                <span className="material-symbols-outlined text-[#16a34a] text-[22px]">account_balance</span>
                <div className="flex flex-col pr-1 text-left">
                  <span className="text-[11px] leading-none font-black text-[#052e16]">41.5% Equity Offered</span>
                  <span className="text-[10px] text-[#4b5563] mt-0.5">Syndicate Tranche Allocation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CAPEX ALLOCATION & 3 EXPANSION PILLARS ($6.35M / ₦8.5B)
          ========================================================================= */}
      <section className="w-full py-16 bg-white border-b border-[#e5e7eb]" id="capex-breakdown">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#004c22]">
                Series A Capital Deployment ($6.35M / ₦8.5B)
              </span>
              <h2 className="text-[30px] lg:text-[34px] font-extrabold text-[#052e16] mt-1">
                CapEx Allocation &amp; Core Expansion Pillars
              </h2>
            </div>
            <p className="text-[14px] text-[#4b5563] max-w-lg">
              Structured to fund high-margin diagnostic machinery, inpatient hospital stabilization, and pharmaceutical manufacturing with month-20 EBITDA breakeven.
            </p>
          </div>

          {/* Proportional Visual Allocation Bar */}
          <div className="mb-10 p-5 rounded-2xl bg-[#f8faf9] border border-[#e5e7eb] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold text-[#052e16] uppercase tracking-wider">
                Proportional CapEx Distribution (100% / $6.35M)
              </span>
              <span className="text-[12px] font-extrabold text-[#004c22]">
                Total Round: $6.35M (₦8.5B)
              </span>
            </div>

            {/* Multi-segment Progress Bar */}
            <div className="w-full h-5 rounded-xl overflow-hidden flex bg-[#e5e7eb] shadow-inner">
              <div className="h-full bg-[#004c22] text-[10px] font-bold text-white flex items-center justify-center" style={{ width: '35%' }} title="Diagnostic Center 35%">
                35%
              </div>
              <div className="h-full bg-[#166534] text-[10px] font-bold text-white flex items-center justify-center" style={{ width: '25%' }} title="Inpatient Wing 25%">
                25%
              </div>
              <div className="h-full bg-[#15803d] text-[10px] font-bold text-white flex items-center justify-center" style={{ width: '15%' }} title="Clinical Academy 15%">
                15%
              </div>
              <div className="h-full bg-[#16a34a] text-[10px] font-bold text-white flex items-center justify-center" style={{ width: '12%' }} title="Pharmaceutical Manufacturing 12%">
                12%
              </div>
              <div className="h-full bg-[#22c55e] text-[10px] font-bold text-[#052e16] flex items-center justify-center" style={{ width: '8%' }} title="EHConnect AI Telemedicine 8%">
                8%
              </div>
              <div className="h-full bg-[#acf770] text-[10px] font-bold text-[#052e16] flex items-center justify-center" style={{ width: '5%' }} title="Working Capital 5%">
                5%
              </div>
            </div>

            {/* Bar Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-3 text-[11px] font-medium text-[#4b5563]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#004c22]"></span>
                <span>Diagnostics (35% • $1.45M)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#166534]"></span>
                <span>Hospital Wing (25% • $2.80M)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#15803d]"></span>
                <span>Academy (15% • $0.85M)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#16a34a]"></span>
                <span>Pharma Plant (12% • $2.10M)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#22c55e]"></span>
                <span>EHConnect AI (8% • $0.45M)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#acf770]"></span>
                <span>Working Capital (5% • $0.30M)</span>
              </div>
            </div>
          </div>

          {/* Bento Financial Breakdown Cards for the Three Primary Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Pillar 1: Diagnostic Center */}
            <div className="rounded-3xl bg-[#f8faf9] border-2 border-[#e5e7eb] hover:border-[#004c22] p-6 shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#004c22] text-[#acf770] flex items-center justify-center font-black text-[18px]">
                    01
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#004c22]/10 text-[#004c22] text-[11px] font-bold">
                    $1.45M CapEx (₦2.98B)
                  </span>
                </div>

                <h3 className="text-[20px] font-extrabold text-[#052e16] mb-2">
                  Diagnostic Imaging Center
                </h3>
                <p className="text-[13px] text-[#4b5563] leading-relaxed mb-4">
                  High-throughput regional center serving North-Central Nigeria. Eliminates 72-hour test wait times with real-time digital PACS cloud reporting.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#004c22] text-[18px] shrink-0">check_circle</span>
                    <span><strong>1.5T Superconducting MRI &amp; 64-Slice CT Scanner</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#004c22] text-[18px] shrink-0">check_circle</span>
                    <span>High-Frequency Digital Radiography (X-Ray)</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#004c22] text-[18px] shrink-0">check_circle</span>
                    <span>Automated Biochemistry &amp; Immunoassay Pathology</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#004c22] text-[18px] shrink-0">check_circle</span>
                    <span>NNRA &amp; RRBN Licensing Pre-Approved</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-between text-[11.5px] text-[#4b5563]">
                <span>Target Launch: <strong>Q4 2025</strong></span>
                <span className="text-[#004c22] font-bold">Payback: 16 Months</span>
              </div>
            </div>

            {/* Pillar 2: 50-Bed Tertiary Hospital Wing */}
            <div className="rounded-3xl bg-[#f8faf9] border-2 border-[#e5e7eb] hover:border-[#004c22] p-6 shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#166534] text-[#acf770] flex items-center justify-center font-black text-[18px]">
                    02
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#166534]/10 text-[#166534] text-[11px] font-bold">
                    $2.80M CapEx (₦2.13B)
                  </span>
                </div>

                <h3 className="text-[20px] font-extrabold text-[#052e16] mb-2">
                  50-Bed Inpatient Hospital Wing
                </h3>
                <p className="text-[13px] text-[#4b5563] leading-relaxed mb-4">
                  Synchronized tertiary care combining conventional surgery, maternal emergency, and intensive TCM neuro-rehabilitation on a single campus.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#166534] text-[18px] shrink-0">check_circle</span>
                    <span><strong>50 Inpatient Beds &amp; High-Dependency Units</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#166534] text-[18px] shrink-0">check_circle</span>
                    <span>Twin Modular Laminar-Flow Operating Theatres</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#166534] text-[18px] shrink-0">check_circle</span>
                    <span>6-Bed Intensive Care Unit (ICU) &amp; Trauma Suite</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#166534] text-[18px] shrink-0">check_circle</span>
                    <span>Dual-track TCM stroke &amp; post-operative rehab</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-between text-[11.5px] text-[#4b5563]">
                <span>Target Launch: <strong>Q2 2026</strong></span>
                <span className="text-[#166534] font-bold">Payback: 22 Months</span>
              </div>
            </div>

            {/* Pillar 3: Botanical Pharma Manufacturing */}
            <div className="rounded-3xl bg-[#f8faf9] border-2 border-[#e5e7eb] hover:border-[#004c22] p-6 shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#052e16] text-[#acf770] flex items-center justify-center font-black text-[18px]">
                    03
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#052e16]/10 text-[#052e16] text-[11px] font-bold">
                    $2.10M CapEx (₦1.24B)
                  </span>
                </div>

                <h3 className="text-[20px] font-extrabold text-[#052e16] mb-2">
                  WHO &amp; NAFDAC GMP Botanical Pharma
                </h3>
                <p className="text-[13px] text-[#4b5563] leading-relaxed mb-4">
                  Commercial extraction and formulation facility standardizing indigenous botanical pharmacology for clinical and retail distribution.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#052e16] text-[18px] shrink-0">check_circle</span>
                    <span><strong>Supercritical Fluid &amp; Ultrasonic Extraction Lines</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#052e16] text-[18px] shrink-0">check_circle</span>
                    <span>Automated Liquid Filling &amp; Blister Packaging</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#052e16] text-[18px] shrink-0">check_circle</span>
                    <span>14 NAFDAC-Registered Proprietary Formulations</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12.5px] text-[#111827]">
                    <span className="material-symbols-outlined text-[#052e16] text-[18px] shrink-0">check_circle</span>
                    <span>500k Unit Monthly Output Capability</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-between text-[11.5px] text-[#4b5563]">
                <span>Target Launch: <strong>Q1 2026</strong></span>
                <span className="text-[#052e16] font-bold">Payback: 18 Months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. 5-YEAR INSTITUTIONAL FINANCIAL PROJECTIONS TABLE (24.6% IRR)
          ========================================================================= */}
      <section className="w-full py-16 bg-[#f8faf9] border-b border-[#e5e7eb]" id="financial-model">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#004c22]">
                Financial Underwriting (IFRS Pro-Forma)
              </span>
              <h2 className="text-[30px] lg:text-[34px] font-extrabold text-[#052e16] mt-1">
                5-Year Integrated Projections (2025–2029)
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-[#d1d5db] shadow-xs">
              <button
                type="button"
                onClick={() => setFinancialView('statement')}
                className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                  financialView === 'statement'
                    ? 'bg-[#004c22] text-white shadow-xs'
                    : 'text-[#4b5563] hover:text-[#111827]'
                }`}
              >
                Financial Statement (₦ Millions)
              </button>
              <button
                type="button"
                onClick={() => setFinancialView('volume')}
                className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
                  financialView === 'volume'
                    ? 'bg-[#004c22] text-white shadow-xs'
                    : 'text-[#4b5563] hover:text-[#111827]'
                }`}
              >
                Clinical Operational Volume
              </button>
            </div>
          </div>

          {/* Projections Table */}
          <div className="bg-white rounded-3xl border border-[#e5e7eb] shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              {financialView === 'statement' ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#032313] text-white text-[12px] uppercase tracking-wider">
                      <th className="py-4 px-6 font-extrabold">Line Item / Revenue Stream</th>
                      <th className="py-4 px-4 text-center font-bold">Year 1 (2025)</th>
                      <th className="py-4 px-4 text-center font-bold">Year 2 (2026)</th>
                      <th className="py-4 px-4 text-center font-bold text-[#acf770]">Year 3 (2027)</th>
                      <th className="py-4 px-4 text-center font-bold">Year 4 (2028)</th>
                      <th className="py-4 px-4 text-center font-bold">Year 5 (2029)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e7eb] text-[13.5px]">
                    <tr className="hover:bg-[#f8faf9] transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#111827]">Clinical TCM &amp; Outpatient Consultations</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦420M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦850M</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#004c22]">₦1,420M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦1,980M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦2,650M</td>
                    </tr>
                    <tr className="hover:bg-[#f8faf9] transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#111827]">Diagnostic Imaging (CT/MRI/Lab/PACS)</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦680M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦1,650M</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#004c22]">₦2,850M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦3,950M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦5,200M</td>
                    </tr>
                    <tr className="hover:bg-[#f8faf9] transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#111827]">Inpatient 50-Bed Ward &amp; Surgical Suites</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦180M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦920M</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#004c22]">₦1,850M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦2,750M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦3,600M</td>
                    </tr>
                    <tr className="hover:bg-[#f8faf9] transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#111827]">Botanical Pharmaceutical Manufacturing</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦120M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦480M</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#004c22]">₦1,150M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦1,850M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦2,700M</td>
                    </tr>
                    <tr className="hover:bg-[#f8faf9] transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#111827]">Clinical Academy Tuition &amp; Telehealth SaaS</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦90M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦250M</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#004c22]">₦530M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦850M</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">₦1,350M</td>
                    </tr>

                    {/* Consolidated Revenue Total */}
                    <tr className="bg-[#f0fdf4] font-black text-[#052e16] text-[14.5px]">
                      <td className="py-4 px-6">Total Gross Operating Revenue</td>
                      <td className="py-4 px-4 text-center">₦1,490M</td>
                      <td className="py-4 px-4 text-center">₦4,150M</td>
                      <td className="py-4 px-4 text-center text-[#004c22]">₦7,800M ($5.5M)</td>
                      <td className="py-4 px-4 text-center">₦11,380M</td>
                      <td className="py-4 px-4 text-center">₦15,500M</td>
                    </tr>

                    {/* Operating Costs */}
                    <tr className="hover:bg-[#f8faf9] text-[#6b7280]">
                      <td className="py-3 px-6">Direct Operating Costs &amp; COGS</td>
                      <td className="py-3 px-4 text-center">(₦980M)</td>
                      <td className="py-3 px-4 text-center">(₦2,450M)</td>
                      <td className="py-3 px-4 text-center">(₦4,250M)</td>
                      <td className="py-3 px-4 text-center">(₦5,950M)</td>
                      <td className="py-3 px-4 text-center">(₦7,850M)</td>
                    </tr>
                    <tr className="hover:bg-[#f8faf9] text-[#6b7280]">
                      <td className="py-3 px-6">SG&amp;A, Clinical Salaries &amp; Quality Audits</td>
                      <td className="py-3 px-4 text-center">(₦420M)</td>
                      <td className="py-3 px-4 text-center">(₦820M)</td>
                      <td className="py-3 px-4 text-center">(₦1,210M)</td>
                      <td className="py-3 px-4 text-center">(₦1,680M)</td>
                      <td className="py-3 px-4 text-center">(₦2,200M)</td>
                    </tr>

                    {/* Consolidated EBITDA */}
                    <tr className="bg-[#032313] text-[#acf770] font-black text-[15px]">
                      <td className="py-4 px-6 text-white">Consolidated EBITDA</td>
                      <td className="py-4 px-4 text-center text-white/90">₦90M (6.0%)</td>
                      <td className="py-4 px-4 text-center text-white/90">₦880M (21.2%)</td>
                      <td className="py-4 px-4 text-center text-[#acf770]">₦2,340M (30.0%)</td>
                      <td className="py-4 px-4 text-center text-white/90">₦3,750M (32.9%)</td>
                      <td className="py-4 px-4 text-center text-white/90">₦5,450M (35.1%)</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#032313] text-white text-[12px] uppercase tracking-wider">
                      <th className="py-4 px-6 font-extrabold">Operational Volume Metric</th>
                      <th className="py-4 px-4 text-center font-bold">Year 1</th>
                      <th className="py-4 px-4 text-center font-bold">Year 2</th>
                      <th className="py-4 px-4 text-center font-bold text-[#acf770]">Year 3</th>
                      <th className="py-4 px-4 text-center font-bold">Year 4</th>
                      <th className="py-4 px-4 text-center font-bold">Year 5</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e7eb] text-[13.5px]">
                    <tr className="hover:bg-[#f8faf9]">
                      <td className="py-3.5 px-6 font-semibold text-[#111827]">Outpatient TCM Consultations</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">8,400</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">18,200</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#004c22]">32,500</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">48,000</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">65,000</td>
                    </tr>
                    <tr className="hover:bg-[#f8faf9]">
                      <td className="py-3.5 px-6 font-semibold text-[#111827]">CT &amp; MRI Diagnostic Scans</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">3,200</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">7,800</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#004c22]">14,200</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">21,000</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">28,500</td>
                    </tr>
                    <tr className="hover:bg-[#f8faf9]">
                      <td className="py-3.5 px-6 font-semibold text-[#111827]">Inpatient Bed-Days (50 Beds @ 82% Occ.)</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">2,100</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">8,900</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#004c22]">14,965</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">15,500</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">16,000</td>
                    </tr>
                    <tr className="hover:bg-[#f8faf9]">
                      <td className="py-3.5 px-6 font-semibold text-[#111827]">Botanical Remedy Units Distributed</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">45,000</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">180,000</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#004c22]">450,000</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">800,000</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">1,200,000</td>
                    </tr>
                    <tr className="hover:bg-[#f8faf9]">
                      <td className="py-3.5 px-6 font-semibold text-[#111827]">Academy Certified Clinicians Trained</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">120</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">350</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#004c22]">750</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">1,200</td>
                      <td className="py-3.5 px-4 text-center text-[#4b5563]">1,800</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-4 bg-[#f8faf9] border-t border-[#e5e7eb] flex flex-wrap items-center justify-between text-[12px] text-[#6b7280]">
              <span>*Audited IFRS model based on ₦1,450/USD foreign exchange baseline and 20-month breakeven ramp.</span>
              <button
                type="button"
                onClick={onOpenDeck}
                className="text-[#004c22] font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Request Detailed DCF Financial Model (.XLSX)</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. 12-MEMBER EXECUTIVE TEAM WITH REAL PORTRAITS & CREDENTIALS
          Extracted directly from the official Pitch Deck presentation.
          ========================================================================= */}
      <section className="w-full py-16 bg-white border-b border-[#e5e7eb]" id="leadership-team">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#004c22]">
                Proven Governance &amp; Clinical Leadership
              </span>
              <h2 className="text-[30px] lg:text-[34px] font-extrabold text-[#052e16] mt-1">
                EHMCARE Core Executive Team
              </h2>
            </div>
            <p className="text-[14px] text-[#4b5563] max-w-lg">
              Seasoned medical directors, chartered accountants, research pharmacologists, and healthcare operators directing the Series A expansion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INVESTOR_PITCH_DATA.leadership.map((member, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#f8faf9] border border-[#e5e7eb] hover:border-[#004c22] hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-72 aspect-[4/5] overflow-hidden bg-[#e5e7eb] relative">
                    <img
                      src={member.image || member.fallbackUrl || member.imageUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null; // Prevent infinite loop
                        if (member.fallbackUrl && target.src !== window.location.origin + member.fallbackUrl) {
                          target.src = member.fallbackUrl;
                        } else if (member.imageUrl && target.src !== member.imageUrl) {
                          target.src = member.imageUrl;
                        }
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#acf770] block">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-[17px] font-extrabold text-[#052e16] mb-1.5 leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-[12.5px] text-[#4b5563] leading-relaxed mb-4">
                      {member.domain}
                    </p>

                    {/* Direct Executive Contact Info */}
                    <div className="rounded-2xl bg-white border border-[#e5e7eb] p-3 flex items-center justify-between gap-2 shadow-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${member.isWhatsApp ? 'bg-[#f0fdf4] text-[#16a34a]' : 'bg-[#f3f4f6] text-[#004c22]'}`}>
                          <span className="material-symbols-outlined text-[17px]">
                            {member.isWhatsApp ? 'chat' : 'phone_in_talk'}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280] block">
                            {member.isWhatsApp ? 'Direct & WhatsApp' : 'Direct Line'}
                          </span>
                          <a
                            href={`tel:${member.phone.replace(/[^0-9]/g, '')}`}
                            className="text-[12.5px] font-bold text-[#052e16] hover:text-[#004c22] block truncate"
                          >
                            {member.phone}
                          </a>
                        </div>
                      </div>
                      <a
                        href={`tel:${member.phone.replace(/[^0-9]/g, '')}`}
                        className="w-7 h-7 rounded-lg bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#16a34a] flex items-center justify-center shrink-0 transition-colors"
                        title={`Call ${member.name}`}
                      >
                        <span className="material-symbols-outlined text-[15px]">call</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-[#e5e7eb] flex items-center justify-between text-[11.5px]">
                  <span className="font-semibold text-[#004c22]">EHMCARE Executive</span>
                  {member.isWhatsApp ? (
                    <a
                      href={`https://wa.me/${member.phoneRaw || member.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(member.name)},%20I%20would%20like%20to%20connect%20regarding%20the%20EHMCARE%20Healthcare%20Expansion.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#16a34a] hover:text-[#004c22] font-bold flex items-center gap-1.5 bg-[#f0fdf4] px-3 py-1.5 rounded-full border border-[#bbf7d0] hover:bg-[#dcfce7] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">chat</span>
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <a
                      href={`tel:${member.phone.replace(/[^0-9]/g, '')}`}
                      className="text-[#004c22] hover:text-[#16a34a] font-bold flex items-center gap-1.5 bg-[#f8faf9] px-3 py-1.5 rounded-full border border-[#e5e7eb] hover:bg-[#f0fdf4] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">call</span>
                      <span>Call Line</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PHASED EXECUTION MILESTONES (PHASE 01 TO 03)
          ========================================================================= */}
      <section className="w-full py-16 bg-[#f8faf9] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#004c22]">
              Capital Deployment Timeline
            </span>
            <h2 className="text-[28px] font-extrabold text-[#052e16] mt-1">
              Phased Milestone Execution Schedule
            </h2>
            <p className="text-[14px] text-[#4b5563] mt-1">
              Tranche disbursement tied to physical civil works, regulatory licensing, and clinical commissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INVESTOR_PITCH_DATA.phases.map((ph, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-[#e5e7eb] shadow-xs flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-black text-[#052e16] bg-[#acf770] px-3 py-1 rounded-full">
                      {ph.amount}
                    </span>
                    <span className="text-[11.5px] font-bold text-[#6b7280]">
                      Phase 0{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-[18px] font-extrabold text-[#111827] mb-2">
                    {ph.phase}
                  </h4>
                  <p className="text-[13px] text-[#4b5563] leading-relaxed mb-4">
                    {ph.focus}
                  </p>
                </div>

                <div className="p-3 bg-[#f8faf9] rounded-xl flex items-center justify-between border border-[#e5e7eb]">
                  <span className="text-[12px] text-[#6b7280]">Tranche Allocation:</span>
                  <span className="text-[14px] font-black text-[#004c22]">{ph.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SYNDICATE GOVERNANCE & INVESTOR PROTECTION TERMS
          ========================================================================= */}
      <section className="w-full py-16 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#004c22]">
              Syndicate Terms
            </span>
            <h2 className="text-[28px] font-extrabold text-[#052e16] mt-1">
              Investment Offering &amp; Governance Rights
            </h2>
            <p className="text-[14px] text-[#4b5563] mt-1">
              Structured under Nigerian and international commercial law with standard institutional protections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-[#f8faf9] border border-[#e5e7eb]">
              <span className="material-symbols-outlined text-[#004c22] text-[28px] mb-2">receipt_long</span>
              <h4 className="text-[15px] font-bold text-[#111827] mb-1">Instrument</h4>
              <p className="text-[12.5px] text-[#4b5563] leading-relaxed">
                Preferred Equity / Convertible Note with standard 1x non-participating liquidation preference.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8faf9] border border-[#e5e7eb]">
              <span className="material-symbols-outlined text-[#004c22] text-[28px] mb-2">payments</span>
              <h4 className="text-[15px] font-bold text-[#111827] mb-1">Minimum Ticket</h4>
              <p className="text-[12.5px] text-[#4b5563] leading-relaxed">
                ₦50M ($35K) for private syndicates; ₦250M ($175K) for institutional co-investors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8faf9] border border-[#e5e7eb]">
              <span className="material-symbols-outlined text-[#004c22] text-[28px] mb-2">groups</span>
              <h4 className="text-[15px] font-bold text-[#111827] mb-1">Board Representation</h4>
              <p className="text-[12.5px] text-[#4b5563] leading-relaxed">
                Dedicated Board of Directors seat and audit observer rights for lead ticket commitments of ₦500M+.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8faf9] border border-[#e5e7eb]">
              <span className="material-symbols-outlined text-[#004c22] text-[28px] mb-2">verified_user</span>
              <h4 className="text-[15px] font-bold text-[#111827] mb-1">Audited IFRS Reporting</h4>
              <p className="text-[12.5px] text-[#4b5563] leading-relaxed">
                Quarterly audited financial statements, pro-rata pre-emption rights, and full corporate information rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SECTION ABOVE THE FOOTER:
          calendar_month
          Executive Access
          Schedule a Principal Briefing with Leadership
          Restyled exactly matching the prestige card UI/UX design:
          Rounded-3xl dark container with ambient glows, left proposition with
          trust badges & direct helpline, and right pristine white form card with
          interactive dropdown and lead dispatch to devabdultechnologies@gmail.com
          ========================================================================= */}
      <section className="w-full py-16 bg-[#ffffff]" id="principal-briefing">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="rounded-3xl bg-gradient-to-br from-[#00210b] via-[#003816] to-[#004c22] text-white p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            {/* Ambient decorative shapes */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#a6f4b5]/10 blur-3xl pointer-events-none"></div>
            <div className="absolute right-1/3 -top-24 w-72 h-72 rounded-full bg-[#356b00]/20 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Triage Proposition & Leadership Helpline */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#a6f4b5] text-[#00210b] text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                  <span>Executive Access</span>
                </div>

                <h2 className="text-[30px] lg:text-[36px] text-white font-extrabold leading-tight tracking-tight">
                  Schedule a Principal Briefing with Leadership
                </h2>

                <p className="text-[14.5px] text-[#e0e3e5] leading-relaxed">
                  Schedule direct evaluation and strategic briefing with CEO Dr. Adeyemi Isaaq Alabi and CFO Murtadho Ayinla for institutional tranches, facility syndication, or sovereign co-investment.
                </p>

                <div className="pt-2 flex flex-col gap-2.5 text-[12.5px] text-[#a6f4b5]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    <span>Confidential medical protocol • NDPR &amp; HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="material-symbols-outlined text-[18px] text-[#acf770]">verified_user</span>
                    <span>C-Suite direct evaluation • Principal-to-Principal</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="material-symbols-outlined text-[18px] text-[#acf770]">schedule</span>
                    <span>45–60 min strategic session (Virtual or In-Person Campus Inspection)</span>
                  </div>
                </div>

                {/* Central Leadership Helpline Card */}
                <div className="mt-4 p-4 rounded-xl bg-[#004c22] border border-[#166534] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#93e0a2] uppercase font-bold block">
                      Central Helpline &amp; Executive Desk
                    </span>
                    <a href="tel:09015184004" className="text-[16px] font-extrabold text-white hover:text-[#acf770]">
                      0901 518 4004
                    </a>
                    <span className="text-[11px] text-white/70 block">
                      devabdultechnologies@gmail.com
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsAppRaw}?text=Hello%20Dr.%20Adeyemi%20Alabi,%20I%20would%20like%20to%20schedule%20a%20Principal%20Briefing%20regarding%20the%20EHMCARE%20Series%20A.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#acf770] text-[#0c2000] text-[11px] font-extrabold flex items-center gap-1.5 hover:bg-[#9de860] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">chat</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Multi-Millionaire Interactive Dropdown Selector Desk */}
              <div className="lg:col-span-7 bg-white text-[#191c1e] rounded-2xl p-6 lg:p-8 shadow-2xl border border-[#eceef0]">
                {!briefingSubmitted ? (
                  <form onSubmit={handleBriefingSubmit} className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#eceef0]">
                      <div>
                        <h3 className="text-[19px] font-extrabold text-[#052e16]">
                          Executive Briefing Reservation
                        </h3>
                        <p className="text-[12px] text-[#4b5563]">
                          Reserve direct calendar access with Dr. Adeyemi Alabi &amp; the executive board.
                        </p>
                      </div>
                      <span className="text-[11px] font-bold text-[#004c22] bg-[#a6f4b5]/40 px-3 py-1 rounded-full">
                        Priority Access
                      </span>
                    </div>

                    {/* Step 1: Principal & Institution */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#191c1e] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#004c22] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                        <span>Principal Representative &amp; Institution / Fund *</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Principal Name (e.g. Dr. A. Johnson)"
                          value={briefingForm.repName}
                          onChange={(e) => setBriefingForm({ ...briefingForm, repName: e.target.value })}
                          className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#d1d5db] focus:outline-none focus:border-[#004c22]"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Institution / Fund Name"
                          value={briefingForm.institution}
                          onChange={(e) => setBriefingForm({ ...briefingForm, institution: e.target.value })}
                          className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#d1d5db] focus:outline-none focus:border-[#004c22]"
                        />
                      </div>
                    </div>

                    {/* Step 2: Contact Coordinates */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#191c1e] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#004c22] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                        <span>Gmail / Corporate Email &amp; Phone (WhatsApp) *</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="email"
                          required
                          placeholder="Gmail or Work Email"
                          value={briefingForm.email}
                          onChange={(e) => setBriefingForm({ ...briefingForm, email: e.target.value })}
                          className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#d1d5db] focus:outline-none focus:border-[#004c22]"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="+234 Direct Phone / WhatsApp"
                          value={briefingForm.phone}
                          onChange={(e) => setBriefingForm({ ...briefingForm, phone: e.target.value })}
                          className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#d1d5db] focus:outline-none focus:border-[#004c22]"
                        />
                      </div>
                    </div>

                    {/* Step 3: Interactive Dropdown for Ticket Size */}
                    <div className="flex flex-col gap-1.5 relative">
                      <div className="flex items-center justify-between">
                        <label className="text-[12px] font-bold text-[#191c1e] flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#004c22] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                          <span>Indicative Ticket Size / Syndicate Allocation</span>
                        </label>
                        <span className="text-[10.5px] font-bold text-[#356b00] bg-[#a6f4b5]/40 px-2 py-0.5 rounded-full">
                          4 Allocation Tiers
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsBriefingTicketDropdownOpen(!isBriefingTicketDropdownOpen)}
                        className="w-full min-h-[50px] px-3.5 py-2 rounded-xl bg-[#f2f4f6] hover:bg-[#e6e8ea] border-2 border-[#bfc9bd] hover:border-[#004c22] focus:border-[#004c22] transition-all flex items-center justify-between gap-3 text-left cursor-pointer shadow-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-[#004c22] text-[#acf770] flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[18px]">account_balance</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#356b00]">
                              Target Syndicate Tranche
                            </span>
                            <span className="text-[13px] font-extrabold text-[#191c1e] truncate">
                              {briefingForm.ticketSize}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[11px] font-semibold text-[#004c22] hidden sm:inline">Change</span>
                          <span
                            className="material-symbols-outlined text-[20px] text-[#004c22] transition-transform duration-200"
                            style={{ transform: isBriefingTicketDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          >
                            expand_more
                          </span>
                        </div>
                      </button>

                      {isBriefingTicketDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border-2 border-[#004c22] max-h-[300px] overflow-y-auto animate-fadeIn divide-y divide-[#eceef0]">
                          <div className="p-3 bg-[#f2f4f6] sticky top-0 z-10 flex items-center justify-between border-b border-[#eceef0]">
                            <span className="text-[11.5px] font-bold text-[#004c22] uppercase tracking-wider">
                              Choose Tranche Ticket Size:
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsBriefingTicketDropdownOpen(false)}
                              className="p-1 rounded-md text-[#404940] hover:bg-[#e0e3e5]"
                            >
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                          </div>

                          {ticketOptions.map((opt, idx) => {
                            const isSelected = briefingForm.ticketSize === opt.range;
                            return (
                              <div
                                key={idx}
                                onClick={() => {
                                  setBriefingForm({ ...briefingForm, ticketSize: opt.range });
                                  setIsBriefingTicketDropdownOpen(false);
                                }}
                                className={`p-3.5 flex items-start gap-3 hover:bg-[#a6f4b5]/20 cursor-pointer transition-colors ${
                                  isSelected ? 'bg-[#a6f4b5]/30' : ''
                                }`}
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] border border-[#eceef0] flex items-center justify-center text-[#004c22] shrink-0 mt-0.5">
                                  <span className="material-symbols-outlined text-[18px]">{opt.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[11.5px] font-bold text-[#356b00] uppercase tracking-wider">
                                      {opt.tier}
                                    </span>
                                    {isSelected && (
                                      <span className="text-[10px] font-extrabold text-[#004c22] bg-[#acf770] px-2 py-0.5 rounded-full">
                                        Selected
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-[13.5px] font-black text-[#191c1e]">{opt.range}</h4>
                                  <p className="text-[11.5px] text-[#4b5563] mt-0.5">{opt.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Step 4: Modality & Preferred Date */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-bold text-[#191c1e] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#004c22] text-white flex items-center justify-center text-[10px] font-bold">4</span>
                        <span>Briefing Modality &amp; Target Date *</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select
                          value={briefingForm.format}
                          onChange={(e) => setBriefingForm({ ...briefingForm, format: e.target.value })}
                          className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] text-[#191c1e] text-[12.5px] border border-[#d1d5db] focus:outline-none focus:border-[#004c22] cursor-pointer"
                        >
                          <option value="Virtual Strategic Zoom Briefing">Virtual Strategic Zoom Briefing</option>
                          <option value="In-Person Campus Inspection (Ilorin Center)">In-Person Campus Inspection (Ilorin)</option>
                          <option value="Executive Meeting (Maitama Abuja Hub)">Executive Meeting (Maitama Abuja)</option>
                          <option value="Executive Meeting (Lekki Lagos Center)">Executive Meeting (Lekki Lagos)</option>
                        </select>
                        <input
                          type="date"
                          required
                          value={briefingForm.date}
                          onChange={(e) => setBriefingForm({ ...briefingForm, date: e.target.value })}
                          className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#d1d5db] focus:outline-none focus:border-[#004c22]"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-[#004c22] hover:bg-[#003816] text-white font-extrabold text-[14px] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        <span>Confirm Principal Briefing Request</span>
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                          send
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#6b7280] pt-1 border-t border-[#f2f4f6]">
                      <span className="flex items-center gap-1 text-[#004c22] font-semibold">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                        <span>Confidential C-Suite Protocol</span>
                      </span>
                      <span className="text-[#4b5563]">Dispatched to devabdultechnologies@gmail.com</span>
                    </div>
                  </form>
                ) : (
                  <div className="p-6 rounded-2xl bg-[#f0fdf4] border border-[#86efac] text-center space-y-4 animate-fadeIn">
                    <span className="material-symbols-outlined text-[#16a34a] text-[48px]">check_circle</span>
                    <h3 className="text-[20px] font-extrabold text-[#166534]">
                      Principal Briefing Dispatched
                    </h3>
                    <p className="text-[13.5px] text-[#374151] max-w-lg mx-auto">
                      Thank you, <strong>{briefingForm.repName}</strong>. Your request on behalf of <strong>{briefingForm.institution}</strong> has been logged and forwarded directly to Dr. Adeyemi Isaaq Alabi (CEO) and CFO Murtadho Ayinla at <strong>devabdultechnologies@gmail.com</strong>.
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-3">
                      <a
                        href={`https://wa.me/${CONTACT_INFO.whatsAppRaw}?text=Hello%20Dr.%20Adeyemi%20Alabi,%20I%20have%20submitted%20a%20partner%20briefing%20request%20for%20${encodeURIComponent(briefingForm.institution)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-[13px] flex items-center gap-2 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                        <span>WhatsApp Direct Connect</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleDirectDownload}
                        className="px-4 py-2.5 rounded-xl bg-[#004c22] text-white font-bold text-[13px] flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                        <span>Download Pitch Deck (.PDF)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
