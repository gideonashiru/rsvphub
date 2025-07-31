import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";



export async function getCurrentUser() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
    cookies: {
      getAll: async () => (await cookies()).getAll(),
    },
    }
  );

  const {
    data: { user },
    error,
  } = await (await supabase).auth.getUser();

  if (error) {
    console.error("Error getting current user:", error.message);
    return null;
  }

  return user;
}


