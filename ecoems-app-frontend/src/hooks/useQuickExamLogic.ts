import React, { useState, useEffect, useRef } from 'react';
import { useExam, ExamQuestion, ExamSession } from './useExam';
import { getExplication, getHint, submitAnswer, submitExam } from '@/lib/api/exam';

export interface AnswerResult {
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
}

export interface HintResult {
    hint: string;
    countHints: string;
}

export interface MappedQuestion {
    id: number;
    question: string;
    reading: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    imageUrl: string;
    hint: string;
    correctAnswer: string;
    answerExplanation: string;
    subject: string;
}

function mapQuestion(q: ExamQuestion, examArea: string): MappedQuestion {
    return {
        id: q.question_id,
        question: q.question_text,
        reading: q.content_readings ?? '',
        answerA: q.options.a,
        answerB: q.options.b,
        answerC: q.options.c,
        answerD: q.options.d,
        imageUrl: q.image_url ?? '',
        hint: '',
        correctAnswer: '',
        answerExplanation: '',
        subject: examArea,
    };
}

function mapSavedAnswers(session: ExamSession | null): Record<number, string> {
    return Object.fromEntries(
        (session?.answers_saved ?? []).map(answer => [answer.question_id, answer.selected_answer])
    );
}

function getFirstUnansweredIndex(questions: MappedQuestion[], answers: Record<number, string>) {
    const index = questions.findIndex(question => !answers[question.id]);
    return index === -1 ? 0 : index;
}

export function useQuickExamLogic() {
    const { session, timeRemaining } = useExam();

    const questions: MappedQuestion[] = (session?.questions ?? [])
        .slice()
        .sort((a, b) => a.position - b.position)
        .map(q => mapQuestion(q, session?.exam_area ?? session?.exam_type ?? ''));

    const initialAnswers = mapSavedAnswers(session);

    const [currentIndex, setCurrentIndex] = useState(() => getFirstUnansweredIndex(questions, initialAnswers));
    const [answers, setAnswers] = useState<Record<number, string>>(() => initialAnswers);
    const [selectedOption, setSelectedOption] = useState<string | null>(() => {
        const initialQuestion = questions[getFirstUnansweredIndex(questions, initialAnswers)];
        return initialQuestion ? (initialAnswers[initialQuestion.id] ?? null) : null;
    });

    const [showOverlay, setShowOverlay] = useState(false);
    const [revealHint, setRevealHint] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExamFinished, setIsExamFinished] = useState(false);
    const [finishMessage, setFinishMessage] = useState('');
    const [finalScore, setFinalScore] = useState(0);

    const [answerResults, setAnswerResults] = useState<Record<number, AnswerResult>>({});
    const [hintResults, setHintResults] = useState<Record<number, HintResult>>({});
    const [showHintLimitModal, setShowHintLimitModal] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHintLoading, setIsHintLoading] = useState(false);
    const [isExplanationLoading, setIsExplanationLoading] = useState(false);

    const isFinishingRef = useRef(false);

    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [slideDir, setSlideDir] = useState('');

    const currentQ = questions[currentIndex] ?? null;
    const revealExplanation = !!(currentQ && answerResults[currentQ.id]);

    useEffect(() => {
        setShowOverlay(false);
        setRevealHint(false);
        setShowHintLimitModal(false);
        setSelectedOption(currentQ ? (answers[currentQ.id] ?? null) : null);
        setSubmitError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setSlideDir('prev');
            setCurrentIndex(i => i - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setSlideDir('next');
            setCurrentIndex(i => i + 1);
        }
    };

    const finishExam = async (reason: string, currentAnswers: Record<number, string>) => {
        if (isFinishingRef.current) return;
        isFinishingRef.current = true;
        setFinishMessage(reason === 'timeout' ? 'Se acabó el tiempo' : 'Terminaste a tiempo');
        const { data } = await submitExam(session!.session_id);
        setFinalScore(data ? parseFloat(data.score) : 0);
        setIsExamFinished(true);
    };

    useEffect(() => {
        if (timeRemaining === 0 && session && !isFinishingRef.current) {
            finishExam('timeout', answers);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeRemaining]);

    const handleTimeUp = () => finishExam('timeout', answers);

    const saveAnswer = (answerValue: string) => {
        if (!currentQ) return;
        const updated = { ...answers, [currentQ.id]: answerValue };
        setAnswers(updated);
        setSelectedOption(answerValue);

        if (Object.keys(updated).length === questions.length) {
            setTimeout(() => finishExam('manual', updated), 1500);
        }
    };

    const handleOptionSelect = (letter: string) => {
        if (!currentQ || answers[currentQ.id]) return;
        setSelectedOption(letter);
    };

    const handleContestar = async () => {
        if (!selectedOption || !currentQ || answers[currentQ.id] || isSubmitting) return;
        setIsSubmitting(true);
        setSubmitError(null);
        const { data, error } = await submitAnswer({ session_id: session!.session_id, question_id: currentQ.id, selected_answer: selectedOption });
        setIsSubmitting(false);
        if (error) {
            setSubmitError('No se pudo registrar tu respuesta. Intenta de nuevo.');
            return;
        }
        setAnswerResults(prev => ({
            ...prev,
            [currentQ.id]: {
                isCorrect: data.is_correct,
                correctAnswer: data.correct_answer,
                explanation: data.explanation,
            }
        }));
        saveAnswer(selectedOption);
    };

    const handleShowHint = async () => {
        if (!currentQ || !session || isHintLoading) return;
        if (hintResults[currentQ.id]) {
            setRevealHint(true);
            setShowOverlay(false);
            return;
        }
        setIsHintLoading(true);
        setSubmitError(null);
        const { data, error } = await getHint({ session_id: session.session_id, question_id: currentQ.id });
        setIsHintLoading(false);
        if (error) {
            setShowOverlay(false);
            setShowHintLimitModal(true);
            return;
        }
        if (!data?.hint_available) {
            setShowOverlay(false);
            setShowHintLimitModal(true);
            return;
        }
        if (!data?.hint) {
            setSubmitError('No se pudo obtener la pista. Intenta de nuevo.');
            return;
        }
        setHintResults(prev => ({
            ...prev,
            [currentQ.id]: {
                hint: data.hint,
                countHints: data?.count_hints ?? '',
            },
        }));
        setRevealHint(true);
        setShowOverlay(false);
    };

    const handleExplicacionDirecta = async () => {
        if (!currentQ || !session || answers[currentQ.id] || isExplanationLoading) return;
        setIsExplanationLoading(true);
        setSubmitError(null);
        const { data, error } = await getExplication({ session_id: session.session_id, question_id: currentQ.id });
        setIsExplanationLoading(false);
        if (error) {
            setSubmitError('No se pudo obtener la explicación. Intenta de nuevo.');
            return;
        }
        setAnswerResults(prev => ({
            ...prev,
            [currentQ.id]: {
                isCorrect: false,
                correctAnswer: '',
                explanation: data?.explanation ?? '',
            }
        }));
        saveAnswer('-');
        setShowOverlay(false);
    };

    const minSwipeDistance = 60;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
        setIsSwiping(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const diff = e.targetTouches[0].clientX - touchStartX;
        if (
            (currentIndex === 0 && diff > 0) ||
            (currentIndex === questions.length - 1 && diff < 0)
        ) {
            setSwipeOffset(diff * 0.2);
        } else {
            setSwipeOffset(diff);
        }
    };

    const onTouchEnd = () => {
        if (touchStartX === null) return;
        setIsSwiping(false);
        if (swipeOffset > minSwipeDistance) handlePrev();
        else if (swipeOffset < -minSwipeDistance) handleNext();
        setSwipeOffset(0);
        setTouchStartX(null);
    };

    const hasImage = !!currentQ?.imageUrl && currentQ.imageUrl.trim() !== '';

    return {
        session,
        questions,
        currentIndex,
        setCurrentIndex,
        currentQ,
        answers,
        selectedOption,
        showOverlay,
        setShowOverlay,
        revealHint,
        setRevealHint,
        showHintLimitModal,
        setShowHintLimitModal,
        revealExplanation,
        isModalOpen,
        openModal,
        closeModal,
        isExamFinished,
        finishMessage,
        finalScore,
        swipeOffset,
        isSwiping,
        slideDir,
        handlePrev,
        handleNext,
        handleTimeUp,
        finishExam,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        handleOptionSelect,
        handleContestar,
        handleShowHint,
        handleExplicacionDirecta,
        hasImage,
        answerResults,
        hintResults,
        submitError,
        isSubmitting,
        isHintLoading,
        isExplanationLoading,
        timeRemaining,
    };
}
