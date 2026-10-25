import fs from 'fs';
import path from 'path';
import { buildInvestorPitchDeck } from '../src/utils/generatePitchDeckPdf.ts';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = buildInvestorPitchDeck({
  name: 'Institutional Investor',
  email: 'investors@ehmcare.com',
  phone: '0901 518 4004',
});

const pdfArrayBuffer = doc.output('arraybuffer');
const targetFile = path.join(publicDir, 'EHMCARE_Investor_Presentation_2026.pdf');
fs.writeFileSync(targetFile, Buffer.from(pdfArrayBuffer));
console.log(`Successfully generated public pitch deck at: ${targetFile}`);
