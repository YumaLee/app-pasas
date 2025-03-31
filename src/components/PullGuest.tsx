import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface PullGuestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (options: string[]) => void; 
}

export function PullGuest({ open, onOpenChange, onContinue }: PullGuestProps) {
  const [options, setOptions] = useState<string[]>(["", "", ""]);
  const [showPreview, setShowPreview] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleBack = () => {
    setShowPreview(false);
  };

  const handleContinue = () => {
    setShowPreview(true);
  };

  const handleSave = () => {
    const validOptions = options.filter(opt => opt.trim() !== "");
    onContinue(validOptions);
  };

  if (showPreview) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-xl bg-[#1A0505] text-white border-neutral-800">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/50 hover:text-white"
                onClick={handleBack}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <DialogTitle className="text-2xl font-bold">Preview & Confirm</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-4 my-6">
            <div>
              <h3 className="text-lg text-white/90 mb-2">Here's how your guests will RSVP 🎉</h3>
              <div className="bg-[#2A1818] rounded-lg p-6">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-medium text-white/90">RSVP to what works for you ⌛</h4>
                  <p className="text-sm text-white/50 mt-1">
                    You won't need to re-RSVP when the host decides
                  </p>
                </div>

                <div className="space-y-4">
                  {options.filter(opt => opt.trim() !== "").map((option, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white/90">{option}</span>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/90 hover:bg-white/20 cursor-pointer">
                          ✓
                        </div>
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500/30 cursor-pointer">
                          ?
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/90 hover:bg-white/20 cursor-pointer">
                          ✕
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => onOpenChange(false)}
            >
              GO BACK
            </Button>
            <Button
              type="button"
              className="bg-purple-600 hover:bg-purple-700 text-white min-w-[120px]"
              onClick={handleSave}
            >
              SAVE
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-[#1A0505] text-white border-neutral-800">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Find a Time</DialogTitle>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-white/90">
              Have guests RSVP to multiple date/time options, and pick one when you're ready!{" "}
              <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                How it works →
              </Button>
            </p>
            <p className="text-sm text-white/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/50"></span>
              Not supported with Chip-in or Guest Approval
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-3 my-4">
          {options.map((option, index) => (
            <div key={index} className="relative">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/50">Option {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-white/50 hover:text-white absolute right-2 top-2"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder="Add a date/time option..."
                  className="mt-2 bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0"
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="ghost"
          className="w-full border-2 border-dashed border-white/10 text-white/50 hover:text-white hover:bg-white/5"
          onClick={handleAddOption}
        >
          + Add another option
        </Button>

        <div className="flex items-center justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => onOpenChange(false)}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            className="bg-purple-600 hover:bg-purple-700 text-white min-w-[120px]"
            onClick={handleContinue}
          >
            CONTINUE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}