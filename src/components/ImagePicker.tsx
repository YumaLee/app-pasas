import { useState } from "react";
import { X, Search, Upload } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "Trending",
  "Birthday",
  "College",
  "Community Made",
  "Chill",
  "Not Chill",
  "Dinner Party",
  "Holiday",
  "Theme Party",
  "Outdoors",
  "Happy Hour"
];

const images = [
  {
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
    title: "Wine Party"
  },
  {
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176",
    title: "Forever"
  },
  {
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df",
    title: "Nail Salon"
  },
  {
    url: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce",
    title: "Engaged"
  },
  {
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
    title: "Party"
  },
  {
    url: "https://images.unsplash.com/photo-1503249023995-51b0f3778ccf",
    title: "Retro"
  }
];

interface ImagePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage?: (image: string) => void;
}

export function ImagePicker({ open, onOpenChange, onSelectImage }: ImagePickerProps) {
  const [activeTab, setActiveTab] = useState<"posters" | "gifs" | "photos">("posters");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-[#1A0505] text-white border-neutral-800">
        <div className="flex flex-col h-[80vh]">
          {/* Header */}
          <div className="p-4 border-b border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Engagement</h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-400 hover:text-white"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="secondary"
                  className="rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-200"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-neutral-800">
              <button
                className={`pb-2 text-sm font-medium ${
                  activeTab === "posters"
                    ? "text-white border-b-2 border-purple-500"
                    : "text-neutral-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("posters")}
              >
                Posters(20+)
              </button>
              <button
                className={`pb-2 text-sm font-medium ${
                  activeTab === "gifs"
                    ? "text-white border-b-2 border-purple-500"
                    : "text-neutral-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("gifs")}
              >
                GIFs(0)
              </button>
              <button
                className={`pb-2 text-sm font-medium ${
                  activeTab === "photos"
                    ? "text-white border-b-2 border-purple-500"
                    : "text-neutral-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("photos")}
              >
                Photos(0)
              </button>
            </div>
          </div>

          {/* Search and Upload */}
          <div className="p-4 border-b border-neutral-800">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search posters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400"
                />
              </div>
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <Upload className="h-4 w-4" />
                UPLOAD
              </Button>
            </div>
          </div>

          {/* Image Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white mb-2 w-32"
                        onClick={() => onSelectImage?.(image.url)}
                      >
                        SELECT
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-sm font-medium">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}