import React, { useState, useEffect } from 'react';
import {
  SuccessStoryItem,
  AcademyFootageItem,
  NewsletterSubscriber,
  NewsletterBroadcastRecord,
} from '../types.ts';
import {
  AUTHORIZED_ADMIN_EMAILS,
  getCurrentAdminUser,
  setAdminUser,
  clearAdminUser,
  getSuccessStories,
  saveSuccessStory,
  toggleStoryVisibility,
  deleteSuccessStory,
  getAcademyFootage,
  saveAcademyFootage,
  toggleFootageVisibility,
  deleteAcademyFootage,
  getFormSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  GenericFormSubmission,
  getNewsletterSubscribers,
  getBroadcastHistory,
  getEmailConfig,
  saveEmailConfig,
  EmailServiceConfig,
  extractYouTubeId,
  getYouTubeThumbnail,
  syncStoreWithServer,
  downloadDatabaseBackup,
} from '../utils/clinicContentStore.ts';
import {
  broadcastNewsletterToSubscribers,
  sendTestEmail,
} from '../utils/formSubmissionService.ts';
import { IMAGES } from '../data/content.ts';

interface AdminPortalViewProps {
  onNavigateHome: () => void;
  onOpenVideo?: (title: string, subtitle: string, thumb: string, youtubeId?: string, videoUrl?: string) => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  onNavigateHome,
  onOpenVideo,
}) => {
  const [currentUser, setCurrentUserState] = useState<string | null>(getCurrentAdminUser());
  const [showVisitorNotice, setShowVisitorNotice] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPasscode, setLoginPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'stories' | 'academy' | 'inbox' | 'newsletter' | 'settings'
  >('overview');

  // Stories State (Page-based, NO popup modal)
  const [stories, setStories] = useState<SuccessStoryItem[]>([]);
  const [storyViewMode, setStoryViewMode] = useState<'list' | 'editor'>('list');
  const [editingStory, setEditingStory] = useState<Partial<SuccessStoryItem>>({
    category: 'pain',
    outcomeBadge: 'Relief Verified',
    location: 'EHMCare Center • Ilorin',
    dateRecorded: 'EHMCare Official Clinic Channel',
    visible: true,
  });
  const [storyVideoSourceType, setStoryVideoSourceType] = useState<'link' | 'upload'>('link');
  const [storyImageSourceType, setStoryImageSourceType] = useState<'upload' | 'link'>('upload');
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [storyBroadcastOptin, setStoryBroadcastOptin] = useState(true);

  // Footage State (Page-based, NO popup modal)
  const [footage, setFootage] = useState<AcademyFootageItem[]>([]);
  const [footageViewMode, setFootageViewMode] = useState<'list' | 'editor'>('list');
  const [editingFootage, setEditingFootage] = useState<Partial<AcademyFootageItem>>({
    type: 'classroom',
    subtitle: 'Classrooms and Clinical Theory in Session',
    instructor: 'Dr. Alaba Emmanuel & Preceptors',
    location: 'Saboke Center Lecture Hall, Ilorin',
    hoursOrDuration: '2 Hours Theory • 4 Hours Practicum',
    visible: true,
  });
  const [footageVideoSourceType, setFootageVideoSourceType] = useState<'link' | 'upload'>('link');
  const [footageImageSourceType, setFootageImageSourceType] = useState<'upload' | 'link'>('upload');
  const [customTypeInput, setCustomTypeInput] = useState('');

  // Inbox State
  const [submissions, setSubmissions] = useState<GenericFormSubmission[]>([]);
  const [inboxFilter, setInboxFilter] = useState<'all' | 'consultation' | 'academy-application' | 'investor-inquiry'>('all');
  const [inboxSearch, setInboxSearch] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<GenericFormSubmission | null>(null);

  // Newsletter State
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [broadcasts, setBroadcasts] = useState<NewsletterBroadcastRecord[]>([]);
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastCategory, setBroadcastCategory] = useState('Patient Case Study');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastActionUrl, setBroadcastActionUrl] = useState('');
  const [broadcastActionLabel, setBroadcastActionLabel] = useState('View Details');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastToast, setBroadcastToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Settings State
  const [emailConfig, setEmailConfigState] = useState<EmailServiceConfig>(getEmailConfig());
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<string | null>(null);

  // Persistent Server Database Sync State
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Refresh data from local cache and sync with authoritative server database
  const refreshData = async () => {
    // 1. Instant local hydration
    setStories(getSuccessStories());
    setFootage(getAcademyFootage());
    setSubmissions(getFormSubmissions());
    setSubscribers(getNewsletterSubscribers());
    setBroadcasts(getBroadcastHistory());
    setEmailConfigState(getEmailConfig());

    // 2. Authoritative persistent server synchronization
    setIsSyncing(true);
    try {
      await syncStoreWithServer();
      setStories(getSuccessStories());
      setFootage(getAcademyFootage());
      setSubmissions(getFormSubmissions());
      setSubscribers(getNewsletterSubscribers());
      setBroadcasts(getBroadcastHistory());
      setEmailConfigState(getEmailConfig());
      setLastSyncTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch (err) {
      console.warn('[Sync Error]', err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    refreshData();
    // Auto-poll server every 20 seconds so any patient bookings or student enquiries submitted anywhere show up automatically
    const interval = setInterval(() => {
      refreshData();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const emailNorm = loginEmail.trim().toLowerCase();

    if (!emailNorm) {
      setLoginError('Please enter your authorized administrator email address.');
      return;
    }

    if (!AUTHORIZED_ADMIN_EMAILS.includes(emailNorm)) {
      setLoginError(
        'Access denied. This email is not authorized for administrative access. Please verify your credentials or contact clinic management.'
      );
      return;
    }

    setAdminUser(emailNorm, true);
    setCurrentUserState(emailNorm);
    refreshData();
  };

  const handleLogout = () => {
    clearAdminUser();
    setCurrentUserState(null);
  };

  // 1. SAVE STORY
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory || !editingStory.title || !editingStory.patientName) return;

    const ytId = extractYouTubeId(editingStory.youtubeId || editingStory.videoUrl || '');
    const thumb =
      editingStory.thumbnail ||
      (ytId ? getYouTubeThumbnail(ytId) : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80');

    const isOtherCat = editingStory.category === 'other';
    const finalCategory = isOtherCat
      ? (customCategoryInput.trim() || 'Other Clinical Protocol')
      : (editingStory.category || 'pain');

    const newStory: SuccessStoryItem = {
      id: editingStory.id || `story-${Date.now()}`,
      category: finalCategory,
      categoryLabel: isOtherCat ? (customCategoryInput.trim() || finalCategory) : undefined,
      title: editingStory.title,
      patientName: editingStory.patientName,
      location: editingStory.location || 'EHMCare Center • Ilorin',
      condition: editingStory.condition || 'Clinical Condition Under Care',
      recoverySummary: editingStory.recoverySummary || 'Treated with specialized clinical protocols at EHMCare.',
      outcomeBadge: editingStory.outcomeBadge || 'Clinical Outcome Verified',
      duration:
        editingStory.duration ||
        (editingStory.videoFileName
          ? `${editingStory.videoFileName} (Direct Upload)`
          : ytId
          ? 'YouTube Verified'
          : 'Video Documented'),
      thumbnail: thumb,
      quote: editingStory.quote || 'EHMCare treatment provided life-changing clinical results.',
      specialtyId: editingStory.specialtyId || 'neuro-acupuncture',
      dateRecorded: editingStory.dateRecorded || 'EHMCare Official Clinic Channel',
      youtubeId: ytId,
      youtubeEmbedUrl: ytId ? `https://www.youtube.com/embed/${ytId}` : undefined,
      videoUrl: editingStory.videoUrl,
      videoSourceType: editingStory.videoSourceType || (editingStory.videoFileName ? 'upload' : ytId ? 'youtube' : 'external'),
      videoFileName: editingStory.videoFileName,
      imageFileName: editingStory.imageFileName,
      visible: editingStory.visible !== false,
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    saveSuccessStory(newStory);
    setStories(getSuccessStories());
    setStoryViewMode('list');

    // Auto-Newsletter Broadcast if checked
    if (storyBroadcastOptin) {
      await broadcastNewsletterToSubscribers({
        subject: `🎥 New Patient Success Story: ${newStory.patientName} (${newStory.outcomeBadge})`,
        title: newStory.title,
        category: 'Patient Case Study',
        content: `We are thrilled to share an inspiring clinical outcome from our Ilorin clinic:\n\nPatient: ${newStory.patientName}\nDiagnosis: ${newStory.condition}\nOutcome: ${newStory.outcomeBadge}\n\nRecovery Summary: ${newStory.recoverySummary}\n\n"${newStory.quote}"`,
        actionUrl: ytId ? `https://youtube.com/watch?v=${ytId}` : newStory.videoUrl || 'https://ehmcare.com',
        actionLabel: 'Watch Patient Video',
      });
      refreshData();
      setBroadcastToast({
        msg: `Story published to website & auto-newsletter broadcast dispatched to ${subscribers.length} subscribers!`,
        type: 'success',
      });
      setTimeout(() => setBroadcastToast(null), 5000);
    } else {
      setBroadcastToast({
        msg: 'Story successfully published to Patient Success Video Gallery!',
        type: 'success',
      });
      setTimeout(() => setBroadcastToast(null), 4000);
    }
  };

  // 2. SAVE FOOTAGE
  const handleSaveFootage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFootage || !editingFootage.title) return;

    const ytId = extractYouTubeId(editingFootage.youtubeId || editingFootage.videoUrl || '');
    const thumb =
      editingFootage.thumbnail ||
      (ytId ? getYouTubeThumbnail(ytId) : IMAGES.academyWhiteboard);

    const isOtherType = editingFootage.type === 'other';
    const finalType = isOtherType
      ? (customTypeInput.trim() || 'Special Track')
      : (editingFootage.type || 'classroom');

    const item: AcademyFootageItem = {
      id: editingFootage.id || `footage-${Date.now()}`,
      type: finalType,
      typeLabel: isOtherType ? (customTypeInput.trim() || finalType) : undefined,
      title: editingFootage.title,
      subtitle: editingFootage.subtitle || 'Classrooms and Clinical Theory in Session',
      moduleName: editingFootage.moduleName || 'Classroom Session',
      instructor: editingFootage.instructor || 'Dr. Alaba Emmanuel & Preceptors',
      location: editingFootage.location || 'Saboke Center Lecture Hall, Ilorin',
      hoursOrDuration:
        editingFootage.hoursOrDuration ||
        (editingFootage.videoFileName ? 'Direct Video Upload' : 'Live Stream Session'),
      videoUrl: ytId ? `https://www.youtube.com/watch?v=${ytId}` : editingFootage.videoUrl,
      youtubeId: ytId,
      videoSourceType: editingFootage.videoSourceType || (editingFootage.videoFileName ? 'upload' : ytId ? 'youtube' : 'external'),
      videoFileName: editingFootage.videoFileName,
      imageFileName: editingFootage.imageFileName,
      thumbnail: thumb,
      visible: editingFootage.visible !== false,
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    saveAcademyFootage(item);
    setFootage(getAcademyFootage());
    setFootageViewMode('list');
    setBroadcastToast({
      msg: 'Classroom / theory session successfully published!',
      type: 'success',
    });
    setTimeout(() => setBroadcastToast(null), 4000);
  };

  // 3. SEND MANUAL NEWSLETTER BROADCAST
  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastTitle || !broadcastContent) return;

    setIsBroadcasting(true);
    const res = await broadcastNewsletterToSubscribers({
      subject: broadcastSubject,
      title: broadcastTitle,
      content: broadcastContent,
      category: broadcastCategory,
      actionUrl: broadcastActionUrl || undefined,
      actionLabel: broadcastActionLabel || undefined,
    });
    setIsBroadcasting(false);

    if (res.success) {
      setBroadcastToast({ msg: res.message, type: 'success' });
      setBroadcastSubject('');
      setBroadcastTitle('');
      setBroadcastContent('');
      setBroadcastActionUrl('');
      refreshData();
    } else {
      setBroadcastToast({ msg: res.message, type: 'error' });
    }
    setTimeout(() => setBroadcastToast(null), 6000);
  };

  // 4. TEST EMAIL DISPATCH
  const handleTestEmail = async () => {
    // Auto-save currently entered config first
    saveEmailConfig(emailConfig);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3500);

    setIsTestingEmail(true);
    setTestEmailResult(null);
    const res = await sendTestEmail();
    setIsTestingEmail(false);
    setTestEmailResult(
      res.ok
        ? `✅ Verification Success: ${res.info}`
        : `⚠️ Dispatch Note: ${res.info}`
    );
  };

  // 5. EXPORT INBOX CSV
  const exportInboxCsv = () => {
    if (submissions.length === 0) return;
    const headers = ['ID', 'Type', 'Name', 'Phone', 'Email', 'Subject/Program', 'Status', 'Date', 'Source'];
    const rows = submissions.map((s) => [
      s.id,
      s.type,
      `"${s.name.replace(/"/g, '""')}"`,
      s.phone,
      s.email || '',
      `"${(s.subjectOrProgram || '').replace(/"/g, '""')}"`,
      s.status,
      new Date(s.createdAt).toLocaleString(),
      s.source,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ehmcare_form_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered submissions
  const filteredSubmissions = submissions.filter((s) => {
    const matchesFilter = inboxFilter === 'all' || s.type === inboxFilter;
    const matchesSearch =
      inboxSearch === '' ||
      s.name.toLowerCase().includes(inboxSearch.toLowerCase()) ||
      s.phone.includes(inboxSearch) ||
      (s.email && s.email.toLowerCase().includes(inboxSearch.toLowerCase())) ||
      (s.subjectOrProgram && s.subjectOrProgram.toLowerCase().includes(inboxSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // If user is not logged in, show visitor restriction notice / secure admin login gate
  if (!currentUser) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#f2f4f6] relative">
        {/* Dismissible Restricted Area Notice for Public Visitors */}
        {showVisitorNotice && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#eceef0] relative">
              <button
                type="button"
                onClick={() => setShowVisitorNotice(false)}
                title="Dismiss and Proceed to Login"
                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#404940] hover:text-[#191c1e] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[32px]">shield_person</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>Restricted Access Notice</span>
              </div>

              <h3 className="text-[19px] font-extrabold text-[#191c1e] mb-2 leading-tight">
                Authorized Clinical Administrators Only
              </h3>

              <p className="text-[13px] text-[#404940] leading-relaxed mb-6">
                This administrative command center is strictly restricted to authorized EHMCare physicians and clinic directors for managing patient records, clinical footage, and automated medical communications. If you are a patient or visitor, please return to our public website.
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#004c22] text-[#acf770] font-bold text-[13.5px] hover:bg-[#166534] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">home</span>
                  <span>Return to Clinic Homepage</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowVisitorNotice(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#004c22] font-extrabold text-[12.5px] transition-colors cursor-pointer border border-[#eceef0] flex items-center justify-center gap-1.5"
                >
                  <span>Authorized Administrator? Dismiss & Sign In</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Secure Admin Login Form (No leaked admin emails) */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#eceef0] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#004c22] text-[#acf770] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]">lock</span>
            </div>
            <div>
              <h2 className="text-[20px] font-extrabold text-[#004c22] leading-tight">
                EHMCare Admin Portal
              </h2>
              <p className="text-[12px] text-[#404940]">
                Clinical Content, Form Inbox & Auto-Newsletter
              </p>
            </div>
          </div>

          {loginError && (
            <div className="p-3 mb-4 rounded-lg bg-[#ba1a1a]/10 border border-[#ba1a1a]/30 text-[#ba1a1a] text-[12px] font-semibold leading-relaxed">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                Administrator Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter administrator email address"
                className="w-full h-10 px-3 rounded-lg bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#004c22]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                Access Security PIN / Password
              </label>
              <input
                type="password"
                value={loginPasscode}
                onChange={(e) => setLoginPasscode(e.target.value)}
                placeholder="Enter administrator PIN / password"
                className="w-full h-10 px-3 rounded-lg bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#004c22]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#004c22] text-[#acf770] font-extrabold text-[13.5px] hover:bg-[#166534] transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              <span>Sign In to Admin Dashboard</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#eceef0] flex items-center justify-between text-[12px]">
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-[#004c22] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Public Website</span>
            </button>
            <button
              type="button"
              onClick={() => setShowVisitorNotice(true)}
              className="text-[#556055] hover:text-[#191c1e] font-semibold cursor-pointer"
            >
              Access Notice
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Admin Interface
  return (
    <div className="w-full min-h-screen bg-[#f7f9fb] pb-16 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Alert */}
      {broadcastToast && (
        <div
          className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-fadeIn ${
            broadcastToast.type === 'success'
              ? 'bg-[#004c22] text-white border border-[#acf770]/40'
              : 'bg-[#ba1a1a] text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[#acf770] text-[22px]">
            {broadcastToast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <p className="font-bold text-[13px]">{broadcastToast.msg}</p>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <div className="bg-[#004c22] text-white px-4 sm:px-8 py-4 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#acf770] text-[#004c22] flex items-center justify-center font-black">
              <span className="material-symbols-outlined text-[24px]">dashboard</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[17px] sm:text-[19px] font-extrabold leading-tight text-white">
                  EHMCare Admin Command Center
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#acf770] text-[#004c22]">
                  Live
                </span>
              </div>
              <p className="text-[12px] text-[#d6eedb]">
                Logged in as: <strong className="text-white">{currentUser}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
            {/* Live Database Status Indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-[#acf770] border border-white/15">
              <span className={`w-2 h-2 rounded-full bg-[#acf770] ${isSyncing ? 'animate-ping' : 'animate-pulse'}`}></span>
              <span>{isSyncing ? 'Syncing Server DB...' : `Persistent DB Synced (${lastSyncTime})`}</span>
            </div>

            {/* Sync Now / Refresh Button */}
            <button
              type="button"
              onClick={() => refreshData()}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[12px] font-bold transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
              title="Refresh and sync all patient bookings, enquiries, and subscribers from server"
            >
              <span className={`material-symbols-outlined text-[16px] ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>

            {/* Backup All Data Button */}
            <button
              type="button"
              onClick={downloadDatabaseBackup}
              className="px-3 py-1.5 rounded-lg bg-[#acf770] text-[#004c22] text-[12px] font-extrabold hover:bg-white transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
              title="Download full JSON database backup of all bookings, inquiries, videos, and settings to your computer"
            >
              <span className="material-symbols-outlined text-[16px]">cloud_download</span>
              <span className="hidden sm:inline">Backup All Data</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[12px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Public Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-[#ba1a1a] text-white text-[12px] font-bold hover:bg-[#93000a] transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white border-b border-[#eceef0] shadow-2xs sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-2 overflow-x-auto py-2.5">
          {[
            { id: 'overview', label: 'Overview', icon: 'monitoring' },
            { id: 'stories', label: `Patient Videos (${stories.length})`, icon: 'videocam' },
            { id: 'academy', label: `Classrooms & LMS (${footage.length})`, icon: 'school' },
            { id: 'inbox', label: `Form Submissions (${submissions.length})`, icon: 'inbox' },
            { id: 'newsletter', label: `Newsletter (${subscribers.length})`, icon: 'campaign' },
            { id: 'settings', label: 'Email Services', icon: 'settings' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-2 rounded-xl text-[12.5px] font-extrabold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                  active
                    ? 'bg-[#004c22] text-[#acf770] shadow-xs'
                    : 'text-[#404940] hover:text-[#004c22] hover:bg-[#f2f4f6]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-2xs flex flex-col justify-between">
                <span className="text-[12px] font-bold text-[#404940] uppercase tracking-wider">
                  Total Form Inquiries
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-[32px] font-black text-[#004c22]">
                    {submissions.length}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#acf770]/30 text-[#004c22]">
                    {submissions.filter((s) => s.status === 'pending').length} Pending
                  </span>
                </div>
                <p className="text-[11.5px] text-[#556055] mt-1">Bookings, Academy & Investors</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-2xs flex flex-col justify-between">
                <span className="text-[12px] font-bold text-[#404940] uppercase tracking-wider">
                  Patient Success Videos
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-[32px] font-black text-[#004c22]">
                    {stories.length}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#e0e3e5] text-[#004c22]">
                    {stories.filter((s) => s.visible).length} Visible
                  </span>
                </div>
                <p className="text-[11.5px] text-[#556055] mt-1">Live on Public Gallery</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-2xs flex flex-col justify-between">
                <span className="text-[12px] font-bold text-[#404940] uppercase tracking-wider">
                  Newsletter Audience
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-[32px] font-black text-[#004c22]">
                    {subscribers.length}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#acf770]/30 text-[#004c22]">
                    Active
                  </span>
                </div>
                <p className="text-[11.5px] text-[#556055] mt-1">Opted-in for Auto-Broadcasts</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-2xs flex flex-col justify-between">
                <span className="text-[12px] font-bold text-[#404940] uppercase tracking-wider">
                  Classrooms & Theory
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-[32px] font-black text-[#004c22]">
                    {footage.length}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#e0e3e5] text-[#004c22]">
                    LMS Streams
                  </span>
                </div>
                <p className="text-[11.5px] text-[#556055] mt-1">Academy & Student Portal</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#004c22] to-[#166534] text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-[20px] font-extrabold text-[#acf770]">
                  Post a New Patient Success Story Video
                </h3>
                <p className="text-[13px] text-[#d6eedb] mt-1 max-w-xl">
                  Add a YouTube Short or video URL. It will instantly publish to the public Patient Success Video Gallery and can automatically trigger an auto-newsletter broadcast to all subscribers.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingStory({
                    category: 'pain',
                    outcomeBadge: 'Relief Verified',
                    location: 'EHMCare Center • Ilorin',
                    dateRecorded: 'EHMCare Official Clinic Channel',
                    visible: true,
                  });
                  setCustomCategoryInput('');
                  setStoryVideoSourceType('link');
                  setStoryImageSourceType('upload');
                  setStoryBroadcastOptin(true);
                  setStoryViewMode('editor');
                  setActiveTab('stories');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-[#acf770] text-[#004c22] font-black text-[13px] hover:bg-white transition-colors cursor-pointer shadow-sm shrink-0 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Post Success Video Now</span>
              </button>
            </div>

            {/* Recent Submissions Ticker */}
            <div className="p-6 rounded-2xl bg-white border border-[#eceef0] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-extrabold text-[#004c22] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                  <span>Recent Patient & Student Inquiries</span>
                </h3>
                <button
                  onClick={() => setActiveTab('inbox')}
                  className="text-[12.5px] font-bold text-[#004c22] hover:underline"
                >
                  View All Submissions →
                </button>
              </div>

              {submissions.length === 0 ? (
                <p className="text-[13px] text-[#556055] py-4 text-center">
                  No submissions recorded yet. Try booking a test consultation on the public site!
                </p>
              ) : (
                <div className="divide-y divide-[#eceef0]">
                  {submissions.slice(0, 5).map((sub) => (
                    <div
                      key={sub.id}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              sub.type === 'consultation'
                                ? 'bg-[#acf770]/30 text-[#004c22]'
                                : sub.type === 'academy-application'
                                ? 'bg-[#004c22] text-white'
                                : 'bg-[#e0e3e5] text-[#191c1e]'
                            }`}
                          >
                            {sub.type.replace('-', ' ')}
                          </span>
                          <strong className="text-[13.5px] text-[#191c1e]">{sub.name}</strong>
                          <span className="text-[12px] text-[#556055]">({sub.phone})</span>
                        </div>
                        <p className="text-[12px] text-[#404940] mt-0.5">{sub.subjectOrProgram}</p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold capitalize ${
                            sub.status === 'pending'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}
                        >
                          {sub.status}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedSubmission(sub);
                            setActiveTab('inbox');
                          }}
                          className="px-2.5 py-1 rounded bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[11.5px] font-bold text-[#004c22]"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. PATIENT SUCCESS VIDEOS TAB */}
        {activeTab === 'stories' && storyViewMode === 'editor' && (
          <div className="space-y-6">
            {/* Top Navigation & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#eceef0]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStoryViewMode('list')}
                  className="w-10 h-10 rounded-xl bg-white border border-[#eceef0] hover:bg-gray-100 flex items-center justify-center text-[#004c22] transition-colors cursor-pointer shadow-2xs"
                  title="Return to Story Gallery"
                >
                  <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                </button>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#acf770]/40 text-[#004c22] text-[11px] font-bold uppercase tracking-wider mb-1">
                    <span className="material-symbols-outlined text-[14px]">videocam</span>
                    <span>Patient Success Video Publisher</span>
                  </div>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#004c22] leading-tight">
                    {editingStory.id ? 'Edit Patient Success Video' : 'Post New Patient Success Video'}
                  </h2>
                  <p className="text-[12.5px] text-[#404940]">
                    Upload or link video documentation, select clinical category, and publish directly to the public gallery.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setStoryViewMode('list')}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#404940] font-bold text-[12.5px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="storyEditorForm"
                  className="px-6 py-2.5 rounded-xl bg-[#004c22] text-[#acf770] font-black text-[13px] hover:bg-[#166534] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">publish</span>
                  <span>Save & Publish Story</span>
                </button>
              </div>
            </div>

            {/* Main Form Layout (2 Columns: Form on Left, Live Preview on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left / Form Inputs Column */}
              <form id="storyEditorForm" onSubmit={handleSaveStory} className="lg:col-span-2 space-y-5">
                {/* 1. Video Source Section */}
                <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-extrabold text-[#004c22] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">movie</span>
                      <span>1. Video Source (Any Channel or Upload)</span>
                    </h3>

                    {/* Source Toggle */}
                    <div className="flex items-center bg-[#f2f4f6] p-1 rounded-xl text-[12px] font-bold">
                      <button
                        type="button"
                        onClick={() => setStoryVideoSourceType('link')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          storyVideoSourceType === 'link'
                            ? 'bg-[#004c22] text-[#acf770] shadow-xs'
                            : 'text-[#404940] hover:text-[#004c22]'
                        }`}
                      >
                        Online Video Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setStoryVideoSourceType('upload')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          storyVideoSourceType === 'upload'
                            ? 'bg-[#004c22] text-[#acf770] shadow-xs'
                            : 'text-[#404940] hover:text-[#004c22]'
                        }`}
                      >
                        Upload Video File
                      </button>
                    </div>
                  </div>

                  {storyVideoSourceType === 'link' ? (
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Video URL from Any Channel / Platform *
                      </label>
                      <input
                        type="text"
                        required={!editingStory.videoUrl}
                        value={editingStory.youtubeId || editingStory.videoUrl || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const yt = extractYouTubeId(val);
                          setEditingStory((prev) => ({
                            ...prev,
                            youtubeId: yt,
                            videoUrl: val,
                            videoSourceType: yt ? 'youtube' : 'external',
                            thumbnail: yt ? getYouTubeThumbnail(yt) : prev.thumbnail,
                          }));
                        }}
                        placeholder="e.g. https://youtube.com/shorts/HdZcjTvTtVo, Vimeo, TikTok, Facebook, Drive, or .mp4 link"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#004c22]"
                      />
                      <p className="text-[11px] text-[#556055] mt-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">info</span>
                        <span>Accepts YouTube Shorts, watch URLs, Vimeo, direct MP4 streams, and any channel link.</span>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="p-5 rounded-xl border-2 border-dashed border-[#004c22]/30 bg-[#f7f9fb] text-center hover:bg-[#f2f4f6] transition-colors relative">
                        <input
                          type="file"
                          accept="video/*"
                          id="storyVideoUploadInput"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const objectUrl = URL.createObjectURL(file);
                            setEditingStory((prev) => ({
                              ...prev,
                              videoUrl: objectUrl,
                              videoFileName: file.name,
                              videoSourceType: 'upload',
                              youtubeId: undefined,
                              duration: `${(file.size / (1024 * 1024)).toFixed(1)} MB Video File`,
                            }));
                          }}
                        />
                        <label htmlFor="storyVideoUploadInput" className="cursor-pointer block py-2">
                          <span className="material-symbols-outlined text-[42px] text-[#004c22]">
                            cloud_upload
                          </span>
                          <p className="text-[13.5px] font-extrabold text-[#004c22] mt-1">
                            {editingStory.videoFileName
                              ? `Selected File: ${editingStory.videoFileName}`
                              : 'Click or Drag to Upload Video from Computer / Mobile'}
                          </p>
                          <p className="text-[11.5px] text-[#556055] mt-0.5">
                            Supports MP4, WebM, MOV, and any video recording.
                          </p>
                        </label>
                      </div>

                      {editingStory.videoUrl && (
                        <div className="mt-3 p-3 bg-black rounded-xl overflow-hidden">
                          <p className="text-[11px] text-[#acf770] font-bold mb-2">Live Video Playback Preview:</p>
                          <video
                            src={editingStory.videoUrl}
                            controls
                            className="aspect-video w-full rounded-lg bg-black"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Cover Photo / Thumbnail Section */}
                <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-extrabold text-[#004c22] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">image</span>
                      <span>2. Thumbnail / Cover Image</span>
                    </h3>

                    {/* Image Source Toggle */}
                    <div className="flex items-center bg-[#f2f4f6] p-1 rounded-xl text-[12px] font-bold">
                      <button
                        type="button"
                        onClick={() => setStoryImageSourceType('upload')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          storyImageSourceType === 'upload'
                            ? 'bg-[#004c22] text-[#acf770] shadow-xs'
                            : 'text-[#404940] hover:text-[#004c22]'
                        }`}
                      >
                        Upload Image File
                      </button>
                      <button
                        type="button"
                        onClick={() => setStoryImageSourceType('link')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          storyImageSourceType === 'link'
                            ? 'bg-[#004c22] text-[#acf770] shadow-xs'
                            : 'text-[#404940] hover:text-[#004c22]'
                        }`}
                      >
                        Image URL
                      </button>
                    </div>
                  </div>

                  {storyImageSourceType === 'upload' ? (
                    <div>
                      <div className="p-4 rounded-xl border-2 border-dashed border-[#bfc9bd] bg-[#f7f9fb] text-center hover:bg-[#f2f4f6] transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          id="storyImageUploadInput"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setEditingStory((prev) => ({
                                ...prev,
                                thumbnail: ev.target?.result as string,
                                imageFileName: file.name,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <label htmlFor="storyImageUploadInput" className="cursor-pointer block py-2">
                          <span className="material-symbols-outlined text-[36px] text-[#004c22]">
                            add_photo_alternate
                          </span>
                          <p className="text-[13px] font-bold text-[#004c22] mt-0.5">
                            {editingStory.imageFileName
                              ? `Selected: ${editingStory.imageFileName}`
                              : 'Click to Upload Patient Cover Photo / Thumbnail'}
                          </p>
                          <p className="text-[11px] text-[#556055]">JPG, PNG, or WebP</p>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Cover Image / Thumbnail URL
                      </label>
                      <input
                        type="text"
                        value={editingStory.thumbnail || ''}
                        onChange={(e) =>
                          setEditingStory((prev) => ({ ...prev, thumbnail: e.target.value }))
                        }
                        placeholder="https://images.unsplash.com/... or auto-filled"
                        className="w-full h-10 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                      />
                    </div>
                  )}

                  {editingStory.thumbnail && (
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-200">
                      <img
                        src={editingStory.thumbnail}
                        alt="Thumbnail"
                        className="w-24 h-16 object-cover rounded-lg border border-gray-300"
                      />
                      <div className="text-[12px]">
                        <p className="font-bold text-[#004c22]">Cover Image Active</p>
                        <p className="text-[#556055] text-[11px]">
                          {editingStory.imageFileName || 'Ready to display on public card'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Clinical Classification & Patient Details */}
                <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-2xs space-y-4">
                  <h3 className="text-[15px] font-extrabold text-[#004c22] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">clinical_notes</span>
                    <span>3. Clinical Category & Patient Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Clinical Category with "Others (Type Manually)" */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Clinical Category *
                      </label>
                      <select
                        value={editingStory.category || 'pain'}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingStory((prev) => ({ ...prev, category: val }));
                        }}
                        className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e] font-semibold"
                      >
                        <option value="stroke">Stroke Rehabilitation & Motor Recovery</option>
                        <option value="pain">Pain & Spine Relief / Musculoskeletal</option>
                        <option value="infertility">Fertility & Reproductive Health</option>
                        <option value="neurology">Neuropathy & Bell's Palsy</option>
                        <option value="pediatric">Pediatric & Cerebral Palsy</option>
                        <option value="clinic">Clinic Hospital Tour & Facilities</option>
                        <option value="other">Others (Type manually...)</option>
                      </select>

                      {/* When "Others" is selected, show manual text typing input */}
                      {editingStory.category === 'other' && (
                        <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 animate-fadeIn">
                          <label className="block text-[11.5px] font-extrabold text-amber-900 mb-1">
                            Type Custom Clinical Category:
                          </label>
                          <input
                            type="text"
                            required
                            value={customCategoryInput}
                            onChange={(e) => setCustomCategoryInput(e.target.value)}
                            placeholder="e.g. Chronic Kidney Protocol, Autoimmune Recovery..."
                            className="w-full h-9 px-3 rounded-lg bg-white border border-amber-300 text-[13px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#004c22]"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Patient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingStory.patientName || ''}
                        onChange={(e) =>
                          setEditingStory((prev) => ({ ...prev, patientName: e.target.value }))
                        }
                        placeholder="e.g. Bayo Issa or Yunus Abubakar"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Story Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingStory.title || ''}
                        onChange={(e) =>
                          setEditingStory((prev) => ({ ...prev, title: e.target.value }))
                        }
                        placeholder="e.g. Bayo Issa: Restored from Inability to Walk to Independent Mobility"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Treatment Center / Location
                      </label>
                      <input
                        type="text"
                        value={editingStory.location || ''}
                        onChange={(e) =>
                          setEditingStory((prev) => ({ ...prev, location: e.target.value }))
                        }
                        placeholder="e.g. EHMCare Center • Ilorin"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Chief Condition / Diagnosis *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingStory.condition || ''}
                        onChange={(e) =>
                          setEditingStory((prev) => ({ ...prev, condition: e.target.value }))
                        }
                        placeholder="e.g. Severe Mobility Impairment & Inability to Walk"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Outcome Metric / Badge *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingStory.outcomeBadge || ''}
                        onChange={(e) =>
                          setEditingStory((prev) => ({ ...prev, outcomeBadge: e.target.value }))
                        }
                        placeholder="e.g. Walks Independently or Relief in 6 Days"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                      />
                      {/* Suggestion Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {['Walks Independently', 'Relief in 6 Days', 'Mobility Restored', 'Pain Free', 'TCM Verified'].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setEditingStory((prev) => ({ ...prev, outcomeBadge: tag }))}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#004c22] cursor-pointer"
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                      Recovery Protocol Summary
                    </label>
                    <textarea
                      rows={2}
                      value={editingStory.recoverySummary || ''}
                      onChange={(e) =>
                        setEditingStory((prev) => ({ ...prev, recoverySummary: e.target.value }))
                      }
                      placeholder="e.g. Targeted acupuncture, classical herbal decoctions, and physical meridian therapy..."
                      className="w-full p-3 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                      Patient Quote / Video Transcript
                    </label>
                    <textarea
                      rows={3}
                      value={editingStory.quote || ''}
                      onChange={(e) =>
                        setEditingStory((prev) => ({ ...prev, quote: e.target.value }))
                      }
                      placeholder="e.g. I was a sports journalist who suddenly could not walk at all. Coming to EHMCare changed everything..."
                      className="w-full p-3 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                    />
                  </div>

                  {/* Auto-Newsletter Broadcast Card */}
                  <div className="p-4 rounded-xl bg-[#acf770]/20 border border-[#356b00]/25 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="storyBroadcastCheck"
                      checked={storyBroadcastOptin}
                      onChange={(e) => setStoryBroadcastOptin(e.target.checked)}
                      className="w-5 h-5 text-[#004c22] rounded cursor-pointer mt-0.5"
                    />
                    <div>
                      <label
                        htmlFor="storyBroadcastCheck"
                        className="text-[13px] font-extrabold text-[#004c22] cursor-pointer block"
                      >
                        Auto-dispatch newsletter broadcast to all {subscribers.length} subscribers
                      </label>
                      <p className="text-[11.5px] text-[#303830] mt-0.5">
                        Automatically emails this patient case study and video link to your registered newsletter audience upon saving.
                      </p>
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-4 border-t border-[#eceef0] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStoryViewMode('list')}
                      className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#404940] font-bold text-[13px] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl bg-[#004c22] text-[#acf770] font-extrabold text-[14px] hover:bg-[#166534] shadow-md transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[20px]">publish</span>
                      <span>Publish Patient Success Story</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Right / Live Interactive Preview Column */}
              <div className="space-y-4 lg:sticky lg:top-28">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-extrabold text-[#004c22] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">preview</span>
                    <span>Live Public Card Preview</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#acf770] text-[#004c22]">
                    Public View
                  </span>
                </div>

                <div className="rounded-2xl bg-white border border-[#eceef0] overflow-hidden shadow-lg flex flex-col justify-between">
                  <div className="relative aspect-video bg-black overflow-hidden group">
                    {editingStory.thumbnail ? (
                      <img
                        alt={editingStory.title || 'Story preview'}
                        src={editingStory.thumbnail}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                        <span className="material-symbols-outlined text-[40px]">videocam</span>
                        <span className="text-[12px] mt-1">Upload video or cover photo</span>
                      </div>
                    )}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#004c22] text-[#acf770] shadow-sm">
                      {editingStory.outcomeBadge || 'Clinical Outcome'}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <span className="w-12 h-12 rounded-full bg-[#acf770] text-[#004c22] flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-[28px]">play_arrow</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#556055]">
                      <span className="font-extrabold uppercase tracking-wider text-[#004c22]">
                        {editingStory.category === 'other'
                          ? customCategoryInput || 'Other Case'
                          : editingStory.category || 'pain'}
                      </span>
                      <span>{editingStory.location || 'EHMCare Center • Ilorin'}</span>
                    </div>

                    <h4 className="font-extrabold text-[15px] text-[#191c1e] leading-snug">
                      {editingStory.title || 'Story Title Preview Will Appear Here'}
                    </h4>

                    <p className="text-[12.5px] text-[#404940]">
                      <strong>Patient:</strong> {editingStory.patientName || 'Patient Name'} •{' '}
                      <strong>Diagnosis:</strong> {editingStory.condition || 'Clinical Condition'}
                    </p>

                    <p className="text-[12px] text-[#556055] italic line-clamp-3 bg-[#f7f9fb] p-2.5 rounded-lg border border-[#eceef0]">
                      "{editingStory.quote || 'Patient testimonial quote preview...'}"
                    </p>
                  </div>

                  <div className="p-3 bg-[#f6f8f7] border-t border-[#eceef0] flex items-center justify-between text-[11.5px]">
                    <span className="font-bold text-[#004c22] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      <span>Verified Outcome</span>
                    </span>
                    <span className="text-[#556055]">
                      {editingStory.videoFileName || (editingStory.youtubeId ? 'YouTube Verified' : 'Documented')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PATIENT SUCCESS VIDEOS TAB (List View) */}
        {activeTab === 'stories' && storyViewMode === 'list' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-[22px] font-extrabold text-[#004c22]">
                  Patient Success Video Gallery Manager
                </h2>
                <p className="text-[13px] text-[#404940]">
                  Manage patient recovery stories, YouTube Shorts, and direct video uploads displayed on the public site.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingStory({
                    category: 'pain',
                    outcomeBadge: 'Relief Verified',
                    location: 'EHMCare Center • Ilorin',
                    dateRecorded: 'EHMCare Official Clinic Channel',
                    visible: true,
                  });
                  setCustomCategoryInput('');
                  setStoryVideoSourceType('link');
                  setStoryImageSourceType('upload');
                  setStoryBroadcastOptin(true);
                  setStoryViewMode('editor');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#004c22] text-[#acf770] font-black text-[13px] hover:bg-[#166534] transition-colors cursor-pointer shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Post New Success Story</span>
              </button>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className={`rounded-2xl bg-white border overflow-hidden shadow-2xs flex flex-col justify-between transition-all ${
                    story.visible ? 'border-[#eceef0]' : 'border-dashed border-gray-300 opacity-60'
                  }`}
                >
                  <div>
                    {/* Thumbnail View */}
                    <div className="relative aspect-video bg-black overflow-hidden group">
                      <img
                        alt={story.title}
                        src={story.thumbnail}
                        className="w-full h-full object-cover object-center"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#004c22] text-[#acf770]">
                        {story.outcomeBadge}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenVideo &&
                          onOpenVideo(
                            story.title,
                            story.condition,
                            story.thumbnail,
                            story.youtubeId,
                            story.videoUrl
                          )
                        }
                        className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors cursor-pointer"
                      >
                        <span className="w-12 h-12 rounded-full bg-[#acf770] text-[#004c22] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-[28px]">play_arrow</span>
                        </span>
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-[11px] text-[#556055] mb-1">
                        <span className="font-bold uppercase tracking-wider text-[#004c22]">
                          {story.categoryLabel || story.category}
                        </span>
                        <span>{story.location}</span>
                      </div>
                      <h4 className="font-extrabold text-[14px] text-[#191c1e] line-clamp-2">
                        {story.title}
                      </h4>
                      <p className="text-[12px] text-[#404940] mt-1 line-clamp-2">
                        <strong>Patient:</strong> {story.patientName} • <strong>Condition:</strong> {story.condition}
                      </p>
                      <p className="text-[11.5px] text-[#556055] mt-1 italic line-clamp-2">
                        "{story.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-3 bg-[#f6f8f7] border-t border-[#eceef0] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        toggleStoryVisibility(story.id, !story.visible);
                        setStories(getSuccessStories());
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer flex items-center gap-1 ${
                        story.visible
                          ? 'bg-[#004c22]/10 text-[#004c22]'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {story.visible ? 'visibility' : 'visibility_off'}
                      </span>
                      <span>{story.visible ? 'Visible' : 'Hidden'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const isCustomCat = !['stroke', 'pain', 'infertility', 'neurology', 'pediatric', 'clinic'].includes(story.category);
                          setEditingStory({
                            ...story,
                            category: isCustomCat ? 'other' : story.category,
                          });
                          setCustomCategoryInput(story.categoryLabel || (isCustomCat ? story.category : ''));
                          setStoryVideoSourceType(story.videoFileName ? 'upload' : 'link');
                          setStoryImageSourceType(story.imageFileName ? 'upload' : 'link');
                          setStoryBroadcastOptin(false);
                          setStoryViewMode('editor');
                        }}
                        className="p-1.5 rounded hover:bg-[#e0e3e5] text-[#004c22] cursor-pointer"
                        title="Edit story on page"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      {story.isCustom && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete story for ${story.patientName}?`)) {
                              deleteSuccessStory(story.id);
                              setStories(getSuccessStories());
                            }
                          }}
                          className="p-1.5 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                          title="Delete story"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. CLASSROOMS & LMS FOOTAGE TAB */}
        {activeTab === 'academy' && footageViewMode === 'editor' && (
          <div className="space-y-6">
            {/* Top Navigation & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#eceef0]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFootageViewMode('list')}
                  className="w-10 h-10 rounded-xl bg-white border border-[#eceef0] hover:bg-gray-100 flex items-center justify-center text-[#004c22] transition-colors cursor-pointer shadow-2xs"
                  title="Return to Footage List"
                >
                  <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                </button>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#acf770]/40 text-[#004c22] text-[11px] font-bold uppercase tracking-wider mb-1">
                    <span className="material-symbols-outlined text-[14px]">school</span>
                    <span>Classroom & Clinical Session Publisher</span>
                  </div>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#004c22] leading-tight">
                    {editingFootage.id ? 'Edit Classroom / Theory Session' : 'Add Classroom / Theory Session'}
                  </h2>
                  <p className="text-[12.5px] text-[#404940]">
                    Upload or link video footage, designate curriculum module, set academic track, and publish to the public academy gallery.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setFootageViewMode('list')}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#404940] font-bold text-[12.5px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="footageEditorForm"
                  className="px-6 py-2.5 rounded-xl bg-[#004c22] text-[#acf770] font-black text-[13px] hover:bg-[#166534] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">publish</span>
                  <span>Save Classroom Session</span>
                </button>
              </div>
            </div>

            {/* Main Form Layout (2 Columns: Form on Left, Live Preview on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Column: Form Inputs */}
              <form id="footageEditorForm" onSubmit={handleSaveFootage} className="lg:col-span-2 space-y-5">
                {/* 1. Video Source Section */}
                <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-extrabold text-[#004c22] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">movie</span>
                      <span>1. Video Source (Any Channel or Upload)</span>
                    </h3>

                    {/* Source Toggle */}
                    <div className="flex items-center bg-[#f2f4f6] p-1 rounded-xl text-[12px] font-bold">
                      <button
                        type="button"
                        onClick={() => setFootageVideoSourceType('link')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          footageVideoSourceType === 'link'
                            ? 'bg-[#004c22] text-[#acf770] shadow-xs'
                            : 'text-[#404940] hover:text-[#004c22]'
                        }`}
                      >
                        Online Video Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setFootageVideoSourceType('upload')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          footageVideoSourceType === 'upload'
                            ? 'bg-[#004c22] text-[#acf770] shadow-xs'
                            : 'text-[#404940] hover:text-[#004c22]'
                        }`}
                      >
                        Upload Video File
                      </button>
                    </div>
                  </div>

                  {footageVideoSourceType === 'link' ? (
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Video URL from Any Channel / Platform
                      </label>
                      <input
                        type="text"
                        value={editingFootage.youtubeId || editingFootage.videoUrl || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const yt = extractYouTubeId(val);
                          setEditingFootage((prev) => ({
                            ...prev,
                            youtubeId: yt,
                            videoUrl: val,
                            videoSourceType: yt ? 'youtube' : 'external',
                            thumbnail: yt ? getYouTubeThumbnail(yt) : prev.thumbnail,
                          }));
                        }}
                        placeholder="e.g. YouTube watch/shorts link, Vimeo, Drive, LMS live stream, or direct .mp4 URL"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#004c22]"
                      />
                      <p className="text-[11px] text-[#556055] mt-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">info</span>
                        <span>Accepts YouTube lectures, LMS streaming URLs, Vimeo, direct MP4 streams, and educational videos from any channel.</span>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="p-5 rounded-xl border-2 border-dashed border-[#004c22]/30 bg-[#f7f9fb] text-center hover:bg-[#f2f4f6] transition-colors relative">
                        <input
                          type="file"
                          accept="video/*"
                          id="footageVideoUploadInput"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const objectUrl = URL.createObjectURL(file);
                            setEditingFootage((prev) => ({
                              ...prev,
                              videoUrl: objectUrl,
                              videoFileName: file.name,
                              videoSourceType: 'upload',
                              youtubeId: undefined,
                              hoursOrDuration: `${(file.size / (1024 * 1024)).toFixed(1)} MB Video File`,
                            }));
                          }}
                        />
                        <label htmlFor="footageVideoUploadInput" className="cursor-pointer block py-2">
                          <span className="material-symbols-outlined text-[42px] text-[#004c22]">
                            cloud_upload
                          </span>
                          <p className="text-[13.5px] font-extrabold text-[#004c22] mt-1">
                            {editingFootage.videoFileName
                              ? `Selected File: ${editingFootage.videoFileName}`
                              : 'Click or Drag to Upload Classroom Video from Computer / Mobile'}
                          </p>
                          <p className="text-[11.5px] text-[#556055] mt-0.5">
                            Supports MP4, WebM, MOV, and any recorded lecture or lab footage.
                          </p>
                        </label>
                      </div>

                      {editingFootage.videoUrl && (
                        <div className="mt-3 p-3 bg-black rounded-xl overflow-hidden">
                          <p className="text-[11px] text-[#acf770] font-bold mb-2">Live Video Playback Preview:</p>
                          <video
                            src={editingFootage.videoUrl}
                            controls
                            className="aspect-video w-full rounded-lg bg-black"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Cover Photo / Thumbnail Section */}
                <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-extrabold text-[#004c22] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">image</span>
                      <span>2. Thumbnail / Cover Image</span>
                    </h3>

                    {/* Image Source Toggle */}
                    <div className="flex items-center bg-[#f2f4f6] p-1 rounded-xl text-[12px] font-bold">
                      <button
                        type="button"
                        onClick={() => setFootageImageSourceType('upload')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          footageImageSourceType === 'upload'
                            ? 'bg-[#004c22] text-[#acf770] shadow-xs'
                            : 'text-[#404940] hover:text-[#004c22]'
                        }`}
                      >
                        Upload Image File
                      </button>
                      <button
                        type="button"
                        onClick={() => setFootageImageSourceType('link')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          footageImageSourceType === 'link'
                            ? 'bg-[#004c22] text-[#acf770] shadow-xs'
                            : 'text-[#404940] hover:text-[#004c22]'
                        }`}
                      >
                        Image URL / Preset
                      </button>
                    </div>
                  </div>

                  {footageImageSourceType === 'upload' ? (
                    <div>
                      <div className="p-4 rounded-xl border-2 border-dashed border-[#bfc9bd] bg-[#f7f9fb] text-center hover:bg-[#f2f4f6] transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          id="footageImageUploadInput"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setEditingFootage((prev) => ({
                                ...prev,
                                thumbnail: ev.target?.result as string,
                                imageFileName: file.name,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <label htmlFor="footageImageUploadInput" className="cursor-pointer block py-2">
                          <span className="material-symbols-outlined text-[36px] text-[#004c22]">
                            add_photo_alternate
                          </span>
                          <p className="text-[13px] font-bold text-[#004c22] mt-0.5">
                            {editingFootage.imageFileName
                              ? `Selected: ${editingFootage.imageFileName}`
                              : 'Click to Upload Classroom Photo or Lecture Slide Thumbnail'}
                          </p>
                          <p className="text-[11px] text-[#556055]">JPG, PNG, or WebP</p>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Cover Image / Thumbnail URL
                      </label>
                      <input
                        type="text"
                        value={editingFootage.thumbnail || ''}
                        onChange={(e) =>
                          setEditingFootage((prev) => ({ ...prev, thumbnail: e.target.value }))
                        }
                        placeholder="https://images.unsplash.com/... or auto-filled"
                        className="w-full h-10 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                      />
                    </div>
                  )}

                  {editingFootage.thumbnail && (
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-200">
                      <img
                        src={editingFootage.thumbnail}
                        alt="Thumbnail"
                        className="w-24 h-16 object-cover rounded-lg border border-gray-300"
                      />
                      <div className="text-[12px]">
                        <p className="font-bold text-[#004c22]">Classroom Cover Active</p>
                        <p className="text-[#556055] text-[11px]">
                          {editingFootage.imageFileName || 'Ready to display on public card'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Academic Track, Module & Details */}
                <div className="p-5 rounded-2xl bg-white border border-[#eceef0] shadow-2xs space-y-4">
                  <h3 className="text-[15px] font-extrabold text-[#004c22] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    <span>3. Track, Curriculum & Instructor Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Track / Type with "Others (Type Manually)" */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Type / Track *
                      </label>
                      <select
                        value={editingFootage.type || 'classroom'}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingFootage((prev) => ({ ...prev, type: val }));
                        }}
                        className="w-full h-11 px-3 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e] font-semibold"
                      >
                        <option value="classroom">Classrooms and Clinical Theory in Session</option>
                        <option value="practicum">Clinical Bedside Practicum & Lab</option>
                        <option value="webinar">Guest Speaker Webinar & Health Talk</option>
                        <option value="lms-stream">1080p LMS Dynamic Stream</option>
                        <option value="other">Others (Type manually...)</option>
                      </select>

                      {/* When "Others" is selected, show manual text typing input */}
                      {editingFootage.type === 'other' && (
                        <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 animate-fadeIn">
                          <label className="block text-[11.5px] font-extrabold text-amber-900 mb-1">
                            Type Custom Track / Session Type:
                          </label>
                          <input
                            type="text"
                            required
                            value={customTypeInput}
                            onChange={(e) => setCustomTypeInput(e.target.value)}
                            placeholder="e.g. Acupuncture Needling Workshop, Pharmacognosy Lab..."
                            className="w-full h-9 px-3 rounded-lg bg-white border border-amber-300 text-[13px] text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#004c22]"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Curriculum Module / Category *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingFootage.moduleName || ''}
                        onChange={(e) =>
                          setEditingFootage((prev) => ({ ...prev, moduleName: e.target.value }))
                        }
                        placeholder="e.g. TCM Diagnostics 201 • Meridian Biophysics"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                      Session Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingFootage.title || ''}
                      onChange={(e) =>
                        setEditingFootage((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="e.g. Branches of Medicine & Chi-Energy Meridian Systems"
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Lead Instructor / Preceptor
                      </label>
                      <input
                        type="text"
                        value={editingFootage.instructor || ''}
                        onChange={(e) =>
                          setEditingFootage((prev) => ({ ...prev, instructor: e.target.value }))
                        }
                        placeholder="e.g. Dr. Alaba Emmanuel & Preceptors"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Lecture Location / Facility
                      </label>
                      <input
                        type="text"
                        value={editingFootage.location || ''}
                        onChange={(e) =>
                          setEditingFootage((prev) => ({ ...prev, location: e.target.value }))
                        }
                        placeholder="e.g. Saboke Center Lecture Hall, Ilorin"
                        className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                      Hours / Duration *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingFootage.hoursOrDuration || ''}
                      onChange={(e) =>
                        setEditingFootage((prev) => ({ ...prev, hoursOrDuration: e.target.value }))
                      }
                      placeholder="e.g. 2 Hours Theory • 4 Hours Practicum"
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f4f6] border border-[#bfc9bd] text-[13px] text-[#191c1e]"
                    />
                    {/* Suggestion Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {['2 Hours Theory • 4 Hours Practicum', '36 Contact Hours', '1 Hour Session', 'Full Day Clinical Workshop', 'LMS Dynamic Stream'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setEditingFootage((prev) => ({ ...prev, hoursOrDuration: tag }))}
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#004c22] cursor-pointer"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-4 border-t border-[#eceef0] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setFootageViewMode('list')}
                      className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#404940] font-bold text-[13px] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl bg-[#004c22] text-[#acf770] font-extrabold text-[14px] hover:bg-[#166534] shadow-md transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[20px]">publish</span>
                      <span>Publish Classroom Session</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Right Column: Live Interactive Preview */}
              <div className="space-y-4 lg:sticky lg:top-28">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-extrabold text-[#004c22] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">preview</span>
                    <span>Live Public Card Preview</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#acf770] text-[#004c22]">
                    Public View
                  </span>
                </div>

                <div className="rounded-2xl bg-white border border-[#eceef0] overflow-hidden shadow-lg flex flex-col justify-between">
                  <div className="relative aspect-video bg-black overflow-hidden group">
                    {editingFootage.thumbnail ? (
                      <img
                        alt={editingFootage.title || 'Session preview'}
                        src={editingFootage.thumbnail}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                        <span className="material-symbols-outlined text-[40px]">school</span>
                        <span className="text-[12px] mt-1">Upload video or cover photo</span>
                      </div>
                    )}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#004c22] text-white shadow-sm">
                      {editingFootage.type === 'other'
                        ? customTypeInput || 'Custom Track'
                        : editingFootage.type || 'classroom'}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <span className="w-12 h-12 rounded-full bg-[#acf770] text-[#004c22] flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-[28px]">play_arrow</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <p className="text-[11px] font-bold text-[#356b00] uppercase">
                      {editingFootage.moduleName || 'Curriculum Module'} •{' '}
                      {editingFootage.hoursOrDuration || 'Duration'}
                    </p>

                    <h4 className="font-extrabold text-[15px] text-[#191c1e] leading-snug">
                      {editingFootage.title || 'Session Title Preview Will Appear Here'}
                    </h4>

                    <p className="text-[12.5px] text-[#404940]">
                      <strong>Instructor:</strong> {editingFootage.instructor || 'Lead Instructor'}
                    </p>

                    <p className="text-[12px] text-[#556055] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      <span>{editingFootage.location || 'Saboke Center Lecture Hall, Ilorin'}</span>
                    </p>
                  </div>

                  <div className="p-3 bg-[#f6f8f7] border-t border-[#eceef0] flex items-center justify-between text-[11.5px]">
                    <span className="font-bold text-[#004c22] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      <span>EHMCare Academy</span>
                    </span>
                    <span className="text-[#556055]">
                      {editingFootage.videoFileName || (editingFootage.youtubeId ? 'Stream Verified' : 'Live Session')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CLASSROOMS & LMS FOOTAGE TAB (List View) */}
        {activeTab === 'academy' && footageViewMode === 'list' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-[22px] font-extrabold text-[#004c22]">
                  Live Academy Footage & Classroom Sessions
                </h2>
                <p className="text-[13px] text-[#404940]">
                  Manage classroom theory sessions, live lab demonstrations, and student LMS lectures.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingFootage({
                    type: 'classroom',
                    subtitle: 'Classrooms and Clinical Theory in Session',
                    moduleName: 'Classroom & Clinical Session',
                    instructor: 'Dr. Alaba Emmanuel & Preceptors',
                    location: 'Saboke Center Lecture Hall, Ilorin',
                    hoursOrDuration: '2 Hours Theory • 4 Hours Practicum',
                    visible: true,
                  });
                  setCustomTypeInput('');
                  setFootageVideoSourceType('link');
                  setFootageImageSourceType('upload');
                  setFootageViewMode('editor');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#004c22] text-[#acf770] font-black text-[13px] hover:bg-[#166534] transition-colors cursor-pointer shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Add Classroom / Lecture</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {footage.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl bg-white border overflow-hidden shadow-2xs flex flex-col justify-between transition-all ${
                    item.visible ? 'border-[#eceef0]' : 'border-dashed border-gray-300 opacity-60'
                  }`}
                >
                  <div>
                    <div className="relative aspect-video bg-black overflow-hidden group">
                      <img
                        alt={item.title}
                        src={item.thumbnail}
                        className="w-full h-full object-cover object-center"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#004c22] text-white">
                        {item.typeLabel || item.type}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenVideo &&
                          onOpenVideo(
                            item.title,
                            item.subtitle || item.moduleName || 'Classroom Session',
                            item.thumbnail,
                            item.youtubeId,
                            item.videoUrl
                          )
                        }
                        className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors cursor-pointer"
                      >
                        <span className="w-12 h-12 rounded-full bg-[#acf770] text-[#004c22] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-[28px]">play_arrow</span>
                        </span>
                      </button>
                    </div>

                    <div className="p-4">
                      <p className="text-[11px] font-bold text-[#356b00] uppercase">
                        {item.moduleName} • {item.hoursOrDuration}
                      </p>
                      <h4 className="font-bold text-[14.5px] text-[#191c1e] mt-1 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[12px] text-[#404940] mt-1">
                        <strong>Instructor:</strong> {item.instructor}
                      </p>
                      <p className="text-[11.5px] text-[#556055] mt-0.5">{item.location}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#f6f8f7] border-t border-[#eceef0] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        toggleFootageVisibility(item.id, !item.visible);
                        setFootage(getAcademyFootage());
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer flex items-center gap-1 ${
                        item.visible
                          ? 'bg-[#004c22]/10 text-[#004c22]'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {item.visible ? 'visibility' : 'visibility_off'}
                      </span>
                      <span>{item.visible ? 'Public' : 'Hidden'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const isCustomType = !['classroom', 'practicum', 'webinar', 'lms-stream'].includes(item.type);
                          setEditingFootage({
                            ...item,
                            type: isCustomType ? 'other' : item.type,
                          });
                          setCustomTypeInput(item.typeLabel || (isCustomType ? item.type : ''));
                          setFootageVideoSourceType(item.videoFileName ? 'upload' : 'link');
                          setFootageImageSourceType(item.imageFileName ? 'upload' : 'link');
                          setFootageViewMode('editor');
                        }}
                        className="p-1.5 rounded hover:bg-[#e0e3e5] text-[#004c22] cursor-pointer"
                        title="Edit classroom session on page"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      {item.isCustom && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete session: ${item.title}?`)) {
                              deleteAcademyFootage(item.id);
                              setFootage(getAcademyFootage());
                            }
                          }}
                          className="p-1.5 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                          title="Delete session"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. FORM SUBMISSIONS INBOX TAB */}
        {activeTab === 'inbox' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-[22px] font-extrabold text-[#004c22]">
                  Central Form Submissions Inbox
                </h2>
                <p className="text-[13px] text-[#404940]">
                  Every booking, admission application, and investor deck request lands here and alerts{' '}
                  <span className="font-mono text-[#004c22]">ehmcaree@gmail.com</span> &{' '}
                  <span className="font-mono text-[#004c22]">aalqutijifawy@gmail.com</span>.
                </p>
              </div>

              <button
                onClick={exportInboxCsv}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#bfc9bd] hover:bg-[#f2f4f6] text-[#004c22] font-bold text-[12.5px] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-2xs"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Export CSV</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-xl bg-white border border-[#eceef0] shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {(
                  [
                    { id: 'all', label: `All (${submissions.length})` },
                    {
                      id: 'consultation',
                      label: `Bookings (${submissions.filter((s) => s.type === 'consultation').length})`,
                    },
                    {
                      id: 'academy-application',
                      label: `Academy (${submissions.filter((s) => s.type === 'academy-application').length})`,
                    },
                    {
                      id: 'investor-inquiry',
                      label: `Investors (${submissions.filter((s) => s.type === 'investor-inquiry').length})`,
                    },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setInboxFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-bold whitespace-nowrap cursor-pointer transition-colors ${
                      inboxFilter === f.id
                        ? 'bg-[#004c22] text-[#acf770]'
                        : 'bg-[#f2f4f6] text-[#404940] hover:bg-[#e0e3e5]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  value={inboxSearch}
                  onChange={(e) => setInboxSearch(e.target.value)}
                  placeholder="Search name, phone, email..."
                  className="w-full h-9 pl-8 pr-3 rounded-lg bg-[#f2f4f6] border border-[#bfc9bd] text-[12.5px] focus:outline-none focus:ring-2 focus:ring-[#004c22]"
                />
                <span className="material-symbols-outlined text-[16px] text-gray-500 absolute left-2.5 top-2.5">
                  search
                </span>
              </div>
            </div>

            {/* Submissions Table / Cards */}
            <div className="bg-white rounded-2xl border border-[#eceef0] shadow-sm overflow-hidden">
              {filteredSubmissions.length === 0 ? (
                <div className="p-12 text-center text-[#556055]">
                  <span className="material-symbols-outlined text-[40px] text-gray-400">inbox</span>
                  <p className="font-bold text-[14px] mt-2">No matching submissions found</p>
                  <p className="text-[12px]">All incoming forms will automatically show up here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px] border-collapse">
                    <thead className="bg-[#f2f4f6] border-b border-[#eceef0] text-[11px] font-bold uppercase text-[#404940]">
                      <tr>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Patient / Contact</th>
                        <th className="py-3 px-4">Subject / Program</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Quick Contact Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eceef0]">
                      {filteredSubmissions.map((sub) => {
                        const rawPhone = sub.phone.replace(/[^0-9]/g, '');
                        const cleanPhone = rawPhone.startsWith('0') ? '234' + rawPhone.slice(1) : rawPhone;
                        const waUrl = `https://wa.me/${cleanPhone}`;

                        return (
                          <tr key={sub.id} className="hover:bg-[#f9fafb] transition-colors">
                            <td className="py-3.5 px-4 text-[#556055] whitespace-nowrap text-[12px]">
                              {new Date(sub.createdAt).toLocaleDateString()}{' '}
                              <span className="text-[11px] text-gray-400">
                                {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-black uppercase whitespace-nowrap ${
                                  sub.type === 'consultation'
                                    ? 'bg-[#acf770]/30 text-[#004c22]'
                                    : sub.type === 'academy-application'
                                    ? 'bg-[#004c22] text-white'
                                    : 'bg-blue-100 text-blue-900'
                                }`}
                              >
                                {sub.type.replace('-', ' ')}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <p className="font-extrabold text-[#191c1e]">{sub.name}</p>
                              <p className="text-[12px] text-[#004c22] font-semibold">{sub.phone}</p>
                              {sub.email && <p className="text-[11px] text-gray-500">{sub.email}</p>}
                            </td>
                            <td className="py-3.5 px-4 max-w-xs">
                              <p className="font-bold text-[#191c1e] line-clamp-1">
                                {sub.subjectOrProgram}
                              </p>
                              <p className="text-[11.5px] text-[#556055] line-clamp-1">
                                {sub.details.notes || sub.details.date || sub.details.ticketSize || sub.source}
                              </p>
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={sub.status}
                                onChange={(e) => {
                                  updateSubmissionStatus(sub.id, e.target.value as any);
                                  setSubmissions(getFormSubmissions());
                                }}
                                className={`text-[11.5px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                  sub.status === 'pending'
                                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                                    : sub.status === 'contacted'
                                    ? 'bg-blue-50 text-blue-900 border-blue-300'
                                    : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="admitted">Admitted</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-[#acf770]/40 text-[#0c2000] hover:bg-[#acf770] transition-colors"
                                  title="Chat on WhatsApp"
                                >
                                  <span className="material-symbols-outlined text-[17px]">chat</span>
                                </a>
                                <a
                                  href={`tel:${sub.phone}`}
                                  className="p-1.5 rounded-lg bg-[#004c22]/10 text-[#004c22] hover:bg-[#004c22]/20 transition-colors"
                                  title="Call Phone"
                                >
                                  <span className="material-symbols-outlined text-[17px]">call</span>
                                </a>
                                <button
                                  type="button"
                                  onClick={() => setSelectedSubmission(sub)}
                                  className="p-1.5 rounded-lg bg-[#f2f4f6] text-[#191c1e] hover:bg-[#e0e3e5]"
                                  title="View Full Details"
                                >
                                  <span className="material-symbols-outlined text-[17px]">visibility</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm('Delete this submission record?')) {
                                      deleteSubmission(sub.id);
                                      setSubmissions(getFormSubmissions());
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                                  title="Delete Record"
                                >
                                  <span className="material-symbols-outlined text-[17px]">delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. NEWSLETTER & AUTO-BROADCAST TAB */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-[22px] font-extrabold text-[#004c22]">
                  Newsletter Subscribers & Broadcast Engine
                </h2>
                <p className="text-[13px] text-[#404940]">
                  {subscribers.length} total subscribers opted-in. Any broadcast posted here delivers to their email inboxes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Compose Broadcast Column */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#eceef0] shadow-sm">
                <h3 className="text-[16px] font-extrabold text-[#004c22] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Compose Auto-Newsletter Broadcast</span>
                </h3>

                <form onSubmit={handleSendBroadcast} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Category / Topic
                      </label>
                      <select
                        value={broadcastCategory}
                        onChange={(e) => setBroadcastCategory(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg bg-[#f2f4f6] border border-[#bfc9bd] text-[13px]"
                      >
                        <option value="Patient Case Study">Patient Case Study</option>
                        <option value="Doctor Health Advice">Doctor Health Advice</option>
                        <option value="Academy Intake Announcement">Academy Intake Announcement</option>
                        <option value="Clinical Treatment Update">Clinical Treatment Update</option>
                        <option value="Urgent Notice">Urgent Community Notice</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Email Subject Line *
                      </label>
                      <input
                        type="text"
                        required
                        value={broadcastSubject}
                        onChange={(e) => setBroadcastSubject(e.target.value)}
                        placeholder="e.g. 🌿 How Yunus Overcame Severe Leg Pain in 6 Days"
                        className="w-full h-10 px-3 rounded-lg bg-[#f2f4f6] border border-[#bfc9bd] text-[13px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                      Newsletter Headline *
                    </label>
                    <input
                      type="text"
                      required
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      placeholder="e.g. Breakthrough Clinical Outcome: Severe Pain & Mobility Restoration"
                      className="w-full h-10 px-3 rounded-lg bg-[#f2f4f6] border border-[#bfc9bd] text-[13px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                      Newsletter Content Body (Supports Paragraphs) *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={broadcastContent}
                      onChange={(e) => setBroadcastContent(e.target.value)}
                      placeholder="Write your clinical update, patient story transcript, or health advice here..."
                      className="w-full p-3 rounded-lg bg-[#f2f4f6] border border-[#bfc9bd] text-[13px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Call-to-Action Link URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={broadcastActionUrl}
                        onChange={(e) => setBroadcastActionUrl(e.target.value)}
                        placeholder="e.g. https://youtube.com/watch?v=HdZcjTvTtVo"
                        className="w-full h-10 px-3 rounded-lg bg-[#f2f4f6] border border-[#bfc9bd] text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={broadcastActionLabel}
                        onChange={(e) => setBroadcastActionLabel(e.target.value)}
                        placeholder="e.g. Watch Video Testimonial"
                        className="w-full h-10 px-3 rounded-lg bg-[#f2f4f6] border border-[#bfc9bd] text-[13px]"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f2f4f6] text-[12px] text-[#404940] flex items-center justify-between">
                    <span>
                      Target Audience: <strong>{subscribers.length} Active Subscribers</strong>
                    </span>
                    <span className="text-[#004c22] font-bold">Auto-Delivers to Inboxes</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isBroadcasting}
                    className="w-full py-3 rounded-xl bg-[#004c22] text-[#acf770] font-black text-[13.5px] hover:bg-[#166534] transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[20px]">campaign</span>
                    <span>
                      {isBroadcasting
                        ? 'Broadcasting to Inboxes...'
                        : `Dispatch Newsletter Broadcast to ${subscribers.length} Subscribers`}
                    </span>
                  </button>
                </form>
              </div>

              {/* Subscribers List Column */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#eceef0] shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-[16px] font-extrabold text-[#004c22] mb-3 flex items-center justify-between">
                    <span>Subscribers List ({subscribers.length})</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#acf770]/30 text-[#004c22]">
                      100% Opt-in
                    </span>
                  </h3>

                  <div className="divide-y divide-[#eceef0] max-h-[380px] overflow-y-auto pr-1">
                    {subscribers.map((sub, i) => (
                      <div key={i} className="py-2.5 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-[13px] text-[#191c1e]">{sub.email}</p>
                          <p className="text-[11px] text-[#556055]">
                            {sub.fullName || 'Subscriber'} • {new Date(sub.subscribedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#e0e3e5] text-[#004c22]">
                          {sub.topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Broadcast History */}
                <div className="mt-4 pt-4 border-t border-[#eceef0]">
                  <p className="text-[12px] font-bold text-[#404940] uppercase mb-2">
                    Recent Broadcasts Dispatched ({broadcasts.length})
                  </p>
                  {broadcasts.length === 0 ? (
                    <p className="text-[12px] text-gray-500 italic">No broadcast logs yet.</p>
                  ) : (
                    <div className="space-y-2 max-h-36 overflow-y-auto">
                      {broadcasts.slice(0, 3).map((bc) => (
                        <div key={bc.id} className="p-2 rounded-lg bg-[#f6f8f7] text-[12px]">
                          <p className="font-bold text-[#191c1e] line-clamp-1">{bc.title}</p>
                          <p className="text-[11px] text-[#556055]">
                            Sent to {bc.recipientCount} subscribers on {new Date(bc.sentAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. EMAIL SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-[22px] font-extrabold text-[#004c22]">
                Email Services & Notification Delivery Settings
              </h2>
              <p className="text-[13px] text-[#404940]">
                Configure which email service handles automated form notifications and newsletter broadcasts.
              </p>
            </div>

            {settingsSavedToast && (
              <div className="p-3.5 rounded-xl bg-[#acf770]/30 border border-[#356b00]/30 text-[#004c22] font-bold text-[13px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Email service settings saved successfully!</span>
              </div>
            )}

            {/* Email Provider Comparison & Recommendation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div
                onClick={() => setEmailConfigState((prev) => ({ ...prev, provider: 'resend' }))}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  emailConfig.provider === 'resend'
                    ? 'border-[#004c22] bg-[#004c22]/5 ring-2 ring-[#004c22]/20'
                    : 'border-[#eceef0] bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-[14px] text-[#004c22]">Resend</h4>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] font-black bg-[#acf770] text-[#004c22]">
                    Top Choice
                  </span>
                </div>
                <p className="text-[11.5px] text-[#404940] leading-relaxed">
                  <strong>3,000 free/mo (100/day).</strong> Native HTML formatting, instant delivery, zero credit card needed. Best for newsletter broadcasts.
                </p>
              </div>

              <div
                onClick={() => setEmailConfigState((prev) => ({ ...prev, provider: 'web3forms' }))}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  emailConfig.provider === 'web3forms'
                    ? 'border-[#004c22] bg-[#004c22]/5 ring-2 ring-[#004c22]/20'
                    : 'border-[#eceef0] bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-[14px] text-[#004c22]">Web3Forms</h4>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] font-black bg-blue-100 text-blue-900">
                    Unlimited
                  </span>
                </div>
                <p className="text-[11.5px] text-[#404940] leading-relaxed">
                  <strong>Unlimited free form submissions.</strong> Direct email forwarding to admin inboxes with zero backend required.
                </p>
              </div>

              <div
                onClick={() => setEmailConfigState((prev) => ({ ...prev, provider: 'emailjs' }))}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  emailConfig.provider === 'emailjs'
                    ? 'border-[#004c22] bg-[#004c22]/5 ring-2 ring-[#004c22]/20'
                    : 'border-[#eceef0] bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-[14px] text-[#004c22]">EmailJS</h4>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] font-black bg-purple-100 text-purple-900">
                    200/mo
                  </span>
                </div>
                <p className="text-[11.5px] text-[#404940] leading-relaxed">
                  <strong>200 emails/month free.</strong> Connects directly through Gmail/custom email via browser SDK without server dependencies.
                </p>
              </div>

              <div
                onClick={() => setEmailConfigState((prev) => ({ ...prev, provider: 'all' }))}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  emailConfig.provider === 'all'
                    ? 'border-[#004c22] bg-[#004c22]/5 ring-2 ring-[#004c22]/20'
                    : 'border-[#eceef0] bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-[14px] text-[#004c22]">Multi-Relay</h4>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] font-black bg-emerald-100 text-emerald-900">
                    Active All
                  </span>
                </div>
                <p className="text-[11.5px] text-[#404940] leading-relaxed">
                  <strong>Combined Dispatches.</strong> Sends through all configured services for maximum delivery redundancy across inboxes.
                </p>
              </div>
            </div>

            {/* Vercel & Client Storage Notice */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#004c22]/10 to-[#acf770]/20 border border-[#004c22]/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#004c22] text-[22px] shrink-0 mt-0.5">
                cloud_done
              </span>
              <div className="text-[12.5px] text-[#004c22] leading-relaxed">
                <p className="font-bold">Zero .env File Required & 100% Vercel Compatible</p>
                <p className="mt-0.5 text-[#303830]">
                  All API keys entered below are saved securely in your administrator storage. When deploying to Vercel, submissions and broadcasts communicate directly from the client without requiring backend configuration or server restarts.
                </p>
              </div>
            </div>

            {/* Config Fields */}
            <div className="p-6 rounded-2xl bg-white border border-[#eceef0] shadow-sm space-y-4">
              <h3 className="text-[16px] font-extrabold text-[#004c22]">Service Credentials & Admin Alert Emails</h3>

              <div>
                <label className="block text-[12px] font-bold text-[#191c1e] mb-1">
                  Active Admin Recipient Emails (Comma Separated) *
                </label>
                <input
                  type="text"
                  value={emailConfig.adminRecipients.join(', ')}
                  onChange={(e) =>
                    setEmailConfigState((prev) => ({
                      ...prev,
                      adminRecipients: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="e.g. ehmcaree@gmail.com, aalqutijifawy@gmail.com"
                  className="w-full h-10 px-3 rounded-lg bg-[#f2f4f6] border border-[#bfc9bd] text-[13px]"
                />
                <p className="text-[11px] text-[#556055] mt-1">
                  All consultations, student applications, and investor alerts will automatically be forwarded to these addresses.
                </p>
              </div>

              {/* Resend Config */}
              {(emailConfig.provider === 'resend' || emailConfig.provider === 'all') && (
                <div className="p-4 rounded-xl bg-[#f7f9fb] border border-[#eceef0] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[12px] font-bold text-[#004c22]">
                      Resend API Key (from resend.com)
                    </label>
                    <a
                      href="https://resend.com/api-keys"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[#004c22] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Get Resend Key</span>
                      <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                    </a>
                  </div>
                  <input
                    type="password"
                    value={emailConfig.resendApiKey || ''}
                    onChange={(e) =>
                      setEmailConfigState((prev) => ({ ...prev, resendApiKey: e.target.value }))
                    }
                    placeholder="re_xxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full h-10 px-3 rounded-lg bg-white border border-[#bfc9bd] text-[13px] font-mono"
                  />

                  <div className="pt-2">
                    <label className="block text-[11.5px] font-bold text-[#404940] mb-1">
                      Custom Verified Sender / From Email (Optional)
                    </label>
                    <input
                      type="text"
                      value={emailConfig.customFromEmail || ''}
                      onChange={(e) =>
                        setEmailConfigState((prev) => ({ ...prev, customFromEmail: e.target.value }))
                      }
                      placeholder="e.g. EHMCare Clinic <contact@ehmcare.com> (leave empty for default onboarding@resend.dev)"
                      className="w-full h-9 px-3 rounded-lg bg-white border border-[#bfc9bd] text-[12.5px]"
                    />
                  </div>

                  <p className="text-[11px] text-[#556055] leading-relaxed">
                    Free tier includes 3,000 emails/month (100/day) with no credit card required. In testing mode (using onboarding@resend.dev), alerts automatically deliver to your registered account owner email. To send directly to custom addresses, verify a clinic domain at resend.com/domains.
                  </p>
                </div>
              )}

              {/* Web3Forms Config */}
              {(emailConfig.provider === 'web3forms' || emailConfig.provider === 'all') && (
                <div className="p-4 rounded-xl bg-[#f7f9fb] border border-[#eceef0] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[12px] font-bold text-[#004c22]">
                      Web3Forms Access Key (from web3forms.com)
                    </label>
                    <a
                      href="https://web3forms.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[#004c22] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Get Free Access Key</span>
                      <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                    </a>
                  </div>
                  <input
                    type="password"
                    value={emailConfig.web3FormsKey || ''}
                    onChange={(e) =>
                      setEmailConfigState((prev) => ({ ...prev, web3FormsKey: e.target.value }))
                    }
                    placeholder="Enter your Web3Forms access key"
                    className="w-full h-10 px-3 rounded-lg bg-white border border-[#bfc9bd] text-[13px] font-mono"
                  />
                  <p className="text-[11px] text-[#556055]">
                    Unlimited form submissions delivered directly to admin inboxes with instant setup.
                  </p>
                </div>
              )}

              {/* EmailJS Config */}
              {(emailConfig.provider === 'emailjs' || emailConfig.provider === 'all') && (
                <div className="p-4 rounded-xl bg-[#f7f9fb] border border-[#eceef0] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-[12px] font-bold text-[#004c22]">
                      EmailJS Credentials (from emailjs.com)
                    </label>
                    <a
                      href="https://www.emailjs.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[#004c22] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>emailjs.com</span>
                      <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#404940] mb-1">
                        Public Key (User ID)
                      </label>
                      <input
                        type="text"
                        value={emailConfig.emailJsPublicKey || ''}
                        onChange={(e) =>
                          setEmailConfigState((prev) => ({ ...prev, emailJsPublicKey: e.target.value }))
                        }
                        placeholder="e.g. user_xxx / public_key"
                        className="w-full h-9 px-3 rounded-lg bg-white border border-[#bfc9bd] text-[12px] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#404940] mb-1">
                        Service ID
                      </label>
                      <input
                        type="text"
                        value={emailConfig.emailJsServiceId || ''}
                        onChange={(e) =>
                          setEmailConfigState((prev) => ({ ...prev, emailJsServiceId: e.target.value }))
                        }
                        placeholder="service_xxx"
                        className="w-full h-9 px-3 rounded-lg bg-white border border-[#bfc9bd] text-[12px] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#404940] mb-1">
                        Template ID
                      </label>
                      <input
                        type="text"
                        value={emailConfig.emailJsTemplateId || ''}
                        onChange={(e) =>
                          setEmailConfigState((prev) => ({ ...prev, emailJsTemplateId: e.target.value }))
                        }
                        placeholder="template_xxx"
                        className="w-full h-9 px-3 rounded-lg bg-white border border-[#bfc9bd] text-[12px] font-mono"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#556055]">
                    200 emails/month free connecting your Gmail or domain SMTP via browser REST API.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="autoBroadcast"
                  checked={emailConfig.autoBroadcastOnNewStory}
                  onChange={(e) =>
                    setEmailConfigState((prev) => ({
                      ...prev,
                      autoBroadcastOnNewStory: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-[#004c22] rounded cursor-pointer"
                />
                <label htmlFor="autoBroadcast" className="text-[13px] font-semibold text-[#191c1e] cursor-pointer">
                  Automatically prompt newsletter broadcast whenever a new Patient Success Video is posted
                </label>
              </div>

              <div className="pt-4 border-t border-[#eceef0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleTestEmail}
                  disabled={isTestingEmail}
                  className="px-4 py-2.5 rounded-xl bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#004c22] font-bold text-[12.5px] cursor-pointer transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isTestingEmail ? 'sync' : 'mark_email_read'}
                  </span>
                  <span>{isTestingEmail ? 'Sending Test...' : 'Send Test Verification Email'}</span>
                </button>

                <div className="flex items-center justify-end gap-3 flex-wrap">
                  {settingsSavedToast && (
                    <div className="px-3.5 py-2 rounded-xl bg-emerald-100 border border-emerald-300 text-[#004c22] font-extrabold text-[12.5px] flex items-center gap-1.5 animate-fadeIn shadow-2xs">
                      <span className="material-symbols-outlined text-[18px] text-emerald-700">check_circle</span>
                      <span>Settings & Resend Key Saved!</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      saveEmailConfig(emailConfig);
                      setSettingsSavedToast(true);
                      setTimeout(() => setSettingsSavedToast(false), 4000);
                    }}
                    className={`px-7 py-2.5 rounded-xl font-black text-[13px] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 ${
                      settingsSavedToast
                        ? 'bg-[#166534] text-[#acf770] ring-2 ring-[#acf770]/50 scale-[1.02]'
                        : 'bg-[#004c22] text-[#acf770] hover:bg-[#166534]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {settingsSavedToast ? 'check_circle' : 'save'}
                    </span>
                    <span>{settingsSavedToast ? 'Settings Saved Successfully!' : 'Save Email Settings'}</span>
                  </button>
                </div>
              </div>

              {testEmailResult && (
                <div
                  className={`p-3.5 rounded-xl text-[12.5px] font-semibold border flex items-start gap-2.5 animate-fadeIn ${
                    testEmailResult.startsWith('✅')
                      ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                      : 'bg-amber-50 text-amber-950 border-amber-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">
                    {testEmailResult.startsWith('✅') ? 'check_circle' : 'info'}
                  </span>
                  <div className="leading-relaxed">
                    <p className="font-bold">{testEmailResult}</p>
                    <p className="text-[11.5px] opacity-80 mt-0.5">
                      Recipients: <strong>{emailConfig.adminRecipients.join(', ')}</strong> • All bookings, academy applications, and investor alerts will route here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>



      {/* MODAL 3: SUBMISSION FULL DETAILS VIEW */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#eceef0] my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0]">
              <div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#004c22] text-white">
                  {selectedSubmission.type.replace('-', ' ')}
                </span>
                <h3 className="font-extrabold text-[17px] text-[#004c22] mt-1">
                  {selectedSubmission.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3 text-[13px]">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#f6f8f7]">
                <div>
                  <p className="text-[11px] text-[#556055] font-bold">Phone Number:</p>
                  <p className="font-extrabold text-[#004c22]">{selectedSubmission.phone}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#556055] font-bold">Email Address:</p>
                  <p className="font-extrabold text-[#191c1e]">{selectedSubmission.email || 'None'}</p>
                </div>
                <div className="col-span-2 pt-1 border-t border-gray-200">
                  <p className="text-[11px] text-[#556055] font-bold">Date Received:</p>
                  <p className="font-medium text-[#191c1e]">
                    {new Date(selectedSubmission.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-bold text-[#191c1e] mb-1">Submitted Information:</p>
                <div className="p-3 rounded-xl border border-[#eceef0] space-y-1.5 text-[12.5px]">
                  {Object.entries(selectedSubmission.details).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <span className="text-[#556055] capitalize font-medium">{k}:</span>
                      <span className="font-bold text-[#191c1e] text-right">{String(v || 'N/A')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#eceef0] flex items-center justify-between">
              <a
                href={`https://wa.me/${selectedSubmission.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-[#acf770] text-[#004c22] font-extrabold text-[12px] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Open WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[12px] font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
