import { FaBookReader } from "react-icons/fa";
import { TfiAgenda } from "react-icons/tfi";
import ExamTypeButton from "@/components/exam/ExamTypeButton";

function ExamSelector() {
    return (
        <>
            <div className="shadow-lg bg-base-dark rounded-box-standard shadow-lg w-4/5 text-base
             flex justify-center md:hidden">
                <div className=" flex flex-col  p-10 pl-3.5 pr-3.5 gap-5 max-w-[400px]">
                    <h2 className="font-extrabold tracking-wide text-xl text-center">Realizar Examén</h2>
                    <p className="opacity-60 text-center  mb-1.5">Elige el tipo de evaluación para comenzar</p>
                    {/*Contenedor con tipos de examén*/}
                    <div className="text-white grid grid-cols-2 gap-2 tracking-wide md:flex-row justify-center">
                        <ExamTypeButton type="rapido" title="Examen Rápido" icon="speed" />
                        <ExamTypeButton type="seguimiento" title="Examen de seguimiento" icon="calendar" />
                        <ExamTypeButton type="libre" title="Examen Libre" icon="unlock" />
                        <div className="bg-base-dark rounded-[15px] p-1.5 font-semibold flex items-center justify-center opacity-70">
                            <h3 className="text-center">Próximamente</h3>
                        </div>
                    </div>
                    <div className="bg-base-hard-alt p-1.5 rounded-[15px] text-base-dark flex flex-col items-center cursor-pointer
                            transition-all duration-200 hover:opacity-70 ">
                        <h3 className="font-semibold text-xl">Examen Simulacro</h3>
                        <div className="flex items-center justify-center w-10 h-10">
                                <FaBookReader size={30}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex bg-base-dark rounded-box-standard shadow-lg w-4/5 text-white flex-col p-4 gap-5">
                <div className="flex justify-between text-base">
                    <div className="flex gap-2.5 items-center">
                        <div className="p-1.5 border-2 w-fit h-fit rounded-[10px] text-base-hard-alt">
                        <TfiAgenda size={20}/>
                        </div>
                        <div className="flex flex-col items-start">
                            <h2 className="font-extrabold tracking-wide text-xl text-center">Realizar Examén</h2>
                            <p className="opacity-60">Elige el tipo de evaluación para comenzar</p>
                        </div>
                    </div>
                    <div className="flex gap-4 rounded-[15px] justify-start items-center p-2 pl-4 w-[300px]
                        border-base-hard-alt cursor-pointer hover:opacity-70 bg-base-hard-alt">
                            <div className="p-1.5 bg-base-hard-alt w-fit h-fit rounded-[10px] text-base-dark">
                                <FaBookReader size={30}/>
                            </div>
                            <div className="flex flex-col text-base-dark">
                                <h3 className="font-semibold">Examen Simulacro</h3>
                                <p className="opacity-60">Similar al oficial.</p>
                            </div>
                        </div>
                </div>
                <div className="flex gap-2.5">
                    <ExamTypeButton type="rapido" title="Examen Rápido" icon="speed" description="Realiza un examen de un solo subtema." />
                    <ExamTypeButton type="seguimiento" title="Examen de seguimiento" icon="calendar" description="Evalúa tu avance por materia."/>
                    <ExamTypeButton type="libre" title="Examen Libre" icon="unlock" description="Tomas tu la elección." />
                </div>
            </div>
        </>
    );
}

export default ExamSelector;