import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Pencil, Instagram, Twitter, Loader2, Facebook } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/authStore";
import userService from "@/shared/services/UserService";

const formSchema = z.object({
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    biografia: z.string().max(500, "La biografía no puede exceder los 500 caracteres").optional(),
    telefono: z.string(),
    instagran: z.string().optional(),
    twiter: z.string().optional(),
    facebook: z.string().optional(),
    profileImage: z.string().optional(),

});

const socialMediaFormSchema = z.object({
    instagran: z.string(),
    twiter: z.string(),
    facebook: z.string(),
});

type FormValues = z.infer<typeof formSchema>;
type SocialMediaFormValues = z.infer<typeof socialMediaFormSchema>;

interface ViewUserProps {
    loading?: boolean;
    onSave?: (data: FormValues) => void;
    onCancel?: () => void;
}

export function ViewUser({ loading = false, onSave, onCancel }: ViewUserProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showSocialMediaDialog, setShowSocialMediaDialog] = useState(false);

    const _profile = useAuthStore((state) => state.profile);
    const hasFetched = useRef(false);


    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: _profile?.nombre,
            biografia: "",
            telefono: _profile?.telefono!,
            instagran: "",
            twiter: "",
            facebook: "",
            profileImage: ""
        },
        mode: "onChange",
    });

    const socialMediaForm = useForm<SocialMediaFormValues>({
        resolver: zodResolver(socialMediaFormSchema),
        defaultValues: {
            instagran: "",
            twiter: "",
            facebook: ""
        }
    });

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {


            var fileExtension = file.name.split('.')[1];
            var fileSize = Math.floor(file.size / 1024);
            var allowedExtensions = ['jpeg', 'jpg', 'png'];

            if (allowedExtensions.filter(m => { return m === fileExtension }).length === 0) {
                alert('Solo puede subir archivos:')
                //message.error('Solo puede subir archivos: ' + allowedExtensions.join(' / ') + '.');
                return;
            }

            if (fileSize > 5120) {
                alert('Tamaño máximo permitido')
                //message.error('Tamaño máximo permitido ' + parseFloat(parseFloat(fileSize / 1024).toFixed(2)).toString() + ' mb.');
                return;
            }


            const nuevoNombre = "foto_perfil_" + _profile?.telefono + "." + file.name.split(".").pop();
            const nuevoArchivo = new File([file], nuevoNombre, { type: file.type });


            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);

            //api 
            var response = await userService.subirImagen(nuevoArchivo);
            if (response.status === 200) {
                //message.error('Ocurrió un error al intentar subir el archivo.');
                form.setValue("profileImage", response.data.url);
            }
        }
    };

    const handleSubmit = (data: FormValues) => {
        console.log(data)
        onSave?.(data);
    };

    const fetchData = async () => {
        try {
            if (!_profile || hasFetched.current) return;
            hasFetched.current = true; // Marca que ya se hizo la petición

            var response = await userService.obtenerPorTelefono(_profile);
            if (response.status === 200) {
                const data = response.data;
                // Método 1: Usar setValue para actualizar campos individuales
                form.setValue("twiter", data.twiter);
                form.setValue("instagran", data.instagran);
                form.setValue("facebook", data.facebook);
                form.setValue("biografia", data.biografia);
                form.setValue("profileImage", data.foto);

                socialMediaForm.setValue("twiter", data.twiter);
                socialMediaForm.setValue("instagran", data.instagran);
                socialMediaForm.setValue("facebook", data.facebook);

                setPreviewImage(data.foto as string);

            }
            if (response.status === 400) {
                //dialog.warning(<ul>{response.data.messages.map(item => (<li>{item}</li>))}</ul>);
                return;
            }

        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [_profile]); // Se ejecuta cuando perfil cambia


    const handleSocialSubmit = (data: SocialMediaFormValues) => {
        form.setValue("instagran", data.instagran);
        form.setValue("twiter", data.twiter);
        form.setValue("facebook", data.facebook);

        setShowSocialMediaDialog(false);
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="max-w-[900px] mx-auto p-1 md:p-8"

                    >
                        {/* Mobile Action Buttons */}
                        <div className="fixed bottom-0 left-0 right-0 grid grid-cols-2 md:hidden">
                            <Button
                                type="button"
                                variant="ghost"
                                className="h-14 rounded-none bg-neutral-800 text-white hover:bg-neutral-700"
                                onClick={onCancel}
                            >
                                CANCEL
                            </Button>
                            <Button
                                type="submit"
                                disabled={!form.formState.isValid || loading}
                                className="h-14 rounded-none bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        SAVING...
                                    </>
                                ) : (
                                    'Guardar'
                                )}
                            </Button>
                        </div>

                        {/* Main content grid */}
                        <div className="grid md:grid-cols-[300px,1fr] gap-12"

                        >
                            {/* Left Column - Profile Image */}
                            <div className="flex flex-col items-center">
                                <div className="relative mb-8">
                                    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-pink-300 to-blue-300 flex items-center justify-center overflow-hidden">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Profile Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-4xl">{_profile?.nombre.substring(0, 2)}😴</span>
                                        )}
                                    </div>
                                    <label className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                        <Camera className="w-6 h-6 text-white" />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>

                                {/* Desktop Action Buttons */}
                                <div className="hidden md:flex w-full gap-3 mb-8">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 bg-white/5 border-white/10 hover:bg-white/10 text-white"
                                        onClick={onCancel}

                                    >
                                        CANCEL
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!form.formState.isValid || loading}
                                        className="flex-1 bg-[#8B3DFF] hover:bg-[#9B4DFF] text-white"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                SAVING...
                                            </>
                                        ) : (
                                            'SAVE'
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Right Column - Form Fields */}
                            <div className="space-y-6">
                                {/* Name Input */}
                                <FormField
                                    control={form.control}
                                    name="nombre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Add your name"
                                                    className="h-12 bg-white/10 border-white/5 text-white placeholder:text-white/50"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                {/* Bio Input */}
                                <FormField
                                    control={form.control}
                                    name="biografia"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Add a bio"
                                                    className="min-h-[100px] bg-white/10 border-white/5 text-white placeholder:text-white/50"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                {/* Phone Number */}
                                <div className="bg-white/5 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-white/50 mb-1">Número de teléfono · Solo visible para ti</p>
                                            <p className="text-white/90">+ {_profile?.telefono}</p>
                                        </div>
                                        <button type="button" className="text-white/50 hover:text-white">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Social Media Links */}
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="bg-white/5 border-pink-500/30 text-pink-500 hover:bg-pink-500/20 gap-2"
                                        onClick={() => setShowSocialMediaDialog(true)}
                                    >
                                        <Instagram className="w-4 h-4" />
                                        {form.watch("instagran") ? `@${form.watch("instagran")}` : "Instagram"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="bg-white/5 border-blue-400/30 text-blue-400 hover:bg-blue-400/20 gap-2"
                                        onClick={() => setShowSocialMediaDialog(true)}

                                    >
                                        <Twitter className="w-4 h-4" />
                                        {form.watch("twiter") ? `@${form.watch("twiter")}` : "Twitter"}

                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="bg-white/5 border-blue-400/30 text-blue-800 hover:bg-blue-400/20 gap-2"
                                        onClick={() => setShowSocialMediaDialog(true)}

                                    >
                                        <Facebook className="w-4 h-4" />
                                        {form.watch("facebook") ? `@${form.watch("facebook")}` : "Facebook"}

                                    </Button>

                                </div>

                                {/* Join Date */}
                                <div className="flex items-center gap-2 text-white/50">
                                    <span className="text-xl">🎉</span>
                                    <span>Se unió en {_profile?.joinDate}</span>
                                </div>

                                {/* Birthday Celebration Card */}
                                <div className="bg-purple-600 rounded-lg p-6" hidden>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                                Celebrate your birthday 🎈
                                            </h3>
                                            <p className="text-white/70">
                                                We'll send you inspo when it's time to make plans
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            className="bg-white text-purple-600 hover:bg-white/90"
                                        >
                                            GET THE APP
                                        </Button>
                                    </div>
                                </div>

                                {/* Delete Account */}
                                <div className="pt-6 mb-20 md:mb-4" hidden>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-400 text-sm"
                                    >
                                        DELETE ACCOUNT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>

            {/* Dialog */}
            <Dialog open={showSocialMediaDialog} onOpenChange={setShowSocialMediaDialog}>
                <DialogContent className="bg-[#1A0505] border-neutral-800 text-white sm:max-w-[400px]">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-semibold">Agregar redes sociales</DialogTitle>
                        </div>
                    </DialogHeader>

                    <Form {...socialMediaForm}>
                        <form onSubmit={socialMediaForm.handleSubmit(handleSocialSubmit)} className="space-y-4">
                            <FormField
                                control={socialMediaForm.control}
                                name="instagran"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                                                    <Instagram className="w-4 h-4" />
                                                </span>
                                                <Input
                                                    {...field}
                                                    placeholder="instagran"
                                                    className="pl-8 h-12 bg-white/10 border-white/5 text-white placeholder:text-white/50"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={socialMediaForm.control}
                                name="twiter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                                                    <Twitter className="w-4 h-4" />
                                                </span>
                                                <Input
                                                    {...field}
                                                    placeholder="instagran"
                                                    className="pl-8 h-12 bg-white/10 border-white/5 text-white placeholder:text-white/50"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={socialMediaForm.control}
                                name="facebook"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                                                    <Facebook className="w-4 h-4" />
                                                </span>
                                                <Input
                                                    {...field}
                                                    placeholder="instagran"
                                                    className="pl-8 h-12 bg-white/10 border-white/5 text-white placeholder:text-white/50"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-[#8B3DFF] hover:bg-[#9B4DFF] text-white"
                            >
                                Save
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}