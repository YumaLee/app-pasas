import { useEffect, useState } from "react";
import { Search, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import PexelsService from "@/shared/services/PexelService";

const categories = ["oceano", "fiesta", "girasol", "paisaje", "china"];

interface ImagePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage?: (image: string) => void;
}
interface PexelsPhoto {
  id: number;
  src: {
    medium: string;
    original: string;
  };
  photographer: string;
}

export function ImagePicker({ open, onOpenChange, onSelectImage }: ImagePickerProps) {
  const [activeTab, setActiveTab] = useState<"posters" | "gifs" | "photos">("posters");
  const [searchQuery, setSearchQuery] = useState("Ocean");
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before new request
        const response = await PexelsService.getImages(searchQuery, 10);
        if (response.status === 200) {
          setPhotos(response.data.photos);

        }

      } catch (err) {
        setError("Error al obtener imágenes de Pexels");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [searchQuery]);

  const handleSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      if (value !== "") {
        setSearchQuery(value);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-4xl p-0 bg-[#1A0505] text-white border-neutral-800">
        <div className="flex flex-col h-[80vh]">
          {/* Header */}
          <div className="p-4 border-b border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Engagement</h2>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="secondary"
                  className="rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-200"
                  onClick={() => setSearchQuery(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-neutral-800">
              {["posters", "gifs", "photos"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 text-sm font-medium ${activeTab === tab
                    ? "text-white border-b-2 border-purple-500"
                    : "text-neutral-400 hover:text-white"
                    }`}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}(0)
                </button>
              ))}
            </div>
          </div>

          {/* Search and Upload */}
          <div className="p-4 border-b border-neutral-800">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search posters..."
                  defaultValue={searchQuery}
                  onBlur={(e) => setSearchQuery(e.target.value.trim())}
                  onKeyDown={handleSearchInput}
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
            {loading && <p className="text-center text-white">Cargando imágenes...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, i) => (
                  <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden">
        
                    <LazyLoadImage
                      alt={photo.photographer}
                      //onLoad={() => console.log(onLoadText)}
                      //beforeLoad={() => console.log(beforeLoadText)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      //effect={effect}
                      height={384}
                      key={i}
                      //placeholderSrc={showLowResImages ? photo.lowResSrc : null}
                      //scrollPosition={scrollPosition}
                      src={photo.src.medium}
                      //threshold={threshold}
                      width={512}
                      wrapperClassName="gallery-img-wrapper" />


                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <Button
                          className="bg-purple-600 hover:bg-purple-700 text-white mb-2 w-32"
                          onClick={() => onSelectImage?.(photo.src.original)}
                        >
                          SELECT
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-sm font-medium">{photo.photographer}</h3>
                        <h3 className="text-white text-sm font-medium">{"Pexels"}</h3>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
