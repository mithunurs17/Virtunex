import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { StudentProfileModel } from '@/models/StudentProfile';
import { UserModel } from '@/models/User';
import { requireStudent, toErrorResponse } from '@/lib/permissions';

const editable = ['usn', 'collegeName', 'university', 'branchId', 'semester', 'graduationYear', 'city', 'state', 'githubUrl', 'linkedinUrl', 'portfolioUrl', 'skills', 'preferredProgram', 'preferredTrack', 'phone'] as const;
export async function GET() { try { const user = await requireStudent(); await dbConnect(); const profile = await StudentProfileModel.findOne({ userId: user._id }).lean(); return NextResponse.json({ profile }); } catch (error) { return toErrorResponse(error); } }
export async function PATCH(req: NextRequest) {
  try {
    const user = await requireStudent(); await dbConnect(); const body = await req.json();
    const updates: Record<string, unknown> = {};
    for (const key of editable) if (body[key] !== undefined) updates[key] = body[key];
    if (body.onboardingCompleted === true) updates.onboardingCompleted = true;
    const profile = await StudentProfileModel.findOneAndUpdate({ userId: user._id }, { $set: updates }, { new: true, upsert: true, setDefaultsOnInsert: true }).lean();
    if (body.phone !== undefined) await UserModel.findByIdAndUpdate(user._id, { $set: { phone: String(body.phone) } });
    return NextResponse.json({ profile });
  } catch (error) { return toErrorResponse(error); }
}