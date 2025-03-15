import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function PowerFeaturesSection() {
  return (
    <div className="w-full bg-[#09031e] text-white py-16 md:py-32">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#7226ff] to-[#f042ff] mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] mb-4">
            Powerful features, easy events
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Poll Feature */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Poll your guests to find a time</h3>
            <p className="text-neutral-400 text-lg">
              No more clunky forms, or messy group chats. Send event invites with built-in polling, to find dates that work for everyone.
            </p>
            <Button className="bg-white text-black hover:bg-white/90">
              Create event
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
              alt="Event Polling"
              className="relative rounded-3xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Questionnaire Feature */}
          <div className="relative order-4 md:order-3">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-neutral-900 rounded-3xl p-6 border border-white/10">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <div className="bg-neutral-800 rounded-2xl p-3">
                    <p className="text-white">Have any dietary restrictions?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pl-12">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-neutral-800 rounded-2xl p-3">
                    <p className="text-white">I'm gluten-free!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pl-12">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-neutral-800 rounded-2xl p-3">
                    <p className="text-white">yes! vegetarian 🌱</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 order-3 md:order-4">
            <h3 className="text-2xl font-semibold">Collect answers from guests 📝</h3>
            <p className="text-neutral-400 text-lg">
              Use a questionnaire to ask about dietary restrictions, emails, socials, and crushes.
            </p>
            <Button className="bg-white text-black hover:bg-white/90">
              Create event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}