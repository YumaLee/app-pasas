import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, User2Icon } from "lucide-react";

interface ActionButtonsProps {
  onEditClick: () => void;
  onBlastClick: () => void;
  onGoingClick: () => void;
  onInviteClick: () => void;
  onMoreClick: () => void;
  countAsistente: number;
}

export function ActionButtons({
  onEditClick,
  onBlastClick,
  onGoingClick,
  onInviteClick,
  onMoreClick,
  countAsistente
}: ActionButtonsProps) {

  return (
    <>
      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-14 h-14 rounded-full bg-[#0b0020] hover:bg-[#1e0056] text-white relative"
          onClick={onEditClick}
        >
          <Pencil className="w-7 h-7 text-white/50" />
        </Button>
        <span className="text-[15px] text-white/70 font-medium mt-2">
          Edits
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-14 h-14 rounded-full bg-[#0b0020] hover:bg-[#1e0056] text-white relative"
          onClick={onBlastClick}
        >
          <span className="text-xl w-7 h-7">👻</span>
        </Button>
        <span className="text-[15px] text-white/70 font-medium mt-2">
          Text Blast
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-14 h-14 rounded-full bg-[#0b0020] hover:bg-[#1e0056] text-white relative"
          onClick={onGoingClick}
        >
          <span className="text-xl w-7 h-7">{countAsistente}</span>
        </Button>
        <span className="text-[15px] text-white/70 font-medium mt-2">
          Going 
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-14 h-14 rounded-full bg-[#0b0020] hover:bg-[#1e0056] text-white relative"
          onClick={onInviteClick}
        >
          <User2Icon className="w-7 h-7 text-white/50" />
        </Button>
        <span className="text-[15px] text-white/70 font-medium mt-2">
          Invite
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          variant="ghost"
          className="w-14 h-14 rounded-full bg-[#0b0020] hover:bg-[#1e0056] text-white relative"
          onClick={onMoreClick}
        >
          <MoreHorizontal className="w-7 h-7 text-white/50" />

        </Button>
        <span className="text-[15px] text-white/70 font-medium mt-2">
          More
        </span>
      </div>

    </>
  );
}