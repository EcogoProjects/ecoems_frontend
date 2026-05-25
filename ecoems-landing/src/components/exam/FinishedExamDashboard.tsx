import CircleAvgIndicator from "./CircleAvgIndicator";
import Link from "next/link"; // Importamos el componente de navegación de Next.js

function FinishedExamDashboard({ closeActionMessage, score }) {
    return (
        <div className="flex flex-col bg-base-dark w-fit max-w-[400px] text-base 
        items-center justify-center p-8 rounded-[30px] shadow-lg gap-4 text-center">

            <h2 className="text-2xl font-bold tracking-wide">{closeActionMessage}</h2>
            <p className="opacity-80">Este fue tu resultado final:</p>

            <div className="w-1/2 md:w-fit py-2">
                <CircleAvgIndicator size={120} value={score} label={null} />
            </div>
            {score >= 80 ? (
                <div className="bg-base text-base-dark p-4 rounded-2xl border border-[#d0f8d4]/30 w-full">
                    <p className="font-bold text-lg">¡Excelente resultado!</p>
                    <p>Demostraste un gran dominio de los temas. Es el momento ideal para medirte con un simulacro real. ¡Regístrate ahora y asegura tu lugar!</p>
                </div>
            ) : score >= 60 ? (
                <div className="bg-base text-base-dark p-4 rounded-2xl border border-[#d0f8d4]/30 w-full">
                    <p className="font-bold text-lg">¡Vas por buen camino!</p>
                    <p className="text-sm opacity-90 mt-1">Tienes buenas bases, pero la competencia es fuerte. Sigue preparándote con nosotros para alcanzar tu máximo potencial.</p>
                </div>
            ) : (
                <div className="bg-base text-base-dark p-4 rounded-2xl border border-[#d0f8d4]/30 w-full">
                    <p className="font-bold text-lg">¡El primer paso es intentarlo!</p>
                    <p className="text-sm opacity-90 mt-1">Un diagnóstico sirve para saber desde dónde partimos. Únete a la plataforma y juntos elevaremos esa puntuación paso a paso.</p>
                </div>
            )}

            {/* BOTÓN DE ACCIÓN PARA CERRAR O CONTINUAR */}
            <div className="flex flex-col">
                <a
                    href="https://app.ecogo.mx/signup"
                    className="mt-4 bg-base-hard-alt text-base-dark font-bold py-2.5 px-8 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md inline-block"
                >
                    Regístrate
                </a>
                <Link
                    href="/"
                    className="mt-4 text-base-soft font-bold py-1 px-5 hover:scale-105 active:scale-95 transition-all inline-block"
                >
                    Volver al inicio
                </Link>
            </div>


        </div>
    );
}

export default FinishedExamDashboard;
