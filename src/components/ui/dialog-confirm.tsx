import { motion, AnimatePresence } from "framer-motion";

interface DialogDefaultProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

const DialogDefault: React.FC<DialogDefaultProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "este elemento",
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full mx-4 sm:max-w-md text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            ¿Seguro que quieres eliminar {itemName}?
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Esta acción no se puede deshacer.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              onClick={onConfirm}
            >
              Eliminar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DialogDefault;
