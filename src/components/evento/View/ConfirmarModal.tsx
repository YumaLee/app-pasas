import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const formSchema = z.object({
  comentario: z.string().optional(),
  invitadoAdicional: z.number().optional(),
  tipoAsistencia: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  selectedIcon: any;
  showRsvpModal: boolean;
  setShowRsvpModal: (show: boolean) => void;
  selectedRsvp: RsvpType;
  setSelectedRsvp: (type: RsvpType) => void;
  onSave: (data: any) => void;
}

export function ConfirmarModal({
  selectedIcon,
  showRsvpModal,
  setShowRsvpModal,
  selectedRsvp,
  setSelectedRsvp, onSave }: EventFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comentario: "",
      invitadoAdicional: 0,
      tipoAsistencia: 1,
    },
  });


  const handleRsvpClick = (index: number) => {
    const type = index === 0 ? 'going' : index === 1 ? 'maybe' : "cant";
    const tipo = index === 0 ? 1 : index === 1 ? 2 : 3;

    setSelectedRsvp(type as RsvpType);
    form.setValue('tipoAsistencia', tipo);
  };

  const onSubmit = (data: FormValues) => {
    onSave(data)
    //form.reset();
  };

  return (
    <Dialog open={showRsvpModal} onOpenChange={setShowRsvpModal}>
      <DialogTitle></DialogTitle>

      <DialogContent className="max-w-md bg-[#1A0505] border-neutral-800 p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
            {/* RSVP Options */}
            <div className="flex justify-center gap-8 mb-8">
              {rsvpOptions.map((option, index) => (
                <div
                  key={option.type}
                  className={`flex flex-col items-center gap-2 cursor-pointer ${selectedRsvp === option.type ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'
                    }`}
                  onClick={() => handleRsvpClick(index)}
                >
                  <div
                    className={`w-20 h-20 rounded-full transition-all duration-200 ${option.type === selectedRsvp ? option.color : 'bg-neutral-800'
                      } flex items-center justify-center`}
                  >
                    <span className="text-4xl">{selectedIcon[index]}</span>
                  </div>
                  <span className="text-white/70">{option.label}</span>
                </div>
              ))}
            </div>

            {/* RSVP Form */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-sm">RSVPING AS</span>
                  <button type="button" className="flex items-center gap-2 hover:opacity-80">
                    <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center text-white text-xs">
                      JL
                    </div>
                    <span className="text-purple-400">julia Lopes</span>
                    <Pencil className="w-4 h-4 text-white/50" />
                  </button>
                </div>
                <FormField
                  control={form.control}
                  name="invitadoAdicional"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                              {field.value} {field.value == 1 ? 'asistente' : 'asistentes'}  <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 bg-[#1A0505] border-neutral-800">
                            <DropdownMenuItem onClick={() => field.onChange(1)} className="text-white/70">
                              1 asistente
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => field.onChange(2)} className="text-white/70">
                              2 asistentes
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="comentario"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Mensaje"
                          autoComplete="off"
                          className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/50 pr-20"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-white/50 hover:text-white hover:bg-white/10 h-8 px-2"
                          >
                            GIF
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="ghost"
                className="flex-1 text-white hover:bg-white/10"
                onClick={() => setShowRsvpModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-white hover:bg-white/90 text-black"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}