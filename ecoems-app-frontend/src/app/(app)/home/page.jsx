"use client"

import NavBarMovile from "@/components/NavBarMovile";
import NavBarDesktop from "@/components/NavBarDesktop";
import ExamSelector from "@/components/homepage/ExamSelector";
import AnnouncementBox from "@/components/Announcement_box";
import SyllabusAccordion from "@/components/analytics/SyllabusAccordion";
import MarginTop from "@/components/MarginTop";
import MarginBottom from "@/components/MarginBottom";
import ExamLivesBar from "@/components/homepage/ExamLivesBar";

function HomePage() {
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
            <ExamLivesBar />
            <ExamSelector />
            <div className="hidden md:block bg-white rounded-box-standard shadow-lg p-10 pl-3.5 pr-3.5 w-4/5">
                <SyllabusAccordion />
            </div>
            <NavBarMovile />
            <MarginBottom />
        </div>
    );
}

export default HomePage;
