import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Image, SmilePlus, GiftIcon, XCircle, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import comentarioService from "@/shared/services/ComentarioService";


interface ActionButtonsProps {
    dataItem: any;
    comentarios: any[]
    setComentarios: any;
    onBlastClick: () => void;
    onGoingClick: () => void;

}

export function ComentarioActivity({
    dataItem,
    comentarios,
    setComentarios
}: ActionButtonsProps) {

    const [comment, setComment] = useState("");
    const [selectedImage, setSelectedImage] = useState("https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4");
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleSave = async () => {
        //const formData = new FormData();
        const command = {
            eventoID: dataItem.idEvento,
            usuarioID: dataItem.idusuario,
            comentario: comment,
            avatar: dataItem.avatar,
            fecha: null,
            imagenUrl: null,
            fijado: false,
            usuario: dataItem.usuario
        };
        var response = await comentarioService.registrar(command);

        if (response.status === 200) {
            const comentarioAgregado = response.data;

            setComentarios((prev: any) => [...prev, comentarioAgregado]);
            setComment("");
        }
        if (response.status === 400) {
            //dialog.warning(<ul>{response.data.messages.map(item => (<li>{item}</li>))}</ul>);
            return;
        }
    }




    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.currentTarget instanceof HTMLInputElement || event.currentTarget instanceof HTMLTextAreaElement) {
            if (event.key === "Enter") {
                console.log("Valor del input:", comment);
            }
        }
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


            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        setSelectedImage("");
    }



    return (
        <>
            <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white">Activity</h2>

                {/* Comment Input */}
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-pink-400 flex-shrink-0 flex items-center justify-center text-white text-sm">
                        JL
                    </div>
                    <div className="flex-1 bg-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <textarea
                                rows={3}
                                style={{ resize: 'none' }}
                                placeholder="Add a comment"
                                className="flex-1 bg-transparent border-none text-white placeholder:text-white/50 focus:outline-none text-sm md:text-base"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            {comment ?
                                <div className="flex items-center gap-2 text-xs md:text-sm text-white/50">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="bottom-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 transition-colors cursor-pointer"
                                        onClick={() => setComment('')}
                                    >
                                        <XCircle className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="bottom-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer"
                                        onClick={handleSave}
                                    >
                                        <CheckCircle className="h-5 w-5" />
                                    </Button>
                                </div> :

                                <div className="flex items-center gap-2 text-xs md:text-sm text-white/50">
                                    <label className="bottom-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                        <Image className="w-5 h-5 text-white" />
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            id="fileInput"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="bottom-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                                    >
                                        <GiftIcon className="h-5 w-5" />
                                    </Button>
                                </div>
                            }

                        </div>

                        {selectedImage ?
                            <div className="aspect-square bg-[#2A2F2F] rounded-2xl overflow-hidden relative mb-3 w-[200px]">
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
                                    <XCircle />
                                </Button>
                            </div>
                            : null}
                    </div>
                </div>

                {/* Activity Item */}
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                            alt="julia Lopes"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-purple-400 font-medium text-sm md:text-base">julia Lopes</span>
                                <span className="text-white/50 text-sm">added to Photo Album</span>
                                <span className="text-white/50 text-xs">about 2 hours ago</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/50 hover:text-white hover:bg-white/10 h-8 w-8"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="rounded-lg overflow-hidden mb-3 w-[300px]">
                            <img
                                src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"
                                alt="Added photo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                                {['🤯', '🥺', '⭐', '🥰'].map((emoji, index) => (
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        className="h-7 md:h-8 px-2 md:px-3 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center gap-1"
                                    >
                                        <span className="text-sm md:text-base">{emoji}</span>
                                        <span className="text-xs md:text-sm">1</span>
                                    </Button>
                                ))}
                                <Button
                                    variant="ghost"
                                    className="h-7 md:h-8 px-2 md:px-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
                                >
                                    <SmilePlus className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button
                                variant="ghost"
                                className="h-7 md:h-8 px-2 md:px-3 text-white/50 hover:text-white hover:bg-white/10 text-sm"
                            >
                                Reply
                            </Button>
                        </div>
                    </div>
                </div>

                {comentarios.map((comentario, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img
                                src={comentario.avatar}
                                alt={comentario.usuario}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-purple-400 font-medium text-sm md:text-base">{comentario.usuario}</span>
                                    {comentario.fecha ?
                                        <span className="text-white/50 text-xs">

                                            {formatDistanceToNow(new Date(comentario.fecha), { addSuffix: true, locale: es })}
                                        </span> : <span>hace un momento</span>
                                    }


                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white/50 hover:text-white hover:bg-white/10 h-8 w-8"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            {comentario.imagenUrl ?

                                <div className="rounded-lg overflow-hidden mb-3 w-[300px]">
                                    <img
                                        src={comentario.imagenUrl}
                                        alt="Added photo"
                                        className="w-full h-full object-cover"
                                    />
                                </div> : null
                            }

                            <div className="flex flex-wrap items-center gap-2 mb-4">

                                <span className="text-white md:text-base">{comentario.comentario}</span>

                            </div>


                            <div className="flex flex-wrap items-center gap-2">

                                <div className="flex flex-wrap items-center gap-2">
                                    {['🤯', '🥺', '⭐', '🥰'].map((emoji, index) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            className="h-7 md:h-8 px-2 md:px-3 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center gap-1"
                                        >
                                            <span className="text-sm md:text-base">{emoji}</span>
                                            <span className="text-xs md:text-sm">1</span>
                                        </Button>
                                    ))}
                                    <Button
                                        variant="ghost"
                                        className="h-7 md:h-8 px-2 md:px-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
                                    >
                                        <SmilePlus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="h-7 md:h-8 px-2 md:px-3 text-white/50 hover:text-white hover:bg-white/10 text-sm"
                                >
                                    Reply
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}