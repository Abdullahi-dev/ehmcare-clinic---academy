import React, { useState } from 'react';
import { IMAGES } from '../data/content.ts';

interface StudentLmsPortalViewProps {
  onOpenVideo?: (title: string, subtitle: string, thumb: string) => void;
}

export const StudentLmsPortalView: React.FC<StudentLmsPortalViewProps> = ({
  onOpenVideo,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'lectures' | 'practicum' | 'webinars' | 'vault' | 'preceptor'>('lectures');
  const [isPlaying, setIsPlaying] = useState(false);
  const [registeredWebinar, setRegisteredWebinar] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [loggedCasesCount, setLoggedCasesCount] = useState(142);
  const [logForm, setLogForm] = useState({
    patientId: '',
    intervention: 'Clinical Electro-Acupuncture',
    hours: '2',
    points: '',
    preceptor: 'Dr. Alaba Emmanuel (Head TCM Physician)',
  });
  const [logSuccessToast, setLogSuccessToast] = useState(false);

  const handleDownloadFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedCasesCount((prev) => prev + Number(logForm.hours));
    setLogModalOpen(false);
    setLogSuccessToast(true);
    setTimeout(() => setLogSuccessToast(false), 5000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification */}
      {logSuccessToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#166534] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-fadeIn">
          <span className="material-symbols-outlined text-[#acf770] text-[22px]">check_circle</span>
          <div>
            <p className="font-bold text-[13px]">Case Logged Successfully!</p>
            <p className="text-[11px] text-[#93e0a2]">Queued for Dr. Alaba Emmanuel preceptor sign-off.</p>
          </div>
        </div>
      )}

      {/* Top Academic Welcome Banner */}
      <section className="w-full bg-[#f2f4f6] py-5 px-4 lg:px-8 shadow-xs border-b border-[#eceef0]">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-xl bg-[#166534] text-white flex items-center justify-center font-bold text-[22px] shadow-md">
                FA
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#acf770] flex items-center justify-center text-[#0c2000] shadow-sm">
                <span className="material-symbols-outlined text-[13px] font-bold">verified</span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[22px] text-[#191c1e] font-bold">Scholar Fatima Al-Hassan</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e0e3e5] text-[#004c22] text-[11px] font-bold tracking-wider uppercase">
                  Matric: EHM/2025/TCM-084
                </span>
              </div>
              <p className="text-[14px] text-[#404940] mt-0.5">
                Diploma in Traditional Chinese Medicine & Neuro-Acupuncture (Cohort 2025/2026)
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-[#404940]">
                <span className="inline-flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#356b00]"></span>
                  Term 2 • Clinical Practicum Track
                </span>
                <span>•</span>
                <span className="text-[#004c22] font-bold">Overall Academic Progress: 68%</span>
                <span>•</span>
                <span className="text-[#191c1e] font-bold">{loggedCasesCount}/200 Bedside Log Hours</span>
              </div>
            </div>
          </div>

          {/* Quick Action Floating Modules */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                if (onOpenVideo) {
                  onOpenVideo(
                    'Live Virtual Clinical Ward Round with Dr. Alaba Emmanuel',
                    'Active Consultation Suite • Saboke Center',
                    IMAGES.lmsLectureStream
                  );
                } else {
                  alert('Launching Live Virtual Clinical Round with Dr. Alaba Emmanuel...');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#166534] text-white text-[13px] font-bold hover:bg-[#004c22] shadow-sm transition-all group cursor-pointer"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#acf770] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#acf770]"></span>
              </span>
              <span>Join Live Virtual Round</span>
              <span className="text-[#acf770] font-bold text-[11px] group-hover:translate-x-0.5 transition-transform">
                (Starts in 35m)
              </span>
            </button>

            <button
              onClick={() => handleDownloadFile(
                'EHMCare-Academic-Syllabus-2025-2026.txt',
                `EHMCare Academy of Traditional Medicine\nTerm 2 Didactic & Clinical Rotation Syllabus 2025/2026\nScholar: Fatima Al-Hassan (EHM/2025/TCM-084)\n\nModules: Foundations, Meridian Point Topography, Scalp Neuro-Acupuncture, Cupping Protocols, Phytotherapy.`
              )}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#191c1e] text-[13px] font-bold hover:bg-[#eceef0] shadow-xs border border-[#eceef0] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#004c22] text-[18px]">download</span>
              <span>Download Syllabus</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Navigation Sub-Menu Strip */}
      <div className="w-full bg-white shadow-xs border-b border-[#eceef0] sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
            {[
              { id: 'lectures', label: 'My Lectures & Modules', icon: 'video_library' },
              { id: 'practicum', label: `Practicum Logbook (${loggedCasesCount} hrs)`, icon: 'assignment_turned_in' },
              { id: 'webinars', label: 'Faculty Masterclasses & Webinars', icon: 'event_available' },
              { id: 'vault', label: 'Resource Vault & Pharmacopoeia', icon: 'local_library' },
              { id: 'preceptor', label: 'Ask Preceptor (2 Active Cases)', icon: 'contact_support' },
            ].map((tab) => {
              const active = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#166534] text-[#ffffff] shadow-xs'
                      : 'text-[#404940] hover:text-[#191c1e] hover:bg-[#f2f4f6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid Canvas */}
      <main className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT PRIMARY SECTION (8 Columns) */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            {/* Video Lecture Player / Active Module Showcase */}
            <article className="bg-white rounded-xl shadow-sm border border-[#eceef0] overflow-hidden">
              <div className="relative bg-[#191c1e] w-full aspect-video flex items-center justify-center overflow-hidden group">
                <img
                  className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'opacity-90' : 'opacity-80'}`}
                  alt="Dr. Alaba Emmanuel whiteboard lecture"
                  src={IMAGES.lmsLectureStream}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none"></div>

                {/* Streaming / Resolution Tags */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#166534] text-white text-[11px] font-bold uppercase flex items-center gap-1 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#acf770] animate-pulse"></span> 1080p Ultra HD
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[#191c1e] text-[11px] font-semibold">
                    Classroom Dynamic Stream
                  </span>
                </div>

                {/* Play Button Trigger */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute z-10 w-16 h-16 rounded-full bg-[#166534]/95 text-white hover:bg-[#004c22] hover:scale-110 active:scale-95 flex items-center justify-center shadow-xl transition-all cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  <span className="material-symbols-outlined text-[36px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>

                {/* Video Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-1 text-white">
                  <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                    <div className="w-7/12 h-full bg-[#acf770] rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#acf770]">
                        <span className="material-symbols-outlined text-[16px]">
                          {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                      </button>
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      <span>34:12 / 58:45</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hover:underline cursor-pointer">1.0x Speed</span>
                      <span className="hover:underline cursor-pointer">CC (En)</span>
                      <span className="material-symbols-outlined text-[16px] cursor-pointer">fullscreen</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Metadata & Didactic Notes */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#acf770] text-[#397200] text-[11px] font-bold uppercase">
                        Module 2 • Lecture 14
                      </span>
                      <span className="text-[#404940] text-[11px]">Recorded Live at Ilorin Clinical Theater</span>
                    </div>
                    <h2 className="text-[20px] text-[#191c1e] font-bold leading-snug">
                      Meridian Point Topography & Electro-Acupuncture Frequency Parameters
                    </h2>
                  </div>

                  <button
                    onClick={() => handleDownloadFile(
                      'Lecture-14-Clinical-Notes-Dr-Alaba.txt',
                      `EHMCare Clinical Lecture Notes: Module 2, Lecture 14\nMeridian Topography & Micro-Current Frequency Modulations\n1. Needle Angles (15 deg oblique vs 90 deg perpendicular)\n2. 2Hz vs 100Hz electro-stimulation on motor points\n3. Precautionary landmarks around thoracic zone.`
                    )}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e6e8ea] hover:bg-[#e0e3e5] text-[#191c1e] text-[12px] font-bold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#004c22]">description</span>
                    <span>Download Clinical Notes (PDF)</span>
                  </button>
                </div>

                {/* Instructor Badge Bar */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#f2f4f6] flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center font-bold text-[14px]">
                      DA
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] text-[#004c22] font-bold">Dr. Alaba Emmanuel</span>
                      <span className="text-[11px] text-[#404940]">Head TCM Physician & Director of Clinical Studies, EHMCare</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#404940]">
                    <span className="material-symbols-outlined text-[#004c22] text-[16px]">medical_services</span>
                    <span>12 Clinical Protocols Attached</span>
                  </div>
                </div>

                {/* Lecture Synopsis */}
                <p className="text-[13px] text-[#404940] leading-relaxed">
                  In this core didactic session, Dr. Alaba Emmanuel walks through precise localization of the 14 main meridians on the anatomical whiteboard, detailing safe needle insertion angles over thoracic pathways, avoidance of pneumothorax, and micro-current pulse modulation (2Hz vs 100Hz) for stubborn peripheral neuropathy and musculoskeletal rehabilitation.
                </p>
              </div>
            </article>

            {/* Course Curriculum & Modules Navigator */}
            <article className="bg-white rounded-xl p-5 shadow-sm border border-[#eceef0] flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-[18px] text-[#191c1e] font-bold">Comprehensive TCM & Clinical Syllabus</h3>
                  <p className="text-[13px] text-[#404940]">Cohort 2025/2026 Academic Progression Tracker</p>
                </div>
                <div className="flex items-center gap-2 bg-[#f2f4f6] px-3 py-1.5 rounded-lg text-[11px]">
                  <span className="text-[#404940]">Completion Status:</span>
                  <span className="font-bold text-[#004c22]">3 of 5 Modules Cleared</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* Module 1 */}
                <div className="p-3.5 rounded-xl bg-[#f2f4f6] hover:bg-[#e6e8ea] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#eceef0]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#acf770] text-[#397200] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined font-bold">check_circle</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#404940] font-bold uppercase">Module 01 • Finished</span>
                        <span className="px-2 py-0.5 rounded bg-[#e0e3e5] text-[#004c22] text-[10px] font-bold">Grade: 94%</span>
                      </div>
                      <h4 className="text-[15px] text-[#191c1e] font-bold mt-0.5">Foundations of Yin-Yang & Zang-Fu Organ Syndromes</h4>
                      <p className="text-[12px] text-[#404940]">18 Core Lectures • 4 Diagnostic Quizzes • Verified Lab</p>
                    </div>
                  </div>
                  <div className="self-end md:self-center">
                    <button
                      onClick={() => alert('Viewing Module 1 Archive & Transcripts')}
                      className="px-3 py-1.5 rounded-lg bg-white text-[#191c1e] hover:bg-[#e0e3e5] text-[12px] font-bold border border-[#eceef0] cursor-pointer"
                    >
                      Review Archive
                    </button>
                  </div>
                </div>

                {/* Module 2 (Current) */}
                <div className="p-3.5 rounded-xl bg-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 border-2 border-[#166534]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#166534] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined font-bold">autorenew</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#004c22] font-bold uppercase">Module 02 • In Progress (75%)</span>
                        <span className="px-2 py-0.5 rounded bg-[#acf770] text-[#0c2000] text-[10px] font-bold">Lecture 14 of 18</span>
                      </div>
                      <h4 className="text-[15px] text-[#004c22] font-bold">Meridian Channels, 361 Classical Acupoints & Anatomical Safety</h4>
                      <p className="text-[12px] text-[#404940]">Needle gauge selection, clean needle technique (CNT), forbidden points in gestation</p>
                      <div className="w-full max-w-md h-2 bg-[#e0e3e5] rounded-full overflow-hidden mt-1">
                        <div className="w-3/4 h-full bg-[#356b00] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="self-end md:self-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="px-4 py-2 rounded-lg bg-[#166534] text-white hover:bg-[#004c22] text-[13px] font-bold shadow-xs cursor-pointer"
                    >
                      Resume Study
                    </button>
                  </div>
                </div>

                {/* Module 3 */}
                <div className="p-3.5 rounded-xl bg-[#f2f4f6] hover:bg-[#e6e8ea] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#eceef0]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#e0e3e5] text-[#004c22] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined font-bold">psychology</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#404940] font-bold uppercase">Module 03 • Next Up</span>
                        <span className="text-[#404940] text-[11px]">Starts in 6 days</span>
                      </div>
                      <h4 className="text-[15px] text-[#191c1e] font-bold mt-0.5">Scalp Neuro-Acupuncture for Hemiplegic Stroke Rehabilitation</h4>
                      <p className="text-[12px] text-[#404940]">Motor and sensory zone cranial stimulation, clinical outcome measurements</p>
                    </div>
                  </div>
                  <div className="self-end md:self-center">
                    <button
                      onClick={() => alert('Pre-requisite syllabus unlocked for Module 3')}
                      className="px-3 py-1.5 rounded-lg bg-white text-[#404940] hover:text-[#191c1e] text-[12px] font-bold border border-[#eceef0] cursor-pointer"
                    >
                      Pre-Reading
                    </button>
                  </div>
                </div>

                {/* Module 4 */}
                <div className="p-3.5 rounded-xl bg-[#f2f4f6] flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#eceef0]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#e0e3e5] text-[#404940] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined font-bold">sanitizer</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#404940] font-bold uppercase">Module 04 • Clinical Practicum</span>
                      <h4 className="text-[15px] text-[#191c1e] font-bold mt-0.5">Clinical Wet & Dry Cupping & Cross-Contamination Protocols</h4>
                      <p className="text-[12px] text-[#404940]">Hospital-grade sterilization, toxic waste disposal, skin lesion avoidance</p>
                    </div>
                  </div>
                  <div className="self-end md:self-center">
                    <span className="text-[11px] text-[#404940] font-bold">Syllabus Locked</span>
                  </div>
                </div>

                {/* Module 5 */}
                <div className="p-3.5 rounded-xl bg-[#f2f4f6] flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#eceef0]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#e0e3e5] text-[#404940] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined font-bold">potted_plant</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#404940] font-bold uppercase">Module 05 • Advanced Pharmacology</span>
                      <h4 className="text-[15px] text-[#191c1e] font-bold mt-0.5">Phytotherapy, Botanical Chemistry & NAFDAC Compounding Formulations</h4>
                      <p className="text-[12px] text-[#404940]">Indigenous Nigerian herbal extracts paired with Chinese decoction methodology</p>
                    </div>
                  </div>
                  <div className="self-end md:self-center">
                    <span className="text-[11px] text-[#404940] font-bold">Term 3 Prerequisite</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Upcoming Live Web Seminars & Faculty Masterclasses */}
            <article className="bg-white rounded-xl p-5 shadow-sm border border-[#eceef0] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#004c22] font-bold uppercase tracking-wider">Faculty Masterclasses</span>
                  <h3 className="text-[18px] text-[#191c1e] font-bold">Upcoming Live Interactive Web Seminars</h3>
                </div>
                <button
                  onClick={() => alert('Full academic webinar schedule displayed')}
                  className="text-[12px] text-[#004c22] font-bold hover:underline cursor-pointer"
                >
                  View All Schedule
                </button>
              </div>

              {/* Featured Webinar Flyer Card Matching Artifact */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#f2f4f6] via-white to-[#eceef0] shadow-xs p-4 flex flex-col md:flex-row items-center gap-6 border border-[#eceef0]">
                <div className="w-full md:w-5/12 shrink-0 relative">
                  <div className="relative rounded-lg overflow-hidden shadow-md aspect-[3/4] bg-[#e0e3e5]">
                    <img
                      className="w-full h-full object-cover"
                      alt="Webinar flyer: Mr. Abdulmajeed Opeyemi Agboola"
                      src={IMAGES.lmsWebinarSpeaker}
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#166534] text-white text-[11px] font-bold shadow-sm">
                      4 DAYS TO GO
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-7/12 flex flex-col gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#acf770] text-[#397200] text-[11px] font-bold">
                      A-Day Health Talk Webinar
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e0e3e5] text-[#004c22] text-[11px] font-semibold">
                      Accredited CME Credits: 2.0
                    </span>
                  </div>

                  <h4 className="text-[18px] text-[#004c22] font-extrabold leading-snug">
                    The Role of Herbal Medicine in Promoting Responsible Healthcare
                  </h4>

                  <p className="text-[13px] text-[#404940] leading-relaxed">
                    Exploring wellness, public health awareness, and informed treatment choices in today's evolving healthcare landscape.
                  </p>

                  {/* Speaker Box */}
                  <div className="p-3 rounded-lg bg-[#f2f4f6] flex items-start gap-3 border border-[#eceef0]">
                    <div className="w-9 h-9 rounded-full bg-[#004c22] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">mic</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#356b00] uppercase font-bold block">Keynote Speaker</span>
                      <span className="text-[14px] font-bold text-[#191c1e]">Mr. Abdulmajeed Opeyemi Agboola</span>
                      <span className="text-[11px] text-[#404940] block">MSc, mAIPH • Overall Advisor for the NMPR</span>
                    </div>
                  </div>

                  {/* Logistics */}
                  <div className="grid grid-cols-3 gap-2 py-1 text-center text-[11px] text-[#404940] bg-white rounded-lg p-2 shadow-xs border border-[#eceef0]">
                    <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-[#004c22] text-[18px]">calendar_month</span>
                      <span className="font-bold text-[#191c1e] mt-0.5">14th June, 2026</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-[#004c22] text-[18px]">video_camera_front</span>
                      <span className="font-bold text-[#191c1e] mt-0.5">Google Meet</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-[#004c22] text-[18px]">schedule</span>
                      <span className="font-bold text-[#191c1e] mt-0.5">5:00 PM WAT</span>
                    </div>
                  </div>

                  {/* Call to Action Row */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => setRegisteredWebinar(true)}
                      className={`px-4 py-2 rounded-lg font-bold text-[12px] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                        registeredWebinar
                          ? 'bg-[#356b00] text-white'
                          : 'bg-[#166534] text-white hover:bg-[#004c22]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {registeredWebinar ? 'done' : 'event_available'}
                      </span>
                      <span>{registeredWebinar ? 'Seat Confirmed & Calendar Synced' : 'Register & Get Meet Link'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setRegisteredWebinar(true);
                        setLogSuccessToast(true);
                        setTimeout(() => setLogSuccessToast(false), 4000);
                      }}
                      className="px-3 py-2 rounded-lg bg-[#e6e8ea] text-[#191c1e] text-[12px] font-bold hover:bg-[#e0e3e5] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#004c22]">notifications_active</span>
                      <span>WhatsApp Reminder (+234 905 975 8574)</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </section>

          {/* RIGHT SIDEBAR (4 Columns) - Practicum Log, Digital Vault & Community */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Clinical Practicum & Bedside Rounds Tracker */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eceef0] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] text-[#191c1e] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#004c22]">clinical_notes</span>
                  <span>Ward Practicum Logbook</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#acf770] text-[#397200] text-[11px] font-bold">
                  {loggedCasesCount} / 200 Hrs
                </span>
              </div>

              {/* Practicum Room Photo Thumbnails from User Artifacts */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="relative rounded-lg overflow-hidden aspect-[4/3] group">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Pulse Round Lab"
                    src={IMAGES.lmsPulseLab}
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-semibold">
                    Pulse Round Lab
                  </span>
                </div>
                <div className="relative rounded-lg overflow-hidden aspect-[4/3] group">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Ilorin Ward 2"
                    src={IMAGES.lmsWardTwo}
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-semibold">
                    Ilorin Ward 2
                  </span>
                </div>
              </div>

              {/* Progress Ring Card */}
              <div className="p-3 rounded-lg bg-[#f2f4f6] flex items-center gap-4 mt-1 border border-[#eceef0]">
                <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#e0e3e5] stroke-current"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-[#004c22] stroke-current"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeDasharray={`${Math.min(100, Math.round((loggedCasesCount / 200) * 100))}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute text-[12px] font-bold text-[#004c22]">
                    {Math.min(100, Math.round((loggedCasesCount / 200) * 100))}%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#191c1e] font-bold">
                    {Math.max(0, 200 - loggedCasesCount)} Hours Remaining
                  </span>
                  <span className="text-[11px] text-[#404940]">Target Completion: December 18, 2025</span>
                </div>
              </div>

              {/* Recently Signed Cases */}
              <div className="space-y-1.5 mt-1">
                <span className="text-[11px] text-[#404940] font-bold uppercase tracking-wider block">
                  Recently Verified Cases
                </span>
                <div className="p-2 rounded bg-white shadow-xs border border-[#eceef0] flex items-center justify-between">
                  <div>
                    <span className="text-[12px] font-bold text-[#191c1e] block">Case #2025-084</span>
                    <span className="text-[11px] text-[#404940]">Bilateral Sciatica Electro-Needle (GB30, BL40)</span>
                  </div>
                  <span className="material-symbols-outlined text-[#356b00] text-[20px]" title="Signed by Preceptor">
                    verified
                  </span>
                </div>
                <div className="p-2 rounded bg-white shadow-xs border border-[#eceef0] flex items-center justify-between">
                  <div>
                    <span className="text-[12px] font-bold text-[#191c1e] block">Case #2025-091</span>
                    <span className="text-[11px] text-[#404940]">Moxibustion & Guasha for Amenorrhea</span>
                  </div>
                  <span className="material-symbols-outlined text-[#356b00] text-[20px]" title="Signed by Preceptor">
                    verified
                  </span>
                </div>
              </div>

              <button
                onClick={() => setLogModalOpen(true)}
                className="w-full mt-1 py-2.5 rounded-lg bg-[#166534] text-white hover:bg-[#004c22] text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Log New Patient Bedside Encounter</span>
              </button>
            </div>

            {/* Academic Resource Vault */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eceef0] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] text-[#191c1e] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#004c22]">menu_book</span>
                  <span>Resource Vault</span>
                </h3>
                <span className="text-[11px] text-[#404940]">PDF Repository</span>
              </div>

              <div className="flex flex-col gap-1.5">
                {[
                  { title: 'WHO Benchmark Standards for TCM Training', size: 'PDF • 4.2 MB • Official Guideline' },
                  { title: 'EHMCare Botanical Pharmacopoeia Vol 1', size: 'PDF • 8.7 MB • Compounding Manual' },
                  { title: 'Classical Channel Atlas (English & Latin)', size: 'PDF • 14.1 MB • Full Color Charts' },
                ].map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDownloadFile(`${doc.title}.txt`, `EHMCare Digital Resource Vault: ${doc.title}\nProtected Academic Material for Cohort 2025/2026.`)}
                    className="p-2 rounded-lg hover:bg-[#f2f4f6] transition-colors flex items-center justify-between group text-left cursor-pointer border border-transparent hover:border-[#eceef0]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">picture_as_pdf</span>
                      <div>
                        <span className="text-[12px] font-bold text-[#191c1e] group-hover:text-[#004c22] block">
                          {doc.title}
                        </span>
                        <span className="text-[10px] text-[#404940]">{doc.size}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#404940] group-hover:text-[#004c22] text-[18px]">
                      download
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Peer Forum & Preceptor Q&A */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eceef0] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] text-[#191c1e] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#004c22]">forum</span>
                  <span>Clinical Peer Q&A</span>
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-[#acf770]"></span>
              </div>

              <div className="p-3 rounded-lg bg-[#f2f4f6] space-y-1.5 border border-[#eceef0]">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#e0e3e5] text-[#004c22] text-[10px] font-bold">
                    Acupoint Depth
                  </span>
                  <span className="text-[#404940] text-[10px]">2 hours ago</span>
                </div>
                <h4 className="text-[12px] text-[#191c1e] font-bold">
                  Distinction between CV4 and CV6 needle depth in asthenic elderly patients?
                </h4>
                <p className="text-[11px] text-[#404940] line-clamp-2">
                  Dr. Alaba noted that perpendicular insertion beyond 0.8 cun carries peritoneal risks when severe abdominal wall thinning exists...
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-[#004c22] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">verified_user</span>
                    Preceptor Answered
                  </span>
                  <span className="text-[10px] text-[#404940]">8 replies</span>
                </div>
              </div>

              <button
                onClick={() => alert('Preceptor posting modal opened')}
                className="w-full py-1.5 rounded-lg bg-[#e6e8ea] hover:bg-[#e0e3e5] text-[#191c1e] text-[12px] font-bold transition-colors cursor-pointer"
              >
                Ask a Question in Forum
              </button>
            </div>

            {/* Upcoming OSCE Assessments */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eceef0] flex flex-col gap-2">
              <h3 className="text-[16px] text-[#191c1e] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ba1a1a]">assignment_late</span>
                <span>Upcoming OSCE Assessments</span>
              </h3>

              <div className="space-y-2">
                <div className="flex items-start gap-3 p-2 rounded-lg bg-[#f2f4f6] border border-[#eceef0]">
                  <div className="w-9 h-9 rounded bg-[#e0e3e5] text-[#004c22] font-bold text-[14px] flex flex-col items-center justify-center leading-none shrink-0">
                    <span className="text-[9px] uppercase font-bold text-[#404940]">NOV</span>
                    <span className="text-[14px] font-bold text-[#004c22]">28</span>
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-[#191c1e] block">OSCE Practical Palpation Exam</span>
                    <span className="text-[11px] text-[#404940]">Ilorin Center Clinical Wing • 9:00 AM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2 rounded-lg bg-[#f2f4f6] border border-[#eceef0]">
                  <div className="w-9 h-9 rounded bg-[#e0e3e5] text-[#004c22] font-bold text-[14px] flex flex-col items-center justify-center leading-none shrink-0">
                    <span className="text-[9px] uppercase font-bold text-[#404940]">DEC</span>
                    <span className="text-[14px] font-bold text-[#004c22]">05</span>
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-[#191c1e] block">Botanical Formulation Quiz</span>
                    <span className="text-[11px] text-[#404940]">Online CBT Portal • 60 Minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Bedside Log Modal */}
      {logModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLogModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 flex flex-col gap-4 border border-[#eceef0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004c22] text-[24px]">edit_note</span>
                <h3 className="text-[18px] text-[#191c1e] font-bold">Log Clinical Patient Case</h3>
              </div>
              <button
                className="w-8 h-8 rounded-full hover:bg-[#eceef0] flex items-center justify-center text-[#404940] cursor-pointer"
                onClick={() => setLogModalOpen(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-[13px] text-[#404940]">
              Record supervised clinical rounds at EHMCare clinic for Preceptor verification.
            </p>

            <form className="flex flex-col gap-3" onSubmit={handleLogSubmit}>
              <div>
                <label className="block text-[12px] text-[#191c1e] font-bold mb-1">
                  Patient Identifier (Anonymized) *
                </label>
                <input
                  className="w-full h-11 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#166534] focus:outline-none"
                  placeholder="e.g. Case #2025-103 (45yo M)"
                  required
                  type="text"
                  value={logForm.patientId}
                  onChange={(e) => setLogForm({ ...logForm, patientId: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] text-[#191c1e] font-bold mb-1">Primary Intervention</label>
                  <select
                    className="w-full h-11 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#166534] focus:outline-none"
                    value={logForm.intervention}
                    onChange={(e) => setLogForm({ ...logForm, intervention: e.target.value })}
                  >
                    <option>Clinical Electro-Acupuncture</option>
                    <option>Scalp Neuro-Acupuncture</option>
                    <option>Wet Cupping</option>
                    <option>Botanical Decoction Prescription</option>
                    <option>Moxibustion Therapy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] text-[#191c1e] font-bold mb-1">Clinical Hours</label>
                  <input
                    className="w-full h-11 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#166534] focus:outline-none"
                    max="8"
                    min="1"
                    type="number"
                    value={logForm.hours}
                    onChange={(e) => setLogForm({ ...logForm, hours: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[#191c1e] font-bold mb-1">Acupoints / Decoctions Used</label>
                <input
                  className="w-full h-11 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#166534] focus:outline-none"
                  placeholder="e.g. ST36, SP6, LI4, Du20 (Tonification angle)"
                  type="text"
                  value={logForm.points}
                  onChange={(e) => setLogForm({ ...logForm, points: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[12px] text-[#191c1e] font-bold mb-1">Supervising Clinical Preceptor</label>
                <select
                  className="w-full h-11 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#166534] focus:outline-none"
                  value={logForm.preceptor}
                  onChange={(e) => setLogForm({ ...logForm, preceptor: e.target.value })}
                >
                  <option>Dr. Alaba Emmanuel (Head TCM Physician)</option>
                  <option>Dr. K. S. Adeyemi (Acupuncture Registrar)</option>
                  <option>Sister Bilqis Umar (Clinical Cupping Specialist)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  className="px-4 py-2 rounded-lg bg-[#eceef0] text-[#191c1e] text-[13px] font-semibold cursor-pointer"
                  onClick={() => setLogModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-[#166534] text-white hover:bg-[#004c22] text-[13px] font-bold shadow-xs cursor-pointer transition-colors"
                  type="submit"
                >
                  Submit Case for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
