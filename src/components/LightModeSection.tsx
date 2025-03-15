import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Send } from "lucide-react";

const comments = [
  {
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    name: "Joy",
    text: "I stopped taking 🎉",
    reactions: 2,
    replies: 1
  },
  {
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    name: "Sammy",
    text: "SOS can anyone bring more drinks + snacks?",
    reactions: 4,
    replies: 2
  },
  {
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    name: "Lisa",
    text: "I have popcorn + pretzels",
    reactions: 3,
    replies: 1
  }
];

export function LightModeSection() {
  return (
    <div className="w-full bg-gradient-to-b from-white to-blue-50/50 py-16 md:py-32">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-center mb-16">
          We're not like other invites
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Comments Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">See who's going 👀</h3>
                  <Button variant="outline" size="sm">
                    View all
                  </Button>
                </div>

                {comments.map((comment, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <img
                      src={comment.avatar}
                      alt={comment.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-neutral-100 rounded-2xl p-3">
                        <p className="font-medium text-sm mb-1">{comment.name}</p>
                        <p className="text-neutral-600">{comment.text}</p>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-neutral-500">
                        <button className="flex items-center gap-1 hover:text-neutral-900">
                          <ThumbsUp className="w-4 h-4" />
                          {comment.reactions}
                        </button>
                        <button className="flex items-center gap-1 hover:text-neutral-900">
                          <MessageCircle className="w-4 h-4" />
                          {comment.replies}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text Blast Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Text Blast your guests</h3>
                <p className="text-neutral-600">
                  Running late, need more drinks, 10 people texting you asking how to get in?
                </p>
                <p className="text-neutral-600">
                  Send updates to everyone at once.
                </p>

                <div className="bg-neutral-100 rounded-2xl p-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-white">
                      🎉
                    </div>
                    <div className="flex-1">
                      <div className="bg-white rounded-2xl p-3 shadow-sm">
                        <p className="text-sm text-neutral-500 mb-1">The host of Birthday Bash sent you a Text Blast 💥</p>
                        <p className="text-neutral-800">Hey!! Buzz #2 when you arrive 🎉 Can't wait to celebrate!</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center bg-white rounded-full px-4 py-2 shadow-sm">
                    <Send className="w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Message"
                      className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-[#7226ff] to-[#f042ff] text-white hover:opacity-90">
                  Create event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}