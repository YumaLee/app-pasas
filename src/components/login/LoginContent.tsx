import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PhoneInput from 'react-phone-input-2';
import { SmsSend } from "@/components/login/SmsSend";
import { SmsVerification } from "@/components/login/SmsVerification";
import { FormUsuario } from "@/components/usuario/FormUsuario";
import { useAuthStore } from "@/store/authStore";

import 'react-phone-input-2/lib/style.css';
import toast, { Toaster } from 'react-hot-toast';

import userService from "@/shared/services/UserService";
import verifyService from "@/shared/services/VerifyService";


const phoneSchema = z.object({
  telefono: z.string().min(6, "Telefono Campo obligatorio.").refine((val) => {
    return /^\d{6,}$/.test(val);
  }, "Por favor, introduzca un número de teléfono válido"),
  dispositivo: z.string(),
  ip: z.string()
});

type FormValues = z.infer<typeof phoneSchema>;

export function LoginContent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showVerification, setShowVerification] = useState(false);


  const setProfile = useAuthStore((state) => state.login);

  const form = useForm<FormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      telefono: "",
      dispositivo: "MOVIL",
      ip: "1111111"
    }
  });

  const { formState: { errors } } = form;

  const handleContinue = () => {
    setShowSmsModal(true);
  };


  const handleSendCode = async (method: 'sms' | 'whatsapp') => {
    setIsLoading(true);
    if (method === 'sms') {
      var data = form.getValues();
      var response = await verifyService.sendSms(data);
      if (response.status === 200) {
        setShowSmsModal(false);
        setShowVerification(true);
      }
      setIsLoading(false);
    } else {
      toast.success('whatsapp en desarrollo!')

      setIsLoading(false);

    }
  };

  const handleResendCode = async (data: any) => {
    setIsLoading(true)

    var response = await verifyService.verificarSMs(data);
    console.log(response);

    setIsLoading(false);
    
    if (response.status === 200) {
      setShowVerification(false);
      var data = response.data;
      const now = new Date();
      var totalTimeOut = 60000 * 360;/* Milisegundos * minutos */
      data.expiry = now.getTime() + totalTimeOut;

      setProfile(data);
      if (!response.data.flagVerificado) {
        setIsFormVisible(true);
      } else {
        navigate('/events');
      }
    }
    if (response.status === 400) {

      setIsLoading(false);
      toast.error(<ul>{response.data.messages.map((item: any) => (<li>{item}</li>))}</ul>);


      return;
    }
    setIsLoading(false)

  };

  const handleSave = async (data: any) => {
    setIsLoading(true);
    var response = await userService.updateAuth(data);
    if (response.status === 200) {
      setIsFormVisible(false);
      navigate('/events');
    }
    setIsLoading(false);
  };

  return (
    <main className="max-w-md mx-auto pt-20 pb-12">
      <h1 className="text-3xl font-bold text-center mb-12 text-white">
        Iniciar sesión o registrarse
      </h1>

      <div className="space-y-6">
        {showVerification ?
          <SmsVerification
            loading={isLoading}
            timer={12}
            phone={form.watch('telefono')}
            onResendCode={handleResendCode}
            textColorClass="text-white/50"

          />
          :
          isFormVisible ?
            <FormUsuario
              loading={isLoading}
              phone={form.watch('telefono')}
              onResendCode={handleSave}
            />
            :
            (<form onSubmit={form.handleSubmit(handleContinue)} className="space-y-2">
              <div>
                <Label htmlFor="phone" className="text-white">Numero Telefono</Label>
                <PhoneInput
                  country={'pe'}
                  value={form.watch('telefono')}
                  onChange={(phone) => form.setValue('telefono', phone)}
                  inputClass="!w-full !h-12 !bg-white/10 !border-white/10 !text-white !pl-12"
                  containerClass="!bg-transparent"
                  buttonClass="!bg-white/10 !border-white/10 !border-r-0"
                  buttonStyle={{ backgroundColor: 'transparent' }}
                  dropdownClass="!bg-[#1A0505] !text-white"
                  searchClass="!bg-[#1A0505] !text-white"
                  enableSearch
                  searchPlaceholder="Search country..."
                  isValid={!errors.telefono}
                />
                {errors.telefono && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.telefono.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-purple-900 hover:bg-white/90 mt-6"
              >
                Continue
              </Button>

              <div className="text-center space-y-4">
                <p className="text-white/60 flex items-center gap-2 justify-center">
                  <span>😴</span> ¿Cansada de ser desconectada?
                </p>

              </div>
            </form>)
        }
      </div>

      <SmsSend
        loading={isLoading}
        open={showSmsModal}
        onOpenChange={setShowSmsModal}
        //phoneNumber={form.watch('telefono')}
        onSendCode={handleSendCode}
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </main>
  );
}