export interface DailyUsage {
    usage_date: string;
    quick_exams_count: number;
    hints_used_count: number;
    quick_exams_remaining: number;
    hints_remaining: number;
}

export interface SimulacroUsage {
    simulacro_count: number; 
    simulacro_remaining:number; 
}

export function canTakeQuickExam(usage: DailyUsage | null): boolean {
    if (!usage) return false;
    return usage.quick_exams_remaining > 0;
}

export function canTakeSimulacro(usage: SimulacroUsage | null): boolean {
    if (!usage) return false;
    return usage.simulacro_remaining > 0;
}
