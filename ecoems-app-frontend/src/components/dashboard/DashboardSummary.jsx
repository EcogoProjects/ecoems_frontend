"use client"

import SubjectScoreItem from "@/components/analytics/SubjectScoreItem";
import CircleAvgIndicator from "@/components/dashboard/CircleAvgIndicator";

export default function DashboardSummary({
  value = 0,
  topSubjectsScores = [],
  lastSubjectsScores = [],
}) {
  return (
    <div className="bg-base p-4 rounded-box-standard pt-12 pb-12 flex flex-col gap-5 shadow-lg md:col-span-1">
      <div className="flex items-center justify-center gap-1 pl-6 pr-6 md:flex-col md:items-center md:justify-center xl:flex-row">
        <div className="w-1/2 md:w-fit">
          <CircleAvgIndicator size={120} value={value} />
        </div>
        <p className="text-[16px] font-black w-1/2 text-center md:w-full lg:w-fit">
          Haz obtenido un promedio de aciertos igual a {value}%
        </p>
      </div>

      <div>
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

      <div>
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
    </div>
  );
}
