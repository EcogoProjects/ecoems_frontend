"use client"

import { useState, useEffect } from "react";
import diagnosticData from "@/data/diagnostico_preguntas.json";
import ImageModal from "@/components/exam/ImageModal";
import ExamOption from "@/components/exam/ExamOption";
import ExamExplanation from "@/components/exam/ExamExplanation";
import raccoon from "@/assets/Raccoon_question.png";
import Timer from "@/components/exam/Timer";
import Image from "next/image";
import { FaLightbulb } from "react-icons/fa6";
import { CaretLeftCircle, CaretRightCircle } from "@boxicons/react";
import HintBox from "@/components/exam/HintBox";
import Footer from "@/components/shared/Footer";
import NavExam from "@/components/exam/NavExam";
import Navbar from "@/components/shared/Navbar";

interface DiagnosticQuestion {
    id: number;
    subject: string | null;
    topic: string | null;
    subtopic: string | null;
    question: string;
    imageUrl: string | null;
    hasReading: string;
    reading: string | null;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: string;
    hint: string;
    answerExplanation: string;
}

function ExamPage() {
    const [questions] = useState<DiagnosticQuestion[]>(diagnosticData as DiagnosticQuestion[]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQ = questions[currentIndex];

    // ESTADOS DE LA MEMORIA (LOCALSTORAGE) Y RESPUESTAS
    const [isClient, setIsClient] = useState(false);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    // ESTADOS PARA PISTAS Y MODALES
    const [showOverlay, setShowOverlay] = useState(false);
    const [revealHint, setRevealHint] = useState(false);
    const [revealExplanation, setRevealExplanation] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ESTADOS PARA GESTOS TÁCTILES (SWIPE EN MÓVILES)
    const [touchEndX, setTouchEndX] = useState<number | null>(null);

    // ESTADOS PARA GESTOS TÁCTILES (SWIPE EN MÓVILES) Y ANIMACIÓN
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [swipeOffset, setSwipeOffset] = useState(0); // Cuánto se ha movido el dedo
    const [isSwiping, setIsSwiping] = useState(false); // Para saber si estamos arrastrando
    const [slideDir, setSlideDir] = useState<"next" | "prev" | "">(""); // Dirección de la animación de entrada

    // 1. Cargar datos del localStorage al entrar a la página
    useEffect(() => {
        const savedAnswers = localStorage.getItem('exam_results');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
        setIsClient(true);
    }, []);

    // 2. Efecto para resetear/configurar el estado visual cada que cambiamos de pregunta
    useEffect(() => {
        if (!isClient) return;

        setShowOverlay(false);
        setRevealHint(false);

        if (answers[currentQ.id]) {
            setSelectedOption(answers[currentQ.id]);
            setRevealExplanation(true);
        } else {
            setSelectedOption(null);
            setRevealExplanation(false);
        }
    }, [currentIndex, currentQ.id, isClient]);

    // FUNCIONES DE CONTROL
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const exam_type = 'Examen Diagnóstico';

    const handlePrev = () => {
        if (currentIndex > 0) {
            setSlideDir("prev");
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setSlideDir("next");
            setCurrentIndex((prev) => prev + 1);
        }
    };

    // --- LÓGICA DE SWIPE (DESLIZAMIENTO VISUAL) ---
    const minSwipeDistance = 60; // Distancia para considerar cambio de pregunta

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
        setIsSwiping(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!touchStartX) return;
        const currentX = e.targetTouches[0].clientX;
        const diff = currentX - touchStartX;

        // Agregar resistencia si estamos en el borde del examen
        if ((currentIndex === 0 && diff > 0) || (currentIndex === questions.length - 1 && diff < 0)) {
            setSwipeOffset(diff * 0.2); // Se mueve muy poco, indicando límite
        } else {
            setSwipeOffset(diff); // Sigue al dedo exactamente
        }
    };

    const onTouchEnd = () => {
        if (!touchStartX) return;
        setIsSwiping(false);

        // Si se deslizó lo suficiente a la derecha (positivo) -> Anterior
        if (swipeOffset > minSwipeDistance) {
            handlePrev();
        }
        // Si se deslizó lo suficiente a la izquierda (negativo) -> Siguiente
        else if (swipeOffset < -minSwipeDistance) {
            handleNext();
        }

        // Devolvemos la tarjeta a su posición original suavemente
        setSwipeOffset(0);
        setTouchStartX(null);
    };
    // ---------------------------------------
    // ---------------------------------------

    const handleOptionSelect = (letter: string) => {
        if (answers[currentQ.id]) return;
        setSelectedOption(letter);
    };

    const handleContestar = () => {
        if (!selectedOption) return;
        if (answers[currentQ.id]) return;

        const updatedAnswers = {
            ...answers,
            [currentQ.id]: selectedOption
        };

        setAnswers(updatedAnswers);
        localStorage.setItem('exam_results', JSON.stringify(updatedAnswers));
        setRevealExplanation(true);
    };

    const handleExplicacionDirecta = () => {
        if (answers[currentQ.id]) return;

        const failedAnswer = "-";

        const updatedAnswers = {
            ...answers,
            [currentQ.id]: failedAnswer
        };

        setAnswers(updatedAnswers);
        localStorage.setItem('exam_results', JSON.stringify(updatedAnswers));

        setSelectedOption(failedAnswer);
        setRevealExplanation(true);
        setShowOverlay(false);
    };

    const hasReading = currentQ.reading !== null && currentQ.reading.trim() !== "";
    const hasImage = currentQ.imageUrl !== null && currentQ.imageUrl.trim() !== "";
    const isLastQuestion = currentIndex === questions.length - 1;

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

            <div className={`flex flex-col min-h-screen justify-center items-center gap-5 transition-all duration-300 ${isModalOpen || showOverlay ? 'blur-md pointer-events-none' : ''} pb-22 pt-10 md:pt-20`}>

                <Timer minutes={10} seconds={30} />

                <div className="flex bg-base-dark p-2 pl-4 pr-4 rounded-[30px] md:rounded-full w-[90%] md:w-4/5 text-white justify-between items-center gap-4 shadow-lg overflow-hidden">
                    <h2 className="text-[16px] font-bold tracking-wider hidden sm:block">
                        {exam_type}
                    </h2>

                    <div className="flex-1 flex justify-center">
                        <NavExam
                            questions={questions}
                            currentIndex={currentIndex}
                            answers={answers}
                            onNavigate={(index) => setCurrentIndex(index)}
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

                {/* CONTENEDOR PRINCIPAL ANIMADO */}
                <div
                    key={currentIndex} // Fuerza re-render y animación al cambiar de índice
                    className={`w-[90%] md:w-4/5 flex flex-col gap-5 items-center md:items-stretch md:grid md:grid-cols-3 md:min-h-[500px]
                        ${!isSwiping ? 'transition-all duration-300 ease-out' : ''} 
                        ${!isSwiping && slideDir === 'next' ? 'animate-in fade-in slide-in-from-right-8 duration-500' : ''}
                        ${!isSwiping && slideDir === 'prev' ? 'animate-in fade-in slide-in-from-left-8 duration-500' : ''}
                    `}
                    style={{
                        // Mueve el contenedor horizontalmente con el dedo
                        transform: `translateX(${swipeOffset}px)`,
                        // Baja un poco la opacidad al arrastrar para dar efecto de "cambio"
                        opacity: isSwiping ? Math.max(1 - Math.abs(swipeOffset) / 300, 0.5) : 1
                    }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >

                    {/* COLUMNA IZQUIERDA */}
                    <div className="bg-base w-full p-4 md:p-6 rounded-[18px] md:col-span-2 md:h-full shadow-lg">
                        <div className="w-full text-right font-bold opacity-70 tracking-widest mb-2">
                            <p>{currentQ.subject || 'Sin materia'}</p>
                        </div>

                        {hasReading && (
                            <p className="p-3 bg-white/50 rounded-[18px] mb-4 text-sm font-medium border border-white/20 whitespace-pre-line">
                                {currentQ.reading}
                            </p>
                        )}

                        <div className="flex items-start gap-4">
                            <div className="bg-base-dark text-white text-2xl min-w-[40px] h-[40px] flex items-center justify-center rounded-full shrink-0 shadow-inner">
                                <p className="text-lg">{currentIndex + 1}</p>
                            </div>
                            <p className="text-lg font-semibold pt-1 text-slate-800">{currentQ.question}</p>
                        </div>

                        {/* LISTA DE OPCIONES CON SELECCIÓN */}
                        <div className="pl-2.5 mt-6 flex flex-col gap-2.5">
                            {[
                                { letter: 'a', text: currentQ.answerA, val: 1 },
                                { letter: 'b', text: currentQ.answerB, val: 2 },
                                { letter: 'c', text: currentQ.answerC, val: 3 },
                                { letter: 'd', text: currentQ.answerD, val: 4 }
                            ].map((opt) => (
                                <ExamOption
                                    key={opt.letter}
                                    name={`question-${currentQ.id}`}
                                    value={opt.val}
                                    letter={opt.letter}
                                    text={opt.text}
                                    checked={selectedOption === opt.letter}
                                    onChange={() => handleOptionSelect(opt.letter)}
                                    disabled={!!answers[currentQ.id]}
                                />
                            ))}
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

                    {/* COLUMNA DERECHA */}
                    <div className="w-full flex flex-col gap-5 h-full md:col-span-1">

                        {hasImage && (
                            <div className="bg-base-hard rounded-[22px] p-3 shadow-lg">
                                <div onClick={openModal} className="relative w-full aspect-video rounded-[18px] bg-white overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-white/50 transition-all">
                                    <Image
                                        src={currentQ.imageUrl as string}
                                        alt="Question resource"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover"
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
                                    src={raccoon}
                                    alt="ecogo hint"
                                    width={100}
                                    height={180}
                                    className="object-contain drop-shadow-md grayscale opacity-80"
                                />
                            </div>
                        )}

                        {revealHint && currentQ.hint && (
                            <div className="bg-base-soft rounded-[18px] p-3 shadow-lg">
                                <div className="flex items-center gap-2 mb-2 text-base-dark">
                                    <FaLightbulb />
                                    <p className="font-bold ">Pista sugerida</p>
                                </div>
                                <p className="opacity-55">{currentQ.hint}</p>
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
                </div>
            </div>
            <br />
            <Footer />

            {isModalOpen && hasImage && (
                <ImageModal imageUrl={currentQ.imageUrl as string} onClose={closeModal} />
            )}
        </>
    );
}

export default ExamPage;