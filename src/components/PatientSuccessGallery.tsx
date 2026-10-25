import React, { useState } from 'react';
import bayoIssaThumb from '../assets/images/bayo_issa_testimonial.jpg';
import yunusAbubakarThumb from '../assets/images/yunus_abubakar_testimonial.jpg';
import treatedPatientThumb from '../assets/images/treated_patient_testimonial.jpg';
import comfortWardThumb from '../assets/images/ehmcare_comfort_ward.jpg';
import tcmExpertThumb from '../assets/images/ehmcare_tcm_expert.jpg';
import clinicOverviewThumb from '../assets/images/ehmcare_clinic_overview.jpg';

interface PatientSuccessGalleryProps {
  onOpenVideo?: (title: string, subtitle: string, thumbnail: string, youtubeId?: string, videoUrl?: string) => void;
  onOpenBooking?: (specialty?: string) => void;
  onNavigateToAllStories?: () => void;
  className?: string;
}

import { SuccessStoryItem } from '../types.ts';

interface TestimonialVideoItem {
  id: string;
  category: 'stroke' | 'pain' | 'clinic' | 'spine' | 'infertility';
  title: string;
  patientName: string;
  location: string;
  condition: string;
  recoverySummary: string;
  outcomeBadge: string;
  duration: string;
  thumbnail: string;
  quote: string;
  specialtyId: string;
  dateRecorded: string;
  youtubeId?: string;
  youtubeEmbedUrl?: string;
}

const TESTIMONIAL_VIDEOS: TestimonialVideoItem[] = [
  {
    id: 'bayo-issa-stroke',
    category: 'stroke',
    title: 'Bayo Issa (Sports Journalist): Restored from Inability to Walk to Independent Mobility',
    patientName: 'Bayo Issa',
    location: 'Ilorin Center • Kwara State (Ace Sports Journalist)',
    condition: 'Severe Mobility Impairment & Inability to Walk',
    recoverySummary: 'Doctor-guided neuro-acupuncture, classical botanical pharmacotherapy, and intensive kinetic motor rehabilitation at EHMCare clinic.',
    outcomeBadge: 'Walks Independently',
    duration: 'YouTube Verified',
    thumbnail: bayoIssaThumb,
    youtubeId: 'xaS6cEPk3U4',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/xaS6cEPk3U4?si=k8RYCxwfO_wkvGeG',
    quote:
      'I was a sports journalist who suddenly could not walk at all. Coming to EHMCare was life-changing. With their specialized clinical treatment, I regained my limbs and ability to walk independently. Today I am on my feet and active in my career!',
    specialtyId: 'stroke-rehab',
    dateRecorded: 'EHMCare Official YouTube Channel',
  },
  {
    id: 'yunus-abubakar-pain',
    category: 'pain',
    title: 'Yunus Abubakar: Severe Leg Pain, Soreness & Immobility Reversal in 6 Days',
    patientName: 'Yunus Abubakar',
    location: 'Ilorin Center • Kwara State',
    condition: 'Leg Pain, Severe Soreness & Immobility',
    recoverySummary: 'Targeted integrative acupuncture, classical herbal decoctions, and physical meridian therapy achieving remarkable turnaround in just 6 days.',
    outcomeBadge: 'Relief in 6 Days',
    duration: 'YouTube Verified',
    thumbnail: yunusAbubakarThumb,
    youtubeId: 'HdZcjTvTtVo',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/HdZcjTvTtVo?si=-LTMkoT4S3eXcdom',
    quote:
      'In just six days of treatment at EHMCare, I began to notice real, profound changes in my health and mobility. The severe leg pain and soreness subsided, and I could move freely again.',
    specialtyId: 'orthopedic-tuina',
    dateRecorded: 'EHMCare Official YouTube Channel',
  },
  {
    id: 'treated-needles-acupuncture',
    category: 'pain',
    title: 'Inpatient Clinical Session: "When I Was Being Treated with Needles at EHMCare"',
    patientName: 'Clinical Recovery Patient',
    location: 'EHMCare Inpatient Pavilion • Ilorin',
    condition: 'Meridian Stagnation, Chronic Neuropathy & Pain Management',
    recoverySummary: 'Demonstrating painless micro-needle insertion along restorative meridian points to relieve severe chronic pain, enhance peripheral circulation, and soothe irritated nerve roots.',
    outcomeBadge: 'Painless Technique',
    duration: 'YouTube Verified',
    thumbnail: treatedPatientThumb,
    youtubeId: 'r8qUzdGwHQU',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/r8qUzdGwHQU?si=1WsVhq9EK5dAect_',
    quote:
      'Many patients are nervous about needles before their first session. At EHMCare, our sterile painless needle protocol restores blood circulation, relieves deep seated nerve pressure, and provides instant relief.',
    specialtyId: 'neuro-acupuncture',
    dateRecorded: 'EHMCare Official YouTube Channel',
  },
  {
    id: 'ehmcare-comfort-ward',
    category: 'clinic',
    title: 'Discover Total Comfort at EHMCare: Hospital Suites & Inpatient Wards Tour',
    patientName: 'Clinical Hospital Tour',
    location: 'EHMCare Main Hospital • Ilorin, Kwara State',
    condition: 'Residential Inpatient Care & Sterile Recovery Suites',
    recoverySummary: 'A guided tour through our modern private inpatient wards, climate-controlled rehabilitation rooms, ergonomic therapeutic beds, and patient comfort facilities.',
    outcomeBadge: 'Modern Hospital Suites',
    duration: 'YouTube Verified',
    thumbnail: comfortWardThumb,
    youtubeId: '6kO8ct9TvRk',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/6kO8ct9TvRk',
    quote:
      'True healing requires serenity, dignity, and absolute hygiene. EHMCare provides private recovery rooms with dedicated 24/7 nursing oversight and calm healing environments.',
    specialtyId: 'inpatient-residence',
    dateRecorded: 'EHMCare Official YouTube Channel',
  },
  {
    id: 'ehmcare-tcm-expert',
    category: 'clinic',
    title: 'Natural Healing with TCM Expert: Classical Pulse & Tongue Diagnostics',
    patientName: 'Consultant Clinical Demonstration',
    location: 'EHMCare Diagnostic Consulting Suites',
    condition: 'Comprehensive Root-Cause Health Assessment',
    recoverySummary: 'Clinical presentation of centuries-proven Traditional Chinese Medicine diagnostic methods: multi-position radial pulse palpation, tongue mapping, and customized botanical formulations.',
    outcomeBadge: 'Certified Specialist',
    duration: 'YouTube Verified',
    thumbnail: tcmExpertThumb,
    youtubeId: 'VH8cubbUZmg',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/VH8cubbUZmg',
    quote:
      'Rather than masking symptoms with temporary painkillers, our TCM diagnostic consultations pinpoint internal organ disharmonies and formulate precise botanical therapies for lasting recovery.',
    specialtyId: 'holistic-diagnostics',
    dateRecorded: 'EHMCare Official YouTube Channel',
  },
  {
    id: 'ehmcare-clinic-dispensary',
    category: 'clinic',
    title: 'EHMCare Clinic: Holistic & Chinese Medicine Hospital in Ilorin, Kwara State',
    patientName: 'Institution Overview',
    location: '7 Sofoluwe Street, Sabo-Oke, Ilorin',
    condition: 'Integrative Chinese & Complementary Healthcare',
    recoverySummary: 'A comprehensive view of the accredited EHMCare clinical center in Ilorin, featuring the GMP-certified herbal dispensary, electro-acupuncture bays, and recovery suites.',
    outcomeBadge: 'Accredited Center',
    duration: 'YouTube Verified',
    thumbnail: clinicOverviewThumb,
    youtubeId: 'lzvdkYdWPJk',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/lzvdkYdWPJk',
    quote:
      'Welcome to EHMCare Clinic, Nigeria’s premier center for authentic Traditional Chinese Medicine, restorative acupuncture, and natural healing in Ilorin and Abuja.',
    specialtyId: 'botanical-pharmacology',
    dateRecorded: 'EHMCare Official YouTube Channel',
  },
];

import { getSuccessStories } from '../utils/clinicContentStore.ts';

type GalleryCategory = 'all' | 'stroke' | 'pain' | 'clinic';

export const PatientSuccessGallery: React.FC<PatientSuccessGalleryProps> = ({
  onOpenVideo,
  onOpenBooking,
  onNavigateToAllStories,
  className = '',
}) => {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all');
  const allStories = getSuccessStories().filter((v) => v.visible !== false);
  const [activeVideoId, setActiveVideoId] = useState<string>(
    allStories[0]?.id || 'bayo-issa-stroke'
  );

  const filteredVideos =
    activeFilter === 'all'
      ? allStories
      : allStories.filter((v) => v.category === activeFilter);

  const featuredVideo =
    allStories.find((v) => v.id === activeVideoId) || allStories[0] || TESTIMONIAL_VIDEOS[0];

  const handlePlayVideo = (video: TestimonialVideoItem | SuccessStoryItem) => {
    setActiveVideoId(video.id);
    if (onOpenVideo) {
      onOpenVideo(
        video.title,
        `${video.patientName} • ${video.condition} (${video.location})`,
        video.thumbnail,
        video.youtubeId,
        (video as any).videoUrl
      );
    }
  };

  return (
    <section className={`w-full bg-[#f2f4f6] py-12 sm:py-16 md:py-20 border-t border-[#eceef0] relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#acf770] text-[#0c2000] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <span className="material-symbols-outlined text-[16px]">smart_display</span>
              <span>Documented Evidence & Real Patient Testimonials</span>
            </div>
            <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#004c22] tracking-tight leading-tight">
              Patient Success Video Gallery
            </h2>
            <p className="text-[14px] sm:text-[16px] text-[#404940] mt-2 max-w-2xl leading-relaxed">
              Watch authentic, unscripted recovery journeys, inpatient treatment sessions, and clinical walkthroughs across our Ilorin hospital pavilion and Abuja center.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-[12px] font-bold shrink-0 w-full md:w-auto -mx-1 px-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'all'
                  ? 'bg-[#004c22] text-[#ffffff] shadow-sm'
                  : 'bg-[#ffffff] text-[#404940] border border-[#e0e3e5] hover:bg-[#e8ecef]'
              }`}
            >
              All Videos ({TESTIMONIAL_VIDEOS.length})
            </button>
            <button
              onClick={() => setActiveFilter('stroke')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'stroke'
                  ? 'bg-[#004c22] text-[#ffffff] shadow-sm'
                  : 'bg-[#ffffff] text-[#404940] border border-[#e0e3e5] hover:bg-[#e8ecef]'
              }`}
            >
              Stroke & Mobility
            </button>
            <button
              onClick={() => setActiveFilter('pain')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'pain'
                  ? 'bg-[#004c22] text-[#ffffff] shadow-sm'
                  : 'bg-[#ffffff] text-[#404940] border border-[#e0e3e5] hover:bg-[#e8ecef]'
              }`}
            >
              Acupuncture & Pain Relief
            </button>
            <button
              onClick={() => setActiveFilter('clinic')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'clinic'
                  ? 'bg-[#004c22] text-[#ffffff] shadow-sm'
                  : 'bg-[#ffffff] text-[#404940] border border-[#e0e3e5] hover:bg-[#e8ecef]'
              }`}
            >
              Hospital Suites & Clinic Tour
            </button>
          </div>
        </div>

        {/* Featured Video Showcase & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Main Featured Cinema Card */}
          <div className="lg:col-span-7 bg-[#ffffff] rounded-3xl overflow-hidden shadow-lg border border-[#eceef0] flex flex-col group">
            {/* Main Cinema Video Canvas: Iframe Embed for YouTube or Custom Player */}
            {featuredVideo.youtubeEmbedUrl ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <iframe
                  className="w-full h-full border-0"
                  src={featuredVideo.youtubeEmbedUrl}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                onClick={() => handlePlayVideo(featuredVideo)}
                className="relative aspect-[16/9] w-full overflow-hidden bg-[#191c1e] cursor-pointer"
              >
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"></div>

                {/* Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#004c22]/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#166534] transition-all border-2 border-[#acf770]/60">
                    <span className="material-symbols-outlined text-[36px] sm:text-[44px] text-[#acf770] pl-1">
                      play_arrow
                    </span>
                  </div>
                </div>

                {/* Badges on Video */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#004c22]/90 backdrop-blur-md text-[#acf770] text-[11px] font-bold uppercase tracking-wider border border-[#acf770]/30 shadow-md">
                    Featured Case Study
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#acf770]">schedule</span>
                    <span>{featuredVideo.duration}</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-[12px]">
                  <span className="font-bold bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md">
                    {featuredVideo.patientName} • {featuredVideo.condition}
                  </span>
                  <span className="text-[#acf770] font-bold hidden sm:inline-flex items-center gap-1">
                    <span>Click to Watch Full Video</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </span>
                </div>
              </div>
            )}

            {/* Video Details Bar */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e8f5e9] text-[#004c22] text-[11px] font-extrabold uppercase tracking-wider">
                    {featuredVideo.outcomeBadge}
                  </span>
                  <span className="text-[12px] text-[#6b7280]">
                    {featuredVideo.location}
                  </span>
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#191c1e] leading-snug">
                  "{featuredVideo.title}"
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#404940] mt-2 italic leading-relaxed">
                  "{featuredVideo.quote}"
                </p>
                <div className="mt-3 p-3 rounded-xl bg-[#f7f9fb] border border-[#eceef0] text-[12px] text-[#404940]">
                  <span className="font-bold text-[#191c1e]">Clinical Course: </span>
                  {featuredVideo.recoverySummary}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#f0f2f4]">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    onClick={() => handlePlayVideo(featuredVideo)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#004c22] text-white font-bold text-[13px] hover:bg-[#166534] transition-all cursor-pointer shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#acf770]">smart_display</span>
                    <span>{featuredVideo.youtubeId ? 'Enlarge Player' : `Play Verified Testimony (${featuredVideo.duration})`}</span>
                  </button>

                  {featuredVideo.youtubeId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FF0000] text-white text-[12.5px] font-bold hover:bg-[#cc0000] transition-colors shadow-xs"
                      title="Watch on official YouTube channel"
                    >
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>YouTube Channel</span>
                    </a>
                  )}
                </div>

                {onOpenBooking && (
                  <button
                    onClick={() => onOpenBooking(featuredVideo.specialtyId)}
                    className="inline-flex items-center justify-center sm:justify-start gap-1 text-[13px] font-bold text-[#004c22] hover:text-[#166534] hover:underline cursor-pointer py-1"
                  >
                    <span>Consult for Similar Condition</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Other Video Testimonies List */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            <div className="flex items-center justify-between mb-1 px-1">
              <h4 className="text-[14px] sm:text-[15px] font-bold text-[#004c22] uppercase tracking-wide flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">video_library</span>
                <span>Select Patient Testimony Video</span>
              </h4>
              <span className="text-[12px] text-[#6b7280]">
                {filteredVideos.length} Cases
              </span>
            </div>

            {filteredVideos.map((video) => {
              const isSelected = video.id === featuredVideo.id;
              return (
                <div
                  key={video.id}
                  onClick={() => handlePlayVideo(video)}
                  className={`p-3 sm:p-4 rounded-2xl transition-all cursor-pointer flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center border ${
                    isSelected
                      ? 'bg-[#ffffff] border-[#004c22] shadow-md ring-1 ring-[#004c22]/20'
                      : 'bg-[#ffffff] border-[#eceef0] hover:border-[#004c22]/40 hover:bg-[#fcfdfd]'
                  }`}
                >
                  {/* Video Thumbnail with Mini Play Badge */}
                  <div className="relative w-full sm:w-32 aspect-[16/10] rounded-xl overflow-hidden bg-[#191c1e] shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.patientName}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#004c22]/90 text-[#acf770] flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-[18px] pl-0.5">play_arrow</span>
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-sm bg-black/75 text-white text-[9.5px] font-bold">
                      {video.duration}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 min-w-0 w-full sm:w-auto">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#e8f5e9] text-[#004c22] text-[9.5px] font-extrabold uppercase tracking-wider">
                        {video.outcomeBadge}
                      </span>
                      <span className="text-[10.5px] text-[#8e9193] truncate">
                        {video.dateRecorded}
                      </span>
                    </div>

                    <h5 className="text-[13.5px] font-bold text-[#191c1e] leading-snug line-clamp-2">
                      {video.title}
                    </h5>

                    <p className="text-[11.5px] text-[#404940] mt-0.5 truncate">
                      {video.patientName} • {video.condition}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Bottom Archive Link */}
            {onNavigateToAllStories && (
              <div className="pt-2">
                <button
                  onClick={onNavigateToAllStories}
                  className="w-full py-3 rounded-xl bg-white border border-[#e0e3e5] text-[#004c22] font-bold text-[13px] hover:bg-[#f7f9fb] hover:border-[#004c22] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Explore Complete Patient Video Archive</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Verified Medical Oversight Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#ffffff] border border-[#eceef0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#acf770]/40 text-[#004c22] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#191c1e]">
                100% Verified Clinical Patient Case Logs
              </p>
              <p className="text-[11px] text-[#6b7280]">
                All testimonials and recoveries documented with clinical preceptor oversight, pre/post neurological assessments, and radiological reports.
              </p>
            </div>
          </div>

          {onOpenBooking && (
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 rounded-xl bg-[#004c22] text-white text-[12px] font-bold hover:bg-[#166534] transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              Schedule Clinical Evaluation
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
