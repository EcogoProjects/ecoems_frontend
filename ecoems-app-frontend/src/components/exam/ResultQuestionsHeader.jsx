import Link from "next/link";

export default function ResultQuestionsHeader({ completedAt, duration }) {
    return (
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-normal text-base-dark md:text-3xl">
                    Resultados del examen
                </h1>
                <p className="mt-1.5 text-sm text-base-dark/65">
                    Completado el {completedAt} <span className="mx-1.5">·</span> {duration}
                </p>
            </div>

            <Link
                href="/home"
                className="inline-flex w-fit items-center justify-center rounded-full bg-base-dark px-5 py-2.5 text-sm font-medium text-base-soft transition-colors hover:bg-[#5a3a1f]"
            >
                Continuar
            </Link>
        </header>
    );
}
