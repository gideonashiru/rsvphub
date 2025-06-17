import EventsPage from "@/components/clientPages/Event-cpg";
import { getCurrentUser } from "@/lib/actions/server-events";


export default async function Page() {
  const user = await getCurrentUser();

  // console.log("Current user:", user);
  return <EventsPage user={user} />;
}