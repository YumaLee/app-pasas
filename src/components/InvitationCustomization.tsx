import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageIcon, Type, Sparkles, Image } from "lucide-react";

export function InvitationCustomization() {
  return (
    <div className="w-full bg-gradient-to-b from-white to-purple-50 py-32">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[48px] font-bold leading-[1.1] tracking-[-0.02em] mb-4">
            Fun, modern invites in 1-click
          </h2>
        
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button variant="outline" className="rounded-full px-6 gap-2">
            <ImageIcon className="h-4 w-4" />
            Backgrounds
          </Button>
          <Button variant="outline" className="rounded-full px-6 gap-2">
            <Type className="h-4 w-4" />
            Fonts
          </Button>
          <Button variant="outline" className="rounded-full px-6 gap-2">
            <Sparkles className="h-4 w-4" />
            Animations
          </Button>
          <Button variant="outline" className="rounded-full px-6 gap-2">
            <Image className="h-4 w-4" />
            Posters
          </Button>
        </div>

        <Card className="max-w-[800px] mx-auto overflow-hidden bg-white/80 backdrop-blur-sm">
          <div className="p-8 bg-gradient-to-br from-purple-100/50 to-pink-100/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold mb-2">26th Birthday Bash</h3>
                  <p className="text-lg text-neutral-600">Friday, April 5</p>
                  <p className="text-lg text-neutral-600">6:00pm</p>
                </div>

                <div>
                  <p className="text-neutral-600 mb-2">
                    Celebrate the end of being on my parents health insurance!
                  </p>
                </div>

                <div>
                  <p className="font-medium mb-2">Guest List</p>
                  <div className="flex -space-x-2">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center text-sm">
                      +9
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    🎉
                  </div>
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                    🤔
                  </div>
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    😢
                  </div>
                </div>
              </div>

              <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#7226ff] to-[#f042ff] p-6 flex items-center justify-center">
              <span className="text-8xl">26</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}