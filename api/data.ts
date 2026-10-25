// Vercel Serverless Function for /api/data
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Fallback initial data in serverless environment
  const fallbackDb = {
    submissions: [],
    subscribers: [
      {
        email: 'ehmcaree@gmail.com',
        fullName: 'EHMCare Official Desk',
        topic: 'all',
        subscribedAt: new Date().toISOString(),
        status: 'active',
      },
      {
        email: 'aalqutijifawy@gmail.com',
        fullName: 'Co-Admin Clinical Inquiries',
        topic: 'all',
        subscribedAt: new Date().toISOString(),
        status: 'active',
      },
      {
        email: 'devabdultechnologies@gmail.com',
        fullName: 'System Engineering',
        topic: 'all',
        subscribedAt: new Date().toISOString(),
        status: 'active',
      },
    ],
    broadcasts: [],
    stories: [],
    footage: [],
    emailConfig: {
      provider: 'resend',
      resendApiKey: '',
      web3FormsKey: '',
      adminRecipients: ['ehmcaree@gmail.com', 'aalqutijifawy@gmail.com'],
      autoBroadcastOnNewStory: true,
    },
  };

  return res.status(200).json({ success: true, data: fallbackDb });
}
