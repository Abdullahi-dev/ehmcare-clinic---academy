import { jsPDF } from 'jspdf';

export interface InvestorLeadData {
  name: string;
  email: string;
  phone: string;
  entity?: string;
  ticketSize?: string;
}

/**
 * Builds the official EHMCARE 12-Slide Confidential Investor Presentation (2026)
 * Matching exactly the 12-page dossier from Dr. Adeyemi Isaaq Alabi & EHMCARE CLINIC LTD.
 */
export function buildInvestorPitchDeck(lead?: InvestorLeadData): jsPDF {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: [960, 540], // 16:9 widescreen presentation slide standard
  });

  const greenDark = [0, 76, 34]; // #004c22
  const greenMid = [22, 101, 52]; // #166534
  const greenLight = [166, 244, 181]; // #a6f4b5
  const greenAccent = [172, 247, 112]; // #acf770
  const limeText = [53, 107, 0]; // #356b00
  const charcoal = [64, 73, 64];
  const mutedText = [120, 130, 120];
  const bgCard = [242, 244, 246];

  const applyHeader = (category: string, title: string, slideNum: string) => {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 960, 540, 'F');
    // Top brand bar
    doc.setFillColor(0, 76, 34);
    doc.rect(0, 0, 960, 8, 'F');

    // Category
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(53, 107, 0);
    doc.text(category.toUpperCase(), 60, 48);

    // Headline
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 76, 34);
    doc.text(title, 60, 80);

    // Slide footer
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 130, 120);
    doc.text(`EHMCARE CLINIC LTD — Healing Beyond Boundaries`, 60, 515);
    doc.text(slideNum, 900, 515, { align: 'right' });

    if (lead?.email) {
      doc.text(`Issued for: ${lead.name || 'Investor'} (${lead.email})`, 480, 515, { align: 'center' });
    }
  };

  // ==========================================
  // SLIDE 01: COVER
  // ==========================================
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 960, 540, 'F');
  doc.setFillColor(0, 76, 34);
  doc.rect(0, 0, 960, 10, 'F');

  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('CONFIDENTIAL • INVESTOR PRESENTATION • 2026', 60, 58);

  // Logo text
  doc.setFontSize(40);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('EHMCare', 60, 115);
  doc.setFontSize(11);
  doc.setTextColor(53, 107, 0);
  doc.text('INTEGRATED HEALTHCARE • RC NO: 8490484', 60, 135);

  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('Integrated\nhealthcare.\nBuilt for Nigeria.', 60, 205);

  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text(
    'EHMCARE CLINIC LTD brings traditional and\nconventional medicine, diagnostics, education,\ntechnology, and manufacturing into one coordinated\ncare ecosystem.\n\nHealing Beyond Boundaries',
    60,
    335
  );

  // Right Snapshot Card
  doc.setFillColor(242, 244, 246);
  doc.roundedRect(590, 70, 310, 400, 12, 12, 'F');

  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('#8.5B', 620, 125);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text('capital raise across three milestone-based phases', 620, 145);

  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('#12B', 620, 215);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text('pre-money valuation • equity / convertible note', 620, 235);

  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('#7.8B', 620, 305);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text('projected Year 3 revenue • 30% EBITDA margin', 620, 325);

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('Dr. Adeyemi Isaaq Alabi', 620, 390);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text('Founder & Chief Executive Officer\nRC No: 8490484\nIlorin, Kwara State, Nigeria', 620, 408);

  doc.setFontSize(8.5);
  doc.setTextColor(120, 130, 120);
  doc.text('EHMCARE CLINIC LTD — Healing Beyond Boundaries', 60, 515);
  doc.text('01', 900, 515, { align: 'right' });

  // ==========================================
  // SLIDE 02: THE PROBLEM
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('The Problem', "Nigeria's healthcare system is fragmented", '02');

  doc.setFontSize(12.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text(
    'Patients are forced to choose between systems, travel for diagnostics, and pay out of pocket for\ncare that should be available at home.',
    60,
    110
  );

  const probCards = [
    { title: 'Fragmented care', desc: 'Traditional and conventional medicine operate in silos.' },
    { title: 'Limited diagnostics', desc: 'Advanced imaging is concentrated in Lagos and Abuja.' },
    { title: 'Unregulated supply', desc: '70–80% use traditional medicine, yet quality is inconsistent.' },
    { title: 'Medical brain drain', desc: '65%+ of qualified health workers are seeking opportunities abroad.' },
  ];

  probCards.forEach((c, i) => {
    const x = 60 + (i % 2) * 250;
    const y = 160 + Math.floor(i / 2) * 115;
    doc.setFillColor(242, 244, 246);
    doc.roundedRect(x, y, 235, 95, 8, 8, 'F');
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 76, 34);
    doc.text(c.title, x + 15, y + 28);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    doc.text(c.desc, x + 15, y + 50, { maxWidth: 205 });
  });

  // Right stat block
  doc.setFillColor(0, 76, 34);
  doc.roundedRect(580, 145, 320, 275, 12, 12, 'F');
  doc.setTextColor(172, 247, 112);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('$549M', 610, 195);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('healthcare spent abroad in the first 9 months of 2025', 610, 215);

  doc.setTextColor(172, 247, 112);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('<10%', 610, 265);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('of Nigerians enrolled in any health insurance scheme', 610, 285);

  doc.setTextColor(172, 247, 112);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('70–75%', 610, 335);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('of health expenditure financed out of pocket', 610, 355);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('The unlock: one institution that connects the full care journey—clinically, digitally, and operationally.', 60, 440);

  // ==========================================
  // SLIDE 03: THE SOLUTION
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('The Solution', 'One patient. One journey. One partner.', '03');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text(
    'EHMCARE is building Nigeria’s first fully integrated healthcare institution—bringing care,\ndiagnostics, education, technology, and product manufacturing under one corporate umbrella.',
    60,
    110
  );

  const solPillars = [
    { title: 'Clinical services', desc: 'TCCM—acupuncture, cupping, herbal remedies—alongside surgery, emergency care, and maternal health.' },
    { title: 'Diagnostics', desc: 'MRI, CT, X-ray, ultrasound, and full laboratory services—closer to underserved patients.' },
    { title: 'EHMcare Academy', desc: 'Diploma and certificate programs across TCCM, diagnostics, and healthcare technology.' },
    { title: 'EHConnect', desc: 'EHR, telemedicine, AI health assistant, AR diagnostic tools, and a patient mobile app.' },
    { title: 'Manufacturing', desc: 'GMP-certified production of herbal medicines, supplements, and natural health products.' },
  ];

  solPillars.forEach((p, idx) => {
    const x = 60 + idx * 168;
    doc.setFillColor(242, 244, 246);
    doc.roundedRect(x, 155, 155, 260, 10, 10, 'F');
    doc.setFillColor(0, 76, 34);
    doc.rect(x, 155, 155, 6, 'F');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 76, 34);
    doc.text(p.title, x + 12, 190, { maxWidth: 130 });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    doc.text(p.desc, x + 12, 225, { maxWidth: 130 });
  });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(53, 107, 0);
  doc.text('Integrated by design. Regulated for trust. Scalable across Nigeria.', 60, 450);

  // ==========================================
  // SLIDE 04: MARKET OPPORTUNITY
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('Market Opportunity', 'A multi-billion-dollar market is converging', '04');

  // Left Stats Grid
  const mktStats = [
    { label: 'Nigeria healthcare market, 2025', val: '$32B', sub: '9.6% CAGR' },
    { label: 'Nigeria digital health by 2032', val: '$4.64B', sub: '17.49% CAGR' },
    { label: 'Global herbal market (2023->2033)', val: '$199 -> 418B', sub: '7.7% CAGR' },
    { label: 'Nigeria telemedicine adoption', val: '$29 -> 110M', sub: '2025->2032 • 21% CAGR' },
    { label: 'Estimated Nigerian traditional-medicine users', val: '166–190M', sub: '70–80% of total population' },
  ];

  mktStats.forEach((s, i) => {
    const x = 60 + (i % 3) * 170;
    const y = 140 + Math.floor(i / 3) * 110;
    doc.setFillColor(242, 244, 246);
    doc.roundedRect(x, y, 155, 90, 8, 8, 'F');
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 76, 34);
    doc.text(s.val, x + 12, y + 30);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(53, 107, 0);
    doc.text(s.sub, x + 12, y + 50);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    doc.text(s.label, x + 12, y + 68, { maxWidth: 130 });
  });

  // Right callout banner
  doc.setFillColor(0, 76, 34);
  doc.roundedRect(590, 140, 310, 240, 12, 12, 'F');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(166, 244, 181);
  doc.text('One ecosystem. Multiple growth curves.', 615, 175);
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(172, 247, 112);
  doc.text('$5B+', 615, 225);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(
    'Combined addressable opportunity across integrated\nhealthcare, diagnostics, education, and digital health in\nNigeria alone.\n\nNigeria’s 237.5M population creates an urgent quality and\nclinical trust gap.',
    615,
    255
  );

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text(
    'Strategic insight: Nigeria has over 10,000 medicinal plant species; professionalisation and regulation can convert usage into trusted supply.',
    60,
    440
  );

  // ==========================================
  // SLIDE 05: TIMING
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('Timing', 'Why now: the window is open', '05');

  doc.setFontSize(12.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text(
    'Three forces are converging to make integrated healthcare the next defining opportunity in Nigeria.',
    60,
    110
  );

  const forces = [
    {
      num: '01 / POLICY',
      title: 'Traditional medicine is\nmoving toward standards',
      body: 'Federal certification and standardisation efforts—supported by WHO priorities—are creating an investable path for professionalised TCCM.',
    },
    {
      num: '02 / DIGITAL',
      title: 'Health access is becoming\nplatform-enabled',
      body: 'Nigeria’s digital health market is projected to grow from $1.5B in 2025 to $4.636B by 2032, with users scaling from 31.8M to 86.7M.',
    },
    {
      num: '03 / DEMAND',
      title: 'Patients are looking for care\ncloser to home',
      body: 'Medical-tourism dynamics and rising domestic capability point to a returning demand for trusted, comprehensive local care.',
    },
  ];

  forces.forEach((f, i) => {
    const x = 60 + i * 285;
    doc.setFillColor(242, 244, 246);
    doc.roundedRect(x, 150, 270, 220, 10, 10, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(53, 107, 0);
    doc.text(f.num, x + 20, 180);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 76, 34);
    doc.text(f.title, x + 20, 210);

    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    doc.text(f.body, x + 20, 260, { maxWidth: 230 });
  });

  doc.setFillColor(0, 76, 34);
  doc.roundedRect(60, 395, 840, 50, 8, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(172, 247, 112);
  doc.text('The first mover to integrate care, diagnostics, technology, and training can define the category.', 80, 425);

  // ==========================================
  // SLIDE 06: BUSINESS MODEL
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('Business Model', 'Diversified revenue, reinforced by cross-referrals', '06');

  // Revenue Streams Table
  const revStreams = [
    ['Clinical services', 'Consultations, treatments, procedures', '60–70%'],
    ['Diagnostics', 'MRI, CT, X-ray, laboratory', '50–65%'],
    ['Academy', 'Diploma and certificate programs', '70–80%'],
    ['EHConnect', 'EHR, telemedicine, software subscriptions', '80–90%'],
    ['Products', 'Herbal medicines, supplements, oils', '40–50%'],
  ];

  const tX = 60;
  const tY = 120;
  doc.setFillColor(0, 76, 34);
  doc.rect(tX, tY, 500, 24, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Revenue stream', tX + 15, tY + 16);
  doc.text('What it includes', tX + 160, tY + 16);
  doc.text('Margin', tX + 430, tY + 16);

  revStreams.forEach((r, idx) => {
    const y = tY + 24 + idx * 30;
    doc.setFillColor(idx % 2 === 0 ? 247 : 255, idx % 2 === 0 ? 249 : 255, idx % 2 === 0 ? 251 : 255);
    doc.rect(tX, y, 500, 30, 'F');
    doc.setTextColor(0, 76, 34);
    doc.setFont('helvetica', 'bold');
    doc.text(r[0], tX + 15, y + 18);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    doc.text(r[1], tX + 160, y + 18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(53, 107, 0);
    doc.text(r[2], tX + 430, y + 18);
  });

  // Right Side: Year 2 Unit Economics
  doc.setFillColor(242, 244, 246);
  doc.roundedRect(590, 120, 310, 270, 12, 12, 'F');
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('Year 2 unit economics', 615, 150);

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('#80K', 615, 190);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text('average revenue per patient', 615, 205);

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('#8K', 615, 240);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text('customer acquisition cost', 615, 255);

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('#320K', 615, 290);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text('lifetime value (40:1 LTV:CAC ratio)', 615, 305);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(53, 107, 0);
  doc.text('Flywheel: care creates referrals into diagnostics; academy graduates become future practitioners.', 60, 420, { maxWidth: 840 });

  // ==========================================
  // SLIDE 07: TRACTION & MILESTONES
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('Traction & Milestones', 'Early traction. Clear milestones.', '07');

  const tractStats = [
    { val: '#9M', sub: 'monthly revenue reported' },
    { val: '17/mo', sub: 'patients served currently' },
    { val: '19', sub: 'EHMcare Academy enrollments' },
    { val: 'CAC', sub: 'registered objectives cover full ecosystem' },
  ];

  tractStats.forEach((ts, idx) => {
    const x = 60 + idx * 210;
    doc.setFillColor(242, 244, 246);
    doc.roundedRect(x, 115, 195, 80, 8, 8, 'F');
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 76, 34);
    doc.text(ts.val, x + 15, 150);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    doc.text(ts.sub, x + 15, 175, { maxWidth: 165 });
  });

  // Post-funding roadmap 3 columns
  const roadmap = [
    {
      period: 'MONTHS 1–6',
      title: 'Foundation',
      items: ['Diagnostic centre: X-ray, ultrasound, lab', 'Academy accreditation', 'EHConnect MVP launch'],
    },
    {
      period: 'MONTHS 7–18',
      title: 'Expansion',
      items: ['Acquire MRI & CT via flexible plans', 'Open conventional medicine facility', 'Begin GMP manufacturing'],
    },
    {
      period: 'MONTHS 19–36',
      title: 'Scale',
      items: ['Full ecosystem operational', 'National expansion', 'Profitability achieved'],
    },
  ];

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('Post-funding roadmap', 60, 230);

  roadmap.forEach((rm, i) => {
    const x = 60 + i * 285;
    doc.setFillColor(247, 249, 251);
    doc.roundedRect(x, 250, 270, 160, 8, 8, 'F');
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(53, 107, 0);
    doc.text(rm.period, x + 15, 275);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 76, 34);
    doc.text(rm.title, x + 15, 300);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    rm.items.forEach((it, idx) => {
      doc.text(`• ${it}`, x + 15, 330 + idx * 20, { maxWidth: 240 });
    });
  });

  doc.setFontSize(9.5);
  doc.setTextColor(64, 73, 64);
  doc.text('Progress to date: incorporated with CAC, clinical operations established, multidisciplinary leadership assembled.', 60, 445);

  // ==========================================
  // SLIDE 08: LEADERSHIP
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('Leadership', 'EHMCARE Core Team', '08');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text(
    'The multidisciplinary team building an integrated healthcare institution across medicine, diagnostics,\ntechnology, finance, law, operations, manufacturing, and academic delivery.',
    60,
    105
  );

  const allLeaders = [
    { name: 'Dr. Adeyemi Isaaq Alabi', role: 'Founder & CEO', domain: 'Integrated Medicine, TCCM', phone: '+234 905 975 8574' },
    { name: 'Engr. Abdullahi Mahmud', role: 'Chief Technology Officer', domain: 'AI, AR, software, research', phone: '+234 802 627 5433 (WA)' },
    { name: 'Mr. Abdurrozaq Taofeeq', role: 'Chief Medical Officer', domain: 'Conventional Medicine', phone: '+234 706 636 9598' },
    { name: 'Mr. Murtadho Ayinla', role: 'Chief Financial Officer', domain: 'Finance, investment', phone: '+234 901 518 4004' },
    { name: 'Mr. Jamiu Rasheed Odofin', role: 'Chief Operating Officer', domain: 'Hospital operations, supply chain', phone: '+234 907 692 9317' },
    { name: 'Dr. Nurudeen Ibrahim', role: 'Head of TCCM', domain: 'Acupuncture, herbal medicine', phone: '+234 814 184 3865' },
    { name: 'Mr. Pele Owo Surarat', role: 'Head of Manufacturing', domain: 'GMP production, logistics', phone: '+234 901 518 4004' },
    { name: 'Dr. Jamiu Ogirima', role: 'Research Lead', domain: 'Validation, product development', phone: '+234 901 518 4004' },
    { name: 'Mrs. Hawau Adejoke', role: 'Product Manager & Head of Nurses', domain: 'Clinical operations', phone: '+234 806 196 6567 (WA)' },
    { name: 'Mr. Kasim AbdulWahiid', role: 'Lead Legal Advisor', domain: 'Regulations, compliance', phone: '+234 706 666 6581' },
    { name: 'Mr. Abdulsalaam A. Adesina', role: 'Head of Diagnostics', domain: 'MRI, CT, lab management', phone: '+234 901 518 4004' },
    { name: 'Mr. Yinusa A. Habeebullah', role: 'Head of Academy', domain: 'Curriculum, academic affairs', phone: '+234 813 893 8215' },
  ];

  allLeaders.forEach((l, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 60 + col * 285;
    const y = 140 + row * 75;

    doc.setFillColor(242, 244, 246);
    doc.roundedRect(x, y, 270, 65, 8, 8, 'F');
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 76, 34);
    doc.text(l.name, x + 12, y + 20);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(53, 107, 0);
    doc.text(l.role, x + 12, y + 34);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    doc.text(l.domain, x + 12, y + 46);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 76, 34);
    doc.text(`Direct: ${l.phone}`, x + 12, y + 58);
  });

  // ==========================================
  // SLIDE 09: FINANCIALS & PROJECTIONS
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('Financials & Projections', '3-year annual projections — management case', '09');

  const finTable = [
    ['Revenue', '#850M', '#2.50B', '#6.00B'],
    ['Cost of Sales', '#297.5M', '#875M', '#2.10B'],
    ['Gross Profit', '#552.5M', '#1.625B', '#3.90B'],
    ['Staff Costs', '#420M', '#900M', '#1.50B'],
    ['Rent & Utilities', '#120M', '#180M', '#220M'],
    ['Marketing', '#68M', '#200M', '#480M'],
    ['Administrative', '#135M', '#220M', '#300M'],
    ['Depreciation', '#36M', '#60M', '#80M'],
    ['Total Expenses', '#779M', '#1.56B', '#2.58B'],
    ['EBITDA', '#73.5M', '#665M', '#2.02B'],
    ['PBT', '#37.5M', '#605M', '#1.94B'],
    ['PAT', '#37.5M', '#423.5M', '#1.358B'],
    ['EBITDA Margin', '8.6%', '26.6%', '33.7%'],
  ];

  const fyX = 60;
  const fyY = 110;
  doc.setFillColor(0, 76, 34);
  doc.rect(fyX, fyY, 520, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Metric', fyX + 10, fyY + 14);
  doc.text('Year 1', fyX + 210, fyY + 14);
  doc.text('Year 2', fyX + 310, fyY + 14);
  doc.text('Year 3', fyX + 420, fyY + 14);

  finTable.forEach((row, idx) => {
    const y = fyY + 20 + idx * 21;
    doc.setFillColor(idx % 2 === 0 ? 247 : 255, idx % 2 === 0 ? 249 : 255, idx % 2 === 0 ? 251 : 255);
    doc.rect(fyX, y, 520, 21, 'F');
    doc.setTextColor(0, 76, 34);
    doc.setFont('helvetica', idx >= 9 ? 'bold' : 'normal');
    doc.setFontSize(8.5);
    doc.text(row[0], fyX + 10, y + 14);
    doc.text(row[1], fyX + 210, y + 14);
    doc.text(row[2], fyX + 310, y + 14);
    doc.text(row[3], fyX + 420, y + 14);
  });

  // Right callout: Key Assumptions
  doc.setFillColor(242, 244, 246);
  doc.roundedRect(610, 110, 290, 290, 10, 10, 'F');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('Key Assumptions & Milestones', 625, 135);

  const assumptions = [
    '• Break-even: Month 20',
    '• TCCM Growth: 4% monthly; 60% annual',
    '• Diagnostics: #20M/month by Month 18',
    '• Conventional Med: #12M/month by Month 18',
    '• Academy: 2 cohorts/year (#12.5M/cohort)',
    '• EHConnect: #4M/month by Month 18',
    '• Manufacturing: #5.8M/month by Month 18',
    '• Staff Costs: +8% monthly to M12, +5% thereafter',
    '• Tax rate applied at 30% on positive PBT',
  ];

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  assumptions.forEach((a, i) => {
    doc.text(a, 625, 160 + i * 25);
  });

  // ==========================================
  // SLIDE 10: THE ASK & TERMS
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('The Ask', 'Investment opportunity — phased funding approach', '10');

  // Left Raise Card
  doc.setFillColor(0, 76, 34);
  doc.roundedRect(60, 115, 380, 310, 12, 12, 'F');
  doc.setTextColor(172, 247, 112);
  doc.setFontSize(38);
  doc.setFont('helvetica', 'bold');
  doc.text('#8.5B', 90, 170);

  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.text('($6.0M) to execute the integrated healthcare vision', 90, 195);

  doc.setFontSize(11);
  doc.text('• #2.1B ($1.5M)  Phase 1 Foundation', 90, 235);
  doc.setFontSize(9.5);
  doc.setTextColor(166, 244, 181);
  doc.text('  Diagnostics, EHConnect MVP, Academy accreditation', 105, 250);

  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('• #3.5B ($2.5M)  Phase 2 Expansion', 90, 285);
  doc.setFontSize(9.5);
  doc.setTextColor(166, 244, 181);
  doc.text('  MRI & CT, conventional medicine, manufacturing scale-up', 105, 300);

  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('• #2.9B ($2.0M)  Phase 3 Scale', 90, 335);
  doc.setFontSize(9.5);
  doc.setTextColor(166, 244, 181);
  doc.text('  National expansion, full platform deployment, working capital', 105, 350);

  // Right Terms Table
  const askTerms = [
    ['Instrument', 'Equity / Convertible Note'],
    ['Pre-money valuation', '#12B ($8.5M)'],
    ['Post-money valuation', '#20.5B ($14.5M)'],
    ['Equity offered', '41.5%'],
    ['Minimum investment', '#50M'],
    ['Board seat', 'Available > #500M'],
    ['Pro-rata rights', 'Yes'],
    ['Liquidation preference', '1x non-participating'],
  ];

  const atX = 470;
  const atY = 115;
  askTerms.forEach((row, idx) => {
    const y = atY + idx * 36;
    doc.setFillColor(idx % 2 === 0 ? 242 : 255, idx % 2 === 0 ? 244 : 255, idx % 2 === 0 ? 246 : 255);
    doc.rect(atX, y, 430, 32, 'F');
    doc.setTextColor(0, 76, 34);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(row[0], atX + 15, y + 20);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    doc.text(row[1], atX + 210, y + 20);
  });

  doc.setFontSize(9.5);
  doc.setTextColor(53, 107, 0);
  doc.text('Why invest now: first-mover advantage, $5B+ addressable market, policy tailwinds, diversified revenue.', 60, 445);

  // ==========================================
  // SLIDE 11: USE OF FUNDS
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('Use of Funds', 'Capital deployed against measurable milestones', '11');

  const fundAllocations = [
    { cat: 'Diagnostic centre', pct: '35%', amt: '#2.98B', items: 'MRI, CT, X-ray, ultrasound, lab, NNRA/RRBN licensing' },
    { cat: 'Conventional medicine', pct: '25%', amt: '#2.13B', items: 'Facility, equipment, pharmacy, emergency, staffing' },
    { cat: 'EHMcare Academy', pct: '15%', amt: '#1.28B', items: 'NMCN/NUC accreditation, classrooms, simulation labs' },
    { cat: 'Manufacturing unit', pct: '12%', amt: '#1.02B', items: 'GMP facility, equipment, NAFDAC registrations' },
    { cat: 'EHConnect', pct: '8%', amt: '#680M', items: 'Software, AI/AR, cloud, mobile app' },
    { cat: 'Working capital', pct: '5%', amt: '#425M', items: '12-month runway, salaries, marketing' },
  ];

  const uX = 60;
  const uY = 115;
  doc.setFillColor(0, 76, 34);
  doc.rect(uX, uY, 480, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Category', uX + 10, uY + 15);
  doc.text('%', uX + 150, uY + 15);
  doc.text('Amount', uX + 200, uY + 15);
  doc.text('Key items', uX + 270, uY + 15);

  fundAllocations.forEach((f, idx) => {
    const y = uY + 22 + idx * 30;
    doc.setFillColor(idx % 2 === 0 ? 247 : 255, idx % 2 === 0 ? 249 : 255, idx % 2 === 0 ? 251 : 255);
    doc.rect(uX, y, 480, 30, 'F');
    doc.setTextColor(0, 76, 34);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(f.cat, uX + 10, y + 18);
    doc.text(f.pct, uX + 150, y + 18);
    doc.text(f.amt, uX + 200, y + 18);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    doc.setFontSize(8.5);
    doc.text(f.items, uX + 270, y + 18, { maxWidth: 200 });
  });

  // Right milestone deployment column
  doc.setFillColor(242, 244, 246);
  doc.roundedRect(570, 115, 330, 280, 10, 10, 'F');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('Milestone-based deployment', 590, 145);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(53, 107, 0);
  doc.text('MONTHS 1–6 / FOUNDATION', 590, 175);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text('Open the front door: Diagnostic centre (X-ray, ultrasound, lab) operational; Academy accreditation; EHConnect MVP.', 590, 192, { maxWidth: 290 });

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(53, 107, 0);
  doc.text('MONTHS 7–18 / EXPANSION', 590, 240);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text('Deepen the stack: MRI & CT acquired; Conventional Medicine facility opened; GMP manufacturing begins.', 590, 257, { maxWidth: 290 });

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(53, 107, 0);
  doc.text('MONTHS 19–36 / SCALE', 590, 305);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(64, 73, 64);
  doc.text('Build the network: Full ecosystem operational; national expansion; profitability achieved.', 590, 322, { maxWidth: 290 });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(0, 76, 34);
  doc.text('Equipment-financing advantage: Cassona Global Imaging enables CT/MRI with 20% upfront and 24-month terms.', 60, 440);

  // ==========================================
  // SLIDE 12: LIQUIDITY & CONCLUSION
  // ==========================================
  doc.addPage([960, 540], 'landscape');
  applyHeader('Build Together', 'Build the future of healthcare together', '12');

  const liquidityPaths = [
    { title: 'Acquisition', desc: 'Healthcare groups, hospital chains, pharmaceutical companies; illustrative valuation #25B–#40B.' },
    { title: 'IPO', desc: 'Nigerian Exchange target over a 5–7 year horizon; illustrative valuation #50B+.' },
    { title: 'Strategic buyout', desc: 'International providers and impact funds; illustrative valuation #30B–#50B.' },
    { title: 'Secondary sale', desc: 'PE firms and family offices; projected 3–5x return over a 5–7 year horizon.' },
  ];

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 76, 34);
  doc.text('Multiple paths to liquidity (3–5x projected investor return framing)', 60, 120);

  liquidityPaths.forEach((lp, idx) => {
    const y = 145 + idx * 55;
    doc.setFillColor(242, 244, 246);
    doc.roundedRect(60, y, 480, 48, 8, 8, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 76, 34);
    doc.text(lp.title, 75, y + 20);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(64, 73, 64);
    doc.text(lp.desc, 75, y + 36, { maxWidth: 450 });
  });

  // Right Side Contact Box
  doc.setFillColor(0, 76, 34);
  doc.roundedRect(570, 120, 330, 310, 12, 12, 'F');
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(172, 247, 112);
  doc.text("Let's build the category", 595, 160);

  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('Dr. Adeyemi Isaaq Alabi', 595, 195);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(166, 244, 181);
  doc.text('Founder & Chief Executive Officer\nEHMCARE CLINIC LTD (RC No: 8490484)', 595, 215);

  doc.setFontSize(10);
  doc.setTextColor(242, 244, 246);
  doc.text(
    'Campus Location:\n4 Sofoluwe Street, Off Lajorin Road,\nSabo-Oke, Ilorin, Kwara State, Nigeria\n\nExecutive Hotline:\n09015184004 • 09059758574\n\nOfficial Investor Correspondence:\nehmcaree@gmail.com',
    595,
    255
  );

  doc.setFontSize(8.5);
  doc.setTextColor(120, 130, 120);
  doc.text('Confidentiality notice: Proprietary and confidential information intended solely for qualified investors. © 2026 EHMCARE CLINIC LTD.', 60, 440);

  return doc;
}

export function generatePitchDeckPdf(lead?: InvestorLeadData) {
  const doc = buildInvestorPitchDeck(lead);
  doc.save('EHMCARE_Investor_Presentation_2026.pdf');
}
