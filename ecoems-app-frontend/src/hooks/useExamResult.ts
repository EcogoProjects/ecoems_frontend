interface ExamResultOption {
    a: string;
    b: string;
    c: string;
    d: string;
}

export interface ExamResultBreakdownItem {
    question_id: number;
    question_text: string;
    image_url: string | null;
    content_readings: string | null;
    options: ExamResultOption;
    selected_answer: string | null;
    correct_answer: string;
    is_correct: boolean;
    score: number;
    explanation: string;
}

export interface ExamResultData {
    score: string | number;
    total_questions: number;
    correct_count: number;
    incorrect_count: number;
    skipped_count: number;
    used_hints: number;
    used_explanations: number;
    time_used_seconds: number;
    breakdown: ExamResultBreakdownItem[];
}

export interface ExamResultState {
    result: ExamResultData;
    message: string;
    session_id: string;
    finished_at: string;
}

let examResultCache: ExamResultState | null = null;

export function setExamResult(result: ExamResultState) {
    examResultCache = result;
}

export function getExamResult() {
    return examResultCache;
}

export function clearExamResult() {
    examResultCache = null;
}
