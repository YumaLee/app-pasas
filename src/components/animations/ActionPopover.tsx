import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useAnimationStore } from "@/store/animationStore";

interface ActionPopoverProps {
    type: 'link' | 'aminacion' | 'more';
    children: React.ReactNode;
}
interface Animation {
    emoji: string;
}

export function ActionPopover({ type, children }: ActionPopoverProps) {
    const getTitle = () => {
        switch (type) {
            case 'link':
                return 'Link';

            case 'aminacion':
                return 'aminacion';
            case 'more':
                return 'Mas Opciones';
            default:
                return '';
        }
    };

    const { settingAnimation } = useAnimationStore((state) => state);


    const iconSets = ["👍", "🤔", "👎","🥰","😍","💋","🌼","🪷","🐽","🐶","🐼","🐾","🍀","🌻","🌼"]

    const handleSelect = (emoji: any) => {
        settingAnimation({emoji} as Animation )
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-90 p-0 bg-[#1A0505] border-neutral-800">
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">{getTitle()}</h3>
                    {type === 'link' && (
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Link className="h-4 w-4 text-white/50" />
                                </div>
                                <Input
                                    placeholder="https://yourlink.com"
                                    className="pl-9 bg-white/10 border-white/10 text-white placeholder:text-white/50"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                    Agregar
                                </Button>
                            </div>
                        </div>
                    )}
                    {type === 'aminacion' && (

                        <div className="grid grid-cols-3 grid-rows-4 gap-3 text-white">
                            <div >
                                <Button onClick={() => handleSelect('')} variant="outline" className="w-full">

                                </Button>
                            </div>

                            {iconSets.map((emoji, i) => (
                                <div
                                    key={i}>
                                    <Button onClick={() => handleSelect(emoji)}
                                        variant="outline" className="w-full">
                                        <span>{emoji}</span>
                                    </Button>
                                </div>
                            ))}
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