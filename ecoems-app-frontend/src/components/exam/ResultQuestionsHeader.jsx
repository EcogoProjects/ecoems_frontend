"use client"

import { useRouter } from "next/navigation";
import { clearExamResult } from "@/hooks/useExamResult";

export default function ResultQuestionsHeader() {
    const router = useRouter();

    const handleContinue = () => {
        clearExamResult();
        router.replace("/home");
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
                className="inline-flex w-fit items-center justify-center rounded-full bg-base-dark px-5 py-2.5 text-sm font-medium text-base-soft transition-colors hover:bg-[#5a3a1f]"
            >
                Continuar
            </button>
        </header>
    );
}
