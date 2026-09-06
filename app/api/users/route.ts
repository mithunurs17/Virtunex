import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { UserModel } from '@/models/User';
import { requireAdmin, toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');

    const query: Record<string, unknown> = {};
    if (role) query.role = role;

    const users = await UserModel.find(query)
      .select('_id fullName email role status')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ result: users });
  } catch (error) {
    return toErrorResponse(error);
  }
}
