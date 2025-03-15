import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Crown, MapPin, Music, Users, Link as LinkIcon, Camera, Image, SmilePlus, ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ViewEventProps {
  event?: {
    title: string;
    date: string;
    host: {
      name: string;
      avatar: string;
      initials: string;
    };
    location: string;
    spots: string;
    description: string;
    image: string;
  };
}

export function Preview({
  event = {
    title: "yumaa",
    date: "Date & Time TBD",
    host: {
      name: "julia Lopes",
      avatar: "",
      initials: "JL"
    },
    location: "No Location Set",
    spots: "76/76 spots left",
    description: "aaaaaazz",
    image: "https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4"
  }
}: ViewEventProps) {
  const [openInvite, setOpenInvite] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#1A0505] border-neutral-800">
              <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                Share Event
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                Report Event
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-8">
        {/* Mobile Event Image */}
        <div className="md:hidden -mx-4 mb-6">
          <div className="aspect-[16/9] relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
                <p className="text-lg text-white/70">{event.date}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">
                {['🥶', '❄️', '👻'].map((emoji, index) => (
                  <Button
                    key={index}
                    className="h-14 bg-purple-600/20 hover:bg-purple-600/30 rounded-full"
                  >
                    <span className="text-xl">{emoji}</span>
                  </Button>
                ))}
              </div>
        </div>

        <div className="grid md:grid-cols-[1fr,350px] gap-8">
          {/* Left Column */}
          <div className="space-y-6 md:space-y-8">
            {/* Desktop Title */}
            <div className="hidden md:flex items-start justify-between">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{event.title}</h1>
                <p className="text-xl text-white/70">{event.date}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white"
                  >
                    <MoreHorizontal className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-[#1A0505] border-neutral-800">
                  <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                    Share Event
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                    Report Event
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Host Info */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-white/50" />
                <span className="text-white/50">Hosted by</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white text-sm">
                  {event.host.initials}
                </div>
                <span className="text-white">{event.host.name}</span>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span className="break-words">{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Users className="h-5 w-5 flex-shrink-0" />
                <span>{event.spots}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Music className="h-5 w-5 flex-shrink-0" />
                <span>yyyy</span>
              </div>


            </div>

            {/* Description */}
            <div className="text-white/70">
              <p className="break-words">{event.description} AAAA</p>

            </div>

            {/* Open Invite Section */}
            <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-xl">↗️</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Open Invite</h3>
                  <p className="text-white/70 text-sm">Anyone with the link can RSVP</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => setOpenInvite(!openInvite)}
              >
                {openInvite ? "ON" : "OFF"}
              </Button>
            </div>

            {/* Photo Album Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-white">Photo Album</h2>
                <Button
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
                >
                  <LinkIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Copy link</span>
                </Button>

                <Button
                  variant="outline"
                  className="aspect-square rounded-lg border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-white flex flex-col items-center justify-center gap-2 max-h-[200px]"
                >
                  <Camera className="h-6 w-6" />
                  <span className="text-sm">Add photos</span>
                </Button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-4 gap-3">
                <div className="aspect-square rounded-lg overflow-hidden max-h-[200px]">
                  <img
                    src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"
                    alt="Event photo"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Placeholder for future photos */}
                <div className="aspect-square rounded-lg bg-white/5 overflow-hidden max-h-[200px]"></div>
                <div className="aspect-square rounded-lg bg-white/5 overflow-hidden max-h-[200px]"></div>
                <div className="aspect-square rounded-lg bg-white/5 overflow-hidden max-h-[200px]"></div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">Activity</h2>

              {/* Comment Input */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-pink-400 flex-shrink-0 flex items-center justify-center text-white text-sm">
                  JL
                </div>
                <div className="flex-1 bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      className="flex-1 bg-transparent border-none text-white placeholder:text-white/50 focus:outline-none text-sm md:text-base"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/50 hover:text-white hover:bg-white/10 h-8 w-8"
                      >
                        <SmilePlus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/50 hover:text-white hover:bg-white/10 h-8 w-8"
                      >
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-white/50">
                    <Button variant="ghost" className="h-auto p-0 hover:text-white hover:bg-transparent">
                      GIF
                    </Button>
                    <Button variant="ghost" className="h-auto p-0 hover:text-white hover:bg-transparent">
                      Photo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Activity Item */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                    alt="julia Lopes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-purple-400 font-medium text-sm md:text-base">julia Lopes</span>
                      <span className="text-white/50 text-sm">added to Photo Album</span>
                      <span className="text-white/50 text-xs">about 2 hours ago</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/50 hover:text-white hover:bg-white/10 h-8 w-8"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="rounded-lg overflow-hidden mb-3 w-[300px]">
                    <img
                      src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"
                      alt="Added photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {['🤯', '🥺', '⭐', '🥰'].map((emoji, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="h-7 md:h-8 px-2 md:px-3 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center gap-1"
                        >
                          <span className="text-sm md:text-base">{emoji}</span>
                          <span className="text-xs md:text-sm">1</span>
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        className="h-7 md:h-8 px-2 md:px-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
                      >
                        <SmilePlus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      className="h-7 md:h-8 px-2 md:px-3 text-white/50 hover:text-white hover:bg-white/10 text-sm"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative hidden md:block">
            <div className="sticky top-8 space-y-6">
              {/* Event Image */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RSVP Options */}
              <div className="grid grid-cols-3 gap-3">
                {['🥶', '❄️', '👻'].map((emoji, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <span className="text-2xl lg:text-3xl">{emoji}</span>
                    </div>
                    <span className="text-white/70 text-sm">
                      {index === 0 ? 'Going' : index === 1 ? 'Maybe' : "Can't Go"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Guest List Preview */}
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Guest List</h3>
                  <Button variant="ghost" className="text-white/70 hover:text-white">
                    See all
                  </Button>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-[#1A0505] flex items-center justify-center text-white text-sm"
                    >
                      JL
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#1A0505] flex items-center justify-center text-white text-sm">
                    +3
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile RSVP Options */}
          <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-black/90 to-black/0 p-4">
            <div className="grid grid-cols-3 gap-3">
              {['🥶', '❄️', '👻'].map((emoji, index) => (
                <Button
                  key={index}
                  className="h-14 bg-purple-600/20 hover:bg-purple-600/30 rounded-xl"
                >
                  <span className="text-xl">{emoji}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}