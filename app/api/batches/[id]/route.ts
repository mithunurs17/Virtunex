import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { BatchModel } from '@/models/Batch';
import { toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const batch = await BatchModel.findById(id)
      .populate('programId', 'title description')
      .populate('mentorIds', 'fullName email')
      .populate('createdBy', 'fullName email')
      .lean();

    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    return NextResponse.json({ result: batch });
  } catch (error) {
    return toErrorResponse(error);
  }
}
