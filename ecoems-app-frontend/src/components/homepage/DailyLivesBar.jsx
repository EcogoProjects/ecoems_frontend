'use client'
import { PiPawPrintFill } from 'react-icons/pi';
import { FaHeart } from 'react-icons/fa';
import { useExam } from '@/hooks/useExam';

export default function DailyLivesBar() {
    const { dailyUsage, isUsageLoading } = useExam();

    const remaining = dailyUsage?.quick_exams_remaining ?? 0;
    const used = dailyUsage?.quick_exams_count ?? 0;
    const total = remaining + used;

    return (
        <div className="bg-base-dark rounded-box-standard shadow-lg w-4/5 px-5 py-4 flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
                <div className="bg-base-hard-alt/20 rounded-xl p-2">
                    <FaHeart size={20} className="text-base-hard-alt" />
                </div>
                <div>
                    <p className="text-base-soft font-extrabold text-sm tracking-wide">Exámenes rápidos</p>
                    <p className="text-base-soft/50 text-xs">Intentos disponibles hoy</p>
                </div>
            </div>

            {!isUsageLoading && dailyUsage ? (
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                        {Array.from({ length: remaining }).map((_, i) => (
                            <PiPawPrintFill key={`r-${i}`} size={18} className="text-base-hard-alt" />
                        ))}
                        {Array.from({ length: used }).map((_, i) => (
                            <PiPawPrintFill key={`u-${i}`} size={18} className="text-base-soft/20" />
                        ))}
                    </div>
                    <span className="text-base-soft font-extrabold text-lg min-w-[36px] text-right">
                        {remaining}/{total}
                    </span>
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
