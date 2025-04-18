import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
    onBlastClick: () => void;
}
const AccessOverlay = ({ onBlastClick }: ActionButtonsProps) => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="bg-white/90 rounded-2xl p-6 text-center max-w-sm shadow-xl border">
                <Lock className="mx-auto mb-4 w-8 h-8 text-black" />
                <h2 className="text-lg font-semibold">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full mr-2">
                        RSVP
                    </span>
                    Acceso restringido
                </h2>
                <p className="text-sm text-gray-600 mt-2 mb-4">
                    Solo los invitados que hayan confirmado su asistencia pueden ver la actividad del evento y quién asistirá.
                </p>
                <Button
                    className="w-full mb-2"
                    onClick={onBlastClick}

                >RSVP para acceder
                </Button>
                <p className="text-xs text-gray-500">
                    ❓ ¿No estás seguro de si irás? Elige <span className="font-medium">"Tal vez"</span>
                </p>
            </div>
        </div>
    );
};

export default AccessOverlay;
