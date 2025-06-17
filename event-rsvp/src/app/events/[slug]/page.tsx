import EventSlugContent  from "@/components/clientPages/EventSlug-cpg";
import { getCurrentUser } from "@/lib/actions/server-events";


export default async function Page() {
  const user = await getCurrentUser();

  // console.log("Current user:", user);
  return <EventSlugContent user={user} />;
}

