import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CTABanner from "@/components/planes/CTABanner";
import FAQSection from "@/components/planes/FAQSection";


export default function PlanesPage() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen w-full">
                <CTABanner />
                <FAQSection />
            </div>
            <Footer />
        </>
    );
}