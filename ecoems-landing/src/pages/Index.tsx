import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="space-y-0">
        <HeroSection />
        <FeatureCards />
        <FeaturesSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
