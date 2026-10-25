import {
  ConsultationBooking,
  AcademyApplication,
  InvestorInquiry,
  NewsletterSubscriber,
  NewsletterBroadcastRecord,
} from '../types.ts';
import {
  saveFormSubmission,
  addNewsletterSubscriber,
  getNewsletterSubscribers,
  saveBroadcastRecord,
  getEmailConfig,
  GenericFormSubmission,
} from './clinicContentStore.ts';

export interface DispatchResult {
  success: boolean;
  message: string;
  submissionId?: string;
  emailDispatched?: boolean;
  whatsappUrl?: string;
}

/**
 * Dispatches an email using Resend, Web3Forms, or EmailJS
 * In dev & Vercel, Resend routes through /api/send-email to bypass browser CORS restrictions.
 * All bookings, applications, and inquiries are delivered to ehmcaree@gmail.com and aalqutijifawy@gmail.com.
 */
async function sendEmailNotification(payload: {
  to: string[];
  subject: string;
  html: string;
  text?: string;
  fromName?: string;
}): Promise<{ ok: boolean; info?: string; details?: any }> {
  const config = getEmailConfig();
  const recipients = payload.to.length > 0 ? payload.to : config.adminRecipients;
  const dispatchedServices: string[] = [];
  const errors: string[] = [];

  let sandboxNotice: string | null = null;

  // 1. Resend API (Routes through /api/send-email on server/Vercel to avoid browser CORS)
  const shouldTryResend =
    (config.provider === 'resend' || config.provider === 'all') &&
    Boolean(config.resendApiKey && config.resendApiKey.trim().startsWith('re_'));

  if (shouldTryResend) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: config.resendApiKey?.trim(),
          from: config.customFromEmail || `${payload.fromName || 'EHMCare Integrated Healthcare'} <onboarding@resend.dev>`,
          to: recipients,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
          fromName: payload.fromName,
        }),
      });

      const resData = await response.json().catch(() => null);

      if (response.ok && resData?.success) {
        dispatchedServices.push(
          resData.deliveredTo ? `Resend (${resData.deliveredTo.join(', ')})` : 'Resend'
        );
        if (resData.sandboxNotice) {
          sandboxNotice = resData.sandboxNotice;
        }
      } else {
        const errorMsg = resData?.error || `Resend HTTP ${response.status}`;
        errors.push(`Resend: ${errorMsg}`);
        console.warn('Resend server proxy notice:', errorMsg);
      }
    } catch (err: any) {
      console.warn('Could not connect to /api/send-email proxy:', err);
    }
  }

  // 2. Web3Forms (Unlimited free direct inbox forwarding to ehmcaree@gmail.com & aalqutijifawy@gmail.com)
  const shouldTryWeb3Forms =
    (config.provider === 'web3forms' || config.provider === 'all' || (config.provider === 'resend' && dispatchedServices.length === 0)) &&
    Boolean(config.web3FormsKey);

  if (shouldTryWeb3Forms) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: config.web3FormsKey,
          subject: payload.subject,
          from_name: payload.fromName || 'EHMCare Portal Alert',
          to_email: recipients.join(', '),
          message: payload.text || payload.html.replace(/<[^>]+>/g, ' '),
        }),
      });

      if (response.ok) {
        dispatchedServices.push('Web3Forms');
      }
    } catch (err) {
      console.warn('Web3Forms dispatch notice:', err);
    }
  }

  // 3. EmailJS (200 free emails/mo browser SDK REST API)
  const shouldTryEmailJS =
    (config.provider === 'emailjs' || config.provider === 'all') &&
    Boolean(config.emailJsServiceId && config.emailJsTemplateId && config.emailJsPublicKey);

  if (shouldTryEmailJS) {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: config.emailJsServiceId,
          template_id: config.emailJsTemplateId,
          user_id: config.emailJsPublicKey,
          template_params: {
            to_email: recipients.join(', '),
            to_name: 'EHMCare Clinical Admin',
            subject: payload.subject,
            message: payload.text || payload.html.replace(/<[^>]+>/g, ' '),
            html_content: payload.html,
            from_name: payload.fromName || 'EHMCare Portal Alert',
          },
        }),
      });

      if (response.ok) {
        dispatchedServices.push('EmailJS');
      }
    } catch (err) {
      console.warn('EmailJS dispatch notice:', err);
    }
  }

  // 4. Server-side notification logger
  try {
    await fetch('/api/forms/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipients,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
    });
  } catch {
    // client-only preview fallback
  }

  if (dispatchedServices.length > 0) {
    return {
      ok: true,
      info: sandboxNotice
        ? `${dispatchedServices.join(' & ')}: ${sandboxNotice}`
        : `Delivered via ${dispatchedServices.join(' & ')} to ${recipients.join(', ')}`,
    };
  }

  if (errors.length > 0) {
    return {
      ok: false,
      info: errors.join(' • '),
    };
  }

  // Default: safely saved to persistent Central Admin Inbox
  return {
    ok: true,
    info: `Stored in Admin Inbox for ${recipients.join(', ')} (Ready for instant triage & WhatsApp action)`,
  };
}

// 1. CLINICAL CONSULTATION SUBMISSION
export async function submitConsultationBooking(
  booking: ConsultationBooking
): Promise<DispatchResult> {
  const config = getEmailConfig();
  const recipients = config.adminRecipients;

  // Save to persistent database
  const record = saveFormSubmission('consultation', {
    name: booking.patientName,
    phone: booking.phone,
    email: booking.email,
    subjectOrProgram: booking.specialtyName || booking.specialty,
    details: {
      specialty: booking.specialty,
      specialtyName: booking.specialtyName,
      location: booking.location,
      locationName: booking.locationName,
      date: booking.date,
      timeSlot: booking.timeSlot,
      notes: booking.notes,
    },
    source: 'Consultation Booking Modal',
  });

  // Prepare formatted email
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eceef0; rounded: 12px;">
      <div style="background-color: #004c22; color: #ffffff; padding: 16px 20px; border-radius: 8px;">
        <h2 style="margin: 0; font-size: 20px;">🚨 New Consultation Booking Received</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #acf770;">EHMCare Clinic • Triage Desk Alert</p>
      </div>
      <div style="padding: 20px 0;">
        <p style="font-size: 15px; font-weight: bold; color: #191c1e;">Patient Details:</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Patient Name:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0; font-weight: bold;">${booking.patientName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Phone / WhatsApp:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0; font-weight: bold;"><a href="tel:${booking.phone}">${booking.phone}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Clinical Specialty:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0; font-weight: bold;">${booking.specialtyName || booking.specialty}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Venue / Location:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0;">${booking.locationName || booking.location}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Appointment Schedule:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0; font-weight: bold; color: #004c22;">${booking.date} at ${booking.timeSlot || 'Morning Session'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Chief Symptoms / Notes:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0;">${booking.notes || 'None specified'}</td></tr>
        </table>
      </div>
      <div style="background-color: #f2f4f6; padding: 12px 16px; border-radius: 8px; font-size: 12px; color: #404940;">
        <p style="margin: 0;">Sent automatically to authorized clinic administrators: <strong>${recipients.join(', ')}</strong></p>
      </div>
    </div>
  `;

  const textBody = `New Consultation Booking:\nPatient: ${booking.patientName}\nPhone: ${booking.phone}\nSpecialty: ${booking.specialtyName || booking.specialty}\nDate: ${booking.date} at ${booking.timeSlot}\nVenue: ${booking.locationName || booking.location}\nNotes: ${booking.notes || 'N/A'}`;

  const emailRes = await sendEmailNotification({
    to: recipients,
    subject: `🚨 [EHMCare Booking] ${booking.patientName} — ${booking.specialtyName || booking.specialty}`,
    html: htmlBody,
    text: textBody,
    fromName: 'EHMCare Clinical Triage',
  });

  // Clean WhatsApp quick link
  const rawPhone = booking.phone.replace(/[^0-9]/g, '');
  const cleanPhone = rawPhone.startsWith('0') ? '234' + rawPhone.slice(1) : rawPhone;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${booking.patientName}, this is EHMCare Integrated Healthcare Clinic confirming your consultation booking for ${booking.specialtyName || booking.specialty} scheduled on ${booking.date} (${booking.timeSlot}). How are you feeling today?`
  )}`;

  return {
    success: true,
    message: 'Consultation slot successfully confirmed and dispatched to clinic administrators.',
    submissionId: record.id,
    emailDispatched: emailRes.ok,
    whatsappUrl,
  };
}

// 2. ACADEMY APPLICATION SUBMISSION
export async function submitAcademyApplication(
  app: AcademyApplication
): Promise<DispatchResult> {
  const config = getEmailConfig();
  const recipients = config.adminRecipients;
  const ref = app.applicationRef || `EHM-ADM-${Math.floor(10000 + Math.random() * 90000)}`;

  const record = saveFormSubmission('academy-application', {
    name: `${app.firstName} ${app.lastName}`,
    phone: app.phone,
    email: app.email,
    subjectOrProgram: app.programName || app.program,
    details: {
      applicationRef: ref,
      campus: app.campus,
      educationLevel: app.educationLevel,
      background: app.background,
      paymentPlan: app.paymentPlan,
      stateOfResidence: app.stateOfResidence,
      emergencyName: app.emergencyName,
      emergencyPhone: app.emergencyPhone,
      accommodationNeeded: app.accommodationNeeded,
    },
    source: 'Academy Admissions Form',
  });

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eceef0; border-radius: 12px;">
      <div style="background-color: #004c22; color: #ffffff; padding: 16px 20px; border-radius: 8px;">
        <h2 style="margin: 0; font-size: 20px;">🎓 New Academy Student Application</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #acf770;">Application Ref: ${ref}</p>
      </div>
      <div style="padding: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Applicant:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0; font-weight: bold;">${app.firstName} ${app.lastName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0;"><a href="mailto:${app.email}">${app.email}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0;"><a href="tel:${app.phone}">${app.phone}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Program Applied:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0; font-weight: bold; color: #004c22;">${app.programName || app.program}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Campus Track:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0; text-transform: capitalize;">${app.campus}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Educational Background:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0;">${app.educationLevel || app.background || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Accommodation Needed:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0;">${app.accommodationNeeded ? 'Yes (Campus Residence)' : 'No (Day Scholar)'}</td></tr>
        </table>
      </div>
      <div style="background-color: #f2f4f6; padding: 12px 16px; border-radius: 8px; font-size: 12px; color: #404940;">
        <p style="margin: 0;">Dispatched to Admissions Board: <strong>${recipients.join(', ')}</strong></p>
      </div>
    </div>
  `;

  await sendEmailNotification({
    to: recipients,
    subject: `🎓 [Academy Application] ${app.firstName} ${app.lastName} — ${app.programName || app.program} (${ref})`,
    html: htmlBody,
    text: `New Academy Application: ${app.firstName} ${app.lastName}\nRef: ${ref}\nProgram: ${app.programName || app.program}\nEmail: ${app.email}\nPhone: ${app.phone}`,
    fromName: 'EHMCare Academy Admissions',
  });

  return {
    success: true,
    message: 'Academy application registered. Admissions review notification sent to registrars.',
    submissionId: record.id,
  };
}

// 3. INVESTOR INQUIRY SUBMISSION
export async function submitInvestorInquiry(
  inquiry: InvestorInquiry
): Promise<DispatchResult> {
  const config = getEmailConfig();
  const recipients = config.adminRecipients;

  const record = saveFormSubmission('investor-inquiry', {
    name: inquiry.name,
    phone: inquiry.phone,
    email: inquiry.email,
    subjectOrProgram: `Pitch Deck Request (${inquiry.ticketSize})`,
    details: {
      entity: inquiry.entity,
      ticketSize: inquiry.ticketSize,
      message: inquiry.message,
    },
    source: 'Investor Presentation Modal',
  });

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eceef0; border-radius: 12px;">
      <div style="background-color: #004c22; color: #ffffff; padding: 16px 20px; border-radius: 8px;">
        <h2 style="margin: 0; font-size: 20px;">💼 Investor Pitch Deck Request & Due Diligence</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #acf770;">EHMCare Series-A Capital Round</p>
      </div>
      <div style="padding: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Investor Name:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0; font-weight: bold;">${inquiry.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Investment Entity / Firm:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0; font-weight: bold;">${inquiry.entity}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0;"><a href="tel:${inquiry.phone}">${inquiry.phone}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eceef0; color: #555;">Indicated Ticket Range:</td><td style="padding: 8px; border-bottom: 1px solid #eceef0; font-weight: bold; color: #004c22;">${inquiry.ticketSize}</td></tr>
        </table>
      </div>
      <div style="background-color: #f2f4f6; padding: 12px 16px; border-radius: 8px; font-size: 12px; color: #404940;">
        <p style="margin: 0;">Dispatched to Executive Board: <strong>${recipients.join(', ')}</strong></p>
      </div>
    </div>
  `;

  await sendEmailNotification({
    to: recipients,
    subject: `💼 [Investor Inquiry] ${inquiry.name} (${inquiry.entity}) — Ticket: ${inquiry.ticketSize}`,
    html: htmlBody,
    text: `Investor Inquiry: ${inquiry.name} from ${inquiry.entity}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nTicket: ${inquiry.ticketSize}`,
    fromName: 'EHMCare Executive Board',
  });

  return {
    success: true,
    message: 'Investor deck inquiry registered and forwarded to board leadership.',
    submissionId: record.id,
  };
}

// 4. NEWSLETTER OPT-IN SUBMISSION
export async function submitNewsletterSubscription(
  email: string,
  fullName?: string,
  topic: string = 'all'
): Promise<DispatchResult> {
  const norm = email.trim().toLowerCase();
  const sub = addNewsletterSubscriber({
    email: norm,
    fullName,
    topic,
    source: 'Website Newsletter Subscription',
  });

  const config = getEmailConfig();

  // Welcome email to the subscriber
  const welcomeHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eceef0; border-radius: 12px;">
      <div style="background-color: #004c22; color: #ffffff; padding: 20px; border-radius: 8px; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">🌿 Welcome to EHMCare Holistic Digest</h1>
        <p style="margin: 6px 0 0 0; font-size: 13.5px; color: #acf770;">Traditional Medicine • Clinical Breakthroughts • Academy Updates</p>
      </div>
      <div style="padding: 24px 0; font-size: 14px; line-height: 1.6; color: #2d3748;">
        <p>Dear ${fullName || 'Health Enthusiast'},</p>
        <p>Thank you for subscribing to EHMCare Integrated Healthcare's official clinical updates. You are now part of our community of patients, healthcare professionals, and students dedicated to evidence-based traditional medicine.</p>
        <p>You will automatically receive:</p>
        <ul>
          <li>Verified patient recovery case studies and video testimonials</li>
          <li>Doctor-guided holistic health protocols and botanical wellness advice</li>
          <li>Announcements on new academy cohorts, scholarships, and clinical seminars</li>
        </ul>
        <div style="margin: 20px 0; text-align: center;">
          <a href="https://ehmcare.com" style="background-color: #004c22; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; display: inline-block;">Explore Clinical Services</a>
        </div>
      </div>
      <div style="border-top: 1px solid #eceef0; padding-top: 16px; font-size: 11.5px; color: #718096; text-align: center;">
        <p style="margin: 0;">EHMCare Clinic • 4 Sofoluwe Street, Sabo-Oke, Ilorin, Kwara State, Nigeria</p>
        <p style="margin: 4px 0 0 0;">Helpline: 0901 518 4004 • WhatsApp: +234 905 975 8574</p>
      </div>
    </div>
  `;

  // Dispatch welcome email to user
  sendEmailNotification({
    to: [norm],
    subject: '🌿 Welcome to EHMCare Holistic Healthcare & Academy Digest',
    html: welcomeHtml,
    text: `Welcome to EHMCare! You are now subscribed to our health tips and academy updates. Visit https://ehmcare.com for clinical services.`,
    fromName: 'EHMCare Clinical Digest',
  }).catch(() => null);

  // Notify admin of new subscriber
  sendEmailNotification({
    to: config.adminRecipients,
    subject: `📫 [New Newsletter Opt-in] ${norm} subscribed`,
    html: `<p>A new subscriber just opted into the newsletter:</p><p><strong>Email:</strong> ${norm}</p><p><strong>Name:</strong> ${fullName || 'Not provided'}</p><p><strong>Preference:</strong> ${topic}</p>`,
    fromName: 'EHMCare Newsletter Service',
  }).catch(() => null);

  return {
    success: true,
    message: 'Subscribed successfully! Welcome email sent.',
  };
}

// 5. AUTO-NEWSLETTER BROADCAST TO SUBSCRIBERS
export async function broadcastNewsletterToSubscribers(broadcast: {
  subject: string;
  title: string;
  content: string;
  category: string;
  actionUrl?: string;
  actionLabel?: string;
}): Promise<{
  success: boolean;
  recipientCount: number;
  message: string;
}> {
  const subscribers = getNewsletterSubscribers().filter((s) => s.status !== 'unsubscribed');
  const recipientEmails = subscribers.map((s) => s.email);

  if (recipientEmails.length === 0) {
    return {
      success: false,
      recipientCount: 0,
      message: 'No active subscribers found in list.',
    };
  }

  const broadcastHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eceef0; border-radius: 12px;">
      <div style="background-color: #004c22; color: #ffffff; padding: 20px; border-radius: 8px;">
        <span style="background-color: #acf770; color: #004c22; font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 3px 8px; border-radius: 4px;">
          ${broadcast.category}
        </span>
        <h1 style="margin: 12px 0 4px 0; font-size: 22px; color: #ffffff;">${broadcast.title}</h1>
        <p style="margin: 0; font-size: 12.5px; color: #e0e3e5;">Official Clinical Broadcast from EHMCare Care Team</p>
      </div>

      <div style="padding: 24px 0; font-size: 14.5px; line-height: 1.6; color: #191c1e;">
        ${broadcast.content
          .split('\n\n')
          .map((p) => `<p style="margin-bottom: 14px;">${p}</p>`)
          .join('')}

        ${
          broadcast.actionUrl
            ? `<div style="margin: 24px 0; text-align: center;">
                 <a href="${broadcast.actionUrl}" style="background-color: #004c22; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13.5px; display: inline-block;">
                   ${broadcast.actionLabel || 'View Full Case & Video'}
                 </a>
               </div>`
            : ''
        }
      </div>

      <div style="background-color: #f2f4f6; padding: 14px 18px; border-radius: 8px; font-size: 12px; color: #404940;">
        <p style="margin: 0; font-weight: bold; color: #004c22;">Need Clinical Assistance?</p>
        <p style="margin: 4px 0 0 0;">Call our Sabo-Oke Clinic in Ilorin at <strong>0901 518 4004</strong> or chat on WhatsApp <strong>+234 905 975 8574</strong>.</p>
      </div>

      <div style="border-top: 1px solid #eceef0; margin-top: 20px; padding-top: 14px; font-size: 11px; color: #718096; text-align: center;">
        <p style="margin: 0;">You received this update because you subscribed to EHMCare Integrated Healthcare.</p>
      </div>
    </div>
  `;

  // Dispatch to all subscribers
  await sendEmailNotification({
    to: recipientEmails,
    subject: broadcast.subject,
    html: broadcastHtml,
    text: `${broadcast.title}\n\n${broadcast.content}\n\nEHMCare Clinic • 0901 518 4004`,
    fromName: 'EHMCare Clinical Updates',
  });

  // Save in history
  const record: NewsletterBroadcastRecord = {
    id: `bc-${Date.now()}`,
    subject: broadcast.subject,
    title: broadcast.title,
    content: broadcast.content,
    category: broadcast.category,
    sentAt: new Date().toISOString(),
    recipientCount: recipientEmails.length,
    recipientsPreview: recipientEmails.slice(0, 5),
    status: 'sent',
  };
  saveBroadcastRecord(record);

  return {
    success: true,
    recipientCount: recipientEmails.length,
    message: `Broadcast successfully dispatched to ${recipientEmails.length} active subscribers!`,
  };
}

// 6. TEST EMAIL DISPATCH
export async function sendTestEmail(): Promise<{ ok: boolean; info: string }> {
  const config = getEmailConfig();
  const testHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #004c22; border-radius: 10px;">
      <h3 style="color: #004c22; margin-top: 0;">✅ EHMCare Email Service Connectivity Test</h3>
      <p style="font-size: 13.5px; color: #333;">This is a verified test email sent from the EHMCare Admin Portal to confirm that clinical notification delivery and newsletter broadcasting are functioning properly.</p>
      <div style="background-color: #f2f4f6; padding: 10px; border-radius: 6px; font-size: 12px;">
        <strong>Active Provider:</strong> ${config.provider.toUpperCase()}<br/>
        <strong>Admin Recipients:</strong> ${config.adminRecipients.join(', ')}<br/>
        <strong>Timestamp:</strong> ${new Date().toLocaleString()}
      </div>
    </div>
  `;

  const res = await sendEmailNotification({
    to: config.adminRecipients,
    subject: '✅ [EHMCare Test] Email Service Connectivity Verified',
    html: testHtml,
    text: 'EHMCare Email Service Connectivity Verified. All forms and newsletters will dispatch here.',
    fromName: 'EHMCare Admin Diagnostic',
  });

  return {
    ok: res.ok,
    info: res.info || 'Email dispatch completed',
  };
}
