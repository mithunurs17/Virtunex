import { NextResponse } from 'next/server';
import { getOrCreateAppUser } from '@/lib/auth/session';
import type { User } from '@/models/User';

export class AuthError extends Error {
  constructor(public readonly status: 401 | 403, message = status === 401 ? 'Authentication required' : 'Forbidden') { super(message); }
}

export async function requireAuth(): Promise<User> {
  const user = await getOrCreateAppUser();
  if (!user || user.status !== 'ACTIVE') throw new AuthError(401);
  return user;
}
export async function requireRole(...roles: User['role'][]): Promise<User> { const user = await requireAuth(); if (!roles.includes(user.role)) throw new AuthError(403); return user; }
export const requireStudent = () => requireRole('STUDENT');
export const requireMentor = () => requireRole('MENTOR');
export const requireAdmin = () => requireRole('ADMIN');
export async function requireStudentOwnership(targetUserId: string) { const user = await requireAuth(); if (user.role !== 'ADMIN' && (user.role !== 'STUDENT' || String(user._id) !== targetUserId)) throw new AuthError(403); return user; }
export async function requireMentorAssignment(_targetStudentId: string) { const user = await requireAuth(); if (user.role !== 'ADMIN' && user.role !== 'MENTOR') throw new AuthError(403); /* TODO: enforce mentor assignments when that relationship is added. */ return user; }
export function toErrorResponse(error: unknown) { const status = error instanceof AuthError ? error.status : 500; const message = error instanceof AuthError ? error.message : 'Internal server error'; return NextResponse.json({ error: message }, { status }); }