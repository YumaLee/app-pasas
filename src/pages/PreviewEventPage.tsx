import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import imageCompression from 'browser-image-compression';
import { MoreHorizontal, Crown, MapPin, Music, Users, Link as LinkIcon, Camera, XCircle, ChevronLeft, FileArchive } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import toast, { Toaster } from 'react-hot-toast';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionButtons } from "@/components/evento/View//ActionButtons";
import { ConfirmarModal } from "@/components/evento/View/ConfirmarModal";
import eventoService from "@/shared/services/EventoService";
import asistenciaService from "@/shared/services/AsistenciaService";

import comentarioService from "@/shared/services/ComentarioService";
import { ComentarioActivity } from "@/components/evento/Comentario";
import { useAuthStore } from "@/store/authStore";
import LoadingOverlay from "@/components/ui/loadingOverlay";
import { HeaderHome } from "@/components/header/HeaderHome";
import ImageViewer from "@/components/evento/View/ImageViewer";
import NotFoundPage from "./NotFoundPage";


const iconSets = [
    { id: 1, name: "Icons", icon: "☑️", icons: ["✓", "?", "✕"] },
    { id: 2, name: "Emojis", icon: "👍", icons: ["👍", "🤔", "👎"] },
    { id: 3, name: "Flirty", icon: "💋", icons: ["💋", "😘", "💔"] },
    { id: 4, name: "Frosty", icon: "⛄", icons: ["⛄", "❄️", "🌨️"] },
    { id: 5, name: "Gameday", icon: "🏈", icons: ["🏈", "🎮", "🎲"] },
    { id: 6, name: "Hearts", icon: "❤️", icons: ["❤️", "💜", "💔"] },
    { id: 7, name: "Modern dating", icon: "👻", icons: ["💘", "👻", "🚫"] },
    { id: 8, name: "Lucky you", icon: "🍀", icons: ["🍀", "🎲", "❌"] }
];
type RsvpType = 'going' | 'maybe' | 'cant';
const notify = () => toast('Here is your toast.');

export function PreviewEventPage() {
    const [openInvite, setOpenInvite] = useState(false);

    const zonaHorariaUsuario = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const userLang = navigator.language || "es-ES";
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [itemEvent, setItemEvent] = useState<any>({});
    const [selectedIcon, setSelectedIcon] = useState(2);

    const [showRsvpModal, setShowRsvpModal] = useState(false);
    const [selectedRsvp, setSelectedRsvp] = useState<RsvpType>();

    const _profile = useAuthStore((state) => state.profile);
    const setCountAsistente = useAuthStore((state) => state.setCountAsistente);
    const countAsistente = useAuthStore((state) => state.countAsistencia);

    const [dataItem, setDataItem] = useState<any>({});
    const [comentarios, setComentarios] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");

    const isAuth = useAuthStore((state) => state.isAuth);
    const [error, setError] = useState(false);

    const hasFetched = useRef(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { codigo } = useParams();

    const navigate = useNavigate();

    const fetchData = async () => {
        try {

            if (!codigo || hasFetched.current) return;
            hasFetched.current = true;
            setIsLoading(true);
            const [eventoData, comentariosData] = await Promise.all([
                eventoService.getByCode(codigo, _profile?.telefono!),
                comentarioService.getByCode(codigo)
            ]);

            debugger

            if (eventoData.status === 200) {

                var data = eventoData.data;
                setItemEvent(data);
                setSelectedIcon(data.iconRsvp);
                setDataItem({
                    idusuario: _profile?.id,
                    idEvento: data.id,
                    avatar: _profile?.foto,
                    usuario: _profile?.nombre + '' + _profile?.apellidoPaterno
                })
                setComentarios(comentariosData.data);
                setCountAsistente(data.countAsistencia);
                setIsLoading(false);

                toast.success('Successfully!', {
                    icon: '👏',
                })
            }
            else {

                setError(true);
                toast.error('not found data!', {
                    icon: '👏',
                })

            }



        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const handleClearImage = () => {
        setSelectedImage("");
    }



    useEffect(() => {
        fetchData();
    }, [codigo]); // Se ejecuta cuando perfil cambia




    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Volver al estado original después de 2s
        } catch (error) {
            console.error("Error al copiar:", error);
        }
    };




    const handleRsvpClick = (index: number) => {
        var type = index === 0 ? 'going' : index === 1 ? 'maybe' : "cant";
        setSelectedRsvp(type as RsvpType)

        setShowRsvpModal(true);
    };

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


            const options = {
                maxSizeMB: 1, // Tamaño máximo en MB
                maxWidthOrHeight: 1024, // Máxima dimensión
                useWebWorker: true,
            };

            let ramd = (Math.random() + 1).toString(36).substring(7);


            const nuevoNombre = "albun_evento_" + ramd + "-" + codigo + "." + file.name.split(".").pop();
            const fileNuevo = new File([file], nuevoNombre, { type: file.type });

            const compressedFile = await imageCompression(fileNuevo, options);

            console.log(compressedFile)

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);

            await eventoService.subirImagen(compressedFile, codigo as string);

        }
    };

    const handleSaveAttendance = async (data: any) => {

        data.eventoID = dataItem.idEvento;
        data.usuarioID = dataItem.idusuario;

        var response = await asistenciaService.registrar(data);
        if (response.status === 200) {
            setShowRsvpModal(false);
            setCountAsistente(countAsistente + 1);

            alert('succes asistenciaService');
        } else {
            alert('response error asistenciaService');
        }
        //    setShowRsvpModal(false);

    }

    if (error || !itemEvent) return <NotFoundPage />;

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 transition-transform">
                <div className="flex items-center justify-between p-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10"
                        onClick={() => window.history.back()}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10"
                            >
                                <MoreHorizontal className="h-6 w-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-[#1A0505] border-neutral-800">
                            <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                                Share Event
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                                Report Event
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* RSVP Modal */}
            <ConfirmarModal
                selectedIcon={iconSets.find(set => set.id === selectedIcon)?.icons}
                showRsvpModal={showRsvpModal}
                setShowRsvpModal={setShowRsvpModal}
                selectedRsvp={selectedRsvp!}
                setSelectedRsvp={setSelectedRsvp}
                onSave={handleSaveAttendance}
            />



            {_profile?.telefono == itemEvent.telefono ?
                <>
                    {/* Mobile Footer Menu */}
                    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
                        <div className="bg-[#7226ff] border-t border-white/10">
                            <div className="grid grid-cols-5 gap-1 p-2">
                                <ActionButtons
                                    onEditClick={() => navigate('/preview')}
                                    onBlastClick={() => console.log('blass')}
                                    onGoingClick={() => console.log('goin')}
                                    onInviteClick={() => console.log('invited')}
                                    onMoreClick={() => console.log('more')}
                                    countAsistente={countAsistente}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Right Side Fixed Buttons - Desktop Only */}
                    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col">
                        <div className="w-[100px] bg-[#100229] py-6 flex flex-col items-center gap-4">
                            <ActionButtons
                                onEditClick={() => navigate(`/event/edit/${codigo}`)}
                                onBlastClick={() => console.log('blass')}
                                onGoingClick={() => console.log('goin')}
                                onInviteClick={() => console.log('invited')}
                                onMoreClick={() => console.log('more')}
                                countAsistente={countAsistente}
                            />
                        </div>
                    </div>

                </>
                : null
            }

            {/* Fixed Header */}
            <div
                className="top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-900 via-purple-900 transition-transform duration-300"
            >
                <LoadingOverlay isLoading={isLoading} />
                {isAuth ? (
                    <HeaderHome
                        isCreate={false}
                        checkedMotion={false}
                        onReduceMotion={() => console.log('first')}
                        onEdit={() => console.log('first')}
                    />
                ) : null}

            </div>
            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 md:py-8">
                {/* Mobile Event Image */}
                <div className="md:hidden -mx-4 mb-6">
                    <div className="aspect-[16/9] relative">
                        <img
                            src={itemEvent.imagenUrl}
                            alt={itemEvent.titulo}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="absolute bottom-4 left-4 right-4">
                                <h1 className="text-3xl font-bold text-white mb-2">{itemEvent.titulo}</h1>
                                <p className="text-lg text-white/70">{itemEvent.titulo}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-5">

                        {iconSets.find(set => set.id === selectedIcon)?.icons.map((icon, index) => (
                            <Button
                                key={index}
                                className="h-14 bg-purple-600/20 hover:bg-purple-600/30 rounded-full"
                            >
                                <span className="text-xl">{icon}</span>
                                <span className="text-white/70 text-sm">
                                    {index === 0 ? 'Going' : index === 1 ? 'Maybe' : "Can't Go"}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>


                <div className="grid md:grid-cols-[1fr,350px] gap-8">
                    {/* Left Column */}
                    <div className="space-y-6 md:space-y-8 ">
                     {/* Modal lock */}
                        <div className="sticky top-0 left-0 w-full backdrop-blur-md z-50 flex items-center justify-center h-screen" hidden>
                            <div className="bg-white/20 p-8 rounded-lg max-w-md w-full mx-4 text-center backdrop-blur-lg border border-white/20">
                                <h2 className="text-2xl font-bold text-white mb-4">Acceso restringido</h2>
                                <p className="text-white/90 mb-6">
                                    Solo los invitados que hayan confirmado su asistencia podrán ver la actividad del evento y quién asistirá.
                                </p>
                                <button
                                    onClick={() => console.log("Confirmar asistencia")}
                                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded"
                                >
                                    Confirmar asistencia
                                </button>
                            </div>
                        </div>


                        {/* Desktop Title */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">{itemEvent.titulo}</h1>
                                {itemEvent.fechaStart == null || itemEvent.fechaEnd == "" ?
                                    <p className="text-xl text-white/70">Date & Time TBD </p>
                                    :
                                    <>
                                        <p className="text-xl text-white/70">
                                            {formatInTimeZone(itemEvent.fechaStart, zonaHorariaUsuario, "d 'de' MMM. h:mm a 'de' yyyy", { userLang })}
                                        </p>
                                        <p className="text-xl text-white/70">
                                            {formatInTimeZone(itemEvent.fechaEnd, zonaHorariaUsuario, "d 'de' MMM. h:mm a 'de' yyyy", { userLang })}

                                        </p>
                                    </>
                                }

                                <div className="flex items-center mt-5 gap-3">
                                    <div
                                        className="flex items-center gap-3 text-white/70">

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white"
                                                >
                                                    <MoreHorizontal className="h-6 w-6" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48 bg-[#1A0505] border-neutral-800">
                                                <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                                                    <div onClick={handleCopyLink}
                                                        className="flex items-center gap-3 text-white/70">
                                                        <Button className="rounded-full w-9 h-10 bg-white/10 hover:bg-white/20 text-white"

                                                        >
                                                            <LinkIcon className="h-4 w-4 flex-shrink-0" />
                                                        </Button>
                                                        <span>{copied ? "¡Copiado!" : "Copiar enlace"}</span>

                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">

                                                    <div className="flex items-center gap-3 text-white/70">
                                                        <Button className="rounded-full w-9 h-10 bg-white/10 hover:bg-white/20 text-white"
                                                            onClick={() => console.log('link')}
                                                        >
                                                            <FileArchive className="h-4 w-4 flex-shrink-0" />
                                                        </Button>
                                                        <span> Hacer un volante</span>
                                                    </div>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <AddToCalendarButton
                                            name={itemEvent.titulo}
                                            options={['Google', 'Outlook.com', 'MicrosoftTeams']}
                                            location={itemEvent.ubicacion}
                                            startDate={itemEvent.fechaStart}
                                            endDate={itemEvent.fechaEnd}
                                            description={itemEvent.descripcion}
                                            timeZone={zonaHorariaUsuario}
                                            label="Calendario"
                                            hideBackground
                                        ></AddToCalendarButton>
                                    </div>


                                </div>

                            </div>

                        </div>

                        {/* Host Info */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Crown className="h-5 w-5 text-white/50" />
                                <span className="text-white/50">Organizado por</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white text-sm">
                                    {"AQ"}
                                </div>
                                <span className="text-white">{itemEvent.organizador}</span>
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-white/70">
                                <MapPin className="h-5 w-5 flex-shrink-0" />
                                {itemEvent.ubicacion == null || itemEvent.ubicacion == "" ?
                                    <span className="break-words">No hay ubicación establecida</span> :
                                    <span className="break-words">{itemEvent.ubicacion}</span>
                                }

                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <Users className="h-5 w-5 flex-shrink-0" />
                                <span>{itemEvent.capacidadMaxima}/{countAsistente} Quedan lugares</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <Music className="h-5 w-5 flex-shrink-0" />
                                <span>yyyy</span>
                            </div>


                        </div>

                        {/* Description */}
                        <div className="text-white/70">
                            <p className="break-words">{itemEvent.descripcion}</p>

                        </div>

                        {/* Open Invite Section */}
                        <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-400 text-xl">↗️</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Invitación abierta</h3>
                                    <p className="text-white/70 text-sm">Cualquier persona que tenga el enlace puede confirmar su asistencia.</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                className="text-white hover:bg-white/10"
                                onClick={() => { setOpenInvite(!openInvite), notify() }}
                            >
                                {openInvite ? "ON" : "OFF"}
                            </Button>
                        </div>

                        {/* Photo Album Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl md:text-2xl font-bold text-white">Photo Album</h2>
                                <Button
                                    variant="ghost"
                                    className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
                                >
                                    <LinkIcon className="h-4 w-4" />
                                    <span className="hidden sm:inline">Copy link</span>
                                </Button>

                                <label
                                    className="aspect-square rounded-lg  text-white flex flex-col items-center justify-center gap-2 max-h-[200px]"
                                >
                                    <Camera className="h-8 w-8" />
                                    <span className="text-sm"></span>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        id="fileInput"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>


                            <div className="grid grid-cols-4 md:grid-cols-4 gap-3">

                                {/* Placeholder for future photos */}
                                {selectedImage ?
                                    <div className="aspect-square rounded-lg bg-white/5 overflow-hidden max-h-[200px]">
                                        <img
                                            src={selectedImage}
                                            alt="Valentine's Day Template"
                                            className="w-full h-full object-cover"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 absolute top-3 right-3  text-white aspect-square"
                                            onClick={handleClearImage}
                                        >
                                        </Button>
                                    </div> : null
                                }



                                {comentarios.length > 0 ? (
                                    comentarios
                                        .filter((item: any) => item.imagenUrl)
                                        .map((item: any, index) => (
                                            <div
                                                className="aspect-square rounded-lg overflow-hidden max-h-[200px]"
                                                key={index}
                                            >

                                                <div className="w-full h-full object-cover">
                                                    <ImageViewer
                                                        imageUrl={item.imagenUrl}
                                                        userName="Julia Lopes"
                                                        userAvatar="https://pasasfile.blob.core.windows.net/pasas-contenedor/foto-evento/albun_evento_bmr6e-b074c4d97c694c1.jpg"
                                                        timeAgo="44 minutes ago"
                                                    />
                                                </div>

                                            </div>


                                        ))
                                ) : (
                                    <>

                                        <div className="aspect-square rounded-lg bg-white/5 overflow-hidden max-h-[200px]">
                                            <p className="text-gray-500 text-center mt-8">No hay imágenes disponibles</p>

                                        </div>
                                        <div className="aspect-square rounded-lg bg-white/5 overflow-hidden max-h-[200px]">
                                        </div>
                                    </>
                                )}



                            </div>
                        </div>

                        {/* Activity Section */}
                        <ComentarioActivity
                            dataItem={dataItem}
                            comentarios={comentarios}
                            setComentarios={setComentarios}
                            onBlastClick={() => console.log('first')}
                            onGoingClick={() => console.log('first')}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="relative hidden md:block">
                        <div className="sticky top-8 space-y-6">
                            {/* Event Image */}
                            <div className="aspect-[4/3] rounded-xl overflow-hidden">
                                <img
                                    src={itemEvent.imagenUrl}
                                    alt={itemEvent.tipoFuente}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* RSVP Options */}
                            <div className="grid grid-cols-3 gap-3">
                                {iconSets.find(set => set.id === selectedIcon)?.icons.map((icon, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <Button className="w-16 h-16 lg:w-20 lg:h-20 rounded-full  bg-purple-600/20 hover:bg-purple-600/30 flex items-center justify-center"
                                            onClick={() => handleRsvpClick(index)}
                                        >
                                            <span className="text-5xl lg:text-5xl">{icon}</span>
                                        </Button>
                                        <span className="text-white/70 text-sm">
                                            {index === 0 ? 'Voy' : index === 1 ? 'Tal vez' : "No Puedo Ir"}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Guest List Preview */}
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-white font-medium">Guest List</h3>
                                    <Button variant="ghost" className="text-white/70 hover:text-white">
                                        See all
                                    </Button>
                                </div>
                                <div className="flex -space-x-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-[#1A0505] flex items-center justify-center text-white text-sm"
                                        >
                                            JL
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#1A0505] flex items-center justify-center text-white text-sm">
                                        +3
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile RSVP Options */}
                    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-black/90 to-black/0 p-4">
                        <div className="grid grid-cols-3 gap-3">
                            {['🥶', '❄️', '👻'].map((emoji, index) => (
                                <Button
                                    key={index}
                                    className="h-14 bg-purple-600/20 hover:bg-purple-600/30 rounded-xl"
                                >
                                    <span className="text-xl">{emoji}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}