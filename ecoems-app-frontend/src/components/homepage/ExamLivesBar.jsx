'use client'
import { PiPawPrintFill, PiInfinityBold } from 'react-icons/pi';
import { FaHeart } from 'react-icons/fa';
import { useExam } from '@/hooks/useExam';

function LivesCard({ title, subtitle, remaining, used, isLoading, unavailable, hideCountWhenUnlimited }) {
    const total = remaining + used;
    const isUnlimited = remaining === 999;

    return (
        <div className="bg-base-dark rounded-box-standard shadow-lg px-3 py-3 sm:px-4 sm:py-4 flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex min-w-0 items-center gap-2 flex-1 sm:gap-3">
                <div className="bg-base-hard-alt/20 shrink-0 rounded-xl p-2">
                    <FaHeart size={20} className="text-base-hard-alt" />
                </div>
                <div className="min-w-0">
                    <p className="text-base-soft font-extrabold text-xs sm:text-sm tracking-wide">{title}</p>
                    <p className="text-base-soft/50 text-xs">{subtitle}</p>
                </div>
            </div>

            {!isLoading && unavailable ? (
                <span role="status" className="max-w-28 text-base-soft/70 text-xs text-right">
                    No se pudo consultar. Recarga la página.
                </span>
            ) : !isLoading ? (
                <div className="flex shrink-0 flex-col-reverse items-end gap-1 sm:flex-row sm:items-center sm:gap-2.5">
                    <div className="flex items-center gap-0.5 sm:gap-1.5">
                        {isUnlimited ? (
                            <PiInfinityBold size={20} className="text-base-hard-alt" />
                        ) : (
                            <>
                                {Array.from({ length: remaining }).map((_, i) => (
                                    <PiPawPrintFill key={`r-${i}`} size={18} className="text-base-hard-alt" />
                                ))}
                                {Array.from({ length: used }).map((_, i) => (
                                    <PiPawPrintFill key={`u-${i}`} size={18} className="text-base-soft/20" />
                                ))}
                            </>
                        )}
                    </div>
                    {!(isUnlimited && hideCountWhenUnlimited) && (
                        <span className="text-base-soft font-extrabold text-lg min-w-[36px] text-right">
                            {remaining}/{total}
                        </span>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-1.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="w-[18px] h-[18px] rounded-full bg-base-soft/10 animate-pulse" />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ExamLivesBar() {
    const { dailyUsage, isDailyUsageLoading, simulacroUsage, isSimulacroUsageLoading } = useExam();

    const dailyRemaining = dailyUsage?.quick_exams_remaining ?? 0;
    const dailyUsed = dailyUsage?.quick_exams_count ?? 0;
    const simulacroRemaining = simulacroUsage?.simulacro_remaining ?? 0; 
    const simulacroUsed = simulacroUsage?.simulacro_count ?? 0; 
    return (
        <div className="app-content-width grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <LivesCard
                title="Exámenes rápidos"
                subtitle="Intentos disponibles hoy"
                remaining={dailyRemaining}
                used={dailyUsed}
                isLoading={isDailyUsageLoading}
                unavailable={!dailyUsage}
                hideCountWhenUnlimited
            />
            <LivesCard
                title="Exámenes simulacro"
                subtitle="Pruebas disponibles"
                remaining={simulacroRemaining}
                used={simulacroUsed}
                isLoading={isSimulacroUsageLoading}
                unavailable={!simulacroUsage}
            />
        </div>
    );
}
