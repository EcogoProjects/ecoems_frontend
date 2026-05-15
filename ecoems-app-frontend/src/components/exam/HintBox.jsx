"use client"

import Image from "next/image";
import { IoAlertCircle } from "react-icons/io5";
import { FaLightbulb, FaBookOpen } from "react-icons/fa6";

const HintBox = ({ onShowHint, onShowExplanation, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                onClick={onClose}
            />

            <div className="relative bg-white p-8 pt-10 rounded-[28px] shadow-2xl flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300 max-w-lg w-full">
                <div>
                    <Image
                        src="/assets/ecogo_hint.png"
                        alt="ecogo hint"
                        width={100}
                        height={180}
                        className="object-contain drop-shadow-md grayscale"
                    />
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-4 text-3xl font-bold text-gray-400 hover:text-base-dark transition-colors"
                    aria-label="Cerrar modal"
                >
                    ×
                </button>

                <h3 className="text-xl font-bold text-base-dark tracking-tight text-center">
                    ¿Necesitas ayuda con esta pregunta?
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                        onClick={onShowHint}
                        className="flex items-center justify-center gap-3 bg-base-hard text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-md"
                    >
                        <FaLightbulb size={20} />
                        Mostrar Pista
                    </button>
                    <button
                        onClick={onShowExplanation}
                        className="flex items-center justify-center gap-3 bg-base-dark text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-md"
                    >
                        <FaBookOpen size={20} />
                        Ver Explicación
                    </button>
                </div>
                <div className="flex items-center text-gray-400">
                    <span><IoAlertCircle /></span>
                    <p className="text-sm  italic text-center  ">
                        Si eliges ver la explicación, se tomará tu respuesta como <strong>incorrecta.</strong>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default HintBox;
