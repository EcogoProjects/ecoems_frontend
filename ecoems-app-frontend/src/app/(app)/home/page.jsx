"use client"

import Link from "next/link";
import NavBarMovile from "@/components/NavBarMovile";
import NavBarDesktop from "@/components/NavBarDesktop";
import ExamSelector from "@/components/homepage/ExamSelector";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import SyllabusAccordion from "@/components/analytics/SyllabusAccordion";
import MarginTop from "@/components/MarginTop";
import MarginBottom from "@/components/MarginBottom";
import DailyLivesBar from "@/components/homepage/DailyLivesBar";

function HomePage() {
    const value = 80;
    const top_subjects_scores = [
        { subject: "Matemáticas", score: 85 },
        { subject: "Ciencias", score: 78 },
        { subject: "Historia", score: 72 }
    ];
    const last_subjects_scores = [
        { subject: "Literatura", score: 55 },
        { subject: "Geografía", score: 48 },
        { subject: "Arte", score: 40 }
    ];
    return (
        <div className="flex flex-col min-h-screen justify-center items-center gap-3.5">
            <MarginTop />
            <NavBarDesktop />
            {/* <AnnouncementBox
                title="¡Bienvenido!"
                content_text="Estamos muy felices de tenerte aquí. Prepárate para mejorar tus habilidades y alcanzar un lugar en la escuela que quires con nosotros."
                background="base"
                text_color="base-dark"
                can_close={true}
                image_url='https://fastly.picsum.photos/id/128/3823/2549.jpg?hmac=VbPyA2vESva2YdoXqll9REBcbQIskgv_c-D60C1s0xc'
            /> */}
            <DailyLivesBar />
            <ExamSelector />
            <div className="md:grid md:grid-cols-3 w-4/5 md:gap-4">
                {/* Contenedor izquierdo grid */}
                <div className="hidden md:block bg-white rounded-box-standard shadow-lg p-10 pl-3.5 pr-3.5
                md:col-span-2 md:w-full md:grid-rows-2">
                    <SyllabusAccordion />
                </div>
                {/* Contenedor derecho grid */}
                <div className="flex flex-col w-full md:col-span-1 items-center gap-2">
                    <DashboardSummary
                        value={value}
                        topSubjectsScores={top_subjects_scores}
                        lastSubjectsScores={last_subjects_scores}
                        subjectsLayout="stacked"
                        containerWidth="w-full"
                        summaryLayout="stacked"
                    />
                    <Link
                        href="/analytics"
                        className="w-full bg-base-dark text-base rounded-box-standard p-3 text-center font-bold shadow-lg transition-opacity hover:opacity-90"
                    >
                        Ver dashboard completo
                    </Link>
                </div>
            </div>
            <NavBarMovile />
            <MarginBottom />
        </div>
    );
}

export default HomePage;
