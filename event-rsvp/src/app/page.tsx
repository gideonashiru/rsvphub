"use client";

import {toast} from "sonner";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      {" "}
      <h1>Hello</h1>
      <Button className= ""
      variant="outline"
      onClick={() =>
        toast("You made it", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      clickk me
    </Button>
    </div>
  );
}
