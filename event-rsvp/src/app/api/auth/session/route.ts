import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  try {
    let authenticatedUser;
    try {
      authenticatedUser = await getAuthUser();
    } catch (cookieError) {
      console.error('Session check cookie error:', cookieError);
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: authenticatedUser.userId,
          username: authenticatedUser.username,
          email: `${authenticatedUser.username}@dummy.local`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { user: null },
      { status: 401 }
    );
  }
}
