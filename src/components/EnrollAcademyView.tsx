import React, { useState, useEffect } from 'react';
import { IMAGES, CONTACT_INFO } from '../data/content.ts';
import { submitAcademyApplication } from '../utils/formSubmissionService.ts';

interface EnrollAcademyViewProps {
  initialProgram?: string;
  onNavigateToAcademy: () => void;
  onOpenBooking?: () => void;
}

interface ProgramDetails {
  id: string;
  name: string;
  duration: string;
  credential: string;
  badge: string;
  fullTuitionNgn: number;
  fullTuitionUsd: number;
  clinicalHours: number;
  description: string;
  highlights: string[];
  prerequisites: string;
  icon: string;
}

const ACADEMY_PROGRAMS: ProgramDetails[] = [
  {
    id: 'tcm',
    name: 'Diploma in Traditional Chinese Medicine & Clinical Acupuncture',
    duration: '12 Months',
    credential: 'Full Clinical Diploma',
    badge: 'Flagship Clinical Program',
    fullTuitionNgn: 450000,
    fullTuitionUsd: 550,
    clinicalHours: 200,
    description: 'Comprehensive didactic and bedside clinical mastery covering 361 acupuncture channels, neuro-acupuncture trigger techniques, pulse & tongue diagnostics, and stroke rehabilitation rotations.',
    highlights: [
      '361 Meridian Points & Extra Vessels',
      'Neuro-Acupuncture Stroke Rehabilitation Rotation',
      'Clinical Pulse & Tongue Diagnostic Mastery',
      '200 Bedside Clinical Internship Hours at Saboke Center',
      'Sterile Needling Kit & Acupuncture Model Included',
      'Qualifies for NMPR Accredited Clinical Practice'
    ],
    prerequisites: 'Minimum of SSCE/WASSCE with science subjects or prior healthcare background (Nursing, Medicine, Biology, Allied Health).',
    icon: 'vital_signs'
  },
  {
    id: 'cupping',
    name: 'Advanced Detoxification & Sterile Cupping Mastery',
    duration: '3 Months',
    credential: 'Professional Certificate',
    badge: 'High Clinical Demand',
    fullTuitionNgn: 180000,
    fullTuitionUsd: 220,
    clinicalHours: 60,
    description: 'Sterile dry, wet, and flash cupping masterclass adhering to biomedical safety protocols, blood-borne pathogen sanitation, musculoskeletal decompression, and metabolic lymphatic drainage.',
    highlights: [
      'Aseptic Blood-Borne Pathogen Control & Sterilization',
      'Wet Cupping Point Mapping for Chronic Pain',
      'Moving & Flash Cupping for Musculoskeletal Decompression',
      'Direct Hands-on Supervised Patient Sessions',
      'Professional Vacuum Cupping Apparatus Kit Provided',
      'Immediate Clinic Practice Capability'
    ],
    prerequisites: 'Open to healthcare workers, nurses, physiotherapists, wellness therapists, and committed beginners with basic biology knowledge.',
    icon: 'healing'
  },
  {
    id: 'phytotherapy',
    name: 'Phytotherapy & African Medicinal Herb Formulation',
    duration: '6 Months',
    credential: 'Professional Certification',
    badge: 'Botanical Research',
    fullTuitionNgn: 260000,
    fullTuitionUsd: 320,
    clinicalHours: 90,
    description: 'Modern botanical extraction sciences, indigenous African medicinal plant chemistry, synergy formulation, standardized tinctures/granules, and NAFDAC & GMP manufacturing compliance.',
    highlights: [
      'African Medicinal Flora Phytochemistry & Active Compounds',
      'Ethanolic & Aqueous Lab Extraction Methodologies',
      'Herbal Formulation Ratios & Herb-Drug Safety Index',
      'NAFDAC Regulatory Registration & GMP Protocols',
      'Laboratory Compounding Practicum Sessions',
      'Commercial Botanical Product Development Guide'
    ],
    prerequisites: 'Background in pharmacy, biochemistry, nursing, herbal practice, or completion of basic sciences recommended.',
    icon: 'compost'
  },
  {
    id: 'nutrition',
    name: 'Integrative Nutrition & Chronic Metabolic Health',
    duration: '4 Months',
    credential: 'Clinical Certificate',
    badge: 'Preventive Healthcare',
    fullTuitionNgn: 220000,
    fullTuitionUsd: 270,
    clinicalHours: 70,
    description: 'Preventative and restorative nutritional protocols for type 2 diabetes reversal, hypertension management, gut microbiome reconstruction, and metabolic longevity.',
    highlights: [
      'Glycemic Index & Insulin Resistance Reversal Protocols',
      'Endothelial Cardiovascular Diet Interventions',
      'Microbiome, Leaky Gut & Food Sensitivity Analysis',
      'Customized Patient Meal Plan Formulation',
      'Functional Biochemical Lab Test Interpretation',
      'Community Health Education Strategies'
    ],
    prerequisites: 'Open to dietitians, nurses, wellness coaches, healthcare assistants, and health advocates.',
    icon: 'nutrition'
  }
];

export const EnrollAcademyView: React.FC<EnrollAcademyViewProps> = ({
  initialProgram,
  onNavigateToAcademy,
  onOpenBooking
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedProgramId, setSelectedProgramId] = useState<string>(initialProgram || 'tcm');
  const [selectedCampus, setSelectedCampus] = useState<'ilorin' | 'abuja' | 'hybrid'>('ilorin');
  const [selectedCohort, setSelectedCohort] = useState<string>('November 2025 (Immediate Intake)');
  
  // Personal Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [stateOfResidence, setStateOfResidence] = useState('Kwara State');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Academic Background
  const [educationLevel, setEducationLevel] = useState('Registered Nurse (RN / RM)');
  const [experienceYears, setExperienceYears] = useState('1 - 3 Years in Healthcare');
  const [institutionName, setInstitutionName] = useState('');
  const [statement, setStatement] = useState('');
  const [needAccommodation, setNeedAccommodation] = useState(false);

  // Financial Plan
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'milestone' | 'monthly'>('milestone');
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');

  // Active FAQ
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Program synchronization if initialProgram changes
  useEffect(() => {
    if (initialProgram) {
      const match = ACADEMY_PROGRAMS.find(p => p.id === initialProgram);
      if (match) {
        setSelectedProgramId(match.id);
      }
    }
  }, [initialProgram]);

  const activeProgram = ACADEMY_PROGRAMS.find(p => p.id === selectedProgramId) || ACADEMY_PROGRAMS[0];

  // Pricing calculations
  const baseTuitionNgn = activeProgram.fullTuitionNgn;
  const fullDiscountPct = 10;
  const fullPaymentDiscount = Math.round(baseTuitionNgn * (fullDiscountPct / 100));
  const fullAdvancePriceNgn = baseTuitionNgn - fullPaymentDiscount;

  // Milestone breakdown
  const milestone1 = Math.round(baseTuitionNgn * 0.40); // 40%
  const milestone2 = Math.round(baseTuitionNgn * 0.30); // 30%
  const milestone3 = Math.round(baseTuitionNgn * 0.30); // 30%

  // Monthly breakdown
  const programMonths = parseInt(activeProgram.duration) || 6;
  const monthlyAmount = Math.round(baseTuitionNgn / programMonths);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } else {
      handleSubmitApplication();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    const ref = `EHM-ADM-2025-${Math.floor(10000 + Math.random() * 90000)}`;
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    await submitAcademyApplication({
      applicationRef: ref,
      firstName,
      lastName,
      email,
      phone,
      program: selectedProgramId,
      programName: activeProgram.name,
      campus: selectedCampus,
      background: statement,
      educationLevel,
      paymentPlan,
      stateOfResidence,
      emergencyName,
      emergencyPhone,
      accommodationNeeded: needAccommodation,
    });

    setApplicationRef(ref);
    setSubmissionDate(dateStr);
    setIsSubmitting(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };

  const handlePrintAdmission = () => {
    window.print();
  };

  const handleDownloadProspectus = () => {
    const content = `EHMCare Academy of Holistic & Traditional Medicine
OFFICIAL ADMISSIONS PROSPECTUS & ENROLLMENT COMPENDIUM 2025/2026
Accreditation Alignment: NMPR & National Complementary Medicine Framework
Campus Head: 7 Sofoluwe Street, Saboke, Ilorin, Kwara State | Abuja Center: Maitama District

Program: ${activeProgram.name}
Duration: ${activeProgram.duration} (${activeProgram.credential})
Clinical Internship: ${activeProgram.clinicalHours} Hours at Saboke Clinical Center
Tuition (Standard): ₦${activeProgram.fullTuitionNgn.toLocaleString()} ($${activeProgram.fullTuitionUsd})

CORE MODULES & CLINICAL OBJECTIVES:
${activeProgram.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

TUITION PAYMENT OPTIONS:
- Advance Settlement (10% Waiver): ₦${fullAdvancePriceNgn.toLocaleString()}
- Milestone Installments: 40% on acceptance (₦${milestone1.toLocaleString()}), 30% mid-semester (₦${milestone2.toLocaleString()}), 30% pre-rotation (₦${milestone3.toLocaleString()})

ADMISSIONS HOTLINES:
Tel: +234 901 518 4004 | +234 905 975 8574
Email: admissions@ehmcare.com | registrar@ehmcare.com
Website: https://ehmcare.com/academy`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EHMCare-Academy-Prospectus-${activeProgram.id.toUpperCase()}-2025.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const whatsAppDirectUrl = `https://wa.me/2349059758574?text=${encodeURIComponent(
    `Hello EHMCare Academy Registrar, I have submitted my application for ${activeProgram.name}.\n\nReference: ${applicationRef || 'NEW-APPLICANT'}\nCandidate: ${firstName} ${lastName}\nCampus: ${selectedCampus.toUpperCase()}\nCohort: ${selectedCohort}\n\nPlease confirm receipt of my enrollment dossier.`
  )}`;

  const faqs = [
    {
      q: 'Can students without a background in conventional medicine enroll?',
      a: 'Yes! While conventional nurses, doctors, and physiotherapists receive accelerated credit for pre-clinical anatomy, aspiring healers and science secondary school graduates with a passion for holistic health are warmly accommodated through our foundational didactic term.'
    },
    {
      q: 'How are clinical bedside rotations scheduled for out-of-state students?',
      a: 'Students outside Kwara State (e.g. from Lagos, Abuja, Port Harcourt, Kano, and international candidates) complete their theoretical and didactic coursework online via our LMS portal, followed by an intensive 2 to 4-week hands-on clinical residency at our Saboke Center in Ilorin.'
    },
    {
      q: 'Are the tuition payment plans strictly interest-free?',
      a: 'Yes, 100% interest-free. EHMCare Academy is an educational institution dedicated to empowering healthcare practitioners. Both the 3-Stage Milestone Plan and monthly installment schedules are calculated at zero percent surcharge.'
    },
    {
      q: 'What certifications and practice credentials are awarded upon completion?',
      a: 'Graduates receive the officially authenticated EHMCare Academy Diploma or Certificate of Mastery, stamped in alignment with the National Medicine Policy and Regulatory advisory guidelines (NMPR), permitting lawful institutional integration within traditional and complementary medical facilities.'
    },
    {
      q: 'What equipment and clinical tools are included with tuition?',
      a: 'Depending on your program, tuition includes sterile acupuncture needling starter packs, professional cupping decompression sets, botanical laboratory formulary access, official EHMCare clinical scrubs/white coat, and perpetual access to our online Student LMS Portal video archive.'
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#f7f9fb] min-h-screen">
      {/* 1. Admissions Announcement Bar */}
      <section className="w-full bg-[#004c22] text-[#ffffff] px-4 py-2.5 border-b border-[#166534]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[12px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#acf770] animate-pulse"></span>
            <span className="font-bold uppercase tracking-wider text-[#acf770]">
              Admissions Active 2025/2026:
            </span>
            <span className="text-[#ffffff]/90">
              Seat reservations open for Saboke Campus (Ilorin), Abuja Center & Hybrid Clinical cohorts.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <span className="hidden sm:inline-flex items-center gap-1 text-[#93e0a2]">
              <span className="material-symbols-outlined text-[14px]">support_agent</span>
              <span>Registrar Desk: +234 901 518 4004</span>
            </span>
            <button
              onClick={handleDownloadProspectus}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#166534] text-[#ffffff] hover:bg-[#256c39] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">download</span>
              <span>Download Prospectus</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Breadcrumb Navigation & Top Orientation */}
      <div className="w-full bg-[#ffffff] border-b border-[#eceef0] px-4 lg:px-10 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-2 text-[12px] text-[#404940]">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#004c22] font-semibold cursor-pointer"
            >
              Home
            </button>
            <span className="material-symbols-outlined text-[14px] text-[#717a70]">chevron_right</span>
            <button
              onClick={onNavigateToAcademy}
              className="hover:text-[#004c22] font-semibold cursor-pointer"
            >
              EHMCare Academy
            </button>
            <span className="material-symbols-outlined text-[14px] text-[#717a70]">chevron_right</span>
            <span className="text-[#004c22] font-bold">Admissions & Student Enrollment Portal</span>
          </nav>

          <button
            onClick={onNavigateToAcademy}
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#004c22] hover:text-[#166534] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>View All Academy Courses & Faculty</span>
          </button>
        </div>
      </div>

      {/* 3. Hero Header Section */}
      <section className="relative w-full bg-gradient-to-b from-[#f2f4f6] via-[#f7f9fb] to-[#ffffff] px-4 lg:px-10 pt-8 pb-12 overflow-hidden border-b border-[#eceef0]">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-[#91da57]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-28 w-80 h-80 bg-[#a6f4b5]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#166534] text-[#ffffff] text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <span className="material-symbols-outlined text-[14px] text-[#acf770]">school</span>
              <span>Official Admissions Portal</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff] text-[#004c22] text-[11px] font-bold border border-[#eceef0] shadow-xs">
              <span className="material-symbols-outlined text-[14px] text-[#004c22]">verified</span>
              <span>NMPR Accredited Clinical Curriculum</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#acf770]/20 text-[#255200] text-[11px] font-bold border border-[#acf770]/30">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>Cohort 2025/2026 Intake Rolling</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] text-[#004c22] font-extrabold leading-[1.12] tracking-tight">
                Enroll in EHMCare Academy
              </h1>
              <p className="text-[17px] sm:text-[19px] text-[#404940] leading-relaxed max-w-3xl">
                Complete your formal application for clinical diplomas and professional certificates in Traditional Chinese Medicine, Acupuncture, Sterile Cupping, and Botanical Phytotherapy.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 p-5 rounded-2xl bg-[#ffffff] border border-[#eceef0] shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#004c22] text-[#acf770] flex items-center justify-center font-extrabold text-[20px] shrink-0">
                  <span className="material-symbols-outlined text-[26px]">assignment_turned_in</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#191c1e] leading-tight">Instant Application Processing</h3>
                  <p className="text-[12px] text-[#404940]">Takes ~4 minutes. Provisional acceptance issued immediately.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#eceef0] text-[11px]">
                <div className="p-2 rounded-lg bg-[#f2f4f6]">
                  <span className="text-[#717a70] block">Didactic Sessions</span>
                  <span className="font-bold text-[#004c22]">Saboke / Online</span>
                </div>
                <div className="p-2 rounded-lg bg-[#f2f4f6]">
                  <span className="text-[#717a70] block">Bedside Rotations</span>
                  <span className="font-bold text-[#004c22]">100% Supervised</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eceef0] shadow-xs flex flex-col">
              <span className="text-[26px] font-extrabold text-[#004c22]">120+</span>
              <span className="text-[11px] font-bold text-[#404940] uppercase tracking-wider">Active Scholars</span>
              <span className="text-[12px] text-[#356b00]">Nurses, Doctors & Healers</span>
            </div>
            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eceef0] shadow-xs flex flex-col">
              <span className="text-[26px] font-extrabold text-[#004c22]">200 Hrs</span>
              <span className="text-[11px] font-bold text-[#404940] uppercase tracking-wider">Hospital Rotations</span>
              <span className="text-[12px] text-[#404940]">Direct Stroke & Pain Cases</span>
            </div>
            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eceef0] shadow-xs flex flex-col">
              <span className="text-[26px] font-extrabold text-[#004c22]">100%</span>
              <span className="text-[11px] font-bold text-[#404940] uppercase tracking-wider">Sterile Practical Kits</span>
              <span className="text-[12px] text-[#356b00]">Provided to Each Candidate</span>
            </div>
            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eceef0] shadow-xs flex flex-col">
              <span className="text-[26px] font-extrabold text-[#004c22]">₦0</span>
              <span className="text-[11px] font-bold text-[#404940] uppercase tracking-wider">Interest on Plans</span>
              <span className="text-[12px] text-[#404940]">Flexible 3-Stage Milestones</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Main Application Form & Dynamic Enrollment Engine */}
      <section className="w-full py-10 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {!isSubmitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Multi-Step Interactive Form */}
              <div className="lg:col-span-8 bg-[#ffffff] rounded-2xl p-6 sm:p-8 shadow-md border border-[#eceef0]">
                {/* Stepper Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3 text-[11px] sm:text-[12px] font-bold text-[#404940] gap-1">
                    <span className={currentStep >= 1 ? 'text-[#004c22]' : ''}>
                      1. <span className="hidden sm:inline">Program & Campus</span><span className="sm:hidden">Program</span>
                    </span>
                    <span className={currentStep >= 2 ? 'text-[#004c22]' : ''}>
                      2. <span className="hidden sm:inline">Personal Info</span><span className="sm:hidden">Personal</span>
                    </span>
                    <span className={currentStep >= 3 ? 'text-[#004c22]' : ''}>
                      3. <span className="hidden sm:inline">Background</span><span className="sm:hidden">History</span>
                    </span>
                    <span className={currentStep >= 4 ? 'text-[#004c22]' : ''}>
                      4. <span className="hidden sm:inline">Tuition Plan</span><span className="sm:hidden">Tuition</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#eceef0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#004c22] transition-all duration-300"
                      style={{ width: `${(currentStep / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleNextStep}>
                  {/* STEP 1: Program & Campus */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-b border-[#eceef0] pb-3">
                        <h2 className="text-[22px] font-bold text-[#004c22]">
                          Step 1: Select Your Medical Program & Study Format
                        </h2>
                        <p className="text-[13px] text-[#404940]">
                          Choose the accredited specialization you wish to pursue and your preferred clinical rotation location.
                        </p>
                      </div>

                      {/* Program Selection Cards */}
                      <div className="space-y-3">
                        <label className="text-[13px] font-bold text-[#191c1e] block">
                          Select Diploma / Certification Program *
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {ACADEMY_PROGRAMS.map((prog) => {
                            const isSelected = selectedProgramId === prog.id;
                            return (
                              <div
                                key={prog.id}
                                onClick={() => setSelectedProgramId(prog.id)}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  isSelected
                                    ? 'border-[#004c22] bg-[#f2f7f4] shadow-sm'
                                    : 'border-[#eceef0] bg-[#ffffff] hover:border-[#bfc9bd]'
                                }`}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                  <div className="flex items-start gap-3">
                                    <div
                                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                        isSelected
                                          ? 'bg-[#004c22] text-[#acf770]'
                                          : 'bg-[#f2f4f6] text-[#404940]'
                                      }`}
                                    >
                                      <span className="material-symbols-outlined text-[22px]">
                                        {prog.icon}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-[16px] font-bold text-[#191c1e] leading-snug">
                                          {prog.name}
                                        </h3>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#166534] text-[#ffffff]">
                                          {prog.badge}
                                        </span>
                                      </div>
                                      <p className="text-[12.5px] text-[#404940] mt-1 leading-relaxed">
                                        {prog.description}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0">
                                    <span className="text-[18px] font-extrabold text-[#004c22] block">
                                      ₦{prog.fullTuitionNgn.toLocaleString()}
                                    </span>
                                    <span className="text-[11px] text-[#717a70] block">
                                      {prog.duration} • {prog.clinicalHours} Clin. Hrs
                                    </span>
                                  </div>
                                </div>

                                {/* Key Highlights */}
                                <div className="mt-3 pt-3 border-t border-[#e2e8e5] grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11.5px] text-[#404940]">
                                  {prog.highlights.slice(0, 4).map((h, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                      <span className="material-symbols-outlined text-[#004c22] text-[14px]">
                                        check_circle
                                      </span>
                                      <span>{h}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Campus & Cohort Selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">
                            Preferred Campus Center *
                          </label>
                          <select
                            value={selectedCampus}
                            onChange={(e) => setSelectedCampus(e.target.value as any)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          >
                            <option value="ilorin">Ilorin Center (Saboke Campus, Kwara State)</option>
                            <option value="abuja">Abuja Center (Maitama District, FCT)</option>
                            <option value="hybrid">Hybrid (Online Didactic + Clinical Block at Saboke)</option>
                          </select>
                          <span className="text-[11px] text-[#717a70]">
                            Saboke center provides complete bedside access for chronic stroke & acupuncture rounds.
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">
                            Intake Cohort *
                          </label>
                          <select
                            value={selectedCohort}
                            onChange={(e) => setSelectedCohort(e.target.value)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          >
                            <option value="November 2025 (Immediate Intake)">November 2025 (Immediate Intake - Seats Available)</option>
                            <option value="January 2026 (Winter Cohort)">January 2026 (Winter Intake)</option>
                            <option value="April 2026 (Spring Cohort)">April 2026 (Spring Intake)</option>
                          </select>
                          <span className="text-[11px] text-[#717a70]">
                            Early enrollments receive orientation packs and prep reading materials.
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-lg bg-[#004c22] text-[#ffffff] font-bold text-[14px] hover:bg-[#166534] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>Proceed to Candidate Details</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Personal Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-b border-[#eceef0] pb-3">
                        <h2 className="text-[22px] font-bold text-[#004c22]">
                          Step 2: Candidate Bio-Data & Contact Information
                        </h2>
                        <p className="text-[13px] text-[#404940]">
                          Enter your legal name as it should appear on your matriculation index and academic certificate.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">First Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Samuel"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">Last Name (Surname) *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Adeyemi"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="candidate@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          />
                          <span className="text-[11px] text-[#717a70]">
                            Your LMS credentials and provisional admission letter will be sent here.
                          </span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">WhatsApp / Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="0901 518 4004 or +234 802 627 5433"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          />
                          <span className="text-[11px] text-[#717a70]">
                            Direct WhatsApp connection used for registrar orientation call.
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">Date of Birth *</label>
                          <input
                            type="date"
                            required
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">Gender *</label>
                          <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">State / Location *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Kwara State, Lagos, Abuja"
                            value={stateOfResidence}
                            onChange={(e) => setStateOfResidence(e.target.value)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#f2f4f6] border border-[#eceef0] space-y-3">
                        <span className="text-[13px] font-bold text-[#004c22] block">
                          Next of Kin / Emergency Contact
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Full Name of Contact"
                            value={emergencyName}
                            onChange={(e) => setEmergencyName(e.target.value)}
                            className="h-10 px-3 rounded-lg bg-[#ffffff] text-[#191c1e] text-[12.5px] border border-[#bfc9bd] focus:outline-none"
                          />
                          <input
                            type="tel"
                            placeholder="Contact Phone Number"
                            value={emergencyPhone}
                            onChange={(e) => setEmergencyPhone(e.target.value)}
                            className="h-10 px-3 rounded-lg bg-[#ffffff] text-[#191c1e] text-[12.5px] border border-[#bfc9bd] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-5 py-2.5 rounded-lg bg-[#f2f4f6] text-[#404940] font-bold text-[13px] hover:bg-[#e0e3e5] transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-lg bg-[#004c22] text-[#ffffff] font-bold text-[14px] hover:bg-[#166534] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>Proceed to Background</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Educational Background & Experience */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-b border-[#eceef0] pb-3">
                        <h2 className="text-[22px] font-bold text-[#004c22]">
                          Step 3: Healthcare Background & Professional Profile
                        </h2>
                        <p className="text-[13px] text-[#404940]">
                          EHMCare accepts both experienced clinicians and ambitious new scholars. Tell us about your background.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">
                            Highest Prior Qualification *
                          </label>
                          <select
                            value={educationLevel}
                            onChange={(e) => setEducationLevel(e.target.value)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          >
                            <option value="Registered Nurse (RN / RM)">Registered Nurse (RN / RM)</option>
                            <option value="Medical Doctor (MB;BS / MD)">Medical Doctor (MB;BS / MD)</option>
                            <option value="Pharmacist (B.Pharm / Pharm.D)">Pharmacist (B.Pharm / Pharm.D)</option>
                            <option value="Physiotherapist (B.MR / DPT)">Physiotherapist (B.MR / DPT)</option>
                            <option value="B.Sc Biology / Biochemistry / Science">B.Sc Biology / Biochemistry / Science</option>
                            <option value="High School / SSCE / WASSCE Graduate">High School / SSCE / WASSCE Graduate</option>
                            <option value="Traditional Herbal Practitioner">Traditional Herbal Practitioner</option>
                            <option value="Other Allied Health / Alternative Healer">Other Allied Health / Alternative Healer</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[12.5px] font-bold text-[#191c1e]">
                            Clinical / Healthcare Experience *
                          </label>
                          <select
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(e.target.value)}
                            className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                          >
                            <option value="Entry Level / New Scholar (0-1 yr)">Entry Level / New Scholar (0-1 yr)</option>
                            <option value="1 - 3 Years in Healthcare">1 - 3 Years in Healthcare</option>
                            <option value="3 - 7 Years in Practice">3 - 7 Years in Practice</option>
                            <option value="8+ Years Senior Clinical Experience">8+ Years Senior Clinical Experience</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[12.5px] font-bold text-[#191c1e]">
                          Current Healthcare Facility / Institution (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. University of Ilorin Teaching Hospital, Private Clinic, or Self-employed"
                          value={institutionName}
                          onChange={(e) => setInstitutionName(e.target.value)}
                          className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[12.5px] font-bold text-[#191c1e]">
                          Brief Statement of Purpose / Clinical Motivation
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Why do you wish to study at EHMCare Academy? How do you intend to use this credential to serve patients in your community?"
                          value={statement}
                          onChange={(e) => setStatement(e.target.value)}
                          className="p-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                        ></textarea>
                      </div>

                      {/* Accommodation Assistance Toggle */}
                      <div className="p-4 rounded-xl bg-[#f2f4f6] border border-[#eceef0] flex items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-[#004c22] text-[22px] mt-0.5">
                            hotel
                          </span>
                          <div>
                            <span className="text-[13px] font-bold text-[#191c1e] block">
                              Do you require out-of-state student residence assistance?
                            </span>
                            <span className="text-[11.5px] text-[#404940] block">
                              Our Student Affairs office arranges verified, safe private student lodges near the Ilorin Saboke Center.
                            </span>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            type="checkbox"
                            checked={needAccommodation}
                            onChange={(e) => setNeedAccommodation(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[#bfc9bd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004c22]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-5 py-2.5 rounded-lg bg-[#f2f4f6] text-[#404940] font-bold text-[13px] hover:bg-[#e0e3e5] transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-lg bg-[#004c22] text-[#ffffff] font-bold text-[14px] hover:bg-[#166534] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>Proceed to Tuition Plan</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Tuition Payment Structure & Review */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-b border-[#eceef0] pb-3">
                        <h2 className="text-[22px] font-bold text-[#004c22]">
                          Step 4: Tuition Payment Structure & Final Submission
                        </h2>
                        <p className="text-[13px] text-[#404940]">
                          Choose how you prefer to handle your tuition settlement. All milestone plans are 100% interest-free.
                        </p>
                      </div>

                      {/* Payment Plan Options */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Option 1: Full Advance */}
                        <div
                          onClick={() => setPaymentPlan('full')}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            paymentPlan === 'full'
                              ? 'border-[#004c22] bg-[#f2f7f4] shadow-sm'
                              : 'border-[#eceef0] bg-[#ffffff] hover:border-[#bfc9bd]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#acf770] text-[#0c2000]">
                                Save 10%
                              </span>
                              <span className="material-symbols-outlined text-[#004c22] text-[18px]">
                                {paymentPlan === 'full' ? 'radio_button_checked' : 'radio_button_unchecked'}
                              </span>
                            </div>
                            <h4 className="text-[15px] font-bold text-[#191c1e]">Advance Settlement</h4>
                            <p className="text-[11.5px] text-[#404940] mt-1">
                              Pay once upon provisional admission approval with a 10% fee discount.
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-[#e2e8e5]">
                            <span className="text-[20px] font-extrabold text-[#004c22] block">
                              ₦{fullAdvancePriceNgn.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-[#717a70] line-through block">
                              ₦{baseTuitionNgn.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Option 2: 3-Stage Milestone */}
                        <div
                          onClick={() => setPaymentPlan('milestone')}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            paymentPlan === 'milestone'
                              ? 'border-[#004c22] bg-[#f2f7f4] shadow-sm'
                              : 'border-[#eceef0] bg-[#ffffff] hover:border-[#bfc9bd]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#166534] text-[#ffffff]">
                                Recommended
                              </span>
                              <span className="material-symbols-outlined text-[#004c22] text-[18px]">
                                {paymentPlan === 'milestone' ? 'radio_button_checked' : 'radio_button_unchecked'}
                              </span>
                            </div>
                            <h4 className="text-[15px] font-bold text-[#191c1e]">3-Stage Milestone Plan</h4>
                            <p className="text-[11.5px] text-[#404940] mt-1">
                              40% Initial Deposit + 30% Mid-Semester + 30% Pre-Hospital Clinical Rotation.
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-[#e2e8e5]">
                            <span className="text-[20px] font-extrabold text-[#004c22] block">
                              ₦{milestone1.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-[#717a70] block">
                              Initial Deposit (Total: ₦{baseTuitionNgn.toLocaleString()})
                            </span>
                          </div>
                        </div>

                        {/* Option 3: Monthly Installments */}
                        <div
                          onClick={() => setPaymentPlan('monthly')}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            paymentPlan === 'monthly'
                              ? 'border-[#004c22] bg-[#f2f7f4] shadow-sm'
                              : 'border-[#eceef0] bg-[#ffffff] hover:border-[#bfc9bd]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#f2f4f6] text-[#404940]">
                                Low Monthly
                              </span>
                              <span className="material-symbols-outlined text-[#004c22] text-[18px]">
                                {paymentPlan === 'monthly' ? 'radio_button_checked' : 'radio_button_unchecked'}
                              </span>
                            </div>
                            <h4 className="text-[15px] font-bold text-[#191c1e]">Monthly Cadence</h4>
                            <p className="text-[11.5px] text-[#404940] mt-1">
                              Even monthly distributions throughout your course duration.
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-[#e2e8e5]">
                            <span className="text-[20px] font-extrabold text-[#004c22] block">
                              ₦{monthlyAmount.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-[#717a70] block">
                              Per Month x {programMonths} Mos
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Financial Summary Box */}
                      <div className="p-4 rounded-xl bg-[#f2f4f6] border border-[#eceef0] space-y-2 text-[12.5px]">
                        <div className="flex justify-between text-[#404940]">
                          <span>Selected Program:</span>
                          <span className="font-bold text-[#191c1e] text-right">{activeProgram.name}</span>
                        </div>
                        <div className="flex justify-between text-[#404940]">
                          <span>Standard Tuition:</span>
                          <span>₦{baseTuitionNgn.toLocaleString()} (~${activeProgram.fullTuitionUsd})</span>
                        </div>
                        {paymentPlan === 'full' && (
                          <div className="flex justify-between text-[#356b00] font-semibold">
                            <span>Advance Payment Discount (10%):</span>
                            <span>-₦{fullPaymentDiscount.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-[#404940]">
                          <span>Clinical Bedside Kits & Scrub:</span>
                          <span className="text-[#356b00] font-bold">Included Free</span>
                        </div>
                        <div className="pt-2 border-t border-[#e0e3e5] flex justify-between text-[14px] font-bold text-[#004c22]">
                          <span>Due for Acceptance Confirmation:</span>
                          <span>
                            {paymentPlan === 'full'
                              ? `₦${fullAdvancePriceNgn.toLocaleString()}`
                              : paymentPlan === 'milestone'
                              ? `₦${milestone1.toLocaleString()}`
                              : `₦${monthlyAmount.toLocaleString()}`}
                          </span>
                        </div>
                      </div>

                      {/* Code of Ethics & Certification Checkbox */}
                      <div className="flex items-start gap-3 pt-2">
                        <input
                          id="terms_cert"
                          type="checkbox"
                          required
                          checked={agreedTerms}
                          onChange={(e) => setAgreedTerms(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[#004c22] focus:ring-[#004c22]"
                        />
                        <label htmlFor="terms_cert" className="text-[12px] text-[#404940] leading-relaxed">
                          I certify that all statements submitted are true and correct. I pledge to adhere to EHMCare Academy’s Clinical Honor Code, patient privacy standards (NDPR), and traditional medicine ethical canons.
                        </label>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-5 py-2.5 rounded-lg bg-[#f2f4f6] text-[#404940] font-bold text-[13px] hover:bg-[#e0e3e5] transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={!agreedTerms || isSubmitting}
                          className={`px-8 py-3.5 rounded-lg font-bold text-[14px] transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                            agreedTerms && !isSubmitting
                              ? 'bg-[#004c22] text-[#ffffff] hover:bg-[#166534]'
                              : 'bg-[#bfc9bd] text-[#ffffff] cursor-not-allowed'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="material-symbols-outlined animate-spin text-[20px]">
                                autorenew
                              </span>
                              <span>Generating Provisional Dossier...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Formal Enrollment</span>
                              <span className="material-symbols-outlined text-[18px]">verified</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Right Column: Live Summary Card & Institutional Reassurances */}
              <div className="lg:col-span-4 space-y-4">
                {/* Active Program Card */}
                <div className="bg-[#ffffff] rounded-2xl p-5 shadow-sm border border-[#eceef0]">
                  <div className="flex items-center gap-2 text-[#004c22] mb-2 font-bold text-[12px] uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>Application Overview</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#191c1e] leading-snug">
                    {activeProgram.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[12px] text-[#717a70] mt-1 mb-3">
                    <span>{activeProgram.duration}</span>
                    <span>•</span>
                    <span>{activeProgram.credential}</span>
                    <span>•</span>
                    <span className="text-[#356b00] font-bold">{selectedCampus.toUpperCase()}</span>
                  </div>

                  <div className="space-y-2 text-[12px] text-[#404940] pb-3 border-b border-[#eceef0]">
                    <div className="flex justify-between">
                      <span className="text-[#717a70]">Cohort Intake:</span>
                      <span className="font-semibold text-[#191c1e]">{selectedCohort}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#717a70]">Pre-Clinical Hours:</span>
                      <span className="font-semibold text-[#191c1e]">Didactic Modules I-IV</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#717a70]">Clinical Bedside:</span>
                      <span className="font-semibold text-[#191c1e]">{activeProgram.clinicalHours} Hours at Saboke</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#717a70]">Credential Issued:</span>
                      <span className="font-semibold text-[#004c22]">NMPR Aligned Certificate</span>
                    </div>
                  </div>

                  {/* Registrar Direct Access */}
                  <div className="pt-3 space-y-2">
                    <span className="text-[11px] font-bold text-[#717a70] uppercase tracking-wider block">
                      Direct Admissions Advisory:
                    </span>
                    <a
                      href={CONTACT_INFO.callHref}
                      className="flex items-center gap-2 text-[12.5px] font-bold text-[#004c22] hover:underline"
                    >
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span>Call Registrar: +234 901 518 4004</span>
                    </a>
                    <a
                      href={CONTACT_INFO.whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[12.5px] font-bold text-[#166534] hover:underline"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      <span>WhatsApp Desk: +234 905 975 8574</span>
                    </a>
                  </div>
                </div>

                {/* What Every Enrolled Scholar Receives */}
                <div className="bg-[#f2f4f6] rounded-2xl p-5 border border-[#eceef0] space-y-3">
                  <h4 className="text-[14px] font-bold text-[#004c22] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    <span>Included in Your Enrollment:</span>
                  </h4>
                  <ul className="space-y-2 text-[12px] text-[#404940]">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#004c22] text-[15px] shrink-0 mt-0.5">check</span>
                      <span>Complete access to the online Student LMS portal with lecture recordings.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#004c22] text-[15px] shrink-0 mt-0.5">check</span>
                      <span>Sterile Clinical Starter Pack (Acupuncture needles, alcohol pads, vacuum cupping kit).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#004c22] text-[15px] shrink-0 mt-0.5">check</span>
                      <span>Official EHMCare Clinical White Coat & Student Badge.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#004c22] text-[15px] shrink-0 mt-0.5">check</span>
                      <span>Guaranteed direct bedside observation during real patient rounds.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            /* 5. SUCCESS CONFIRMATION DASHBOARD & PROVISIONAL ADMISSION LETTER */
            <div className="max-w-4xl mx-auto bg-[#ffffff] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#eceef0] animate-fadeIn">
              {/* Header Badge */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#eceef0]">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#acf770] text-[#004c22] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[34px]">verified</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#166534] block">
                      Application Logged & Confirmed
                    </span>
                    <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#004c22] leading-tight">
                      Provisional Letter of Admission
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintAdmission}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#f2f4f6] text-[#004c22] text-[12px] font-bold hover:bg-[#e0e3e5] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>Print Dossier</span>
                  </button>
                  <a
                    href={whatsAppDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366] text-[#ffffff] text-[12px] font-bold hover:bg-[#20ba59] transition-colors shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Forward to Registrar</span>
                  </a>
                </div>
              </div>

              {/* Formal Admission Document Canvas */}
              <div className="my-6 p-6 sm:p-8 rounded-2xl bg-[#fcfdfd] border border-[#eceef0] space-y-6 text-[#191c1e]">
                {/* Official Letterhead */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4 border-b border-[#eceef0]">
                  <div className="flex items-center gap-3">
                    <img
                      alt="EHMCare Logo"
                      className="h-10 w-auto object-contain"
                      src={IMAGES.logo}
                    />
                    <div>
                      <h3 className="font-extrabold text-[16px] text-[#004c22]">
                        EHMCare Academy of Holistic & Traditional Medicine
                      </h3>
                      <p className="text-[11px] text-[#717a70]">
                        Office of Academic Registrar & Admissions • Kwara State, Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right text-[12px]">
                    <span className="text-[#717a70] block">Reference Number:</span>
                    <span className="font-mono font-extrabold text-[#004c22] text-[14px]">
                      {applicationRef}
                    </span>
                    <span className="text-[#717a70] text-[11px] block mt-0.5">Date: {submissionDate}</span>
                  </div>
                </div>

                {/* Candidate Greetings & Decision */}
                <div className="space-y-3 text-[14px] leading-relaxed text-[#404940]">
                  <p>
                    Dear <strong className="text-[#191c1e]">{firstName} {lastName}</strong>,
                  </p>
                  <p>
                    The Admissions Committee of EHMCare Academy is pleased to notify you of your provisional acceptance into the{' '}
                    <strong className="text-[#004c22]">{activeProgram.name}</strong> for the{' '}
                    <strong className="text-[#191c1e]">{selectedCohort}</strong> intake at the{' '}
                    <strong className="text-[#191c1e]">{selectedCampus.toUpperCase()} Campus</strong>.
                  </p>
                  <p>
                    This provisional admission is granted based on your submitted qualifications ({educationLevel}) and your dedication to advancing traditional Chinese medicine, sterile acupuncture, and botanical science in Africa.
                  </p>
                </div>

                {/* Key Admission Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-[#ffffff] border border-[#eceef0] text-[12px]">
                  <div>
                    <span className="text-[#717a70] block">Program Duration</span>
                    <span className="font-bold text-[#191c1e]">{activeProgram.duration}</span>
                  </div>
                  <div>
                    <span className="text-[#717a70] block">Clinical Internship</span>
                    <span className="font-bold text-[#191c1e]">{activeProgram.clinicalHours} Hours Bedside</span>
                  </div>
                  <div>
                    <span className="text-[#717a70] block">Payment Plan</span>
                    <span className="font-bold text-[#004c22]">
                      {paymentPlan === 'full' ? 'Advance (10% Off)' : paymentPlan === 'milestone' ? '3-Stage Milestone' : 'Monthly'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#717a70] block">Immediate Deposit</span>
                    <span className="font-bold text-[#004c22]">
                      {paymentPlan === 'full'
                        ? `₦${fullAdvancePriceNgn.toLocaleString()}`
                        : paymentPlan === 'milestone'
                        ? `₦${milestone1.toLocaleString()}`
                        : `₦${monthlyAmount.toLocaleString()}`}
                    </span>
                  </div>
                </div>

                {/* Step 2: Clearance & Bank Settlement */}
                <div className="p-4 rounded-xl bg-[#f2f7f4] border border-[#93e0a2] space-y-2">
                  <div className="flex items-center gap-2 text-[#004c22] font-bold text-[13px]">
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                    <span>Tuition Settlement & Seat Clearance (Official Academy Accounts)</span>
                  </div>
                  <p className="text-[12px] text-[#404940]">
                    To finalize your seat reservation and activate your Student LMS Portal credentials, please settle your first installment using the institutional details below, referencing your application code <strong>{applicationRef}</strong>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[12px]">
                    <div className="p-3 bg-[#ffffff] rounded-lg border border-[#eceef0]">
                      <span className="font-bold text-[#004c22] block">Zenith Bank Plc</span>
                      <span className="text-[#404940] block">Account Name: EHMCare Integrated Clinic Ltd</span>
                      <span className="font-mono font-bold text-[#191c1e] text-[13px] block mt-0.5">1225893041</span>
                    </div>
                    <div className="p-3 bg-[#ffffff] rounded-lg border border-[#eceef0]">
                      <span className="font-bold text-[#004c22] block">Guaranty Trust Bank (GTBank)</span>
                      <span className="text-[#404940] block">Account Name: EHMCare Integrated Clinic Ltd</span>
                      <span className="font-mono font-bold text-[#191c1e] text-[13px] block mt-0.5">0492817482</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps Roadmap */}
                <div className="space-y-2 text-[12.5px] text-[#404940]">
                  <span className="font-bold text-[#191c1e] block">What Happens Next?</span>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>An academic admissions officer will message your WhatsApp line ({phone}) within 12 hours.</li>
                    <li>Forward your transfer proof along with reference <strong>{applicationRef}</strong>.</li>
                    <li>Receive your official Student LMS Portal login details and download your first term digital textbooks.</li>
                    <li>Attend the Didactic Orientation webinar and receive your clinical schedule for the Saboke training hall.</li>
                  </ol>
                </div>

                {/* Sign-off */}
                <div className="pt-4 border-t border-[#eceef0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-[#004c22] block">Dr. Adeyemi Isaaq Alabi</span>
                    <span className="text-[11px] text-[#717a70]">Founder & Academic Preceptor, EHMCare Academy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setCurrentStep(1);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#f2f4f6] text-[#404940] text-[12px] font-bold hover:bg-[#e0e3e5] cursor-pointer"
                    >
                      Submit Another Application
                    </button>
                    <button
                      onClick={onNavigateToAcademy}
                      className="px-4 py-2 rounded-lg bg-[#004c22] text-[#ffffff] text-[12px] font-bold hover:bg-[#166534] cursor-pointer"
                    >
                      Explore Academy Curriculums
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Comprehensive Program Comparison Matrix */}
      <section className="w-full py-12 px-4 lg:px-10 bg-[#ffffff] border-y border-[#eceef0]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-1 text-center items-center max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-[#a6f4b5] text-[#00210b] text-[11px] font-bold uppercase tracking-widest">
              Curriculum Matrix
            </span>
            <h2 className="text-[30px] font-bold text-[#004c22]">
              Compare EHMCare Academy Programs
            </h2>
            <p className="text-[14px] text-[#404940]">
              Evaluate durations, bedside hours, clinical tools, and qualifications awarded across our 4 formal pathways.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#f2f4f6] text-[#004c22] border-b border-[#eceef0]">
                  <th className="p-4 font-bold">Program</th>
                  <th className="p-4 font-bold">Duration</th>
                  <th className="p-4 font-bold">Bedside Hours</th>
                  <th className="p-4 font-bold">Full Tuition</th>
                  <th className="p-4 font-bold">Clinical Equipment Included</th>
                  <th className="p-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eceef0]">
                {ACADEMY_PROGRAMS.map((prog) => (
                  <tr key={prog.id} className="hover:bg-[#fcfdfd] transition-colors">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#191c1e] text-[14px]">{prog.name}</span>
                        <span className="text-[11px] text-[#717a70]">{prog.credential}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[#404940]">{prog.duration}</td>
                    <td className="p-4 font-semibold text-[#004c22]">{prog.clinicalHours} Hours</td>
                    <td className="p-4">
                      <span className="font-extrabold text-[#004c22]">
                        ₦{prog.fullTuitionNgn.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-[#717a70] block">~${prog.fullTuitionUsd}</span>
                    </td>
                    <td className="p-4 text-[#404940] max-w-xs">
                      {prog.id === 'tcm' && 'Sterile acupuncture needles, model chart, moxibustion pack, white coat.'}
                      {prog.id === 'cupping' && 'Medical vacuum cupping pump & 12 sterile polycarbonate cups, lancets.'}
                      {prog.id === 'phytotherapy' && 'Compounding lab manual, botanical formulary index, tincture flasks.'}
                      {prog.id === 'nutrition' && 'Metabolic biomarker handbook, patient meal formula guides, assessment toolkit.'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setSelectedProgramId(prog.id);
                          setCurrentStep(1);
                          setIsSubmitted(false);
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#004c22] text-[#ffffff] text-[12px] font-bold hover:bg-[#166534] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Enroll Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Admissions Journey Visual Roadmap */}
      <section className="w-full py-12 px-4 lg:px-10 bg-[#f7f9fb]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] uppercase font-bold text-[#004c22] tracking-widest block mb-1">
              Admissions Workflow
            </span>
            <h2 className="text-[28px] font-bold text-[#191c1e]">
              Your 5-Step Path to Clinical Matriculation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eceef0] flex flex-col gap-2 relative">
              <span className="w-7 h-7 rounded-full bg-[#004c22] text-[#acf770] font-extrabold text-[12px] flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-[14px] text-[#191c1e]">Online Submission</h4>
              <p className="text-[12px] text-[#404940]">
                Submit your bio-data, desired program, and preferred campus via this portal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eceef0] flex flex-col gap-2 relative">
              <span className="w-7 h-7 rounded-full bg-[#004c22] text-[#acf770] font-extrabold text-[12px] flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-[14px] text-[#191c1e]">Registrar Review</h4>
              <p className="text-[12px] text-[#404940]">
                Admissions officers review your credentials and verify cohort seat availability within 24h.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eceef0] flex flex-col gap-2 relative">
              <span className="w-7 h-7 rounded-full bg-[#004c22] text-[#acf770] font-extrabold text-[12px] flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-[14px] text-[#191c1e]">Tuition Clearance</h4>
              <p className="text-[12px] text-[#404940]">
                Complete your advance or milestone deposit to confirm your matriculation number.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eceef0] flex flex-col gap-2 relative">
              <span className="w-7 h-7 rounded-full bg-[#004c22] text-[#acf770] font-extrabold text-[12px] flex items-center justify-center">
                4
              </span>
              <h4 className="font-bold text-[14px] text-[#191c1e]">LMS Portal Access</h4>
              <p className="text-[12px] text-[#404940]">
                Receive student credentials, orientation videos, digital syllabi, and pre-reading lists.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eceef0] flex flex-col gap-2 relative">
              <span className="w-7 h-7 rounded-full bg-[#004c22] text-[#acf770] font-extrabold text-[12px] flex items-center justify-center">
                5
              </span>
              <h4 className="font-bold text-[14px] text-[#191c1e]">Bedside Rotations</h4>
              <p className="text-[12px] text-[#404940]">
                Participate in clinical practicum at Saboke Center observing real stroke and chronic cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Prospective Student FAQs */}
      <section className="w-full py-12 px-4 lg:px-10 bg-[#ffffff] border-t border-[#eceef0]">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="text-center">
            <span className="text-[11px] uppercase font-bold text-[#004c22] tracking-widest block mb-1">
              Admissions FAQ
            </span>
            <h2 className="text-[28px] font-bold text-[#191c1e]">
              Frequently Asked Enrollment Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#f2f4f6] transition-colors duration-200 border border-[#eceef0]"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center cursor-pointer text-left text-[15px] text-[#191c1e] font-bold"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`material-symbols-outlined text-[#004c22] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-[13.5px] text-[#404940] leading-relaxed pt-2 border-t border-[#e0e3e5]">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need Further Assistance Box */}
          <div className="mt-6 p-6 rounded-2xl bg-[#004c22] text-[#ffffff] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-[18px] font-bold text-[#ffffff]">Still have admissions inquiries?</h3>
              <p className="text-[13px] text-[#93e0a2] mt-0.5">
                Our faculty registrar and admissions officers are available Mon–Sat (8:00 AM – 6:00 PM).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={CONTACT_INFO.callHref}
                className="px-4 py-2.5 rounded-lg bg-[#ffffff] text-[#004c22] text-[13px] font-bold hover:bg-[#eceef0] transition-colors"
              >
                Call {CONTACT_INFO.callPhone}
              </a>
              <a
                href={CONTACT_INFO.whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-[#25D366] text-[#ffffff] text-[13px] font-bold hover:bg-[#20ba59] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
