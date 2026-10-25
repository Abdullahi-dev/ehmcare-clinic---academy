import React from 'react';
import { CONTACT_INFO } from '../data/content.ts';

export const TopBar: React.FC = () => {
  return (
    <div className="w-full bg-[#004c22] text-[#ffffff] py-1.5 sm:py-2 px-3 sm:px-4 lg:px-8 text-center text-[10.5px] sm:text-[11px] font-bold tracking-wide z-50 relative border-b border-[#166534]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-1.5 flex-wrap">
        <div className="flex items-center gap-1.5 text-[#acf770]">
          <span className="material-symbols-outlined text-[15px] leading-none">verified</span>
          <span className="text-white">Integrative TCM & Naturopathic Clinical Excellence</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#acf770] text-[15px] leading-none">call</span>
          <span>
            Call Helpline:{' '}
            <a href={CONTACT_INFO.callHref} className="hover:underline text-[#acf770] font-extrabold">
              {CONTACT_INFO.callPhone}
            </a>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#acf770] text-[15px] leading-none">chat</span>
          <span>
            WhatsApp:{' '}
            <a
              href={CONTACT_INFO.whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#acf770] font-extrabold"
            >
              {CONTACT_INFO.whatsAppPhone}
            </a>
          </span>
        </div>
        <span className="hidden sm:inline text-white/70">| Ilorin & Abuja</span>
      </div>
    </div>
  );
};
