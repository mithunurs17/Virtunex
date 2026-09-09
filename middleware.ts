import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

const publicPages = /^\/(|courses|internships|about|contact|login|careers|services|signup)(\/|$)|^\/certificate\/verify\//;

function publicApi(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isGet = req.method === 'GET';

  return (
    (isGet &&
      (path === '/api/branches' ||
        path === '/api/projects' ||
        path === '/api/programs' ||
        path.startsWith('/api/programs/') ||
        path === '/api/batches' ||
        path.startsWith('/api/batches/'))) ||
    (path === '/api/enrollments' && ['GET', 'POST'].includes(req.method)) ||
    path.startsWith('/api/auth/')
  );
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedApi = path.startsWith('/api/') && !publicApi(req);

  // Allow public pages and public API reads
  if (publicPages.test(path) || publicApi(req)) {
    return NextResponse.next();
  }

  // Check authentication for everything else
  const session = await getSession();
  if (!session.user) {
    if (isProtectedApi) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };