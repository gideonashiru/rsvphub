import { getEventBySlug } from "@/lib/actions/client-events"; 
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: { slug: string } }) {
//   const event = await getEventBySlug(params.slug);

//   if (!event) {
//     notFound(); // Optional: show 404 page
//   }

  return (
    <div>
      <h1>Edit: this dih </h1>
      {/* Pass event to your form/component */}
    </div>
  );
}
