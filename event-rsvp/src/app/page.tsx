/* eslint-disable @next/next/no-img-element */
"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export default function Home() {
  function handleClick() {
    return toast("You made it", {
      description: <span className="text-black">mane im dead!</span>,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }
  return (
    <div>
      {/* <Button className="" variant="outline" onClick={handleClick}>
        click me
      </Button> */}

      <section className="relative py-32 bg-white overflow-hidden">
        <img
          className="absolute left-0 top-0 h-full w-full"
          src="flaro-assets/images/features/elipse.svg"
          alt=""
        />
        <div className="container px-4 mx-auto relative">
          <div className="flex flex-wrap items-center -m-8">
            <div className="w-full md:w-1/2 p-8">
              <h2 className="mb-6 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight">
                Enhance event experiences with RSVP Event Management
              </h2>
              <p className="font-sans text-lg text-gray-900 leading-relaxed md:max-w-lg">
                Create seamless engagements and track your RSVPs effortlessly.
                Experience the ease of managing events with us.
              </p>
            </div>
            <div className="w-full md:w-1/2 p-8">
              <img
                className="w-full max-w-xl transform hover:-translate-y-16 transition ease-in-out duration-1000 rounded-2xl"
                src="https://images.unsplash.com/photo-1525373612132-b3e820b87cea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzIzMzB8MHwxfHNlYXJjaHwyfHxldmVudCUyMG9yZ2FuaXphdGlvbnxlbnwwfDJ8fHwxNzQ2Njc3MDc2fDA&ixlib=rb-4.1.0&q=80&w=608&h=644"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-white bg-no-repeat bg-center bg-cover bg-fixed overflow-hidden"
        style={{ backgroundImage: 'url("flaro-assets/images/cta/bg.jpeg")' }}
      >
        <div
          className="py-40 bg-black bg-opacity-60"
          style={{ backdropFilter: "blur(12px)" }}
        >
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <p className="mb-9 font-sans text-sm text-white font-semibold uppercase tracking-px">
                👋 Discover RSVP Event Management
              </p>
              <h2 className="mb-11 text-6xl md:text-8xl xl:text-10xl text-white font-bold text-center tracking-px-n leading-none">
                Join our community &amp; elevate your event planning
              </h2>
              <div className="md:inline-block">
                <button
                  className="py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                  type="button"
                >
                  Begin Your 14-Day Free Trial Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer/>
    </div>
  );
}
