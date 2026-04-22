export default function ExamOption({ name, value, letter, text, checked, onChange, disabled }) {
    return (
        <label
            className={`flex gap-3 items-start rounded-[18px] p-3 transition-all duration-200 border-2 ${checked
                ? 'border-base-dark bg-white/60 scale-[1.01] [&_input:ring-base-dark  [&_input]:ring-inset [&_input]:ring-6'
                : 'border-transparent hover:bg-base-soft '
                } ${disabled ? 'pointer-events-none' : 'cursor-pointer'}`}
        >
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="mt-1 appearance-none w-5 h-5 ring-inset ring-2 ring-base-dark rounded-full bg-white checked:ring-6 cursor-pointer shrink-0 transition-all"
            />
            <span className="font-semibold">{letter})</span>
            <span className="leading-tight">{text}</span>
        </label>
    );
}