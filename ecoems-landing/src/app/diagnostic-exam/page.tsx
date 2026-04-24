"use client"

import ImageModal from "@/components/exam/ImageModal";
import Timer from "@/components/exam/Timer";
import HintBox from "@/components/exam/HintBox";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ExamHeader from "@/components/exam/ExamHeader";
import QuestionPanel from "@/components/exam/QuestionPanel";
import ResourcePanel from "@/components/exam/ResourcePanel";
import FinishedExamDashboard from "@/components/exam/FinishedExamDashboard";

// IMPORTAMOS NUESTRA LÓGICA ABSTRAÍDA
import { useExamLogic } from "@/utils/exam/useExamLogic";

function ExamPage() {
    // Extraemos todo lo que necesitamos de nuestro Custom Hook
    const {
        questions, currentIndex, setCurrentIndex, currentQ,
        answers, selectedOption,
        showOverlay, setShowOverlay,
        revealHint, setRevealHint, revealExplanation,
        isModalOpen, openModal, closeModal,
        isExamFinished, finishMessage, finalScore,
        swipeOffset, isSwiping, slideDir,
        handlePrev, handleNext, handleTimeUp,
        onTouchStart, onTouchMove, onTouchEnd,
        handleOptionSelect, handleContestar, handleExplicacionDirecta,
        hasImage
    } = useExamLogic();

    return (
        <>
            <Navbar />

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

                <Timer
                    initialMinutes={20}
                    initialSeconds={0}
                    onTimeUp={handleTimeUp}
                />

                <ExamHeader
                    examType="Examen Diagnóstico"
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
                    />

                    <ResourcePanel
                        currentQ={currentQ}
                        hasImage={hasImage}
                        revealHint={revealHint}
                        revealExplanation={revealExplanation}
                        selectedOption={selectedOption}
                        answers={answers}
                        openModal={openModal}
                    />
                </div>
            </div>

            <br />
            <Footer />

            {/* PANTALLA BLOQUEADA CON EL DASHBOARD FINAL */}
            {isExamFinished && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-500">
                    <FinishedExamDashboard closeActionMessage={finishMessage} score={finalScore} />
                </div>
            )}

            {isModalOpen && hasImage && (
                <ImageModal imageUrl={currentQ.imageUrl as string} onClose={closeModal} />
            )}
        </>
    );
}

export default ExamPage;