import { InviteClient } from "@/components/clientPages/InviteClient";
import { getCurrentUser } from "@/lib/actions/server-events";

export default async function Page() {
  const user = await getCurrentUser();
  return <InviteClient user={user} />;
}
//done