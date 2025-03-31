import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Users, MapPin, DollarSign,Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatISO } from "date-fns";
import { QuickActionPopover } from "@/components/QuickActionPopover";
import { useAuthStore } from "@/store/authStore";
import { DateRange, DateRangePicker } from "@/components/ui/datepicker"

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

const fontStyles = ["Classic", "Eclectic", "Fancy", "Simple"] as const;

const formSchema = z.object({
  anfitrionID: z.number(),
  titulo: z.string().min(1, "El nombre del evento es requerido"),
  tipoFuente: z.enum(fontStyles),
  dateRange: z.object({ from: z.date(), to: z.date(), }).optional(),
  fechaStart: z.string().optional(),
  fechaEnd: z.string().optional(),

  host: z.string().optional(),
  imagenUrl: z.string().optional(),
  ubicacion: z.string().optional(),
  capacidadMaxima: z.preprocess((value) => { if (value === "") return 0; return Number(value); }, z.union([z.number().int().positive(), z.nan()]).optional()),
  cost: z.string().optional(),
  descripcion: z.string().optional(),
  iconRsvp: z.number().optional()
});

type FormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  selectedFont: string;
  onFontSelect: (font: string) => void;
  onSave: (font: string) => void;
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

function EventForm({ selectedFont, onFontSelect }: EventFormProps) {
  const [selectedImage, setSelectedImage] = useState("https://images.pexels.com/photos/1317365/pexels-photo-1317365.jpeg");
  const [selectedIcon, setSelectedIcon] = useState(1);
  const navigate = useNavigate();

  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showPullGuest, setShowPullGuest] = useState(false);
  const _profile = useAuthStore((state) => state.profile);
  const [emojiModal, setEmojiModal] = useState(false);


  const [dateValue, setDateValue] = React.useState<DateRange | undefined>(undefined)


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      anfitrionID: _profile?.id,
      titulo: "",
      tipoFuente: "Classic",
      dateRange: undefined,
      fechaStart: "",
      fechaEnd: "",
      host: _profile?.nombre,
      imagenUrl: "",
      ubicacion: "",
      capacidadMaxima: 0,
      cost: "",
      iconRsvp: 1,
      descripcion: "",
    },
    mode: "onChange"
  });

  const handleImageSelect = (imageUrl: string) => {
    form.setValue("imagenUrl", imageUrl);

    setSelectedImage(imageUrl);
    setShowImagePicker(false);
  };

  const handleIconSelect = (id: number) => {
    form.setValue("iconRsvp", id);
    setSelectedIcon(id)
  };

  const handleFontSelect = (font: typeof fontStyles[number]) => {
    onFontSelect(font);
    form.setValue("tipoFuente", font);
  };

  const handlePullGuestContinue = (options: string[]) => {
    console.log('Selected time options:', options);
    setShowPullGuest(false);
  };

  const onSubmit = async (data: FormValues) => {

    if (dateValue?.from != null && dateValue?.to != null) {
      const fechaStartUtc = formatISO(dateValue?.from, { representation: "complete" });
      const fechaEndUtc = formatISO(dateValue?.to, { representation: "complete" });
      data.fechaStart = fechaStartUtc;
      data.fechaEnd = fechaEndUtc;

    }
    console.log(data)
    var response = await eventoService.registrar(data);
    if (response.status === 200) {
      navigate('/events');
    } else {
      alert('response error');
    }
  };

  const handleChangeEmoji = (e: any) => {
    setEmojiModal(false);
    form.setValue("titulo", form.getValues("titulo") + e);
  };


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
                      placeholder="Untitled Event"
                      className={`text-4xl font-bold bg-transparent border-none focus-visible:ring-2 text-white/90 placeholder:text-white/50 h-auto p-1 ${getFontStyle(selectedFont)}`}
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
                    variant={selectedFont === font ? "secondary" : "ghost"}
                    className={`rounded-full ${selectedFont === font
                      ? "bg-[#7226ff] text-white hover:bg-purple-700"
                      : "bg-[#190048] text-white/70 hover:bg-[#3A2F2F] hover:text-white"
                      }`}
                    onClick={() => handleFontSelect(font)}
                  >
                    {font}
                  </Button>
                ))}

                <Button
                  key={5}
                  type="button"
                  variant={"secondary"}
                  className="rounded-full bg-[#7226ff] text-white hover:bg-purple-700"
                  onClick={() => setEmojiModal(!emojiModal)}
                >
                  Emoji 😊
                </Button>
              </div>
            </div>
          </div>

          {/* Date Range Input */}
          <div className="bg-[#100229] rounded-lg p-4">
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <DateRangePicker
                    {...field}
                    className=" text-white/50"
                    showTimePicker
                    value={dateValue}
                    onChange={(value) => { setDateValue(value) }}
                  />
                  <FormMessage className="text-red-400 mt-2" />
                </FormItem>
              )}
            />
            <div className="mt-2">
              <Button
                variant="link"
                className="text-purple-400 hover:text-purple-300 p-0 h-auto text-sm"
                onClick={() => setShowPullGuest(true)}
              >
                ¿No puedes decidir cuándo? Encuesta a tus invitados  →
              </Button>
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
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 mt-2" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-2">
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
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="ubicacion"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <AutocompleteGoogle onSelectLocation={(location) => form.setValue("ubicacion", location)} />
                      </FormControl>
                      <FormMessage className="text-red-400 mt-2" />
                    </FormItem>
                  )}
                />
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
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 mt-2" />
                      </FormItem>
                    )}
                  />
                  <span className="text-white/90 text-lg">spots</span>
                </div>
                <p className="text-sm text-white/50 mt-1">Déjelo vacío para espacios ilimitados</p>
              </div>
            </div>
          </div>

          {/* Cost */}
          <div className="bg-[#100229] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="+ Costo por persona"
                          autoComplete="off"
                          className="bg-transparent border-none focus-visible:ring-2 text-white/90 placeholder:text-white/50 h-auto p-1"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 mt-2" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <QuickActionPopover type="link">
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                + Link
              </Button>
            </QuickActionPopover>

            <QuickActionPopover type="playlist">
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                + Playlist
              </Button>
            </QuickActionPopover>

            <QuickActionPopover type="registry">
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                + Registry
              </Button>
            </QuickActionPopover>

            <QuickActionPopover type="dress-code">
              <Button type="button" variant="outline" className="bg-[#000] border-none text-white/70 hover:bg-[#2A1F1F] hover:text-white">
                + Dress code
              </Button>
            </QuickActionPopover>

            <QuickActionPopover type="more">
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
                        placeholder="Add a description of your event"
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
          <div>
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
              >
              Guardar
              <Save className="w-5 h-5" />
            </Button>

          </div>
        </form>
      </Form>

      <EventPreview
        selectedIcon={selectedIcon}
        selectedImage={selectedImage}
        onEditClick={() => setShowImagePicker(true)}
        onSelectIcon={handleIconSelect}

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

    </div>
  );
}

export { EventForm };