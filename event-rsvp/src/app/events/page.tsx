
import { Button } from "@/components/ui/button";
import { ButtonT } from "@/components/ui/buttontwo";
import { Events } from "@/components/Events"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | event rSvP",
  description:
    "rSvP description.",
};

export default function EventsPage() {

  // function addEvent(){

  // }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-play mt-40 ">
        <h4 className="inline text-3xl font-montserrat ml-16">EVENTS</h4>

        <ButtonT href="#" variant="dark" className="font-play mr-16 hover:scale-105" >
          ADD EVENT
        </ButtonT>
      </div>
      <Events/>
    </>
  );
}
