import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

interface EventPreviewProps {
  selectedImage: string;
  selectedIcon: number;
  onEditClick: () => void;
  onSelectIcon: (id: number) => void;
}

export function EventPreview({ selectedImage, selectedIcon, onEditClick, onSelectIcon }: EventPreviewProps) {

  const handleSelect = (id: number) => {
    onSelectIcon(id);
  };

  return (
    <div className="relative">
      <div className="sticky top-24 space-y-4">
        {/* Valentine Template */}
        <div className="aspect-square bg-[#2A2F2F] rounded-2xl overflow-hidden relative">
          <img
            src={selectedImage}
            alt="Valentine's Day Template"
            className="w-full h-full object-cover"
          />
          <Button
            className="absolute top-4 right-4 bg-[#7226ff] hover:bg-purple-700"
            onClick={onEditClick}
          >
            EDIT
          </Button>
        </div>

        {/* Open Invite Toggle */}
        <div className="bg-[#100229] rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-400">
            <span>Open Invite</span>
          </div>
          <span className="text-neutral-400">Apagado</span>
        </div>

        {/* RSVP Options */}
        <div className="bg-[#100229] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-neutral-400">RSVP Options</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-sm bg-[#2A1F1F] border-none text-white/70">
                  {!iconSets[selectedIcon - 1]?.name} ▼
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-0 bg-[#1A0505] border-neutral-800">
                <div className="py-2">
                  {iconSets.map((set) => (
                    <button
                      key={set.id}
                      className={`w-full px-4 py-2 text-left text-sm ${selectedIcon === set.id
                        ? "bg-purple-500/20 text-white"
                        : "text-white/70 hover:bg-white/10"
                        }`}
                      onClick={() => handleSelect(set.id)}
                    >
                      {set.icon} {set.name}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {iconSets.find(set => set.id === selectedIcon)?.icons.map((icon, index) => (
              <div
                key={index}
                className="aspect-square rounded-full bg-[#7226ff] flex items-center justify-center text-white"
              >
               <span className="text-5xl"> {icon}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2 text-center text-sm text-neutral-400">
            <div>Going</div>
            <div>Maybe</div>
            <div>Can't Go</div>
          </div>
        </div>
      </div>
    </div>
  );
}