import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {  X } from "lucide-react";

interface ImageViewerProps {
  imageUrl: string;
  userName: string;
  userAvatar: string;
  timeAgo: string;
}

export default function ImageViewer({
  imageUrl,
  userName,
  userAvatar,
  timeAgo,
}: ImageViewerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">
        <img
          src={imageUrl}
          alt="Thumbnail"
          className="w-full h-full object-cover rounded-lg"

        />
      </DialogTrigger>

      <DialogContent className="fixed  flex items-center justify-center bg-black/60 p-0">
        <div className="relative flex flex-col bg-green-300 w-full h-full max-w-5xl rounded-lg overflow-hidden">
          {/* Botón de cerrar */}
          <button
            className="absolute top-4 left-4 bg-black/30 text-white p-2 rounded-full"
            onClick={() => setOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Imagen principal */}
          <div className="flex-1 flex items-center justify-center bg-green-100">
            <img
              src={imageUrl}
              alt="Image Preview"
              className="max-h-[80vh] object-cover rounded-lg"
            />
          </div>

          {/* Barra de información y reacciones */}
          <div className="bg-green-300 p-4 flex flex-col items-center">
            <div className="flex gap-3">
              <button className="p-2 text-lg hover:scale-110">🤣</button>
              <button className="p-2 text-lg hover:scale-110">🔥</button>
              <button className="p-2 text-lg hover:scale-110">🤡</button>
              <button className="p-2 text-lg hover:scale-110">❤️</button>
              <button className="p-2 text-lg hover:scale-110">👀</button>
            </div>

            <div className="flex items-center gap-3 mt-3 w-full p-2">
              <img
                src={userAvatar}
                alt={userName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-blue-600 font-semibold">{userName}</span>
                <span className="text-sm text-gray-500">{timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
