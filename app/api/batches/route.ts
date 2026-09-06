import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { BatchModel } from '@/models/Batch';
import { requireAdmin, toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const programId = searchParams.get('programId');
    const status = searchParams.get('status');

    const query: Record<string, unknown> = {};
    if (programId) query.programId = programId;
    if (status) query.status = status;

    const batches = await BatchModel.find(query)
      .populate('programId', 'title')
      .populate('mentorIds', 'fullName email')
      .populate('createdBy', 'fullName email')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ result: batches });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();
    const body = await req.json();

    const batch = await BatchModel.create({
      programId: body.programId,
      name: body.name,
      code: body.code,
      status: body.status || 'UPCOMING',
      capacity: body.capacity,
      enrolledCount: 0,
      schedule: body.schedule || '',
      startDate: body.startDate,
      endDate: body.endDate,
      mentorIds: body.mentorIds || [],
      createdBy: body.createdBy,
    });

    const populated = await BatchModel.findById(batch._id)
      .populate('programId', 'title')
      .populate('mentorIds', 'fullName email')
      .populate('createdBy', 'fullName email')
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
    ['name', 'code', 'status', 'capacity', 'schedule', 'startDate', 'endDate', 'mentorIds'].forEach((key) => {
      if (body[key] !== undefined) updates[key] = body[key];
    });

    const batch = await BatchModel.findByIdAndUpdate(id, { $set: updates }, { new: true })
      .populate('programId', 'title')
      .populate('mentorIds', 'fullName email')
      .populate('createdBy', 'fullName email')
      .lean();

    return NextResponse.json({ result: batch });
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

    await BatchModel.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}


