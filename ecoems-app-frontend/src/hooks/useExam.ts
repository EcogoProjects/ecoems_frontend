import { useState, useEffect, useRef } from 'react';
import { startExam, getDailyUsage } from '@/lib/api';
import { DailyUsage, canTakeQuickExam } from '@/utils/exam/examLogic';

export type ExamType = 'quick' | 'seguimiento' | 'simulacro' | 'diagnostic';

interface StartExamParams {
    exam_type: ExamType;
    subtopic_id?: number | null;
}

interface ExamOption {
    a: string;
    b: string;
    c: string;
    d: string;
}

export interface ExamQuestion {
    question_id: number;
    position: number;
    question_text: string;
    image_url: string | null;
    content_readings: string | null;
    options: ExamOption;
}

export interface ExamSession {
    session_id: string;
    expires_at: string;
    exam_area: string;
    questions: ExamQuestion[];
}

interface StartExamResult {
    data: ExamSession | null;
    error: string | null;
}

let dailyUsageCache: DailyUsage | null = null;
let sessionCache: ExamSession | null = null;

const calcRemaining = (expiresAt: string) =>
    Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));

export function useExam(): {
    isLoading: boolean;
    isUsageLoading: boolean;
    session: ExamSession | null;
    dailyUsage: DailyUsage | null;
    canQuickExam: boolean;
    timeRemaining: number;
    startExamSession: (params: StartExamParams) => Promise<StartExamResult>;
} {
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState<ExamSession | null>(sessionCache);
    const [dailyUsage, setDailyUsage] = useState<DailyUsage | null>(dailyUsageCache);
    const [isUsageLoading, setIsUsageLoading] = useState(dailyUsageCache === null);
    const [timeRemaining, setTimeRemaining] = useState<number>(() =>
        sessionCache?.expires_at ? calcRemaining(sessionCache.expires_at) : 0
    );

    useEffect(() => {
        if (!session?.expires_at) return;
        setTimeRemaining(calcRemaining(session.expires_at));
        const interval = setInterval(() => setTimeRemaining(calcRemaining(session.expires_at)), 1000);
        return () => clearInterval(interval);
    }, [session?.expires_at]);

    useEffect(() => {
        if (dailyUsageCache !== null) return;

        getDailyUsage().then(({ data }) => {
            const usage = data ?? null;
            dailyUsageCache = usage;
            setDailyUsage(usage);
        }).finally(() => {
            setIsUsageLoading(false);
        });
    }, []);

    const startExamSession = async (params: StartExamParams): Promise<StartExamResult> => {
        setIsLoading(true);
        const { data, error } = await startExam(params);
        setIsLoading(false);

        if (error || !data) return { data: null, error: error ?? 'Error al iniciar el examen' };

        sessionCache = data;
        setSession(data);
        return { data, error: null };
    };

    return {
        isLoading,
        isUsageLoading,
        session,
        dailyUsage,
        canQuickExam: canTakeQuickExam(dailyUsage),
        timeRemaining,
        startExamSession,
    };
}
