
// components/ManageHosts.tsx
import { FC } from "react";
import { Info } from "lucide-react";

const ManageHosts: FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold flex items-center gap-2">
      Administrar hosts <Info className="w-4 h-4 text-gray-500" />
      </h2>
      <p className="mt-2 text-gray-600">
      Los anfitriones pueden editar y administrar este evento, 
      incluso agregar o eliminar otros coanfitriones.
      </p>

      <div className="mt-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-pink-400 text-white flex items-center justify-center rounded-full text-sm font-semibold">
          YN
        </div>
        <div>
          <p className="font-medium">Your Name</p>
          <span className="text-sm text-gray-500">Creador</span>
        </div>
      </div>

      <button className="mt-4 px-4 py-2 bg-black text-white rounded-md">Agregar coanfitrión</button>

      <div className="mt-6 border-t pt-4">
        <p className="text-gray-500 text-sm">Agregar cohost mediante enlace</p>
        <p className="text-gray-400 text-xs">Cualquier persona con el enlace puede convertirse en anfitrión.</p>
        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" disabled className="cursor-not-allowed" />
          <span className="text-xs text-gray-400">Guardar evento para habilitar compartir enlaces</span>
        </div>
      </div>
    </div>
  );
};

export default ManageHosts;