export async function GET(req: NextRequest) {
  try {
    console.log('Starting token exchange...');
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      console.error('Authorization code is missing.');
      return new Response('Missing authorization code', { status: 400 });
    }

    console.log('Authorization code received:', code);

    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI,
    );

    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens received:', tokens);

    oauth2Client.setCredentials(tokens);

    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);

    return new Response(
      `Tokens received: Access Token: ${tokens.access_token}, Refresh Token: ${tokens.refresh_token}`,
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error exchanging code for tokens:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return new Response('Failed to exchange tokens', { status: 500 });
  }
}
