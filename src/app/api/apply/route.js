import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'info@rothibouw.nl';
const FROM_EMAIL = 'noreply@rothibouw.nl';

// Max CV file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed CV file types
const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

/***************************  API - JOB APPLICATION FORM  ***************************/

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const language = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || 'nl';

  const messages = {
    en: {
      required: 'Name, email, position, and motivation are required',
      invalidEmail: 'Please enter a valid email address',
      cvRequired: 'Please attach your CV (PDF or Word, max 10MB)',
      cvTooLarge: 'CV file is too large. Maximum size is 10MB',
      cvInvalidType: 'CV must be a PDF or Word document',
      success: 'Thank you for your application! We will review it and get back to you soon.',
      error: 'Failed to send application. Please try again later.'
    },
    nl: {
      required: 'Naam, e-mail, functie en motivatie zijn verplicht',
      invalidEmail: 'Voer een geldig e-mailadres in',
      cvRequired: 'Voeg je cv toe (PDF of Word, max 10MB)',
      cvTooLarge: 'CV-bestand is te groot. Maximale grootte is 10MB',
      cvInvalidType: 'CV moet een PDF of Word-document zijn',
      success: 'Bedankt voor je sollicitatie! We bekijken deze en nemen zo snel mogelijk contact met je op.',
      error: 'Kan sollicitatie niet verzenden. Probeer het later opnieuw.'
    }
  };

  const msg = messages[language] || messages.nl;

  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const position = formData.get('position'); // Which role they're applying for
    const motivation = formData.get('motivation');
    const cv = formData.get('cv'); // Required CV file

    // Basic validation
    if (!name || !email || !position || !motivation) {
      return NextResponse.json({ error: msg.required }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: msg.invalidEmail }, { status: 400 });
    }

    // CV validation — required for applications
    if (!cv || cv.size === 0) {
      return NextResponse.json({ error: msg.cvRequired }, { status: 400 });
    }

    if (cv.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: msg.cvTooLarge }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(cv.type)) {
      return NextResponse.json({ error: msg.cvInvalidType }, { status: 400 });
    }

    // Process CV attachment
    const arrayBuffer = await cv.arrayBuffer();
    const cvBuffer = Buffer.from(arrayBuffer);

    const emailSubject = `Sollicitatie: ${name.trim()} — ${position.trim()}`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: email.trim().toLowerCase(),
      subject: emailSubject,
      attachments: [
        {
          filename: cv.name,
          content: cvBuffer
        }
      ],
      html: generateEmailHTML({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim(),
        position: position.trim(),
        motivation: motivation.trim(),
        cvName: cv.name,
        timestamp: new Date().toISOString()
      })
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: msg.success }, { status: 200 });
  } catch (error) {
    console.error('Application form error:', error);
    return NextResponse.json({ error: msg.error }, { status: 500 });
  }
}

/***************************  EMAIL TEMPLATE  ***************************/

function generateEmailHTML({ name, email, phone, position, motivation, cvName, timestamp }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: #1a1a1a; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .badge { display: inline-block; background: #c8a96e; color: #1a1a1a; font-weight: 700; font-size: 13px; padding: 4px 12px; border-radius: 20px; margin-top: 10px; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #555; margin-bottom: 5px; display: block; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { background: #f8f9fa; padding: 12px; border-radius: 4px; border-left: 4px solid #c8a96e; }
        .motivation { background: #f8f9fa; padding: 20px; border-radius: 4px; border-left: 4px solid #c8a96e; white-space: pre-wrap; }
        .attachment { background: #f0f7ff; padding: 12px; border-radius: 4px; border-left: 4px solid #4a90d9; font-size: 14px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 13px; color: #666; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0; font-size: 22px;">Nieuwe sollicitatie — Rothibouw</h1>
          <p style="margin: 8px 0 0; opacity: 0.7; font-size: 14px;">Via het sollicitatieformulier op rothibouw.nl</p>
          <div class="badge">${position}</div>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Naam</span>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <span class="label">E-mailadres</span>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          ${
            phone
              ? `
          <div class="field">
            <span class="label">Telefoonnummer</span>
            <div class="value"><a href="tel:${phone}">${phone}</a></div>
          </div>`
              : ''
          }
          <div class="field">
            <span class="label">Motivatie</span>
            <div class="motivation">${motivation}</div>
          </div>
          <div class="field">
            <span class="label">CV</span>
            <div class="attachment">📎 ${cvName} (bijgevoegd)</div>
          </div>
        </div>
        <div class="footer">
          <p style="margin:0;">Ontvangen op ${new Date(timestamp).toLocaleString('nl-NL')}</p>
          <p style="margin: 4px 0 0;">Beantwoord dit bericht door rechtstreeks te reageren op dit e-mail.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
