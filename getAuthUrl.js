const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI,
);

const scopes = ['https://www.googleapis.com/auth/gmail.send'];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Request a refresh token
  prompt: 'consent', // Force Google to show the consent screen again
  scope: scopes,
});

console.log('Authorize this app by visiting this URL:', url);
