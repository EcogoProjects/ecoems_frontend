import NavBarMovile from "@/components/NavBarMovile";
import NavBarDesktop from "@/components/NavBarDesktop";
import ExamSelector from "@/components/homepage/ExamSelector";
import AnnouncementBox from "@/components/Announcement_box";
import CircleAvgIndicator from "@/components/analytics/CircleAvgIndicator";
import TopicAccordion from "@/components/analytics/TopicAccordion";
import { ecoems_program } from "@/utils/ecoems_program";
import MarginTop from "@/components/MarginTop";
import MarginBottom from "@/components/MarginBottom";

function HomePage() {
    const avg_value = 73;
    return ( 
    <div className="flex flex-col min-h-screen justify-center items-center gap-3.5">
        <MarginTop/>
        <NavBarDesktop/>
        <AnnouncementBox
            title="¡Bienvenido!"
            content_text="Estamos muy felices de tenerte aquí. Prepárate para mejorar tus habilidades y alcanzar un lugar en la escuela que quires con nosotros."
            background="base"
            text_color="base-dark"
            can_close={true}
            image_url = 'https://fastly.picsum.photos/id/128/3823/2549.jpg?hmac=VbPyA2vESva2YdoXqll9REBcbQIskgv_c-D60C1s0xc'
        />
        <ExamSelector/>
        <div className="md:grid md:grid-cols-3 w-4/5 md:gap-4">
            {/*Contenedor izquierdo grid */}
            <div className="hidden md:block bg-white rounded-box-standard shadow-lg p-10 pl-3.5 pr-3.5
            md:col-span-2 md:w-full md:grid-rows-2">
                <TopicAccordion topics={ecoems_program}/>
            </div>
            {/*Contenedor derecho grid */}
            <div className="flex flex-col w-full md:col-span-1 items-center gap-2">
                <div className="bg-white flex flex-col justify-center items-center rounded-box-standard shadow-lg p-10 pl-3.5 pr-3.5 w-full gap-1.5">
                    <h2 className="text-xl font-bold text-base-dark">Progreso General</h2>
                    <CircleAvgIndicator value={avg_value} background="--base-hard-alt-color" label={"Respuestas correctas"}/>
                </div>
                <div className="bg-white flex flex-col justify-center items-center rounded-box-standard shadow-lg p-10 pl-3.5 pr-3.5 w-full gap-1.5 h-[100px]">

                </div>
            </div>
        </div>
        <NavBarMovile/>
        <MarginBottom/>
    </div>
    );
}

export default HomePage;