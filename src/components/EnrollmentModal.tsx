import React, { useState } from 'react';
import { submitAcademyApplication } from '../utils/formSubmissionService.ts';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgram?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  initialProgram,
}) => {
  const [program, setProgram] = useState(initialProgram || 'tcm');
  const [campus, setCampus] = useState('ilorin');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [background, setBackground] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitAcademyApplication({
      firstName,
      lastName,
      email,
      phone,
      program,
      campus,
      background,
    });
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleResetAndClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#eceef0] overflow-hidden max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#004c22] text-[#ffffff] px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#acf770] text-[22px]">school</span>
            <div>
              <h3 className="font-bold text-[17px] leading-tight">EHMCare Academy Enrollment</h3>
              <p className="text-[12px] text-[#93e0a2]">Cohort 2025/2026 Admissions Desk</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-[#166534] text-[#ffffff] flex items-center justify-center hover:bg-[#00210b] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adeyemi"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0901 518 4004"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">Enrolled Program *</label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                  >
                    <option value="tcm">Diploma in TCM & Clinical Acupuncture (12 Mos)</option>
                    <option value="cupping">Advanced Cupping & Detoxification (3 Mos)</option>
                    <option value="phytotherapy">Phytotherapy & Herb Formulation (6 Mos)</option>
                    <option value="publichealth">Integrative Nutrition & Public Health (4 Mos)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">Campus *</label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                  >
                    <option value="ilorin">Ilorin Center (Saboke Campus)</option>
                    <option value="abuja">Abuja Center (Maitama Campus)</option>
                    <option value="hybrid">Hybrid (Online Didactic + Clinical Block)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#191c1e]">Medical or Academic Background</label>
                <textarea
                  rows={2}
                  placeholder="State your background (Nurse, physiotherapist, herbalist, science graduate, etc.)"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="p-2.5 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agree_terms"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#004c22] focus:ring-[#004c22]"
                />
                <label htmlFor="agree_terms" className="text-[12px] text-[#404940] leading-snug">
                  I certify that all details submitted are accurate and agree to follow clinical observation guidelines.
                </label>
              </div>

              <div className="pt-2 border-t border-[#eceef0] flex items-center justify-between">
                <span className="text-[11px] text-[#404940]">Registrar Hotline: 0901 518 4004</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#004c22] text-[#ffffff] font-bold text-[13px] hover:bg-[#166534] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Submit Application</span>
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#acf770] text-[#397200] flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">school</span>
              </div>
              <h4 className="text-[20px] font-bold text-[#004c22]">Application Successfully Received!</h4>
              <p className="text-[14px] text-[#404940] max-w-md">
                Thank you for applying to EHMCare Academy, {firstName} {lastName}. Our Academic Registrar will contact you on WhatsApp / Phone within 24 hours with your enrollment package, syllabus PDF, and orientation schedule.
              </p>
              <div className="p-4 rounded-xl bg-[#f2f4f6] w-full text-left text-[12px] space-y-1 text-[#191c1e]">
                <p><strong>Candidate:</strong> {firstName} {lastName} ({email})</p>
                <p><strong>Program Track:</strong> {program.toUpperCase()}</p>
                <p><strong>Preferred Venue:</strong> {campus.toUpperCase()} Center</p>
              </div>
              <button
                onClick={handleResetAndClose}
                className="mt-2 px-8 py-2.5 rounded-lg bg-[#004c22] text-white font-bold text-[13px] hover:bg-[#166534] transition-colors cursor-pointer"
              >
                Close Application Desk
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
