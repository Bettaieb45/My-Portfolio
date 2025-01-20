import { google } from 'googleapis';

export async function POST(req: Request): Promise<Response> {
  try {
    // Parse the incoming request payload with explicit typing
    const {
      name,
      email,
      message,
    }: { name: string; email: string; message: string } = await req.json();

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

    // Owner's email content
    const ownerEmailContent = `
      <html>
        <body>
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </body>
      </html>
    `;

    const ownerEncodedMessage = Buffer.from(
      `To: mohamedazizbettaieb6@gmail.com\nSubject: New Contact Form Submission from ${name}\nContent-Type: text/html\n\n${ownerEmailContent}`,
    )
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: ownerEncodedMessage },
    });

    // Confirmation email content
    const confirmationEmailContent = `
      <html>
        <body>
          <h1>Thank You!</h1>
          <p>Hello ${name},</p>
          <p>We have received your message. We will get back to you shortly.</p>
        </body>
      </html>
    `;

    const confirmationEncodedMessage = Buffer.from(
      `To: ${email}\nSubject: Thank you for contacting me\nContent-Type: text/html\n\n${confirmationEmailContent}`,
    )
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: confirmationEncodedMessage },
    });

    return new Response('Emails sent successfully', { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error sending email:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    return new Response('Failed to send email', { status: 500 });
  }
}
