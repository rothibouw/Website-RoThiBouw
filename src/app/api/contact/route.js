import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'info@rothibouw.nl';
const FROM_EMAIL = 'noreply@rothibouw.nl';

/***************************  API - CONTACT FORM  ***************************/

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const language = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || 'nl';

  const messages = {
    en: {
      required: 'Name, email, and message are required',
      invalidEmail: 'Please enter a valid email address',
      success: "Thank you for your message! We'll get back to you soon.",
      error: 'Failed to send message. Please try again later.'
    },
    nl: {
      required: 'Naam, e-mail en bericht zijn verplicht',
      invalidEmail: 'Voer een geldig e-mailadres in',
      success: 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.',
      error: 'Kan bericht niet verzenden. Probeer het later opnieuw.'
    }
  };

  const msg = messages[language] || messages.nl;

  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const company = formData.get('company');
    const phone = formData.get('phone');
    const file = formData.get('file'); // Optional attachment

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: msg.required }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: msg.invalidEmail }, { status: 400 });
    }

    // Handle optional attachment
    let attachments = [];
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);
      attachments = [
        {
          filename: file.name,
          content: fileBuffer
        }
      ];
    }

    const emailSubject = subject?.trim() ? `Contactformulier: ${subject.trim()}` : 'Contactformulier: Nieuw bericht';

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: email.trim().toLowerCase(),
      subject: emailSubject,
      attachments,
      html: generateEmailHTML({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: emailSubject,
        message: message.trim(),
        company: company?.trim(),
        phone: phone?.trim(),
        timestamp: new Date().toISOString(),
        hasAttachment: attachments.length > 0,
        attachmentName: file?.name
      })
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: msg.success }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: msg.error }, { status: 500 });
  }
}

/***************************  EMAIL TEMPLATE  ***************************/

function generateEmailHTML({ name, email, company, phone, subject, message, timestamp, hasAttachment, attachmentName }) {
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
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #555; margin-bottom: 5px; display: block; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { background: #f8f9fa; padding: 12px; border-radius: 4px; border-left: 4px solid #c8a96e; }
        .message { background: #f8f9fa; padding: 20px; border-radius: 4px; border-left: 4px solid #c8a96e; white-space: pre-wrap; }
        .attachment { background: #f0f7ff; padding: 12px; border-radius: 4px; border-left: 4px solid #4a90d9; font-size: 14px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 13px; color: #666; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0; font-size: 22px;">Nieuw bericht — Rothibouw</h1>
          <p style="margin: 8px 0 0; opacity: 0.7; font-size: 14px;">Via het contactformulier op rothibouw.nl</p>
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
            company
              ? `
          <div class="field">
            <span class="label">Bedrijf</span>
            <div class="value">${company}</div>
          </div>`
              : ''
          }
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
            <span class="label">Bericht</span>
            <div class="message">${message}</div>
          </div>
          ${
            hasAttachment
              ? `
          <div class="field">
            <span class="label">Bijlage</span>
            <div class="attachment">📎 ${attachmentName}</div>
          </div>`
              : ''
          }
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
