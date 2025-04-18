import { ChangeEvent, useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { usePrivacyStore } from '@/store/privaceStore';
import toast, { Toaster } from 'react-hot-toast';

const DisplayPrivacy = () => {

  const { privacy, settingPrivacy } = usePrivacyStore((state) => state);



  const [showTimestamps, setShowTimestamps] = useState(true);
  const [showGuestNames, setShowGuestNames] = useState(true);
  const [showGuestCount, setShowGuestCount] = useState(true);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (privacy) {
      setShowTimestamps(privacy.showTimestamps);
      setShowGuestNames(privacy.showGuestNames);
      setShowGuestCount(privacy.showNumberGuests);
      setUsePassword(privacy.eventPassword);
      setPassword(privacy.password!);

    }
  }, [privacy]);


  const handleTimestampChange = (checked: boolean) => {
    setShowTimestamps(checked);
    settingPrivacy({ ...privacy, showTimestamps: checked });
  };

  const handleGuestNamesChange = (checked: boolean) => {
    setShowGuestNames(checked);
    settingPrivacy({ ...privacy, showGuestNames: checked });
  };

  const handleGuestCountChange = (checked: boolean) => {
    setShowGuestCount(checked);
    settingPrivacy({ ...privacy, showNumberGuests: checked });
  };

  const handleUsePasswordChange = (checked: boolean) => {
    setUsePassword(checked);
    settingPrivacy({ ...privacy, eventPassword: checked, password: checked ? password : null });
    if (checked) {
      toast.error('Ingrese Password!', {
        icon: '👏',
      })
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    settingPrivacy({ ...privacy, password: newPassword });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Pantalla y privacidad <span className="text-sm text-muted-foreground">🛈</span></h2>
        <p className="text-sm text-muted-foreground">
          La lista de invitados y el canal de actividades están ocultos antes de confirmar asistencia.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Mostrar marcas de tiempo en el feed de actividades</span>
          <Switch checked={showTimestamps}
            onCheckedChange={handleTimestampChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Mostrar nombres de invitados</span>
          <Switch checked={showGuestNames} onCheckedChange={handleGuestNamesChange} />
        </div>

        <div className="flex items-center justify-between">
          <span>Mostrar número de invitados</span>
          <Switch checked={showGuestCount} onCheckedChange={handleGuestCountChange} />
        </div>

        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span>Contraseña del evento</span>
              <Switch checked={usePassword} onCheckedChange={handleUsePasswordChange} />
            </div>

            {usePassword && (
              <div className="mt-2 relative">
                <Input
                  placeholder="Establecer una contraseña"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pr-14"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  No se permiten espacios, sensible a mayúsculas y minúsculas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-md bg-muted text-center">
        <p className="text-sm text-muted-foreground mb-1">¿Quieres controlar quién puede confirmar asistencia?</p>
        <button className="font-semibold underline underline-offset-2 text-sm">
          Activar la aprobación de invitados
        </button>
      </div>


      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </div>
  );
};

export default DisplayPrivacy;
