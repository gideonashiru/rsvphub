/* eslint-disable @typescript-eslint/no-explicit-any */
// This component sends the invite to the user, saves it in the database,
// and redirects them to the notifications page (or lets them choose to).

"use client";

import { useEffect, useState } from "react";
import { saveInvite } from "@/lib/actions/client-events";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner";

const successMessage = "Invite link was successful, you can now RSVP to the event.";
const failureMessage = "Invite link is invalid, ask the event owner for a correct invite page link.";

export function InviteClient({ user }: { user: any }) {
  const params = useParams();
  const slug = params?.slug as string;
  const [msg, setMsg] = useState("Checking your invite link...");

  useEffect(() => {
    if (slug && user?.id) {
      const save = async () => {
      
        const result = await saveInvite(slug, user.id);

        if (result?.success) {
          setMsg(successMessage);
          toast.success("You're invited!", {
            description: "You can now RSVP to the event.",
          });
        } else {
          setMsg(failureMessage);
          toast.error("Invalid invite link.", {
            description: "Ask the event planner for the correct link",
          });
        }
      };

      save();
    }
  }, [slug, user?.id]);

  return (
    <div className="p-10 space-y-4 mt-30">
     
      <h1 className="text-3xl font-bold">RSVP Page</h1>
      <p className="text-muted-foreground">{msg}</p>
      <Button
        className="bg-black hover:bg-blue-600 text-white cursor-pointer"
        onClick={() => (window.location.href = `/notifications`)}
        disabled={msg === "Checking your invite link..."}
      >
        Go to your invites
      </Button>
    </div>
  );
}
