import React, { useState } from 'react';
import { CLINICAL_SERVICES, CLINICAL_LOCATIONS, AVAILABLE_TIME_SLOTS } from '../data/content.ts';
import { submitConsultationBooking } from '../utils/formSubmissionService.ts';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSpecialty?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialSpecialty,
}) => {
  const [specialty, setSpecialty] = useState(initialSpecialty || 'neuro-acupuncture');
  const [location, setLocation] = useState('ilorin');
  const [date, setDate] = useState('2025-03-01');
  const [timeSlot, setTimeSlot] = useState(AVAILABLE_TIME_SLOTS[0]);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedServiceName = CLINICAL_SERVICES.find((s) => s.id === specialty)?.name || specialty;
  const selectedLocationName = CLINICAL_LOCATIONS.find((l) => l.id === location)?.name || location;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await submitConsultationBooking({
      specialty,
      specialtyName: selectedServiceName,
      location,
      locationName: selectedLocationName,
      date,
      timeSlot,
      patientName,
      phone,
      notes: symptoms,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  React.useEffect(() => {
    if (isOpen) {
      if (initialSpecialty) {
        setSpecialty(initialSpecialty);
      }
      setSubmitted(false);
    }
  }, [isOpen, initialSpecialty]);

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
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#eceef0] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#004c22] text-[#ffffff] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#acf770] text-[22px]">calendar_month</span>
            <div>
              <h3 className="font-bold text-[17px] leading-tight">Clinical Consultation Desk</h3>
              <p className="text-[12px] text-[#93e0a2]">In-Person & Virtual Tele-Triage Protocols</p>
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

        {/* Modal Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">1. Clinical Specialty</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                  >
                    {CLINICAL_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">2. Location Preference</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                  >
                    {CLINICAL_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">3. Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">4. Preferred Time Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                  >
                    {AVAILABLE_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#191c1e]">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ibrahim Adebayo"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
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

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#191c1e]">Chief Symptoms / Medical Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Sciatic nerve pain down right leg, post-stroke recovery, chronic lumbar stiffness..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="p-2.5 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[13px] border border-[#bfc9bd] focus:ring-2 focus:ring-[#004c22] focus:outline-none"
                />
              </div>

              <div className="pt-2 border-t border-[#eceef0] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-[#404940]">
                  <span className="material-symbols-outlined text-[#356b00] text-[18px]">verified_user</span>
                  <span>NDPR & HIPAA Medical Confidentiality</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#004c22] text-[#ffffff] font-bold text-[13px] hover:bg-[#166534] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Confirm Slot Reservation</span>
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#acf770] text-[#397200] flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h4 className="text-[20px] font-bold text-[#004c22]">Consultation Slot Confirmed!</h4>
              <div className="p-4 rounded-xl bg-[#f2f4f6] w-full text-left text-[13px] space-y-1.5 text-[#191c1e]">
                <p>
                  <strong>Patient:</strong> {patientName} ({phone})
                </p>
                <p>
                  <strong>Specialty:</strong> {selectedServiceName}
                </p>
                <p>
                  <strong>Venue:</strong> {selectedLocationName}
                </p>
                <p>
                  <strong>Schedule:</strong> {date} at {timeSlot}
                </p>
                <p className="text-[11px] text-[#404940] pt-1">
                  A triage confirmation SMS and WhatsApp message have been queued to {phone}.
                </p>
              </div>

              <div className="flex gap-3 w-full pt-2">
                <a
                  href={`https://wa.me/2349059758574?text=Hello%20EHMCare%20Clinic,%20I%20have%20booked%20a%20consultation%20for%20${encodeURIComponent(
                    patientName
                  )}%20on%20${date}%20at%20${encodeURIComponent(timeSlot)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-[#acf770] text-[#0c2000] font-bold text-[13px] flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Open WhatsApp Triage</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-lg bg-[#004c22] text-white font-bold text-[13px] hover:bg-[#166534] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
