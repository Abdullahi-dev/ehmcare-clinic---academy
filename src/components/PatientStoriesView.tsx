import React, { useState } from 'react';
import bayoIssaThumb from '../assets/images/bayo_issa_testimonial.jpg';
import yunusAbubakarThumb from '../assets/images/yunus_abubakar_testimonial.jpg';
import treatedPatientThumb from '../assets/images/treated_patient_testimonial.jpg';
import comfortWardThumb from '../assets/images/ehmcare_comfort_ward.jpg';
import tcmExpertThumb from '../assets/images/ehmcare_tcm_expert.jpg';
import clinicOverviewThumb from '../assets/images/ehmcare_clinic_overview.jpg';
import { getSuccessStories } from '../utils/clinicContentStore.ts';

interface PatientStoriesViewProps {
  onOpenBooking: (specialty?: string) => void;
  onOpenVideo: (title: string, subtitle: string, thumb: string, youtubeId?: string, videoUrl?: string) => void;
}

export const PatientStoriesView: React.FC<PatientStoriesViewProps> = ({
  onOpenBooking,
  onOpenVideo,
}) => {
  const [filter, setFilter] = useState('all');
  const liveStories = getSuccessStories().filter((s) => s.visible !== false);

  const stories = [
    {
      id: 'bayo-issa',
      category: 'stroke',
      title: 'Bayo Issa (Sports Journalist): Restored from Inability to Walk to Independent Ambulation',
      patient: 'Bayo Issa',
      location: 'Ilorin, Kwara State (Ace Sports Journalist)',
      condition: 'Severe Mobility Impairment & Inability to Walk',
      recoveryTime: 'Full Clinical Course',
      improvement: 'Walking Independently',
      thumbnail: bayoIssaThumb,
      videoDuration: 'YouTube Verified',
      youtubeId: 'xaS6cEPk3U4',
      quote:
        'I was a sports journalist who suddenly could not walk at all. Coming to EHMCare changed everything. With their specialized clinical treatment, I regained my limbs and ability to walk independently. Today I am on my feet and active in my career!',
      timeline: [
        { week: 'Onset', note: 'Severe neuromuscular weakness, complete inability to stand or walk.' },
        { week: 'Phase 1', note: 'Acupuncture meridian opening and bio-energetic nerve stimulation.' },
        { week: 'Recovery', note: 'Full independent walking restored, back to sports journalism duties.' },
      ],
    },
    {
      id: 'yunus-abubakar',
      category: 'spine',
      title: 'Yunus Abubakar: Severe Leg Pain, Soreness & Immobility Reversal in 6 Days',
      patient: 'Yunus Abubakar',
      location: 'Ilorin Center • Kwara State',
      condition: 'Leg Pain, Severe Soreness & Immobility',
      recoveryTime: '6 Days Protocol',
      improvement: 'Rapid Relief in 6 Days',
      thumbnail: yunusAbubakarThumb,
      videoDuration: 'YouTube Verified',
      youtubeId: 'HdZcjTvTtVo',
      quote:
        'In just six days of treatment at EHMCare, I began to notice real, profound changes in my health and mobility. The severe leg pain and soreness subsided, and I could move freely again.',
      timeline: [
        { week: 'Day 1', note: 'Severe debilitating leg pain, muscle soreness, extreme difficulty moving.' },
        { week: 'Day 3', note: 'Significant reduction in acute soreness following acupuncture and herbals.' },
        { week: 'Day 6', note: 'Profound change in mobility, independent walking, and overall well-being restored.' },
      ],
    },
    {
      id: 'treated-needles-acupuncture',
      category: 'spine',
      title: 'Inpatient Clinical Session: "When I Was Being Treated with Needles at EHMCare"',
      patient: 'Clinical Recovery Patient',
      location: 'EHMCare Inpatient Pavilion • Ilorin',
      condition: 'Meridian Stagnation, Chronic Neuropathy & Pain Management',
      recoveryTime: 'Active Inpatient Protocol',
      improvement: 'Painless Technique & Relief',
      thumbnail: treatedPatientThumb,
      videoDuration: 'YouTube Verified',
      youtubeId: 'r8qUzdGwHQU',
      quote:
        'Many patients are nervous about needles before their first session. At EHMCare, our sterile painless needle protocol restores blood circulation, relieves deep seated nerve pressure, and provides instant relief.',
      timeline: [
        { week: 'Session 1', note: 'Sterile meridian micro-puncture targeting nerve root inflammation.' },
        { week: 'Mid-Session', note: 'Immediate sensation of energetic unblocking and muscular release.' },
        { week: 'Post-Care', note: 'Nerve transmission normalized, zero residual soreness or discomfort.' },
      ],
    },
    {
      id: 'ehmcare-comfort-ward',
      category: 'clinic',
      title: 'Discover Total Comfort at EHMCare: Hospital Suites & Inpatient Wards Tour',
      patient: 'EHMCare Hospital Tour',
      location: 'Main Hospital Pavilion • Ilorin, Kwara State',
      condition: 'Residential Inpatient Care & Sterile Recovery Suites',
      recoveryTime: '24/7 Clinical Oversight',
      improvement: 'Serene Healing Environment',
      thumbnail: comfortWardThumb,
      videoDuration: 'YouTube Verified',
      youtubeId: '6kO8ct9TvRk',
      quote:
        'True healing requires serenity, dignity, and absolute hygiene. EHMCare provides private recovery rooms with dedicated 24/7 nursing oversight and calm healing environments.',
      timeline: [
        { week: 'Admission', note: 'Personalized private suite intake and initial clinical assessment.' },
        { week: 'Residence', note: '24/7 round-the-clock vital signs monitoring and botanical administration.' },
        { week: 'Discharge', note: 'Post-inpatient follow-up plan and at-home maintenance protocols.' },
      ],
    },
    {
      id: 'ehmcare-tcm-expert',
      category: 'clinic',
      title: 'Natural Healing with TCM Expert: Classical Pulse & Tongue Diagnostics',
      patient: 'Consultant Clinical Demonstration',
      location: 'EHMCare Diagnostic Consulting Suites',
      condition: 'Root-Cause Health Assessment',
      recoveryTime: 'Diagnostic Consultation',
      improvement: 'Precise Botanical Formulations',
      thumbnail: tcmExpertThumb,
      videoDuration: 'YouTube Verified',
      youtubeId: 'VH8cubbUZmg',
      quote:
        'Rather than masking symptoms with temporary painkillers, our TCM diagnostic consultations pinpoint internal organ disharmonies and formulate precise botanical therapies for lasting recovery.',
      timeline: [
        { week: 'Step 1', note: 'Multi-position radial pulse palpation assessing internal organ qi.' },
        { week: 'Step 2', note: 'Tongue topography mapping for systemic dampness, heat, and stagnation.' },
        { week: 'Step 3', note: 'Bespoke compounding of GMP-certified botanical extract granules.' },
      ],
    },
    {
      id: 'ehmcare-clinic-dispensary',
      category: 'clinic',
      title: 'EHMCare Clinic: Holistic & Chinese Medicine Hospital in Ilorin, Kwara State',
      patient: 'Institution Overview',
      location: '7 Sofoluwe Street, Sabo-Oke, Ilorin',
      condition: 'Integrative Chinese & Complementary Healthcare',
      recoveryTime: 'Comprehensive Clinical Facility',
      improvement: 'Accredited Center of Excellence',
      thumbnail: clinicOverviewThumb,
      videoDuration: 'YouTube Verified',
      youtubeId: 'lzvdkYdWPJk',
      quote:
        'Welcome to EHMCare Clinic, Nigeria’s premier center for authentic Traditional Chinese Medicine, restorative acupuncture, and natural healing in Ilorin and Abuja.',
      timeline: [
        { week: 'Facility', note: 'Sterile electro-acupuncture bays and specialized consultation suites.' },
        { week: 'Pharmacy', note: 'Licensed botanical dispensary containing over 300 medicinal herbs.' },
        { week: 'Academy', note: 'West African training institution for certified clinical acupuncturists.' },
      ],
    },
  ];

  // Merge any custom stories created from admin dashboard
  const customStoriesFormatted = liveStories
    .filter((s) => s.isCustom)
    .map((s) => ({
      id: s.id,
      category: s.category === 'spine' || s.category === 'pain' ? 'spine' : s.category,
      title: s.title,
      patient: s.patientName,
      location: s.location,
      condition: s.condition,
      recoveryTime: s.duration || 'Verified Clinical Course',
      improvement: s.outcomeBadge,
      thumbnail: s.thumbnail,
      videoDuration: s.duration || 'YouTube Verified',
      youtubeId: s.youtubeId,
      videoUrl: s.videoUrl,
      quote: s.quote,
      timeline: [
        { week: 'Diagnosis', note: s.condition },
        { week: 'Clinical Protocol', note: s.recoverySummary },
        { week: 'Outcome', note: s.outcomeBadge },
      ],
    }));

  const combinedStories = [...customStoriesFormatted, ...stories];

  const filteredStories =
    filter === 'all'
      ? combinedStories
      : combinedStories.filter((s) => s.category === filter);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f2f4f6] to-[#f7f9fb] py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#eceef0]">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a6f4b5] text-[#00210b] text-[11px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Clinical Evidence & Patient Video Library</span>
          </div>

          <h1 className="text-[26px] sm:text-[34px] lg:text-[40px] text-[#004c22] font-extrabold max-w-3xl leading-tight">
            Documented Clinical Transformations & Patient Testimonials
          </h1>

          <p className="text-[15px] sm:text-[17px] text-[#404940] max-w-2xl leading-relaxed">
            Real video documentaries, doctor case reviews, inpatient sessions, and hospital tours recorded across our Ilorin hospital pavilion and Abuja center.
          </p>

          {/* Interactive Condition Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 w-full">
            {[
              { id: 'all', label: `All Case Videos (${stories.length})` },
              { id: 'stroke', label: 'Stroke & Neuromuscular Rehab' },
              { id: 'spine', label: 'Spine & Pain Relief' },
              { id: 'clinic', label: 'Hospital Suites & Diagnostics' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-[12px] sm:text-[13px] font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#004c22] text-[#ffffff] shadow-sm ring-2 ring-[#acf770]/40'
                    : 'bg-[#ffffff] text-[#404940] hover:bg-[#eceef0] border border-[#eceef0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-14 px-4 lg:px-10 bg-[#f7f9fb]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-[#ffffff] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#eceef0] overflow-hidden flex flex-col"
            >
              {/* Video Thumbnail Preview */}
              <div
                className="relative h-60 w-full overflow-hidden bg-[#e0e3e5] group cursor-pointer"
                onClick={() => onOpenVideo(story.title, `${story.patient} • ${story.location}`, story.thumbnail, story.youtubeId)}
              >
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute top-3 left-3 bg-[#004c22]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">videocam</span>
                  <span>Verified Video Case</span>
                </div>

                <span className="absolute top-3 right-3 bg-black/70 text-white font-mono text-[11px] px-2 py-0.5 rounded">
                  {story.videoDuration}
                </span>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#acf770] text-[#0c2000] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[32px]">play_arrow</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-[12px] font-bold text-[#acf770]">{story.patient} • {story.location}</p>
                  <p className="text-[11px] text-white/80">{story.condition}</p>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-3">
                  <h3 className="text-[20px] font-bold text-[#004c22] leading-snug">
                    "{story.title}"
                  </h3>
                  <p className="text-[14px] text-[#404940] italic leading-relaxed">
                    "{story.quote}"
                  </p>

                  {/* Recovery Metric Strip */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 rounded-lg bg-[#f2f4f6] border border-[#eceef0]">
                      <span className="text-[10px] text-[#404940] font-bold uppercase">Clinical Duration</span>
                      <p className="text-[14px] font-bold text-[#191c1e]">{story.recoveryTime}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#acf770]/30 border border-[#acf770]/50">
                      <span className="text-[10px] text-[#397200] font-bold uppercase">Documented Gain</span>
                      <p className="text-[14px] font-bold text-[#004c22]">{story.improvement}</p>
                    </div>
                  </div>

                  {/* Timeline progression */}
                  <div className="space-y-1.5 pt-2 text-[12px] text-[#404940]">
                    <span className="font-bold text-[#191c1e] text-[11px] uppercase tracking-wide">
                      Clinical Progression Notes:
                    </span>
                    {story.timeline.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-[#004c22] shrink-0">{step.week}:</span>
                        <span>{step.note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-[#eceef0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenVideo(story.title, `${story.patient} • ${story.location}`, story.thumbnail, story.youtubeId, (story as any).videoUrl)}
                    className="text-[#004c22] text-[13px] font-bold flex items-center justify-center sm:justify-start gap-1.5 hover:underline cursor-pointer py-1"
                  >
                    <span>Watch Full Case Video</span>
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const specialtyMap: Record<string, string> = {
                        stroke: 'stroke-rehab',
                        spine: 'orthopedic-tuina',
                        clinic: 'inpatient-residence',
                      };
                      onOpenBooking(specialtyMap[story.category] || 'neuro-acupuncture');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#166534] text-white font-bold text-[12.5px] hover:bg-[#004c22] transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Inquire for Similar Case</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Triage Callout Banner */}
      <section className="bg-[#004c22] text-white py-12 px-4 lg:px-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-[#acf770] text-[#0c2000] text-[11px] font-bold uppercase">
            Have a Complex Medical Case?
          </span>
          <h2 className="text-[28px] font-bold leading-tight">
            Consult Directly with Our Senior TCM Diagnostic Team
          </h2>
          <p className="text-[15px] text-[#93e0a2] max-w-xl">
            Whether in-clinic at our Ilorin hospital suite or via tele-medicine from any state in Nigeria, our doctors review your historical MRI, CT scans, and vitals.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 rounded-lg bg-white text-[#004c22] font-bold text-[14px] hover:bg-[#eceef0] shadow-md cursor-pointer"
            >
              Book Clinical Evaluation
            </button>
            <a
              href="tel:+2349015184004"
              className="px-6 py-3 rounded-lg bg-[#166534] text-white font-bold text-[14px] hover:bg-[#00210b] flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Emergency Triage: 0901 518 4004</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
