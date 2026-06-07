const CLIENT_ID = process.env.CLIENT_ID || 'turbolessons-spa';
// ISSUER is the Keycloak realm issuer, e.g. https://auth.nelsonjohns.com/realms/turbolessons[-qac]
const ISSUER = process.env.ISSUER || 'https://auth.nelsonjohns.com/realms/turbolessons';
const REDIRECT_URI = `${window.location.origin}/login/callback`;
const VITE_STRIPE_PUBLISHABLE_KEY = process.env.VITE_STRIPE_PUBLISHABLE_KEY;
const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : 'https://www.turbolessons.com';

// eslint-disable-next-line
export default {
  // Config for @ntjohns1/react-oidc <AuthProvider>
  oidc: {
    authority: ISSUER,
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: window.location.origin,
    scope: 'openid profile email',
    rolesClaim: 'groups',
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
