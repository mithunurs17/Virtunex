import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { EnrollmentModel } from '@/models/Enrollment';
import { BatchModel } from '@/models/Batch';
import { requireAdmin, requireAuth, toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    const programId = searchParams.get('programId');
    const batchId = searchParams.get('batchId');
    const status = searchParams.get('status');

    const query: Record<string, unknown> = {};
    if (studentId) query.studentId = studentId;
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
    await requireAuth();
    await dbConnect();
    const body = await req.json();

    // Check if student already enrolled in this program
    const existing = await EnrollmentModel.findOne({
      studentId: body.studentId,
      programId: body.programId,
    });

    if (existing) {
      return NextResponse.json({ error: 'Already enrolled in this program' }, { status: 409 });
    }

    const enrollment = await EnrollmentModel.create({
      studentId: body.studentId,
      programId: body.programId,
      batchId: body.batchId || null,
      branchId: body.branchId || null,
      status: 'APPLIED',
      paymentStatus: 'pending',
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