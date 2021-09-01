const oktaAuthConfig = {
  // Note: If your app is configured to use the Implicit flow
  // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
  // you will need to add `pkce: false`
  issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: window.location.origin + "/implicit/callback",
  pkce: true,
  responseType: ["code"],
};

const oktaSignInConfig = {
  baseUrl: `https://${process.env.REACT_APP_OKTA_DOMAIN}`,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: window.location.origin + "/implicit/callback",
  authParams: {
    // If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to uncomment the below line
    pkce: true,
  },
  // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
};

const isPortal = process.env.REACT_APP_IS_PORTAL


export { oktaAuthConfig, oktaSignInConfig, isPortal };
