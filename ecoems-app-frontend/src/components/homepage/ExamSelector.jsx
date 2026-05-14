'use client'

import { useState, useEffect } from "react";
import { FaBookReader, FaHeart } from "react-icons/fa";
import { MdOutlineDoNotDisturb } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import ExamTypeButton from "@/components/exam/ExamTypeButton";
import ExamDescription from "@/components/exam/ExamDescription";
import { useExam } from "@/hooks/useExam";

function ExamSelector() {
    const { canQuickExam, isUsageLoading, dailyUsage } = useExam();
    const [showDescription, setShowDescription] = useState(false);
    const [showLimit, setShowLimit] = useState(false);

    const modalOpen = showDescription || showLimit;

    useEffect(() => {
        document.body.style.overflow = modalOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [modalOpen]);

    const handleQuickExam = () => {
        if (isUsageLoading) return;
        if (canQuickExam) setShowDescription(true);
        else setShowLimit(true);
    };

    const closeAll = () => {
        setShowDescription(false);
        setShowLimit(false);
    };

    return (
        <>
            <div className="shadow-lg bg-base-dark rounded-box-standard shadow-lg w-4/5 text-base
             flex justify-center md:hidden">
                <div className=" flex flex-col  p-10 pl-3.5 pr-3.5 gap-5 max-w-[400px]">
                    <h2 className="font-extrabold tracking-wide text-xl text-center">Realizar Examen</h2>
                    <p className="opacity-60 text-center  mb-1.5">Elige el tipo de evaluación para comenzar</p>
                    <div className="text-white flex flex-col gap-2 tracking-wide md:flex-row justify-center w-full">
                        <ExamTypeButton type="rapido" title="Examen Rápido" icon="speed" onClick={handleQuickExam} />
                        <ExamTypeButton type="seguimiento" title="Examen de seguimiento" icon="calendar" />
                        <ExamTypeButton type="libre" title="Examen Libre" icon="unlock" />
                        <div className="bg-base-dark rounded-[15px] p-1.5 font-semibold flex items-center justify-center opacity-70 w-full">
                            <h3 className="text-center">Próximamente</h3>
                        </div>
                    </div>
                    <div className="bg-base-hard-alt p-1.5 rounded-[15px] text-base-dark flex flex-col items-center cursor-pointer
                            transition-all duration-200 hover:opacity-70 ">
                        <h3 className="font-semibold text-xl">Examen Simulacro</h3>
                        <div className="flex items-center justify-center w-10 h-10">
                            <FaBookReader size={30}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex bg-base-dark rounded-box-standard shadow-lg w-4/5 text-white flex-col p-4 gap-5">
                <div className="flex justify-between text-base">
                    <div className="flex gap-2.5 items-center">
                        <div className="p-1.5 border-2 w-fit h-fit rounded-[10px] text-base-hard-alt">
                            <TfiAgenda size={20}/>
                        </div>
                        <div className="flex flex-col items-start">
                            <h2 className="font-extrabold tracking-wide text-xl text-center">Realizar Examén</h2>
                            <p className="opacity-60">Elige el tipo de evaluación para comenzar</p>
                        </div>
                    </div>
                    <div className="flex gap-4 rounded-[15px] justify-start items-center p-2 pl-4 w-[300px]
                        border-base-hard-alt cursor-pointer hover:opacity-70 bg-base-hard-alt">
                        <div className="p-1.5 bg-base-hard-alt w-fit h-fit rounded-[10px] text-base-dark">
                            <FaBookReader size={30}/>
                        </div>
                        <div className="flex flex-col text-base-dark">
                            <h3 className="font-semibold">Examen Simulacro</h3>
                            <p className="opacity-60">Similar al oficial.</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2.5">
                    <ExamTypeButton type="rapido" title="Examen Rápido" icon="speed" description="Realiza un examen de un solo subtema." onClick={handleQuickExam} />
                    <ExamTypeButton type="seguimiento" title="Examen de seguimiento" icon="calendar" description="Evalúa tu avance por materia."/>
                    <ExamTypeButton type="libre" title="Examen Libre" icon="unlock" description="Tomas tu la elección." />
                </div>
            </div>

            {/* Modal: selector de examen */}
            {showDescription && (
                <div
                    className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6 md:py-0 overflow-y-auto animate-in fade-in duration-300"
                    onClick={closeAll}
                >
                    <div className="w-full max-w-[420px] md:max-w-[600px] mx-auto" onClick={e => e.stopPropagation()}>
                        <ExamDescription
                            examTitle="Examen Rápido"
                            description="Practica preguntas de un subtema específico a tu ritmo."
                            time="20 min"
                            n_questions={15}
                            range="Subtema"
                            show_subtopic={true}
                            onClose={closeAll}
                            examsRemaining={dailyUsage?.quick_exams_remaining}
                            examsUsed={dailyUsage?.quick_exams_count}
                        />
                    </div>
                </div>
            )}

            {/* Modal: límite diario alcanzado */}
            {showLimit && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-300"
                    onClick={closeAll}
                >
                    <div
                        className="bg-base-dark text-base-soft rounded-[28px] p-8 flex flex-col items-center gap-5 w-full max-w-[360px] shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <MdOutlineDoNotDisturb size={48} className="text-base-hard" />
                        <h2 className="text-xl font-extrabold text-center tracking-tight">Límite diario alcanzado</h2>
                        <p className="text-sm text-center leading-relaxed text-base-soft/80">
                            Has utilizado todos tus exámenes rápidos de hoy. Vuelve mañana para seguir practicando.
                        </p>
                        <button
                            onClick={closeAll}
                            className="mt-2 w-full py-3 rounded-xl font-bold bg-base-hard text-base-dark hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ExamSelector;
