import React, { useState, useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  thumbnailUrl: string;
  youtubeId?: string;
  videoUrl?: string;
  duration?: string;
  description?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  thumbnailUrl,
  youtubeId,
  videoUrl,
  duration = '18:42',
  description = 'Recorded live at EHMCare Saboke Training Hall & Clinical Suites with verified patient case study and meridian mapping breakdown.',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);

  // Close on Escape key and prevent body scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      {/* 1. Global Floating Top-Right Close Button (ALWAYS VISIBLE & CANCELABLE) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/80 hover:bg-white text-white hover:text-black border border-white/20 shadow-2xl transition-all cursor-pointer backdrop-blur-md"
        title="Close Video (Esc)"
        aria-label="Close modal"
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
        <span className="text-[12px] font-bold">Close</span>
      </button>

      {/* 2. Modal Container */}
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#191c1e] text-white rounded-2xl shadow-2xl border border-white/15 overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar with Close Button */}
        <div className="px-4 py-3 bg-[#131b2e] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 overflow-hidden mr-3">
            <span className="material-symbols-outlined text-[#acf770] text-[20px] shrink-0">smart_display</span>
            <span className="text-[13px] font-bold text-white truncate">{title}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0 text-[12px] font-bold"
            aria-label="Close video"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            <span>Close</span>
          </button>
        </div>

        {/* Video Canvas Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden shrink-0">
          {videoUrl && (videoUrl.startsWith('blob:') || videoUrl.startsWith('data:video') || /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(videoUrl)) ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : youtubeId ? (
            <iframe
              className="w-full h-full border-0"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) ? (
            <iframe
              className="w-full h-full border-0"
              src={videoUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={thumbnailUrl}
                alt={title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-85' : 'opacity-60'}`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

              {/* Central Play/Pause Watermark Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute z-10 w-16 h-16 rounded-full bg-[#acf770] text-[#0c2000] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <span className="material-symbols-outlined text-[36px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              {/* Clinical Simulation Overlay Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#004c22]/90 backdrop-blur-md text-[#93e0a2] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#acf770] animate-pulse"></span>
                  EHMCare Medical Stream
                </span>
                <span className="px-2 py-0.5 rounded bg-black/60 text-white/80 text-[11px] font-mono">
                  HD 1080p
                </span>
              </div>

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 z-10">
                {/* Progress Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-white/80">04:32</span>
                  <div
                    className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer relative"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newProgress = Math.round((clickX / rect.width) * 100);
                      setProgress(Math.max(0, Math.min(100, newProgress)));
                    }}
                  >
                    <div
                      className="h-full bg-[#acf770] rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-white/80">{duration}</span>
                </div>

                <div className="flex items-center justify-between text-white/90">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-[#acf770] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <button className="hover:text-[#acf770] transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">volume_up</span>
                    </button>
                    <span className="text-[12px] text-white/70 hidden sm:inline">{subtitle}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#acf770] bg-[#166534]/50 px-2 py-0.5 rounded font-bold">
                      Verified Case Archive
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Video Description & Bottom Close Button */}
        <div className="p-4 sm:p-5 bg-[#2d3133] space-y-3 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h4 className="text-[16px] font-bold text-white">{title}</h4>
              <p className="text-[13px] text-white/80 leading-relaxed mt-1">{description}</p>
            </div>
            <button
              onClick={onClose}
              className="self-start px-4 py-2 rounded-lg bg-[#acf770] text-[#0c2000] font-bold text-[12px] hover:bg-white transition-colors cursor-pointer shrink-0 shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              <span>Dismiss Video</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#acf770]">
            <span className="bg-black/30 px-2 py-1 rounded">Dr. Alaba Emmanuel, Lead TCM Director</span>
            <span className="bg-black/30 px-2 py-1 rounded">Neuro-Acupuncture Practicum</span>
            <span className="bg-black/30 px-2 py-1 rounded">Kwara Health Directorate Affiliated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
