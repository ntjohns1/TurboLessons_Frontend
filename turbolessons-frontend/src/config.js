const CLIENT_ID = process.env.CLIENT_ID || 'turbolessons-spa';
// ISSUER is the Keycloak realm issuer, e.g. https://auth.nelsonjohns.com/realms/turbolessons[-qac]
const ISSUER = process.env.ISSUER || 'https://auth.nelsonjohns.com/realms/turbolessons';
const REDIRECT_URI = `${window.location.origin}/login/callback`;
const VITE_STRIPE_PUBLISHABLE_KEY = process.env.VITE_STRIPE_PUBLISHABLE_KEY;
// API is reached same-origin: the Vite dev proxy forwards /api + /ws to the
// configured backend (qac by default) in `npm run start`, and nginx proxies
// them in the built container. Keep paths relative so neither env hardcodes a host.
const WS_BASE_URL = window.location.origin.replace(/^http/, 'ws');

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
    eventsUrl: `/api/lessons`,
    userAdminUrl: `/api/users`,
    messagesUrl: `/api/messages`,
    videoUrl: `/api/video`,
    socketUri: `${WS_BASE_URL}/ws/messages?userId=`
  },
};
