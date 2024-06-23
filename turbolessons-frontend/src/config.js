const CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
const ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `${window.location.origin}/login/callback`;

// eslint-disable-next-line
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    eventsUrl: 'https://www.turbolessons.com/api/lessons',
    userAdminUrl: 'https://www.turbolessons.com/api/users',
    messagesUrl: 'https://www.turbolessons.com/api/messages',
    videoUrl: 'https://www.turbolessons.com/api/video',
    paymentsUrl: 'https://www.turbolessons.com/api/payments',
    socketUri: 'wss://www.turbolessons.com/ws/messages?userId='
  },
};
