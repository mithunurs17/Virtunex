import { Auth0Client } from '@auth0/nextjs-auth0/server';

const normalizeDomain = (value?: string) => value?.replace(/^https?:\/\//, '').replace(/\/$/, '');
const issuer = normalizeDomain(process.env.AUTH0_ISSUER_BASE_URL);
const domain = normalizeDomain(process.env.AUTH0_DOMAIN) || issuer;
const appBaseUrl = process.env.AUTH0_BASE_URL || process.env.NEXT_PUBLIC_APP_URL;

export const isAuth0Configured = Boolean(
  domain && process.env.AUTH0_CLIENT_ID && process.env.AUTH0_CLIENT_SECRET && process.env.AUTH0_SECRET && appBaseUrl
);

export const auth0 = new Auth0Client({
  domain,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  appBaseUrl,
  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE,
    scope: 'openid profile email',
  },
  session: { rolling: true },
});