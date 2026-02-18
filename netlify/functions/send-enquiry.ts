import nodemailer from 'nodemailer';

interface EnquiryRequest {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  source: 'contact' | 'popup' | 'services';
  intent?: 'rfq' | 'enquiry';
}

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
}

export const handler = async (event: NetlifyEvent) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ok: true }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data: EnquiryRequest = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!data.fullName || !data.email) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Full name and email are required' }),
      };
    }

    // Get environment variables - use provided credentials as fallback
    const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER || 'sales@isparkstech.com';
    const smtpPassword = process.env.SMTP_PASSWORD || 'iSparks_tech@31';
    const recipientEmail = process.env.EMAIL_ADDRESS || 'sales@isparkstech.com';

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Verify SMTP connection early to provide clearer errors
    try {
      await transporter.verify();
    } catch (verifyError: unknown) {
      const errorMessage = verifyError instanceof Error ? verifyError.message : String(verifyError);
      console.error('SMTP verify failed:', errorMessage);
      return {
        statusCode: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'SMTP connection failed: ' + errorMessage }),
      };
    }

    const sourceLabel = 
      data.source === 'popup' ? 'Popup Enquiry Form' :
      data.source === 'services' ? 'Services Modal' :
      'Contact Section Form';

    // Email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Enquiry from iSparks Website</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 14px;">Source: ${sourceLabel}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 25px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; width: 140px;">Full Name:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Email:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                <a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a>
              </td>
            </tr>
            ${
              data.phone
                ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Phone:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                <a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a>
              </td>
            </tr>
            `
                : ''
            }
            ${
              data.company
                ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Company:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.company}</td>
            </tr>
            `
                : ''
            }
            ${
              data.service
                ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Service Interested:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                <span style="background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${data.service}</span>
              </td>
            </tr>
            `
                : ''
            }
            ${
              data.intent
                ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Intent:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${data.intent.toUpperCase()}</span>
              </td>
            </tr>
            `
                : ''
            }
          </table>
          
          ${
            data.message
              ? `
          <div style="margin-top: 20px;">
            <p style="font-weight: bold; color: #475569; margin-bottom: 10px;">Message:</p>
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; color: #1e293b; line-height: 1.6;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          `
              : ''
          }
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
          This email was sent from the iSparks Tech website enquiry form.
        </p>
      </div>
    `;

    // Send email
    try {
      const info = await transporter.sendMail({
        from: `"iSparks Website" <${smtpUser}>`,
        to: recipientEmail,
        subject: `New Enquiry: ${data.fullName} - ${data.service || 'General Inquiry'}`,
        html: htmlContent,
        replyTo: data.email,
      });

      console.log('Email sent successfully:', info.messageId);

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ success: true, messageId: info.messageId }),
      };
    } catch (sendError: unknown) {
      const errorMessage = sendError instanceof Error ? sendError.message : String(sendError);
      console.error('Error in sendMail:', errorMessage);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Failed to send email: ' + errorMessage }),
      };
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send enquiry';
    console.error('Error sending enquiry email:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};
