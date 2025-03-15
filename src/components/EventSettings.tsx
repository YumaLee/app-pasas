import { useState } from "react";
import { Users, MessageSquare, FileQuestion, Users2, ImagePlay, CreditCard, Bell, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface EventSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const settingsMenuItems = [
  { icon: Users, label: "Hosts", description: "Hosts can edit & manage this event, including adding/removing other cohosts" },
  { icon: MessageSquare, label: "RSVPs" },
  { icon: FileQuestion, label: "Questionnaire" },
  { icon: Users2, label: "Display + Privacy" },
  { icon: ImagePlay, label: "Photo Album" },
  { icon: CreditCard, label: "Chip In" },
  { icon: Bell, label: "Auto-Reminders" },
  { icon: ShieldCheck, label: "COVID-19 Safety" },
];

export function EventSettings({ open, onOpenChange }: EventSettingsProps) {
  const [selectedSetting, setSelectedSetting] = useState("Hosts");
  const [enableCohostLink, setEnableCohostLink] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#100229] text-white border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-6">Event Settings</DialogTitle>
        </DialogHeader>

        {/* Mobile Menu - Horizontal Scrolling */}
        <div className="md:hidden -mx-6 mb-6">
          <div className="overflow-x-auto no-scrollbar px-6">
            <div className="flex gap-3 min-w-max pb-4">
              {settingsMenuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={`w-full justify-start gap-3 px-4 py-3 ${
                    selectedSetting === item.label
                      ? "bg-[#000000] text-white"
                      : "text-neutral-400 hover:text-white hover:bg-[#0f0f0f]"
                  }`}
                  onClick={() => setSelectedSetting(item.label)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mx-6" />
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar - Vertical */}
          <div className="hidden md:block w-64 space-y-1">
            {settingsMenuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={`w-full justify-start gap-3 px-4 py-3 ${
                  selectedSetting === item.label
                    ? "bg-[#2A1818] text-white"
                    : "text-neutral-400 hover:text-white hover:bg-[#2A1818]"
                }`}
                onClick={() => setSelectedSetting(item.label)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {selectedSetting === "Hosts" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Hosts</h3>
                  <p className="text-neutral-400 text-sm">
                    Hosts can edit & manage this event, including adding/removing other cohosts
                  </p>
                  <p className="text-neutral-500 text-sm mt-1">
                    Pending hosts will be notified after you save your event
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-[#000000] p-3 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
                    YN
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Your Name</span>
                      <span className="text-xs text-neutral-500">You</span>
                    </div>
                    <span className="text-xs text-purple-400">Creator</span>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-[#7226ff] to-[#f042ff] hover:from-[#611fd1] hover:to-[#d838e6] text-white">
                  ADD COHOST
                </Button>

                <div className="pt-6 border-t border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Add cohost with a link</span>
                      <span className="text-xs text-neutral-500">Save event to enable link sharing</span>
                    </div>
                    <Switch
                      checked={enableCohostLink}
                      onCheckedChange={setEnableCohostLink}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Add other settings content here */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}