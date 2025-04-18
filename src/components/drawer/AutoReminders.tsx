import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Info } from 'lucide-react';

const AutoReminders = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">Recordatorios automáticos</h2>
                    <Info className="w-4 h-4 text-muted-foreground" />
                </div>
                <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>

            <p className="text-sm text-muted-foreground">
                Habilite recordatorios automáticos por SMS para sus invitados
            </p>

            <hr />

            <div>
                <h3 className="text-sm font-medium">Recordatorios para confirmar asistencia</h3>
                <p className="text-sm text-muted-foreground">
                    Enviado a <span className="text-black dark:text-white">Invitada, tal vez</span>
                </p>
                <p className="text-xs text-muted-foreground uppercase">
                    Programado 2 semanas, 1 semana y 1 día antes del evento.
                </p>
            </div>

            <div>
                <h3 className="text-sm font-medium">Recordatorios de eventos</h3>
                <p className="text-sm text-muted-foreground">
                    Enviado a <span className="text-black dark:text-white">Iré</span>
                </p>
                <p className="text-xs text-muted-foreground uppercase">
                    Programado 24 horas y 2 horas antes del evento.
                </p>
            </div>

            <div className="rounded-md bg-muted/40 p-3 text-sm text-muted-foreground text-center">
                Preguntas?{' '}
                <a href="#" className="font-medium underline underline-offset-2">
                    Consulta nuestras preguntas frecuentes FAQ ↗
                </a>
            </div>
        </div>
    );
};

export default AutoReminders;
