import SyllabusAccordion from "@/components/analytics/SyllabusAccordion";
import MarginBottom from "@/components/MarginBottom";
import MarginTop from "@/components/MarginTop";
import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";

export default function ProgramPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-4">
      <MarginTop />
      <NavBarDesktop />
      <div className="w-9/10 md:w-4/5">
        <SyllabusAccordion />
      </div>
      <NavBarMovile />
      <MarginBottom />
    </div>
  );
}
