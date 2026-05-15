"use client"

import { FaLightbulb } from "react-icons/fa6";
import { CaretLeftCircle, CaretRightCircle } from "@boxicons/react";
import NavExam from "@/components/exam/NavExam";

export default function ExamHeader({
    examType,
    questions,
    currentIndex,
    answers,
    setCurrentIndex,
    setShowOverlay,
    handlePrev,
    handleNext
}) {
    return (
        <div className="flex bg-base-dark p-2 pl-4 pr-4 rounded-[30px] md:rounded-full w-[90%] md:w-4/5 text-white justify-between items-center gap-4 shadow-lg overflow-hidden">
            <h2 className="text-[16px] font-bold tracking-wider hidden sm:block">
                {examType}
            </h2>

            <div className="flex-1 flex justify-center">
                <NavExam
                    questions={questions}
                    currentIndex={currentIndex}
                    answers={answers}
                    onNavigate={setCurrentIndex}
                />
            </div>

            <div className="flex gap-2 md:gap-3 items-center">
                <div
                    onClick={() => setShowOverlay(true)}
                    className="flex items-center justify-center gap-3 bg-base-hard p-2 rounded-full pl-4 pr-4 sm:pl-5 sm:pr-7 hover:cursor-pointer hover:opacity-70 transition-opacity"
                >
                    <FaLightbulb size={20} />
                    <p className="tracking-wider font-semibold hidden lg:block">Ayuda</p>
                </div>

                <div className="hidden md:flex items-center text-base gap-1">
                    <CaretLeftCircle
                        width={40} height={40} pack="filled"
                        className={`hover:cursor-pointer hover:opacity-70 ${currentIndex === 0 ? 'opacity-30 pointer-events-none' : ''}`}
                        onClick={handlePrev}
                    />
                    <CaretRightCircle
                        width={40} height={40} pack="filled"
                        className={`hover:cursor-pointer hover:opacity-70 ${currentIndex === questions.length - 1 ? 'opacity-30 pointer-events-none' : ''}`}
                        onClick={handleNext}
                    />
                </div>
            </div>
        </div>
    );
}
