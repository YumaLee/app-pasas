import { motion } from 'framer-motion';
import { XCircleIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Button } from '../ui/button';

export default function PaymentError() {

  const navigate = useNavigate();

  const onNavigate = async () => {
    navigate('/events');
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <XCircleIcon className="w-20 h-20 text-red-600 mb-4" />
      </motion.div>

      <h1 className="text-4xl font-bold mb-2 text-center">¡Algo salió mal!</h1>
      <p className="text-lg text-center max-w-md mb-6">
        No se pudo procesar tu pago. Por favor, verifica tu método de pago o intenta nuevamente.
      </p>

      <Button
        onClick={onNavigate}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition"
      >
        Volver al inicio
      </Button>
    </motion.div>
  );
}
