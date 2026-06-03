"use client"

import SubjectScoreItem from "@/components/analytics/SubjectScoreItem";
import CircleAvgIndicator from "@/components/dashboard/CircleAvgIndicator";

export default function DashboardSummary({
  value = 0,
  topSubjectsScores = [],
  lastSubjectsScores = [],
  subjectsLayout = "responsive",
  containerWidth = "w-4/5",
  summaryLayout = "responsive",
}) {
  const summaryWrapperClass =
    summaryLayout === "stacked"
      ? "flex w-full flex-col gap-5 pl-6 pr-6"
      : "flex w-full flex-col gap-5 pl-6 pr-6 lg:flex-row lg:items-center lg:justify-between";

  const subjectsWrapperClass =
    subjectsLayout === "stacked"
      ? "flex w-full flex-col gap-4"
      : "flex w-full flex-col gap-4 xl:flex-row";

  const subjectColumnClass =
    subjectsLayout === "stacked"
      ? "w-full min-w-0"
      : "w-full min-w-0 xl:flex-1 xl:basis-0";

  return (
    <div className={`bg-base p-4 rounded-box-standard pt-12 ${containerWidth} pb-12 flex flex-col gap-9 shadow-lg md:col-span-1`}>
      <div className={summaryWrapperClass}>
        <div className="flex flex-wrap items-center justify-start gap-4">
          <div className="shrink-0">
            <CircleAvgIndicator size={96} strokeWidth={22} value={value} showValue={false} />
          </div>
          <p className="shrink-0 text-5xl font-black leading-none text-base-dark">
            {value}%
          </p>
          <div className="h-14 w-px shrink-0 bg-base-dark/20" />
          <p className="max-w-[280px] text-left text-[16px] font-black text-base-dark">
            Haz obtenido un promedio de aciertos
          </p>
        </div>

        <div className="w-full border-l-4 border-base-hard bg-base-soft px-5 py-4 text-left shadow-sm lg:max-w-[320px]">
          <p className="mt-1 text-lg font-bold leading-snug text-base-dark">
            Lorem ipsum dolor sit amet, enfoca tu energia y avanza hoy.
          </p>
        </div>
      </div>

      <div className={subjectsWrapperClass}>
        <div className={subjectColumnClass}>
          <h2 className="w-full text-base bg-base-dark rounded-[11px] p-1.5 text-center tracking-wider font-bold mb-2.5">
            Materias que más dominas
          </h2>
          <div className="flex flex-col pl-2 pr-2 gap-2">
            {topSubjectsScores.map((item, index) => (
              <SubjectScoreItem
                key={`${item.subject}-${index}`}
                position={index + 1}
                subject={item.subject}
                score={item.score}
              />
            ))}
          </div>
        </div>

        <div className={subjectColumnClass}>
          <h2 className="w-full text-base bg-base-dark rounded-[11px] p-1.5 text-center tracking-wider font-bold mb-2.5">
            Materias que debes repasar
          </h2>
          <div className="flex flex-col pl-2 pr-2 gap-2">
            {lastSubjectsScores.map((item, index) => (
              <SubjectScoreItem
                key={`${item.subject}-${index}`}
                position={index + 1}
                subject={item.subject}
                score={item.score}
              />
            ))}
          </div>
        </div>

        <div className={subjectColumnClass}>
          <h2 className="w-full text-base bg-base-dark rounded-[11px] p-1.5 text-center tracking-wider font-bold mb-2.5">
            Materias sin repasar
          </h2>
          <div className="flex flex-col pl-2 pr-2 gap-2">
            {lastSubjectsScores.map((item, index) => (
              <SubjectScoreItem
                key={`${item.subject}-${index}`}
                position={index + 1}
                subject={item.subject}
                score={item.score}
              />
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}
