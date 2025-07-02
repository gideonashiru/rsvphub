
import { getCurrentUser } from "@/lib/actions/server-events";

export default async function Page() {
  const user = await getCurrentUser();
  return (
    <div className="p-10 space-y-4 mt-50">
      <h1 className="text-3xl font-bold">rsvp Page</h1>
      <h4 className="text-3xl font-bold">create react form to send invites through email in-app here</h4>
    </div>
  );
}
