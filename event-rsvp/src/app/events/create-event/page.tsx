import { EventForm } from "@/components/EventForm";
import { getCurrentUser } from "@/lib/actions/server-events";


export default async function CreateEvent() {
  const user = await getCurrentUser();
    if (!user) {
    return (
      <main className="max-w-2xl mx-auto mt-40 mb-8 border rounded-2xl p-6 shadow-lg bg-white">
        <article className="prose">
          <h1 className="text-2xl font-bold mb-4">Event Builder</h1>
          <p className="text-lg mb-4 text-red-600">
            You must be logged in to create an event.
          </p>
        </article>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto mt-40 mb-8 border rounded-2xl p-6 shadow-lg bg-white">
      <article className="prose">
        <h1 className="text-2xl font-bold mb-4">Event Builder</h1>
        <h3 className="text-lg mb-4">
          Create your event here and share it. You can also invite others to
          join your event.
        </h3>
        <EventForm user = {user}/>
      </article>
    </main>
  );
}
