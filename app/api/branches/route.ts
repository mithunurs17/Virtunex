import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { BranchModel } from '@/models/Branch';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  const branches = await BranchModel.find({}).sort({ name: 1 }).lean();
  return NextResponse.json({ result: branches });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const created = await BranchModel.create({ name: body.name, code: body.code });
  return NextResponse.json({ result: created });
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { id, name, code } = body as { id: string; name?: string; code?: string };
  const updated = await BranchModel.findByIdAndUpdate(
    id,
    { $set: { ...(name !== undefined ? { name } : {}), ...(code !== undefined ? { code } : {}) } },
    { new: true }
  );
  return NextResponse.json({ result: updated });
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await BranchModel.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}


