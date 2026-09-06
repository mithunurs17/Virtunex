import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { EnrollmentModel } from '@/models/Enrollment';
import { toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const enrollment = await EnrollmentModel.findById(id)
      .populate('studentId', 'fullName email')
      .populate('programId', 'title description durationWeeks')
      .populate('batchId', 'name code status')
      .populate('branchId', 'name code')
      .lean();

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    return NextResponse.json({ result: enrollment });
  } catch (error) {
    return toErrorResponse(error);
  }
}
