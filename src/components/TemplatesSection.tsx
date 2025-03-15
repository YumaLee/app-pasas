import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const templates = [
  {
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
    title: "Birthday parties",
    category: "🎈 Birthday"
  },
  {
    image: "https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4",
    title: "Casual hangs",
    category: "🎮 Game Night"
  },
  {
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
    title: "Sweater Weather",
    category: "🧥 Dinner Party"
  },
  {
    image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be",
    title: "Holidays",
    category: "❄️ Seasonal"
  }
];

export function TemplatesSection() {
  return (
    <div className="w-full bg-white py-16 md:py-32">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em]">
            Trending Templates
          </h2>
          <Button variant="link" className="text-neutral-500 hover:text-neutral-800">
            View all
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {templates.map((template, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm mb-2">
                          {template.category}
                        </span>
                        <h3 className="text-white text-xl font-bold">
                          {template.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
}