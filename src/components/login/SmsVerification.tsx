import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SmsSend } from "./SmsSend";
import verifyService from "@/shared/services/VerifyService";

const verificationSchema = z.object({
  verificationCode: z.string()
    .min(6, "El código de verificación debe tener 6 dígitos")
    .max(6, "El código de verificación debe tener 6 dígitos")
    .regex(/^\d+$/, "El código de verificación debe contener solo números"),
  telefono: z.string(),
});

type FormValues = z.infer<typeof verificationSchema>;

interface SmsVerificationProps {
  phone: string;
  loading: boolean;
  onResendCode: (data: any) => void;
}

export function SmsVerification({ phone, loading, onResendCode }: SmsVerificationProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [timer, setTimer] = useState(20); // Estado para el temporizador
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (timer === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Limpiamos el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [timer]);



  const form = useForm<FormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: "",
      telefono: phone
    }
  });

  const handleAgree = (data: FormValues) => {
    onResendCode(data)
  };

  const handleResend = () => {
    setShowAlert(true);
  };

  const handleSendCode = async (method: 'sms' | 'whatsapp') => {
    setIsLoading(true);
    if (method === 'sms') {
      var data = {
        telefono: phone,
        dispositivo: "",
        ip: "",
      };
      var response = await verifyService.sendSms(data);
      if (response.status === 200) {
        setShowAlert(false);
        setTimer(20);
      }
      setIsLoading(false);
    } else {
      //toast.success('whatsapp en desarrollo!')

      setIsLoading(false);

    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAgree)} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className='text-white/50'>Enviamos un código vía SMS al +{phone}</span>
              <span className="text-purple-400">✓</span>
            </div>
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Código de verificación"
                      maxLength={6}
                      className={`text-white/50 placeholder:text-white`}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                className={`text-sm text-white/50 ${timer > 0}`}
                onClick={handleResend}
                disabled={timer > 0}
              >
                ¿No has recibido tu código? <span className="text-red-500 font-semibold">Vuelve a enviarlo.</span> {timer}s
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <p className={`text-sm text-white/50`}>
              Al hacer clic en ACEPTO, aceptas nuestros{" "}
              <Button variant="link" className={`text-white/50 hover:text-white p-0 h-auto text-sm`}>
                Terminos
              </Button>{" "}
              Y{" "}
              <Button variant="link" className={`text-white/50 hover:text-white p-0 h-auto text-sm`}>
                política de privacidad
              </Button>{" "}
              y acepta recibir mensajes de texto de nosotros y de los anfitriones. Se aplican tarifas de mensajes y datos.
              Envía un mensaje con la palabra HELP para recibir ayuda y STOP para cancelar.
            </p>

            <Button
              type="submit"
              className="w-full bg-[#8B3DFF] hover:bg-[#9B4DFF] text-white h-12"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ...Cargando
                </>
              ) : (
                'Aceptar'
              )}

            </Button>
          </div>
        </form>
      </Form>

      <SmsSend
        loading={isLoading}
        open={showAlert}
        onOpenChange={setShowAlert}
        //phoneNumber={form.watch('telefono')}
        onSendCode={handleSendCode}
      />
    </>
  );
}