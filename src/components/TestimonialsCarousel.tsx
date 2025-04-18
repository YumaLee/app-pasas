import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface Testimonial {
  logo: string;
  quote: string;
}

const testimonials: Testimonial[] = [



];

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div >
      <div 
        ref={scrollRef}
        className="flex gap-16 whitespace-nowrap overflow-x-hidden"
      >
        {/* Double the testimonials for seamless loop */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <Card
            key={index}
            className="inline-flex flex-col items-center justify-center p-8 min-w-[400px] bg-white/50 backdrop-blur-sm border-0"
          >
            <img 
              src={testimonial.logo} 
              alt="Publication Logo" 
              className="h-8 mb-6 object-contain"
            />
            <p className="text-1xl font-medium text-neutral-600">
              "{testimonial.quote}"
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}