import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { EnrollmentModel } from '@/models/Enrollment';
import { BatchModel } from '@/models/Batch';
import { sendInternshipOfferEmail, EmailData } from '@/lib/email';

// Ensure referenced schemas are registered for populate()
import '@/models/Branch';
import '@/models/Batch';
import '@/models/Project';

export const dynamic = 'force-dynamic';

// GET /api/enrollments?email=
export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const email = (searchParams.get('email') || '').trim().toLowerCase();

  type EnrollmentLean = {
    _id: string;
    email: string;
    fullName: string;
    whatsapp: string;
    college: string;
    yop: string;
    payment: 'partial' | 'full';
    createdAt?: string;
    picture?: string;
    branchId?: unknown;
    batchId?: unknown;
    projectId?: { title?: string } | null;
    certificateDistributedAt?: string | Date | null;
  };

  if (email) {
    const existing = await EnrollmentModel
      .findOne({ email })
      .populate('branchId')
      .populate('batchId')
      .populate({ path: 'projectId', select: 'title' })
      .lean<EnrollmentLean | null>();

    if (!existing) {
      return NextResponse.json({
        exists: false,
        result: null,
      });
    }

    const result: EnrollmentLean = {
      ...existing,
      projectId: existing.projectId || null,
    };

    return NextResponse.json({
      exists: true,
      result,
    });
  }

  const all = await EnrollmentModel
    .find({})
    .sort({ createdAt: -1 })
    .populate('branchId')
    .populate('batchId')
    .populate({ path: 'projectId', select: 'title' })
    .lean<EnrollmentLean[]>();

  const normalized = all.map((e) => ({
    ...e,
    projectId: e.projectId || null,
  }));

  return NextResponse.json({
    result: normalized,
  });
}

// POST /api/enrollments
export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const email = String(body.email || '').trim().toLowerCase();

  if (!email) {
    return NextResponse.json(
      { error: 'email required' },
      { status: 400 }
    );
  }

  const already = await EnrollmentModel.findOne({ email }).lean();

  if (already) {
    return NextResponse.json(
      { error: 'Enrollment already exists' },
      { status: 409 }
    );
  }

  const created = await EnrollmentModel.create({
    fullName: body.fullName,
    email,
    picture: body.picture || '',
    whatsapp: body.whatsapp,
    college: body.college,
    yop: body.yop,
    branchId: body.branchId,
    projectId:
      body.projectId && body.projectId !== 'undecided'
        ? body.projectId
        : undefined,
    batchId: body.batchId,
    payment: body.payment,
  });

  // Update batch enrollment count
  try {
    if (body.batchId) {
      await BatchModel.findByIdAndUpdate(
        body.batchId,
        { $inc: { enrolled: 1 } }
      );
    }
  } catch (error) {
    console.error('Error updating batch enrollment count:', error);
  }

  // ---------------------------------------------------------
  // Notify Slack (non-blocking)
  // ---------------------------------------------------------
  try {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (webhookUrl) {
      const populated = {
        fullName: body.fullName,
        email,
        picture: body.picture || '',
        whatsapp: body.whatsapp,
        college: body.college,
        yop: body.yop,
        branchId: body.branchId,
        projectId:
          body.projectId && body.projectId !== 'undecided'
            ? body.projectId
            : undefined,
        batchId: body.batchId,
        payment: body.payment,
      };

      const payload = {
        text: `New enrollment received\n\n\`\`\`json\n${JSON.stringify(
          populated,
          null,
          2
        )}\n\`\`\``,
      } as const;

      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
      });

      console.log('Slack notification sent');
    } else {
      console.warn(
        'SLACK_WEBHOOK_URL is not configured. Skipping Slack notification.'
      );
    }
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }

  // ---------------------------------------------------------
  // Send internship offer letter email (non-blocking)
  // ---------------------------------------------------------
  try {
    const populatedEnrollment = await EnrollmentModel
      .findById(created._id)
      .populate('branchId')
      .populate('batchId')
      .populate('projectId')
      .lean();

    if (populatedEnrollment) {
      const branch = populatedEnrollment.branchId as {
        name?: string;
      } | null;

      const batch = populatedEnrollment.batchId as {
        name?: string;
      } | null;

      const project = populatedEnrollment.projectId as {
        title?: string;
      } | null;

      const emailData: EmailData = {
        fullName: populatedEnrollment.fullName,
        email: populatedEnrollment.email,
        college: populatedEnrollment.college,
        whatsapp: populatedEnrollment.whatsapp,
        yop: populatedEnrollment.yop,
        branchName: branch?.name || undefined,
        batchName: batch?.name || undefined,
        projectTitle: project?.title || undefined,
      };

      await sendInternshipOfferEmail(emailData);

      console.log(
        'Internship offer email sent to:',
        emailData.email
      );
    }
  } catch (error) {
    console.error(
      'Error sending internship offer email:',
      error
    );
  }

  return NextResponse.json({
    result: created,
  });
}

// DELETE /api/enrollments?id=
export async function DELETE(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'id required' },
      { status: 400 }
    );
  }

  try {
    const existing = await EnrollmentModel
      .findById(id)
      .lean();

    await EnrollmentModel.findByIdAndDelete(id);

    const batchId = (
      existing as { batchId?: string } | null
    )?.batchId;

    if (batchId) {
      // Decrement enrolled count but never below 0
      await BatchModel.updateOne(
        {
          _id: batchId,
          enrolled: { $gt: 0 },
        },
        {
          $inc: { enrolled: -1 },
        }
      );
    }
  } catch (error) {
    console.error('Error deleting enrollment:', error);
  }

  return NextResponse.json({
    ok: true,
  });
}

// PUT /api/enrollments
export async function PUT(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  const email = (body.email || '')
    .trim()
    .toLowerCase();

  const id = body.id as string | undefined;

  const updates: Record<string, unknown> = {};

  if (body.projectId !== undefined) {
    updates.projectId =
      body.projectId && body.projectId !== 'undecided'
        ? body.projectId
        : undefined;
  }

  if (body.branchId !== undefined) {
    updates.branchId = body.branchId;
  }

  if (body.batchId !== undefined) {
    updates.batchId = body.batchId;
  }

  if (body.payment !== undefined) {
    updates.payment = body.payment;
  }

  if (body.certificateDistributedAt !== undefined) {
    updates.certificateDistributedAt =
      body.certificateDistributedAt
        ? new Date(body.certificateDistributedAt)
        : undefined;
  }

  if (!id && !email) {
    return NextResponse.json(
      { error: 'id or email required' },
      { status: 400 }
    );
  }

  const filter = id
    ? { _id: id }
    : { email };

  const updated = await EnrollmentModel
    .findOneAndUpdate(
      filter,
      { $set: updates },
      { new: true }
    )
    .populate('branchId')
    .populate('batchId')
    .populate('projectId');

  return NextResponse.json({
    result: updated,
  });
}