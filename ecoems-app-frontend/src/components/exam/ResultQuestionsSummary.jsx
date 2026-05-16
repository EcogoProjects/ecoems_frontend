export default function ResultQuestionsSummary({ summary }) {
    const scorePercent = Math.max(0, Math.min(100, (summary.score / summary.maxScore) * 100));

    return (
        <section className="grid gap-5 lg:grid-cols-[220px_1fr]">
            <article className="relative flex items-center gap-7 overflow-hidden rounded-box-standard border border-base-dark/10 bg-base-hard px-7 py-6 text-center shadow-[0_12px_28px_-10px_rgba(71,46,24,.18)] lg:flex-col lg:justify-center lg:px-5">
                {/* <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-base-soft/20" />
                <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-base-dark/10" /> */}

                <span className="relative z-10 text-[11px] font-semibold uppercase tracking-[0.1em] text-base-dark/65">
                    Calificación
                </span>

                <div
                    className="relative z-10 flex h-[130px] w-[130px] shrink-0 items-center justify-center rounded-full"
                    style={{
                        background: `conic-gradient(from -90deg, var(--base-dark-color) ${scorePercent}%, rgba(71, 69, 24, 0.18) 0)`,
                    }}
                >
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-base-hard leading-none">
                        <span className="text-3xl font-bold tracking-normal text-base-dark">{summary.score}</span>
                        <span className="mt-1 text-xs font-medium text-base-dark/60">/ {summary.maxScore}</span>
                    </div>
                </div>

                {/* <span className="relative z-10 text-sm font-medium text-base-dark/80">{summary.verdict}</span> */}
            </article>

            <div className="grid gap-3.5 sm:grid-cols-3">
                <StatCard
                    label="Correctas"
                    value={summary.correct}
                    unit="preg."
                    sub={`de ${summary.totalQuestions} preguntas`}
                    valueClassName="text-[#2c7a4a]"
                />
                <StatCard
                    label="Incorrectas"
                    value={summary.incorrect}
                    unit="preg."
                    sub={`de ${summary.totalQuestions} preguntas`}
                    valueClassName="text-[#a83030]"
                />
                <StatCard
                    label="Parciales"
                    value={summary.partial}
                    unit="preg."
                    sub={`de ${summary.totalQuestions} preguntas`}
                />

                <article className="rounded-box-standard border border-base-dark/10 bg-base-soft p-5 shadow-[0_2px_8px_rgba(71,46,24,.06)] sm:col-span-3">
                    <div className="grid gap-4 sm:grid-cols-2 sm:items-center">
                        <div>
                            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-base-dark/60">
                                Tiempo total
                            </p>
                            <p className="text-[22px] font-bold leading-none tracking-normal text-base-dark">
                                {summary.totalTime}
                            </p>
                        </div>
                        <div className="sm:text-right">
                            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-base-dark/60">
                                Promedio por pregunta
                            </p>
                            <p className="text-[22px] font-bold leading-none tracking-normal text-base-dark">
                                {summary.averageTime}
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}

function StatCard({ label, value, unit, sub, valueClassName = "text-base-dark" }) {
    return (
        <article className="rounded-box-standard border border-base-dark/10 bg-base-soft p-5 shadow-[0_2px_8px_rgba(71,46,24,.06)]">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-base-dark/60">{label}</p>
            <p className={`text-[28px] font-bold leading-none tracking-normal ${valueClassName}`}>
                {value}
                <span className="ml-1 text-sm font-normal text-base-dark/55">{unit}</span>
            </p>
            <p className="mt-1.5 text-xs text-base-dark/55">{sub}</p>
        </article>
    );
}
