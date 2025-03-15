import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const posters = [
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    title: "Dance Party"
  },
  {
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    title: "Game Night"
  },
  {
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
    title: "Dinner Party"
  },
  {
    url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
    title: "Poker Night"
  },
  {
    url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    title: "Tailgate"
  },
  {
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176",
    title: "Rock Climbing"
  }
];

export function PostersSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateRotation = () => {
      const cards = container.getElementsByClassName('poster-card');
      const isMobile = window.innerWidth < 768;
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
      const radius = isMobile ? Math.min(centerX, centerY) * 0.8 : Math.min(centerX, centerY) * 0.6;
      let angle = 0;

      const rotateCards = () => {
        angle += 0.5;
        for (let i = 0; i < cards.length; i++) {
          const card = cards[i] as HTMLElement;
          const cardAngle = angle + (i * (360 / cards.length));
          const radians = (cardAngle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(radians) - card.offsetWidth / 2;
          const y = centerY + radius * Math.sin(radians) - card.offsetHeight / 2;
          
          card.style.transform = `translate(${x}px, ${y}px) rotate(${cardAngle}deg)`;
        }
        requestAnimationFrame(rotateCards);
      };

      return requestAnimationFrame(rotateCards);
    };

    let animationFrame = updateRotation();

    const handleResize = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = updateRotation();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-purple-50 to-white py-16 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] mb-4">
            For every occasion, every vibe 🎉
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 mb-8">
            No more boring invitations
          </p>
          <Button className="bg-gradient-to-r from-[#7226ff] to-[#f042ff] text-white hover:opacity-90 h-12 px-6 font-medium">
            Get the app
          </Button>
        </div>

        <div 
          ref={containerRef} 
          className="relative h-[400px] md:h-[600px] mt-8 md:mt-16"
        >
          {posters.map((poster, index) => (
            <div
              key={index}
              className="poster-card absolute w-48 md:w-64 h-72 md:h-96 transition-transform duration-1000"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl transform-gpu hover:scale-105 transition-transform">
                <img
                  src={poster.url}
                  alt={poster.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-white text-lg md:text-xl font-bold">{poster.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}