import { Button } from "@/components/ui/button";

interface BrowseTemplatesBannerProps {
  showBanner: boolean;
  onCloseBanner: () => void;
  isHeaderVisible: boolean;
}

export function BrowseTemplatesBanner({ showBanner, onCloseBanner, isHeaderVisible }: BrowseTemplatesBannerProps) {
  if (!showBanner) return null;

  return (
    <div 
      className={`fixed left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl transition-all duration-300 ${
        isHeaderVisible ? 'top-20' : 'top-4'
      }`}
    >
      <div className="mx-4 bg-[#2A1818] rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1">
            <img src="template1.jpg" alt="" className="w-6 h-6 rounded-sm" />
            <img src="template2.jpg" alt="" className="w-6 h-6 rounded-sm" />
            <img src="template3.jpg" alt="" className="w-6 h-6 rounded-sm" />
          </div>
          <span className="text-white/70">Need help getting started?</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="bg-[#3A2828] hover:bg-[#4A3838] text-white border-none">
            Browse Templates
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white/50 hover:text-white"
            onClick={onCloseBanner}
          >
            X
          </Button>
        </div>
      </div>
    </div>
  );
}