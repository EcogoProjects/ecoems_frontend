"use client"

import { clearExamResult } from "@/hooks/useExamResult";

export default function ResultQuestionsHeader() {
    const handleContinue = () => {
        clearExamResult();
        // Navegación real (no SPA): reinicia los cachés de módulo (dailyUsageCache,
        // simulacroUsageCache) para que /home recargue las vidas actualizadas
        window.location.replace("/home");
    };

    return (
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-normal text-base-dark md:text-3xl">
                    Resultados del examen
                </h1>
            </div>

            <button
                type="button"
                onClick={handleContinue}
                className="inline-flex w-fit items-center justify-center rounded-full bg-base-dark px-5 py-2.5 text-sm font-medium text-base-soft transition-colors hover:bg-[#5a3a1f] cursor-pointer"
            >
                Continuar
            </button>
        </header>
    );
}
