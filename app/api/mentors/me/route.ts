import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { MentorProfileModel } from '@/models/MentorProfile';
import { requireMentor, toErrorResponse } from '@/lib/permissions';
export async function GET() { try { const user = await requireMentor(); await dbConnect(); return NextResponse.json({ user: { id: user._id, email: user.email, role: user.role }, profile: await MentorProfileModel.findOne({ userId: user._id }).lean() }); } catch (error) { return toErrorResponse(error); } }