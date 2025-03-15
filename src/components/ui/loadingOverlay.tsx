import { Loader2 } from "lucide-react";
export default function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <Loader2 className="w-12 h-12 animate-spin text-white" />
        <p className="text-white mt-4">Cargando...</p>
      </div>
    </div>
  );
}

