import { NextRequest, NextResponse } from 'next/server';
import { auth0, isAuth0Configured } from '@/lib/auth0';

const publicPages = /^\/(|courses|internships|about|contact|login|careers|services)(\/|$)|^\/certificate\/verify\//;
function publicApi(req: NextRequest) {
  const path = req.nextUrl.pathname;
  return (path === '/api/branches' || path === '/api/projects' || path === '/api/batches') && req.method === 'GET' || path === '/api/enrollments' && ['GET', 'POST'].includes(req.method);
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const protectedPath = path.startsWith('/student/') || path.startsWith('/mentor/') || path.startsWith('/admin/') || path.startsWith('/api/');
  if (!isAuth0Configured) {
    if (!protectedPath || publicPages.test(path) || publicApi(req)) return NextResponse.next();
    if (path.startsWith('/api/')) return NextResponse.json({ error: 'Authentication service is not configured' }, { status: 503 });
    return NextResponse.redirect(new URL('/login', req.url));
  }
  const sdkResponse = await auth0.middleware(req);
  if (!protectedPath || publicPages.test(path) || publicApi(req) || path.startsWith('/auth/')) return sdkResponse;
  const session = await auth0.getSession(req);
  if (session) return sdkResponse;
  if (path.startsWith('/api/')) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  return NextResponse.redirect(new URL('/auth/login', req.url));
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };