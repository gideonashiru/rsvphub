"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InvitesPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/notifications");
  }, [router]);

  return (
    <div className="p-10 space-y-4 mt-30">
      <h1 className="text-3xl font-bold">Invites Page</h1>
      <p className="text-muted-foreground">
        If you are seeing this, this is just a placeholder. You can see the event in invited events.
      </p>
    </div>
  );
}
//done