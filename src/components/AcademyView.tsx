import React, { useState } from 'react';
import { IMAGES } from '../data/content.ts';

interface AcademyViewProps {
  onOpenEnrollment: (program?: string) => void;
  onOpenVideo: (title: string, subtitle: string, thumb: string) => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({
  onOpenEnrollment,
  onOpenVideo,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicant, setApplicant] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: 'tcm',
    campus: 'ilorin',
    background: '',
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleDownloadSyllabus = () => {
    const text = `EHMCare Academy of Holistic & Traditional Medicine\nAcademic Syllabus & Curriculum Overview 2025/2026\nAccredited in alignment with NMPR guidelines.\n\nModules:\n1. Didactic Foundation: TCM Philosophy, Yin-Yang & 5 Elements\n2. Channel & Point Anatomy: 361 Points & Extraordinary Vessels\n3. Modern Diagnostic Synthesis: Tongue, Pulse & Western Bio-markers\n4. Electro-Acupuncture & Neurological Trigger Therapies\n5. Clinical Practicum & Stroke Bedside Rotations\n6. Pharmacopeia & African Medicinal Phytotherapy\n\nAdmissions Desk: +234 901 518 4004 | admissions@ehmcare.com`;
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'EHMCare-Academy-Syllabus-2025.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const faqs = [
    {
      q: 'Are the Academy courses recognized for professional practice?',
      a: 'Yes. EHMCare Academy aligns its curriculums with the National Medicine Policy and Regulatory advisory guidelines (NMPR). Students who successfully pass written board modules and clinical rotations receive certified diplomas permitting institutional practice within complementary medical frameworks.',
    },
    {
      q: 'Can practicing medical doctors and nurses take specialized modules?',
      a: 'Absolutely. Over 35% of our current student cohort consists of conventional nurses, physiotherapists, and medical officers completing intensive training in neuro-acupuncture, wet cupping, and botanical medicine to expand their clinical practice.',
    },
    {
      q: 'Where do practical clinical rotations take place?',
      a: 'Bedside and clinical rotations are held directly at the EHMCare saboke center in Ilorin, Kwara State, as well as designated affiliated clinical spaces in Abuja. Students observe actual consultations for chronic stroke, infertility, and metabolic disorders.',
    },
    {
      q: 'Is accommodation assistance provided for out-of-state students?',
      a: 'Yes, our student affairs committee assists verified candidates coming from Lagos, Abuja, Ibadan, Port Harcourt, and northern regions with safe, verified partner residences near the Ilorin campus during intensive practical blocks.',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Banner */}
      <section className="relative w-full bg-[#f2f4f6] px-4 lg:px-10 pt-6 pb-12 overflow-hidden border-b border-[#eceef0]">
        {/* Subtle Ambient Green Halo */}
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-[#91da57]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-28 w-80 h-80 bg-[#a6f4b5]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6">
          {/* Status Pill & Verification Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#166534] text-[#ffffff] text-[11px] font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#acf770] animate-ping"></span>
              <span>Academy Admissions Open | Cohort 2025/2026</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] text-[#004c22] text-[11px] font-bold shadow-sm border border-[#eceef0]">
              <span className="material-symbols-outlined text-[#004c22] text-[16px]">school</span>
              <span>NMPR Accredited Clinical Modules</span>
            </div>
          </div>

          {/* Hero Asymmetric Headline Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 flex flex-col gap-2">
              <h1 className="font-['Plus_Jakarta_Sans'] text-display-lg-mobile lg:text-display-lg text-[#004c22] font-extrabold tracking-tight leading-tight">
                Empowering Africa’s Healthcare Practitioners in Traditional & Integrative Medicine
              </h1>
              <p className="text-[18px] text-[#404940] max-w-3xl leading-relaxed">
                Rigorous didactic lectures, hands-on clinical rotations, meridian anatomy, and herbal pharmacology led by seasoned TCM masters, verified clinical researchers, and government healthcare advisors.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end">
              <button
                onClick={() => onOpenEnrollment()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#004c22] text-[#ffffff] font-bold text-[14px] shadow-md hover:bg-[#166534] transition-all text-center cursor-pointer"
              >
                <span>Apply for Current Cohort</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={handleDownloadSyllabus}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#ffffff] text-[#004c22] font-bold text-[14px] shadow-sm hover:bg-[#eceef0] transition-colors text-center border border-[#eceef0] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                <span>Download 2025 Syllabus (.PDF)</span>
              </button>
            </div>
          </div>

          {/* Institutional Metric Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 pt-4">
            <div className="flex flex-col p-3 sm:p-4 rounded-xl bg-[#ffffff] shadow-sm border border-[#eceef0] min-w-0">
              <span className="text-[24px] sm:text-[32px] text-[#004c22] font-extrabold leading-none truncate">120+</span>
              <span className="text-[10.5px] sm:text-[12px] text-[#404940] uppercase tracking-wider font-bold mt-1 leading-snug">Enrolled Scholars</span>
              <span className="text-[11px] sm:text-[13px] text-[#356b00] font-medium mt-0.5 leading-snug">Actively attending clinicals</span>
            </div>

            <div className="flex flex-col p-3 sm:p-4 rounded-xl bg-[#ffffff] shadow-sm border border-[#eceef0] min-w-0">
              <span className="text-[24px] sm:text-[32px] text-[#004c22] font-extrabold leading-none truncate">3</span>
              <span className="text-[10.5px] sm:text-[12px] text-[#404940] uppercase tracking-wider font-bold mt-1 leading-snug">Specialized Diplomas</span>
              <span className="text-[11px] sm:text-[13px] text-[#404940] mt-0.5 leading-snug">Comprehensive curriculums</span>
            </div>

            <div className="flex flex-col p-3 sm:p-4 rounded-xl bg-[#ffffff] shadow-sm border border-[#eceef0] min-w-0">
              <span className="text-[24px] sm:text-[32px] text-[#004c22] font-extrabold leading-none truncate">100%</span>
              <span className="text-[10.5px] sm:text-[12px] text-[#404940] uppercase tracking-wider font-bold mt-1 leading-snug">Bedside Rotations</span>
              <span className="text-[11px] sm:text-[13px] text-[#356b00] font-medium mt-0.5 leading-snug">Real patient case audits</span>
            </div>

            <div className="flex flex-col p-3 sm:p-4 rounded-xl bg-[#ffffff] shadow-sm border border-[#eceef0] min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[24px] sm:text-[32px] text-[#004c22] font-extrabold leading-none">4.98</span>
                <span className="material-symbols-outlined text-[#356b00] text-[20px] sm:text-[22px]">star</span>
              </div>
              <span className="text-[10.5px] sm:text-[12px] text-[#404940] uppercase tracking-wider font-bold mt-1 leading-snug">Satisfaction Rate</span>
              <span className="text-[11px] sm:text-[13px] text-[#404940] mt-0.5 leading-snug">Verified post-module reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Classroom & Practicum Sessions */}
      <section className="w-full py-14 px-4 lg:px-10 bg-[#f7f9fb]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div className="flex flex-col gap-1 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-[#004c22] text-[12px] uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Live Academy Footage</span>
              </div>
              <h2 className="text-[32px] text-[#191c1e] font-bold">
                Classrooms and Clinical Theory in Session
              </h2>
              <p className="text-[15px] text-[#404940]">
                Explore authentic training environments at EHMCare Academy, where students study diagnostic theory, meridian charts, botanical formulations, and public health awareness.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#acf770] text-[#397200] font-bold text-[12px]">
                <span className="material-symbols-outlined text-[16px]">fiber_manual_record</span>
                <span>Active Semester 2025</span>
              </span>
            </div>
          </div>

          {/* Bento Grid of Real Clinical & Lecture Images */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Main Feature: Instructor at Whiteboard */}
            <div className="md:col-span-7 flex flex-col rounded-xl overflow-hidden bg-[#ffffff] shadow-md border border-[#eceef0]">
              <div className="relative h-96 lg:h-[440px] w-full overflow-hidden bg-[#eceef0] group cursor-pointer"
                onClick={() => onOpenVideo(
                  'Branches of Medicine & Chi-Energy Meridian Systems',
                  'Dr. Alaba Emmanuel Lecture Module I',
                  IMAGES.academyWhiteboard
                )}
              >
                <img
                  alt="EHMCare Academy Lead Instructor teaching branches of medicine on whiteboard"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={IMAGES.academyWhiteboard}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004c22]/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-[#ffffff] flex flex-col">
                  <span className="px-2 py-0.5 rounded bg-[#166534] text-[#ffffff] text-[11px] font-bold w-fit mb-1">
                    Lecture Module I
                  </span>
                  <h3 className="text-[20px] font-bold text-[#ffffff]">
                    Branches of Medicine & Chi-Energy Meridian Systems
                  </h3>
                  <p className="text-[13px] text-[#ffffff]/90 mt-0.5">
                    Dr. Alaba Emmanuel illustrating holistic diagnostics and biochemical vitality pathways.
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#acf770] text-[#0c2000] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">play_arrow</span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between gap-2 bg-[#ffffff]">
                <div className="flex items-center gap-1.5 text-[#404940] text-[13px]">
                  <span className="material-symbols-outlined text-[#004c22] text-[18px]">verified</span>
                  <span>Saboke Center Lecture Hall, Ilorin</span>
                </div>
                <span className="text-[12px] font-semibold text-[#356b00]">36 Contact Hours Completed</span>
              </div>
            </div>

            {/* Right Side: Guest Speaker Event & Cohort Focus */}
            <div className="md:col-span-5 flex flex-col gap-4">
              {/* Webinar Card */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 p-4 rounded-xl bg-[#f2f4f6] shadow-sm border border-[#eceef0]">
                <div className="w-full sm:w-44 lg:w-44 h-48 sm:h-auto rounded-lg overflow-hidden shrink-0 bg-[#eceef0]">
                  <img
                    alt="Webinar announcement for Guest Speaker Mr. Abdulmajeed Opeyemi Agboola Overall Advisor for NMPR"
                    className="w-full h-full object-cover"
                    src={IMAGES.academyWebinar}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#004c22] font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[14px]">podium</span>
                      <span>Health Talk Series</span>
                    </span>
                    <h4 className="text-[16px] font-bold text-[#191c1e] leading-snug">
                      The Role of Herbal Medicine in Responsible Healthcare
                    </h4>
                    <p className="text-[13px] text-[#404940]">
                      Keynote with Mr. Abdulmajeed Opeyemi Agboola (MSc, mAIPH), Overall Advisor for the NMPR.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 text-[12px] text-[#004c22] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">videocam</span>
                    <span>Archived in Student Portal</span>
                  </div>
                </div>
              </div>

              {/* Cohort Practical Study Photos */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div className="relative rounded-xl overflow-hidden shadow-sm group">
                  <img
                    alt="Attentive EHMCare medical students listening closely to instructions"
                    className="w-full h-44 object-cover transition-transform group-hover:scale-105"
                    src={IMAGES.academyStudents}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d3133]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2 text-[#eff1f3] text-[12px] font-semibold">
                    In-Depth Clinical Focus
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden shadow-sm group">
                  <img
                    alt="Wide view of student cohort assembled for clinical training and practicals"
                    className="w-full h-44 object-cover transition-transform group-hover:scale-105"
                    src={IMAGES.academyPracticum}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d3133]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2 text-[#eff1f3] text-[12px] font-semibold">
                    Practicum Assembly
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculums & Diploma Programs */}
      <section className="w-full py-14 px-4 lg:px-10 bg-[#f2f4f6] border-y border-[#eceef0]" id="syllabus">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-1 text-center items-center max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-[#a6f4b5] text-[#00210b] text-[11px] font-bold uppercase tracking-widest">
              Academic Offerings
            </span>
            <h2 className="text-[32px] text-[#004c22] font-bold">
              Structured Medical Diplomas & Certifications
            </h2>
            <p className="text-[15px] text-[#404940]">
              Engineered for aspiring TCM doctors, orthodox nurses, pharmacologists, and licensed integrative healthcare providers seeking accredited mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Program 1 */}
            <div className="flex flex-col justify-between p-6 rounded-xl bg-[#ffffff] shadow-sm hover:shadow-md transition-shadow border border-[#eceef0]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#166534] text-[#ffffff] text-[11px] font-bold">12 Months</span>
                  <span className="text-[11px] text-[#356b00] font-bold">Full Diploma</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#e6e8ea] flex items-center justify-center text-[#004c22]">
                  <span className="material-symbols-outlined">vital_signs</span>
                </div>
                <h3 className="text-[18px] font-bold text-[#191c1e]">TCM & Clinical Acupuncture</h3>
                <p className="text-[13px] text-[#404940] leading-relaxed">
                  Complete foundation covering 361 classical points, neuro-acupuncture trigger therapies, pulse & tongue diagnosis, and 200 clinical internship hours.
                </p>
                <div className="flex flex-col gap-1 pt-2 text-[12px] text-[#404940]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> 8 Core Modules
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Stroke Rehab Rotation
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Certified Board Exam
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-[#eceef0]">
                <button
                  onClick={() => onOpenEnrollment('tcm')}
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-lg bg-[#f2f4f6] text-[#004c22] font-bold text-[13px] hover:bg-[#004c22] hover:text-[#ffffff] transition-colors cursor-pointer"
                >
                  Enroll in TCM Diploma
                </button>
              </div>
            </div>

            {/* Program 2 */}
            <div className="flex flex-col justify-between p-6 rounded-xl bg-[#ffffff] shadow-sm hover:shadow-md transition-shadow border border-[#eceef0]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#acf770] text-[#397200] text-[11px] font-bold">3 Months</span>
                  <span className="text-[11px] text-[#404940] font-bold">Certificate</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#e6e8ea] flex items-center justify-center text-[#004c22]">
                  <span className="material-symbols-outlined">healing</span>
                </div>
                <h3 className="text-[18px] font-bold text-[#191c1e]">Advanced Cupping & Detoxification</h3>
                <p className="text-[13px] text-[#404940] leading-relaxed">
                  Sterile dry, wet, and flash cupping masterclass aligned with biomedical safety protocols, blood-borne pathogen control, and musculoskeletal decompression.
                </p>
                <div className="flex flex-col gap-1 pt-2 text-[12px] text-[#404940]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Sterilization Standards
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Pain Management Protocols
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Practical Wet Cupping Kit
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-[#eceef0]">
                <button
                  onClick={() => onOpenEnrollment('cupping')}
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-lg bg-[#f2f4f6] text-[#004c22] font-bold text-[13px] hover:bg-[#004c22] hover:text-[#ffffff] transition-colors cursor-pointer"
                >
                  Enroll in Cupping Cert
                </button>
              </div>
            </div>

            {/* Program 3 */}
            <div className="flex flex-col justify-between p-6 rounded-xl bg-[#ffffff] shadow-sm hover:shadow-md transition-shadow border border-[#eceef0]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#eceef0] text-[#191c1e] text-[11px] font-bold">6 Months</span>
                  <span className="text-[11px] text-[#004c22] font-bold">Professional Cert</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#e6e8ea] flex items-center justify-center text-[#004c22]">
                  <span className="material-symbols-outlined">compost</span>
                </div>
                <h3 className="text-[18px] font-bold text-[#191c1e]">Phytotherapy & Herb Formulation</h3>
                <p className="text-[13px] text-[#404940] leading-relaxed">
                  Modern botanical extraction, indigenous African medicinal plant chemistry, synergy ratios, and NAFDAC/NMPR standard production compliance.
                </p>
                <div className="flex flex-col gap-1 pt-2 text-[12px] text-[#404940]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Herb-Drug Interactions
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Lab Extraction Practical
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Formulation Dosage Index
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-[#eceef0]">
                <button
                  onClick={() => onOpenEnrollment('phytotherapy')}
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-lg bg-[#f2f4f6] text-[#004c22] font-bold text-[13px] hover:bg-[#004c22] hover:text-[#ffffff] transition-colors cursor-pointer"
                >
                  Enroll in Formulation
                </button>
              </div>
            </div>

            {/* Program 4 */}
            <div className="flex flex-col justify-between p-6 rounded-xl bg-[#ffffff] shadow-sm hover:shadow-md transition-shadow border border-[#eceef0]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#eceef0] text-[#191c1e] text-[11px] font-bold">4 Months</span>
                  <span className="text-[11px] text-[#404940] font-bold">Certificate</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#e6e8ea] flex items-center justify-center text-[#004c22]">
                  <span className="material-symbols-outlined">nutrition</span>
                </div>
                <h3 className="text-[18px] font-bold text-[#191c1e]">Integrative Nutrition & Public Health</h3>
                <p className="text-[13px] text-[#404940] leading-relaxed">
                  Preventative nutritional protocols for diabetes, hypertension, and autoimmune disorders pairing ancient dietary principles with biochemical testing.
                </p>
                <div className="flex flex-col gap-1 pt-2 text-[12px] text-[#404940]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Metabolic Regimens
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Chronic Illness Diet Design
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#004c22] text-[14px]">check_circle</span> Preventive Outreach
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-[#eceef0]">
                <button
                  onClick={() => onOpenEnrollment('publichealth')}
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-lg bg-[#f2f4f6] text-[#004c22] font-bold text-[13px] hover:bg-[#004c22] hover:text-[#ffffff] transition-colors cursor-pointer"
                >
                  Enroll in Nutrition
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Lecture Preview & Scholar Testimonials */}
      <section className="w-full py-14 px-4 lg:px-10 bg-[#f7f9fb]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Media Callout */}
          <div className="relative rounded-2xl overflow-hidden bg-[#004c22] text-[#ffffff] p-6 lg:p-10 shadow-xl flex flex-col lg:flex-row items-center gap-8">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#acf770]/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex flex-col gap-3 max-w-xl z-10">
              <div className="inline-flex items-center gap-1.5 text-[#acf770] text-[12px] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">play_circle</span>
                <span>Video Practicum Archive</span>
              </div>
              <h3 className="text-[28px] font-bold text-[#ffffff] leading-tight">
                Watch Real Clinical Demonstrations & Student Insights
              </h3>
              <p className="text-[15px] text-[#ffffff]/85 leading-relaxed">
                Gain immediate insight into our lecture room dynamic: stroke rehab patient simulations, meridian point palpation, and Dr. Emmanuel’s clinical diagnostic breakdowns.
              </p>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#acf770]">workspace_premium</span>
                  <span className="text-[13px] font-semibold">Real Patient Rounds</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#acf770]">groups</span>
                  <span className="text-[13px] font-semibold">Peer Mentorship</span>
                </div>
              </div>
            </div>

            {/* Video Card Simulator */}
            <div
              onClick={() => onOpenVideo(
                'Clinical Case Study: Hemiplegia & Meridian Recovery',
                'Recorded at EHMCare Saboke Training Hall',
                IMAGES.academyPracticum
              )}
              className="w-full lg:w-96 rounded-xl overflow-hidden bg-[#166534] p-4 text-[#ffffff] flex flex-col gap-2 shrink-0 z-10 shadow-lg cursor-pointer hover:bg-[#00210b] transition-colors group"
            >
              <div className="relative h-48 w-full rounded-lg overflow-hidden bg-[#eceef0]">
                <img
                  alt="Video preview thumbnail of lecture room with students learning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={IMAGES.academyPracticum}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#2d3133]/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#acf770] text-[#0c2000] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[28px]">play_arrow</span>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#191c1e]/80 text-[#f7f9fb] text-[11px] font-mono">
                  18:42
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-bold">Clinical Case Study: Hemiplegia & Meridian Recovery</span>
                <span className="text-[12px] text-[#a6f4b5] mt-0.5">Recorded at EHMCare Saboke Training Hall</span>
              </div>
            </div>
          </div>

          {/* Testimonial Quote Grid */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[24px] text-[#191c1e] font-bold">
              What Current Scholars Are Saying
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-xl bg-[#f2f4f6] flex flex-col justify-between gap-3 border border-[#eceef0]">
                <p className="text-[14px] text-[#191c1e] italic leading-relaxed">
                  “The clinical integration here is second to none. We don’t just read textbooks; Dr. Emmanuel demonstrates meridian puncture techniques directly on stroke rehab patients, teaching us precision and ethics.”
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-[#166534] text-[#ffffff] font-bold flex items-center justify-center text-[13px]">
                    FA
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#191c1e]">Fatima Al-Hassan</span>
                    <span className="text-[11px] text-[#404940]">TCM Diploma Candidate, Year 1</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#f2f4f6] flex flex-col justify-between gap-3 border border-[#eceef0]">
                <p className="text-[14px] text-[#191c1e] italic leading-relaxed">
                  “Attending the NMPR advisor webinar opened my eyes to public health policies regarding herbal formulations. EHMCare Academy is creating credible practitioners who will change African integrative medicine.”
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-[#356b00] text-[#ffffff] font-bold flex items-center justify-center text-[13px]">
                    TO
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#191c1e]">Timothy Olusola, RN</span>
                    <span className="text-[11px] text-[#404940]">Advanced Clinical Cupping Fellow</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#f2f4f6] flex flex-col justify-between gap-3 border border-[#eceef0]">
                <p className="text-[14px] text-[#191c1e] italic leading-relaxed">
                  “The small cohort size allows intensive interaction with instructors. We review diagnostic cases every morning and master compounding medicinal herbs without speculative methods.”
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-[#394156] text-[#ffffff] font-bold flex items-center justify-center text-[13px]">
                    KB
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[#191c1e]">Khadijah Bello</span>
                    <span className="text-[11px] text-[#404940]">Phytotherapy Scholar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions & Interactive Enrollment Form */}
      <section className="w-full py-14 px-4 lg:px-10 bg-[#f2f4f6] border-t border-[#eceef0]" id="enrollment-portal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-3">
              <span className="px-3 py-1 rounded-full bg-[#166534] text-[#ffffff] text-[11px] font-bold uppercase tracking-widest w-fit">
                Admissions Desk
              </span>
              <h2 className="text-[32px] text-[#004c22] font-bold leading-tight">
                Begin Your Medical Journey with EHMCare Academy
              </h2>
              <p className="text-[15px] text-[#404940] leading-relaxed">
                Our admissions committee reviews applications on a rolling basis. Cohorts maintain strict seating caps to ensure individual clinical observation during patient rotations.
              </p>

              {/* Key Prerequisites */}
              <div className="flex flex-col gap-2.5 mt-2">
                <div className="p-4 rounded-lg bg-[#ffffff] flex items-start gap-3 shadow-xs border border-[#eceef0]">
                  <span className="material-symbols-outlined text-[#004c22] text-[24px]">verified_user</span>
                  <div className="flex flex-col">
                    <span className="text-[15px] text-[#191c1e] font-bold">Admission Requirements</span>
                    <span className="text-[13px] text-[#404940]">
                      Minimum of SSCE/WASSCE with science credits, or background in nursing, pharmacy, biology, or allied healthcare disciplines.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#ffffff] flex items-start gap-3 shadow-xs border border-[#eceef0]">
                  <span className="material-symbols-outlined text-[#004c22] text-[24px]">payments</span>
                  <div className="flex flex-col">
                    <span className="text-[15px] text-[#191c1e] font-bold">Flexible Installments & Support</span>
                    <span className="text-[13px] text-[#404940]">
                      Tuition installment structures available across 3-month and 12-month program cadences.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#ffffff] flex items-start gap-3 shadow-xs border border-[#eceef0]">
                  <span className="material-symbols-outlined text-[#004c22] text-[24px]">pin_drop</span>
                  <div className="flex flex-col">
                    <span className="text-[15px] text-[#191c1e] font-bold">Campus Center Locations</span>
                    <span className="text-[13px] text-[#404940]">
                      Ilorin Center: 7 Sofoluwe Street, Saboke, South, Ilorin, Kwara State. Abuja Center: Maitama District.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#acf770]/30 text-[#397200] flex items-center justify-between border border-[#acf770]/40">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004c22]">support_agent</span>
                <span className="text-[13px] font-bold">Direct Admissions Hotline:</span>
              </div>
              <a className="text-[13px] font-bold text-[#004c22] hover:underline" href="tel:+2349015184004">
                +234 901 518 4004
              </a>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-[#ffffff] p-6 lg:p-8 rounded-2xl shadow-md border border-[#eceef0] flex flex-col gap-4">
            <div className="flex flex-col gap-1 pb-3 border-b border-[#eceef0]">
              <h3 className="text-[20px] text-[#191c1e] font-bold">Application for 2025/2026 Cohort</h3>
              <p className="text-[13px] text-[#404940]">
                Complete this form to reserve your seat and schedule your didactic orientation.
              </p>
            </div>

            {!formSubmitted ? (
              <form className="flex flex-col gap-4" id="academy-apply-form" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#191c1e]" htmlFor="student_fname">
                      First Name *
                    </label>
                    <input
                      className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] border border-[#bfc9bd] focus:outline-none focus:ring-2 focus:ring-[#004c22] text-[13px]"
                      id="student_fname"
                      placeholder="e.g. Samuel"
                      required
                      type="text"
                      value={applicant.firstName}
                      onChange={(e) => setApplicant({ ...applicant, firstName: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#191c1e]" htmlFor="student_lname">
                      Last Name *
                    </label>
                    <input
                      className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] border border-[#bfc9bd] focus:outline-none focus:ring-2 focus:ring-[#004c22] text-[13px]"
                      id="student_lname"
                      placeholder="e.g. Adeyemi"
                      required
                      type="text"
                      value={applicant.lastName}
                      onChange={(e) => setApplicant({ ...applicant, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#191c1e]" htmlFor="student_email">
                      Email Address *
                    </label>
                    <input
                      className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] border border-[#bfc9bd] focus:outline-none focus:ring-2 focus:ring-[#004c22] text-[13px]"
                      id="student_email"
                      placeholder="student@example.com"
                      required
                      type="email"
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#191c1e]" htmlFor="student_phone">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] border border-[#bfc9bd] focus:outline-none focus:ring-2 focus:ring-[#004c22] text-[13px]"
                      id="student_phone"
                      placeholder="0901 518 4004"
                      required
                      type="tel"
                      value={applicant.phone}
                      onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#191c1e]" htmlFor="program_select">
                      Select Program *
                    </label>
                    <select
                      className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] border border-[#bfc9bd] focus:outline-none focus:ring-2 focus:ring-[#004c22] text-[13px]"
                      id="program_select"
                      required
                      value={applicant.program}
                      onChange={(e) => setApplicant({ ...applicant, program: e.target.value })}
                    >
                      <option value="tcm">Diploma in TCM & Clinical Acupuncture (12 Mos)</option>
                      <option value="cupping">Advanced Cupping & Detoxification (3 Mos)</option>
                      <option value="phytotherapy">Phytotherapy & Herb Formulation (6 Mos)</option>
                      <option value="publichealth">Integrative Nutrition & Public Health (4 Mos)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#191c1e]" htmlFor="campus_select">
                      Preferred Campus *
                    </label>
                    <select
                      className="h-11 px-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] border border-[#bfc9bd] focus:outline-none focus:ring-2 focus:ring-[#004c22] text-[13px]"
                      id="campus_select"
                      required
                      value={applicant.campus}
                      onChange={(e) => setApplicant({ ...applicant, campus: e.target.value })}
                    >
                      <option value="ilorin">Ilorin Center (Saboke Campus)</option>
                      <option value="abuja">Abuja Center (Maitama Campus)</option>
                      <option value="hybrid">Hybrid (Online Didactic + Clinical Block)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-[#191c1e]" htmlFor="prior_background">
                    Medical / Academic Background
                  </label>
                  <textarea
                    className="p-3 rounded-lg bg-[#f7f9fb] text-[#191c1e] border border-[#bfc9bd] focus:outline-none focus:ring-2 focus:ring-[#004c22] text-[13px]"
                    id="prior_background"
                    placeholder="Briefly state your current profession (Nurse, Science graduate, Herbal practitioner, Student, etc.)"
                    rows={3}
                    value={applicant.background}
                    onChange={(e) => setApplicant({ ...applicant, background: e.target.value })}
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    className="mt-1 w-4 h-4 rounded text-[#004c22] focus:ring-[#004c22]"
                    id="terms_agree"
                    required
                    type="checkbox"
                  />
                  <label className="text-[12px] text-[#404940]" htmlFor="terms_agree">
                    I certify that all details submitted are accurate and understand that enrollment is verified by clinical department faculty.
                  </label>
                </div>

                <button
                  className="w-full h-12 rounded-lg bg-[#004c22] text-[#ffffff] font-bold text-[14px] shadow-md hover:bg-[#166534] transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
                  type="submit"
                >
                  <span>Submit Academy Application</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center gap-3 bg-[#f2f4f6] rounded-xl border border-[#acf770]">
                <div className="w-14 h-14 rounded-full bg-[#acf770] text-[#397200] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h4 className="text-[20px] font-bold text-[#004c22]">Application Successfully Received!</h4>
                <p className="text-[14px] text-[#404940] max-w-md">
                  Thank you for applying to EHMCare Academy, {applicant.firstName}. Our Academic Registrar will contact you on WhatsApp / Phone within 24 hours with your enrollment package and class timetable.
                </p>
                <div className="pt-2">
                  <span className="text-[12px] text-[#004c22] font-bold">Inquiries: 0901 518 4004 | 0905 975 8574</span>
                </div>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 px-6 py-2 rounded-lg bg-[#004c22] text-white text-[12px] font-bold hover:bg-[#166534]"
                >
                  Submit Another Application
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Module for Scholars */}
      <section className="w-full py-14 px-4 lg:px-10 bg-[#ffffff]">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-center items-center">
            <span className="text-[12px] text-[#004c22] uppercase font-bold tracking-wider">Got Questions?</span>
            <h2 className="text-[28px] text-[#191c1e] font-bold">Frequently Asked Academic Inquiries</h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#f2f4f6] transition-colors duration-200 border border-[#eceef0]"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center cursor-pointer text-left text-[16px] text-[#191c1e] font-bold"
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
                    <p className="mt-3 text-[14px] text-[#404940] leading-relaxed pt-2 border-t border-[#e0e3e5]">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
