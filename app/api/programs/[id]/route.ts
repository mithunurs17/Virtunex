import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { InternshipProgramModel } from '@/models/InternshipProgram';
import { toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const program = await InternshipProgramModel.findById(id).lean();
    
    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json({ result: program });
  } catch (error) {
    return toErrorResponse(error);
  }
}
