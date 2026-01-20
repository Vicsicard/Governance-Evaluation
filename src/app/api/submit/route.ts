import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, useCase, regulatedIndustry, safetyRequirements, currentChallenges } = body;

    // Validate required fields
    if (!name || !email || !company || !role || !useCase) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'contact@getdigdev.com';
    const CONTACT_RECIPIENT = 'decisionloop@getdigdev.com';

    if (!SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Format the email content
    const emailContent = `
New Governance Testing Application

=== APPLICANT INFO ===
Name: ${name}
Email: ${email}
Company: ${company}
Role: ${role}
Regulated Industry: ${regulatedIndustry ? 'Yes' : 'No'}

=== USE CASE ===
${useCase}

=== SAFETY REQUIREMENTS ===
${safetyRequirements || 'Not provided'}

=== CURRENT CHALLENGES ===
${currentChallenges || 'Not provided'}

---
Submitted via DDR Governance Evaluation Landing Page
    `.trim();

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: CONTACT_RECIPIENT }],
            subject: `[DDR Governance Testing] Application from ${name} at ${company}`,
          },
        ],
        from: { email: SENDGRID_FROM_EMAIL },
        reply_to: { email: email, name: name },
        content: [
          {
            type: 'text/plain',
            value: emailContent,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SendGrid error:', errorText);
      return NextResponse.json(
        { error: 'Email send failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Submit error:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
