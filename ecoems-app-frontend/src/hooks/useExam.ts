import { useState, useEffect } from 'react';
import { startExam, getDailyUsage } from '@/lib/api';
import { DailyUsage, canTakeQuickExam } from '@/utils/exam/examLogic';

export type ExamType = 'quick' | 'seguimiento' | 'simulacro' | 'diagnostic';

interface StartExamParams {
    exam_type: ExamType;
    subject_id?: number | null;
    topic_id?: number | null;
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
    questions: ExamQuestion[];
}

interface StartExamResult {
    data: ExamSession | null;
    error: string | null;
}

let dailyUsageCache: DailyUsage | null = null;

export function useExam(): {
    isLoading: boolean;
    isUsageLoading: boolean;
    session: ExamSession | null;
    dailyUsage: DailyUsage | null;
    canQuickExam: boolean;
    startExamSession: (params: StartExamParams) => Promise<StartExamResult>;
} {
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState<ExamSession | null>(null);
    const [dailyUsage, setDailyUsage] = useState<DailyUsage | null>(dailyUsageCache);
    const [isUsageLoading, setIsUsageLoading] = useState(dailyUsageCache === null);

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

        setSession(data);
        return { data, error: null };
    };

    return {
        isLoading,
        isUsageLoading,
        session,
        dailyUsage,
        canQuickExam: canTakeQuickExam(dailyUsage),
        startExamSession,
    };
}
