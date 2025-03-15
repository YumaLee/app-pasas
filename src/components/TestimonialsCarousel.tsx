import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface Testimonial {
  logo: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/WSJ_Logo.svg",
    quote: "Evites are so last decade"
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/WSJ_Logo.svg",
    quote: "This is where my social calendar exists"
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/WSJ_Logo.svg",
    quote: "Partiful is a mainstay of my social life"
  }
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
    <div className="w-full overflow-hidden bg-gradient-to-r from-[#7226ff] to-[#f042ff] py-20">
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