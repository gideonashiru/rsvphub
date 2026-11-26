"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!autoplay || testimonials.length < 2) return;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [autoplay, testimonials.length]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[active % testimonials.length];

  const showPrevious = () => {
    setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-3xl">
          <Image
            src={testimonial.src}
            alt={testimonial.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            draggable={false}
            className="object-cover object-center"
          />
        </div>

        <div
          aria-live="polite"
          className="flex min-h-64 flex-col justify-between py-4"
        >
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Step {active % testimonials.length + 1} of {testimonials.length}
            </p>
            <h3 className="text-2xl font-bold text-foreground">
              {testimonial.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonial.designation}
            </p>
            <p className="mt-6 text-lg text-muted-foreground">
              {testimonial.quote}
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={showPrevious}
              disabled={testimonials.length < 2}
              aria-label="Previous step"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent disabled:opacity-50"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              disabled={testimonials.length < 2}
              aria-label="Next step"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent disabled:opacity-50"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
