
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { InvitationCustomization } from "@/components/InvitationCustomization";
import { PostersSection } from "@/components/PostersSection";
import { TemplatesSection } from "@/components/TemplatesSection";
import { LightModeSection } from "@/components/LightModeSection";
import { PowerFeaturesSection } from "@/components/PowerFeaturesSection";
import { PhotosBreakSection } from "@/components/PhotosBreakSection";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { NavigationHome } from "@/components/NavigationHome";
import { ContentHome } from "@/components/ContentHome";

export function HomePage() {

  return (
    <div
      className="min-h-screen relative bg-white"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)'
      }}
    >
      <NavigationHome />

      {/* Main Content */}
      <main className="relative">

        <ContentHome />
        <TestimonialsCarousel />
        <InvitationCustomization />
        <LightModeSection />
        <PowerFeaturesSection />
        <PhotosBreakSection />
        <TemplatesSection />
        <BlogSection />
        <PostersSection />
      </main>

      <Footer />
    </div>
  );
}