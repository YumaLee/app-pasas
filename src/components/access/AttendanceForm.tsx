import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from 'react-hot-toast';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import PhoneInput from "react-phone-input-2";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import verifyService from "@/shared/services/VerifyService";
import { SmsVerification } from "../login/SmsVerification";
import 'react-phone-input-2/lib/style.css';
import { useAuthStore } from "@/store/authStore";
import { useEventoPayStore } from "@/store/eventoPaymentStore";


type RsvpType = 'going' | 'maybe' | 'cant';
interface RsvpOption {
  type: RsvpType;
  label: string;
  color: string;
  icon: string;
}

const rsvpOptions: RsvpOption[] = [
  { type: 'going', label: 'Going', color: 'bg-purple-500', icon: '🍆' },
  { type: 'maybe', label: 'Maybe', color: 'bg-orange-500', icon: '😏' },
  { type: 'cant', label: "Can't Go", color: 'bg-neutral-700', icon: '👻' }
];

interface ActionButtonsProps {
  open: boolean;
  onClose: () => void;
  selectedIcon: any;
  dataItem: any;
}

const phoneSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  telefono: z.string().min(6, "Telefono Campo obligatorio.").refine((val) => {
    return /^\d{6,}$/.test(val);
  }, "Por favor, introduzca un número de teléfono válido"),
  dispositivo: z.string(),
  ip: z.string(),
  invitadoAdicional: z.string().optional(),
  comentario: z.string().optional(),
  idEvento: z.coerce.number().optional(),
  tipoAsistencia: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof phoneSchema>;

export default function AttendanceForm({
  onClose,
  open,
  selectedIcon,
  dataItem
}: ActionButtonsProps) {
  const [attendance, setAttendance] = useState("going");
  const [openAtt, setOpenAtt] = useState(true);
  const [openMessage, setOpenMessage] = useState(false);
  const [openCode, setOpenCode] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const setProfile = useAuthStore((state) => state.login);
  const { settingPayment } = useEventoPayStore((state) => state);

  const form = useForm<FormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      telefono: "",
      nombre: "",
      dispositivo: "MOVIL",
      ip: "",
      invitadoAdicional: undefined,
      comentario: "",
    }
  });

  const handleMessage = async (method: 'sms' | 'whatsapp') => {
    setIsLoading(true);
    const type = attendance == "going" ? 1 : attendance == "maybe" ? 2 : 3;

    if (method === 'sms') {
      var data = form.getValues();
      data.idEvento = dataItem.id;
      data.tipoAsistencia = type;

      var response = await verifyService.sendAttendanceSms(data);
      if (response.status === 200) {
        toast.success('Acceso Exitosamente!')

        setOpenMessage(false);
        setOpenCode(true);
      }
    } else {
      toast.error('whatsapp esta desarrollo!')

    }
    setIsLoading(false);
  };


  const handleResendCode = async (data: any) => {
    setIsLoading(true)

    var response = await verifyService.verificarSMs(data);
    if (response.status === 200) {
      setOpenCode(false);
      var data = response.data;
      const now = new Date();
      var totalTimeOut = 60000 * 360;
      data.expiry = now.getTime() + totalTimeOut;
      setProfile(data);

      if (dataItem.isPaid) {
        settingPayment({ isPaid: true, wasPaid: false })
      } else {
        settingPayment({ isPaid: false, wasPaid: false })
      }
    }
    if (response.status === 400) {
      return;
    }
    setIsLoading(false)

  };


  const handleClose = (open: any) => {
    if (openCode) {
      setOpenMessage(true);
      setOpenCode(false);
    } else {
      if (openMessage) {
        setOpenMessage(false);
        setOpenCode(false);
        setOpenAtt(true)
      } else {
        onClose();
      }
    }
  };

  const handleContinue = () => {
    setOpenMessage(true);
    setOpenCode(false);
    setOpenAtt(false)
  };


  const handleCancel = () => {
    form.reset();
    onClose();
  };





  return (

    <Dialog open={open} onOpenChange={handleClose} >
      <DialogTitle></DialogTitle>
      <DialogContent >
        <div className="max-w-xl mx-auto rounded-xl p-6 bg-white/80 backdrop-blur-md shadow-lg space-y-6">

          {openAtt ?
            <>
              <div className="flex justify-center gap-8 mb-8">
                {rsvpOptions.map((option, index) => (
                  <div
                    key={option.type}
                    className={`flex flex-col items-center gap-2 cursor-pointer ${attendance === option.type ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'
                      }`}
                    onClick={() => setAttendance(option.type)}
                  >
                    <div
                      className={`w-20 h-20 rounded-full transition-all duration-200 ${option.type === attendance ? option.color : 'bg-neutral-800'
                        } flex items-center justify-center`}
                    >
                      <span className="text-4xl">{selectedIcon[index]}</span>
                    </div>
                    <span className="text-clip">{option.label}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={form.handleSubmit(handleContinue)} className="space-y-2">

                <Input
                  placeholder="Nombres"
                  autoComplete="off"
                  {...form.register("nombre")}
                />
                {form.formState.errors.nombre && (
                  <p className="text-xs text-red-500">{form.formState.errors.nombre.message}</p>
                )}

                <div className="flex gap-2">
                  <div className="flex-1 flex gap-1">
                    <div>
                      <PhoneInput
                        country={'pe'}
                        value={form.watch('telefono')}
                        onChange={(phone) => form.setValue('telefono', phone)}
                        inputClass="!w-full !h-12 !bg-black/10 !border-black/10 !text-black !pl-12"
                        containerClass="!bg-transparent"
                        buttonClass="!bg-black/10 !border-black/10 !border-r-0"
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        dropdownClass="!bg-[#1A0505] !text-black"
                        searchClass="!bg-[#1A0505] !text-black"
                        enableSearch
                        searchPlaceholder="Search country..."
                      />
                      {form.formState.errors.telefono && (
                        <p className="text-xs text-red-500">{form.formState.errors.telefono.message}</p>
                      )}
                    </div>

                  </div>

                  {attendance !== "cant" ?
                    <div>
                      <Select
                        value={form.watch("invitadoAdicional")}
                        onValueChange={(value) => form.setValue("invitadoAdicional", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="asistentes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 asistente</SelectItem>
                          <SelectItem value="2">2 asistentes</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.invitadoAdicional && (
                        <p className="text-xs text-red-500">{form.formState.errors.invitadoAdicional.message}</p>
                      )}
                    </div>
                    : null}

                </div>

                <p className="text-xs text-gray-500">Solo para actualizaciones de eventos. Sin spam.</p>

                <Textarea
                  placeholder="Comentario"
                  autoComplete="off"
                  {...form.register("comentario")}
                />
                <div className="flex justify-end gap-2">
                  <Button onClick={handleCancel} variant="outline">Cancel</Button>
                  <Button type="submit">Continue</Button>
                </div>
              </form>

            </>
            : null}

          {openMessage ?
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold">Obtenga su código</h2>
              <p className="text-gray-600 text-sm">
                Elige recibir notificaciones de Partiful por SMS o WhatsApp
              </p>

              <div className="border p-4 rounded-md bg-green-50 text-green-700 flex items-center justify-center gap-3">
                <Check className="w-6 h-6 text-green-600" />
                <span>¡Operación exitosa!</span>
                <img src="https://www.cloudflare.com/img/logo-cloudflare-dark.svg" alt="Cloudflare" className="h-6 ml-auto" />
              </div>

              <p className="text-sm text-gray-500">
                Teniendo problemas?{" "}
                <a href="#" className="text-blue-600 underline">
                  Más información
                </a>
              </p>


              <div className="space-y-3">
                <Button
                  className="w-full bg-[#6B46C1] hover:bg-[#5936a3] text-white"
                  onClick={() => handleMessage('whatsapp')}
                >
                  <span className="mr-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>

                  {
                    isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Cargando</> : 'ENVIAR WHATSAPP'
                  }
                </Button>
                <Button className="w-full bg-gray-300 text-gray-600"

                  onClick={() => handleMessage('sms')}
                >
                  {
                    isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Cargando </> : '💬ENVIAR SMS'
                  }

                </Button>
              </div>
            </div>
            : null}

          {openCode ?
            <div>
              <SmsVerification
                loading={isLoading}
                timer={12}
                phone={form.watch('telefono')}
                onResendCode={handleResendCode}
                textColorClass="text-black/50"
              />
            </div>
            : null

          }
        </div>
      </DialogContent>
    </Dialog>

  );
}
