'use client';

import auth0 from 'auth0-js';

type AuthorizeOptions = {
  connection?: string;
  prompt?: string;
  scope?: string;
  responseType?: string;
  redirectUri?: string;
  login_hint?: string;
};

interface Auth0MinimalProfile {
  name?: string;
  email?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
}

interface Auth0ClientApi {
  userInfo: (
    accessToken: string,
    cb: (err: Error | null, profile: Auth0MinimalProfile) => void
  ) => void;
}

interface Auth0WebAuthApi {
  authorize: (options: AuthorizeOptions) => void;
  parseHash: (
    opts: { hash: string },
    cb: (err: Error | null, result: { accessToken?: string } | null) => void
  ) => void;
  client: Auth0ClientApi;
}

function getConfig() {
  const redirect = typeof window !== 'undefined' ? `${window.location.href}` : 'http://localhost:3000/internships';
  // Hardcoded configuration per request
  return {
    domain: 'dev-zhc5vwsre4dm8vv5.us.auth0.com',
    clientID: 'csL4ISkZO1A0vZTgHP0ec1HzAEqmQ8L9',
    redirectUri: redirect,
    responseType: 'token id_token',
  };
}

const base = getConfig();
const WebAuthCtor = (auth0 as unknown as {
  WebAuth: new (opts: { domain: string; clientID: string; redirectUri: string }) => Auth0WebAuthApi;
}).WebAuth;
const auth: Auth0WebAuthApi | null = new WebAuthCtor({
  domain: base.domain,
  clientID: base.clientID,
  redirectUri: base.redirectUri,
});

export const googleLogin = (emailHint?: string): void => {
  const cfg = getConfig();
  if (!auth || !cfg.domain || !cfg.clientID) {
    console.error('[Auth0] Missing configuration. Check NEXT_PUBLIC_AUTH0_* env vars.');
    if (typeof window !== 'undefined') alert('Google Sign-in is not configured. Please try again later.');
    return;
  }
  auth.authorize({
    connection: 'google-oauth2',
    prompt: 'select_account',
    scope: 'openid email profile',
    responseType: cfg.responseType,
    redirectUri: cfg.redirectUri,
    login_hint: (emailHint || '').trim() || undefined,
  });
};

type MinimalRouter = { push: (path: string) => void };
interface MinimalAuthResult { accessToken?: string }
interface LocalUser {
  name?: string;
  email?: string;
  email_verified?: boolean;
  picture?: string;
  firstName?: string;
  lastName?: string;
  newsPreferences: unknown[];
}

export const handleAuthentication = (hash: string, router: MinimalRouter) => {
  if (!auth) return;
  auth.parseHash({ hash }, function (error: Error | null, result: { accessToken?: string } | null) {
    const accessToken = result?.accessToken;
    if (error || !accessToken) {
      router.push('/');
      return;
    }
    if (!auth) return;
    auth.client.userInfo(accessToken, async function (_err: Error | null, profile: Auth0MinimalProfile) {
      try {
        const user: LocalUser = {
          name: profile.name,
          email: profile.email,
          email_verified: profile.email_verified,
          picture: profile.picture,
          firstName: profile.given_name,
          lastName: profile.family_name,
          newsPreferences: [],
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('267.0.0', 'true');
        router.push('/internships');
      } catch {
        router.push('/');
      }
    });
  });
};

export const authenticateFromHash = (hash: string): Promise<LocalUser | null> => {
  return new Promise((resolve) => {
    if (!auth) return resolve(null);
    auth.parseHash({ hash }, function (error: Error | null, result: { accessToken?: string } | null) {
      const accessToken = result?.accessToken;
      if (error || !accessToken) {
        resolve(null);
        return;
      }
      auth.client.userInfo(accessToken, function (_err: Error | null, profile: Auth0MinimalProfile) {
        const user: LocalUser = {
          name: profile.name,
          email: profile.email,
          email_verified: profile.email_verified,
          picture: profile.picture,
          firstName: profile.given_name,
          lastName: profile.family_name,
          newsPreferences: [],
        };
        try {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('267.0.0', 'true');
        } catch {}
        resolve(user);
      });
    });
  });
};


