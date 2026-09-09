import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/db';
import { StudentProfileModel } from '@/models/StudentProfile';
import { UserModel } from '@/models/User';
import { EnrollmentModel } from '@/models/Enrollment';
import { InternshipProgramModel } from '@/models/InternshipProgram';
import { requireStudent, toErrorResponse } from '@/lib/permissions';

const editable = ['usn', 'collegeName', 'university', 'branchId', 'semester', 'graduationYear', 'city', 'state', 'githubUrl', 'linkedinUrl', 'portfolioUrl', 'skills', 'preferredProgram', 'preferredTrack', 'phone'] as const;

export async function GET() {
  try {
    const user = await requireStudent();
    
    try {
      await dbConnect();
    } catch (error) {
      console.error('[GET /api/students/me] Database connection failed:', error);
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }
    
    let profile = await StudentProfileModel.findOne({ userId: user._id }).lean();
    
    // If profile doesn't exist, create it
    if (!profile) {
      try {
        profile = await StudentProfileModel.create({ userId: user._id });
      } catch (createError) {
        console.error('[GET /api/students/me] Failed to create profile:', createError);
        // Return an empty profile structure instead of failing.
        return NextResponse.json({ profile: { userId: String(user._id) } });
      }
    }
    
    return NextResponse.json({ profile });
  } catch (error) {
    console.error('[GET /api/students/me]', error);
    return toErrorResponse(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireStudent();
    
    try {
      await dbConnect();
    } catch (error) {
      console.error('[PATCH /api/students/me] Database connection failed:', error);
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }
    
    const body = await req.json();
    const isCompletingOnboarding = body.onboardingCompleted === true;
    const preferredProgram = typeof body.preferredProgram === 'string'
      ? body.preferredProgram.trim()
      : '';

    // A completed profile is also an internship application. Resolve the
    // selected profile value (which is the program slug) before saving so we
    // never send a student to the dashboard without an enrollment path.
    const selectedProgram = isCompletingOnboarding
      ? await InternshipProgramModel.findOne({ slug: preferredProgram, active: true }).select('_id').lean()
      : null;

    if (isCompletingOnboarding && !selectedProgram) {
      return NextResponse.json(
        { error: 'The selected internship program is no longer available. Please choose another program.' },
        { status: 400 }
      );
    }
    
    const updates: Record<string, unknown> = {};
    for (const key of editable) {
      if (body[key] === undefined) continue;

      if (key === 'branchId') {
        const branchId = typeof body[key] === 'string' ? body[key].trim() : body[key];
        if (!branchId) continue;
        if (!mongoose.isValidObjectId(branchId)) {
          return NextResponse.json({ error: 'Invalid branch selection' }, { status: 400 });
        }
        updates[key] = branchId;
        continue;
      }

      updates[key] = body[key];
    }
    if (body.onboardingCompleted === true) updates.onboardingCompleted = true;
    
    const profile = await StudentProfileModel.findOneAndUpdate(
      { userId: user._id },
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    if (selectedProgram) {
      // Keep onboarding retry-safe: completing the form again must not create
      // a second application for the same program.
      await EnrollmentModel.findOneAndUpdate(
        { studentId: user._id, programId: selectedProgram._id },
        {
          $setOnInsert: {
            studentId: user._id,
            programId: selectedProgram._id,
            status: 'APPLIED',
            paymentStatus: 'pending',
            enrollmentDate: new Date(),
            completionPercentage: 0,
            internshipReadinessScore: 0,
            certificateEligible: false,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    }
    
    if (body.phone !== undefined) {
      try {
        await UserModel.findByIdAndUpdate(user._id, { $set: { phone: String(body.phone) } });
      } catch (updateError) {
        console.error('[PATCH /api/students/me] Failed to update user phone:', updateError);
        // Continue anyway - student profile was updated
      }
    }
    
    return NextResponse.json({ profile });
  } catch (error) {
    console.error('[PATCH /api/students/me]', error);
    return toErrorResponse(error);
  }
}
