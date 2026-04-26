import { useState, useEffect } from "react";
import diagnosticData from "@/data/diagnostico_preguntas.json";

export interface DiagnosticQuestion {
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

export function useExamLogic() {
    const [questions] = useState<DiagnosticQuestion[]>(diagnosticData as DiagnosticQuestion[]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQ = questions[currentIndex];

    const [isClient, setIsClient] = useState(false);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const [showOverlay, setShowOverlay] = useState(false);
    const [revealHint, setRevealHint] = useState(false);
    const [revealExplanation, setRevealExplanation] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isExamFinished, setIsExamFinished] = useState(false);
    const [finishMessage, setFinishMessage] = useState("");
    const [finalScore, setFinalScore] = useState(0);

    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [slideDir, setSlideDir] = useState<"next" | "prev" | "">("");

    useEffect(() => {
        const savedDataString = localStorage.getItem('exam_results');
        if (savedDataString) {
            try {
                const savedData = JSON.parse(savedDataString);
                const currentTime = new Date().getTime();
                const oneHourInMs = 60 * 60 * 1000;

                if (savedData.timestamp && savedData.answers) {
                    const timePassed = currentTime - savedData.timestamp;
                    if (timePassed > oneHourInMs) {
                        localStorage.removeItem('exam_results');
                        localStorage.removeItem('exam_end_time');
                    } else {
                        setAnswers(savedData.answers);
                    }
                } else {
                    localStorage.removeItem('exam_results');
                    localStorage.removeItem('exam_end_time');
                }
            } catch (error) {
                localStorage.removeItem('exam_results');
                localStorage.removeItem('exam_end_time');
            }
        }
        setIsClient(true);
    }, []);

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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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

    const calculateScore = (currentAnswers: Record<number, string>) => {
        let correctCount = 0;
        questions.forEach(q => {
            if (currentAnswers[q.id] === q.correctAnswer.toLowerCase()) {
                correctCount++;
            }
        });
        return Math.floor((correctCount / questions.length) * 100);
    };

    const finishExam = (reason: "timeout" | "manual", currentAnswers: Record<number, string>) => {
        const score = calculateScore(currentAnswers);
        setFinalScore(score);
        setFinishMessage(reason === "timeout" ? "Se acabó el tiempo" : "Terminaste a tiempo");
        setIsExamFinished(true);

        localStorage.removeItem('exam_results');
        localStorage.removeItem('exam_end_time');
    };

    const handleTimeUp = () => finishExam("timeout", answers);

    const minSwipeDistance = 60;
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
        setIsSwiping(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!touchStartX) return;
        const currentX = e.targetTouches[0].clientX;
        const diff = currentX - touchStartX;

        if ((currentIndex === 0 && diff > 0) || (currentIndex === questions.length - 1 && diff < 0)) {
            setSwipeOffset(diff * 0.2);
        } else {
            setSwipeOffset(diff);
        }
    };

    const onTouchEnd = () => {
        if (!touchStartX) return;
        setIsSwiping(false);
        if (swipeOffset > minSwipeDistance) handlePrev();
        else if (swipeOffset < -minSwipeDistance) handleNext();
        setSwipeOffset(0);
        setTouchStartX(null);
    };

    const saveAnswer = (answerValue: string) => {
        const updatedAnswers = { ...answers, [currentQ.id]: answerValue };
        setAnswers(updatedAnswers);

        localStorage.setItem('exam_results', JSON.stringify({
            answers: updatedAnswers,
            timestamp: new Date().getTime()
        }));

        setSelectedOption(answerValue);
        setRevealExplanation(true);

        if (Object.keys(updatedAnswers).length === questions.length) {
            setTimeout(() => {
                finishExam("manual", updatedAnswers);
            }, 1500);
        }
    };

    const handleOptionSelect = (letter: string) => {
        if (answers[currentQ.id]) return;
        setSelectedOption(letter);
    };

    const handleContestar = () => {
        if (!selectedOption || answers[currentQ.id]) return;
        saveAnswer(selectedOption);
    };

    const handleExplicacionDirecta = () => {
        if (answers[currentQ.id]) return;
        saveAnswer("-");
        setShowOverlay(false);
    };

    const hasImage = currentQ.imageUrl !== null && currentQ.imageUrl.trim() !== "";

    return {
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
    };
}