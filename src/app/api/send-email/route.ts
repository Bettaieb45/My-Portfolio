import { google } from 'googleapis';

export async function POST(req: Request) {
  try {
    // Parse the incoming request payload
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response('Invalid payload: Missing fields', { status: 400 });
    }

    // Initialize the OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI,
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // HTML content for the website owner's email
    const ownerEmailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #f9f9f9;
    }
    h1 {
      font-size: 20px;
      color: #444;
    }
    p {
      margin: 10px 0;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>New Contact Form Submission</h1>
    <p>You have received a new message from your website contact form:</p>
    <p><span class="label">Name:</span> ${name}</p>
    <p><span class="label">Email:</span> ${email}</p>
    <p><span class="label">Message:</span></p>
    <p>${message}</p>
    <p style="margin-top: 20px; font-size: 12px; color: #999;">
      This is an automated email sent by your website.
    </p>
  </div>
</body>
</html>
    `;

    const ownerEncodedMessage = Buffer.from(
      [
        `To: mohamedazizbettaieb6@gmail.com`,
        `Subject: New Contact Form Submission from ${name}`,
        `Content-Type: text/html; charset=utf-8`,
        ``,
        ownerEmailContent,
      ].join('\r\n'),
    )
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send email to the website owner
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: ownerEncodedMessage,
      },
    });

    // HTML content for the confirmation email to the form submitter
    const confirmationEmailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #f9f9f9;
    }
    h1 {
      font-size: 20px;
      color: #444;
    }
    p {
      margin: 10px 0;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Thank you, ${name}!</h1>
    <p>Hi ${name},</p>
    <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
    <p>If you have any urgent questions, feel free to send me an email on mohamedazizbettaieb6@gmail.com</p>
    <p>Best regards,<br>Mohamed Aziz Bettaieb</p>
    <p class="footer">
      This is an automated confirmation email. Please do not reply directly to this email.
    </p>
  </div>
</body>
</html>
    `;

    const confirmationEncodedMessage = Buffer.from(
      [
        `To: ${email}`,
        `Subject: Thank you for contacting me, ${name}!`,
        `Content-Type: text/html; charset=utf-8`,
        ``,
        confirmationEmailContent,
      ].join('\r\n'),
    )
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send confirmation email to the form submitter
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: confirmationEncodedMessage,
      },
    });

    return new Response('Emails sent successfully', { status: 200 });
  } catch (error: any) {
    console.error(
      'Error sending email:',
      error.response?.data || error.message,
    );
    return new Response('Failed to send email', { status: 500 });
  }
}
