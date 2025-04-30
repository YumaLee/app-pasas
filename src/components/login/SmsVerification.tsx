import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

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
  timer: number;
  loading: boolean;
  onResendCode: (data: any) => void;
  textColorClass?: string; // clase opcional

}

export function SmsVerification({ phone, loading, timer, onResendCode, textColorClass }: SmsVerificationProps) {
  const [showAlert, setShowAlert] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: "",
      telefono: phone
    }
  });

  const handleAgree = (data: FormValues) => {
    console.log("Verification code:", data);
    onResendCode(data)
  };

  const handleResend = () => {

    setShowAlert(true);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAgree)} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={` ${textColorClass}`}>Enviamos un código vía SMS al +{phone}</span>
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
                      className={`${textColorClass} placeholder:text-white`}
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
                className={`text-sm  ${textColorClass}`}
                onClick={handleResend}
                disabled={timer > 0}
              >
                ¿No has recibido tu código? Vuelve a enviarlo. {timer}s
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <p className={`text-sm ${textColorClass}`}>
              Al hacer clic en ACEPTO, aceptas nuestros{" "}
              <Button variant="link" className={`${textColorClass} hover:text-white p-0 h-auto text-sm`}>
                Terminos
              </Button>{" "}
              Y{" "}
              <Button variant="link" className={`${textColorClass} hover:text-white p-0 h-auto text-sm`}>
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
                'I AGREE'
              )}

            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-[#1A0505] text-white border-neutral-800">
          <AlertDialogHeader>
            <AlertDialogTitle>En Desarrollo</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Esta funcionalidad está actualmente en desarrollo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowAlert(false)}
              className="bg-[#8B3DFF] hover:bg-[#9B4DFF] text-white"
            >
              Entendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}