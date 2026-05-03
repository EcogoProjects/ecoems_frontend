"use client"

import { useRef } from "react";
import Image from "next/image";
import { useLatexScanner } from "@/utils/exam/useLatexScanner";
import { FaLightbulb } from "react-icons/fa6";
import ExamExplanation from "@/components/exam/ExamExplanation";
import LatexParagraph from "./LaTexRender";

export default function ResourcePanel({
    currentQ,
    hasImage,
    revealHint,
    revealExplanation,
    selectedOption,
    answers,
    openModal
}) {
    const panelRef = useRef(null);

    useLatexScanner(panelRef, currentQ.id);

    return (
        <div ref={panelRef} className="w-full flex flex-col gap-5 h-full md:col-span-1">
            {hasImage && (
                <div className="bg-base-hard rounded-[22px] p-3 shadow-lg">
                    <div onClick={openModal} className="relative w-full aspect-video rounded-[18px] overflow-hidden cursor-pointer transition-all">
                        <Image
                            src={currentQ.imageUrl}
                            alt="Question resource"
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="p-1"
                        />
                    </div>
                </div>
            )}

            {!revealHint && !revealExplanation && (
                <div className="flex flex-col items-center text-center justify-center opacity-70 border-2 p-5 border-dashed rounded-[22px] border-base-dark bg-white/30">
                    <p className="text-sm mb-3 font-semibold text-base-dark leading-tight">
                        ¿Te quedaste bloqueado? <br /> ¡Usa el botón de ayuda arriba!
                    </p>
                    <Image
                            src="/assets/ecogo_hint.png"
                            alt="ecogo hint"
                            width={100}
                            height={180}
                        />
                </div>
            )}

            {revealHint && currentQ.hint && (
                <div className="bg-base-soft rounded-[18px] p-3 shadow-lg">
                    <div className="flex items-center gap-2 mb-2 text-base-dark">
                        <FaLightbulb />
                        <p className="font-bold ">Pista sugerida</p>
                    </div>
                    <div className="opacity-55 whitespace-pre-wrap">
                        <LatexParagraph content={currentQ.hint} />
                    </div>
                </div>
            )}

            {revealExplanation && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                    <ExamExplanation
                        correct_answer={currentQ.correctAnswer.toLowerCase()}
                        answer_selected={selectedOption || ''}
                        isConfirmed={!!answers[currentQ.id]}
                        explanation={currentQ.answerExplanation}
                        blur={false}
                    />
                </div>
            )}
        </div>
    );
}
