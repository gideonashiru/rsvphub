import { EditEventForm } from "@/components/EditEventForm";
import { getCurrentUser } from "@/lib/actions/server-events";

export default async function EditEventPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>You must be logged in to edit an event.</div>;
  }
   
  return (
    <div className="max-w-2xl mx-auto mt-40 mb-8 border rounded-2xl p-6 shadow-lg bg-card text-card-foreground">
      <EditEventForm user={ user } />
    </div>
  );
}

