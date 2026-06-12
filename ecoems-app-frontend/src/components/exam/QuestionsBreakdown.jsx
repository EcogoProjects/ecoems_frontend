"use client"

import { useRef, useState } from "react";
import { FaCheck, FaChevronDown, FaTimes } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import NavExamResult from "@/components/exam/NavExamResult";

const baseTheme = {
    blockBg: "bg-base-soft",
    promptText: "text-base-dark",
    numberBg: "bg-base",
    numberText: "text-base-dark/75",
    readingBorder: "border-base-hard",
    readingBg: "bg-base",
    readingTitleText: "text-base-dark",
    readingBodyText: "text-base-dark/85",
    btnBorder: "border-base-dark/20",
    btnText: "text-base-dark",
    btnHoverBg: "hover:bg-base-dark",
    btnHoverBorder: "hover:border-base-dark",
    btnHoverText: "hover:text-base-soft",
    explanationBg: "bg-base",
    explanationTitleText: "text-base-dark",
    explanationBodyText: "text-base-dark/90",
    answerLabel: "text-base-dark/50",
};

const STATUS_STYLES = {
    correct: {
        points: "✓ 1 pto.",
        icon: "check",
        theme: {
            ...baseTheme,
            pill: "bg-[#2c7a4a] text-white",
            answer: "bg-[#2c7a4a] text-white",
        }
    },
    incorrect: {
        points: "✗ 0 pts.",
        icon: "times",
        theme: {
            ...baseTheme,
            pill: "bg-[#8A2D22] text-white",
            answer: "bg-[#8A2D22] text-white",
        }
    },
    partial: {
        points: "~ 0.5 pts.",
        icon: "partial",
        theme: {
            ...baseTheme,
            pill: "bg-[#a06000] text-white",
            answer: "bg-[#a06000] text-white",
        }
    },
};

export default function QuestionsBreakdown({ questions }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openExplanations, setOpenExplanations] = useState({});
    const [openReadings, setOpenReadings] = useState({});
    const [filters, setFilters] = useState({
        correct: true,
        incorrect: true,
        partial: true,
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const questionRefs = useRef([]);
    const containerRef = useRef(null);
    const answers = questions.reduce((acc, question) => {
        acc[question.id] = question.userAnswer;
        return acc;
    }, {});

    const handleNavigate = (index) => {
        setCurrentIndex(index);
        const targetElement = questionRefs.current[index];
        const container = containerRef.current;
        if (targetElement && container) {
            container.scrollTo({
                top: targetElement.offsetTop - 64, // Subtracting 64px (pt-16) so it's not hidden under the filter button
                behavior: "smooth",
            });
        }
    };

    const toggleExplanation = (questionId) => {
        setOpenExplanations((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
    };

    const toggleReading = (questionId) => {
        setOpenReadings((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
    };

    const filteredQuestions = questions
        .map((question, i) => ({ ...question, originalIndex: i }))
        .filter((q) => filters[q.status]);

    return (
        <section className="space-y-4">
            <div className="flex flex-col gap-4 rounded-box-standard bg-base-dark px-4 py-3 text-base-soft shadow-[0_12px_28px_-14px_rgba(71,46,24,.45)] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <h2 className="text-lg font-semibold tracking-normal">Desglose por pregunta</h2>
                    <span className="rounded-full bg-base px-3 py-1 text-xs font-medium text-base-dark/80">
                        {filteredQuestions.length} preguntas
                    </span>
                </div>
                <div className="flex items-center justify-center">
                    <NavExamResult
                        questions={filteredQuestions}
                        currentIndex={currentIndex}
                        answers={answers}
                        onNavigate={handleNavigate}
                    />
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-4 right-6 z-20">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="bg-base-dark text-base-soft px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-base-dark/90 transition border border-transparent hover:border-white/20"
                    >
                        Filtrar preguntas
                    </button>
                    {isFilterOpen && (
                        <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg p-3 w-44 flex flex-col gap-2 border border-base-hard z-30">
                            <label className="flex items-center gap-2 text-sm font-semibold text-base-dark cursor-pointer">
                                <input type="checkbox" checked={filters.correct} onChange={() => setFilters(f => ({ ...f, correct: !f.correct }))} className="accent-[#2c7a4a] w-4 h-4 cursor-pointer" />
                                Correctas
                            </label>
                            <label className="flex items-center gap-2 text-sm font-semibold text-base-dark cursor-pointer">
                                <input type="checkbox" checked={filters.incorrect} onChange={() => setFilters(f => ({ ...f, incorrect: !f.incorrect }))} className="accent-[#a83030] w-4 h-4 cursor-pointer" />
                                Incorrectas
                            </label>
                            <label className="flex items-center gap-2 text-sm font-semibold text-base-dark cursor-pointer">
                                <input type="checkbox" checked={filters.partial} onChange={() => setFilters(f => ({ ...f, partial: !f.partial }))} className="accent-[#a06000] w-4 h-4 cursor-pointer" />
                                Parciales
                            </label>
                        </div>
                    )}
                </div>

                <div ref={containerRef} className="flex flex-col gap-3 bg-base border-3 border-base-dark p-4 pt-16 max-h-[700px] rounded-3xl overflow-y-auto no-scrollbar relative">
                    {filteredQuestions.map((question) => {
                        const styles = STATUS_STYLES[question.status];
                        const isOpen = !!openExplanations[question.id];
                        const isReadingOpen = !!openReadings[question.id];
                        const hasReading = !!question.reading;
                        const hasImage = !!question.imageLabel;
                        const readingBtnLabel = isReadingOpen
                            ? (hasReading && hasImage ? "Ocultar recurso" : hasImage ? "Ocultar imagen" : "Ocultar lectura")
                            : (hasReading && hasImage ? "Ver recurso" : hasImage ? "Ver imagen" : "Ver lectura");

                        return (
                            <article
                                key={question.id}
                                ref={(node) => {
                                    questionRefs.current[question.originalIndex] = node;
                                }}
                                className={`rounded-box-standard ${styles.theme.blockBg} shadow-[0_2px_8px_rgba(71,46,24,.06)]  hover:shadow-[0_12px_28px_-10px_rgba(71,46,24,.18)] transition-colors duration-300`}
                            >
                                <div className={`px-5 py-5 md:px-6`}>
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold bg-base-dark/80 text-base-soft`}>
                                            {question.originalIndex + 1}
                                        </span>
                                        <p className={`flex-1 text-[15px] font-medium leading-6 ${styles.theme.promptText}`}>
                                            {question.prompt}
                                        </p>
                                        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${styles.theme.pill}`}>
                                            {styles.points}
                                        </span>
                                    </div>

                                    <div className={`grid transition-all duration-300 ${isReadingOpen ? "grid-rows-[1fr] mb-4" : "grid-rows-[0fr]"}`}>
                                        <div className="overflow-hidden">
                                            <div className="pt-0.5 pb-0.5">
                                                {question.imageLabel && (
                                                    <div className={`mb-4 flex h-32 items-center justify-center rounded-xl font-mono text-xs tracking-wide ${styles.theme.readingBg} ${styles.theme.readingTitleText}`}>
                                                        {question.imageLabel}
                                                    </div>
                                                )}

                                                {question.reading && (
                                                    <div className={`rounded-xl px-4 py-3 ${styles.theme.readingBg} ${styles.theme.readingBorder}`}>
                                                        <p className={`mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] ${styles.theme.readingTitleText}`}>
                                                            Lectura de apoyo
                                                        </p>
                                                        <p className={`text-[13.5px] leading-6 ${styles.theme.readingBodyText}`}>{question.reading}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex flex-col gap-2">
                                        <AnswerRow
                                            label="Tu respuesta"
                                            value={question.userAnswer}
                                            statusClassName={styles.theme.answer}
                                            labelClassName={styles.theme.answerLabel}
                                            icon={styles.icon}
                                        />
                                        {question.correctAnswer && question.correctAnswer !== question.userAnswer && (
                                            <AnswerRow
                                                label="Respuesta correcta"
                                                value={question.correctAnswer}
                                                statusClassName={STATUS_STYLES.correct.theme.answer}
                                                labelClassName={styles.theme.answerLabel}
                                                icon="check"
                                            />
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {(hasReading || hasImage) && (
                                            <button
                                                type="button"
                                                onClick={() => toggleReading(question.id)}
                                                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors bg-base ${styles.theme.btnBorder} ${styles.theme.btnText} ${styles.theme.btnHoverBg} ${styles.theme.btnHoverBorder} ${styles.theme.btnHoverText}`}
                                            >
                                                {readingBtnLabel}
                                                <FaChevronDown className={`text-xs transition-transform ${isReadingOpen ? "rotate-180" : ""}`} />
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => toggleExplanation(question.id)}
                                            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors bg-base ${styles.theme.btnBorder} ${styles.theme.btnText} ${styles.theme.btnHoverBg} ${styles.theme.btnHoverBorder} ${styles.theme.btnHoverText}`}
                                        >
                                            {isOpen ? "Ocultar explicación" : "Ver explicación"}
                                            <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                        </button>
                                    </div>

                                    <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                        <div className="overflow-hidden">
                                            <div className={`mt-3 rounded-xl px-4 py-3 ${styles.theme.explanationBg}`}>
                                                <p className={`mb-2 text-[10.5px] font-bold uppercase tracking-[0.08em] ${styles.theme.explanationTitleText}`}>
                                                    Explicación
                                                </p>
                                                <p className={`text-sm leading-6 ${styles.theme.explanationBodyText}`}>{question.explanation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function AnswerRow({ label, value, statusClassName, labelClassName, icon }) {
    return (
        <div className="flex flex-col items-start gap-2">
            <span className={`min-w-28 shrink-0 text-[11px] font-semibold uppercase tracking-[0.05em] md:min-w-32  text-base-dark`}>
                {label}
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${statusClassName}`}>
                {icon === "check" && <FaCheck className="text-[11px]" />}
                {icon === "times" && <FaTimes className="text-[11px]" />}
                {icon === "partial" && <MdErrorOutline className="text-sm" />}
                {value}
            </span>
        </div>
    );
}
