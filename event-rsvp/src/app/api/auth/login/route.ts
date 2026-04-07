import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername } from '@/lib/actions/auth-server';
import { setAuthCookie } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: 'Use POST method to login' },
    { status: 405 }
  );
}

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

    // Find user by username
    let user;
    try {
      user = await getUserByUsername(username);
    } catch (dbError) {
      console.error('Database error fetching user:', dbError);
      return NextResponse.json(
        { error: 'Database error fetching user' },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    // Set authentication cookie
    let cookieSet = false;
    try {
      await setAuthCookie(user.id, user.username);
      cookieSet = true;
    } catch (cookieError) {
      console.error('Cookie setting error:', cookieError);
      return NextResponse.json(
        { error: 'Failed to set session cookie' },
        { status: 500 }
      );
    }

    if (!cookieSet) {
      return NextResponse.json(
        { error: 'Session could not be established' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          username: user.username,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unhandled login error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'no stack');
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
