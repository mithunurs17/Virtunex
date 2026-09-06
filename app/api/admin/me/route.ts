import { NextResponse } from 'next/server';
import { requireAdmin, toErrorResponse } from '@/lib/permissions';
export async function GET() { try { const user = await requireAdmin(); return NextResponse.json({ user: { id: user._id, email: user.email, role: user.role } }); } catch (error) { return toErrorResponse(error); } }