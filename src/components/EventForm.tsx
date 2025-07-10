import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Users, MapPin, DollarSign, Save, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatISO } from "date-fns";
import { QuickActionPopover } from "@/components/QuickActionPopover";
import { useAuthStore } from "@/store/authStore";
import { DateRange, DateRangePicker } from "@/components/ui/datepicker"
import { usePaymentStore } from "@/store/settingPayment";
import { usePrivacyStore } from "@/store/privaceStore";
import toast, { Toaster } from 'react-hot-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { EventPreview } from "@/components/EventPreview";
import { ImagePicker } from "@/components/ImagePicker";
import { PullGuest } from "@/components/PullGuest";

import eventoService from "@/shared/services/EventoService";
import { AutocompleteGoogle } from "./maps/AutocompleteGoogle";
import { EmojiModal } from "./EmojiModal";
import { useEventosStore } from "@/store/useEventosStore";

const fontStyles = ["Classic", "Eclectic", "Fancy", "Simple"] as const;

const formSchema = z.object({
  isEdit: z.boolean().optional(),
  anfitrionID: z.number(),
  titulo: z.string().min(1, "El nombre del evento es requerido"),
  tipoFuente: z.enum(fontStyles).optional(),
  dateRange: z.object({ from: z.date(), to: z.date(), }).optional(),
  fechaStart: z.string().optional(),
  fechaEnd: z.string().optional(),
  idTipoMoneda: z.number().optional(),
  host: z.string().optional(),
  imagenUrl: z.string().optional(),
  ubicacion: z.string().nullable().optional(),
  refDireccion: z.string().nullable().optional(),
  capacidadMaxima: z.preprocess((value) => { if (value === "") return 0; return Number(value); }, z.union([z.number().int().nonnegative(), z.nan()]).optional()),
  precio: z.coerce.number().optional(),
  descripcion: z.string().optional(),
  iconRsvp: z.number().optional(),
  jsonPrivacy: z.string().nullable().optional(),
  codigo: z.string().optional(),
  mostrarMarcaTiempo: z.boolean().optional(),
  mostrarNombreInvitado: z.boolean().optional(),
  mostrarNumeroInvitado: z.boolean().optional(),
  password: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  onSettingsClick: () => void;
  eventData?: Partial<FormValues>;

}

const getFontStyle = (font: string) => {
  switch (font) {
    case "Classic":
      return "font-serif";
    case "Eclectic":
      return "font-mono";
    case "Fancy":
      return "font-cursive";
    case "Simple":
      return "font-sans";
    default:
      return "font-sans";
  }
};

function EventForm({ onSettingsClick, eventData }: EventFormProps) {
  const [selectedImage, setSelectedImage] = useState("https://images.pexels.com/photos/1317365/pexels-photo-1317365.jpeg");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showPullGuest, setShowPullGuest] = useState(false);
  const _profile = useAuthStore((state) => state.profile);
  const [emojiModal, setEmojiModal] = useState(false);
  const { resetPayment, payment } = usePaymentStore((state) => state);
  const { resetPrivacy, privacy } = usePrivacyStore((state) => state);

  const [dateValue, setDateValue] = React.useState<DateRange | undefined>(undefined)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isEdit: false,
      anfitrionID: _profile?.id,
      titulo: "",
      tipoFuente: "Classic",
      dateRange: undefined,
      fechaStart: "",
      fechaEnd: "",
      host: _profile?.nombre,
      imagenUrl: "https://images.pexels.com/photos/1317365/pexels-photo-1317365.jpeg",
      ubicacion: "",
      refDireccion: "",
      capacidadMaxima: 0,
      precio: 0,
      iconRsvp: 1,
      descripcion: "",
      password: null,
      ...eventData,

    },
    mode: "onChange"
  });

  const handleImageSelect = (imageUrl: string) => {
    form.setValue("imagenUrl", imageUrl);
    setSelectedImage(imageUrl);
    setShowImagePicker(false);
  };


  const handlePullGuestContinue = (options: string[]) => {
    console.log('Selected time options:', options);
    setShowPullGuest(false);
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    if (dateValue?.from != null && dateValue?.to != null) {
      const fechaStartUtc = formatISO(dateValue?.from, { representation: "complete" });
      const fechaEndUtc = formatISO(dateValue?.to, { representation: "complete" });
      data.fechaStart = fechaStartUtc;
      data.fechaEnd = fechaEndUtc;

    }
    data.precio = payment.amount;
    data.idTipoMoneda = parseInt(payment.currency);
    data.jsonPrivacy = JSON.stringify(privacy);
    data.mostrarMarcaTiempo = privacy.showTimestamps;
    data.mostrarNombreInvitado = privacy.showGuestNames;
    data.mostrarNumeroInvitado = privacy.showNumberGuests;
    data.password = privacy.password!;
    data.imagenUrl = data.imagenUrl == "" ? selectedImage : data.imagenUrl;


    var response = data.isEdit ? await eventoService.actualizar(data) : await eventoService.registrar(data);
    if (response.status === 200) {

      await useEventosStore.getState().refreshEventos("Hospedaje",  _profile?.telefono!);

      toast.success(data.isEdit ? 'El evento ha sido actualizado con éxito.!' : 'El evento ha sido registrado con éxito.!')
      resetPayment();
      resetPrivacy();
      navigate('/events');
    } else {

      toast.error('response error!')
    }
    setIsLoading(false);


  };

  const handleChangeEmoji = (e: any) => {
    setEmojiModal(false);
    form.setValue("titulo", form.getValues("titulo") + e);
  };

  useEffect(() => {
    if (eventData) {
      form.reset({
        ...form.getValues(),
        ...eventData,
      });

      if (eventData.fechaEnd != undefined && eventData.fechaEnd != undefined) {
        setDateValue({
          from: new Date(eventData.fechaStart!),
          to: new Date(eventData.fechaEnd!)
        });
      }

      if (eventData.imagenUrl != undefined && eventData.imagenUrl != "") {
        setSelectedImage(eventData.imagenUrl!);
      }


    }
  }, [eventData, form]);

  return (
    <div className="grid md:grid-cols-[1fr,400px] gap-8">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Event Name Input */}
          <div className="bg-[#100229] rounded-lg p-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nombre del Evento"
                      className={`text-3xl font-bold bg-transparent border-none focus-visible:ring-2 text-white/90 placeholder:text-white/50 h-auto p-1 ${getFontStyle(form.watch("tipoFuente")!)}`}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 mt-2" />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                <span>Aa</span>
                <span>Elige una fuente</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {fontStyles.map((font) => (
                  <Button
                    key={font}
                    type="button"
                    variant={form.watch("tipoFuente")! === font ? "secondary" : "ghost"}
                    className={`rounded-full ${form.watch("tipoFuente")! === font
                      ? "bg-[#7226ff] text-white hover:bg-purple-700"
                      : "bg-[#190048] text-white/70 hover:bg-[#3A2F2F] hover:text-white"
                      }`}
                    onClick={() => form.setValue("tipoFuente", font)}
                  >
                    {font}
                  </Button>
                ))}

                <Button
                  key={5}
                  type="button"
                  variant={"secondary"}
                  className="rounded-full bg-[#c526ff] text-white hover:bg-blue-500"
                  onClick={() => setEmojiModal(!emojiModal)}
                >
                  Emoji 😊
                </Button>

              </div>

            </div>
          </div>


          {Object.keys(form.formState.errors).length > 0 && (
            <div className="text-red-500 mt-2">
              {Object.entries(form.formState.errors).map(([key, error]) => (
                <div key={key}>{(error as any).message}</div>
              ))}
            </div>
          )}
          {/* Date Range Input */}
          <div className="bg-[#100229] rounded-lg p-4">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <FormField
                    control={form.control}
                    name="dateRange"
                    render={({ field }) => (
                      <FormItem>
                        <DateRangePicker
                          {...field}
                          className=" text-white/50"
                          showTimePicker
                          fromDate={new Date()}
                          value={dateValue}
                          onChange={(value) => { setDateValue(value) }}
                        />
                        <FormMessage className="text-red-400 mt-2" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-2" style={{ display: 'none' }}>
                  <a
                    type="button"
                    className="text-purple-400 hover:text-purple-300 p-0 h-auto text-sm"
                    onClick={() => setShowPullGuest(true)}

                  >
                    ¿No puedes decidir cuándo? Encuesta a tus invitados  →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Host Info */}
          <div className="bg-[#100229] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <span className="text-sm">Organizado por</span>
                  <FormField
                    control={form.control}
                    name="host"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete="off"
                            placeholder="(optional) host nickname"
                            className="bg-transparent border-none focus-visible:ring-2 text-white/90 placeholder:text-white/50 h-auto p-1"
                            readOnly
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 mt-2" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-2" style={{ display: 'none' }}>
                  <Button
                    type="button"
                    variant="link"
                    className="text-purple-400 hover:text-purple-300 p-0 h-auto text-sm"
                  >
                    + Agregar coanfitriones
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-[#100229] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <QuickActionPopover type="address" onSave={(value) => form.setValue("refDireccion", value)}>
                  <MapPin className="w-5 h-5 text-purple-400" />
                </QuickActionPopover>
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="ubicacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AutocompleteGoogle
                          value={field.value || ""}
                          onChange={(value) => form.setValue(field.name, value)}
                          onSelectLocation={(location) => {
                            form.setValue(field.name, location.address);
                            /*       form.setValue("lat", location.lat);
                                  form.setValue("lng", location.lng); */
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 mt-2" />
                    </FormItem>
                  )}
                />
                <p className="text-sm text-white/50 mt-1">{form.watch("refDireccion")}</p>
              </div>
            </div>
          </div>


          {/* Spots */}
          <div className="bg-[#100229] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="capacidadMaxima"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="1"
                            autoComplete="off"
                            className="w-20 bg-transparent border-none focus-visible:ring-2 text-white/90 placeholder:text-white/50 h-auto p-1 text-lg"
                            min={0}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 mt-2" />
                      </FormItem>
                    )}
                  />
                  <span className="text-white/90 text-lg">spots</span>
                </div>
                <p className="text-sm text-white/50 mt-1">Déjelo 0 para espacios ilimitados</p>
              </div>
            </div>
          </div>

          {/* Cost */}
          <div className="bg-[#100229] rounded-lg p-4">
            <div className="flex items-center gap-3" onClick={onSettingsClick}>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>


              {payment && payment.amount > 0 ? (
                <span className="text-white/90 text-lg">{payment.amount} {payment.codigo} por persona</span>
              ) : (
                <p className="text-sm text-white/50 mt-1">Ingrese precio del evento</p>
              )}

            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <QuickActionPopover type="link" onSave={(value) => console.log("Guardado:", value)}>
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                + Link
              </Button>
            </QuickActionPopover>

            <QuickActionPopover type="playlist" onSave={(value) => console.log("Guardado:", value)}>
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                + Playlist
              </Button>
            </QuickActionPopover>

            <QuickActionPopover type="registry" onSave={(value) => console.log("Guardado:", value)}>
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                + Registry
              </Button>
            </QuickActionPopover>

            <QuickActionPopover type="dress-code" onSave={(value) => console.log("Guardado:", value)}>
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                + Dress code
              </Button>
            </QuickActionPopover>

            <QuickActionPopover type="more" onSave={(value) => console.log("Guardado:", value)}>
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                Show more
              </Button>
            </QuickActionPopover>
          </div>

          {/* Description */}
          <div className="bg-[#100229] rounded-lg p-4 relative">
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <textarea
                        {...field}
                        autoComplete="off"
                        placeholder="Añade una descripción de tu evento"
                        className="w-full bg-transparent border-none focus:outline-none text-white/90 placeholder:text-white/50 resize-none h-32"
                      />
                      <div className="absolute right-3 top-3 text-purple-400">
                        <span className="text-2xl" >😊</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 mt-2" />
                </FormItem>
              )}
            />
          </div>

          {/* Host Actions */}
          <div hidden>
            <h3 className="text-sm text-white/70 mb-3">Quick actions for hosts</h3>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                Collect Info
              </Button>
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                Reminders
              </Button>
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                Require Guest Approval
              </Button>
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                More
              </Button>
            </div>
          </div>

          {/* Save Draft Button - Desktop Only */}
          <div className="fixed bottom-6 right-6 z-50 hidden md:block">
            <Button
              type="submit"
              className="bg-[#000] hover:bg-[#151515] text-white px-12 py-6 text-lg font-medium rounded-lg flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  cargando..
                </>
              ) : (
                <>Guardar <Save className="w-5 h-5" /></>
              )}

            </Button>

          </div>
        </form>
      </Form>

      <EventPreview
        selectedIcon={form.watch("iconRsvp")!}
        selectedImage={form.watch("imagenUrl")!}
        onEditClick={() => setShowImagePicker(true)}
        onSelectIcon={(e) => form.setValue("iconRsvp", e)}

      />

      {/* open image selected*/}

      {showImagePicker && (
        <ImagePicker
          open={showImagePicker}
          onOpenChange={setShowImagePicker}
          onSelectImage={handleImageSelect}
        />
      )}

      {showPullGuest && (
        <PullGuest
          open={showPullGuest}
          onOpenChange={setShowPullGuest}
          onContinue={handlePullGuestContinue}
        />
      )}

      {emojiModal && (
        <EmojiModal
          open={emojiModal}
          onOpen={() => setEmojiModal(!emojiModal)}
          onAcept={handleChangeEmoji}
        />
      )}


      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </div>
  );
}

export { EventForm };