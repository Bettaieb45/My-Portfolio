import { google } from 'googleapis';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  try {
    console.log('Starting token exchange...');
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      console.error('Authorization code is missing.');
      return new Response('Missing authorization code', { status: 400 });
    }

    console.log('Authorization code received:', code);

    // Initialize OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID || '',
      process.env.GMAIL_CLIENT_SECRET || '',
      process.env.GMAIL_REDIRECT_URI || '',
    );

    // Exchange code for tokens
    const tokenResponse = await oauth2Client.getToken(code);
    const tokens = tokenResponse.tokens;

    if (!tokens || !tokens.access_token) {
      console.error('Failed to retrieve access token.');
      return new Response('Failed to retrieve access token', { status: 500 });
    }

    oauth2Client.setCredentials(tokens);

    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token || 'No refresh token');

    return new Response(
      `Tokens received: Access Token: ${tokens.access_token}, Refresh Token: ${
        tokens.refresh_token || 'None'
      }`,
      { status: 200 },
    );
  } catch (error: unknown) {
    // Ensure the error is properly typed and logged
    if (error instanceof Error) {
      console.error('Error exchanging code for tokens:', error.message);
      return new Response(`Failed to exchange tokens: ${error.message}`, {
        status: 500,
      });
    }

    console.error('Unknown error occurred during token exchange.');
    return new Response('Failed to exchange tokens due to an unknown error.', {
      status: 500,
    });
  }
}
