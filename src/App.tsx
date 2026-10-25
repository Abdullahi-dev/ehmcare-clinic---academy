/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab } from './types.ts';
import { TopBar } from './components/TopBar.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { TreatmentsView } from './components/TreatmentsView.tsx';
import { AcademyView } from './components/AcademyView.tsx';
import { FutureDivisionsView } from './components/FutureDivisionsView.tsx';
import { StudentLmsPortalView } from './components/StudentLmsPortalView.tsx';
import { PatientStoriesView } from './components/PatientStoriesView.tsx';
import { InvestorPartnersView } from './components/InvestorPartnersView.tsx';
import { ConsultationModal } from './components/ConsultationModal.tsx';
import { EnrollmentModal } from './components/EnrollmentModal.tsx';
import { VideoModal } from './components/VideoModal.tsx';
import { InvestorDeckModal } from './components/InvestorDeckModal.tsx';
import { EnrollAcademyView } from './components/EnrollAcademyView.tsx';
import { AdminPortalView } from './components/AdminPortalView.tsx';

const VALID_TABS: NavigationTab[] = [
  'treatments-and-tcm-care',
  'ehmcare-academy',
  'student-lms-portal',
  'future-divisions',
  'patient-stories-and-videos',
  'investor-and-global-partners',
  'enroll-in-academy',
  'admin-portal',
];

const TAB_TITLES: Record<NavigationTab, string> = {
  'treatments-and-tcm-care': 'EHMCare Clinic & Treatments | Integrative Chinese Medicine & Stroke Rehab',
  'ehmcare-academy': 'EHMCare Clinical Academy | Certified Healthcare Training & Fellowships',
  'student-lms-portal': 'Student LMS Portal | Digital Curriculum & Clinical Video Lectures',
  'future-divisions': 'Future Hospital Divisions | 120-Bed Inpatient Campus & Diagnostic Center',
  'patient-stories-and-videos': 'Patient Success Stories & Clinical Video Case Studies | EHMCare',
  'investor-and-global-partners': 'Investor & Global Partners | Healthcare Expansion & Medical Tourism',
  'enroll-in-academy': 'Enroll in EHMCare Academy | Clinical Admissions & Application',
  'admin-portal': 'EHMCare Institutional Admin Portal | Operations Management',
};

function getInitialTab(): NavigationTab {
  if (typeof window === 'undefined') return 'treatments-and-tcm-care';
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab') as NavigationTab;
  if (tabParam && VALID_TABS.includes(tabParam)) {
    return tabParam;
  }
  const hash = window.location.hash.replace('#', '') as NavigationTab;
  if (hash && VALID_TABS.includes(hash)) {
    return hash;
  }
  return 'treatments-and-tcm-care';
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>(getInitialTab);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSpecialty, setBookingSpecialty] = useState<string | undefined>(undefined);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [enrollmentProgram, setEnrollmentProgram] = useState<string | undefined>(undefined);
  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoData, setVideoData] = useState<{
    title: string;
    subtitle: string;
    thumbnail: string;
    youtubeId?: string;
    videoUrl?: string;
  }>({
    title: '',
    subtitle: '',
    thumbnail: '',
    youtubeId: undefined,
    videoUrl: undefined,
  });

  // Keep URL query string synced with active tab and update SEO page title
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (currentTab === 'treatments-and-tcm-care') {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', currentTab);
    }
    window.history.replaceState({}, '', url.toString());

    // Dynamic Title for SEO
    if (TAB_TITLES[currentTab]) {
      document.title = TAB_TITLES[currentTab];
    }
  }, [currentTab]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const tab = getInitialTab();
      setCurrentTab(tab);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenBooking = (specialty?: string) => {
    setBookingSpecialty(specialty);
    setBookingModalOpen(true);
  };

  const handleOpenEnrollment = (program?: string) => {
    setEnrollmentProgram(program);
    setCurrentTab('enroll-in-academy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVideo = (
    title: string,
    subtitle: string,
    thumbnail: string,
    youtubeId?: string,
    videoUrl?: string
  ) => {
    setVideoData({ title, subtitle, thumbnail, youtubeId, videoUrl });
    setVideoModalOpen(true);
  };

  const isAdminPortal = currentTab === 'admin-portal';

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#acf770] selection:text-[#0c2000] overflow-x-hidden w-full max-w-full">
      {/* 1. Global Announcement Ticker (Hidden on Admin Portal) */}
      {!isAdminPortal && <TopBar />}

      {/* 2. Institutional Sticky Header (Hidden on Admin Portal) */}
      {!isAdminPortal && (
        <Header
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onOpenBooking={handleOpenBooking}
          onOpenEnrollment={handleOpenEnrollment}
        />
      )}

      {/* 3. Main Views */}
      <main className="w-full bg-[#f7f9fb] flex-1">
        {currentTab === 'treatments-and-tcm-care' && (
          <TreatmentsView
            onOpenBooking={handleOpenBooking}
            onOpenVideo={handleOpenVideo}
            onNavigateToStories={() => {
              setCurrentTab('patient-stories-and-videos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'ehmcare-academy' && (
          <AcademyView
            onOpenEnrollment={handleOpenEnrollment}
            onOpenVideo={handleOpenVideo}
          />
        )}

        {currentTab === 'enroll-in-academy' && (
          <EnrollAcademyView
            initialProgram={enrollmentProgram}
            onNavigateToAcademy={() => {
              setCurrentTab('ehmcare-academy');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentTab === 'student-lms-portal' && (
          <StudentLmsPortalView
            onOpenVideo={handleOpenVideo}
          />
        )}

        {currentTab === 'future-divisions' && (
          <FutureDivisionsView
            onOpenInvestorDeck={() => setDeckModalOpen(true)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentTab === 'patient-stories-and-videos' && (
          <PatientStoriesView
            onOpenBooking={handleOpenBooking}
            onOpenVideo={handleOpenVideo}
          />
        )}

        {currentTab === 'investor-and-global-partners' && (
          <InvestorPartnersView
            onOpenDeck={() => setDeckModalOpen(true)}
          />
        )}

        {currentTab === 'admin-portal' && (
          <AdminPortalView
            onNavigateHome={() => {
              setCurrentTab('treatments-and-tcm-care');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenVideo={handleOpenVideo}
          />
        )}
      </main>

      {/* 4. Institutional 5-Column Footer (Hidden on Admin Portal) */}
      {!isAdminPortal && (
        <Footer
          onNavigate={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenBooking={() => handleOpenBooking()}
          onOpenEnrollment={() => handleOpenEnrollment()}
        />
      )}

      {/* 5. Floating WhatsApp Support Button (Hidden on Admin Portal) */}
      {!isAdminPortal && (
        <div className="fixed bottom-6 right-6 z-40">
          <a
            href="https://wa.me/2349059758574?text=Hello%20EHMCare%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#20ba5a] transition-all cursor-pointer ring-4 ring-white/70 active:scale-95"
            title="Chat with EHMCare on WhatsApp (+234 905 975 8574)"
            aria-label="Chat with EHMCare on WhatsApp"
          >
            <svg
              className="w-8 h-8 fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.7C7.02 10.92 7.91 12.09 8.03 12.25C8.16 12.41 9.77 14.9 12.26 15.97C14.33 16.86 14.75 16.68 15.2 16.64C15.65 16.6 16.65 16.05 16.86 15.46C17.07 14.87 17.07 14.36 17.01 14.25C16.95 14.15 16.79 14.09 16.54 13.96C16.29 13.84 15.07 13.24 14.84 13.15C14.62 13.07 14.45 13.03 14.29 13.28C14.12 13.52 13.65 14.09 13.5 14.25C13.36 14.42 13.21 14.44 12.97 14.32C12.72 14.19 11.92 13.93 10.97 13.09C10.24 12.43 9.74 11.62 9.6 11.37C9.46 11.13 9.58 11 9.71 10.88C9.82 10.77 9.96 10.59 10.08 10.44C10.21 10.3 10.25 10.19 10.33 10.03C10.41 9.86 10.37 9.72 10.31 9.6C10.25 9.48 9.77 8.31 9.57 7.82C9.37 7.35 9.17 7.41 9.02 7.41C8.88 7.4 8.71 7.33 8.53 7.33Z" />
            </svg>
          </a>
        </div>
      )}

      {/* 6. Interactive Dialogs & Overlays */}
      <ConsultationModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialSpecialty={bookingSpecialty}
      />

      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        initialProgram={enrollmentProgram}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title={videoData.title}
        subtitle={videoData.subtitle}
        thumbnailUrl={videoData.thumbnail}
        youtubeId={videoData.youtubeId}
        videoUrl={videoData.videoUrl}
      />

      <InvestorDeckModal
        isOpen={deckModalOpen}
        onClose={() => setDeckModalOpen(false)}
      />
    </div>
  );
}
