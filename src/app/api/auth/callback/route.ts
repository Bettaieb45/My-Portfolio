import { google } from 'googleapis';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return new Response('Missing authorization code', { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI,
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);

    // Save the refresh token securely (e.g., in your database or environment variables)
    return new Response(
      `Tokens received: Access Token: ${tokens.access_token}, Refresh Token: ${tokens.refresh_token}`,
      { status: 200 },
    );
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    return new Response('Failed to exchange tokens', { status: 500 });
  }
}
