import React, { useState, useMemo } from 'react';
import { CONTACT_INFO } from '../data/content.ts';

interface TreatmentsFaqProps {
  onOpenBooking?: (specialty?: string) => void;
  className?: string;
}

interface FaqItem {
  id: string;
  category: 'acupuncture' | 'herbal' | 'cupping' | 'consultation' | 'safety';
  question: string;
  answer: string;
  badge?: string;
  relatedDept?: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'acupuncture-pain',
    category: 'acupuncture',
    badge: 'Common Concern',
    question: 'Does clinical acupuncture hurt, and are the needles sterile and disposable?',
    answer:
      'Clinical acupuncture is virtually painless. Unlike thick hypodermic syringe needles used for blood draws or injections, our acupuncture filaments are hair-thin (0.20mm to 0.25mm) and flexible. Most patients feel only a momentary, mild tap upon insertion, followed by a deeply relaxing sensation known in Chinese medicine as "De-Qi" (a mild dull warmth, gentle distension, or therapeutic tingling). Every needle at EHMCare is surgical-grade stainless steel, individually blister-packaged, gamma-sterilized, and strictly single-use—never reused.',
    relatedDept: 'neuro-acupuncture',
  },
  {
    id: 'integrative-western-medicine',
    category: 'safety',
    badge: 'Integrative Protocol',
    question: 'How does Traditional Chinese Medicine (TCM) work alongside my conventional hospital treatments?',
    answer:
      'EHMCare operates on an integrative medical model. We do not replace necessary surgical or conventional emergency care; instead, we collaborate synergistically with your primary physicians and specialists. For conditions such as post-stroke motor deficits, lumbar disc herniation, hypertension, or fertility challenges, our therapies accelerate neurovascular recovery, reduce systemic inflammation, and lower reliance on heavy analgesics. Please bring all recent radiological scans (MRI, CT, X-ray) and laboratory reports to your initial consultation.',
  },
  {
    id: 'herbal-granules-safety',
    category: 'herbal',
    badge: 'Laboratory Standardized',
    question: 'What are classical botanical granules, and how are they prepared and tested?',
    answer:
      'Rather than requiring patients to boil raw roots and barks for hours, EHMCare dispenses concentrated botanical extract granules produced in certified GMP pharmaceutical facilities. Raw medicinal plants undergo precision decoction, vacuum low-temperature concentration, spray-drying, and granulation. Every batch is rigorously assayed for heavy metals, microbial safety, and active compound potency. You simply dissolve your personalized dose in warm water as directed by your clinician.',
    relatedDept: 'herbal-pharmacotherapy',
  },
  {
    id: 'herbs-with-medication',
    category: 'herbal',
    badge: 'Pharmacological Oversight',
    question: 'Can I take EHMCare botanical prescriptions alongside my regular pharmaceutical medications?',
    answer:
      'Yes, in most cases, provided there is professional clinical coordination. During your diagnostic evaluation, our practitioners review your full pharmacological regimen (such as blood thinners, antihypertensives, or metformin) to rule out biochemical contraindications. We formulate synergistic botanical blends specifically calibrated to avoid adverse drug interactions, and we routinely instruct patients to space botanical doses 90 to 120 minutes apart from synthetic prescription drugs.',
  },
  {
    id: 'cupping-marks-meaning',
    category: 'cupping',
    badge: 'Clinical Explanation',
    question: 'What do the circular marks from cupping therapy mean, and how long do they last?',
    answer:
      'The discoloration left behind after dry or vacuum cupping is not a bruise or vascular damage. In integrative fascia therapy, negative suction draws micro-stagnant, de-oxygenated cellular metabolic waste and inflammatory cytokines from deep muscle beds toward the superficial dermal lymphatic network. Darker coloration reflects greater localized micro-circulatory stagnation. The circular discoloration typically fades entirely within 3 to 7 days as the lymphatic system naturally flushes the cleared toxins.',
    relatedDept: 'cupping-moxibustion',
  },
  {
    id: 'sessions-needed',
    category: 'consultation',
    badge: 'Treatment Trajectory',
    question: 'How many sessions will I need before seeing tangible clinical improvements?',
    answer:
      'Treatment duration depends upon chronicity, tissue vitality, and pathology depth. Acute musculoskeletal spasms, stiff neck, or tension headaches often experience 50% to 80% relief within 1 to 3 sessions. Complex chronic conditions—such as post-stroke hemiplegia, persistent sciatica, or autoimmune joint degeneration—typically require a targeted 6- to 12-session clinical course spaced across several weeks. Fertility and reproductive balancing protocols are tailored around 2 to 3 consecutive menstrual cycles.',
  },
  {
    id: 'first-visit-preparation',
    category: 'consultation',
    badge: 'Patient Preparation',
    question: 'What should I wear and how should I prepare for my first clinical consultation?',
    answer:
      'Please wear loose, comfortable clothing (such as jogging trousers and a relaxed top) that easily roll up past your knees and elbows, allowing unobstructed access to principal meridian acupoints. Avoid arriving on an entirely empty stomach or immediately after an overly heavy meal; a light snack 1 hour prior is ideal. Please also refrain from scraping your tongue coating on the morning of your visit, as lingual tongue assessment is an essential diagnostic pillar in our four-pillar clinical evaluation.',
  },
  {
    id: 'fertility-pregnancy-safety',
    category: 'acupuncture',
    badge: 'Reproductive Care',
    question: 'Is acupuncture safe during fertility preparation or early pregnancy?',
    answer:
      'Yes, when performed by accredited, specialized practitioners. In fertility protocols, pelvic meridian electro-acupuncture enhances ovarian follicle perfusion, thickens endometrial lining, and modulates stress hormones. During pregnancy, certified acupuncturists strictly avoid specific "downward-bearing" contraindicated acupoints (such as LI-4, SP-6, and GB-21) while utilizing gentle maternal points proven to alleviate severe morning sickness, pelvic girdle instability, and third-trimester fatigue safely.',
    relatedDept: 'infertility-support',
  },
];

type CategoryFilter = 'all' | 'acupuncture' | 'herbal' | 'cupping' | 'consultation' | 'safety';

export const TreatmentsFaq: React.FC<TreatmentsFaqProps> = ({
  onOpenBooking,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('acupuncture-pain');

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={`w-full bg-[#ffffff] py-16 sm:py-20 border-t border-[#eceef0] relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#004c22] text-[12px] font-bold uppercase tracking-wider mb-3 border border-[#a6f4b5]/40">
            <span className="material-symbols-outlined text-[16px]">quiz</span>
            <span>Clinical Knowledge Base</span>
          </div>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#004c22] tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[14px] sm:text-[16px] text-[#404940] mt-3 leading-relaxed">
            Essential facts on needle safety, botanical pharmacology, recovery timelines, and integrative care protocols at EHMCare Clinic & Academy.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-10 space-y-4">
          
          {/* Live Search Bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#404940] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. 'needle pain', 'herbs with medicine', 'cupping marks', 'sessions')..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[#f7f9fb] border border-[#e0e3e5] text-[14px] text-[#191c1e] placeholder-[#8e9193] focus:outline-none focus:border-[#004c22] focus:bg-white focus:ring-2 focus:ring-[#a6f4b5]/50 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8e9193] hover:text-[#191c1e] p-1 cursor-pointer"
                title="Clear search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-[12px] font-bold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-[#004c22] text-[#ffffff] shadow-sm'
                  : 'bg-[#f2f4f6] text-[#404940] hover:bg-[#e8ecef] hover:text-[#191c1e]'
              }`}
            >
              <span>All Inquiries</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeCategory === 'all' ? 'bg-[#acf770] text-[#0c2000]' : 'bg-[#e0e3e5] text-[#404940]'}`}>
                {FAQ_DATA.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('acupuncture')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'acupuncture'
                  ? 'bg-[#004c22] text-[#ffffff] shadow-sm'
                  : 'bg-[#f2f4f6] text-[#404940] hover:bg-[#e8ecef] hover:text-[#191c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">electric_bolt</span>
              <span>Acupuncture & Needling</span>
            </button>

            <button
              onClick={() => setActiveCategory('herbal')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'herbal'
                  ? 'bg-[#004c22] text-[#ffffff] shadow-sm'
                  : 'bg-[#f2f4f6] text-[#404940] hover:bg-[#e8ecef] hover:text-[#191c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">psychiatry</span>
              <span>Botanical Granules</span>
            </button>

            <button
              onClick={() => setActiveCategory('cupping')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'cupping'
                  ? 'bg-[#004c22] text-[#ffffff] shadow-sm'
                  : 'bg-[#f2f4f6] text-[#404940] hover:bg-[#e8ecef] hover:text-[#191c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">bloodtype</span>
              <span>Cupping Therapy</span>
            </button>

            <button
              onClick={() => setActiveCategory('consultation')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'consultation'
                  ? 'bg-[#004c22] text-[#ffffff] shadow-sm'
                  : 'bg-[#f2f4f6] text-[#404940] hover:bg-[#e8ecef] hover:text-[#191c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              <span>Visits & Sessions</span>
            </button>

            <button
              onClick={() => setActiveCategory('safety')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'safety'
                  ? 'bg-[#004c22] text-[#ffffff] shadow-sm'
                  : 'bg-[#f2f4f6] text-[#404940] hover:bg-[#e8ecef] hover:text-[#191c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>Integrative Safety</span>
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-[#f7f9fb] border border-[#e0e3e5]">
              <span className="material-symbols-outlined text-[36px] text-[#404940] mb-2">search_off</span>
              <p className="text-[15px] font-bold text-[#191c1e]">No matching questions found</p>
              <p className="text-[13px] text-[#404940] mt-1 max-w-md mx-auto">
                Try using different keywords or explore all questions using the category filters above.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-[#004c22] text-white text-[12px] font-bold hover:bg-[#166534] transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all border overflow-hidden ${
                    isExpanded
                      ? 'bg-[#ffffff] border-[#004c22] shadow-md ring-1 ring-[#004c22]/15'
                      : 'bg-[#f7f9fb] border-[#e0e3e5] hover:border-[#004c22]/40 hover:bg-[#ffffff]'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        {faq.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#e8f5e9] text-[#004c22] text-[10px] font-extrabold uppercase tracking-wider border border-[#a6f4b5]/40">
                            {faq.badge}
                          </span>
                        )}
                        <span className="text-[11px] text-[#6b7280] font-medium capitalize">
                          {faq.category === 'acupuncture'
                            ? 'Acupuncture'
                            : faq.category === 'herbal'
                            ? 'Botanical Pharmacotherapy'
                            : faq.category === 'cupping'
                            ? 'Cupping'
                            : faq.category === 'safety'
                            ? 'Clinical Safety'
                            : 'Consultations'}
                        </span>
                      </div>
                      <h3 className={`text-[15px] sm:text-[17px] font-bold leading-snug tracking-tight ${
                        isExpanded ? 'text-[#004c22]' : 'text-[#191c1e]'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isExpanded
                          ? 'bg-[#004c22] text-[#ffffff] rotate-180'
                          : 'bg-[#e0e3e5] text-[#404940]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-[13px] sm:text-[14px] text-[#404940] leading-relaxed border-t border-[#f0f2f4] animate-fadeIn">
                      <p>{faq.answer}</p>
                      
                      {onOpenBooking && (
                        <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#eceef0] flex-wrap gap-2 text-[12px]">
                          <span className="text-[#6b7280]">Want personalized guidance for this?</span>
                          <button
                            onClick={() => onOpenBooking(faq.relatedDept)}
                            className="inline-flex items-center gap-1 font-bold text-[#004c22] hover:text-[#166534] hover:underline cursor-pointer"
                          >
                            <span>Discuss with a Clinician</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Practitioner Triage Banner ("Still Have Questions?") */}
        <div className="max-w-4xl mx-auto mt-12 p-6 sm:p-8 rounded-3xl bg-[#f2f4f6] border border-[#e0e3e5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#004c22] font-bold text-[14px]">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
              <span>Need Direct Clinical Clarification?</span>
            </div>
            <p className="text-[13px] text-[#404940] max-w-lg leading-relaxed">
              Our registered clinical preceptors and patient triage desk are available via phone and WhatsApp to review your symptoms and suggest appropriate departments.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 shrink-0 w-full sm:w-auto">
            <a
              href={CONTACT_INFO.callHref}
              className="px-4 py-2.5 rounded-xl bg-[#ffffff] text-[#004c22] border border-[#004c22]/30 text-[12px] font-bold hover:bg-[#e8f5e9] transition-all flex items-center justify-center gap-1.5 shadow-sm flex-1 sm:flex-initial"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>Call Helpline</span>
            </a>

            <a
              href={CONTACT_INFO.whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-[12px] font-bold hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-1.5 shadow-sm flex-1 sm:flex-initial"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp Triage</span>
            </a>

            {onOpenBooking && (
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="px-4 py-2.5 rounded-xl bg-[#004c22] text-white text-[12px] font-bold hover:bg-[#166534] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer flex-1 sm:flex-initial"
              >
                <span className="material-symbols-outlined text-[16px] text-[#acf770]">calendar_month</span>
                <span>Book Evaluation</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
