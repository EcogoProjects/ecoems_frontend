'use client'

import { useState } from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import TransferModal from "../shared/TransferModal";

interface Feature {
    text: React.ReactNode;
    included: boolean;
}

const PLAN_FEATURES: Record<string, Feature[]> = {
    smart: [
        { text: <>Acceso a exámenes rápidos <strong>(3 por día)</strong>.</>, included: true },
        { text: <>Acceso a exámenes de seguimiento <strong>(1 por semana)</strong>.</>, included: true },
        { text: <>5 pistas por día.</>, included: true },
        { text: <>Acceso a  un examen simulacro.</>, included: true },
        { text: <>Sin explicaciones.</>, included: false },
        //{ text: <>Sin acceso a los exámenes personalizados.</>, included: false },
        //{ text: <>No es posible repetir exámenes anteriores.</>, included: false },
    ],
    pro: [
        { text: <>Acceso a exámenes rápidos <strong>(Ilímitados)</strong>.</>, included: true },
        { text: <>Acceso a exámenes de seguimiento <strong>(Ilímitados)</strong>.</>, included: true },
        { text: <>Pistas <strong>ilimitadas</strong>.</>, included: true },
        { text: <>Explicaciones <strong>ilimitadas</strong>.</>, included: true },
        { text: <>Acceso a  3 exámenes simulacro</>, included: true },
        //{ text: <>Acceso a los exámenes personalizados.</>, included: true },
        //{ text: <>Es posible repetir exámenes anteriores.</>, included: true },
    ]
};

const ecogoProPrice = 299;


function PlansTable() {
    const [transferModalOpen, setTransferModalOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row gap-8 md:items-start bg-[#EEE7DD] p-8 md:p-10 px-6 rounded-3xl shadow-2xl text-[#3D281F] w-full max-w-4xl mx-auto justify-center">
            {/* Plan Ecogo Smart */}
            <div className="flex flex-col items-center gap-4 flex-1 w-full md:pr-4">
                <h2 className="bg-[#3D281F] text-white text-center text-2xl rounded-lg p-2 pl-4 pr-4 w-full font-semibold">
                    Plan Ecogo Smart
                </h2>
                <p className="text-sm opacity-90">Plan básico para estudiantes</p>
                <div className="flex items-end gap-1 font-semibold">
                    <p className="text-3xl ">$0</p>
                    <p className="text-sm">mx / periodo</p>
                </div>
                <a
                    href="https://app.ecogo.mx/login"
                    className="bg-[#3D281F] text-white rounded-full py-3 px-8 cursor-pointer font-semibold shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-[#3D281F]/30 transition-all duration-300"
                >
                    ¡Comienza ya!
                </a>
                <ul className="text-[#3D281F] w-fit space-y-3 mt-2">
                    {PLAN_FEATURES.smart.map((feature, index) => (
                        <li key={index} className="flex items-center justify-start gap-2 text-left">
                            {feature.included ? (
                                <IoIosCheckmarkCircle size={20} className="shrink-0" />
                            ) : (
                                <IoIosCloseCircle size={20} color="#b33e36" className="shrink-0" />
                            )}
                            <p>{feature.text}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Plan Ecogo Pro */}
            <div className="flex flex-col items-center gap-4 flex-1 w-full border-t-2 border-[#3D281F]/15 pt-6 md:pt-0 md:border-t-0 md:border-l-2 md:pl-8">
                <h2 className="bg-[#3D281F] text-white text-center text-2xl rounded-lg p-2 pl-4 pr-4 w-full font-semibold">
                    Plan Ecogo Pro
                </h2>
                <p className="text-sm opacity-90">Plan ilimitado para estudiantes</p>
                <div className="flex items-end gap-1 font-semibold">
                    <p className="text-3xl ">${ecogoProPrice}</p>
                    <p className="text-sm">mx / periodo</p>
                </div>
                <button
                    onClick={() => setTransferModalOpen(true)}
                    className="bg-[#3D281F] text-white rounded-full py-3 px-8 cursor-pointer font-semibold shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-[#3D281F]/30 transition-all duration-300"
                >
                    ¡Obtener ahora!
                </button>
                <ul className="text-[#3D281F] w-fit space-y-3 mt-2">
                    {PLAN_FEATURES.pro.map((feature, index) => (
                        <li key={index} className="flex items-center justify-start gap-2 text-left">
                            {feature.included ? (
                                <IoIosCheckmarkCircle size={20} className="shrink-0" />
                            ) : (
                                <IoIosCloseCircle size={20} color="#b33e36" className="shrink-0" />
                            )}
                            <p>{feature.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {transferModalOpen && <TransferModal onClose={() => setTransferModalOpen(false)} />}
        </div>
    );
}

export default PlansTable;