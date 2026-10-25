import React, { useState } from 'react';
import { NavigationTab } from '../types.ts';
import { IMAGES, CONTACT_INFO } from '../data/content.ts';

interface HeaderProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenBooking: (specialty?: string) => void;
  onOpenEnrollment: (program?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenBooking,
  onOpenEnrollment,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2-line formatted navigation items as requested
  const navTabs: { id: NavigationTab; line1: string; line2: string }[] = [
    { id: 'treatments-and-tcm-care', line1: 'Clinic &', line2: 'Treatment' },
    { id: 'ehmcare-academy', line1: 'EHMCare', line2: 'Academy' },
    { id: 'student-lms-portal', line1: 'Student LMS', line2: 'Portal' },
    { id: 'future-divisions', line1: 'Future', line2: 'Division' },
    { id: 'patient-stories-and-videos', line1: 'Patient Stories', line2: '& Videos' },
    { id: 'investor-and-global-partners', line1: 'Investor &', line2: 'Global Partner' },
  ];

  const handleNavClick = (tabId: NavigationTab) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#ffffff]/98 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eceef0]">
      <div className="h-16 sm:h-20 max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-2 lg:gap-4">
        {/* Brand Lockup: On mobile screens (<sm), show the crisp logo mark alone (which already features EHM Care) to guarantee zero overlap with action buttons */}
        <button
          onClick={() => handleNavClick('treatments-and-tcm-care')}
          className="flex items-center gap-2 text-left focus:outline-none cursor-pointer shrink-0"
        >
          <img
            alt="EHMCare Logo"
            className="h-8 sm:h-10 lg:h-11 w-auto object-contain shrink-0"
            src={IMAGES.logo}
          />
          <div className="hidden sm:flex flex-col min-w-0">
            <span className="font-['Plus_Jakarta_Sans'] text-[16px] lg:text-[18px] text-[#004c22] font-extrabold leading-tight tracking-tight">
              EHMCare
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[9px] lg:text-[10px] text-[#404940] font-bold tracking-wider uppercase leading-none">
              INTEGRATED HEALTHCARE
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation Tabs with 2-Line Text Formatting */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-nowrap">
          {navTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id)}
                className={`flex flex-col items-center justify-center px-2 py-1 xl:px-2.5 xl:py-1.5 text-[11.5px] xl:text-[12.5px] font-semibold leading-tight text-center rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#166534] text-[#93e0a2] font-bold shadow-xs'
                    : 'text-[#404940] hover:text-[#004c22] hover:bg-[#eceef0]/70'
                }`}
              >
                <span className="leading-tight">{tab.line1}</span>
                <span className="leading-tight">{tab.line2}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: 'Enrol in Academy' & 'Book Consultation' (Both 2-Line formatted, zero overflow, no human icon) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Enrol in Academy Button */}
          <button
            onClick={() => onOpenEnrollment()}
            className={`hidden sm:flex flex-col items-center justify-center px-2.5 xl:px-3 py-1.5 rounded-lg text-[11px] xl:text-[12px] font-bold border transition-colors leading-tight text-center cursor-pointer whitespace-nowrap ${
              currentTab === 'enroll-in-academy'
                ? 'bg-[#166534] text-[#acf770] border-[#166534] shadow-xs'
                : 'bg-[#f2f4f6] text-[#004c22] hover:bg-[#e0e3e5] border-[#eceef0]'
            }`}
          >
            <span>Enrol in</span>
            <span className="leading-tight">Academy</span>
          </button>

          {/* Book Consultation Button (No human icon) */}
          <button
            onClick={() => onOpenBooking()}
            className="flex flex-col items-center justify-center px-2.5 sm:px-3.5 xl:px-4 py-1.5 sm:py-2 rounded-lg bg-[#166534] text-[#ffffff] text-[10.5px] sm:text-[12px] xl:text-[12.5px] font-bold hover:bg-[#004c22] transition-all leading-tight text-center shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Book</span>
            <span className="leading-tight">Consultation</span>
          </button>

          {/* Admin Portal Quick Icon */}
          <button
            onClick={() => handleNavClick('admin-portal')}
            className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              currentTab === 'admin-portal'
                ? 'bg-[#004c22] text-[#acf770] shadow-xs'
                : 'text-[#404940] hover:text-[#004c22] hover:bg-[#eceef0]'
            }`}
            title="Admin Dashboard Portal"
            aria-label="Admin Dashboard Portal"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">admin_panel_settings</span>
          </button>

          {/* Mobile/Tablet Menu Button (Visible on screens < lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-[#004c22] hover:bg-[#f2f4f6] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff] border-b border-[#eceef0] px-4 py-3 space-y-2 shadow-lg animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1 pb-2 border-b border-[#eceef0]">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id)}
                className={`text-left px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                  currentTab === tab.id
                    ? 'bg-[#166534] text-[#93e0a2]'
                    : 'text-[#404940] hover:bg-[#f2f4f6]'
                }`}
              >
                <span>{tab.line1} {tab.line2}</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            ))}

            {/* Mobile Enrol in Academy dedicated button */}
            <button
              onClick={() => {
                onOpenEnrollment();
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg text-[13px] font-bold transition-colors flex items-center justify-between cursor-pointer ${
                currentTab === 'enroll-in-academy'
                  ? 'bg-[#166534] text-[#acf770]'
                  : 'bg-[#f2f4f6] text-[#004c22]'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">school</span>
                <span>Enroll in Academy (Admissions)</span>
              </span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>

            {/* Mobile Admin Portal button */}
            <button
              onClick={() => handleNavClick('admin-portal')}
              className={`text-left px-3 py-2 rounded-lg text-[13px] font-bold transition-colors flex items-center justify-between cursor-pointer ${
                currentTab === 'admin-portal'
                  ? 'bg-[#004c22] text-[#acf770]'
                  : 'bg-[#f2f4f6] text-[#004c22]'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                <span>Admin Dashboard Portal</span>
              </span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
              <a
                href={CONTACT_INFO.callHref}
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#f2f4f6] text-[#004c22] font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Call: {CONTACT_INFO.callPhone}</span>
              </a>
              <a
                href={CONTACT_INFO.whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#acf770]/40 text-[#0c2000] font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp: {CONTACT_INFO.whatsAppPhone}</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnrollment();
                }}
                className="py-2.5 rounded-lg bg-[#f2f4f6] text-[#004c22] font-bold text-[12px] text-center cursor-pointer border border-[#eceef0]"
              >
                Enrol in Academy
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="py-2.5 rounded-lg bg-[#166534] text-[#ffffff] font-bold text-[12px] text-center cursor-pointer shadow-sm"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
