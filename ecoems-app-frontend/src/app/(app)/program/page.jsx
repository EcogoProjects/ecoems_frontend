import TopicAccordion from "@/components/analytics/TopicAccordion";
import MarginBottom from "@/components/MarginBottom";
import MarginTop from "@/components/MarginTop";
import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";
import { ecoems_program } from "@/utils/ecoems_program";

export default function ProgramPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-4">
      <MarginTop />
      <NavBarDesktop />
      <div className="w-9/10 md:w-4/5">
        <TopicAccordion topics={ecoems_program} />
      </div>
      <NavBarMovile />
      <MarginBottom />
    </div>
  );
}
