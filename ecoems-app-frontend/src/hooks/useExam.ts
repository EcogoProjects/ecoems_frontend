import { useState, useEffect } from 'react';
import { startExam, getSimulacroUsege , getCurrentSession, getDailyUsage } from '@/lib/api';
import { type DailyUsage, type SimulacroUsage, canTakeQuickExam, canTakeSimulacro } from '@/utils/exam/examLogic';

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

let sessionCache: ExamSession | null = null;

const calcRemaining = (expiresAt: string) =>
    Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));

export function useExam(): {
    isLoading: boolean;
    isUsageLoading: boolean;
    isDailyUsageLoading: boolean;
    isSimulacroUsageLoading: boolean;
    session: ExamSession | null;
    dailyUsage: DailyUsage | null;
    simulacroUsage: SimulacroUsage | null;
    canQuickExam: boolean;
    canSimulacro: boolean;
    timeRemaining: number;
    startExamSession: (params: StartExamParams) => Promise<StartExamResult>;
    continueCurrentSession: (exam_type?: ExamType) => Promise<StartExamResult>;
} {
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState<ExamSession | null>(sessionCache);
    const [dailyUsage, setDailyUsage] = useState<DailyUsage | null>(null);
    const [simulacroUsage, setSimulacroUsage] = useState<SimulacroUsage | null>(null);
    const [isDailyUsageLoading, setIsDailyUsageLoading] = useState(true);
    const [isSimulacroUsageLoading, setIsSimulacroUsageLoading] = useState(true);
    const isUsageLoading = isDailyUsageLoading || isSimulacroUsageLoading;
    const [timeRemaining, setTimeRemaining] = useState<number>(() =>
        sessionCache?.expires_at ? calcRemaining(sessionCache.expires_at) : 0
    );

    useEffect(() => {
        if (!session?.expires_at) return;
        const interval = setInterval(() => setTimeRemaining(calcRemaining(session.expires_at)), 1000);
        return () => clearInterval(interval);
    }, [session?.expires_at]);

    useEffect(() => {
        let active = true;
        getDailyUsage().then(({ data }) => {
            if (active) setDailyUsage(data ?? null);
        }).catch(() => {
            if (active) setDailyUsage(null);
        }).finally(() => {
            if (active) setIsDailyUsageLoading(false);
        });
        return () => { active = false; };
    }, []);

    useEffect (() => {
        let active = true;
        getSimulacroUsege().then(({ data }) => {
            if (active) setSimulacroUsage(data ?? null);
        }).catch(() => {
            if (active) setSimulacroUsage(null);
        }).finally(() => {
            if (active) setIsSimulacroUsageLoading(false);
        }); 
        return () => { active = false; };
    }, []); 

    const startExamSession = async (params: StartExamParams): Promise<StartExamResult> => {
        setIsLoading(true);
        const { data, error, status } = await startExam(params);
        setIsLoading(false);

        if (error || !data) return { data: null, error: error ?? 'Error al iniciar el examen', status };

        // El response de POST /exams/start puede no incluir exam_type; se conserva el solicitado
        const sessionData = { exam_type: params.exam_type, ...data };
        sessionCache = sessionData;
        setTimeRemaining(calcRemaining(sessionData.expires_at));
        setSession(sessionData);
        return { data: sessionData, error: null, status };
    };

    const continueCurrentSession = async (exam_type?: ExamType): Promise<StartExamResult> => {
        setIsLoading(true);
        const { data, error, status } = await getCurrentSession(exam_type);
        setIsLoading(false);

        if (error || !data) return { data: null, error: error ?? 'Error al continuar el examen', status };

        // GET /exams/active puede no devolver exam_type; se conserva el tipo solicitado
        // para que isSimulacro (y la UI dependiente: botón Ayuda, etc.) sea consistente
        // con el flujo de inicio desde cero.
        const sessionData = exam_type ? { ...data, exam_type } : data;
        sessionCache = sessionData;
        setTimeRemaining(calcRemaining(sessionData.expires_at));
        setSession(sessionData);
        return { data: sessionData, error: null, status };
    };

    return {
        isLoading,
        isUsageLoading,
        isDailyUsageLoading,
        isSimulacroUsageLoading,
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
