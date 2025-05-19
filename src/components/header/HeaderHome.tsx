import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, Plus, User, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/authStore";



interface HeaderHomeProps {
    checkedMotion: boolean;
    onEdit?: (data: any) => void;
    onReduceMotion?: () => void;
    isCreate: boolean;
}

export function HeaderHome({ isCreate, checkedMotion, onReduceMotion, onEdit }: HeaderHomeProps) {
    const navigate = useNavigate();
    const { profile, logout } = useAuthStore((state) => state);

    const onLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="top-0 left-0 right-0 bg-transparent z-50">
            <div className="max-w-[1400px] mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="https://pasas001.blob.core.windows.net/micontenedor-logo/logo.png"
                            alt="Pasas Logo"
                            className="h-6 md:h-8 w-auto"
                        />
                    </Link>
                    <div className="flex items-center gap-2 md:gap-4">

                        {
                            isCreate ?
                                <>
                                    <Button
                                        className="bg-[#8B3DFF] hover:bg-[#9B4DFF] text-white gap-2 px-3 md:px-4"
                                        onClick={() => navigate('/templates')}                                    >
                                        <Plus className="w-4 h-4" />
                                        <span className="hidden md:inline">Crear</span>
                                    </Button>

                                    <Button
                                        variant={"primary"}
                                        onClick={() => console.log('blok')}
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span className="hidden md:inline">Blog</span>
                                    </Button>
                                </>
                                : <Button
                                    variant={"primary"}
                                    onClick={() => navigate('/events')}

                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="hidden md:inline">Principal</span>
                                </Button>
                        }


            
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                            <Bell className="w-5 h-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white/70 hover:text-white hover:bg-white/10"
                                >
                                    <User className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 bg-[#0A0A0A] border-neutral-800 text-white">
                                <div className="px-2 py-3">
                                    <div
                                        className="flex items-center gap-3 mb-2 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                                        onClick={onEdit}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                                            <span className="text-white text-sm">{(profile?.nombre)?.substring(0, 2)}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-white/70">{profile?.nombre}</p>
                                            <p className="text-sm text-white/70">Ver tu Pefil</p>
                                        </div>
                                    </div>

                                </div>
                                <DropdownMenuSeparator className="bg-neutral-800" />
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-white text-white/70">
                                    Configuración
                                </DropdownMenuItem>
                                <div className="px-2 py-2" hidden>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-white/70">Reduce Motion</span>
                                        <Switch
                                            checked={checkedMotion}
                                            onCheckedChange={onReduceMotion}
                                            className="data-[state=checked]:bg-[#8B3DFF]"
                                        />
                                    </div>
                                </div>
                                <DropdownMenuSeparator className="bg-neutral-800" />
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-white text-white/70">
                                    <div className="px-2 py-2">
                                        <div className="flex items-center justify-between"
                                            onClick={onLogout}
                                        >
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-white/70 hover:text-white hover:bg-white/10">
                                                <LogOut className="w-5 h-5" />
                                            </Button>
                                            <span className="text-sm text-white/70">Salir</span>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </div>
        </header>
    );
}