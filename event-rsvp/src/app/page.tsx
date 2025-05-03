"use client";

import {toast} from "sonner";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      {" "}

      <Button className= ""
      variant="outline"
      onClick={() =>
        toast("You made it", {
          description: (
            <span className="text-black">
              mane im dead!
            </span>
          ),
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
