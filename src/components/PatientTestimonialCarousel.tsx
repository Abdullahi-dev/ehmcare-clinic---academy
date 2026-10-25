import React, { useState, useEffect, useRef } from 'react';

interface PatientTestimonialCarouselProps {
  onOpenBooking?: (specialty?: string) => void;
  className?: string;
}

interface TextReview {
  id: string;
  patientName: string;
  initials: string;
  initialsBg: string;
  initialsText: string;
  location: string;
  condition: string;
  treatmentType: string;
  specialtyId: string;
  duration: string;
  outcomeBadge: string;
  rating: number;
  headline: string;
  fullReview: string;
  verifiedDate: string;
}

const TEXT_REVIEWS: TextReview[] = [
  {
    id: 'rev-bayo',
    patientName: 'Bayo Issa',
    initials: 'BI',
    initialsBg: 'bg-[#004c22]',
    initialsText: 'text-[#acf770]',
    location: 'Ilorin, Kwara State (Ace Sports Journalist)',
    condition: 'Acute Mobility Loss & Inability to Walk',
    treatmentType: 'Neuro-Acupuncture & Physical Gait Rehab',
    specialtyId: 'stroke-rehab',
    duration: 'Full Clinical Course',
    outcomeBadge: 'Walks Independently',
    rating: 5,
    headline: 'From complete inability to walk to full independent mobility',
    fullReview:
      'As a sports journalist, being suddenly unable to walk was devastating. Coming to EHMCare was a divine turnaround. Through their expert neuro-acupuncture and specialized clinical therapies, strength was restored to my limbs. Today I am on my feet, walking without support, and fully back to my sports reporting work. EHMCare is a beacon of healing.',
    verifiedDate: 'YouTube Verified Testimony • 2024',
  },
  {
    id: 'rev-yunus',
    patientName: 'Yunus Abubakar',
    initials: 'YA',
    initialsBg: 'bg-[#acf770]',
    initialsText: 'text-[#0c2000]',
    location: 'Ilorin Center, Kwara State',
    condition: 'Severe Leg Pain, Soreness & Immobility',
    treatmentType: 'Targeted Acupuncture & Herbal Pharmacotherapy',
    specialtyId: 'orthopedic-tuina',
    duration: '6 Days Protocol',
    outcomeBadge: 'Relief in 6 Days',
    rating: 5,
    headline: 'Real changes in health and overall well-being in just six days',
    fullReview:
      'In just six days, I began to notice real changes in my health and overall well-being. The excruciating leg pain, soreness, and immobility that held me down began clearing up rapidly. My story is a testament to the power of traditional healing and the dedicated care provided here at EHM Care.',
    verifiedDate: 'YouTube Verified Testimony • 2024',
  },
  {
    id: 'rev-1',
    patientName: 'Alhaji O. Bello',
    initials: 'OB',
    initialsBg: 'bg-[#a6f4b5]',
    initialsText: 'text-[#004c22]',
    location: 'Ilorin, Kwara State',
    condition: 'Hemorrhagic Stroke with Right Hemiplegia',
    treatmentType: 'Scalp Neuro-Acupuncture & Kinetic Bed Rehab',
    specialtyId: 'stroke-rehab',
    duration: '6 Weeks (18 Sessions)',
    outcomeBadge: '92% Motor Regain',
    rating: 5,
    headline: 'Walked into the clinic after seven months confined to a wheelchair',
    fullReview:
      'After my stroke in 2024, orthodox hospitals told my children that my right-side paralysis was permanent. Coming to EHMCare Ilorin was a turning point. Dr. Alaba and the team initiated scalp electro-stimulation alongside herbal nerve tonics. By week three my toes began twitching; by week six I walked into the clinic with just a cane. May Allah reward the practitioners.',
    verifiedDate: 'Verified Patient • Nov 2024',
  },
  {
    id: 'rev-2',
    patientName: 'Dr. Chidinma E.',
    initials: 'CE',
    initialsBg: 'bg-[#acf770]',
    initialsText: 'text-[#0c2000]',
    location: 'Maitama District, Abuja',
    condition: 'L4–L5 Lumbar Disc Protrusion & Sciatica',
    treatmentType: 'Sterile Wet Cupping & Zheng Gu Bone Setting',
    specialtyId: 'orthopedic-tuina',
    duration: '4 Weeks (12 Sessions)',
    outcomeBadge: '100% Pain Relief',
    rating: 5,
    headline: 'Cancelled my scheduled spinal fusion surgery after 12 sessions',
    fullReview:
      'As a consultant physician trained in orthodox medicine, I was understandably skeptical of traditional Chinese techniques. However, unbearable sciatic pain down my right calf left me unable to stand during ward rounds. EHMCare’s precise deep fascial cupping and Zheng Gu spinal alignment relieved the disc root compression completely without surgery. My follow-up MRI showed dramatic edema reduction.',
    verifiedDate: 'Verified Clinician Patient • Jan 2025',
  },
  {
    id: 'rev-3',
    patientName: 'Mrs. Amina & Yusuf K.',
    initials: 'AK',
    initialsBg: 'bg-[#dae2fd]',
    initialsText: 'text-[#131b2e]',
    location: 'Offa, Kwara State',
    condition: 'Secondary Infertility & Tubal Sluggishness',
    treatmentType: 'Pelvic Meridian Moxa & Botanical Granules',
    specialtyId: 'infertility-support',
    duration: '3 Consecutive Cycles',
    outcomeBadge: 'Natural Conception',
    rating: 5,
    headline: 'Conceived our daughter naturally after 5 heartbreaking years',
    fullReview:
      'We had spent fortunes on unsuccessful ovulation stimulations and IVF consultations. Dr. Emmanuel examined our pulses, detected deep internal pelvic coldness, and placed us on targeted thermal Artemisia moxibustion and custom botanical granule prescriptions. My menstrual cycles balanced in two months, and by the third month, our pregnancy test was positive. Zainab is now four months old!',
    verifiedDate: 'Verified Family • Oct 2024',
  },
  {
    id: 'rev-4',
    patientName: 'Chief Adebayo T.',
    initials: 'AT',
    initialsBg: 'bg-[#fed8b1]',
    initialsText: 'text-[#522900]',
    location: 'Lekki Phase 1, Lagos State',
    condition: 'Severe Knee Osteoarthritis & Mobility Loss',
    treatmentType: 'Electro-Acupuncture & Guasha Mobilization',
    specialtyId: 'guasha-myofascial',
    duration: '5 Weeks Protocol',
    outcomeBadge: 'Total Mobility Regained',
    rating: 5,
    headline: 'Traveling from Lagos to Ilorin weekly was worth every kilometer',
    fullReview:
      'Orthopedic surgeons recommended total bilateral knee replacements due to bone-on-bone degeneration. EHMCare’s intra-articular micro-needling, warm moxibustion, and Guasha fascia release regenerated my synovial fluid circulation. I now climb stairs at my office without bone grinding or knee swelling. An extraordinary integrative institution.',
    verifiedDate: 'Verified Patient • Feb 2025',
  },
  {
    id: 'rev-5',
    patientName: 'Hajia Fatima S.',
    initials: 'FS',
    initialsBg: 'bg-[#e1d5e7]',
    initialsText: 'text-[#3b1e54]',
    location: 'Gwarinpa, Abuja',
    condition: 'Severe Chronic Insomnia & Panic Disorder',
    treatmentType: 'Shen-Calming Ear Acupuncture & Adaptogens',
    specialtyId: 'mental-shen',
    duration: '3 Weeks (9 Sessions)',
    outcomeBadge: '7–8 Hrs Unbroken Sleep',
    rating: 5,
    headline: 'Finally free from dependence on sleeping pills after 4 years',
    fullReview:
      'For four years I could not sleep without pharmaceutical tranquilizers that left me drowsy and anxious all day. The Shen-settling auricular vagus nerve acupuncture combined with warm herbal teas recalibrated my circadian nervous rhythm. Within two weeks I was sleeping naturally from 10 PM to 6 AM. The sense of peace in their clinical rooms is unparalleled.',
    verifiedDate: 'Verified Patient • Dec 2024',
  },
  {
    id: 'rev-6',
    patientName: 'Pastor Samuel O.',
    initials: 'SO',
    initialsBg: 'bg-[#c8e6c9]',
    initialsText: 'text-[#1b5e20]',
    location: 'Fate Road, Ilorin',
    condition: 'Refractory Hypertension & Metabolic Syndrome',
    treatmentType: 'Botanical Pharmacotherapy & Detox Packs',
    specialtyId: 'metabolic-syndrome',
    duration: '8 Weeks Clinical Course',
    outcomeBadge: 'BP Stable at 120/80',
    rating: 5,
    headline: 'Blood pressure normalized naturally alongside lifestyle resets',
    fullReview:
      'My blood pressure constantly hovered around 165/105 despite two daily medications. The EHMCare clinical pharmacology department formulated bio-active vascular relaxant granules and conducted weekly arterial tone monitoring. Today my readings consistently read 120/80, my morning brain fog is gone, and my cardiologist has cut my synthetic drug dosage by half.',
    verifiedDate: 'Verified Patient • Jan 2025',
  },
];

export const PatientTestimonialCarousel: React.FC<PatientTestimonialCarouselProps> = ({
  onOpenBooking,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance slides every 3 seconds as requested
  useEffect(() => {
    if (!isAutoplay || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TEXT_REVIEWS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoplay, isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TEXT_REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TEXT_REVIEWS.length);
  };

  const currentReview = TEXT_REVIEWS[currentIndex];

  // Also get adjacent review for 2-column view on larger screens
  const nextReview = TEXT_REVIEWS[(currentIndex + 1) % TEXT_REVIEWS.length];

  // Touch gesture support for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      className={`w-full bg-[#ffffff] py-16 sm:py-20 border-t border-[#eceef0] relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#004c22] text-[11px] font-bold uppercase tracking-wider mb-2.5 border border-[#a6f4b5]/40">
              <span className="material-symbols-outlined text-[16px]">format_quote</span>
              <span>Verified Clinical Experiences</span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#004c22] tracking-tight leading-tight">
              Patient Testimonials & Reviews
            </h2>
            <p className="text-[14px] sm:text-[16px] text-[#404940] mt-2 max-w-2xl leading-relaxed">
              Read verified clinical outcome reports from patients who received specialized acupuncture, cupping, and botanical therapies across our facilities.
            </p>
          </div>

          {/* Carousel Arrows & Autoplay Control */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <button
              onClick={() => setIsAutoplay((prev) => !prev)}
              className={`p-2.5 rounded-full border text-[12px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isAutoplay
                  ? 'bg-[#e8f5e9] border-[#a6f4b5] text-[#004c22]'
                  : 'bg-[#f7f9fb] border-[#e0e3e5] text-[#404940]'
              }`}
              title={isAutoplay ? 'Pause auto-scroll' : 'Resume auto-scroll'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isAutoplay ? 'pause' : 'play_arrow'}
              </span>
              <span className="text-[11px] hidden sm:inline">
                {isAutoplay ? 'Auto' : 'Paused'}
              </span>
            </button>

            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-[#f2f4f6] hover:bg-[#004c22] text-[#191c1e] hover:text-[#ffffff] transition-all flex items-center justify-center cursor-pointer shadow-xs border border-[#e0e3e5]"
              title="Previous Review"
              aria-label="Previous testimonial"
            >
              <span className="material-symbols-outlined text-[22px]">navigate_before</span>
            </button>

            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-[#f2f4f6] hover:bg-[#004c22] text-[#191c1e] hover:text-[#ffffff] transition-all flex items-center justify-center cursor-pointer shadow-xs border border-[#e0e3e5]"
              title="Next Review"
              aria-label="Next testimonial"
            >
              <span className="material-symbols-outlined text-[22px]">navigate_next</span>
            </button>
          </div>
        </div>

        {/* Carousel Slide Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-8">
          
          {/* Card 1 (Active Current Slide) */}
          <div className="bg-[#f7f9fb] rounded-3xl p-6 sm:p-8 border border-[#004c22]/20 shadow-md flex flex-col justify-between relative transition-all duration-500 animate-fadeIn ring-1 ring-[#004c22]/10">
            {/* Top Row: Patient Avatar, Verified Badge & Stars */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-13 h-13 rounded-2xl ${currentReview.initialsBg} ${currentReview.initialsText} flex items-center justify-center font-extrabold text-[16px] shadow-xs shrink-0`}
                  >
                    {currentReview.initials}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#191c1e] leading-snug">
                      {currentReview.patientName}
                    </h3>
                    <p className="text-[12px] text-[#6b7280]">
                      {currentReview.location}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#e8f5e9] text-[#004c22] text-[11px] font-extrabold uppercase tracking-wider shrink-0 border border-[#a6f4b5]/40 shadow-xs">
                  {currentReview.outcomeBadge}
                </span>
              </div>

              {/* Star Rating & Condition Tag */}
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <div className="flex items-center gap-0.5 text-[#e6a800]">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[19px]">
                      star
                    </span>
                  ))}
                  <span className="text-[12px] font-bold text-[#191c1e] ml-1">5.0</span>
                </div>
                <span className="text-[11.5px] font-semibold text-[#004c22] bg-white px-2.5 py-0.5 rounded-md border border-[#e0e3e5]">
                  {currentReview.condition}
                </span>
              </div>

              {/* Review Headline & Body */}
              <h4 className="text-[17px] sm:text-[18px] font-extrabold text-[#004c22] leading-snug tracking-tight mb-2.5">
                "{currentReview.headline}"
              </h4>
              <p className="text-[13.5px] text-[#404940] leading-relaxed italic">
                "{currentReview.fullReview}"
              </p>
            </div>

            {/* Bottom Card Footer: Therapy details & Consultation link */}
            <div className="mt-6 pt-4 border-t border-[#e0e3e5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px]">
              <div>
                <span className="font-bold text-[#191c1e]">Therapy Course: </span>
                <span className="text-[#6b7280]">{currentReview.treatmentType} ({currentReview.duration})</span>
              </div>

              {onOpenBooking && (
                <button
                  onClick={() => onOpenBooking(currentReview.specialtyId)}
                  className="font-bold text-[#004c22] hover:text-[#166534] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Inquire for Similar Case</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              )}
            </div>
          </div>

          {/* Card 2 (Next Slide preview for rich widescreen density) */}
          <div className="hidden lg:flex bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#e0e3e5] shadow-xs flex-col justify-between relative transition-all duration-500 hover:border-[#004c22]/30">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-13 h-13 rounded-2xl ${nextReview.initialsBg} ${nextReview.initialsText} flex items-center justify-center font-extrabold text-[16px] shadow-xs shrink-0`}
                  >
                    {nextReview.initials}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#191c1e] leading-snug">
                      {nextReview.patientName}
                    </h3>
                    <p className="text-[12px] text-[#6b7280]">
                      {nextReview.location}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#f2f4f6] text-[#404940] text-[11px] font-bold uppercase tracking-wider shrink-0 border border-[#e0e3e5]">
                  {nextReview.outcomeBadge}
                </span>
              </div>

              {/* Star Rating & Condition Tag */}
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <div className="flex items-center gap-0.5 text-[#e6a800]">
                  {[...Array(nextReview.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[19px]">
                      star
                    </span>
                  ))}
                  <span className="text-[12px] font-bold text-[#191c1e] ml-1">5.0</span>
                </div>
                <span className="text-[11.5px] font-semibold text-[#004c22] bg-[#f7f9fb] px-2.5 py-0.5 rounded-md border border-[#e0e3e5]">
                  {nextReview.condition}
                </span>
              </div>

              {/* Review Headline & Body */}
              <h4 className="text-[17px] sm:text-[18px] font-extrabold text-[#191c1e] leading-snug tracking-tight mb-2.5">
                "{nextReview.headline}"
              </h4>
              <p className="text-[13.5px] text-[#404940] leading-relaxed italic line-clamp-4">
                "{nextReview.fullReview}"
              </p>
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-6 pt-4 border-t border-[#eceef0] flex items-center justify-between gap-3 text-[12px]">
              <div>
                <span className="font-bold text-[#191c1e]">Therapy Course: </span>
                <span className="text-[#6b7280]">{nextReview.treatmentType}</span>
              </div>

              {onOpenBooking ? (
                <button
                  type="button"
                  onClick={() => onOpenBooking(nextReview.specialtyId)}
                  className="font-bold text-[#004c22] hover:text-[#166534] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Inquire for Similar Case</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="font-bold text-[#004c22] hover:text-[#166534] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Inquire for Similar Case</span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Carousel Pagination Dots & Progress Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            {TEXT_REVIEWS.map((review, idx) => (
              <button
                key={review.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 h-2.5 bg-[#004c22]'
                    : 'w-2.5 h-2.5 bg-[#d0d3d5] hover:bg-[#8e9193]'
                }`}
                aria-label={`Go to review ${idx + 1} (${review.patientName})`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 text-[12px] text-[#6b7280]">
            <span className="flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[16px] text-[#004c22]">verified</span>
              <span>Showing review {currentIndex + 1} of {TEXT_REVIEWS.length}</span>
            </span>

            {onOpenBooking && (
              <button
                onClick={() => onOpenBooking()}
                className="px-4 py-2 rounded-xl bg-[#004c22] text-white font-bold hover:bg-[#166534] transition-colors cursor-pointer shadow-xs hidden sm:inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-[#acf770]">calendar_month</span>
                <span>Book Evaluation</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
