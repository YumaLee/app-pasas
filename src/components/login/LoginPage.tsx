import { LoginHeader } from "@/components/login/LoginHeader";
import { LoginContent } from "@/components/login/LoginContent";
import { LoginFooter } from "@/components/login/LoginFooter";

export function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: "conic-gradient(from 0deg, #7126ff, #f142ff, #7126ff, #4c00ff, #ab2666, #09f)",
            filter: "blur(150px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-[1200px] mx-auto px-4">
          <LoginHeader />
          <LoginContent />
          <LoginFooter />
        </div>
      </div>
    </div>
  );
}