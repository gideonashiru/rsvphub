import EventSlugContent  from "@/components/clientPages/SingleEvent_cpg";
import { getCurrentUser } from "@/lib/actions/server-events";


export default async function Page() {
  const user = await getCurrentUser();

  return <EventSlugContent user={user} />;
}

