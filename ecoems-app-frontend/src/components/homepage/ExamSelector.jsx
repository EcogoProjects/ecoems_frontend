'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBookReader, FaHeart } from "react-icons/fa";
import { MdOutlineDoNotDisturb, MdOutlineAccessTime } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import ExamTypeButton from "@/components/exam/ExamTypeButton";
import ExamDescription from "@/components/exam/ExamDescription";
import ExamDescriptionSimulacro from "@/components/exam/ExamDescriptionSimulacro";
import { useExam } from "@/hooks/useExam";
import { closeExam } from "@/lib/api";

function ExamSelector() {
    const router = useRouter();
    const { canQuickExam, isUsageLoading, dailyUsage, startExamSession, continueCurrentSession, isLoading } = useExam();
    const [showDescription, setShowDescription] = useState(false);
    const [showLimit, setShowLimit] = useState(false);
    const [showActiveSession, setShowActiveSession] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [showSimulacro, setShowSimulacro] = useState(false);
    const [isClosingActiveSession, setIsClosingActiveSession] = useState(false);
    const [isContinuingActiveSession, setIsContinuingActiveSession] = useState(false);
    const [activeSessionError, setActiveSessionError] = useState(null);

    const modalOpen = showDescription || showLimit || showActiveSession || showComingSoon || showSimulacro;

    useEffect(() => {
        document.body.style.overflow = modalOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [modalOpen]);

    const handleQuickExam = () => {
        if (isUsageLoading) return;
        setActiveSessionError(null);
        if (canQuickExam) setShowDescription(true);
        else setShowLimit(true);
    };

    const handleComingSoon = () => {
        setShowComingSoon(true);
    };

    const handleSimulacro = () => {
        setShowSimulacro(true);
    };

    const handleSelectSimulacro = (examId) => {
        // Solo UI por ahora — pendiente conectar con el backend de simulacros
        console.log('Simulacro seleccionado:', examId);
    };

    const closeAll = () => {
        setShowDescription(false);
        setShowLimit(false);
        setShowActiveSession(false);
        setShowComingSoon(false);
        setShowSimulacro(false);
    };

    const handleStartNewExam = async () => {
        if (isClosingActiveSession || isContinuingActiveSession) return;
        setIsClosingActiveSession(true);
        setActiveSessionError(null);
        const { status } = await closeExam();
        setIsClosingActiveSession(false);

        setShowActiveSession(false);
        if (status === 204) {
            setShowDescription(true);
            return;
        }

        setActiveSessionError('No se pudo cerrar la sesión activa. Intenta de nuevo.');
    };

    const handleContinueExam = async () => {
        if (isClosingActiveSession || isContinuingActiveSession) return;
        setIsContinuingActiveSession(true);
        setActiveSessionError(null);
        const { data } = await continueCurrentSession();
        setIsContinuingActiveSession(false);

        if (data) {
            setShowActiveSession(false);
            router.push('/exam');
            return;
        }

        setShowActiveSession(false);
        setActiveSessionError('No logramos recuperar tu sesión activa. Intenta empezar un nuevo examen');
    };

    const handleStart = async ({ subtopic_id }) => {
        const { data, status } = await startExamSession({
            exam_type: 'quick',
            subtopic_id,
        });
        if (data) router.push('/exam');
        if (status === 409) {
            setShowDescription(false);
            setShowActiveSession(true);
        }
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
                        <ExamTypeButton type="seguimiento" title="Examen de seguimiento" icon="calendar" onClick={handleComingSoon} />
                        <ExamTypeButton type="libre" title="Examen Libre" icon="unlock" description="Próximamente" onClick={handleComingSoon}/>
                    </div>
                    <div onClick={handleSimulacro} className="bg-base-hard-alt p-1.5 rounded-[15px] text-base-dark flex flex-col items-center cursor-pointer
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
                    <div onClick={handleSimulacro} className="flex gap-4 rounded-[15px] justify-start items-center p-2 pl-4 w-[300px]
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
                    <ExamTypeButton type="seguimiento" title="Examen de seguimiento" icon="calendar" description="Próximamente" onClick={handleComingSoon}/>
                    <ExamTypeButton type="libre" title="Examen Libre" icon="unlock" description="Próximamente" onClick={handleComingSoon} />
                </div>
            </div>

            <p className={`w-4/5 h-5 overflow-hidden text-sm font-semibold text-red-600 transition-opacity ${activeSessionError ? 'opacity-100' : 'opacity-0 select-none'}`}>
                {activeSessionError ?? ' '}
            </p>

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
                            onStart={handleStart}
                            isStarting={isLoading}
                            examsRemaining={dailyUsage?.quick_exams_remaining}
                            examsUsed={dailyUsage?.quick_exams_count}
                        />
                    </div>
                </div>
            )}

            {/* Modal: selector de examen simulacro */}
            {showSimulacro && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-300"
                    onClick={closeAll}
                >
                    <div className="w-full max-w-[460px] mx-auto" onClick={e => e.stopPropagation()}>
                        <ExamDescriptionSimulacro
                            onClose={closeAll}
                            onSelect={handleSelectSimulacro}
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

            {/* Modal: recurso próximamente */}
            {showComingSoon && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-300"
                    onClick={closeAll}
                >
                    <div
                        className="bg-base-dark text-base-soft rounded-[28px] p-8 flex flex-col items-center gap-5 w-full max-w-[360px] shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <MdOutlineAccessTime size={48} className="text-base-hard" />
                        <h2 className="text-xl font-extrabold text-center tracking-tight">Recurso disponible próximamente</h2>
                        <p className="text-sm text-center leading-relaxed text-base-soft/80">
                            Estamos preparando este tipo de examen. Muy pronto podrás usarlo para seguir practicando.
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

            {/* Modal: sesión rápida activa */}
            {showActiveSession && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-300"
                    onClick={isClosingActiveSession || isContinuingActiveSession ? undefined : closeAll}
                >
                    <div
                        className="bg-base-dark text-base-soft rounded-[28px] p-8 flex flex-col items-center gap-5 w-full max-w-[420px] shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <MdOutlineDoNotDisturb size={48} className="text-base-hard" />
                        <h2 className="text-xl font-extrabold text-center tracking-tight">Ya tienes un examen activo</h2>
                        <p className="text-sm text-center leading-relaxed text-base-soft/80">
                            Hay una sesión en progreso. Puedes continuar con ese examen o empezar uno nuevo.
                        </p>
                        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={handleStartNewExam}
                                disabled={isClosingActiveSession || isContinuingActiveSession}
                                className={`w-full py-3 rounded-xl font-bold border border-base-hard text-base-soft transition-colors ${
                                    isClosingActiveSession || isContinuingActiveSession ? 'opacity-70 cursor-not-allowed' : 'hover:bg-base-hard/20 cursor-pointer'
                                }`}
                            >
                                {isClosingActiveSession ? 'Cerrando...' : 'Empezar nuevo'}
                            </button>
                            <button
                                type="button"
                                onClick={handleContinueExam}
                                disabled={isClosingActiveSession || isContinuingActiveSession}
                                className={`w-full py-3 rounded-xl font-bold bg-base-hard text-base-dark transition-opacity ${
                                    isClosingActiveSession || isContinuingActiveSession ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'
                                }`}
                            >
                                {isContinuingActiveSession ? 'Cargando...' : 'Continuar examen'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ExamSelector;
