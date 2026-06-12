import { useState, useEffect } from 'react';
import { startExam, getSimulacroUsege , getCurrentSession, getDailyUsage } from '@/lib/api';
import { DailyUsage, SimulacroUsage, canTakeQuickExam, canTakeSimulacro } from '@/utils/exam/examLogic';

export type ExamType = 'quick' | 'seguimiento' | 'simulacro' | 'diagnostic';

interface StartExamParams {
    exam_type: ExamType;
    subtopic_id?: number | null;
    simulacro_exam?: number | null;
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

export interface SavedAnswer {
    question_id: number;
    selected_answer: string;
}

export interface ExamSession {
    session_id: string;
    exam_type?: string;
    expires_at: string;
    exam_area?: string;
    questions: ExamQuestion[];
    answers_saved?: SavedAnswer[];
}

interface StartExamResult {
    data: ExamSession | null;
    error: string | null;
    status?: number | null;
}

let dailyUsageCache: DailyUsage | null = null;
let simulacroUsageCache: SimulacroUsage | null = null; 
let sessionCache: ExamSession | null = null;

const calcRemaining = (expiresAt: string) =>
    Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));

export function useExam(): {
    isLoading: boolean;
    isUsageLoading: boolean;
    session: ExamSession | null;
    dailyUsage: DailyUsage | null;
    simulacroUsage: SimulacroUsage | null;
    canQuickExam: boolean;
    canSimulacro: boolean;
    timeRemaining: number;
    startExamSession: (params: StartExamParams) => Promise<StartExamResult>;
    continueCurrentSession: () => Promise<StartExamResult>;
} {
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState<ExamSession | null>(sessionCache);
    const [dailyUsage, setDailyUsage] = useState<DailyUsage | null>(dailyUsageCache);
    const [simulacroUsage, setSimulacroUsage] = useState <SimulacroUsage | null> (simulacroUsageCache);
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

    useEffect (() => {
        if (simulacroUsageCache !== null) return;

        getSimulacroUsege().then(({ data }) => {
            const usage = data ?? null; 
            simulacroUsageCache = usage; 
            setSimulacroUsage (usage); 
        }).finally(() => {
            setIsUsageLoading(false); 
        }); 
    }, []); 

    const startExamSession = async (params: StartExamParams): Promise<StartExamResult> => {
        setIsLoading(true);
        const { data, error, status } = await startExam(params);
        setIsLoading(false);

        if (error || !data) return { data: null, error: error ?? 'Error al iniciar el examen', status };

        // El response de POST /exams/start puede no incluir exam_type; se conserva el solicitado
        const sessionData = { exam_type: params.exam_type, ...data };
        sessionCache = sessionData;
        setSession(sessionData);
        return { data: sessionData, error: null, status };
    };

    const continueCurrentSession = async (): Promise<StartExamResult> => {
        setIsLoading(true);
        const { data, error, status } = await getCurrentSession();
        setIsLoading(false);

        if (error || !data) return { data: null, error: error ?? 'Error al continuar el examen', status };

        sessionCache = data;
        setSession(data);
        return { data, error: null, status };
    };

    return {
        isLoading,
        isUsageLoading,
        session,
        dailyUsage,
        simulacroUsage,
        canQuickExam: canTakeQuickExam(dailyUsage),
        canSimulacro: canTakeSimulacro(simulacroUsage),
        timeRemaining,
        startExamSession,
        continueCurrentSession,
    };
}
