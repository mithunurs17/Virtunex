import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/db';
import { EnrollmentModel } from '@/models/Enrollment';
import { BatchModel } from '@/models/Batch';
import { InternshipProgramModel } from '@/models/InternshipProgram';
import { requireAdmin, requireAuth, toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    const programId = searchParams.get('programId');
    const batchId = searchParams.get('batchId');
    const status = searchParams.get('status');

    const query: Record<string, unknown> = {};
    // Students may only read their own applications. Administrators retain
    // access to the complete list used by the enrollment dashboard.
    if (user.role === 'ADMIN') {
      if (studentId) query.studentId = studentId;
    } else {
      query.studentId = user._id;
    }
    if (programId) query.programId = programId;
    if (batchId) query.batchId = batchId;
    if (status) query.status = status;

    const enrollments = await EnrollmentModel.find(query)
      .populate('studentId', 'fullName email')
      .populate('programId', 'title')
      .populate('batchId', 'name code')
      .populate('branchId', 'name code')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ result: enrollments });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    await dbConnect();
    const body = await req.json();

    const programId = typeof body.programId === 'string' && mongoose.isValidObjectId(body.programId)
      ? body.programId
      : (await InternshipProgramModel.findOne({ active: true }).sort({ createdAt: 1 }).select('_id').lean())?._id;

    if (!programId) {
      return NextResponse.json({ error: 'No active internship program is available' }, { status: 400 });
    }

    const batchId = typeof body.batchId === 'string' && mongoose.isValidObjectId(body.batchId)
      ? body.batchId
      : undefined;
    const branchId = typeof body.branchId === 'string' && mongoose.isValidObjectId(body.branchId)
      ? body.branchId
      : undefined;

    // Check if student already enrolled in this program
    const existing = await EnrollmentModel.findOne({
      studentId: user._id,
      programId,
    });

    if (existing) {
      return NextResponse.json({ error: 'Already enrolled in this program' }, { status: 409 });
    }

    const enrollment = await EnrollmentModel.create({
      studentId: user._id,
      programId,
      ...(batchId ? { batchId } : {}),
      ...(branchId ? { branchId } : {}),
      status: 'APPLIED',
      paymentStatus: body.payment === 'partial' || body.payment === 'full' ? body.payment : 'pending',
      enrollmentDate: new Date(),
      completionPercentage: 0,
      internshipReadinessScore: 0,
      certificateEligible: false,
    });

    const populated = await EnrollmentModel.findById(enrollment._id)
      .populate('studentId', 'fullName email')
      .populate('programId', 'title')
      .populate('batchId', 'name code')
      .populate('branchId', 'name code')
      .lean();

    return NextResponse.json({ result: populated }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();
    const body = await req.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const updates: Record<string, unknown> = {};
    [
      'status',
      'paymentStatus',
      'batchId',
      'branchId',
      'internshipStartDate',
      'internshipEndDate',
      'completionPercentage',
      'internshipReadinessScore',
      'certificateEligible',
      'certificateId',
    ].forEach((key) => {
      if (body[key] !== undefined) updates[key] = body[key];
    });

    const enrollment = await EnrollmentModel.findByIdAndUpdate(id, { $set: updates }, { new: true })
      .populate('studentId', 'fullName email')
      .populate('programId', 'title')
      .populate('batchId', 'name code')
      .populate('branchId', 'name code')
      .lean();

    return NextResponse.json({ result: enrollment });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    await EnrollmentModel.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}
