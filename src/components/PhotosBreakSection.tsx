import { useRef, useEffect } from "react";

const photos = [
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
  "https://images.unsplash.com/photo-1496024840928-4c417adf211d",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
  "https://images.unsplash.com/photo-1496024840928-4c417adf211d"
];

export function PhotosBreakSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX } = e;
      const { width } = container.getBoundingClientRect();
      const normalizedPosition = (clientX / width) * 2 - 1; // -1 to 1
      const rotationAmount = normalizedPosition * 5; // Max 5 degrees rotation

      const photos = container.getElementsByClassName('photo-item');
      Array.from(photos).forEach((photo, index) => {
        const element = photo as HTMLElement;
        const baseRotation = index % 2 === 0 ? -2 : 2;
        element.style.transform = `rotate(${baseRotation + rotationAmount}deg)`;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full bg-[#09031e] py-16 md:py-32 overflow-hidden">
      <div 
        ref={containerRef}
        className="max-w-[1400px] mx-auto px-4 flex flex-nowrap gap-4 overflow-x-auto scrollbar-hide"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            className="photo-item relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 transition-transform duration-300"
            style={{
              transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg blur-xl"></div>
            <img
              src={photo}
              alt={`Party moment ${index + 1}`}
              className="relative w-full h-full object-cover rounded-lg border-4 border-white/10"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}