import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onSettingsClick: () => void;
  onPreviewClick: () => void;
}

export function ActionButtons({ onSettingsClick,onPreviewClick }: ActionButtonsProps) {
  return (
    <>
      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-14 h-14 rounded-full bg-[#0b0020] hover:bg-[#1e0056] text-white relative"
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
          onClick={onSettingsClick}
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
          onClick={onPreviewClick}
        >
          <span className="text-xl">👁️</span>
        </Button>
        <span className="text-[11px] text-white/70 font-medium mt-2">
          PREVIEW
        </span>
      </div>
    </>
  );
}