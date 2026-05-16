"use client"

import { useRef, useState } from "react";
import { FaCheck, FaChevronDown, FaTimes } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import NavExam from "@/components/exam/NavExam";

const STATUS_STYLES = {
    correct: {
        border: "border-l-[#2c7a4a]",
        pill: "bg-[#e8f5ee] text-[#2c7a4a]",
        answer: "bg-[#e8f5ee] text-[#2c7a4a]",
        points: "✓ 1 pto.",
        icon: "check",
    },
    incorrect: {
        border: "border-l-[#a83030]",
        pill: "bg-[#fbeaea] text-[#a83030]",
        answer: "bg-[#fbeaea] text-[#a83030]",
        points: "✗ 0 pts.",
        icon: "times",
    },
    partial: {
        border: "border-l-[#a06000]",
        pill: "bg-[#fef5e4] text-[#a06000]",
        answer: "bg-[#fef5e4] text-[#a06000]",
        points: "~ 0.5 pts.",
        icon: "partial",
    },
};

export default function QuestionsBreakdown({ questions }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openExplanations, setOpenExplanations] = useState({});
    const questionRefs = useRef([]);
    const answers = questions.reduce((acc, question) => {
        acc[question.id] = question.userAnswer;
        return acc;
    }, {});

    const handleNavigate = (index) => {
        setCurrentIndex(index);
        questionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const toggleExplanation = (questionId) => {
        setOpenExplanations((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
    };

    return (
        <section className="space-y-4">
            <div className="flex flex-col gap-4 rounded-box-standard bg-base-dark px-4 py-3 text-base-soft shadow-[0_12px_28px_-14px_rgba(71,46,24,.45)] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold tracking-normal">Desglose por pregunta</h2>
                    <span className="rounded-full bg-base px-3 py-1 text-xs font-medium text-base-dark/80">
                        {questions.length} preguntas
                    </span>
                </div>
                <div className="flex items-center justify-center">
                    <NavExam
                        questions={questions}
                        currentIndex={currentIndex}
                        answers={answers}
                        onNavigate={handleNavigate}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {questions.map((question, index) => {
                    const styles = STATUS_STYLES[question.status];
                    const isOpen = !!openExplanations[question.id];

                    return (
                        <article
                            key={question.id}
                            ref={(node) => {
                                questionRefs.current[index] = node;
                            }}
                            className="scroll-mt-24 overflow-hidden rounded-box-standard border border-base-dark/10 bg-base-soft shadow-[0_2px_8px_rgba(71,46,24,.06)] transition-shadow hover:shadow-[0_12px_28px_-10px_rgba(71,46,24,.18)]"
                        >
                            <div className={`border-l-4 ${styles.border} px-5 py-5 md:px-6`}>
                                <div className="mb-4 flex items-start gap-3">
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-base text-xs font-semibold text-base-dark/75">
                                        {index + 1}
                                    </span>
                                    <p className="flex-1 text-[15px] font-medium leading-6 text-base-dark">
                                        {question.prompt}
                                    </p>
                                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${styles.pill}`}>
                                        {styles.points}
                                    </span>
                                </div>

                                {question.imageLabel && (
                                    <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-[repeating-linear-gradient(45deg,var(--base-extra-light-color)_0,var(--base-extra-light-color)_8px,var(--base-color)_8px,var(--base-color)_16px)] font-mono text-xs tracking-wide text-base-dark/60">
                                        {question.imageLabel}
                                    </div>
                                )}

                                {question.reading && (
                                    <div className="mb-4 rounded-xl border-l-[3px] border-base-hard bg-base-extra-light px-4 py-3">
                                        <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-base-dark/50">
                                            Lectura de apoyo
                                        </p>
                                        <p className="text-[13.5px] leading-6 text-base-dark/85">{question.reading}</p>
                                    </div>
                                )}

                                <div className="mb-4 flex flex-col gap-2">
                                    <AnswerRow
                                        label="Tu respuesta"
                                        value={question.userAnswer}
                                        statusClassName={styles.answer}
                                        icon={styles.icon}
                                    />
                                    {question.correctAnswer && question.correctAnswer !== question.userAnswer && (
                                        <AnswerRow
                                            label="Respuesta correcta"
                                            value={question.correctAnswer}
                                            statusClassName="bg-[#e8f5ee] text-[#2c7a4a]"
                                            icon="check"
                                        />
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => toggleExplanation(question.id)}
                                    className="inline-flex items-center gap-2 rounded-full border border-base-dark/20 px-3.5 py-2 text-sm font-medium text-base-dark transition-colors hover:border-base-dark hover:bg-base-dark hover:text-base-soft"
                                >
                                    {isOpen ? "Ocultar explicación" : "Ver explicación"}
                                    <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                </button>

                                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                    <div className="overflow-hidden">
                                        <div className="mt-3 rounded-xl bg-base-extra-light px-4 py-3">
                                            <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.08em] text-base-dark/50">
                                                Explicación
                                            </p>
                                            <p className="text-sm leading-6 text-base-dark/90">{question.explanation}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

function AnswerRow({ label, value, statusClassName, icon }) {
    return (
        <div className="flex flex-wrap items-center gap-2.5">
            <span className="min-w-28 shrink-0 text-[11px] font-semibold uppercase tracking-[0.05em] text-base-dark/50 md:min-w-32">
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
