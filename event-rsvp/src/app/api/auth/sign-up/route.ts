import { NextRequest, NextResponse } from 'next/server';
import { createDummyAuthUser } from '@/lib/actions/auth-server';
import { setAuthCookie } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { username } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters' },
        { status: 400 }
      );
    }

    if (username.length > 20) {
      return NextResponse.json(
        { error: 'Username must not exceed 20 characters' },
        { status: 400 }
      );
    }

    // Validate username format (alphanumeric and underscore/hyphen only)
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return NextResponse.json(
        { error: 'Username can only contain letters, numbers, hyphens, and underscores' },
        { status: 400 }
      );
    }

    // Create user in database
    let result;
    try {
      result = await createDummyAuthUser(username);
    } catch (dbError) {
      console.error('Database error creating user:', dbError);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to create account' },
        { status: 400 }
      );
    }

    // Set authentication cookie
    try {
      await setAuthCookie(result.user!.id, result.user!.username);
    } catch (cookieError) {
      console.error('Cookie setting error:', cookieError);
      return NextResponse.json(
        { error: 'Failed to set session' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: result.user!.id,
          username: result.user!.username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Sign-up error:', error);
    return NextResponse.json(
      { error: 'An error occurred during sign-up' },
      { status: 500 }
    );
  }
}
