import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername, createDummyAuthUser } from '@/lib/actions/auth-server';

async function setupDemo() {
  try {
    const demoUsername = process.env.NEXT_PUBLIC_DEMO_USERNAME || 'demo';

    // Check if demo user already exists
    let existingUser;
    try {
      existingUser = await getUserByUsername(demoUsername);
    } catch (dbError) {
      console.error('Database error checking demo user:', dbError);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }
    
    if (existingUser) {
      return NextResponse.json(
        {
          success: true,
          message: 'Demo user already exists',
          user: existingUser,
        },
        { status: 200 }
      );
    }

    // Create demo user
    let result;
    try {
      result = await createDummyAuthUser(demoUsername);
    } catch (createError) {
      console.error('Database error creating demo user:', createError);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to create demo account' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Demo user created successfully',
        user: result.user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Demo account setup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during demo account setup' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return setupDemo();
}

export async function POST(request: NextRequest) {
  return setupDemo();
}
