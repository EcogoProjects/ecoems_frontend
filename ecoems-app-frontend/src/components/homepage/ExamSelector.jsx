import { FaBookReader } from "react-icons/fa";
import ExamTypeButton from "@/components/exam/ExamTypeButton";

function ExamSelector() {
    return (
        <div className=" flex flex-col rounded-box-standard bg-base-hard p-10 pl-3.5 pr-3.5 gap-5 shadow ">
            <h2 className="font-extrabold tracking-wide text-xl text-center mb-1.5">Realizar Examén</h2>
            {/*Contenedor con tipos de examén*/}
            <div className="text-white grid grid-cols-2 gap-2 tracking-wide md:flex-row justify-center">
                <ExamTypeButton type="rapido" title="Examén Rápido" icon="speed" />
                <ExamTypeButton type="seguimiento" title="Examén de seguimiento" icon="calendar" />
                <ExamTypeButton type="libre" title="Examén Libre" icon="unlock" />
                <div className="bg-base-dark rounded-[15px] p-1.5 font-semibold flex items-center justify-center opacity-70">
                    <h3 className="text-center">Próximamente</h3>
                </div>
            </div>
            <div className="bg-base-dark p-1.5 rounded-[15px] text-white flex flex-col items-center
                    transition-all duration-200 hover:bg-base-hard-alt hover:text-base-dark hover:ring-1  hover:shadow-lg">
                <h3 className="font-semibold text-xl">Examén Simulacro</h3>
                <div className="flex items-center justify-center w-10 h-10">
                        <FaBookReader size={30}/>
                </div>
            </div>
        </div>
    );
}

export default ExamSelector;