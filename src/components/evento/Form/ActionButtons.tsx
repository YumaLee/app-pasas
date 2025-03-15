import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface ActionButtonsProps {
  onThemeClick: () => void;
  onEfectClick: () => void;
  onSettingClick: () => void;
  onDoneClick: () => void;
}

export function ActionButtons({
  onThemeClick,
  onEfectClick,
  onSettingClick,
  onDoneClick
}: ActionButtonsProps) {
  return (
    <>
      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-14 h-14 rounded-full bg-[#0b0020] hover:bg-[#1e0056] text-white relative"
          onClick={onThemeClick}
        >
          <span className="text-xl">🎨</span>
        </Button>
        <span className="text-[11px] text-white/70 font-medium mt-2">
          THEME
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-14 h-14 rounded-full bg-[#0b0020] hover:bg-[#1e0056] text-white relative"
          onClick={onEfectClick}
        >
          <span className="text-xl">💝</span>
        </Button>
        <span className="text-[11px] text-white/70 font-medium mt-2">
          EFFECT
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-14 h-14 rounded-full bg-[#0b0020] hover:bg-[#1e0056] text-white relative"
          onClick={onSettingClick}
        >
          <span className="text-xl">⚙️</span>
        </Button>
        <span className="text-[11px] text-white/70 font-medium mt-2">
          SETTINGS
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-14 h-14 rounded-full bg-[#0b0020] hover:bg-[#1e0056] text-white relative"
          onClick={onDoneClick}
        >
          <LogOut className="w-4 h-4 text-white/50" />

        </Button>
        <span className="text-[11px] text-white/70 font-medium mt-2">
          DONE
        </span>
      </div>
    </>
  );
}