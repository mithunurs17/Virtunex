import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { MentorAssignmentModel } from '@/models/MentorAssignment';
import { requireAdmin, requireAuth, toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const mentorId = searchParams.get('mentorId');
    const studentId = searchParams.get('studentId');
    const batchId = searchParams.get('batchId');

    const query: Record<string, unknown> = { active: true };

    if (user.role === 'ADMIN') {
      // Admins may filter freely.
      if (mentorId) query.mentorId = mentorId;
      if (studentId) query.studentId = studentId;
    } else if (user.role === 'MENTOR') {
      // Mentors may only ever see their own assignments. Ignore any
      // mentorId/studentId supplied by the client and pin to the
      // authenticated mentor's own id, so one mentor can't read another
      // mentor's roster by changing the query string.
      query.mentorId = user._id;
      if (studentId) query.studentId = studentId;
    } else {
      // Students (or any other role) may not browse assignment records.
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (batchId) query.batchId = batchId;

    const assignments = await MentorAssignmentModel.find(query)
      .populate('mentorId', 'fullName email')
      .populate('studentId', 'fullName email')
      .populate('batchId', 'name code')
      .sort({ assignedAt: -1 })
      .lean();

    return NextResponse.json({ result: assignments });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();
    const body = await req.json();

    const assignment = await MentorAssignmentModel.create({
      mentorId: body.mentorId,
      studentId: body.studentId,
      batchId: body.batchId,
      assignedAt: new Date(),
      active: true,
    });

    const populated = await MentorAssignmentModel.findById(assignment._id)
      .populate('mentorId', 'fullName email')
      .populate('studentId', 'fullName email')
      .populate('batchId', 'name code')
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
    ['active'].forEach((key) => {
      if (body[key] !== undefined) updates[key] = body[key];
    });

    const assignment = await MentorAssignmentModel.findByIdAndUpdate(id, { $set: updates }, { new: true })
      .populate('mentorId', 'fullName email')
      .populate('studentId', 'fullName email')
      .populate('batchId', 'name code')
      .lean();

    return NextResponse.json({ result: assignment });
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

    await MentorAssignmentModel.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}