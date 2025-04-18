import { Button } from "@/components/ui/button";


export function ContentHome() {
  return (
    <div className="max-w-[1200px] mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-16 items-center min-h-screen py-20">
      <div className="max-w-[540px]">
        <h1 className="text-[64px] font-bold leading-[1.1] tracking-[-0.02em] mb-6">
          Plan events in seconds
        </h1>
        <p className="text-xl text-neutral-600 mb-8 font-normal">
          The easiest way to get your guests on the same page
        </p>
        
      

 
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-white rounded-3xl blur-3xl opacity-70"></div>
        <div className="relative">
          <video 
            className="rounded-3xl shadow-2xl w-full"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source 
              src="https://storage.googleapis.com/assets.partiful.app/landing_page/hero.mp4" 
              type="video/mp4" 
            />
          </video>
        </div>
      </div>
    </div>
  </div>

  );
}