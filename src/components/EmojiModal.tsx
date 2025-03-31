import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';



interface EmojitProps {
  open: boolean;
  onOpen: (open: boolean) => void;
  onAcept: (value: string) => void;

}

export function EmojiModal({ open, onOpen, onAcept }: EmojitProps) {
  const [emoji, setEmoji] = useState("");


  const handleChange = (e: any) => {
    setEmoji((prevEmoji) => prevEmoji + e.emoji);
  };

  const handleCancel = () => {
    setEmoji("");
    onOpen(!open);
  };

  const handleAcept = () => {
    setEmoji("");
    onAcept(emoji);
  };


  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent className="w-auto text-white border-neutral-800">


        <div className="space-y-3 my-4">
          <div className="mx-2 bg-slate-400 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-white/70">{emoji}</span>
            </div>

          </div>

          <EmojiPicker
            onEmojiClick={handleChange}
          />

        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white min-w-[120px]"
            onClick={handleCancel}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            className="bg-purple-600 hover:bg-purple-700 text-white min-w-[120px]"
            onClick={handleAcept}
          >
            CONTINUE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}