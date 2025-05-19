import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface QuickActionPopoverProps {
    type: 'link' | 'playlist' | 'registry' | 'dress-code' | 'more' | 'address';
    children: React.ReactNode;
    onSave: (value: any) => void;

}

interface Dataitem {
    link?: string;
    playlist?: string;
    registry?: string;
    dress?: string;
    more?: string;
    address?: string;
}


export function QuickActionPopover({ type, children, onSave }: QuickActionPopoverProps) {

    const [dataItem, setDataItem] = useState<Dataitem>({});


    const getTitle = () => {
        switch (type) {
            case 'link':
                return 'Link';
            case 'playlist':
                return 'Playlist';
            case 'registry':
                return 'Registro';
            case 'dress-code':
                return 'Añadir código de vestimenta';
            case 'more':
                return 'Mas Opciones';
            default:
                return '';
        }
    };

    const handleChange = (value: any, name: string) => {
        setDataItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 bg-[#1A0505] border-neutral-800">
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">{getTitle()}</h3>

                    {type === 'address' && (
                        <div className="space-y-4">
                            <div className="relative">
                                <textarea
                                    rows={2}
                                    cols={2}
                                    autoComplete="off"
                                    placeholder="Add a description of your event"
                                    className="w-full bg-transparent resize-none h-32 text-white"
                                    value={dataItem?.address || ''}
                                    onChange={(e) => handleChange(e.target.value, "address")}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => onSave(dataItem?.address || '')}
                                    className="bg-purple-600 hover:bg-purple-700 text-white">
                                    Agregar
                                </Button>
                            </div>
                        </div>
                    )}

                    {type === 'link' && (
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Link className="h-4 w-4 text-white/50" />
                                </div>
                                <Input
                                    placeholder="https://yourlink.com"
                                    className="pl-9 bg-white/10 border-white/10 text-white placeholder:text-white/50"
                                    value={dataItem?.link || ''}
                                    onChange={(e) => handleChange(e.target.value, "link")}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => onSave(dataItem?.link || '')}
                                    className="bg-purple-600 hover:bg-purple-700 text-white">
                                    Agregar
                                </Button>
                            </div>
                        </div>
                    )}
                    {type === 'playlist' && (
                        <div className="space-y-4">
                            <p className="text-white/70">Conecta tu servicio de streaming de música favorito</p>
                            <div className="space-y-2">
                                <Button
                                    onClick={() => onSave('Spotify')}
                                    variant="outline"
                                    className="w-full justify-start bg-white/10 border-white/10 text-white hover:bg-white/20">
                                    🎵 Spotify
                                </Button>
                                <Button
                                    onClick={() => onSave('AppleMusic')}
                                    variant="outline"
                                    className="w-full justify-start bg-white/10 border-white/10 text-white hover:bg-white/20">
                                    🎵 Apple Music
                                </Button>
                            </div>
                        </div>
                    )}
                    {type === 'registry' && (
                        <div className="space-y-4">
                            <p className="text-white/70">Agregue sus enlaces de registro</p>
                            <Input
                                value={dataItem?.link || ''}
                                onChange={(e) => handleChange(e.target.value, "registry")}
                                placeholder="Registros"
                                className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                            />
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => onSave(dataItem?.registry || '')}
                                    className="bg-purple-600 hover:bg-purple-700 text-white">
                                    Agregar
                                </Button>
                            </div>
                        </div>
                    )}
                    {type === 'dress-code' && (
                        <div className="space-y-4">
                            <Input
                                value={dataItem?.dress || ''}
                                onChange={(e) => handleChange(e.target.value, "dress")}
                                placeholder="codigo vestimenta"
                                className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                            />
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => onSave(dataItem?.dress || '')}

                                    className="bg-purple-600 hover:bg-purple-700 text-white">
                                    Agregar
                                </Button>
                            </div>
                        </div>
                    )}
                    {type === 'more' && (
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start bg-white/10 border-white/10 text-white hover:bg-white/20">
                                🎵 Add Music
                            </Button>
                            <Button variant="outline" className="w-full justify-start bg-white/10 border-white/10 text-white hover:bg-white/20">
                                🎁 Add Registry
                            </Button>
                            <Button variant="outline" className="w-full justify-start bg-white/10 border-white/10 text-white hover:bg-white/20">
                                👔 Add Dress Code
                            </Button>
                            <Button variant="outline" className="w-full justify-start bg-white/10 border-white/10 text-white hover:bg-white/20">
                                📍 Add Location Details
                            </Button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}