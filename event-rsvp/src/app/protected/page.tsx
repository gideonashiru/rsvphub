import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { getCurrentUser } from "@/lib/actions/auth-server";


export default async function ProtectedPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p> Goodbye! 👋 </p>
      <LogoutButton />
      
    </div>
  );
}
