import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { InternshipProgramModel } from '@/models/InternshipProgram';
import { requireAdmin, toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const active = searchParams.get('active');

    const query = active === 'true' ? { active: true } : {};
    const programs = await InternshipProgramModel.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ result: programs });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();
    const body = await req.json();

    const program = await InternshipProgramModel.create({
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-'),
      description: body.description,
      category: body.category,
      durationWeeks: body.durationWeeks,
      level: body.level || 'Beginner',
      tracks: body.tracks || [],
      objectives: body.objectives || [],
      prerequisites: body.prerequisites || [],
      learningOutcomes: body.learningOutcomes || [],
      active: body.active !== false,
    });

    return NextResponse.json({ result: program }, { status: 201 });
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
    ['title', 'slug', 'description', 'category', 'durationWeeks', 'level', 'tracks', 'objectives', 'prerequisites', 'learningOutcomes', 'active'].forEach(
      (key) => {
        if (body[key] !== undefined) updates[key] = body[key];
      }
    );

    const program = await InternshipProgramModel.findByIdAndUpdate(id, { $set: updates }, { new: true }).lean();
    return NextResponse.json({ result: program });
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

    await InternshipProgramModel.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}
