
import { useAnimationStore } from "@/store/animationStore";


const petals = new Array(20).fill(null); // Puedes ajustar la cantidad

const FloatingPetals = () => {
  const { animationStore } = useAnimationStore((state) => state);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
      {petals.map((_, i) => (
        <span
          key={i}
          className={`absolute w-6 h-6 text-pink-400 text-2xl animate-petal-float`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            fontSize: `${Math.random() * 1.5 + 4}rem`,
          }}
        >
          {animationStore.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingPetals;
