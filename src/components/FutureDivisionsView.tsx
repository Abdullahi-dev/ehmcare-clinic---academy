import React, { useState } from 'react';
import { IMAGES } from '../data/content.ts';

interface FutureDivisionsViewProps {
  onOpenInvestorDeck: () => void;
  onOpenBooking: () => void;
}

export const FutureDivisionsView: React.FC<FutureDivisionsViewProps> = ({
  onOpenInvestorDeck,
  onOpenBooking,
}) => {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    principalName: '',
    email: '',
    area: 'Diagnostic Center Equipment Financing',
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Vision Hero Banner with Editorial Glassmorphism */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f2f4f6] via-[#f7f9fb] to-[#f7f9fb] pb-12 pt-6">
        {/* Ambient organic glow aura */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-[#a6f4b5]/20 rounded-full blur-[110px]"></div>

        <div className="max-w-7xl mx-auto px-4 lg:px-10 relative z-10">
          {/* Top Meta Track */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e0e3e5] shadow-xs border border-[#eceef0]">
              <span className="material-symbols-outlined text-[#004c22] text-[18px]">domain_add</span>
              <span className="text-[11px] tracking-wider uppercase text-[#004c22] font-bold">
                VISION 2025–2030 EXPANSION
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#404940] text-[12px] font-semibold">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#acf770] animate-pulse"></span>
              <span>Open for Institutional Syndication & Public-Private Partnerships</span>
            </div>
          </div>

          {/* Main Asymmetric Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col">
              <h1 className="font-['Plus_Jakarta_Sans'] text-display-lg-mobile lg:text-display-lg text-[#004c22] tracking-tight mb-4 font-extrabold leading-tight">
                Building Sub-Saharan Africa’s Premier <span className="text-[#356b00]">Integrative Hospital</span> & Medical Manufacturing Hub
              </h1>
              <p className="text-[18px] text-[#404940] leading-relaxed max-w-2xl mb-6">
                From proven clinical TCM excellence to automated precision imaging, a 50+ bed tertiary inpatient surgical wing, and WHO-standard herbal pharmaceutical mass manufacturing across Nigeria.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  onClick={onOpenInvestorDeck}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#166534] text-[#ffffff] font-bold text-[14px] shadow-md hover:bg-[#004c22] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">download_for_offline</span>
                  <span>Download Investor Deck & Feasibility</span>
                </button>

                <a
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#e0e3e5] text-[#004c22] font-bold text-[14px] shadow-xs hover:bg-[#d8dadc] transition-all cursor-pointer"
                  href="#partner-briefing"
                >
                  <span className="material-symbols-outlined text-[20px]">handshake</span>
                  <span>Schedule Partner Briefing</span>
                </a>
              </div>

              {/* Micro Metric Strip */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 bg-[#ffffff]/90 rounded-xl p-2.5 sm:p-4 shadow-sm backdrop-blur-xs border border-[#eceef0]">
                <div className="min-w-0">
                  <p className="text-[20px] xs:text-[24px] sm:text-[28px] leading-tight font-extrabold text-[#004c22] truncate">₦12B</p>
                  <p className="text-[10px] sm:text-[11px] text-[#404940] mt-0.5 sm:mt-1 leading-snug">Pre-Money Valuation</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[20px] xs:text-[24px] sm:text-[28px] leading-tight font-extrabold text-[#356b00] truncate">₦8.5B</p>
                  <p className="text-[10px] sm:text-[11px] text-[#404940] mt-0.5 sm:mt-1 leading-snug">Phased Capital Raise</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[20px] xs:text-[24px] sm:text-[28px] leading-tight font-extrabold text-[#004c22] truncate">₦7.8B</p>
                  <p className="text-[10px] sm:text-[11px] text-[#404940] mt-0.5 sm:mt-1 leading-snug">Projected Y3 Revenue</p>
                </div>
              </div>
            </div>

            {/* Visual Mosaic with Clinical Context */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#e6e8ea] border border-[#eceef0]">
                <div
                  className="w-full h-[420px] bg-cover bg-center"
                  style={{ backgroundImage: `url('${IMAGES.futureCampus}')` }}
                ></div>

                {/* Frosted Clinical Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#ffffff]/90 backdrop-blur-md shadow-md border border-[#eceef0]">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#004c22] text-[20px]">corporate_fare</span>
                      <span className="text-[13px] font-bold text-[#191c1e]">Integrated Campus Blueprint</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#acf770] text-[#397200]">
                      Phase 2 Validated
                    </span>
                  </div>
                  <p className="text-[12px] text-[#404940] line-clamp-2">
                    Unified Ilorin & Lekki master plan coordinating inpatient surgery, neuro-acupuncture, high-resolution diagnostic imaging, and NAFDAC-certified labs.
                  </p>
                </div>
              </div>

              {/* Floating Credential Badge */}
              <div className="absolute -top-4 -right-4 p-3 bg-[#004c22] text-[#ffffff] rounded-xl shadow-lg flex items-center gap-2 border border-[#a6f4b5]/30">
                <span className="material-symbols-outlined text-[#acf770] text-[24px]">verified</span>
                <div className="flex flex-col pr-1">
                  <span className="text-[11px] leading-none font-bold">ISO & WHO</span>
                  <span className="text-[10px] text-[#e6e8ea]">GMP Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Three Pillars of Expansion */}
      <section className="w-full py-14 bg-[#ffffff] border-y border-[#eceef0]">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#356b00] font-bold">
                Strategic Portfolio Deployment
              </span>
              <h2 className="text-[32px] text-[#004c22] font-bold mt-1">
                The Three Pillars of Expansion
              </h2>
            </div>
            <p className="text-[15px] text-[#404940] max-w-lg">
              Transforming episodic therapies into an end-to-end institutional health ecosystem that blends high-tech diagnostics, inpatient surgery, and bio-standardized phytomedicine.
            </p>
          </div>

          {/* Bento Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pillar 1: Diagnostic Center */}
            <div className="group relative flex flex-col rounded-2xl bg-[#f2f4f6] hover:bg-[#ffffff] transition-all duration-300 p-6 shadow-xs hover:shadow-xl border border-[#eceef0]">
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-[#e6e8ea]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${IMAGES.futureDiagnostic}')` }}
                ></div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur text-[#004c22] text-[11px] font-bold flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[16px]">sensors</span>
                  <span>Division I</span>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] text-[11px] font-bold">
                  Procurement Phase
                </div>
              </div>

              <h3 className="text-[20px] text-[#191c1e] font-bold mb-2">
                Advanced Diagnostic Imaging & Pathology Center
              </h3>
              <p className="text-[13px] text-[#404940] mb-4 flex-grow leading-relaxed">
                Eliminates external testing delays across Kwara and surrounding states, synchronizing micro-structural imaging with traditional holistic pulse and meridian evaluation.
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#004c22] text-[18px]">check_circle</span>
                  <span>High-resolution MRI & 64-Slice CT Scanner</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#004c22] text-[18px]">check_circle</span>
                  <span>Fully Automated Biochemistry & Pathology Lab</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#004c22] text-[18px]">check_circle</span>
                  <span>Digital Color Doppler 4D Ultrasound Suite</span>
                </div>
              </div>

              <div className="pt-3 bg-[#e6e8ea]/50 rounded-lg p-3 flex items-center justify-between border border-[#eceef0]">
                <div>
                  <span className="text-[10px] text-[#404940] uppercase font-bold">Target Launch</span>
                  <p className="text-[13px] font-bold text-[#004c22]">Q4 2025</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#404940] uppercase font-bold">CapEx Need</span>
                  <p className="text-[13px] font-bold text-[#191c1e]">$1.45M USD</p>
                </div>
              </div>
            </div>

            {/* Pillar 2: Conventional Hospital Wing */}
            <div className="group relative flex flex-col rounded-2xl bg-[#f2f4f6] hover:bg-[#ffffff] transition-all duration-300 p-6 shadow-xs hover:shadow-xl border border-[#eceef0]">
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-[#e6e8ea]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${IMAGES.futureHospital}')` }}
                ></div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur text-[#004c22] text-[11px] font-bold flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[16px]">local_hospital</span>
                  <span>Division II</span>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#acf770] text-[#397200] text-[11px] font-bold">
                  Blueprint Finalized
                </div>
              </div>

              <h3 className="text-[20px] text-[#191c1e] font-bold mb-2">
                Conventional Tertiary Inpatient Hospital Wing
              </h3>
              <p className="text-[13px] text-[#404940] mb-4 flex-grow leading-relaxed">
                A 50+ private bed clinical facility that pioneers dual-track cross-referrals: modern acute surgical interventions accelerated by specialized TCM neuro-rehabilitation.
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#004c22] text-[18px]">check_circle</span>
                  <span>50+ Private Inpatient & High-Dependency Suites</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#004c22] text-[18px]">check_circle</span>
                  <span>Laminar Flow Operating Theatres & 6-Bed ICU</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#004c22] text-[18px]">check_circle</span>
                  <span>24/7 Trauma, Emergency, & Maternal Care</span>
                </div>
              </div>

              <div className="pt-3 bg-[#e6e8ea]/50 rounded-lg p-3 flex items-center justify-between border border-[#eceef0]">
                <div>
                  <span className="text-[10px] text-[#404940] uppercase font-bold">Site Location</span>
                  <p className="text-[13px] font-bold text-[#004c22]">Ilorin & Lekki Phase II</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#404940] uppercase font-bold">CapEx Need</span>
                  <p className="text-[13px] font-bold text-[#191c1e]">$2.80M USD</p>
                </div>
              </div>
            </div>

            {/* Pillar 3: Pharma & Nutraceutical Manufacturing */}
            <div className="group relative flex flex-col rounded-2xl bg-[#f2f4f6] hover:bg-[#ffffff] transition-all duration-300 p-6 shadow-xs hover:shadow-xl border border-[#eceef0]">
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-[#e6e8ea]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${IMAGES.futurePharma}')` }}
                ></div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur text-[#004c22] text-[11px] font-bold flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[16px]">science</span>
                  <span>Division III</span>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#a6f4b5] text-[#00210b] text-[11px] font-bold">
                  R&D Compounding Ready
                </div>
              </div>

              <h3 className="text-[20px] text-[#191c1e] font-bold mb-2">
                Herbal Pharmaceutical & Nutraceutical Plant
              </h3>
              <p className="text-[13px] text-[#404940] mb-4 flex-grow leading-relaxed">
                Industrializing indigenous Nigerian flora and classical East Asian pharmacopeia into standardized, tamper-evident capsules, concentrated elixirs, and export tinctures.
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#004c22] text-[18px]">check_circle</span>
                  <span>WHO & NAFDAC Standard Cleanroom GMP Facility</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#004c22] text-[18px]">check_circle</span>
                  <span>High-Performance Liquid Chromatography (HPLC) QC</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#004c22] text-[18px]">check_circle</span>
                  <span>Annual Throughput: 12M Units across ECOWAS</span>
                </div>
              </div>

              <div className="pt-3 bg-[#e6e8ea]/50 rounded-lg p-3 flex items-center justify-between border border-[#eceef0]">
                <div>
                  <span className="text-[10px] text-[#404940] uppercase font-bold">Standard</span>
                  <p className="text-[13px] font-bold text-[#004c22]">ISO 9001 / cGMP</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#404940] uppercase font-bold">CapEx Need</span>
                  <p className="text-[13px] font-bold text-[#191c1e]">$2.10M USD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Integrative Flow Comparison Section */}
      <section className="w-full py-14 bg-[#f2f4f6]">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] uppercase tracking-wider text-[#004c22] font-bold">
              Clinical Differentiator
            </span>
            <h2 className="text-[28px] text-[#191c1e] font-bold mt-1">
              The EHMCare Integrative Care Paradigm
            </h2>
            <p className="text-[15px] text-[#404940] mt-2">
              Why conventional hospitals and single-modality acupuncture clinics fail to achieve optimal neuro-restoration. Our triad architecture yields 3.2x faster functional recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#ffffff] shadow-sm flex flex-col border border-[#eceef0]">
              <div className="w-12 h-12 rounded-xl bg-[#166534] text-[#ffffff] flex items-center justify-center font-bold text-[20px] mb-4">
                01
              </div>
              <h4 className="text-[18px] text-[#004c22] font-bold mb-2">Dual Diagnosis Synthesis</h4>
              <p className="text-[13px] text-[#404940] leading-relaxed">
                Patient undergoes immediate 1.5T MRI / 64-Slice CT scans paired in real-time with digital meridian electrical conductance screening and computerized tongue-pulse bio-metrics.
              </p>
              <div className="mt-4 pt-2 text-[12px] text-[#356b00] font-bold flex items-center gap-1 border-t border-[#eceef0]">
                <span className="material-symbols-outlined text-[16px]">speed</span>
                <span>Zero Referral Lag</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#ffffff] shadow-sm flex flex-col border border-[#eceef0]">
              <div className="w-12 h-12 rounded-xl bg-[#acf770] text-[#397200] flex items-center justify-center font-bold text-[20px] mb-4">
                02
              </div>
              <h4 className="text-[18px] text-[#004c22] font-bold mb-2">Surgical & Acute Stabilization</h4>
              <p className="text-[13px] text-[#404940] leading-relaxed">
                High-dependency inpatient beds and modern operating suites manage acute emergencies, orthopedic repairs, and trauma stabilization using conventional institutional protocols.
              </p>
              <div className="mt-4 pt-2 text-[12px] text-[#356b00] font-bold flex items-center gap-1 border-t border-[#eceef0]">
                <span className="material-symbols-outlined text-[16px]">monitor_heart</span>
                <span>24/7 Monitored Wards</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#ffffff] shadow-sm flex flex-col border border-[#eceef0]">
              <div className="w-12 h-12 rounded-xl bg-[#394156] text-[#ffffff] flex items-center justify-center font-bold text-[20px] mb-4">
                03
              </div>
              <h4 className="text-[18px] text-[#004c22] font-bold mb-2">Standardized Bio-Rehabilitation</h4>
              <p className="text-[13px] text-[#404940] leading-relaxed">
                Immediate bedside electro-acupuncture for neuro-plasticity, coupled with batch-tested GMP phytomedicines to reduce post-op inflammation without opiate dependency.
              </p>
              <div className="mt-4 pt-2 text-[12px] text-[#356b00] font-bold flex items-center gap-1 border-t border-[#eceef0]">
                <span className="material-symbols-outlined text-[16px]">healing</span>
                <span>68% Faster Discharge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Investment & Capital Allocation Roadmap */}
      <section className="w-full py-14 bg-[#ffffff] border-y border-[#eceef0]">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Allocation Chart & Metrics */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#acf770] text-[#397200] text-[11px] font-bold w-fit mb-2">
                <span className="material-symbols-outlined text-[16px]">pie_chart</span>
                <span>CONFIDENTIAL INVESTOR SYNDICATION (₦12B VALUATION • ₦8.5B RAISE)</span>
              </div>
              <h2 className="text-[32px] text-[#004c22] font-bold mb-2">
                Precision Capital Deployment Model
              </h2>
              <p className="text-[15px] text-[#404940] mb-6">
                Every allocation has been rigorously modeled to ensure rapid asset backing, self-sustaining EBITDA margins within month 18, and long-term sovereign healthcare resilience.
              </p>

              {/* Visual Chart Simulation */}
              <div className="p-6 bg-[#f7f9fb] rounded-2xl shadow-xs border border-[#eceef0] mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-bold text-[#191c1e]">CapEx & Operational Breakdown</span>
                  <span className="text-[11px] text-[#404940]">Validated by Audit Partners</span>
                </div>

                {/* Progress Stack Bar */}
                <div className="w-full h-5 rounded-full overflow-hidden flex bg-[#e0e3e5] mb-4">
                  <div className="h-full bg-[#004c22]" style={{ width: '40%' }} title="40% Medical Equipment"></div>
                  <div className="h-full bg-[#356b00]" style={{ width: '30%' }} title="30% Physical Infrastructure"></div>
                  <div className="h-full bg-[#394156]" style={{ width: '18%' }} title="18% GMP & NAFDAC Licensing"></div>
                  <div className="h-full bg-[#91da57]" style={{ width: '12%' }} title="12% Working Capital"></div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#004c22] shrink-0"></span>
                    <span className="text-[#191c1e]"><strong>40%</strong> Medical Equipment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#356b00] shrink-0"></span>
                    <span className="text-[#191c1e]"><strong>30%</strong> Infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#394156] shrink-0"></span>
                    <span className="text-[#191c1e]"><strong>18%</strong> GMP & Licensing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#91da57] shrink-0"></span>
                    <span className="text-[#191c1e]"><strong>12%</strong> Working Capital</span>
                  </div>
                </div>
              </div>

              {/* Quick Return Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-[#f2f4f6] rounded-xl text-center border border-[#eceef0]">
                  <p className="text-[20px] text-[#004c22] font-bold">24.6%</p>
                  <p className="text-[11px] text-[#404940]">Projected 5-Yr IRR</p>
                </div>
                <div className="p-3 bg-[#f2f4f6] rounded-xl text-center border border-[#eceef0]">
                  <p className="text-[20px] text-[#004c22] font-bold">18 Mo</p>
                  <p className="text-[11px] text-[#404940]">EBITDA Breakeven</p>
                </div>
                <div className="p-3 bg-[#f2f4f6] rounded-xl text-center border border-[#eceef0]">
                  <p className="text-[20px] text-[#004c22] font-bold">100%</p>
                  <p className="text-[11px] text-[#404940]">Asset Collateralized</p>
                </div>
              </div>
            </div>

            {/* Right: Milestones Vertical Timeline */}
            <div className="lg:col-span-6 bg-[#f2f4f6] rounded-2xl p-6 border border-[#eceef0]">
              <h3 className="text-[20px] text-[#004c22] font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#356b00]">timeline</span>
                <span>Deployment Milestones (2025–2028)</span>
              </h3>

              <div className="space-y-4">
                {/* Milestone 1 */}
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#eceef0]">
                  <div className="w-8 h-8 rounded-full bg-[#acf770] text-[#397200] flex items-center justify-center shrink-0 font-bold text-[12px]">
                    Q2
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[14px] text-[#191c1e] font-bold">Site Groundbreaking & Foundation</h4>
                      <span className="text-[11px] text-[#356b00] font-bold">In Progress</span>
                    </div>
                    <p className="text-[12px] text-[#404940] mt-0.5 leading-relaxed">
                      Structural civil works on the 4-story diagnostic and surgical building in Ilorin, alongside zoning clearance for Lekki Center.
                    </p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#eceef0]">
                  <div className="w-8 h-8 rounded-full bg-[#e6e8ea] text-[#004c22] flex items-center justify-center shrink-0 font-bold text-[12px]">
                    Q4
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[14px] text-[#191c1e] font-bold">Diagnostic Center Commissioning</h4>
                      <span className="text-[11px] text-[#404940]">2025</span>
                    </div>
                    <p className="text-[12px] text-[#404940] mt-0.5 leading-relaxed">
                      Delivery and calibration of MRI, 64-Slice CT, and automated hematology modules. Public outpatient intake commences.
                    </p>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#eceef0]">
                  <div className="w-8 h-8 rounded-full bg-[#e6e8ea] text-[#004c22] flex items-center justify-center shrink-0 font-bold text-[12px]">
                    Q2
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[14px] text-[#191c1e] font-bold">Inpatient Surgical Wards Inauguration</h4>
                      <span className="text-[11px] text-[#404940]">2026</span>
                    </div>
                    <p className="text-[12px] text-[#404940] mt-0.5 leading-relaxed">
                      Commissioning 50 private hospital beds, 2 operating theatres, and intensive care beds with cross-functional acupuncture staff.
                    </p>
                  </div>
                </div>

                {/* Milestone 4 */}
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#eceef0]">
                  <div className="w-8 h-8 rounded-full bg-[#e6e8ea] text-[#004c22] flex items-center justify-center shrink-0 font-bold text-[12px]">
                    Q1
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[14px] text-[#191c1e] font-bold">GMP Botanical Manufacturing Plant</h4>
                      <span className="text-[11px] text-[#404940]">2027</span>
                    </div>
                    <p className="text-[12px] text-[#404940] mt-0.5 leading-relaxed">
                      Full industrial manufacturing of EHMCare botanical formulas with NAFDAC export licensure across Ghana, Ivory Coast, and Kenya.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Investor & Partner Direct Consultation Drawer / Terminal */}
      <section className="w-full py-14 bg-[#f7f9fb]" id="partner-briefing">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="rounded-3xl bg-[#004c22] text-[#ffffff] p-6 lg:p-12 shadow-xl overflow-hidden relative">
            {/* Background SVG ornament */}
            <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
              <svg fill="none" height="420" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="420">
                <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z"></path>
                <circle cx="12" cy="12" r="9"></circle>
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="text-[11px] uppercase tracking-wider text-[#acf770] font-bold">
                  Executive Office of Strategy
                </span>
                <h2 className="text-[32px] text-[#ffffff] font-bold mt-2 mb-4 leading-tight">
                  Engage with EHMCare Leadership & Institutional Syndicate
                </h2>
                <p className="text-[16px] text-[#93e0a2] leading-relaxed mb-6 max-w-xl">
                  We welcome dialogue with accredited angel syndicates, development finance institutions (DFIs), sovereign health funds, and pharmaceutical contract distributors.
                </p>

                <div className="space-y-3 text-[13px] text-[#e0e3e5]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#acf770]">call</span>
                    <span>
                      Direct Investor Line: <strong>+234 901 518 4004</strong> (Office of Clinical Expansion)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#acf770]">mail</span>
                    <span>
                      Confidential Data Room Access: <strong>investors@ehmcare.com</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#acf770]">verified_user</span>
                    <span>Full NDA protection, physical site tour logistics provided upon verification.</span>
                  </div>
                </div>
              </div>

              {/* Confidential Briefing Request Form */}
              <div className="lg:col-span-5 bg-[#ffffff] text-[#191c1e] rounded-2xl p-6 shadow-lg border border-[#eceef0]">
                <h3 className="text-[18px] text-[#004c22] font-bold mb-1">Request Investor Information Kit</h3>
                <p className="text-[13px] text-[#404940] mb-4">
                  Receive the audited 64-page financial projection and architectural dossiers.
                </p>

                {!inquirySubmitted ? (
                  <form className="space-y-3" id="investor-inquiry" onSubmit={handleInquirySubmit}>
                    <div>
                      <label className="block text-[11px] text-[#404940] mb-1 font-bold">
                        Institutional Entity / Principal Name *
                      </label>
                      <input
                        className="w-full h-11 px-3 rounded-lg bg-[#f7f9fb] border border-[#bfc9bd] text-[#191c1e] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#356b00]"
                        placeholder="e.g. West African Health Syndicate"
                        required
                        type="text"
                        value={partnerForm.principalName}
                        onChange={(e) => setPartnerForm({ ...partnerForm, principalName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#404940] mb-1 font-bold">
                        Official Business Email *
                      </label>
                      <input
                        className="w-full h-11 px-3 rounded-lg bg-[#f7f9fb] border border-[#bfc9bd] text-[#191c1e] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#356b00]"
                        placeholder="partner@fund.com"
                        required
                        type="email"
                        value={partnerForm.email}
                        onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#404940] mb-1 font-bold">Area of Primary Interest</label>
                      <select
                        className="w-full h-11 px-3 rounded-lg bg-[#f7f9fb] border border-[#bfc9bd] text-[#191c1e] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#356b00]"
                        value={partnerForm.area}
                        onChange={(e) => setPartnerForm({ ...partnerForm, area: e.target.value })}
                      >
                        <option>Diagnostic Center Equipment Financing</option>
                        <option>Inpatient Hospital Wing Equity Participation</option>
                        <option>GMP Pharmaceutical Manufacturing Joint-Venture</option>
                        <option>Full Series A Syndicate Participation ($500k+)</option>
                      </select>
                    </div>
                    <button
                      className="w-full h-12 mt-2 rounded-lg bg-[#004c22] text-[#ffffff] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#166534] transition-colors shadow-md cursor-pointer"
                      type="submit"
                    >
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                      <span>Request Encrypted Data Room Pass</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-4 rounded-xl bg-[#acf770]/30 text-[#0c2000] text-[12px] text-center space-y-2 border border-[#acf770]">
                    <span className="material-symbols-outlined text-[#356b00] text-[32px]">check_circle</span>
                    <h5 className="font-bold text-[15px] text-[#004c22]">Access Request Recorded</h5>
                    <p>
                      Access request for <strong>{partnerForm.principalName}</strong> recorded. Our executive strategy desk will contact your office within 4 business hours.
                    </p>
                    <button
                      onClick={onOpenInvestorDeck}
                      className="mt-2 w-full py-2 bg-[#004c22] text-white rounded-lg font-bold text-[12px] hover:bg-[#166534]"
                    >
                      Instant Download Overview Deck (.PDF)
                    </button>
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
