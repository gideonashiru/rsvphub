import EventsPage from "@/components/clientPages/Event-cpg";
import { getCurrentUser } from "@/lib/actions/server-events";


export default async function Page() {
  const user = await getCurrentUser();

  return (
    <>
      <EventsPage user={user} />
      
    </>
  );
}
