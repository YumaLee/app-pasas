import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface QuickActionPopoverProps {
    type: 'link' | 'playlist' | 'registry' | 'dress-code' | 'more';
    children: React.ReactNode;
}

export function QuickActionPopover({ type, children }: QuickActionPopoverProps) {
    const getTitle = () => {
        switch (type) {
            case 'link':
                return 'Add Link';
            case 'playlist':
                return 'Add Playlist';
            case 'registry':
                return 'Add Registry';
            case 'dress-code':
                return 'Add Dress Code';
            case 'more':
                return 'More Options';
            default:
                return '';
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 bg-[#1A0505] border-neutral-800">
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
                                    ADD LINK
                                </Button>
                            </div>
                        </div>
                    )}
                    {type === 'playlist' && (
                        <div className="space-y-4">
                            <p className="text-white/70">Connect your favorite music streaming service</p>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full justify-start bg-white/10 border-white/10 text-white hover:bg-white/20">
                                    🎵 Spotify
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-white/10 border-white/10 text-white hover:bg-white/20">
                                    🎵 Apple Music
                                </Button>
                            </div>
                        </div>
                    )}
                    {type === 'registry' && (
                        <div className="space-y-4">
                            <p className="text-white/70">Add your registry links</p>
                            <Input
                                placeholder="Registry URL"
                                className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                            />
                            <div className="flex justify-end">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                    ADD REGISTRY
                                </Button>
                            </div>
                        </div>
                    )}
                    {type === 'dress-code' && (
                        <div className="space-y-4">
                            <Input
                                placeholder="e.g., Cocktail attire"
                                className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                            />
                            <div className="flex justify-end">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                    SAVE
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