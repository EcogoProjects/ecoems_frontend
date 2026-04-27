"use client"

import ExamOption from "@/components/exam/ExamOption";
import LatexParagraph from "./LaTexRender";

export default function QuestionPanel({
    currentQ,
    currentIndex,
    selectedOption,
    answers,
    handleOptionSelect,
    handleContestar,
    isLastQuestion
}) {
    const hasReading = currentQ.reading !== null && currentQ.reading.trim() !== "";

    // Agrupamos las opciones para poder evaluarlas juntas
    const options = [
        { letter: 'a', text: currentQ.answerA, val: 1 },
        { letter: 'b', text: currentQ.answerB, val: 2 },
        { letter: 'c', text: currentQ.answerC, val: 3 },
        { letter: 'd', text: currentQ.answerD, val: 4 }
    ];

    // Validamos si TODOS los textos de las opciones comienzan con "https://"
    const areAllImages = options.every(
        opt => typeof opt.text === 'string' && opt.text.trim().startsWith('https://')
    );

    return (
        <div className="bg-base w-full p-4 md:p-6 rounded-[18px] md:col-span-2 md:h-full shadow-lg">
            <div className="w-full text-right font-bold opacity-70 tracking-widest mb-2">
                <p>{currentQ.subject || 'Sin materia'}</p>
            </div>

            {hasReading && (
                <div className="p-3 bg-white/50 rounded-[18px] mb-4 text-sm font-medium border border-white/20 whitespace-pre-line">
                    <LatexParagraph content={currentQ.reading}
                    />
                </div>

            )}

            <div className="flex items-start gap-4">
                <div className="bg-base-dark text-white text-2xl min-w-[40px] h-[40px] flex items-center justify-center rounded-full shrink-0 shadow-inner">
                    <p className="text-lg">{currentIndex + 1}</p>
                </div>
                <div className="text-lg font-semibold pt-1 text-slate-800">
                    <LatexParagraph
                        content={currentQ.question}
                    />
                </div>

            </div>

            {/* Renderizado condicional: Grid 2x2 para imágenes, o lista flex para texto */}
            <div className={`pl-2.5 mt-6 ${areAllImages ? 'flex flex-col gap-2.5 min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:gap-4' : 'flex flex-col gap-2.5'}`}>                {options.map((opt) => {
                const isSelected = selectedOption === opt.letter;
                const isDisabled = !!answers[currentQ.id];

                if (areAllImages) {
                    return (
                        <button
                            key={opt.letter}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => handleOptionSelect(opt.letter)}
                            className={`flex flex-col sm:flex-row items-center gap-3 p-1 rounded-[18px] border-2 transition-all w-full
                                    ${isSelected ? 'border-base-dark bg-base-soft shadow-md' : 'border-transparent bg-base-soft hover:opacity-50'}
                                    ${isDisabled && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                    ${isDisabled && isSelected ? 'cursor-default' : ''}
                                `}
                        >
                            {/* Indicador de la letra */}
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0
                                    ${isSelected ? 'bg-base-dark text-white' : 'bg-base-hard-alt text-base-dark'}
                                `}>
                                {opt.letter})
                            </div>

                            {/* Contenedor de la imagen */}
                            <div className="flex-1 w-full h-fit relative rounded-xl overflow-hidden flex items-center justify-center">
                                <img
                                    src={opt.text.trim()}
                                    alt={`Opción ${opt.letter}`}
                                    className="max-w-full max-h-full object-contain p-1"
                                    loading="lazy"
                                />
                            </div>
                        </button>
                    );
                }

                // Comportamiento original para texto
                return (
                    <ExamOption
                        key={opt.letter}
                        name={`question-${currentQ.id}`}
                        value={opt.val}
                        letter={opt.letter}
                        text={opt.text}
                        checked={isSelected}
                        onChange={() => handleOptionSelect(opt.letter)}
                        disabled={isDisabled}
                    />
                );
            })}
            </div>

            <div className="flex justify-end mt-5 md:mt-4">
                <button
                    onClick={handleContestar}
                    disabled={!selectedOption || !!answers[currentQ.id]}
                    className={`p-2 pl-8 pr-8 font-bold rounded-full transition-all shadow-md ${!selectedOption || answers[currentQ.id]
                        ? 'bg-base-dark text-gray-100 opacity-60 cursor-not-allowed'
                        : 'bg-base-dark text-white hover:scale-105 active:scale-95 cursor-pointer'
                        }`}
                >
                    {answers[currentQ.id]
                        ? 'Contestado'
                        : (isLastQuestion ? 'Finalizar examen' : 'Contestar')
                    }
                </button>
            </div>
        </div>
    );
}