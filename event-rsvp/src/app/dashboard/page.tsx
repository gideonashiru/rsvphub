import Image from "next/image";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/threeD-card-import";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-center mt-40 mb-10">
        <h4 className="text-4xl font-bold text-center font-sans">
          Dashboard to change user profile and details
        </h4>
      </div>

      <CardContainer className="inter-var">
        <CardBody className="bg-card group/card rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            This page is under construction. Please check back later for
            updates.
          </CardItem>

          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="https://hfeexkyhshegrpuvvesj.supabase.co/storage/v1/object/public/event-cards//constrcn.avif"
              height="1000"
              width="1000"
              className="h-50 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="Dashboard Constuction Image"
              priority
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </>
  );
}
