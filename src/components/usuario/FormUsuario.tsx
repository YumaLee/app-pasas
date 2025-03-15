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

const formSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  apellido: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
  correo: z.string().email("Ingrese un correo electrónico válido").optional().or(z.literal("")),
  telefono: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface IdataUsuario {
  phone: string;
  loading: boolean;
  onResendCode: (data: any) => void;
}

export function FormUsuario({ phone, loading, onResendCode }: IdataUsuario) {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      correo: "",
      telefono: phone,
    },
    mode: "onChange" // Enable real-time validation

  });

  const onSubmit = (data: FormValues) => {
    onResendCode(data)
  };

  const isValid = form.formState.isValid;


  return (

    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormControl className="hidden">
                  <Input
                    {...field}
                    placeholder="telefono"
                    className="h-12 bg-white/10 border-white/5 text-white placeholder:text-white/50"
                    type="hidden"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Nombre"
                    className="h-12 bg-white/5 border-white/5 text-white placeholder:text-white/50"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Apellido"
                    className="h-12 bg-white/10 border-white/5 text-white placeholder:text-white/50"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Correo (opcional)"
                    className="h-12 bg-white/10 border-white/5 text-white placeholder:text-white/50"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />


          <Button
            type="submit"
            disabled={!isValid || loading}
            className="w-full bg-[#8B3DFF] hover:bg-[#9B4DFF] text-white h-12 mt-8"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Continuar
              </>
            ) : (
              'ENVIAR SMS'
            )}

          </Button>
        </form>
      </Form>
    </>
  );
}