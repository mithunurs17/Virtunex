import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { BranchModel } from '@/models/Branch';
import { ProjectModel } from '@/models/Project';
import { InternshipProgramModel } from '@/models/InternshipProgram';
import { requireAdmin, toErrorResponse } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

export async function POST() {
  try { await requireAdmin(); } catch (error) { return toErrorResponse(error); }
  await dbConnect();
  await BranchModel.deleteMany({});
  await ProjectModel.deleteMany({});
  await InternshipProgramModel.deleteMany({});

  const cse = await BranchModel.create({ name: 'Computer Science (CSE)', code: 'CSE' });
  const aimlBranch = await BranchModel.create({ name: 'Artificial Intelligence & ML (AIML)', code: 'AIML' });

  const p1 = await ProjectModel.create({ title: 'SaaS Analytics Dashboard', description: 'Track KPIs and metrics in real-time.', branches: [cse._id, aimlBranch._id] });
  const p2 = await ProjectModel.create({ title: 'AI Support Bot', description: 'LLM-powered support assistant.', branches: [aimlBranch._id] });
  const p3 = await ProjectModel.create({ title: 'Cloud Infra Automation', description: 'Automate infra using IaC.', branches: [cse._id] });

  // Seed InternshipPrograms
  const techFoundations = await InternshipProgramModel.create({
    title: 'Tech Foundations Internship',
    slug: 'tech-foundations',
    description: 'Build fundamental skills in web development, databases, and cloud technologies.',
    category: 'Web Development',
    durationWeeks: 8,
    level: 'Beginner',
    tracks: ['Frontend', 'Backend', 'Full Stack'],
    objectives: [
      'Master HTML, CSS, and JavaScript',
      'Learn responsive design principles',
      'Understand database fundamentals',
      'Deploy applications to cloud',
    ],
    prerequisites: ['Basic programming knowledge', 'Familiarity with command line'],
    learningOutcomes: [
      'Build responsive web applications',
      'Work with RESTful APIs',
      'Understand web development best practices',
      'Collaborate in a team environment',
    ],
    active: true,
  });

  const fullStack = await InternshipProgramModel.create({
    title: 'Full Stack Development Internship',
    slug: 'full-stack-development',
    description: 'Comprehensive internship covering frontend, backend, and database technologies.',
    category: 'Web Development',
    durationWeeks: 12,
    level: 'Intermediate',
    tracks: ['React', 'Node.js', 'MongoDB', 'Next.js'],
    objectives: [
      'Develop modern full-stack applications',
      'Master React and component-based architecture',
      'Build scalable Node.js backends',
      'Work with databases and ORMs',
      'Deploy production applications',
    ],
    prerequisites: ['JavaScript proficiency', 'HTML/CSS knowledge', 'Git basics'],
    learningOutcomes: [
      'Build end-to-end web applications',
      'Implement authentication and authorization',
      'Design scalable APIs',
      'Work with version control systems',
      'Understand DevOps basics',
    ],
    active: true,
  });

  const aiml = await InternshipProgramModel.create({
    title: 'AI + ML Internship',
    slug: 'ai-ml',
    description: 'Deep dive into artificial intelligence and machine learning applications.',
    category: 'Artificial Intelligence',
    durationWeeks: 12,
    level: 'Advanced',
    tracks: ['Deep Learning', 'NLP', 'Computer Vision', 'MLOps'],
    objectives: [
      'Understand ML fundamentals and algorithms',
      'Build and train neural networks',
      'Work with popular ML frameworks',
      'Deploy ML models in production',
      'Solve real-world AI problems',
    ],
    prerequisites: [
      'Strong Python skills',
      'Linear algebra and calculus knowledge',
      'Understanding of statistics',
      'Machine learning basics',
    ],
    learningOutcomes: [
      'Implement classification and regression models',
      'Build deep learning applications',
      'Work with NLP and computer vision',
      'Deploy and monitor ML models',
      'Contribute to open-source AI projects',
    ],
    active: true,
  });

  return NextResponse.json({
    result: {
      branches: [cse, aiml],
      projects: [p1, p2, p3],
      programs: [techFoundations, fullStack, aiml],
    },
  });
}



