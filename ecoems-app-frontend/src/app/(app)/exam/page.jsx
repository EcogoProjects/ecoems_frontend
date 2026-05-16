"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageModal from "@/components/exam/ImageModal";
import HintBox from "@/components/exam/HintBox";
import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";
import ExamHeader from "@/components/exam/ExamHeader";
import QuestionPanel from "@/components/exam/QuestionPanel";
import ResourcePanel from "@/components/exam/ResourcePanel";
import FinishedExamDashboard from "@/components/exam/FinishedExamDashboard";

import { useQuickExamLogic } from "@/hooks/useQuickExamLogic";

function ExamPage() {
    const router = useRouter();

    const {
        session,
        questions, currentIndex, setCurrentIndex, currentQ,
        answers, selectedOption,
        showOverlay, setShowOverlay,
        revealHint, setRevealHint, revealExplanation,
        isModalOpen, openModal, closeModal,
        isExamFinished, finishMessage, finalScore,
        swipeOffset, isSwiping, slideDir,
        handlePrev, handleNext, handleTimeUp, finishExam,
        onTouchStart, onTouchMove, onTouchEnd,
        handleOptionSelect, handleContestar, handleExplicacionDirecta,
        hasImage, answerResults, submitError, isSubmitting, timeRemaining
    } = useQuickExamLogic();

    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');

    useEffect(() => {
        if (!session) router.replace('/home');
    }, [session, router]);

    if (!currentQ) return null;

    return (
        <>
            <NavBarDesktop />
            <NavBarMovile />

            {showOverlay && (
                <HintBox
                    onShowHint={() => {
                        setRevealHint(true);
                        setShowOverlay(false);
                    }}
                    onShowExplanation={handleExplicacionDirecta}
                    onClose={() => setShowOverlay(false)}
                />
            )}

            <div className={`flex flex-col min-h-screen justify-center items-center md:justify-start gap-5 transition-all duration-300 ${isModalOpen || showOverlay || isExamFinished ? 'blur-md pointer-events-none select-none' : ''} pb-22 pt-10 md:pt-20`}>

                <div className="flex items-center justify-between w-[90%] md:w-4/5">
                    <span className={`font-mono font-bold text-lg tabular-nums transition-colors ${timeRemaining <= 60 ? 'text-red-500' : 'text-base-dark'}`}>
                        {minutes}:{seconds}
                    </span>
                    <button
                        onClick={() => finishExam("manual", answers)}
                        className="bg-base-dark text-white text-sm px-4 py-2 rounded-full font-semibold tracking-wider hover:opacity-80 transition-opacity cursor-pointer"
                    >
                        Finalizar
                    </button>
                </div>

                <ExamHeader
                    examType="Examen Rápido"
                    questions={questions}
                    currentIndex={currentIndex}
                    answers={answers}
                    setCurrentIndex={setCurrentIndex}
                    setShowOverlay={setShowOverlay}
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
                    />
                </div>
            </div>

            <br />

            {isExamFinished && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-500">
                    <FinishedExamDashboard closeActionMessage={finishMessage} score={finalScore} />
                </div>
            )}

            {isModalOpen && hasImage && (
                <ImageModal imageUrl={currentQ.imageUrl} onClose={closeModal} />
            )}
        </>
    );
}

export default ExamPage;
