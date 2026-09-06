import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { UserModel } from '@/models/User';
import { setSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    try {
      await dbConnect();
    } catch (error) {
      console.error('[POST /api/auth/login] Database connection failed:', error);
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Find user by email
    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Account is not active' },
        { status: 403 }
      );
    }

    // Compare passwords
    const isPasswordValid = await (user as any).comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    try {
      await UserModel.findByIdAndUpdate(user._id, { lastLoginAt: new Date() });
    } catch (error) {
      console.error('[POST /api/auth/login] Failed to update lastLoginAt:', error);
      // Continue anyway - this is non-critical
    }

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[POST /api/auth/login]', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
