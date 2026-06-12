"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageModal from "@/components/exam/ImageModal";
import HintBox from "@/components/exam/HintBox";
import ExamHeader from "@/components/exam/ExamHeader";
import QuestionPanel from "@/components/exam/QuestionPanel";
import ResourcePanel from "@/components/exam/ResourcePanel";
import { MdOutlineDoNotDisturb } from "react-icons/md";
import { LuArrowLeft } from "react-icons/lu";
import Timer from "@/components/Timer";

import { useQuickExamLogic } from "@/hooks/useQuickExamLogic";

function ExamPage() {
    const router = useRouter();

    const {
        session,
        isSimulacro,
        questions, currentIndex, setCurrentIndex, currentQ,
        answers, selectedOption,
        showOverlay, setShowOverlay,
        revealHint, showHintLimitModal, setShowHintLimitModal, revealExplanation,
        isModalOpen, openModal, closeModal,
        isExamFinished,
        swipeOffset, isSwiping, slideDir,
        handlePrev, handleNext, handleTimeUp, finishExam,
        onTouchStart, onTouchMove, onTouchEnd,
        handleOptionSelect, handleContestar, handleShowHint, handleExplicacionDirecta,
        hasImage, answerResults, hintResults, submitError, isSubmitting, isHintLoading, isExplanationLoading, timeRemaining
    } = useQuickExamLogic();

    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');
    const hasActiveExam = !!session && !isExamFinished;

    useEffect(() => {
        if (!session) router.replace('/home');
    }, [session, router]);

    useEffect(() => {
        if (!hasActiveExam) return;

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasActiveExam]);

    const handleLeaveExam = () => {
        window.location.href = '/home';
    };

    if (!currentQ) return null;

    return (
        <>
            {showOverlay && (
                <HintBox
                    onShowHint={handleShowHint}
                    onShowExplanation={handleExplicacionDirecta}
                    isShowingHint={isHintLoading}
                    isShowingExplanation={isExplanationLoading}
                    error={submitError}
                    onClose={() => setShowOverlay(false)}
                />
            )}

            <div className={`flex flex-col min-h-screen justify-center items-center md:justify-start gap-5 transition-all duration-300 ${isModalOpen || showOverlay || showHintLimitModal || isExamFinished ? 'blur-md pointer-events-none select-none' : ''} pb-22 pt-10 `}>

                <div className={`flex justify-center w-[90%] md:w-4/5 tabular-nums transition-colors ${timeRemaining <= 60 ? 'text-red-500' : 'text-base-dark'}`}>
                    <Timer minutes={minutes} seconds={seconds} />
                </div>

                <div className="flex items-center justify-between w-[90%] md:w-4/5">
                    <button
                        type="button"
                        onClick={handleLeaveExam}
                        className="inline-flex items-center gap-2 text-base-dark/70 text-sm  px-4 py-2 rounded-full font-semibold tracking-wider hover:text-base-dark hover:bg-base-dark/5 transition-colors cursor-pointer"
                    >
                        <LuArrowLeft size={16} strokeWidth={2.2} />
                        Salir del examen
                    </button>
                    <button
                        onClick={() => finishExam("manual", answers)}
                        className="bg-base-dark text-white text-sm px-4 py-2 rounded-full font-semibold tracking-wider hover:opacity-80 transition-opacity cursor-pointer"
                    >
                        Finalizar
                    </button>
                </div>

                <ExamHeader
                    examType={isSimulacro ? "Examen Simulacro" : "Examen Rápido"}
                    questions={questions}
                    currentIndex={currentIndex}
                    answers={answers}
                    setCurrentIndex={setCurrentIndex}
                    setShowOverlay={setShowOverlay}
                    isHelpDisabled={!!answers[currentQ.id]}
                    showHelp={!isSimulacro}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />

                <div
                    key={currentIndex}
                    className={`w-[90%] md:w-4/5 flex flex-col gap-5 items-center md:items-stretch md:grid md:grid-cols-3 md:min-h-[500px]
                        ${!isSwiping ? 'transition-all duration-300 ease-out' : ''}
                        ${!isSwiping && slideDir === 'next' ? 'animate-in fade-in slide-in-from-right-8 duration-500' : ''}
                        ${!isSwiping && slideDir === 'prev' ? 'animate-in fade-in slide-in-from-left-8 duration-500' : ''}
                    `}
                    style={{
                        transform: `translateX(${swipeOffset}px)`,
                        opacity: isSwiping ? Math.max(1 - Math.abs(swipeOffset) / 300, 0.5) : 1
                    }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <QuestionPanel
                        currentQ={currentQ}
                        currentIndex={currentIndex}
                        selectedOption={selectedOption}
                        answers={answers}
                        handleOptionSelect={handleOptionSelect}
                        handleContestar={handleContestar}
                        isLastQuestion={currentIndex === questions.length - 1}
                        submitError={submitError}
                        isSubmitting={isSubmitting}
                    />

                    <ResourcePanel
                        currentQ={currentQ}
                        hasImage={hasImage}
                        revealHint={revealHint}
                        revealExplanation={revealExplanation}
                        selectedOption={selectedOption}
                        answers={answers}
                        openModal={openModal}
                        answerResult={answerResults[currentQ.id] ?? null}
                        hint={hintResults[currentQ.id]?.hint ?? currentQ.hint}
                        hintCount={hintResults[currentQ.id]?.countHints ?? ''}
                    />
                </div>
            </div>

            <br />

            {showHintLimitModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-300"
                    onClick={() => setShowHintLimitModal(false)}
                >
                    <div
                        className="bg-base-dark text-base-soft rounded-[28px] p-8 flex flex-col items-center gap-5 w-full max-w-[380px] shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <MdOutlineDoNotDisturb size={48} className="text-base-hard" />
                        <h2 className="text-xl font-extrabold text-center tracking-tight">Límite diario alcanzado</h2>
                        <p className="text-sm text-center leading-relaxed text-base-soft/80">
                            Se ha alcanzado el límite diario de pistas (5/día en la versión gratuita).
                        </p>
                        <button
                            onClick={() => setShowHintLimitModal(false)}
                            className="mt-2 w-full py-3 rounded-xl font-bold bg-base-hard text-base-dark hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}

            {isModalOpen && hasImage && (
                <ImageModal imageUrl={currentQ.imageUrl} onClose={closeModal} />
            )}
        </>
    );
}

export default ExamPage;
