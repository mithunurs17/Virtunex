import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { BranchModel } from '@/models/Branch';
import { ProjectModel } from '@/models/Project';

export const dynamic = 'force-dynamic';

export async function POST() {
  await dbConnect();
  await BranchModel.deleteMany({});
  await ProjectModel.deleteMany({});

  const cse = await BranchModel.create({ name: 'Computer Science (CSE)', code: 'CSE' });
  const aiml = await BranchModel.create({ name: 'Artificial Intelligence & ML (AIML)', code: 'AIML' });

  const p1 = await ProjectModel.create({ title: 'SaaS Analytics Dashboard', description: 'Track KPIs and metrics in real-time.', branches: [cse._id, aiml._id] });
  const p2 = await ProjectModel.create({ title: 'AI Support Bot', description: 'LLM-powered support assistant.', branches: [aiml._id] });
  const p3 = await ProjectModel.create({ title: 'Cloud Infra Automation', description: 'Automate infra using IaC.', branches: [cse._id] });

  return NextResponse.json({ result: { branches: [cse, aiml], projects: [p1, p2, p3] } });
}


