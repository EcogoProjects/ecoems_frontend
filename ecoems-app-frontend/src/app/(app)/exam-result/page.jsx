"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MarginBottom from "@/components/MarginBottom";
import ResultQuestionsHeader from "@/components/exam/ResultQuestionsHeader";
import ResultQuestionsSummary from "@/components/exam/ResultQuestionsSummary";
import QuestionsBreakdown from "@/components/exam/QuestionsBreakdown";
import { getExamResult } from "@/hooks/useExamResult";

function formatDuration(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getAnswerText(options, answer) {
    if (!answer || answer === "-") return "Sin responder";
    return options?.[answer] ?? answer;
}

function mapResult(result) {
    const totalQuestions = result.total_questions || result.breakdown.length || 1;
    const averageSeconds = totalQuestions > 0 ? Math.floor(result.time_used_seconds / totalQuestions) : 0;

    return {
        summary: {
            score: parseFloat(String(result.score)),
            maxScore: 10,
            correct: result.correct_count,
            incorrect: result.incorrect_count,
            partial: result.skipped_count,
            totalQuestions,
            totalTime: formatDuration(result.time_used_seconds),
            averageTime: formatDuration(averageSeconds),
        },
        questions: result.breakdown.map((question) => ({
            id: question.question_id,
            status: question.is_correct ? "correct" : "incorrect",
            prompt: question.question_text,
            imageLabel: question.image_url,
            reading: question.content_readings,
            userAnswer: getAnswerText(question.options, question.selected_answer),
            correctAnswer: getAnswerText(question.options, question.correct_answer),
            explanation: question.explanation,
        })),
    };
}

export default function ExamResultPage() {
    const router = useRouter();
    const examResult = getExamResult();

    useEffect(() => {
        if (!examResult) router.replace("/home");
    }, [examResult, router]);

    if (!examResult) return null;

    const mappedResult = mapResult(examResult.result);

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col gap-7 px-5 pb-28 pt-6 text-base-dark md:px-8 md:pb-20">
            <ResultQuestionsHeader />
            <ResultQuestionsSummary summary={mappedResult.summary} />
            <QuestionsBreakdown questions={mappedResult.questions} />
            <MarginBottom />
        </main>
    );
}
