"use client"

export default function SubjectScoreItem({
  position,
  subject,
  score,
  isSelectable = false,
  isSelected = false,
  onSelect,
}) {
  const content = (
    <>
      <div className="flex items-center gap-2">
        <div className="bg-base-dark text-white text-2xl w-10 h-10 text-center rounded-full p-1 shrink-0 flex items-center justify-center">
          <p className="font-bold">{position}</p>
        </div>
        <p className="font-semibold">{subject}</p>
      </div>
      <p className=" text-[16px] font-bold">{score}%</p>
    </>
  );

  if (isSelectable) {
    return (
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={onSelect}
        className={`flex w-full items-center justify-between rounded-[11px] px-3 py-2 text-left transition-colors ${
          isSelected
            ? "bg-base-hard text-white"
            : "hover:bg-base-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-hard"
        }`}
      >
        {content}
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between">
      {content}
    </div>
  );
}
