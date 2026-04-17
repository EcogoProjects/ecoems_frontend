"use client"
import { useState } from "react";
import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";
import ImageModal from "@/components/ImageModal";
import ExamOption from "@/components/exam/ExamOption";
import ExamExplanation from "@/components/exam/ExamExplanation";
import Timer from "@/components/Timer";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { reading_example } from "@/utils/questions_examples";
import { CaretLeftCircle, CaretRightCircle } from "@boxicons/react";
function ExamPage() {
    // Datos de ejemplo para pregunta
    const exam_type = 'Examen Rápido';
    const question_number = 1;
    /*
    const question_text = '¿Cuál es la capital de Francia?';
    const subject = 'Geografía';
    const answer_a = 'París';
    const answer_b = 'Londres';
    const answer_c = 'Roma';
    const answer_d = 'Berlín';
    */
    const question_text = '¿Cuáles de las siguientes disposiciones formaron parte de las Reformas Borbónicas, establecidas por el rey Carlos III a mediados del siglo XVIII?';
    const subject = 'Historia';
    const answer_a = 'La Encomienda, la abolición de la esclavitud y el Santo Oficio';
    const answer_b = 'El fomento de la minería, el cobro de impuestos al clero y la expulsión de los jesuitas';
    const answer_c = 'La abdicación de Fernando VII, la fundación de la Nueva España y el celibato';
    const answer_d = 'La Constitución de Cádiz, el pago del salario mínimo y el sistema de raya';
    const correct_answer = 'b';
    const answer_selected = 'c';
    const image_url = 'https://fastly.picsum.photos/id/128/3823/2549.jpg?hmac=VbPyA2vESva2YdoXqll9REBcbQIskgv_c-D60C1s0xc';
    const hint = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic blanditiis temporibus rerum a soluta. Laudantium, quis voluptatum, at earum deleniti eius distinctio reiciendis, tenetur officia vitae id sed nihil minima.';
    const explanation = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque. Doloribus, voluptate. Consequuntur, voluptate?';
    const reading = reading_example;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return ( 
        <>
        <div className={`flex flex-col min-h-screen justify-center items-center gap-5 ${isModalOpen ? 'blur-sm' : ''}
        pb-22 pt-10 md:pt-20`}>
            <NavBarDesktop/>
            {/*Contador */}
            <Timer 
            minutes={10}
            seconds={30}
            />
            {/*Contenedor superior */}
            <div className="flex bg-base-dark p-2 pl-4 pr-4 rounded-full min-w-4/5 text-white justify-between items-center gap-4 shadow-lg">
                <h2 className="text-[16px] font-bold tracking-wider">{exam_type}</h2>
                <div className="flex gap-3">
                    <div className="flex items-center justify-center gap-3 bg-base-hard p-2 rounded-full pl-5 pr-7 hover:cursor-pointer hover:opacity-70">
                        <span>
                            <FaSearch size={20}/>
                        </span>
                        <p className="tracking-wider font-semibold">Pista</p>
                    </div>
                    <div className="hidden md:flex items-center text-base">
                        <CaretLeftCircle width={40} height={40} pack="filled" className=" hover:cursor-pointer hover:opacity-70"/>
                        <CaretRightCircle width={40} height={40} pack="filled" className=" hover:cursor-pointer hover:opacity-70"/>
                        
                    </div>
                </div>
                
            </div>
            {/*Contenedor con bloques de examen */}
            <div className="flex flex-col gap-5 items-center md:grid md:grid-cols-3 md:max-w-4/5 md:min-h-[500px]">
                {/*Contenedor con pregunta y respuestas*/}
                <div className="bg-base max-w-4/5 p-3 pt-4 rounded-[18px] md:col-span-2 md:w-full md:max-w-full md:h-full shadow-lg">
                    {/* Indicador de Materia*/}    
                    <div className="w-full text-right font-bold opacity-70 tracking-widest">
                        <p>{subject}</p>
                    </div>
                    {/*Contendor de lectura adicional*/}
                    <p className="p-3 rounded-[18px] mb-2 font-semibold">{reading}</p>
                    {/* Contenedor con número de pregunta y texto de pregunta */}
                    <div className="flex items-center gap-4">
                        <div className="bg-base-dark text-white text-2xl w-[40px] h-[40px] text-center rounded-full p-1.5 shrink-0">
                            <p>{question_number}</p>
                        </div>
                        <p>{question_text}</p>
                    </div>
                    {/* Contenedor con opciones de respuesta */}
                    <div className="pl-2.5 mt-5 flex flex-col gap-2.5">
                        <ExamOption name="option" value={1} letter="a" text={answer_a} />
                        <ExamOption name="option" value={2} letter="b" text={answer_b} />
                        <ExamOption name="option" value={3} letter="c" text={answer_c} />
                        <ExamOption name="option" value={4} letter="d" text={answer_d} />
                    </div>
                    <div className="flex justify-end  mt-3 md:mt-1">
                        <button className="bg-base-dark text-white p-2 pl-4 pr-4 rounded-full hover:ring-2 hover:ring-white hover:opacity-60 cursor-pointer">
                            Contestar
                        </button>
                    </div>
                </div>
                {/*Contenedor derecho*/}
                <div className="w-4/5 flex flex-col gap-5 h-full md:col-span-1 md:w-full md:grid-rows-2">
                    {/*Contenedor con recursos de pregunta*/}
                    <div className="bg-base-hard rounded-[18px] p-3  flex flex-col justify-center items-top shadow-lg">
                        <div onClick={openModal} className="relative w-full aspect-video rounded-[18px] bg-white overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-base-hard-alt transition-all duration-200"> 
                            <Image 
                            src={image_url} 
                            alt="Question resource" 
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 700px"
                            className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="bg-base-soft rounded-[18px] p-3 shadow-lg">
                        <p className="opacity-55">Pista Utilizada</p>
                        <p className="opacity-55">{hint}</p>
                    </div>
                    {/*Contenedor de explicación */}
                    <ExamExplanation
                      correct_answer={correct_answer}
                      answer_selected={answer_selected}
                      explanation={explanation}
                      blur={true} // Puedes cambiar esto según necesites
                    />
                </div>
                
            </div>
            <NavBarMovile/>
        </div>
        {/* Ventana emergente*/}
        {isModalOpen && <ImageModal imageUrl={image_url} onClose={closeModal} />}
        </>
     );
}

export default ExamPage;