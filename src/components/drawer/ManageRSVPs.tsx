import React from "react";

const ManageRSVPs: React.FC = () => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Opciones de RSVP <span className="ml-1 cursor-pointer" title="Guests will request to 'Get on the list'">❓</span></h2>
            </div>
            <label className="flex items-center justify-between">
                <span className="font-medium text-sm">Aceptar confirmaciones de asistencia</span>
                <input type="checkbox" className="form-toggle" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
                <div>
                    <div className="font-medium text-sm">Requerir la aprobación del huésped</div>
                    <div className="text-xs text-gray-500">Los invitados solicitarán "Inscribirse en la lista"</div>
                    <div className="text-xs text-gray-400">⚠ No compatible con Chip-in o Find a Time</div>
                </div>
                <input type="checkbox" className="form-toggle" defaultChecked />
            </label>
            <div className="text-sm text-gray-400">Capacidad máxima <span className="ml-2">Ninguno</span></div>
            <div className="text-xs text-gray-400">⚠ No compatible con la aprobación de invitados</div>
            <label className="flex items-center justify-between">
                <span className="font-medium text-sm">Habilitar lista de espera</span>
                <input type="checkbox" className="form-toggle" disabled />
            </label>
            <div className="text-sm font-medium">Más unos</div>
            <select className="border rounded px-2 py-1">
                <option>Hasta 1</option>
                <option>Hasta 2</option>
            </select>
            <div>
                <div className="text-sm font-medium">Invitación abierta</div>
                <div className="text-sm text-gray-400">Apagado</div>
            </div>
            <label className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-medium">Permitir a los invitados invitar a mutuas</div>
                    <div className="text-xs text-gray-400">⚠ No compatible cuando la lista de invitados está oculta</div>
                </div>
                <input type="checkbox" className="form-toggle" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-medium">Estilo del botón RSVP</div>
                    <div className="text-xs text-gray-400">⚠ No compatible con la aprobación de invitados</div>
                </div>
                <input type="checkbox" className="form-checkbox text-purple-500" defaultChecked />
            </label>
        </div>
    );
};

export default ManageRSVPs;