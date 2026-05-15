import { FaBookOpen } from "react-icons/fa6";
import LatexParagraph from "./LaTexRender";

export default function ExamExplanation({
    correct_answer,
    answer_selected,
    isConfirmed,
    explanation,
    blur = false
}) {
    const isForcedExplanation = answer_selected === "-";

    const isCorrect = isConfirmed && !isForcedExplanation && answer_selected === correct_answer;

    let colorClasses = "bg-base-soft text-base-dark";
    let opacityClasses = "opacity-55";

    if (isConfirmed) {
        if (isForcedExplanation) {
            colorClasses = "bg-base-soft text-base-dark";
            opacityClasses = "opacity-90";
        } else {
            colorClasses = isCorrect
                ? 'bg-[#d0f8d4] text-[#19571d]'
                : 'bg-[#f8d0d0] text-[#971111]';
            opacityClasses = "opacity-90";
        }
    }

    return (
        <div className={`${colorClasses} rounded-[18px] p-5 shadow-lg transition-all duration-300`}>
            <div className={`flex items-center gap-2 mb-3 ${isConfirmed ? 'opacity-80' : ''}`}>
                <FaBookOpen size={18} />
                <p className="font-bold text-xs uppercase tracking-wider">
                    Explicación
                </p>
            </div>

            <div className="space-y-2 text-sm">
                <p className="font-bold">
                    La respuesta correcta es la {correct_answer.toUpperCase()}.
                </p>
                <span className={`leading-relaxed ${blur ? 'blur-[4px] select-none opacity-60' : opacityClasses}`}>
                    <LatexParagraph content={explanation} />
                </span>
            </div>
        </div>
    );
}