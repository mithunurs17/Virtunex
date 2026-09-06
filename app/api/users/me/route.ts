import { NextResponse } from 'next/server';
import { requireAuth, toErrorResponse } from '@/lib/permissions';

export async function GET() {
  try {
    const user = await requireAuth();
    return NextResponse.json({ user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, fullName: user.fullName, profileImage: user.profileImage, role: user.role, status: user.status } });
  } catch (error) { return toErrorResponse(error); }
}