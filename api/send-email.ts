// Vercel Serverless Function for /api/send-email
// Enables client-side apps on Vercel to dispatch emails through Resend API without exposing CORS issues

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const { apiKey, from, to, subject, html, text, fromName } = req.body || {};

    if (!apiKey) {
      return res.status(400).json({ success: false, error: 'No Resend API key provided.' });
    }

    const recipients = Array.isArray(to) ? to : [to];
    const cleanApiKey = String(apiKey).trim();
    const sender = from || `${fromName || 'EHMCare Integrated Healthcare'} <onboarding@resend.dev>`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cleanApiKey}`,
      },
      body: JSON.stringify({
        from: sender,
        to: recipients,
        subject,
        html,
        text,
      }),
    });

    const data = (await response.json()) as any;

    if (!response.ok) {
      // Check if Resend rejected because of sandbox restriction:
      const ownEmailMatch = data.message?.match(/own email address \(([^)]+)\)/i);
      if (ownEmailMatch && ownEmailMatch[1]) {
        const fallbackOwnerEmail = ownEmailMatch[1].trim();

        const retryResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cleanApiKey}`,
          },
          body: JSON.stringify({
            from: sender,
            to: [fallbackOwnerEmail],
            subject: `[EHMCare Alert - For: ${recipients.join(', ')}] ${subject}`,
            html: `
              <div style="background:#eef7ee;border:1px solid #004c22;padding:12px;border-radius:8px;margin-bottom:16px;font-family:sans-serif;font-size:12.5px;color:#004c22;">
                <strong>Resend Sandbox Delivery Notice:</strong><br/>
                Intended for: <strong>${recipients.join(', ')}</strong>.<br/>
                Because your Resend key is in testing mode (using <em>onboarding@resend.dev</em>), Resend delivers alerts to your registered account (<strong>${fallbackOwnerEmail}</strong>).<br/>
                To send directly to custom addresses (ehmcaree@gmail.com & aalqutijifawy@gmail.com), verify your clinic domain at <a href="https://resend.com/domains" target="_blank">resend.com/domains</a>.
              </div>
              ${html}
            `,
            text: `[Forwarded for ${recipients.join(', ')}]\n\n${text}`,
          }),
        });

        const retryData = (await retryResponse.json()) as any;
        if (retryResponse.ok) {
          return res.status(200).json({
            success: true,
            id: retryData.id,
            deliveredTo: [fallbackOwnerEmail],
            intendedRecipients: recipients,
            sandboxNotice: `Delivered via Resend testing mode to your account (${fallbackOwnerEmail}). To send directly to ${recipients.join(', ')}, add a verified domain at resend.com/domains.`,
          });
        }
      }

      return res.status(200).json({
        success: false,
        error: data.message || 'Resend API returned an error',
        details: data,
      });
    }

    return res.status(200).json({
      success: true,
      id: data.id,
      message: `Delivered via Resend to ${recipients.join(', ')}`,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message || 'Serverless email dispatch error',
    });
  }
}
