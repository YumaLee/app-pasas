import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/EventForm";
import { EventSettings } from "@/components/EventSettings";
import { BrowseTemplatesBanner } from "@/components/BrowseTemplatesBanner";
import { ActionButtons } from "@/components/ActionButtons";
import { Link, useNavigate } from "react-router-dom";

export function TemplateCategoryPage() {
  const [selectedFont, setSelectedFont] = useState("Classic");
  const [showBanner, setShowBanner] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const isHeaderVisible=true;
  const navigate = useNavigate();


  const handleSave = (data: any) => {
    console.log(data)
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#310f7a] to-[#821c8d] relative overflow-hidden">
      {/* Fixed Header */}
      <div
        className="top-0 left-0 right-0 z-50 bg-[#000]/80 backdrop-blur-sm border-b border-white/10 transition-transform duration-300"
      >
        <header className="max-w-[1400px] mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://pasas001.blob.core.windows.net/micontenedor-logo/logo.png"
              alt="Pasas Logo"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/faq" className="text-sm text-white/60 hover:text-white transition-colors">
              FAQ
            </Link>
            <Button className="bg-[#7226ff] hover:bg-purple-700 text-white">
              LOGIN
            </Button>
          </div>
        </header>
      </div>

      {/* Browse Templates Banner */}
      <BrowseTemplatesBanner
        showBanner={showBanner}
        onCloseBanner={() => setShowBanner(false)}
        isHeaderVisible={isHeaderVisible}
      />

      {/* Right Side Fixed Buttons - Desktop Only */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col">
        <div className="w-[100px] bg-[#100229] py-6 flex flex-col items-center gap-8">
          <ActionButtons
            onSettingsClick={() => setShowSettings(true)}
            onPreviewClick={() => navigate('/preview')}

          />
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-10 pb-32 md:pb-12 px-4">
        <div className="max-w-[1200px] mx-auto">
          <EventForm
            selectedFont={selectedFont}
            onFontSelect={setSelectedFont}
            onSave={handleSave}
          />
        </div>
      </main>

      <EventSettings
        open={showSettings}
        onOpenChange={setShowSettings}
      />

      {/* Mobile Footer Menu */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-[#7226ff] border-t border-white/10">
          <div className="grid grid-cols-4 gap-1 p-2">
            <ActionButtons
              onSettingsClick={() => setShowSettings(true)}
              onPreviewClick={() => navigate('/preview')}
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-[#7226ff] to-[#f042ff] hover:from-[#5e1fdc] hover:to-[#d936d3] text-white py-4 text-lg font-medium rounded-none">
            SAVE DRAFT
          </Button>
        </div>
      </div>
    </div>
  );
}