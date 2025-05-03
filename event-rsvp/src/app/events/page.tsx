import { Button } from "@/components/ui/button";
import { ButtonT } from "@/components/ui/buttontwo";
import { Events } from "@/components/Events"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evens | event rSvP",
  description:
    "rSvP description.",
};

export default function EventsPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-play mt-40 ">
        <h4 className="inline text-3xl font-bold ml-16">Events</h4>

        <ButtonT href="#" variant="dark" className="mr-16">
          Add Event
        </ButtonT>
      </div>
      <Events/>
    </>
  );
}
