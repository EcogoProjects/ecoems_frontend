import { IoIosCheckmarkCircle,IoIosCloseCircle  } from "react-icons/io";
function PlansPage() {
    return ( 
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="flex flex-col md:flex-row gap-5 md:items-start">
                <div className="flex flex-col items-center gap-4">
                    <h2 className="bg-base-dark text-white text-center text-2xl rounded-lg p-2 pl-4 pr-4 w-full">
                        Plan Ecogo Smart
                        </h2>
                    <p>Plan básico para estudiantes</p>
                    <div className="flex items-end gap-1">
                        <p className="text-3xl font-semibold">$0</p>
                        <p className="text-sm">/mes</p>
                    </div>
                    <button className="bg-base-dark text-white rounded-full p-3 pr-6 pl-6 cursor-pointer">
                        ¡Comienza ya!
                    </button>
                    <ul>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>Acceso a exámenes rápidos <strong>(3 por día)</strong>.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>Acceso a exámenes de seguimiento <strong>(1 por semana)</strong>.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>5 pistas por día.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>10 explicaciones por día.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>Acceso a  un examen simulacro.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCloseCircle size={20} color="#b33e36"/><p>Sin acceso a los exámenes personalizados.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCloseCircle size={20} color="#b33e36"/><p>No es posible repetir exámenes anteriores.</p>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col items-center gap-4 md:border-l-2 pt-2.5 md:pt-0 md:pl-4.5">
                    <h2 className="bg-base-dark text-white text-center text-2xl rounded-lg p-2 pl-4 pr-4 w-full">
                        Plan Ecogo Pro
                        </h2>
                    <p>Plan básico para estudiantes</p>
                    <div className="flex items-end gap-1">
                        <p className="text-3xl font-semibold">$199</p>
                        <p className="text-sm">mx/mes</p>
                    </div>
                    <button className="bg-base-dark text-white rounded-full p-3 pr-6 pl-6 cursor-pointer">
                        ¡Obtener ahora!
                    </button>
                    <ul>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>Acceso a exámenes rápidos <strong>(Ilímitados)</strong>.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>Acceso a exámenes de seguimiento <strong>(Ilímitados)</strong>.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>Pistas ilimitadas.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>Explicaciones ilimitadas.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>Acceso a exámenes simulacro.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>Acceso a los exámenes personalizados.</p>
                        </li>
                        <li className="flex items-center justify-start gap-2">
                            <IoIosCheckmarkCircle size={20}/><p>Es posible repetir exámenes anteriores.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
     );
}

export default PlansPage;