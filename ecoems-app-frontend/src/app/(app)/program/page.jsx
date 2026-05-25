import TopicAccordion from "@/components/analytics/TopicAccordion";
import PaymentButton from "@/components/billing/PaymentButton";
import ExamDescription from "@/components/exam/ExamDescription";
import { ecoems_program } from "@/utils/ecoems_program";

export default function ProgramPage() {
  const examType = "Examen Rápido"
  const description = "Los exámenes rápidos son la herramienta de práctica cotidiana de ECOGO. Están diseñados para sesiones de estudio cortas y enfocadas, permitiendo al estudiante trabajar sobre subtemas."
  const time = "20 min"
  const n_questions = 15
  const range = "Subtema"
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-4">
      {/*<TopicAccordion topics={ecoems_program} />*/}
      <PaymentButton />
      <ExamDescription
        examTitle={examType}
        description={description}
        n_questions={n_questions}
        time={time}
        range={range}
      />
    </div>
  );
}
