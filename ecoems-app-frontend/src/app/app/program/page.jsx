import TopicAccordion from "@/components/analytics/TopicAccordion";
import { ecoems_program } from "@/utils/ecoems_program";

export default function ProgramPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-4">
      <TopicAccordion topics={ecoems_program} />
    </div>
  );
}
