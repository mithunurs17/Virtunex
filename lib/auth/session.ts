import { cookies } from 'next/headers';

export interface SessionData {
  user?: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    role: 'STUDENT' | 'MENTOR' | 'ADMIN';
    status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
    profileImage: string;
  };
}

export async function getSession(): Promise<SessionData> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('app_user');
    if (!session?.value) return {};

    const userData = JSON.parse(Buffer.from(session.value, 'base64').toString('utf-8'));
    return { user: userData };
  } catch {
    return {};
  }
}

export async function setSession(user: SessionData['user']) {
  const cookieStore = await cookies();
  if (user) {
    const encoded = Buffer.from(JSON.stringify(user)).toString('base64');
    cookieStore.set('app_user', encoded, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
    });
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('app_user');
}