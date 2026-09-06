import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { UserModel } from '@/models/User';
import { StudentProfileModel } from '@/models/StudentProfile';
import { setSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName = '', lastName = '' } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Create new user
    const fullName = `${firstName} ${lastName}`.trim();
    const user = await UserModel.create({
      email: email.toLowerCase().trim(),
      password,
      firstName,
      lastName,
      fullName,
      role: 'STUDENT',
      status: 'ACTIVE',
    });

    // Create student profile
    await StudentProfileModel.create({ userId: user._id });

    // Set session
    await setSession({
      _id: String(user._id),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      role: user.role,
      status: user.status,
      profileImage: user.profileImage,
    });

    return NextResponse.json(
      {
        message: 'Signup successful',
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Signup failed' },
      { status: 500 }
    );
  }
}
