import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircleIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Button } from '../ui/button';
export default function PaymentSuccess() {

  const navigate = useNavigate();

  useEffect(() => {
    // Efecto de fuegos artificiales al cargar el componente
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 100 * (timeLeft / duration);
      confetti({
        particleCount: particleCount,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        spread: 800
      });
    }, 250);
  }, []);


  const onNavigate = async () => {
    navigate('/events');
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-800 p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <CheckCircleIcon className="w-20 h-20 text-green-600 mb-4" />
      </motion.div>

      <h1 className="text-4xl font-bold mb-2 text-center">¡Pago exitoso!</h1>
      <p className="text-lg text-center max-w-md mb-6">
        Gracias por tu compra. Hemos recibido tu pago correctamente.
      </p>

      <Button
        onClick={onNavigate}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition"
      >
        Volver al inicio
      </Button>
    </motion.div>
  );
}
