export default function ExamOption({ name, value, letter, text }) {
  return (
    <label className="flex gap-3 items-start rounded-[18px] p-3 hover:cursor-pointer hover:bg-base-soft transition-colors duration-150">
      <input
        type="radio"
        name={name}
        value={value}
        className="mt-1 appearance-none w-5 h-5 ring-inset ring-2 ring-base-dark rounded-full bg-white checked:ring-6 cursor-pointer shrink-0"
      />
      <span className="font-semibold">{letter})</span>
      <span className="leading-tight">{text}</span>
    </label>
  );
}
