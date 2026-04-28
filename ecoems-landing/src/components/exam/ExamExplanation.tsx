"use client"

import { FaBookOpen } from "react-icons/fa6";
import LatexParagraph from "./LaTexRender";

export default function ExamExplanation({
    correct_answer,
    answer_selected,
    isConfirmed,
    explanation,
    blur = false
}) {
    // Detectamos si el usuario saltó directo a la explicación usando el valor "-"
    const isForcedExplanation = answer_selected === "-";

    // Verificamos si es correcta SOLO si ya está confirmada y NO fue forzada
    const isCorrect = isConfirmed && !isForcedExplanation && answer_selected === correct_answer;

    // Colores por defecto (Formato de la pista: bg-base-soft y text-base-dark)
    let colorClasses = "bg-base-soft text-base-dark";
    let opacityClasses = "opacity-55";

    // Si ya está confirmada (ya sea por el botón Contestar o por ver explicación)
    if (isConfirmed) {
        if (isForcedExplanation) {
            // Si la forzó, mantenemos los colores sutiles de la pista
            colorClasses = "bg-base-soft text-base-dark";
            opacityClasses = "opacity-90"; // Subimos la opacidad del texto para que se lea bien
        } else {
            // Si contestó normal, aplicamos verde (acierto) o rojo (error)
            colorClasses = isCorrect
                ? 'bg-[#d0f8d4] text-[#19571d]'
                : 'bg-[#f8d0d0] text-[#971111]';
            opacityClasses = "opacity-90";
        }
    }

    return (
        <div className={`${colorClasses} rounded-[18px] p-5 shadow-lg transition-all duration-300`}>
            {/* Encabezado con Icono */}
            <div className={`flex items-center gap-2 mb-3 ${isConfirmed ? 'opacity-80' : ''}`}>
                <FaBookOpen size={18} />
                <p className="font-bold text-xs uppercase tracking-wider">
                    {/* Opcional: Cambiar el título si no la contestó activamente */}
                    {isForcedExplanation ? 'Explicación' : 'Explicación'}
                </p>
            </div>

            {/* Contenido */}
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