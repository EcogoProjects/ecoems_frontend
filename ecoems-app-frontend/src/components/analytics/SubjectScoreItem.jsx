"use client"

export default function SubjectScoreItem({ position, subject, score }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-base-dark text-white text-2xl w-10 h-10 text-center rounded-full p-1 shrink-0 flex items-center justify-center">
          <p className="font-bold">{position}</p>
        </div>
        <p className="font-semibold">{subject}</p>
      </div>
      <p className=" text-[16px] font-bold">{score}%</p>
    </div>
  );
}
