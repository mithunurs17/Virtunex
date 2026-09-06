import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

const publicPages = /^\/(|courses|internships|about|contact|login|careers|services|signup)(\/|$)|^\/certificate\/verify\//;

function publicApi(req: NextRequest) {
  const path = req.nextUrl.pathname;
  return (
    (path === '/api/branches' || path === '/api/projects' || path === '/api/programs' || path === '/api/batches') && req.method === 'GET' ||
    (path === '/api/enrollments' && ['GET', 'POST'].includes(req.method)) ||
    path.startsWith('/api/auth/')
  );
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedPath = path.startsWith('/student/') || path.startsWith('/mentor/') || path.startsWith('/admin/');
  const isProtectedApi = path.startsWith('/api/') && !publicApi(req);

  // Allow public pages
  if (publicPages.test(path) || publicApi(req)) {
    return NextResponse.next();
  }

  // Check authentication for protected paths
  const session = await getSession();
  if (!session.user) {
    if (isProtectedApi) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // User is authenticated, allow access
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };