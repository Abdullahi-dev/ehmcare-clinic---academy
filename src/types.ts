export type NavigationTab = 
  | 'treatments-and-tcm-care'
  | 'ehmcare-academy'
  | 'student-lms-portal'
  | 'future-divisions'
  | 'patient-stories-and-videos'
  | 'investor-and-global-partners'
  | 'enroll-in-academy'
  | 'admin-portal';

export interface ConsultationBooking {
  id?: string;
  specialty: string;
  specialtyName?: string;
  location: string;
  locationName?: string;
  date: string;
  timeSlot?: string;
  patientName: string;
  phone: string;
  email?: string;
  notes?: string;
  status?: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt?: string;
}

export interface AcademyApplication {
  id?: string;
  applicationRef?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  programName?: string;
  campus: string;
  background?: string;
  educationLevel?: string;
  paymentPlan?: string;
  stateOfResidence?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  accommodationNeeded?: boolean;
  status?: 'pending' | 'contacted' | 'admitted' | 'enrolled';
  createdAt?: string;
}

export interface InvestorInquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  entity: string;
  ticketSize: string;
  message?: string;
  status?: 'pending' | 'contacted' | 'scheduled' | 'closed';
  createdAt?: string;
}

export interface SuccessStoryItem {
  id: string;
  category: string;
  categoryLabel?: string;
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
  videoUrl?: string;
  videoSourceType?: 'youtube' | 'upload' | 'external' | 'direct';
  videoFileName?: string;
  imageFileName?: string;
  visible?: boolean;
  isCustom?: boolean;
  createdAt?: string;
}

export interface AcademyFootageItem {
  id: string;
  type: string;
  typeLabel?: string;
  title: string;
  subtitle: string;
  moduleName?: string;
  instructor: string;
  location: string;
  hoursOrDuration: string;
  videoUrl?: string;
  youtubeId?: string;
  videoSourceType?: 'youtube' | 'upload' | 'external' | 'direct';
  videoFileName?: string;
  imageFileName?: string;
  thumbnail: string;
  visible: boolean;
  isCustom?: boolean;
  createdAt?: string;
}

export interface NewsletterSubscriber {
  email: string;
  fullName?: string;
  topic?: string;
  subscribedAt: string;
  source?: string;
  status?: 'active' | 'unsubscribed';
}

export interface NewsletterBroadcastRecord {
  id: string;
  subject: string;
  title: string;
  content: string;
  category: string;
  sentAt: string;
  recipientCount: number;
  recipientsPreview?: string[];
  status: 'sent' | 'draft';
}

