import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { generateUserId, generateDummyEmail, getAuthUser, DummyUser } from '@/lib/auth-utils';

/**
 * Gets the current authenticated user from session
 */
export async function getCurrentUser() {
  const authUser = await getAuthUser();
  
  if (!authUser) {
    return null;
  }

  // Return user object that mimics Supabase user structure
  return {
    id: authUser.userId,
    username: authUser.username,
    email: `${authUser.username}@dummy.local`,
  };
}

/**
 * Creates a new user in the database with dummy auth
 */
export async function createDummyAuthUser(username: string): Promise<{ success: boolean; user?: DummyUser; error?: string }> {
  let supabase;
  try {
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: async () => (await cookies()).getAll(),
        },
      }
    );
  } catch (clientError) {
    console.error('Failed to create Supabase client:', clientError);
    return {
      success: false,
      error: 'Database connection error',
    };
  }

  try {
    // Check if username already exists - use maybeSingle() to avoid errors when no row exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking username:', checkError);
      return {
        success: false,
        error: 'Database error checking username',
      };
    }

    if (existingUser) {
      return {
        success: false,
        error: 'Username already taken',
      };
    }

    // Generate unique ID and dummy email
    const userId = generateUserId();
    const dummyEmail = generateDummyEmail(username);

    // Create user in database
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        owner_uuid: userId,
        email: dummyEmail,
        username: username,
        owned_event_id: [],
        invited_event_id: [],
        pfp_url: null,
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating user:', createError);
      return {
        success: false,
        error: createError.message || 'Failed to create user',
      };
    }

    return {
      success: true,
      user: {
        id: userId,
        username: username,
        dummy_email: dummyEmail,
      },
    };
  } catch (error) {
    console.error('Unexpected error creating user:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Gets user by username
 */
export async function getUserByUsername(username: string): Promise<DummyUser | null> {
  let supabase;
  try {
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: async () => (await cookies()).getAll(),
        },
      }
    );
  } catch (clientError) {
    console.error('Failed to create Supabase client in getUserByUsername:', clientError);
    return null;
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('owner_uuid, username, email')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    if (!user) {
      return null;
    }

    return {
      id: user.owner_uuid,
      username: user.username,
      dummy_email: user.email,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
