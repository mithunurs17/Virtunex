import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { dbConnect } from '@/lib/db';
import { UserModel, type User } from '@/models/User';

export class AuthError extends Error {
  constructor(public readonly status: 401 | 403, message = status === 401 ? 'Authentication required' : 'Forbidden') { super(message); }
}

export async function requireAuth(): Promise<User> {
  const session = await getSession();
  if (!session.user) throw new AuthError(401, 'Authentication required');

  await dbConnect();
  let user = await UserModel.findById(session.user._id);
  if (!user) {
    user = await UserModel.findOne({ email: session.user.email });
  }

  if (!user || user.status !== 'ACTIVE') throw new AuthError(401, 'User not active');
  return user;
}

export async function requireRole(...roles: User['role'][]): Promise<User> {
  const user = await requireAuth();
  if (!roles.includes(user.role)) throw new AuthError(403, 'Insufficient permissions');
  return user;
}

export const requireStudent = () => requireRole('STUDENT');
export const requireMentor = () => requireRole('MENTOR');
export const requireAdmin = () => requireRole('ADMIN');

export async function requireStudentOwnership(targetUserId: string) {
  const user = await requireAuth();
  if (user.role !== 'ADMIN' && (user.role !== 'STUDENT' || String(user._id) !== targetUserId)) throw new AuthError(403);
  return user;
}

export async function requireMentorAssignment(_targetStudentId: string) {
  const user = await requireAuth();
  if (user.role !== 'ADMIN' && user.role !== 'MENTOR') throw new AuthError(403);
  return user;
}

export function toErrorResponse(error: unknown) {
  const status = error instanceof AuthError ? error.status : 500;
  const message = error instanceof AuthError ? error.message : 'Internal server error';
  return NextResponse.json({ error: message }, { status });
}