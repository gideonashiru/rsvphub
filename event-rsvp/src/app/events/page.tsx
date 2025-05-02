import { Button } from "@/components/ui/button";
import { ButtonT } from "@/components/ui/buttontwo";


export default function EventsPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-play mt-40 ">
        <h4 className="inline text-3xl font-bold ml-16">Events</h4>

        <ButtonT href="#" variant="dark" className="mr-16">
          Add Event
        </ButtonT>
      </div>

      {/* //List of events */}
      <div className="inline-flex flex-col ml-15 w-190">
       
          </div>
    </>
  );
}
