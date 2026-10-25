import React, { useState, useEffect } from 'react';
import {
  IMAGES,
  CLINICAL_LOCATIONS,
  COMPLETE_DEPARTMENTS,
  ClinicalDepartment,
  CONTACT_INFO,
  INSIDE_CLINIC_GALLERY,
} from '../data/content.ts';
import { NewsletterSubscription } from './NewsletterSubscription.tsx';
import { TreatmentsFaq } from './TreatmentsFaq.tsx';
import { PatientSuccessGallery } from './PatientSuccessGallery.tsx';
import { PatientTestimonialCarousel } from './PatientTestimonialCarousel.tsx';

interface TreatmentsViewProps {
  onOpenBooking: (specialty?: string) => void;
  onOpenVideo?: (title: string, subtitle: string, thumbnail: string, youtubeId?: string) => void;
  onNavigateToStories: () => void;
}

export const TreatmentsView: React.FC<TreatmentsViewProps> = ({
  onOpenBooking,
  onOpenVideo,
  onNavigateToStories,
}) => {
  const [quickService, setQuickService] = useState('neuro-acupuncture');
  const [quickLocation, setQuickLocation] = useState('ilorin');
  const [quickDate, setQuickDate] = useState('2025-03-01');
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [departmentCategoryFilter, setDepartmentCategoryFilter] = useState('All');
  const [departmentSearchQuery, setDepartmentSearchQuery] = useState('');
  const [quickServiceSearch, setQuickServiceSearch] = useState('');
  const [quickServiceCategory, setQuickServiceCategory] = useState('All');
  const [activeClinicIndex, setActiveClinicIndex] = useState(0);
  const [isClinicLightboxOpen, setIsClinicLightboxOpen] = useState(false);
  const [isClinicAutoPlaying, setIsClinicAutoPlaying] = useState(true);

  // Auto-slide gallery every 4.5 seconds on both mobile & desktop (pauses on lightbox or user interaction)
  useEffect(() => {
    if (!isClinicAutoPlaying || isClinicLightboxOpen) return;
    const interval = setInterval(() => {
      setActiveClinicIndex((prev) => (prev + 1) % INSIDE_CLINIC_GALLERY.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isClinicAutoPlaying, isClinicLightboxOpen]);

  const selectedDepartment =
    COMPLETE_DEPARTMENTS.find((d) => d.id === quickService) || COMPLETE_DEPARTMENTS[0];
  const selectedLocation =
    CLINICAL_LOCATIONS.find((l) => l.id === quickLocation) || CLINICAL_LOCATIONS[0];

  const handleQuickFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(quickService);
  };

  const filteredDropdownDepartments = COMPLETE_DEPARTMENTS.filter((d) => {
    const matchesSearch =
      quickServiceSearch === '' ||
      d.title.toLowerCase().includes(quickServiceSearch.toLowerCase()) ||
      d.description.toLowerCase().includes(quickServiceSearch.toLowerCase()) ||
      d.protocols.some((p) => p.toLowerCase().includes(quickServiceSearch.toLowerCase())) ||
      d.deptNumber.includes(quickServiceSearch);
    const matchesCategory =
      quickServiceCategory === 'All' || d.category === quickServiceCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredDepartments = COMPLETE_DEPARTMENTS.filter((d) => {
    const matchesCategory =
      departmentCategoryFilter === 'All' || d.category === departmentCategoryFilter;
    const matchesSearch =
      departmentSearchQuery === '' ||
      d.title.toLowerCase().includes(departmentSearchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(departmentSearchQuery.toLowerCase()) ||
      d.protocols.some((p) => p.toLowerCase().includes(departmentSearchQuery.toLowerCase())) ||
      d.deptNumber.includes(departmentSearchQuery);
    return matchesCategory && matchesSearch;
  });

  const isFiltersActive =
    departmentCategoryFilter !== 'All' ||
    departmentSearchQuery.trim() !== '' ||
    quickServiceCategory !== 'All' ||
    quickServiceSearch.trim() !== '';

  const handleResetFilters = () => {
    setDepartmentCategoryFilter('All');
    setDepartmentSearchQuery('');
    setQuickServiceCategory('All');
    setQuickServiceSearch('');
    const target = document.getElementById('clinical-departments');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Sliding News Wire Marquee / Institutional Accreditation Ticker */}
      <section className="marquee-wrapper w-full bg-[#e6e8ea] py-2 overflow-hidden border-b border-[#eceef0] relative flex items-center">
        <div className="shrink-0 z-10 bg-[#004c22] text-[#acf770] px-3 sm:px-4 py-1 text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-xs border-r border-[#166534]">
          <span className="w-2 h-2 rounded-full bg-[#acf770] animate-pulse"></span>
          <span>LIVE BULLETIN</span>
        </div>
        <div className="flex overflow-hidden relative w-full items-center">
          <div className="animate-marquee-infinite flex items-center gap-8 whitespace-nowrap text-[12px] font-bold text-[#404940] pr-8">
            <span className="inline-flex items-center gap-1.5 text-[#004c22]">
              <span className="material-symbols-outlined text-[16px] text-[#356b00]">verified</span>
              Certified TCM Specialists & Licensed Acupuncturists
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#004c22]">local_hospital</span>
              Ilorin Central: 7 Sofoluwe St, Saboke • Maitama, Abuja FCT
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#356b00]">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              94.2% Verified Recovery in Chronic Lumbar & Stroke Rehab
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#004c22]">school</span>
              Accredited Clinical Training Academy (West Africa)
            </span>
            <span className="inline-flex items-center gap-2 text-[#191c1e] font-extrabold">
              <span className="w-2 h-2 rounded-full bg-[#356b00] animate-pulse"></span>
              Admissions & Consultations Open Today
            </span>
          </div>

          <div className="animate-marquee-infinite flex items-center gap-8 whitespace-nowrap text-[12px] font-bold text-[#404940] pr-8" aria-hidden="true">
            <span className="inline-flex items-center gap-1.5 text-[#004c22]">
              <span className="material-symbols-outlined text-[16px] text-[#356b00]">verified</span>
              Certified TCM Specialists & Licensed Acupuncturists
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#004c22]">local_hospital</span>
              Ilorin Central: 7 Sofoluwe St, Saboke • Maitama, Abuja FCT
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#356b00]">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              94.2% Verified Recovery in Chronic Lumbar & Stroke Rehab
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#004c22]">school</span>
              Accredited Clinical Training Academy (West Africa)
            </span>
            <span className="inline-flex items-center gap-2 text-[#191c1e] font-extrabold">
              <span className="w-2 h-2 rounded-full bg-[#356b00] animate-pulse"></span>
              Admissions & Consultations Open Today
            </span>
          </div>
        </div>
      </section>

      {/* Editorial Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#f7f9fb] py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Left Typography & CTAs */}
            <div className="lg:col-span-7 flex flex-col gap-4 z-10">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#a6f4b5] text-[#00210b] text-[11px] font-bold uppercase tracking-wider shadow-xs">
                <span className="material-symbols-outlined text-[14px]">spa</span>
                <span>Evidence-Based Integrative TCM • Nigeria</span>
              </div>

              <h1 className="font-['Plus_Jakarta_Sans'] text-[26px] xs:text-[30px] sm:text-[38px] lg:text-display-lg text-[#004c22] tracking-tight font-extrabold leading-[1.18] sm:leading-tight">
                Pioneering Integrative & Traditional Chinese Medicine in Nigeria
              </h1>

              <p className="text-[15px] sm:text-[18px] text-[#404940] max-w-2xl leading-relaxed">
                Combining neuro-acupuncture, targeted cupping therapy, and clinical herbal medicine with evidence-based holistic diagnostics.{' '}
                <span className="font-semibold text-[#004c22]">4.99★ Rated</span> by over 1,500+ treated patients across Kwara State, Abuja, and nationwide.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 w-full">
                <a
                  href={CONTACT_INFO.callHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-xl bg-[#166534] text-[#ffffff] font-extrabold text-[13.5px] sm:text-[14px] hover:bg-[#004c22] transition-all duration-200 shadow-md cursor-pointer active:scale-98 text-center group"
                  title={`Call EHMCare Professional Directly: ${CONTACT_INFO.callPhone}`}
                >
                  <span className="material-symbols-outlined text-[20px] text-[#acf770] group-hover:rotate-12 transition-transform">
                    call
                  </span>
                  <span>Call Professional: {CONTACT_INFO.callPhone}</span>
                </a>

                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-[#eceef0] text-[#004c22] font-bold text-[13px] sm:text-[14px] hover:bg-[#e6e8ea] transition-colors cursor-pointer text-center"
                  href="#clinical-departments"
                >
                  <span>Explore Treatments</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </div>

              {/* Proof Metrics Bar with Adaptive Mobile Typography */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-5 sm:pt-6">
                <div className="p-2.5 sm:p-4 rounded-xl bg-[#ffffff] shadow-xs flex flex-col justify-between border border-[#eceef0] min-w-0">
                  <span className="text-[19px] xs:text-[22px] sm:text-[28px] lg:text-[32px] text-[#004c22] font-extrabold leading-none truncate">
                    1,500+
                  </span>
                  <span className="text-[10px] sm:text-[12px] text-[#404940] mt-1 leading-snug">
                    Documented Recoveries
                  </span>
                </div>

                <div className="p-2.5 sm:p-4 rounded-xl bg-[#ffffff] shadow-xs flex flex-col justify-between border border-[#eceef0] min-w-0">
                  <span className="text-[19px] xs:text-[22px] sm:text-[28px] lg:text-[32px] text-[#356b00] font-extrabold leading-none truncate">
                    94.2%
                  </span>
                  <span className="text-[10px] sm:text-[12px] text-[#404940] mt-1 leading-snug">
                    Pain Relief Rate
                  </span>
                </div>

                <div className="p-2.5 sm:p-4 rounded-xl bg-[#ffffff] shadow-xs flex flex-col justify-between border border-[#eceef0] min-w-0">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-[19px] xs:text-[22px] sm:text-[28px] lg:text-[32px] text-[#004c22] font-extrabold leading-none">
                      2
                    </span>
                    <span className="text-[11px] xs:text-[12px] sm:text-[14px] text-[#004c22] font-bold">
                      Centers
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[12px] text-[#404940] mt-1 leading-snug">
                    Ilorin & Abuja Wings
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Right Asymmetrical Photo Mosaic */}
            <div className="lg:col-span-5 relative flex flex-col gap-4">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#eceef0] group">
                <img
                  alt="EHMCare Inpatient & Clinical Acupuncture Suite"
                  className="w-full h-80 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  src={IMAGES.heroInpatient}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = '/assets/aistudio/image_04c26e80.png';
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#ffffff]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#004c22] text-[20px]">medical_services</span>
                    <span className="text-[12px] text-[#191c1e] font-semibold">Active Inpatient & Neuro Care Unit</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#356b00] uppercase bg-[#acf770] px-2 py-0.5 rounded-full">
                    Sterile Suite
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden shadow-md bg-[#eceef0] group">
                  <img
                    alt="Patient Rehab and Physical Mobility Recovery"
                    className="w-full h-44 object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                    src={IMAGES.heroRehab}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004c22]/80 via-transparent to-transparent flex items-end p-2.5">
                    <p className="text-[#ffffff] text-[12px] font-semibold">Neuromuscular Rehab</p>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden shadow-md bg-[#eceef0] group">
                  <img
                    alt="EHMCare Clinical Courtyard and Practitioner Rounds"
                    className="w-full h-44 object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                    src={IMAGES.heroRounds}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004c22]/80 via-transparent to-transparent flex items-end p-2.5">
                    <p className="text-[#ffffff] text-[12px] font-semibold">Care Team Rounds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quick-Booking Desk / Luxury Consultation Triage */}
      <section className="w-full bg-[#ffffff] py-10 shadow-sm" id="consultation-desk">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="bg-[#003d1b] text-[#ffffff] rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden border border-[#166534]">
            {/* Ambient decorative shapes */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#a6f4b5]/10 blur-3xl pointer-events-none"></div>
            <div className="absolute right-1/3 -top-24 w-72 h-72 rounded-full bg-[#356b00]/20 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Triage Proposition */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#a6f4b5] text-[#00210b] text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">verified_user</span>
                  <span>Accredited Clinical Triage</span>
                </div>
                <h2 className="text-[30px] lg:text-[34px] text-[#ffffff] font-extrabold leading-tight tracking-tight">
                  Reserve Your Consultation
                </h2>
                <p className="text-[14.5px] text-[#e0e3e5] leading-relaxed">
                  Schedule direct evaluation with licensed TCM practitioners for neurological pain, fertility support, or comprehensive botanical review.
                </p>

                <div className="pt-2 flex flex-col gap-2 text-[12px] text-[#a6f4b5]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    <span>Confidential medical protocol • HIPAA & NDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="material-symbols-outlined text-[18px] text-[#acf770]">schedule</span>
                    <span>45–60 min in-depth diagnostic pulse & tongue exam</span>
                  </div>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-[#004c22] border border-[#166534] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#93e0a2] uppercase font-bold block">Central Helpline</span>
                    <a href="tel:09015184004" className="text-[15px] font-extrabold text-white hover:text-[#acf770]">
                      0901 518 4004
                    </a>
                  </div>
                  <a
                    href="https://wa.me/2349059758574"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#acf770] text-[#0c2000] text-[11px] font-bold flex items-center gap-1 hover:bg-[#9de860]"
                  >
                    <span className="material-symbols-outlined text-[14px]">chat</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Multi-Millionaire Interactive Dropdown Selector Desk */}
              <div className="lg:col-span-8 bg-[#ffffff] text-[#191c1e] rounded-2xl p-5 lg:p-7 shadow-2xl border border-[#eceef0]">
                <form
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  id="consultationForm"
                  onSubmit={handleQuickFormSubmit}
                >
                  {/* Dropdown 1: Clinical Specialty */}
                  <div className="flex flex-col gap-1.5 relative md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[12px] font-bold text-[#191c1e] flex items-center gap-1">
                        <span className="w-5 h-5 rounded-full bg-[#004c22] text-white flex items-center justify-center text-[10px]">1</span>
                        <span>Clinical Specialty / Medical Activity</span>
                      </label>
                      <span className="text-[10.5px] font-bold text-[#356b00] bg-[#a6f4b5]/40 px-2 py-0.5 rounded-full">
                        16 Activities Available
                      </span>
                    </div>

                    {/* Interactive Dropdown Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsServiceDropdownOpen(!isServiceDropdownOpen);
                        setIsLocationDropdownOpen(false);
                      }}
                      className="w-full min-h-[52px] px-3.5 py-2 rounded-xl bg-[#f2f4f6] hover:bg-[#e6e8ea] border-2 border-[#bfc9bd] hover:border-[#004c22] focus:border-[#004c22] transition-all flex items-center justify-between gap-3 text-left cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#004c22] text-white flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[18px]">{selectedDepartment.icon}</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#356b00]">
                            Dept {selectedDepartment.deptNumber} • {selectedDepartment.category}
                          </span>
                          <span className="text-[13px] font-extrabold text-[#191c1e] truncate">
                            {selectedDepartment.title}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[11px] font-semibold text-[#004c22] hidden sm:inline">Change</span>
                        <span
                          className="material-symbols-outlined text-[20px] text-[#004c22] transition-transform duration-200"
                          style={{ transform: isServiceDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                          expand_more
                        </span>
                      </div>
                    </button>

                    {/* Rich Expandable Dropdown Menu with High Visibility and Instant Search */}
                    {isServiceDropdownOpen && (
                      <div className="absolute top-full left-0 w-full sm:w-[660px] lg:w-[720px] max-w-[95vw] mt-2 z-50 bg-[#ffffff] rounded-2xl shadow-2xl border-2 border-[#004c22] overflow-hidden flex flex-col animate-fadeIn">
                        {/* Header with Title and Search Input */}
                        <div className="p-3.5 bg-[#f8faf9] border-b border-[#eceef0] flex flex-col gap-2.5 sticky top-0 z-10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-pulse"></span>
                              <span className="text-[12.5px] font-extrabold text-[#004c22] uppercase tracking-wider">
                                Select From 16 TCCM & Naturopathic Departments
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#a6f4b5] text-[#004c22]">
                                {filteredDropdownDepartments.length} of 16 Available
                              </span>
                              <button
                                type="button"
                                onClick={() => setIsServiceDropdownOpen(false)}
                                className="p-1 rounded-md text-[#404940] hover:bg-[#e0e3e5] cursor-pointer"
                                aria-label="Close selector"
                              >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                              </button>
                            </div>
                          </div>

                          {/* Quick Live Search Bar */}
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#004c22] text-[18px]">
                              search
                            </span>
                            <input
                              type="text"
                              value={quickServiceSearch}
                              onChange={(e) => setQuickServiceSearch(e.target.value)}
                              placeholder="Search by department name, protocol, or symptom..."
                              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-[#bfc9bd] text-[12.5px] text-[#191c1e] placeholder-[#6b7280] focus:outline-none focus:border-[#004c22] focus:ring-1 focus:ring-[#004c22]"
                            />
                            {quickServiceSearch && (
                              <button
                                type="button"
                                onClick={() => setQuickServiceSearch('')}
                                className="absolute right-2.5 top-2.5 text-[#6b7280] hover:text-[#191c1e]"
                              >
                                <span className="material-symbols-outlined text-[16px]">cancel</span>
                              </button>
                            )}
                          </div>

                          {/* Mini Category Filter Chips */}
                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                            {['All', 'Acupuncture & Neurological', 'Physical & Manipulative', 'Botanical & Natural Pharmacotherapy', 'Specialty Medicine'].map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => setQuickServiceCategory(cat)}
                                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                                  quickServiceCategory === cat
                                    ? 'bg-[#004c22] text-white'
                                    : 'bg-white text-[#404940] border border-[#eceef0] hover:bg-[#e6e8ea]'
                                }`}
                              >
                                {cat === 'All' ? 'All 16' : cat.split('&')[0].trim()}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 2-Column Responsive Grid Showing All 16 Departments with Full Visibility */}
                        <div className="p-3 max-h-[420px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2 divide-y-0 bg-[#ffffff]">
                          {filteredDropdownDepartments.map((dept) => {
                            const isSelected = dept.id === quickService;
                            return (
                              <div
                                key={dept.id}
                                onClick={() => {
                                  setQuickService(dept.id);
                                  setIsServiceDropdownOpen(false);
                                }}
                                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                                  isSelected
                                    ? 'bg-[#a6f4b5]/30 border-[#004c22] shadow-xs'
                                    : 'bg-[#f8faf9] hover:bg-[#f0fdf4] border-[#eceef0] hover:border-[#004c22]/40'
                                }`}
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#ffffff] border border-[#d1d5db] flex items-center justify-center text-[#004c22] shrink-0 mt-0.5 shadow-xs">
                                  <span className="material-symbols-outlined text-[17px]">{dept.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1 mb-0.5">
                                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-[#e6e8ea] text-[#004c22]">
                                      DEPT {dept.deptNumber}
                                    </span>
                                    <span className="text-[10px] font-semibold text-[#16a34a] bg-[#f0fdf4] px-1.5 py-0.5 rounded-sm shrink-0">
                                      {dept.duration}
                                    </span>
                                  </div>
                                  <h4 className="text-[12px] font-extrabold text-[#191c1e] leading-snug line-clamp-1 hover:text-[#004c22]">
                                    {dept.title}
                                  </h4>
                                  <p className="text-[11px] text-[#4b5563] line-clamp-1 mt-0.5">
                                    {dept.description}
                                  </p>
                                </div>
                                {isSelected ? (
                                  <span className="material-symbols-outlined text-[18px] text-[#004c22] shrink-0 self-center">
                                    check_circle
                                  </span>
                                ) : (
                                  <span className="material-symbols-outlined text-[18px] text-transparent hover:text-[#004c22]/40 shrink-0 self-center">
                                    radio_button_unchecked
                                  </span>
                                )}
                              </div>
                            );
                          })}
                          {filteredDropdownDepartments.length === 0 && (
                            <div className="col-span-2 py-8 text-center text-[#6b7280]">
                              <p className="text-[13px] font-bold">No departments match "{quickServiceSearch}"</p>
                              <button
                                type="button"
                                onClick={() => {
                                  setQuickServiceSearch('');
                                  setQuickServiceCategory('All');
                                }}
                                className="mt-2 text-[12px] text-[#004c22] font-bold underline"
                              >
                                Reset search filter
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Sticky Footer Info */}
                        <div className="p-2.5 bg-[#f0f4f1] border-t border-[#eceef0] flex items-center justify-between text-[11px] text-[#404940]">
                          <span className="font-semibold">
                            Tip: Selecting a department sets up your consultation triage.
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsServiceDropdownOpen(false)}
                            className="px-3 py-1 rounded-lg bg-[#004c22] text-white font-bold hover:bg-[#166534] transition-colors cursor-pointer"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dropdown 2: Preferred Location */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label className="text-[12px] font-bold text-[#191c1e] flex items-center gap-1">
                      <span className="w-5 h-5 rounded-full bg-[#004c22] text-white flex items-center justify-center text-[10px]">2</span>
                      <span>Clinical Center Location</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setIsLocationDropdownOpen(!isLocationDropdownOpen);
                        setIsServiceDropdownOpen(false);
                      }}
                      className="w-full min-h-[52px] px-3.5 py-2 rounded-xl bg-[#f2f4f6] hover:bg-[#e6e8ea] border-2 border-[#bfc9bd] hover:border-[#004c22] focus:border-[#004c22] transition-all flex items-center justify-between gap-2 text-left cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-[20px] text-[#004c22] shrink-0">place</span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-bold uppercase text-[#356b00]">Venue</span>
                          <span className="text-[13px] font-bold text-[#191c1e] truncate">
                            {selectedLocation.name.split('(')[0]}
                          </span>
                        </div>
                      </div>
                      <span
                        className="material-symbols-outlined text-[20px] text-[#004c22] transition-transform duration-200 shrink-0"
                        style={{ transform: isLocationDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        expand_more
                      </span>
                    </button>

                    {isLocationDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#ffffff] rounded-2xl shadow-2xl border-2 border-[#004c22] max-h-[300px] overflow-y-auto animate-fadeIn divide-y divide-[#eceef0]">
                        {CLINICAL_LOCATIONS.map((loc) => {
                          const isSelected = loc.id === quickLocation;
                          return (
                            <div
                              key={loc.id}
                              onClick={() => {
                                setQuickLocation(loc.id);
                                setIsLocationDropdownOpen(false);
                              }}
                              className={`p-3 flex items-center gap-3 hover:bg-[#a6f4b5]/20 cursor-pointer transition-colors ${
                                isSelected ? 'bg-[#a6f4b5]/30' : ''
                              }`}
                            >
                              <span className="material-symbols-outlined text-[20px] text-[#004c22] shrink-0">place</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-[12.5px] font-bold text-[#191c1e]">{loc.name}</p>
                              </div>
                              {isSelected && (
                                <span className="material-symbols-outlined text-[18px] text-[#004c22]">check_circle</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Input 3: Target Date with Quick Pills */}
                  <div className="flex flex-col gap-1.5 md:col-span-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-[12px] font-bold text-[#191c1e] flex items-center gap-1">
                        <span className="w-5 h-5 rounded-full bg-[#004c22] text-white flex items-center justify-center text-[10px]">3</span>
                        <span>Preferred Appointment Date & Time Window</span>
                      </label>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-[#404940] font-semibold">Quick Select:</span>
                        <button
                          type="button"
                          onClick={() => setQuickDate('2025-03-01')}
                          className="px-2 py-0.5 rounded-md bg-[#f2f4f6] text-[#004c22] font-bold hover:bg-[#e0e3e5]"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuickDate('2025-03-02')}
                          className="px-2 py-0.5 rounded-md bg-[#f2f4f6] text-[#004c22] font-bold hover:bg-[#e0e3e5]"
                        >
                          Tomorrow
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuickDate('2025-03-03')}
                          className="px-2 py-0.5 rounded-md bg-[#f2f4f6] text-[#004c22] font-bold hover:bg-[#e0e3e5]"
                        >
                          This Weekend
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        className="w-full h-12 px-4 rounded-xl bg-[#f2f4f6] text-[#191c1e] text-[13.5px] font-bold focus:outline-none focus:ring-2 focus:ring-[#004c22] cursor-pointer border-2 border-[#bfc9bd]"
                        id="consult-date"
                        type="date"
                        value={quickDate}
                        onChange={(e) => setQuickDate(e.target.value)}
                      />
                      <span className="material-symbols-outlined absolute right-3 top-3 text-[20px] text-[#004c22] pointer-events-none">
                        calendar_today
                      </span>
                    </div>
                  </div>

                  {/* Submission Row */}
                  <div className="md:col-span-3 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#eceef0]">
                    <div className="flex items-center gap-2 text-[#404940] text-[12px]">
                      <span className="material-symbols-outlined text-[#356b00] text-[20px]">check_circle</span>
                      <span>Verified slot reservations with instant confirmation SMS & WhatsApp</span>
                    </div>
                    <button
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#004c22] text-[#ffffff] font-extrabold text-[14px] hover:bg-[#166534] transition-all flex items-center justify-center gap-2.5 shadow-lg hover:scale-102 active:scale-98 cursor-pointer"
                      type="submit"
                    >
                      <span>Continue to Slot Selection</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Clinical Departments / Standard of Care */}
      <section className="w-full bg-[#f7f9fb] py-14" id="clinical-departments">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="max-w-3xl">
              <span className="text-[#356b00] text-[12px] font-bold uppercase tracking-wider">
                Standard of Care
              </span>
              <h2 className="text-[32px] lg:text-[36px] text-[#004c22] font-extrabold tracking-tight mt-1">
                Core Specialized Departments
              </h2>
              <p className="text-[15px] text-[#404940] mt-2 leading-relaxed">
                Sub-Saharan Africa's benchmark clinical institution for Traditional Chinese & Complementary Medicine (TCCM) and Naturopathic therapies. Each division is staffed by licensed specialists with sterile hospital-grade suites and standardized botanical extracts.
              </p>
            </div>
            <a
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#e6e8ea] text-[#004c22] font-bold text-[13px] hover:bg-[#e0e3e5] transition-colors self-start md:self-auto shrink-0"
              href="tel:09015184004"
            >
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <span>Clinical Triage: 0901 518 4004</span>
            </a>
          </div>

          {/* Category Filter Pills & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#eceef0] mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { label: 'All 16 Departments', key: 'All', count: COMPLETE_DEPARTMENTS.length },
                { label: 'Acupuncture & Neurological', key: 'Acupuncture & Neurological', count: 3 },
                { label: 'Reproductive & Hormonal', key: 'Reproductive & Hormonal', count: 1 },
                { label: 'Physical & Manipulative', key: 'Physical & Manipulative', count: 4 },
                { label: 'Botanical & Natural', key: 'Botanical & Natural Pharmacotherapy', count: 3 },
                { label: 'Specialty Medicine', key: 'Specialty Medicine', count: 5 },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setDepartmentCategoryFilter(item.key)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    departmentCategoryFilter === item.key
                      ? 'bg-[#004c22] text-[#ffffff] shadow-xs'
                      : 'bg-[#e6e8ea] text-[#404940] hover:bg-[#d8dadc]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      departmentCategoryFilter === item.key
                        ? 'bg-[#acf770] text-[#004c22]'
                        : 'bg-[#ced2d4] text-[#404940]'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Live Filter Input & Reset Button */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#004c22] text-[17px]">
                  search
                </span>
                <input
                  type="text"
                  value={departmentSearchQuery}
                  onChange={(e) => setDepartmentSearchQuery(e.target.value)}
                  placeholder="Filter 16 departments..."
                  className="w-full pl-9 pr-7 py-1.5 rounded-full bg-white border border-[#bfc9bd] text-[12px] text-[#191c1e] placeholder-[#6b7280] focus:outline-none focus:border-[#004c22]"
                />
                {departmentSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setDepartmentSearchQuery('')}
                    className="absolute right-2.5 top-2 text-[#6b7280] hover:text-[#191c1e]"
                  >
                    <span className="material-symbols-outlined text-[15px]">cancel</span>
                  </button>
                )}
              </div>

              {(departmentCategoryFilter !== 'All' || departmentSearchQuery) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 rounded-full bg-[#004c22] text-[#acf770] text-[11px] font-bold hover:bg-[#166534] transition-colors shrink-0 flex items-center gap-1 shadow-xs cursor-pointer"
                  title="Reset department filters and show all 16 departments"
                >
                  <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* All 16 Department Cards with Dedicated Matching Clinical Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => onOpenBooking(dept.id)}
                className="group bg-[#ffffff] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#eceef0] cursor-pointer"
              >
                {/* Department Dedicated Real Matching Photo with Zero-CLS aspect ratio */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eceef0]">
                  <img
                    alt={dept.title}
                    src={dept.image}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1512290900672-1f4175394ef3?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-[#004c22]/95 backdrop-blur-xs text-[#a6f4b5] px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <span>DEPT {dept.deptNumber}</span>
                    <span>•</span>
                    <span className="text-white">{dept.category}</span>
                  </div>
                  <div className="absolute bottom-2.5 left-3 text-white text-[11.5px] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#acf770]">schedule</span>
                    <span>{dept.duration}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-[#a6f4b5] flex items-center justify-center text-[#004c22] shrink-0">
                        <span className="material-symbols-outlined text-[20px]">{dept.icon}</span>
                      </div>
                      <h3 className="text-[17px] text-[#191c1e] font-extrabold leading-tight group-hover:text-[#004c22] transition-colors">
                        {dept.title}
                      </h3>
                    </div>

                    <p className="text-[13px] text-[#404940] leading-relaxed mb-3">
                      {dept.description}
                    </p>

                    <ul className="space-y-1.5 text-[12px] text-[#404940] border-t border-[#eceef0] pt-2.5">
                      {dept.protocols.map((proto, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#004c22]"></span>
                          <span>{proto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-2 flex items-center justify-between border-t border-[#eceef0]">
                    <span className="text-[11.5px] font-bold text-[#356b00] bg-[#acf770]/40 px-2 py-0.5 rounded-md">
                      {dept.badge}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking(dept.id);
                      }}
                      className="text-[#004c22] hover:text-[#166534] text-[12.5px] font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer px-2 py-1 rounded-md hover:bg-[#e8f5e9]"
                      aria-label={`Book ${dept.title} Protocol`}
                    >
                      <span>Book Protocol</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section Summary & Total Count Notice */}
          <div className="mt-10 py-5 px-4 sm:px-6 rounded-2xl bg-[#ffffff] border border-[#eceef0] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#a6f4b5] flex items-center justify-center text-[#004c22] shrink-0">
                <span className="material-symbols-outlined text-[22px]">medical_services</span>
              </div>
              <div>
                <p className="text-[13.5px] font-extrabold text-[#191c1e]">
                  Showing {filteredDepartments.length} of {COMPLETE_DEPARTMENTS.length} Specialized TCCM & Naturopathic Departments
                </p>
                <p className="text-[12px] text-[#404940]">
                  {isFiltersActive
                    ? `Filters active (${filteredDepartments.length} of 16 shown). Click "Reset Filters" to display all departments.`
                    : 'Every clinical department is active with dedicated medical suites, licensed specialists, and verified protocols.'}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleResetFilters}
                className={`px-4 py-2.5 rounded-xl font-bold text-[12.5px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isFiltersActive
                    ? 'bg-[#004c22] text-[#acf770] shadow-sm ring-2 ring-[#acf770]/60 hover:bg-[#166534]'
                    : 'border border-[#bfc9bd] text-[#004c22] hover:bg-[#f2f4f6]'
                }`}
                title="Reset all search filters and show all 16 departments"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>Reset Filters {isFiltersActive && `(${filteredDepartments.length}/16)`}</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenBooking(selectedDepartment.id)}
                className="px-5 py-2.5 rounded-xl bg-[#004c22] text-white font-extrabold text-[12.5px] hover:bg-[#166534] transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-[#acf770]">calendar_month</span>
                <span>Book Consultation Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inside Clinic — Real Facility Interactive Showcase */}
      <section className="w-full bg-[#f2f4f6] py-14 border-y border-[#eceef0]" id="inside-clinic-tour">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004c22]/10 text-[#004c22] text-[11px] font-bold tracking-wide uppercase mb-3">
                <span className="material-symbols-outlined text-[15px]">apartment</span>
                <span>Inside Clinic • Real Facility Tour</span>
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#004c22] leading-tight">
                Inside EHMCare Clinic: Hospital-Grade Suites & Inpatient Wards
              </h2>
              <p className="text-[14.5px] sm:text-[15.5px] text-[#404940] mt-2 leading-relaxed">
                Take an authentic tour inside our primary Kwara State center. Unlike informal therapy rooms, EHMCare is architected to strict institutional medical standards—featuring monitored inpatient recovery wards, dedicated acupuncture decompression suites, electro-stimulation apparatus, and physician diagnostic rooms.
              </p>
            </div>

            {/* Quick Actions, Auto-Slide Controls & Counter */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start md:self-end flex-wrap">
              <span className="text-[12px] font-bold text-[#404940] bg-white px-3 py-1.5 rounded-full border border-[#eceef0] shadow-2xs">
                Room {activeClinicIndex + 1} of {INSIDE_CLINIC_GALLERY.length}
              </span>
              <button
                type="button"
                onClick={() => setIsClinicAutoPlaying(!isClinicAutoPlaying)}
                className={`text-[11.5px] font-bold px-2.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
                  isClinicAutoPlaying
                    ? 'bg-[#004c22]/10 text-[#004c22] border-[#004c22]/25 hover:bg-[#004c22]/15'
                    : 'bg-white text-[#556055] border-[#eceef0] hover:bg-[#f6f8f7]'
                }`}
                title={isClinicAutoPlaying ? 'Pause Auto-Slide' : 'Resume Auto-Slide'}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isClinicAutoPlaying ? 'pause_circle' : 'play_circle'}
                </span>
                <span className="text-[11px] font-semibold">
                  {isClinicAutoPlaying ? 'Auto-Slide' : 'Paused'}
                </span>
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setActiveClinicIndex((prev) =>
                      prev === 0 ? INSIDE_CLINIC_GALLERY.length - 1 : prev - 1
                    )
                  }
                  className="w-9 h-9 rounded-full bg-white border border-[#eceef0] flex items-center justify-center text-[#004c22] hover:bg-[#004c22] hover:text-white transition-colors cursor-pointer shadow-2xs"
                  aria-label="Previous clinic photo"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveClinicIndex((prev) =>
                      prev === INSIDE_CLINIC_GALLERY.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-9 h-9 rounded-full bg-white border border-[#eceef0] flex items-center justify-center text-[#004c22] hover:bg-[#004c22] hover:text-white transition-colors cursor-pointer shadow-2xs"
                  aria-label="Next clinic photo"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Gallery Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Active Photo Showcase */}
            <div className="lg:col-span-7 flex flex-col">
              <div
                className="relative rounded-2xl overflow-hidden shadow-xl bg-[#001d0c] group cursor-pointer aspect-[16/10] sm:aspect-[16/10] w-full"
                onClick={() => setIsClinicLightboxOpen(true)}
                onMouseEnter={() => setIsClinicAutoPlaying(false)}
                onMouseLeave={() => setIsClinicAutoPlaying(true)}
                onTouchStart={() => setIsClinicAutoPlaying(false)}
                onTouchEnd={() => {
                  setTimeout(() => setIsClinicAutoPlaying(true), 4000);
                }}
                title="Click to view high-resolution photo in full screen"
              >
                <img
                  key={INSIDE_CLINIC_GALLERY[activeClinicIndex].id}
                  alt={INSIDE_CLINIC_GALLERY[activeClinicIndex].title}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-102 animate-fadeIn"
                  src={INSIDE_CLINIC_GALLERY[activeClinicIndex].image}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = INSIDE_CLINIC_GALLERY[activeClinicIndex].fallbackUrl;
                  }}
                />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#002b11]/85 backdrop-blur-md text-white text-[11.5px] font-bold border border-white/15 shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-[#acf770]">
                      {INSIDE_CLINIC_GALLERY[activeClinicIndex].icon}
                    </span>
                    <span>{INSIDE_CLINIC_GALLERY[activeClinicIndex].roomType}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-semibold border border-white/10 group-hover:bg-[#004c22] transition-colors">
                    <span className="material-symbols-outlined text-[14px]">fullscreen</span>
                    <span className="hidden sm:inline">Enlarge</span>
                  </span>
                </div>

                {/* Bottom Title & Room Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 sm:p-5 flex flex-col justify-end text-white pointer-events-none">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#acf770] text-[#004c22]">
                      {INSIDE_CLINIC_GALLERY[activeClinicIndex].badge}
                    </span>
                    <span className="text-[11.5px] text-white/75">Verified Clinical Photography</span>
                  </div>
                  <h3 className="text-[17px] sm:text-[20px] font-extrabold text-white leading-tight">
                    {INSIDE_CLINIC_GALLERY[activeClinicIndex].title}
                  </h3>
                </div>

                {/* Auto-Slide Progress Dots Overlay */}
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15">
                  {INSIDE_CLINIC_GALLERY.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveClinicIndex(i);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeClinicIndex === i
                          ? 'w-6 bg-[#acf770]'
                          : 'w-2 bg-white/40 hover:bg-white/80'
                      }`}
                      aria-label={`Jump to room ${i + 1}`}
                      title={`Go to Room ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Nav Arrows on Image */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveClinicIndex((prev) =>
                      prev === 0 ? INSIDE_CLINIC_GALLERY.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-85 sm:opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-xs z-10"
                  aria-label="Previous photo"
                >
                  <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveClinicIndex((prev) =>
                      prev === INSIDE_CLINIC_GALLERY.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-85 sm:opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-xs z-10"
                  aria-label="Next photo"
                >
                  <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                </button>
              </div>

              {/* Photo description below showcase */}
              <div className="mt-3.5 p-4 rounded-xl bg-white border border-[#eceef0] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-[13px] text-[#404940] leading-relaxed">
                  <strong className="text-[#191c1e] font-bold">Room Purpose: </strong>
                  {INSIDE_CLINIC_GALLERY[activeClinicIndex].description}
                </p>
                <button
                  type="button"
                  onClick={() => setIsClinicLightboxOpen(true)}
                  className="shrink-0 text-[12px] font-bold text-[#004c22] hover:text-[#166534] flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                  <span>Inspect Room</span>
                </button>
              </div>
            </div>

            {/* Right: Room Specs, Verified Equipment, & Direct Contact */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {/* Verified Room Equipment Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#eceef0] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#a6f4b5] text-[#004c22] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">
                        {INSIDE_CLINIC_GALLERY[activeClinicIndex].icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#356b00] uppercase tracking-wider">
                        Active Suite Specs
                      </p>
                      <p className="text-[13.5px] font-extrabold text-[#191c1e] line-clamp-1">
                        {INSIDE_CLINIC_GALLERY[activeClinicIndex].roomType}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10.5px] font-extrabold bg-[#004c22]/10 text-[#004c22]">
                    Verified
                  </span>
                </div>

                <p className="text-[12px] text-[#556055] font-semibold">Installed Medical Apparatus:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INSIDE_CLINIC_GALLERY[activeClinicIndex].equipment.map((eq, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#f6f8f7] text-[12px] font-medium text-[#191c1e]"
                    >
                      <span className="material-symbols-outlined text-[#004c22] text-[16px] shrink-0">
                        check_circle
                      </span>
                      <span className="line-clamp-1">{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institution-Wide Facility Standards */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-white border border-[#eceef0] shadow-2xs flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#004c22] text-[20px] shrink-0">
                    sanitizer
                  </span>
                  <div>
                    <p className="text-[12px] font-bold text-[#191c1e]">Daily UV Sterility</p>
                    <p className="text-[11px] text-[#556055]">Single-use sterile surgical kits</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eceef0] shadow-2xs flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#004c22] text-[20px] shrink-0">
                    vital_signs
                  </span>
                  <div>
                    <p className="text-[12px] font-bold text-[#191c1e]">Telemetry Vitals</p>
                    <p className="text-[11px] text-[#556055]">Continuous BP & SpO2 monitoring</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eceef0] shadow-2xs flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#004c22] text-[20px] shrink-0">
                    door_sliding
                  </span>
                  <div>
                    <p className="text-[12px] font-bold text-[#191c1e]">Private Partitions</p>
                    <p className="text-[11px] text-[#556055]">Acoustically quiet therapy zones</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eceef0] shadow-2xs flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#004c22] text-[20px] shrink-0">
                    ac_unit
                  </span>
                  <div>
                    <p className="text-[12px] font-bold text-[#191c1e]">Climate Confort</p>
                    <p className="text-[11px] text-[#556055]">Optimized muscle relaxation air</p>
                  </div>
                </div>
              </div>

              {/* Direct Walkthrough & Call Professional Card */}
              <div className="p-4 rounded-xl bg-[#004c22] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#acf770] flex items-center justify-center text-[#004c22] shrink-0">
                    <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-extrabold text-white">Tour Clinic or Speak with Doctor</p>
                    <p className="text-[11.5px] text-[#d6eedb]">Direct consultation & physical admission</p>
                  </div>
                </div>
                <a
                  href={CONTACT_INFO.callHref}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white text-[#004c22] text-[13px] font-extrabold hover:bg-[#acf770] transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>{CONTACT_INFO.callPhone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive 4-Room Selector Strip */}
          <div className="mt-6">
            <p className="text-[12px] font-bold text-[#404940] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#004c22]">grid_view</span>
              <span>Select Room to View Inside ({INSIDE_CLINIC_GALLERY.length} Verified Facilities)</span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {INSIDE_CLINIC_GALLERY.map((room, idx) => {
                const isActive = activeClinicIndex === idx;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setActiveClinicIndex(idx)}
                    className={`relative text-left rounded-xl p-2.5 transition-all cursor-pointer flex flex-col gap-2 border ${
                      isActive
                        ? 'bg-white border-[#004c22] shadow-md ring-2 ring-[#004c22]/30 -translate-y-0.5'
                        : 'bg-white/80 hover:bg-white border-[#eceef0] hover:border-[#bfc9bd] shadow-2xs'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#e0e3e5]">
                      <img
                        alt={room.title}
                        src={room.image}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = room.fallbackUrl;
                        }}
                      />
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9.5px] font-black bg-black/70 text-white backdrop-blur-xs">
                        0{idx + 1}
                      </span>
                      {isActive && (
                        <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded text-[9px] font-extrabold bg-[#004c22] text-[#acf770] flex items-center gap-0.5 shadow-sm">
                          <span className="material-symbols-outlined text-[11px]">visibility</span>
                          <span>Active</span>
                        </span>
                      )}
                    </div>

                    {/* Room Info */}
                    <div>
                      <p
                        className={`text-[12px] font-bold line-clamp-1 ${
                          isActive ? 'text-[#004c22]' : 'text-[#191c1e]'
                        }`}
                      >
                        {room.title}
                      </p>
                      <p className="text-[11px] text-[#556055] line-clamp-1">{room.roomType}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {isClinicLightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fade-in"
            onClick={() => setIsClinicLightboxOpen(false)}
          >
            {/* Top Modal Bar */}
            <div
              className="flex items-center justify-between text-white max-w-6xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#004c22] text-[#acf770] text-[11px] font-black uppercase tracking-wider">
                  Inside Clinic • {activeClinicIndex + 1} of {INSIDE_CLINIC_GALLERY.length}
                </span>
                <h4 className="text-[14px] sm:text-[16px] font-bold truncate max-w-xs sm:max-w-md">
                  {INSIDE_CLINIC_GALLERY[activeClinicIndex].title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsClinicLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close fullscreen modal"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Middle Main Large Photo with Nav */}
            <div
              className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-3 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                alt={INSIDE_CLINIC_GALLERY[activeClinicIndex].title}
                src={INSIDE_CLINIC_GALLERY[activeClinicIndex].image}
                className="max-h-[68vh] sm:max-h-[74vh] max-w-full object-contain rounded-xl shadow-2xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = INSIDE_CLINIC_GALLERY[activeClinicIndex].fallbackUrl;
                }}
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveClinicIndex((prev) =>
                    prev === 0 ? INSIDE_CLINIC_GALLERY.length - 1 : prev - 1
                  )
                }
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                aria-label="Previous photo"
              >
                <span className="material-symbols-outlined text-[30px]">chevron_left</span>
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveClinicIndex((prev) =>
                    prev === INSIDE_CLINIC_GALLERY.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                aria-label="Next photo"
              >
                <span className="material-symbols-outlined text-[30px]">chevron_right</span>
              </button>
            </div>

            {/* Bottom Caption & Thumbnails */}
            <div
              className="max-w-6xl w-full mx-auto bg-black/60 rounded-xl p-3 sm:p-4 text-white border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center sm:text-left">
                <p className="text-[13px] font-bold text-[#acf770]">
                  {INSIDE_CLINIC_GALLERY[activeClinicIndex].badge} • {INSIDE_CLINIC_GALLERY[activeClinicIndex].roomType}
                </p>
                <p className="text-[12px] text-white/80 line-clamp-2 max-w-2xl">
                  {INSIDE_CLINIC_GALLERY[activeClinicIndex].description}
                </p>
              </div>

              {/* Mini switcher */}
              <div className="flex items-center gap-2 shrink-0">
                {INSIDE_CLINIC_GALLERY.map((rm, i) => (
                  <button
                    key={rm.id}
                    type="button"
                    onClick={() => setActiveClinicIndex(i)}
                    className={`w-10 h-7 rounded overflow-hidden border cursor-pointer transition-all ${
                      activeClinicIndex === i
                        ? 'border-[#acf770] ring-2 ring-[#acf770]/60 scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img alt="" src={rm.image} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Patient Success Video Gallery & Testimonials */}
      <PatientSuccessGallery
        onOpenVideo={onOpenVideo}
        onOpenBooking={onOpenBooking}
        onNavigateToAllStories={onNavigateToStories}
      />

      {/* Patient Written Reviews & Outcome Carousel */}
      <PatientTestimonialCarousel onOpenBooking={onOpenBooking} />

      {/* Physical Location Map & Visit Coordinator */}
      <section className="w-full bg-[#f2f4f6] py-14 border-t border-[#eceef0]">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-[#356b00] text-[12px] font-bold uppercase tracking-wider">
                Clinical Centers
              </span>
              <h2 className="text-[28px] text-[#004c22] font-bold">
                Visit Our Main Kwara Center
              </h2>
              <p className="text-[15px] text-[#404940]">
                Conveniently situated in Saboke, central Ilorin. Ample private parking, wheelchair-accessible therapy corridors, and quiet treatment pavilions.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#004c22] text-[22px] shrink-0">pin_drop</span>
                  <div>
                    <p className="text-[13px] font-bold text-[#191c1e]">Ilorin Headquarters</p>
                    <p className="text-[12px] text-[#404940]">7 Sofoluwe Street, off Lajorin Road, Saboke, South, Ilorin 240223, Kwara State</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#004c22] text-[22px] shrink-0">location_city</span>
                  <div>
                    <p className="text-[13px] font-bold text-[#191c1e]">Abuja Liaison Center</p>
                    <p className="text-[12px] text-[#404940]">Maitama District, Federal Capital Territory, Abuja</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#004c22] text-[22px] shrink-0">phone_in_talk</span>
                  <div>
                    <p className="text-[13px] font-bold text-[#191c1e]">Inquiries & Clinical Triage</p>
                    <p className="text-[12px] text-[#004c22] font-bold">
                      Call: <a href="tel:09015184004" className="hover:underline">0901 518 4004</a> • WhatsApp: <a href="https://wa.me/2349059758574" target="_blank" rel="noopener noreferrer" className="hover:underline">+234 905 975 8574</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <a
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#004c22] text-[#ffffff] font-bold text-[13px] hover:bg-[#166534] transition-colors"
                  href="https://maps.google.com/?q=7+Sofoluwe+Street+Saboke+Ilorin"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  <span>Get Turn-by-Turn Directions</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="w-full h-80 lg:h-96 rounded-2xl bg-cover bg-center shadow-lg relative overflow-hidden border border-[#eceef0]"
                style={{ backgroundImage: `url('${IMAGES.mapBackground}')` }}
              >
                <div className="absolute inset-0 bg-[#004c22]/10 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 bg-[#ffffff]/95 backdrop-blur-md p-3 rounded-xl shadow-md flex items-center gap-3 border border-[#eceef0]">
                  <span className="material-symbols-outlined text-[#004c22] text-[24px]">verified</span>
                  <div>
                    <p className="text-[12px] font-bold text-[#191c1e]">EHMCare Clinic & Academy Campus</p>
                    <p className="text-[11px] text-[#404940]">Ilorin Center • Validated Medical Facility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions: TCM & Integrative Therapies */}
      <TreatmentsFaq onOpenBooking={onOpenBooking} />

      {/* Newsletter Subscription: Health Tips & Academy Updates */}
      <NewsletterSubscription />

      {/* Final Clinical CTA */}
      <section className="w-full bg-[#004c22] text-[#ffffff] py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 text-center flex flex-col items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-[#356b00] text-[#ffffff] text-[11px] font-bold uppercase tracking-wider">
            Integrative Care Awaits
          </span>
          <h2 className="text-[32px] text-[#ffffff] font-extrabold max-w-2xl leading-tight">
            Take Control of Your Health with Time-Tested Chinese Medicine
          </h2>
          <p className="text-[16px] text-[#e0e3e5] max-w-xl">
            Consult directly with Dr. Alaba Emmanuel and the accredited EHMCare clinical team. In-person or virtual telehealth appointments available this week.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-3.5 rounded-lg bg-[#ffffff] text-[#004c22] font-bold text-[14px] hover:bg-[#eceef0] transition-colors shadow-lg cursor-pointer"
            >
              Book Consultation Now
            </button>
            <a
              className="px-8 py-3.5 rounded-lg bg-[#166534] text-[#ffffff] font-bold text-[14px] hover:bg-[#004c22] transition-colors"
              href="tel:+2349015184004"
            >
              Call Helpline: 0901 518 4004
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
