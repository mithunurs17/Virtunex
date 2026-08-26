import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { ProjectModel } from '@/models/Project';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const branch = searchParams.get('branch');
  const filter: { branches?: string } = {};
  if (branch) filter.branches = branch;
  const projects = await ProjectModel.find(filter).populate('branches').sort({ createdAt: -1 }).lean();
  return NextResponse.json({ result: projects });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const created = await ProjectModel.create({ title: body.title, description: body.description || '', branches: body.branches || [] });
  return NextResponse.json({ result: created });
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { id, title, description, branches } = body as { id: string; title?: string; description?: string; branches?: string[] };
  const updated = await ProjectModel.findByIdAndUpdate(
    id,
    { $set: { ...(title !== undefined ? { title } : {}), ...(description !== undefined ? { description } : {}), ...(branches !== undefined ? { branches } : {}) } },
    { new: true }
  );
  return NextResponse.json({ result: updated });
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await ProjectModel.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}


