"use client"

import Image from "next/image";
import NavBarMovile from "@/components/NavBarMovile";
import NavBarDesktop from "@/components/NavBarDesktop";
import ExamSelector from "@/components/homepage/ExamSelector";
import AnnouncementBox from "@/components/Announcement_box";
import SyllabusAccordion from "@/components/analytics/SyllabusAccordion";
import MarginTop from "@/components/MarginTop";
import MarginBottom from "@/components/MarginBottom";
import ExamLivesBar from "@/components/homepage/ExamLivesBar";
import { useUserStore } from "@/store/userStore";

function HomePage() {
    const name = useUserStore((s) => s.name);
    const avatarUrl = useUserStore((s) => s.avatar_url);

    return (
        <div className="flex min-h-dvh flex-col items-center justify-start gap-3.5">
            <MarginTop />
            <NavBarDesktop />
            <section className="app-content-width relative flex items-center justify-between overflow-hidden rounded-[22px] border border-base-hard-alt/35 bg-[linear-gradient(135deg,#FFF9E4_0%,#F3E4BF_100%)] px-4 py-3.5 shadow-[0_8px_20px_rgba(71,46,24,0.10)] md:hidden">
                <div className="absolute -top-8 right-12 h-24 w-24 rounded-full bg-base-hard-alt/15" />
                <div className="absolute -bottom-10 left-20 h-20 w-20 rounded-full bg-white/35" />
                <div className="relative min-w-0 flex-1">
                    <p className="inline-flex rounded-full bg-base-hard-alt/20 px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-base-dark/75">Tu espacio de estudio</p>
                    <h1 className="mt-1.5 truncate text-xl font-extrabold tracking-tight text-base-dark">¡Hola, {name || 'estudiante'}!</h1>
                    <p className="mt-0.5 text-xs font-medium text-base-dark/65">Hoy es un buen día para practicar.</p>
                </div>
                <div className="relative ml-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] border border-base-hard-alt/50 bg-base-soft/85 shadow-[0_6px_14px_rgba(71,46,24,0.16)] min-[375px]:h-[68px] min-[375px]:w-[68px]">
                    <div className="absolute inset-1 rounded-[18px] border border-base-hard-alt/30" />
                    <Image
                        src={avatarUrl || "/assets/ecogo_avatar_04.png"}
                        alt="Avatar de Ecogo"
                        width={58}
                        height={58}
                        className="relative h-auto w-[85%] rounded-[18px] object-cover"
                    />
                </div>
            </section>
            {/* <AnnouncementBox
                title="¡Bienvenido!"
                content_text="Estamos muy felices de tenerte aquí. Prepárate para mejorar tus habilidades y alcanzar un lugar en la escuela que quires con nosotros."
                background="base"
                text_color="base-dark"
                can_close={true}
                image_url='https://fastly.picsum.photos/id/128/3823/2549.jpg?hmac=VbPyA2vESva2YdoXqll9REBcbQIskgv_c-D60C1s0xc'
            /> */}
            <ExamLivesBar />
            <ExamSelector />
            <div className="app-content-width hidden md:block bg-white rounded-box-standard shadow-lg p-10 pl-3.5 pr-3.5">
                <SyllabusAccordion />
            </div>
            <NavBarMovile />
            <MarginBottom />
        </div>
    );
}

export default HomePage;
