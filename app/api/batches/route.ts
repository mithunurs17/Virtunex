import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { BatchModel } from '@/models/Batch';
import { requireAdmin, toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  const batches = await BatchModel.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ result: batches });
}

export async function POST(req: NextRequest) {
  try { await requireAdmin(); } catch (error) { return toErrorResponse(error); }
  await dbConnect();
  const body = await req.json();
  const created = await BatchModel.create({
    name: body.name,
    status: body.status || 'available',
    capacity: Number(body.capacity) || 0,
    enrolled: Number(body.enrolled) || 0,
    schedule: body.schedule || '',
    startDate: body.startDate ? new Date(body.startDate) : undefined,
    endDate: body.endDate ? new Date(body.endDate) : undefined,
  });
  return NextResponse.json({ result: created });
}

export async function PUT(req: NextRequest) {
  try { await requireAdmin(); } catch (error) { return toErrorResponse(error); }
  await dbConnect();
  const body = await req.json();
  const { id, name, status, capacity, enrolled, schedule, startDate, endDate } = body as {
    id: string;
    name?: string;
    status?: 'available' | 'expired';
    capacity?: number;
    enrolled?: number;
    schedule?: string;
    startDate?: string;
    endDate?: string;
  };
  const updated = await BatchModel.findByIdAndUpdate(
    id,
    { $set: {
      ...(name !== undefined ? { name } : {}),
      ...(status !== undefined ? { status } : {}),
      ...(capacity !== undefined ? { capacity } : {}),
      ...(enrolled !== undefined ? { enrolled } : {}),
      ...(schedule !== undefined ? { schedule } : {}),
      ...(startDate !== undefined ? { startDate: startDate ? new Date(startDate) : undefined } : {}),
      ...(endDate !== undefined ? { endDate: endDate ? new Date(endDate) : undefined } : {}),
    }},
    { new: true }
  );
  return NextResponse.json({ result: updated });
}

export async function DELETE(req: NextRequest) {
  try { await requireAdmin(); } catch (error) { return toErrorResponse(error); }
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await BatchModel.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}


