import drAdeyemiImg from '../assets/images/team/dr_adeyemi_alabi.png';
import engrAbdullahiImg from '../assets/images/team/engr_abdullahi_mahmud.png';
import mrAbdurrozaqImg from '../assets/images/team/mr_abdurrozaq_taofeeq.png';
import mrMurtadhoImg from '../assets/images/team/mr_murtadho_ayinla.png';
import mrJamiuImg from '../assets/images/team/mr_jamiu_odofin.png';
import drNurudeenImg from '../assets/images/team/dr_nurudeen_ibrahim.png';
import mrPeleImg from '../assets/images/team/mr_pele_surarat.png';
import drJamiuOgirimaImg from '../assets/images/team/dr_jamiu_ogirima.png';
import mrsHawauImg from '../assets/images/team/mrs_hawau_adejoke.png';
import mrKasimImg from '../assets/images/team/mr_kasim_abdulwahiid.png';
import mrAbdulsalaamImg from '../assets/images/team/mr_abdulsalaam_adesina.png';
import mrYinusaImg from '../assets/images/team/mr_yinusa_habeebullah.png';
import neuroAcupunctureImg from '../assets/images/neuro_acupuncture_1792428300304.jpg';
import infertilityReproductiveImg from '../assets/images/infertility_reproductive_health_1792441682325.jpg';
import advancedCuppingImg from '../assets/images/advanced_cupping_moxibustion.png';
import botanicalPharmacotherapyImg from '../assets/images/botanical_pharmacotherapy_granules.png';
import strokeRehabImg from '../assets/images/stroke_rehabilitation_neuromuscular.png';
import naturopathicHydrotherapyImg from '../assets/images/naturopathic_medicine_hydrotherapy.png';
import orthopedicTuinaImg from '../assets/images/orthopedic_tuina_bone_setting.png';
import shenCalmingImg from '../assets/images/shen_calming_sleep_medicine.png';
import integrativeOncologyImg from '../assets/images/integrative_oncology_supportive_medicine.png';
import auricularNadaImg from '../assets/images/auricular_nada_detox_protocol.png';
import pureArtemisiaMoxaImg from '../assets/images/pure_artemisia_thermal_moxibustion.png';
import cosmeticAcupunctureImg from '../assets/images/holistic_dermatology_cosmetic_acupuncture.png';
import medicalQigongImg from '../assets/images/medical_qigong_breathwork.png';
import ehmcareLogoImg from '../assets/images/logo_ehmcare.jpeg';
import heroInpatientSuiteImg from '../assets/images/ehmcare_hero_inpatient_suite.png';
import clinicWardTwinBedsImg from '../assets/images/clinic/clinic_ward_twin_beds.png';
import clinicAcupunctureBayImg from '../assets/images/clinic/clinic_acupuncture_bay.png';
import clinicElectrostimApparatusImg from '../assets/images/clinic/clinic_electrostim_apparatus.png';
import clinicConsultationDiagnosticImg from '../assets/images/clinic/clinic_consultation_diagnostic.png';

export interface ClinicGalleryPhoto {
  id: string;
  title: string;
  roomType: string;
  badge: string;
  icon: string;
  description: string;
  equipment: string[];
  image: string;
  fallbackUrl: string;
}

export const INSIDE_CLINIC_GALLERY: ClinicGalleryPhoto[] = [
  {
    id: 'inpatient-recovery-ward',
    title: 'Twin-Bed Inpatient Clinical Recovery Ward',
    roomType: 'Inpatient Recovery Pavilion',
    badge: '24/7 Monitored Wards',
    icon: 'bed',
    description: 'Hospital-grade dual ergonomic clinical recovery beds equipped with continuous multi-parameter vital signs telemetry, intravenous infusion poles, emergency crash utility, and sterilized patient cabinetry.',
    equipment: ['Multi-Parameter Vital Signs Monitor', 'Ergonomic Posture Profiling Beds', 'Sterile IV Pole & Drug Trolley', 'Antimicrobial Glazed Wall Tiles'],
    image: clinicWardTwinBedsImg,
    fallbackUrl: '/assets/aistudio/image_842dc3f4.png',
  },
  {
    id: 'acupuncture-therapy-bay',
    title: 'Sterile Acupuncture & Meridian Decompression Bay',
    roomType: 'Acupuncture & Tuina Suite',
    badge: 'Single-Use Sterile Field',
    icon: 'spa',
    description: 'Dedicated treatment suite for neuro-acupuncture, targeted meridian decompression, and moxibustion. Features hygienic padded therapy couch and individual climate circulation.',
    equipment: ['Adjustable Padded Therapy Couch', 'Individual Climate Air Flow', 'Hospital-Grade Wall Sterility', 'Anti-Static Medical Floor'],
    image: clinicAcupunctureBayImg,
    fallbackUrl: '/assets/aistudio/image_a5d33dae.png',
  },
  {
    id: 'inpatient-recovery-suite-three',
    title: 'Hospital-Grade Monitored Inpatient Recovery Suite',
    roomType: 'Inpatient Clinical Recovery Suite',
    badge: 'Clinical Observation Suite',
    icon: 'bed',
    description: 'Specialized inpatient recovery suite equipped with hospital-grade profiling bed, antimicrobial privacy partition curtain, adjustable glare-reducing blinds, and vital signs monitoring infrastructure.',
    equipment: ['Hospital-Grade Profiling Bed', 'Sterile Privacy Partition Curtain', 'Vital Telemetry & Infusion Support', 'Optimized Clinical Recovery Ventilation'],
    image: heroInpatientSuiteImg,
    fallbackUrl: '/hero_inpatient_suite.png',
  },
  {
    id: 'consultation-diagnostic-room',
    title: 'Physician Clinical Consultation & Diagnostic Room',
    roomType: 'Diagnostic & Triage Suite',
    badge: 'TCM Pulse & Tongue Diagnostic',
    icon: 'clinical_notes',
    description: 'Physician consultation and diagnostic review suite where pulse diagnosis, tongue examination, neuro-assessment, and personalized botanical prescriptions are formulated.',
    equipment: ['Clinical Diagnostic Whiteboard', 'Meridian Anatomy Mapping System', 'Private Examination Bed', 'Integrated Patient Medical Records'],
    image: clinicConsultationDiagnosticImg,
    fallbackUrl: '/assets/aistudio/image_c55fe859.png',
  },
];

export const IMAGES = {
  logo: ehmcareLogoImg,
  heroInpatient: heroInpatientSuiteImg,
  clinicWard: clinicWardTwinBedsImg,
  clinicAcupuncture: clinicAcupunctureBayImg,
  clinicElectrostim: clinicElectrostimApparatusImg,
  clinicConsultation: clinicConsultationDiagnosticImg,
  heroRehab: strokeRehabImg,
  heroRounds: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApXYaIh_5IeAmVCqQcMe2aUEqknfutSRlmTTAI45Ov6DQMAwIHt1MG1NVO9oWHq3ZZ3ghGHfeorhvlKI5TUveoCJhY4YNqrFayY8bkIiIOEQhVqe1VBOak1dlDwJvWaoftqB11b14I8k5bfk6TRLbegloLehocvYv0bAbTUYTXtxnWapnKC_Sp0iWJIkVq3xDHlGFtzmmla1EC7dL9yLIHoVfE06TVptz9FBHO2krRHs_sQM4NgWOFTr7fkqzUdbaoppI',
  mapBackground: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO-T4tNm2j6rZH6mPtxzZZnmaFJOmbuxDce_pqrCEcllb1PB94U3-AqCVsFNIpWQk1fcAByLTxmvByrAt_s_xf7GBPuMbzggEEmj98HHvvOq9K3cZs_goktQ7ST2YsNojH40nLXuLYcYyImfRePf9cqZknaNtp0-HWrmgoqfbcmJkUVM9AICoYFB8-0bLiOb2h8euvozDCNI__GVspsz8uRQeisJU7kf7AijLTfA-qDewgDnsLzRMZmg',
  academyWhiteboard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTYYv1Z4pw1y2KWXfl2Jk2fJJut4etbvl5tiUDMVltau6KCkZn4WrCSemYUhqZWyJJlMBP5WBEd5cfXbprhRGIt_dJK_bMzoqHyO-U7gl2e9mwv7cXcrkxxXX0dp-leH2UYEP6vf1tnJk5rNGXO0aSWKR--zrdnyoeJMbw9ENpMfN50rnJI63ul0JPVOTOhNKBRuE2jO3WJd-p9BeOy4gKsoSZqgCfjf6jrte666_iGXKX4I33NxH4jm88Glk4V9kfRBo',
  academyWebinar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpAI1sY1XtJ5bJT0O1sfmin65fbN6I9JdpUDNoJIZHjVIfdXxzBgvGEVb5RDk28BM1v2d9GnMnKYdZv_cE-CIvST1LSmTvNuhMKdqZSo36w4Kt1XY-UU4UOX2ZZJ34yyBlg_TeLEIX_7wDqGfX2NKt-M247whA6UjzaqDT1XciykpI7NYajo-nKn2qj0m5stsJEPA_P9ECiJePhQOZyzwjYp27NhWVvQLTeQqPoONpMIS9FWPMdQabGy0KYaZatuB2Aik',
  academyStudents: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApvIobNZ58CtgDi2tjj-nrKr1gtZJyA1j-_PRlLQ-tmx4UESr6gxx-skcCrkOPQFjm303uOBamyRdofUbs4mQiALrOxpkvufkPAuKIL-wUCbMmXkJ48D5BoNzFFeTZDWWj4VeEXvlTXwHsICbNI1qKchVWKYLZEch6Bhlzkqy7yjFQVXtu48JzMcj3QIsNIEZdDYzGgeYABIbLLjHETIO8HImu8fU-CfX1bppQoq60pyWzW-VbgJjdU86LLdlTbim_wtY',
  academyPracticum: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB17NN7v-2S8F4J2XdzcrEpwSfzR6kUjItkdFZrwBMbwE6Dv0fW_ag5V_5I6LgGITJJ0oe4vo9v1yQ2VnKwGDVw4fWpA0GGPkJxiqODVYF2CUgM8r6L0buY3ySiYFhZJiK_4qQxmuJaU5_QSF2EZPRWptxGBtTggIRnm5aRuDMhYvMEh7SyvGuMXdRO3rHGQkbKt_XUz95g_JB3A_YOaKO8UUAIQBdR2Qi3Z4grMuJTXt38Urmgs5kkLh6UNqH86XezDm8',
  futureCampus: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0e_6QS20USuwq7ui7MpOVdX02PlrG-mIiEB314rrpljYtEfF3knRNuAhp1Rm6o7oazEd4qFJuzJOnoR5b-lMfT3mjgLV_5vs8c64yLl2354bdbOjsI4nssBevIwHBoOxPjIoy5svii9tWH0tg7iJwEANsaAAr-MTYWTfzk5qzf68QLI4dE1t8vdAng3ogSMA4aj9pUdDFoRP37bYSAzEPCGFyZb84rJdRAoTsdeY9g4AdTEufVs_ksA',
  futureDiagnostic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXDzQBQ68gkAdl_0g4sSCIWpNUhgR_coHT5keuGVGIRybOV2Wnvb5PNI_SBJoIBsyS97NpQpLtW-3Jdt1hEH2jRqB51pfFsroM3BxvmR8pgX9FGy2WJR-wpctVcb7-F3X_9Dt3f_l-2ax30imEkw_AC69Xjf24btzbkd5l4sDcfM3alIfRACDmYnzy4Nh4KjT7SGY-Zihe9oZRM-8rFa6u5V8ADeADwR_2CMOOV8uB9v78XsJisNZ-Zg',
  futureHospital: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoTEQ79XNRqlk7RPhkmXGVXimk4qQIVV4oC3Ne2sc8RP-NMoJiwbPg_udwaEVN96FAwJSP3fGgBMNzpbJF_BsNpYdQ_R4wixo2wWixpIowyM5cnpZJd7d-nWmRXqihwN2Q_R84HzAxP85qD8P3EJWVrg6xnS5DtLZrd7_L2sYJkL8fLzgLgPvX86dKV6hofHlvMokTCyL7stuErGLHS-swcHQXFqkYJCeN1la2c1c5wU0Vk1lPKqsyzw',
  futurePharma: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD76qaMTTQdMtedNDjyvBMSsXUOIRg_PqBpZ0hd9mqj1PXLigi5U6YGgnw1Rc5vOup1q38HB5XCXOUyui66aOrSwNV16tO7iS7AIN8cDkMX9vLuCyNdzec203SEk8MrjQNYXjczV_qeuNwwqPNne8IeO4X5cnbsXkT9oXJxuatK8dFbW4LX8SXRNENC25JE1IzHTGGoM77pOlZWx70efgoSWwBJuslI5_iqvy-ivegg4tK-tnGzNJCcDA',
  lmsLectureStream: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7r10BD4sdkWFpzfp6PbwxDXKCZLG-sVw-E56XY__z0mnxs5vrTe0-BrFXQavXToeI0HMPonNAXGA699qpTBQsPRtxPmPK1_QUcLqUpaHTHDFZ1pdhpCzbiqAdVZjfi30qPf74M58cBiDNZOo_yOlbR9-gX-UgtJqFnjmN9IfYUzmHqls7S3hz_xQ-utTRypK74TNKCrOAX0_FMkbom4Om98ksFnvx50gf4HfWr7JWiJAY6UUcHT5fJw',
  lmsWebinarSpeaker: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfCwzW-6bEXmSjA6afWnHZN5ESVP2ru0vKCg8QX8gDGYHiXbbW7GODi-aqM8E2wxFG0V_OYnlf-qHyrSIA8YDsxcvMIqHm6YjhNhV6lNqGcrTdDNcP0Nu8LYRzV23vWh8uzxmvhgYXax4RG6n2JngJ1ujCg9c9pdHwZuyaR_DKP8nH6jUnZ9By7iqIIqAajULCgeVmL6owD35hEZYpoB9zOHB77SsDQDGpY1XkuBj8o2mu-VQiLoy03A',
  lmsPulseLab: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqLiWAjIYqaDwRFcN8j3wxHlGZbqoEHocqRe_RsNM-O_QZ6SVThNX6heFeECNdUeCxkV7hmvq3tNTUWoEK6aHsrKsMPeY0sMG5JHb0oiXWLsrkoL2nmjK_7hZaURLmxXWMqMupZyG0uihHRC2TqK7hj_3CqaPKgKNKrLuUNALJ3xJkUAFRHCCOiCtkw0Xq59lD2nsO93IjykoMPdW-n8YNx3pywmbkciXXAGgL4wzcYPBSb5az1ZtYMA',
  lmsWardTwo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAllry8sW9ElXCRb4Gd_HwMYeJUN9dgfZrTjAHkJJFd9BjjF77so83K3gYt4PcvpzA-oAd9sQrBzNjfPwaKQ91tUvBbSTpG83Qy6NIjq6D1zy0WIevY60nRSA0-EYNivT9xJCSG040UAPk8VggMpGiLTkVk5SYu3hwetR_nq1Nj0hupIrV_1CPpng7nl1Xtj5wLoSMxWXVjeratFY9P4iew7IxGtqFkdbEXP1mSdLBxhoonpBLgo_W0og',
};

export const CONTACT_INFO = {
  callPhone: '0901 518 4004',
  callPhoneFull: '+234 901 518 4004',
  callHref: 'tel:09015184004',
  whatsAppPhone: '+234 905 975 8574',
  whatsAppRaw: '2349059758574',
  whatsAppHref: 'https://wa.me/2349059758574',
  email: 'ehmcaree@gmail.com',
  address: '4 Sofoluwe Street, Off Lajorin Road, Sabo-Oke, Ilorin, Kwara State, Nigeria',
  rcNumber: '8490484',
};

export interface ClinicalDepartment {
  id: string;
  deptNumber: string;
  title: string;
  icon: string;
  category: string;
  badge: string;
  description: string;
  image: string;
  protocols: string[];
  duration: string;
}

export const COMPLETE_DEPARTMENTS: ClinicalDepartment[] = [
  {
    id: 'neuro-acupuncture',
    deptNumber: '01',
    title: 'Neuro-Acupuncture & Pain Elimination',
    icon: 'electric_bolt',
    category: 'Acupuncture & Neurological',
    badge: '94.8% Clinical Relief',
    description: 'Targeted electro-acupuncture for severe sciatica, lumbar spondylosis, intractable migraines, trigeminal neuralgia, and spinal nerve root compression.',
    image: neuroAcupunctureImg,
    protocols: ['Lumbar & Cervical Spondylosis', 'Sciatic Nerve Decompression', "Bell's Palsy & Facial Symmetry"],
    duration: '45 - 60 Mins',
  },
  {
    id: 'infertility-care',
    deptNumber: '02',
    title: 'Infertility Support & Reproductive Health',
    icon: 'vital_signs',
    category: 'Reproductive & Hormonal',
    badge: 'Couples Protocol',
    description: 'Integrating meridian thermal regulation with botanical formulations for ovarian follicle maturation, tubal micro-perfusion, and male sperm motility.',
    image: infertilityReproductiveImg,
    protocols: ['Fallopian Tubal Permeability Support', 'Hormonal & Menstrual Normalization', 'Sperm Morphology & Motility Optimization'],
    duration: '60 Mins',
  },
  {
    id: 'cupping-moxibustion',
    deptNumber: '03',
    title: 'Advanced Cupping & Moxibustion',
    icon: 'bloodtype',
    category: 'Physical & Manipulative',
    badge: 'Sterile Single-Use Kits',
    description: 'Hospital-grade sterile surgical wet cupping and pure Artemisia moxibustion to stimulate microvascular perfusion and clear toxic stagnation.',
    image: advancedCuppingImg,
    protocols: ['Clinical Sterile Wet Cupping Therapy', 'Deep Fascial Release & Dry Vacuum', 'Thermal Moxibustion for Chronic Arthrosis'],
    duration: '40 - 50 Mins',
  },
  {
    id: 'herbal-pharmacotherapy',
    deptNumber: '04',
    title: 'Classical Botanical Pharmacotherapy & Granules',
    icon: 'psychiatry',
    category: 'Botanical & Natural Pharmacotherapy',
    badge: 'Standardized Compounds',
    description: 'Laboratory-standardized compounding of traditional medicinal plants and concentrated granules. Synergistic bio-active formulations with verified safety profiles.',
    image: botanicalPharmacotherapyImg,
    protocols: ['Hepato-Protective Detox Blends', 'Metabolic & Glycemic Regulation', 'Immunomodulatory Decoctions'],
    duration: 'Consultation & Dispense',
  },
  {
    id: 'stroke-rehab',
    deptNumber: '05',
    title: 'Stroke Rehabilitation & Neuromuscular Recovery',
    icon: 'accessibility_new',
    category: 'Acupuncture & Neurological',
    badge: '89.4% Limb Regain',
    description: 'Inpatient and outpatient neuro-restorative care. Combines scalp Xing Nao Kai Qiao neuro-acupuncture with targeted limb motor re-education and neuro-protectants.',
    image: strokeRehabImg,
    protocols: ['Scalp Neuro-Acupuncture Plasticity', 'Motor Neuron Gait & Hand Retraining', 'Facial Symmetrical Recovery'],
    duration: '60 - 90 Mins / Inpatient',
  },
  {
    id: 'naturopathic-medicine',
    deptNumber: '06',
    title: 'Naturopathic Clinical Medicine & Hydrotherapy',
    icon: 'water_drop',
    category: 'Botanical & Natural Pharmacotherapy',
    badge: 'Certified Naturopathic Care',
    description: 'Evidence-based naturopathy utilizing contrast hydrotherapy, visceral organ drainage, cellular hydration, and natural constitutional detoxification.',
    image: naturopathicHydrotherapyImg,
    protocols: ['Contrast Vascular Hydrotherapy Protocols', 'Hepato-Renal Drainage & Detox Packs', 'Orthomolecular Cellular Nutrient Infusions'],
    duration: '60 Mins',
  },
  {
    id: 'guasha-myofascial',
    deptNumber: '07',
    title: 'Guasha Therapy & Myofascial Kinetic Mobilization',
    icon: 'spa',
    category: 'Physical & Manipulative',
    badge: 'Immediate Decompression',
    description: 'Medical instrument-assisted soft tissue scraping (IASTM) and medicinal oils along myofascial chains to release persistent pain and microvascular ischemia.',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=800&q=80',
    protocols: ['Chronic Cervico-Thoracic Fibrositis', 'Fascial Adhesions & Trigger Points', 'Lymphatic Drainage Decongestion'],
    duration: '45 Mins',
  },
  {
    id: 'metabolic-lifestyle',
    deptNumber: '08',
    title: 'Naturopathic Metabolic & Endocrine Medicine',
    icon: 'query_stats',
    category: 'Specialty Medicine',
    badge: 'Biomarker Reversal',
    description: 'Precision functional nutrition, botanical insulin sensitizers, and lifestyle resets designed to reverse metabolic syndrome, hypertension, and fatty liver.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    protocols: ['Type 2 Diabetes Glycemic Stabilization', 'Hypertension & Endothelial Healing', 'Microbiome & Leaky Gut Restoration'],
    duration: '45 Mins',
  },
  {
    id: 'orthopedic-tuina',
    deptNumber: '09',
    title: 'Orthopedic Tuina & Traditional Bone Setting',
    icon: 'healing',
    category: 'Physical & Manipulative',
    badge: 'Structural Alignment',
    description: 'Classical Chinese orthopedic manipulation (Zheng Gu Tuina) targeting spinal subluxations, lumbar disc herniation, frozen shoulder, and postural deformities.',
    image: orthopedicTuinaImg,
    protocols: ['Zheng Gu Spinal Alignment', 'Frozen Shoulder & Tendon Balancing', 'Non-Surgical Joint Decompression'],
    duration: '50 Mins',
  },
  {
    id: 'mental-shen',
    deptNumber: '10',
    title: 'Shen-Calming Psycho-Emotional & Sleep Medicine',
    icon: 'psychology',
    category: 'Specialty Medicine',
    badge: 'Deep Restful Protocol',
    description: 'Specialized Shen-settling acupuncture and botanical adaptogens targeting chronic refractory insomnia, severe anxiety, adrenal burn-out, and panic disorders.',
    image: shenCalmingImg,
    protocols: ['Chronic Insomnia Circadian Reset', 'Auricular Vagus Nerve Stimulation', 'Adrenal Exhaustion & Burnout Recovery'],
    duration: '50 Mins',
  },
  {
    id: 'paediatric-geriatric',
    deptNumber: '11',
    title: 'Paediatric & Geriatric Integrative Care',
    icon: 'family_restroom',
    category: 'Specialty Medicine',
    badge: 'All Ages Gentle Care',
    description: 'Gentle, non-invasive therapies designed for sensitive children (needle-free Shonishin) and preserving mobility and vitality in elderly patients.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    protocols: ['Needle-Free Japanese Shonishin for Kids', 'Childhood Immunity, Asthma & Colic Relief', 'Geriatric Osteoarthritis & Cognitive Tone'],
    duration: '40 Mins',
  },
  {
    id: 'integrative-oncology',
    deptNumber: '12',
    title: 'Integrative Oncology Supportive Medicine',
    icon: 'shield_with_heart',
    category: 'Specialty Medicine',
    badge: 'Integrative Support',
    description: 'Complementary protocols to reduce chemo/radiation side effects, alleviate peripheral neuropathy, control post-treatment nausea, and rebuild immunological stamina.',
    image: integrativeOncologyImg,
    protocols: ['Chemotherapy-Induced Neuropathy Relief', 'Antiemetic P6 Acupuncture Protocols', 'Vitality & White Blood Cell Regeneration'],
    duration: '60 Mins',
  },
  {
    id: 'auricular-addiction',
    deptNumber: '13',
    title: 'Auricular Acupoint Medicine & NADA Detox Protocol',
    icon: 'hearing',
    category: 'Acupuncture & Neurological',
    badge: 'NADA Certified',
    description: 'Ear microsystem acupuncture protocols for substance and smoking cessation, autonomic nervous down-regulation, compulsive stress eating, and PTSD trauma relief.',
    image: auricularNadaImg,
    protocols: ['5-Point NADA Addiction Protocol', 'Vagal Tone Auricular Stimulation', 'Compulsive Craving Neuromodulation'],
    duration: '35 - 45 Mins',
  },
  {
    id: 'moxibustion-thermal',
    deptNumber: '14',
    title: 'Pure Artemisia Thermal Moxibustion (Jiu Fa)',
    icon: 'local_fire_department',
    category: 'Botanical & Natural Pharmacotherapy',
    badge: 'Therapeutic Warmth',
    description: 'Targeted smokeless and indirect Artemisia moxa warming along Ren and Du meridian reservoirs to dispel deep internal cold, nourish Yang qi, and revitalize organ exhaustion.',
    image: pureArtemisiaMoxaImg,
    protocols: ['Indirect Ginger & Salt Moxa Cones', 'Smokeless Heat Lamp Meridian Warming', 'Yang Qi Restoration for Chronic Fatigue'],
    duration: '45 Mins',
  },
  {
    id: 'dermatology-cosmetic',
    deptNumber: '15',
    title: 'Holistic Dermatology & Cosmetic Micro-Acupuncture',
    icon: 'face',
    category: 'Specialty Medicine',
    badge: 'Natural Skin Rejuvenation',
    description: 'Constitutional skin healing using micro-needle facial collagen stimulation, lymph flushing, and systemic blood-cooling phytomedicines for stubborn eczema, psoriasis, and acne.',
    image: cosmeticAcupunctureImg,
    protocols: ['Facial Micro-Needle Collagen Activation', 'Blood-Cooling Botanicals for Eczema', 'Natural Scar Tissue Remodeling'],
    duration: '60 Mins',
  },
  {
    id: 'qigong-rehab',
    deptNumber: '16',
    title: 'Medical Qigong & Therapeutic Kinetic Breathwork',
    icon: 'air',
    category: 'Physical & Manipulative',
    badge: 'Kinetic Vitality',
    description: 'Doctor-guided diaphragmatic respiratory biomechanics and bio-energetic movement rehabilitation for post-operative recovery, COPD, and cardiovascular endurance.',
    image: medicalQigongImg,
    protocols: ['Dao Yin Bio-Energetic Breath Alignment', 'Cardiopulmonary Kinetic Expansion', 'Lymphatic Muscle-Pump Mobilization'],
    duration: '45 Mins',
  },
];

export const CLINICAL_SERVICES = COMPLETE_DEPARTMENTS.map((d) => ({
  id: d.id,
  name: d.title,
}));

export const CLINICAL_LOCATIONS = [
  { id: 'ilorin', name: 'Ilorin Center (7 Sofoluwe St, Off Lajorin Rd, Sabo-Oke)' },
  { id: 'abuja', name: 'Abuja Clinical Center (Maitama District, FCT)' },
  { id: 'virtual', name: 'Tele-Consultation (Online / Global Video Triage)' },
];

export const AVAILABLE_TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:30 AM - 11:30 AM',
  '01:00 PM - 02:00 PM',
  '02:30 PM - 03:30 PM',
  '04:00 PM - 05:00 PM',
  '05:30 PM - 06:30 PM',
];

export const INVESTOR_PITCH_DATA = {
  entity: 'EHMCARE CLINIC LTD',
  rcNumber: '8490484',
  valuationPreMoney: '₦12B ($8.5M)',
  valuationPostMoney: '₦20.5B ($14.5M)',
  totalRaise: '₦8.5B ($6.0M)',
  equityOffered: '41.5%',
  minTicket: '₦50M',
  yearThreeRevenue: '₦7.8B',
  ebitdaMargin: '30% (₦2.02B)',
  patYearThree: '₦1.358B',
  breakevenMonth: 'Month 20',
  address: '4 Sofoluwe Street, Off Lajorin Road, Sabo-Oke, Ilorin, Kwara State, Nigeria',
  phones: '0901 518 4004 • 0905 975 8574',
  email: 'ehmcaree@gmail.com',
  ceo: 'Dr. Adeyemi Isaaq Alabi',
  phases: [
    {
      phase: 'Phase 1: Foundation (Months 1–6)',
      amount: '₦2.1B ($1.5M)',
      focus: 'Diagnostic Centre (X-ray, ultrasound, lab), EHConnect MVP launch, Academy accreditation',
    },
    {
      phase: 'Phase 2: Expansion (Months 7–18)',
      amount: '₦3.5B ($2.5M)',
      focus: 'Acquire MRI & CT via flexible plans, open conventional medicine inpatient facility, begin GMP manufacturing',
    },
    {
      phase: 'Phase 3: Scale (Months 19–36)',
      amount: '₦2.9B ($2.0M)',
      focus: 'Full ecosystem operational, nationwide healthcare expansion, profitability achieved',
    },
  ],
  useOfFunds: [
    { category: 'Diagnostic Centre', pct: '35%', amount: '₦2.98B', items: 'MRI, CT, X-ray, ultrasound, lab, NNRA/RRBN licensing' },
    { category: 'Conventional Medicine', pct: '25%', amount: '₦2.13B', items: 'Facility, equipment, pharmacy, emergency, staffing' },
    { category: 'EHMCare Academy', pct: '15%', amount: '₦1.28B', items: 'NMCN/NUC accreditation, classrooms, simulation labs' },
    { category: 'Manufacturing Unit', pct: '12%', amount: '₦1.02B', items: 'GMP facility, equipment, NAFDAC registrations' },
    { category: 'EHConnect Platform', pct: '8%', amount: '₦680M', items: 'Software, AI/AR, cloud infrastructure, mobile app' },
    { category: 'Working Capital', pct: '5%', amount: '₦425M', items: '12-month runway, executive salaries, marketing' },
  ],
  leadership: [
    {
      name: 'Dr. Adeyemi Isaaq Alabi',
      role: 'Founder & CEO',
      domain: 'Integrated Medicine, TCCM',
      image: drAdeyemiImg,
      fallbackUrl: '/images/team/dr_adeyemi_alabi.png',
      imageUrl: 'https://i.imgur.com/RPDtQXD.png',
      phone: '+234 905 975 8574',
      phoneRaw: '2349059758574',
      isWhatsApp: true,
    },
    {
      name: 'Engr. Abdullahi Mahmud',
      role: 'Chief Technology Officer',
      domain: 'AI, AR, Software, Research',
      image: engrAbdullahiImg,
      fallbackUrl: '/images/team/engr_abdullahi_mahmud.png',
      imageUrl: 'https://i.imgur.com/AZhd3Gq.png',
      phone: '+234 802 627 5433',
      phoneRaw: '2348026275433',
      isWhatsApp: true,
    },
    {
      name: 'Mr. Abdurrozaq Taofeeq',
      role: 'Chief Medical Officer',
      domain: 'Conventional Medicine',
      image: mrAbdurrozaqImg,
      fallbackUrl: '/images/team/mr_abdurrozaq_taofeeq.png',
      imageUrl: 'https://i.imgur.com/SAYeGFg.png',
      phone: '+234 706 636 9598',
      phoneRaw: '2347066369598',
      isWhatsApp: true,
    },
    {
      name: 'Mr. Murtadho Ayinla',
      role: 'Chief Financial Officer',
      domain: 'Finance, Investment',
      image: mrMurtadhoImg,
      fallbackUrl: '/images/team/mr_murtadho_ayinla.png',
      imageUrl: 'https://i.imgur.com/XiUcJGZ.png',
      phone: '+234 901 518 4004',
      phoneRaw: '2349015184004',
      isWhatsApp: false,
    },
    {
      name: 'Mr. Jamiu Rasheed Odofin',
      role: 'Chief Operating Officer',
      domain: 'Hospital Operations, Supply Chain',
      image: mrJamiuImg,
      fallbackUrl: '/images/team/mr_jamiu_odofin.png',
      imageUrl: 'https://i.imgur.com/W7QXqHR.png',
      phone: '+234 907 692 9317',
      phoneRaw: '2349076929317',
      isWhatsApp: true,
    },
    {
      name: 'Dr. Nurudeen Ibrahim',
      role: 'Head of TCCM',
      domain: 'Acupuncture, Herbal Medicine',
      image: drNurudeenImg,
      fallbackUrl: '/images/team/dr_nurudeen_ibrahim.png',
      imageUrl: 'https://i.imgur.com/798SCI1.png',
      phone: '+234 814 184 3865',
      phoneRaw: '2348141843865',
      isWhatsApp: true,
    },
    {
      name: 'Mr. Pele Owo Surarat',
      role: 'Head of Manufacturing',
      domain: 'GMP Production, Logistics',
      image: mrPeleImg,
      fallbackUrl: '/images/team/mr_pele_surarat.png',
      imageUrl: 'https://i.imgur.com/Afcb2GH.png',
      phone: '+234 901 518 4004',
      phoneRaw: '2349015184004',
      isWhatsApp: false,
    },
    {
      name: 'Dr. Jamiu Ogirima',
      role: 'Research Lead',
      domain: 'Validation, Product Development',
      image: drJamiuOgirimaImg,
      fallbackUrl: '/images/team/dr_jamiu_ogirima.png',
      imageUrl: 'https://i.imgur.com/K7Lyo1Y.png',
      phone: '+234 901 518 4004',
      phoneRaw: '2349015184004',
      isWhatsApp: false,
    },
    {
      name: 'Mrs. Hawau Adejoke',
      role: 'Product Manager & Head of Nurses',
      domain: 'Clinical Operations',
      image: mrsHawauImg,
      fallbackUrl: '/images/team/mrs_hawau_adejoke.png',
      imageUrl: 'https://i.imgur.com/42Pvjhk.png',
      phone: '+234 806 196 6567',
      phoneRaw: '2348061966567',
      isWhatsApp: true,
    },
    {
      name: 'Mr. Kasim AbdulWahiid',
      role: 'Lead Legal Advisor',
      domain: 'Regulations, Compliance',
      image: mrKasimImg,
      fallbackUrl: '/images/team/mr_kasim_abdulwahiid.png',
      imageUrl: 'https://i.imgur.com/h3utWkr.png',
      phone: '+234 706 666 6581',
      phoneRaw: '2347066666581',
      isWhatsApp: true,
    },
    {
      name: 'Mr. Abdulsalaam A. Adesina',
      role: 'Head of Diagnostics',
      domain: 'MRI, CT, Lab Management',
      image: mrAbdulsalaamImg,
      fallbackUrl: '/images/team/mr_abdulsalaam_adesina.png',
      imageUrl: 'https://i.imgur.com/ElkuQgt.png',
      phone: '+234 901 518 4004',
      phoneRaw: '2349015184004',
      isWhatsApp: false,
    },
    {
      name: 'Mr. Yinusa A. Habeebullah',
      role: 'Head of Academy',
      domain: 'Curriculum, Academic Affairs',
      image: mrYinusaImg,
      fallbackUrl: '/images/team/mr_yinusa_habeebullah.png',
      imageUrl: 'https://i.imgur.com/taZyUxg.png',
      phone: '+234 813 893 8215',
      phoneRaw: '2348138938215',
      isWhatsApp: true,
    },
  ],
};
