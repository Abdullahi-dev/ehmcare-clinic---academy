import {
  SuccessStoryItem,
  AcademyFootageItem,
  ConsultationBooking,
  AcademyApplication,
  InvestorInquiry,
  NewsletterSubscriber,
  NewsletterBroadcastRecord,
} from '../types.ts';
import bayoIssaThumb from '../assets/images/bayo_issa_testimonial.jpg';
import yunusAbubakarThumb from '../assets/images/yunus_abubakar_testimonial.jpg';
import treatedPatientThumb from '../assets/images/treated_patient_testimonial.jpg';
import comfortWardThumb from '../assets/images/ehmcare_comfort_ward.jpg';
import tcmExpertThumb from '../assets/images/ehmcare_tcm_expert.jpg';
import clinicOverviewThumb from '../assets/images/ehmcare_clinic_overview.jpg';
import { IMAGES } from '../data/content.ts';

export const AUTHORIZED_ADMIN_EMAILS = [
  'ehmcaree@gmail.com',
  'aalqutijifawy@gmail.com',
  'devabdultechnologies@gmail.com',
];

// Helper to extract YouTube video ID from normal URL, shorts, youtu.be, or embed URL
export function extractYouTubeId(urlOrId: string): string | undefined {
  if (!urlOrId) return undefined;
  const clean = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;

  const shortsMatch = clean.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i);
  if (shortsMatch) return shortsMatch[1];

  const watchMatch = clean.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/i);
  if (watchMatch) return watchMatch[1];

  return undefined;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// Built-in initial success stories
const INITIAL_SUCCESS_STORIES: SuccessStoryItem[] = [
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
    visible: true,
    isCustom: false,
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
    visible: true,
    isCustom: false,
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
    visible: true,
    isCustom: false,
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
      'Experience the calm, dignified healing environment at EHMCare. Private rooms, 24/7 dedicated nursing staff, and round-the-clock doctor care for fast holistic recovery.',
    specialtyId: 'neuro-acupuncture',
    dateRecorded: 'EHMCare Official YouTube Channel',
    visible: true,
    isCustom: false,
  },
  {
    id: 'tcm-expert-demonstration',
    category: 'clinic',
    title: 'Behind the Scenes: How Traditional Chinese Medicine Heals at EHMCare',
    patientName: 'Clinical Team Practicum',
    location: 'Sabo-Oke Center • Ilorin',
    condition: 'Comprehensive TCCM Diagnostic & Therapeutic Approach',
    recoverySummary: 'Our lead TCM physicians explain how ancient Chinese medicine principles are integrated with modern clinical assessments to identify the root causes of disease.',
    outcomeBadge: 'Physician Supervised',
    duration: 'YouTube Verified',
    thumbnail: tcmExpertThumb,
    youtubeId: 'P_3j8vM33V4',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/P_3j8vM33V4',
    quote:
      'We do not merely suppress symptoms. We look at the body as an interconnected energetic network. Restoring flow to the meridians allows the body natural self-healing capacity to take over.',
    specialtyId: 'herbal-pharmacotherapy',
    dateRecorded: 'EHMCare Official YouTube Channel',
    visible: true,
    isCustom: false,
  },
  {
    id: 'clinic-overview-walkthrough',
    category: 'clinic',
    title: 'Welcome to EHMCare: Modern Holistic Hospital Center in Ilorin',
    patientName: 'Facility Walkthrough',
    location: '4 Sofoluwe Street, Sabo-Oke, Ilorin',
    condition: 'Integrated Medicine • Inpatient & Outpatient Facilities',
    recoverySummary: 'A walkthrough of the full EHMCare clinical complex: consultation suites, herbal dispensary, sterile cupping theater, and specialized rehabilitation wards.',
    outcomeBadge: 'Virtual Center Tour',
    duration: 'YouTube Verified',
    thumbnail: clinicOverviewThumb,
    youtubeId: '8qK_5aO9f08',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/8qK_5aO9f08',
    quote:
      'From the moment a patient steps into our Ilorin center, every detail is engineered for healing, peace of mind, and clinical excellence.',
    specialtyId: 'stroke-rehab',
    dateRecorded: 'EHMCare Official YouTube Channel',
    visible: true,
    isCustom: false,
  },
];

// Initial Academy & LMS Footage
const INITIAL_ACADEMY_FOOTAGE: AcademyFootageItem[] = [
  {
    id: 'acad-module-1',
    type: 'classroom',
    title: 'Branches of Medicine & Chi-Energy Meridian Systems',
    subtitle: 'Classrooms and Clinical Theory in Session',
    moduleName: 'Lecture Module I',
    instructor: 'Dr. Alaba Emmanuel (Head TCM Physician)',
    location: 'Saboke Center Lecture Hall, Ilorin',
    hoursOrDuration: '36 Contact Hours',
    thumbnail: IMAGES.academyWhiteboard,
    youtubeId: 'P_3j8vM33V4',
    visible: true,
    isCustom: false,
  },
  {
    id: 'acad-webinar-guest',
    type: 'webinar',
    title: 'The Role of Herbal Medicine in Responsible Healthcare',
    subtitle: 'NMPR Keynote Address & Regulatory Standards',
    moduleName: 'Health Talk Series',
    instructor: 'Mr. Abdulmajeed Opeyemi Agboola (Overall Advisor for NMPR)',
    location: 'Virtual Auditorium & Live Campus Broadcast',
    hoursOrDuration: '2 Hours Masterclass',
    thumbnail: IMAGES.academyWebinar,
    youtubeId: '6kO8ct9TvRk',
    visible: true,
    isCustom: false,
  },
  {
    id: 'acad-lms-stream',
    type: 'lms-stream',
    title: '1080p Dynamic Classroom Stream: Advanced Pulse Diagnosis',
    subtitle: 'Live Academy Footage & Clinical Practicum Lab',
    moduleName: 'Clinical Practicum Track',
    instructor: 'Dr. Adeyemi Alabi & Clinical Preceptors',
    location: 'Diagnostic Simulation Suite',
    hoursOrDuration: '58 Mins Live Stream',
    thumbnail: IMAGES.lmsLectureStream,
    youtubeId: 'xaS6cEPk3U4',
    visible: true,
    isCustom: false,
  },
];

// ==========================================
// STORE MANAGEMENT METHODS
// ==========================================

const STORAGE_KEYS = {
  stories: 'ehmcare_stories_v2',
  footage: 'ehmcare_footage_v2',
  submissions: 'ehmcare_form_submissions_v2',
  subscribers: 'ehmcare_subscribers',
  broadcasts: 'ehmcare_broadcasts_v2',
  adminAuth: 'ehmcare_admin_auth_user',
  emailConfig: 'ehmcare_email_config_v2',
};

/**
 * Synchronizes client store with the persistent server database (/api/data)
 * Merges server records and local cache so no booking, application, or enquiry is ever lost.
 */
export async function syncStoreWithServer(): Promise<{
  success: boolean;
  submissionsCount: number;
  subscribersCount: number;
}> {
  if (typeof window === 'undefined') {
    return { success: false, submissionsCount: 0, subscribersCount: 0 };
  }

  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (!res.ok) return { success: false, submissionsCount: 0, subscribersCount: 0 };
    const json = await res.json();
    if (!json.success || !json.data) return { success: false, submissionsCount: 0, subscribersCount: 0 };

    const serverData = json.data;

    // 1. Merge Submissions (Server + Local)
    const localSubs: GenericFormSubmission[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.submissions) || '[]'
    );
    const subMap = new Map<string, GenericFormSubmission>();

    // Local items first
    localSubs.forEach((s) => subMap.set(s.id, s));

    // Server items take authoritative priority
    (serverData.submissions || []).forEach((s: GenericFormSubmission) => subMap.set(s.id, s));

    const mergedSubs = Array.from(subMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(mergedSubs));

    // Push any locally created submissions to server if server was missing them
    const serverSubIds = new Set((serverData.submissions || []).map((s: any) => s.id));
    for (const localSub of localSubs) {
      if (!serverSubIds.has(localSub.id)) {
        fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(localSub),
        }).catch(() => {});
      }
    }

    // 2. Merge Subscribers
    const localSubscribers: NewsletterSubscriber[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.subscribers) || '[]'
    );
    const subscMap = new Map<string, NewsletterSubscriber>();
    localSubscribers.forEach((s) => subscMap.set(s.email.toLowerCase(), s));
    (serverData.subscribers || []).forEach((s: NewsletterSubscriber) =>
      subscMap.set(s.email.toLowerCase(), s)
    );
    const mergedSubscribers = Array.from(subscMap.values());
    localStorage.setItem(STORAGE_KEYS.subscribers, JSON.stringify(mergedSubscribers));

    // 3. Email Config
    if (
      serverData.emailConfig &&
      (serverData.emailConfig.resendApiKey || serverData.emailConfig.web3FormsKey)
    ) {
      localStorage.setItem(STORAGE_KEYS.emailConfig, JSON.stringify(serverData.emailConfig));
    } else {
      const localConfig = localStorage.getItem(STORAGE_KEYS.emailConfig);
      if (localConfig) {
        fetch('/api/email-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: localConfig,
        }).catch(() => {});
      }
    }

    // 4. Custom Stories
    if (serverData.stories && serverData.stories.length > 0) {
      localStorage.setItem(STORAGE_KEYS.stories, JSON.stringify(serverData.stories));
    }

    // 5. Custom Footage
    if (serverData.footage && serverData.footage.length > 0) {
      localStorage.setItem(STORAGE_KEYS.footage, JSON.stringify(serverData.footage));
    }

    // 6. Broadcasts
    if (serverData.broadcasts && serverData.broadcasts.length > 0) {
      localStorage.setItem(STORAGE_KEYS.broadcasts, JSON.stringify(serverData.broadcasts));
    }

    return {
      success: true,
      submissionsCount: mergedSubs.length,
      subscribersCount: mergedSubscribers.length,
    };
  } catch (err) {
    console.warn('[Sync with Server Error]', err);
    return { success: false, submissionsCount: 0, subscribersCount: 0 };
  }
}

// 1. STORIES
export function getSuccessStories(): SuccessStoryItem[] {
  try {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.stories) || '[]');
    // Combine built-in and custom stories (custom first)
    const combined = [...custom, ...INITIAL_SUCCESS_STORIES];
    // De-duplicate by id
    const seen = new Set<string>();
    return combined.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });
  } catch {
    return INITIAL_SUCCESS_STORIES;
  }
}

export function saveSuccessStory(story: SuccessStoryItem): SuccessStoryItem {
  try {
    const custom: SuccessStoryItem[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.stories) || '[]'
    );
    const existingIndex = custom.findIndex((s) => s.id === story.id);
    const targetStory = {
      ...story,
      id: story.id || `story-${Date.now()}`,
      isCustom: true,
      createdAt: story.createdAt || new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      custom[existingIndex] = { ...custom[existingIndex], ...targetStory };
    } else {
      custom.unshift(targetStory);
    }
    localStorage.setItem(STORAGE_KEYS.stories, JSON.stringify(custom));

    // Save to persistent server database
    fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(targetStory),
    }).catch((e) => console.warn('[Persistent Story Notice]', e));

    return targetStory;
  } catch (err) {
    console.error('Failed to save story', err);
    return story;
  }
}

export function toggleStoryVisibility(storyId: string, visible: boolean): void {
  try {
    const stories = getSuccessStories();
    const target = stories.find((s) => s.id === storyId);
    if (target) {
      target.visible = visible;
      saveSuccessStory(target);
    }
  } catch (err) {
    console.error('Failed to toggle story visibility', err);
  }
}

export function deleteSuccessStory(storyId: string): void {
  try {
    const custom: SuccessStoryItem[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.stories) || '[]'
    );
    const filtered = custom.filter((s) => s.id !== storyId);
    localStorage.setItem(STORAGE_KEYS.stories, JSON.stringify(filtered));

    // Delete from persistent server database
    fetch(`/api/stories/${encodeURIComponent(storyId)}`, {
      method: 'DELETE',
    }).catch(() => {});
  } catch (err) {
    console.error('Failed to delete story', err);
  }
}

// 2. ACADEMY FOOTAGE
export function getAcademyFootage(): AcademyFootageItem[] {
  try {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.footage) || '[]');
    const combined = [...custom, ...INITIAL_ACADEMY_FOOTAGE];
    const seen = new Set<string>();
    return combined.filter((f) => {
      if (seen.has(f.id)) return false;
      seen.add(f.id);
      return true;
    });
  } catch {
    return INITIAL_ACADEMY_FOOTAGE;
  }
}

export function saveAcademyFootage(item: AcademyFootageItem): AcademyFootageItem {
  try {
    const custom: AcademyFootageItem[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.footage) || '[]'
    );
    const idx = custom.findIndex((f) => f.id === item.id);
    const targetItem = {
      ...item,
      id: item.id || `footage-${Date.now()}`,
      isCustom: true,
      createdAt: item.createdAt || new Date().toISOString(),
    };

    if (idx >= 0) {
      custom[idx] = { ...custom[idx], ...targetItem };
    } else {
      custom.unshift(targetItem);
    }
    localStorage.setItem(STORAGE_KEYS.footage, JSON.stringify(custom));

    // Save to persistent server database
    fetch('/api/footage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(targetItem),
    }).catch((e) => console.warn('[Persistent Footage Notice]', e));

    return targetItem;
  } catch (err) {
    console.error('Failed to save footage', err);
    return item;
  }
}

export function toggleFootageVisibility(id: string, visible: boolean): void {
  try {
    const items = getAcademyFootage();
    const target = items.find((f) => f.id === id);
    if (target) {
      target.visible = visible;
      saveAcademyFootage(target);
    }
  } catch (err) {
    console.error('Failed to toggle footage visibility', err);
  }
}

export function deleteAcademyFootage(id: string): void {
  try {
    const custom: AcademyFootageItem[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.footage) || '[]'
    );
    const filtered = custom.filter((f) => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.footage, JSON.stringify(filtered));

    // Delete from persistent server database
    fetch(`/api/footage/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }).catch(() => {});
  } catch (err) {
    console.error('Failed to delete footage', err);
  }
}

// 3. FORM SUBMISSIONS (Bookings, Academy Applications, Investor Inquiries)
export interface GenericFormSubmission {
  id: string;
  type: 'consultation' | 'academy-application' | 'investor-inquiry' | 'contact';
  name: string;
  email?: string;
  phone: string;
  subjectOrProgram?: string;
  details: Record<string, any>;
  status: 'pending' | 'contacted' | 'confirmed' | 'admitted' | 'closed';
  createdAt: string;
  source: string;
}

export function getFormSubmissions(): GenericFormSubmission[] {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.submissions) || '[]');
    return list;
  } catch {
    return [];
  }
}

export function saveFormSubmission(
  type: GenericFormSubmission['type'],
  data: {
    name: string;
    phone: string;
    email?: string;
    subjectOrProgram?: string;
    details: Record<string, any>;
    source?: string;
  }
): GenericFormSubmission {
  const submission: GenericFormSubmission = {
    id: `sub-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
    type,
    name: data.name,
    phone: data.phone,
    email: data.email,
    subjectOrProgram: data.subjectOrProgram,
    details: data.details,
    status: 'pending',
    createdAt: new Date().toISOString(),
    source: data.source || 'Website Form',
  };

  try {
    const list = getFormSubmissions();
    list.unshift(submission);
    localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save submission locally', err);
  }

  // Save permanently to the server database
  try {
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          console.log(`[Permanent DB] Submission ${submission.id} saved to server disk.`);
        }
      })
      .catch((err) => {
        console.warn('[Server DB Notice]', err);
      });
  } catch {
    // Non-blocking
  }

  return submission;
}

export function updateSubmissionStatus(
  id: string,
  status: GenericFormSubmission['status']
): void {
  try {
    const list = getFormSubmissions();
    const target = list.find((s) => s.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(list));
    }

    // Update in persistent server database
    fetch(`/api/submissions/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => {});
  } catch (err) {
    console.error('Failed to update submission status', err);
  }
}

export function deleteSubmission(id: string): void {
  try {
    const list = getFormSubmissions().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(list));

    // Delete in persistent server database
    fetch(`/api/submissions/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }).catch(() => {});
  } catch (err) {
    console.error('Failed to delete submission', err);
  }
}

// 4. NEWSLETTER SUBSCRIBERS & BROADCASTS
export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  try {
    const list: NewsletterSubscriber[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.subscribers) || '[]'
    );
    if (list.length === 0) {
      const seed: NewsletterSubscriber[] = [
        {
          email: 'ehmcaree@gmail.com',
          fullName: 'EHMCare Official Desk',
          topic: 'all',
          subscribedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          status: 'active',
        },
        {
          email: 'aalqutijifawy@gmail.com',
          fullName: 'Co-Admin Clinical Inquiries',
          topic: 'all',
          subscribedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          status: 'active',
        },
        {
          email: 'devabdultechnologies@gmail.com',
          fullName: 'System Engineering',
          topic: 'all',
          subscribedAt: new Date(Date.now() - 86400000).toISOString(),
          status: 'active',
        },
      ];
      localStorage.setItem(STORAGE_KEYS.subscribers, JSON.stringify(seed));
      return seed;
    }
    return list;
  } catch {
    return [];
  }
}

export function addNewsletterSubscriber(subscriber: {
  email: string;
  fullName?: string;
  topic?: string;
  source?: string;
}): NewsletterSubscriber {
  const normEmail = subscriber.email.trim().toLowerCase();
  const newSub: NewsletterSubscriber = {
    email: normEmail,
    fullName: subscriber.fullName,
    topic: subscriber.topic || 'all',
    subscribedAt: new Date().toISOString(),
    source: subscriber.source || 'Website Opt-in',
    status: 'active',
  };

  try {
    const list = getNewsletterSubscribers();
    const existingIndex = list.findIndex((s) => s.email === normEmail);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...newSub };
    } else {
      list.unshift(newSub);
    }
    localStorage.setItem(STORAGE_KEYS.subscribers, JSON.stringify(list));

    // Save to persistent server database
    fetch('/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSub),
    }).catch(() => {});
  } catch (err) {
    console.error('Failed to save subscriber', err);
  }

  return newSub;
}

export function deleteNewsletterSubscriber(email: string): void {
  try {
    const norm = email.trim().toLowerCase();
    const list = getNewsletterSubscribers().filter((s) => s.email.toLowerCase() !== norm);
    localStorage.setItem(STORAGE_KEYS.subscribers, JSON.stringify(list));

    fetch(`/api/subscribers/${encodeURIComponent(norm)}`, {
      method: 'DELETE',
    }).catch(() => {});
  } catch (err) {
    console.error('Failed to delete subscriber', err);
  }
}

export function getBroadcastHistory(): NewsletterBroadcastRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.broadcasts) || '[]');
  } catch {
    return [];
  }
}

export function saveBroadcastRecord(record: NewsletterBroadcastRecord): void {
  try {
    const list = getBroadcastHistory();
    list.unshift(record);
    localStorage.setItem(STORAGE_KEYS.broadcasts, JSON.stringify(list));

    fetch('/api/broadcasts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    }).catch(() => {});
  } catch (err) {
    console.error('Failed to save broadcast', err);
  }
}

// 5. EMAIL SETTINGS
export interface EmailServiceConfig {
  provider: 'resend' | 'emailjs' | 'web3forms' | 'all' | 'simulated';
  resendApiKey?: string;
  customFromEmail?: string;
  emailJsServiceId?: string;
  emailJsTemplateId?: string;
  emailJsPublicKey?: string;
  web3FormsKey?: string;
  adminRecipients: string[];
  autoBroadcastOnNewStory: boolean;
}

export function getEmailConfig(): EmailServiceConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.emailConfig);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }

  return {
    provider: 'resend',
    resendApiKey: '',
    web3FormsKey: '',
    emailJsServiceId: '',
    emailJsTemplateId: '',
    emailJsPublicKey: '',
    adminRecipients: ['ehmcaree@gmail.com', 'aalqutijifawy@gmail.com'],
    autoBroadcastOnNewStory: true,
  };
}

export function saveEmailConfig(config: EmailServiceConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.emailConfig, JSON.stringify(config));

    // Save permanently to server database
    fetch('/api/email-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    }).catch(() => {});
  } catch (err) {
    console.error('Failed to save email config', err);
  }
}

// 6. BACKUP & EXPORT UTILITIES (Permanent Data Protection)
export function downloadDatabaseBackup(): void {
  try {
    const backup = {
      exportedAt: new Date().toISOString(),
      institution: 'EHMCare Hub Integrated Healthcare & Academy',
      submissions: getFormSubmissions(),
      subscribers: getNewsletterSubscribers(),
      broadcasts: getBroadcastHistory(),
      stories: JSON.parse(localStorage.getItem(STORAGE_KEYS.stories) || '[]'),
      footage: JSON.parse(localStorage.getItem(STORAGE_KEYS.footage) || '[]'),
      emailConfig: getEmailConfig(),
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    const filename = `EHMCare_Database_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  } catch (err) {
    console.error('Failed to export backup', err);
  }
}

export function exportSubmissionsCsv(): void {
  try {
    const submissions = getFormSubmissions();
    if (submissions.length === 0) return;

    const headers = ['ID', 'Type', 'Name', 'Phone', 'Email', 'Subject/Program', 'Status', 'Date', 'Source'];
    const rows = submissions.map((s) => [
      s.id,
      s.type,
      `"${(s.name || '').replace(/"/g, '""')}"`,
      `"${(s.phone || '').replace(/"/g, '""')}"`,
      `"${(s.email || '').replace(/"/g, '""')}"`,
      `"${(s.subjectOrProgram || '').replace(/"/g, '""')}"`,
      s.status,
      s.createdAt,
      `"${(s.source || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    const filename = `EHMCare_Submissions_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export CSV', err);
  }
}

// 6. ADMIN AUTH STATE
export function getCurrentAdminUser(): string | null {
  try {
    return (
      sessionStorage.getItem(STORAGE_KEYS.adminAuth) ||
      localStorage.getItem(STORAGE_KEYS.adminAuth)
    );
  } catch {
    return null;
  }
}

export function setAdminUser(email: string, remember: boolean = true): void {
  try {
    if (remember) {
      localStorage.setItem(STORAGE_KEYS.adminAuth, email);
    }
    sessionStorage.setItem(STORAGE_KEYS.adminAuth, email);
  } catch {
    // ignore
  }
}

export function clearAdminUser(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEYS.adminAuth);
    localStorage.removeItem(STORAGE_KEYS.adminAuth);
  } catch {
    // ignore
  }
}
