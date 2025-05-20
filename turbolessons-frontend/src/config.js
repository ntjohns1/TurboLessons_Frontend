const CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
const ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `${window.location.origin}/login/callback`;
const VITE_STRIPE_PUBLISHABLE_KEY = process.env.VITE_STRIPE_PUBLISHABLE_KEY
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080' 
  : 'https://www.turbolessons.com';

// eslint-disable-next-line
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    stripeApiKey: VITE_STRIPE_PUBLISHABLE_KEY,

  },
  resourceServer: {
    eventsUrl: `${API_BASE_URL}/api/lessons`,
    userAdminUrl: `${API_BASE_URL}/api/users`,
    messagesUrl: `${API_BASE_URL}/api/messages`,
    videoUrl: `${API_BASE_URL}/api/video`,
    socketUri: `${API_BASE_URL.replace('http', 'ws').replace('https', 'wss')}/ws/messages?userId=`
  },
};
