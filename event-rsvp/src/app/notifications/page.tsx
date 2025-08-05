import NotisPage from "@/components/clientPages/Notis-cpg";

import { getCurrentUser } from "@/lib/actions/server-events";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    // You can render a fallback UI or redirect as needed
    return null;
  }
  return (
    <>
      <main>
        <NotisPage user={user} />
      </main>
    </>
  );
}
