"use client"

import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";
import MarginBottom from "@/components/MarginBottom";
import MarginTop from "@/components/MarginTop";
import ResultQuestionsHeader from "@/components/exam/ResultQuestionsHeader";
import ResultQuestionsSummary from "@/components/exam/ResultQuestionsSummary";
import QuestionsBreakdown from "@/components/exam/QuestionsBreakdown";

const examResult = {
    completedAt: "15 de mayo de 2026",
    duration: "18 min 42 seg",
    summary: {
        score: 7.5,
        maxScore: 10,
        //verdict: "¡Buen trabajo!",
        correct: 7,
        incorrect: 2,
        partial: 1,
        totalQuestions: 10,
        totalTime: "18:42",
        averageTime: "1:52",
    },
    questions: [
        {
            id: "q1",
            status: "correct",
            prompt: "¿Cuál es el principal gas de efecto invernadero emitido por las actividades humanas?",
            userAnswer: "Dióxido de carbono (CO₂)",
            explanation: "El CO₂ representa una parte importante de las emisiones globales de gases de efecto invernadero de origen humano, principalmente por la quema de combustibles fósiles, la deforestación y procesos industriales.",
        },
        {
            id: "q2",
            status: "incorrect",
            prompt: "¿A qué bioma corresponde el ecosistema representado en la imagen?",
            imageLabel: "https://generialand.com/wp-content/uploads/2024/12/generia_home1.webp",
            userAnswer: "Desierto subtropical",
            correctAnswer: "Bosque tropical húmedo",
            explanation: "El bosque tropical húmedo se caracteriza por precipitaciones altas, temperatura estable y gran biodiversidad. A diferencia del desierto, presenta cobertura vegetal densa con doseles de gran altura.",
        },
        {
            id: "q3",
            status: "partial",
            prompt: "Según el texto, ¿cuáles son las dos principales amenazas para la biodiversidad marina que menciona el autor?",
            reading: "Los océanos enfrentan una crisis sin precedentes. La sobrepesca ha reducido poblaciones de peces en gran parte de las zonas marítimas evaluadas. Paralelamente, la acidificación producto del CO₂ disuelto destruye arrecifes de coral, hábitat de muchas especies marinas conocidas.",
            userAnswer: "Sobrepesca y contaminación plástica",
            correctAnswer: "Sobrepesca y acidificación oceánica",
            explanation: "El texto presenta la sobrepesca y la acidificación oceánica como amenazas principales. La contaminación plástica se menciona como un factor que agrava la situación, no como una de las dos respuestas centrales.",
        },
        {
            id: "q4",
            status: "correct",
            prompt: "La fotosíntesis se lleva a cabo principalmente en...",
            userAnswer: "Los cloroplastos",
            explanation: "Los cloroplastos son los orgánulos donde ocurren las etapas principales de la fotosíntesis. Contienen clorofila, el pigmento que capta energía lumínica para transformarla en energía química.",
        },
        {
            id: "q5",
            status: "incorrect",
            prompt: "¿Qué porcentaje del agua total de la Tierra corresponde a agua dulce accesible para el consumo humano?",
            imageLabel: "[ infografía: distribución del agua en la Tierra ]",
            userAnswer: "Aproximadamente 30 %",
            correctAnswer: "Menos del 1 %",
            explanation: "Aunque el agua dulce representa una fracción pequeña del total, la mayor parte está en glaciares o acuíferos profundos. Solo una mínima porción está disponible en ríos, lagos y fuentes superficiales accesibles.",
        },
        {
            id: "q6",
            status: "correct",
            prompt: "¿Cuál de los siguientes gases NO es considerado un gas de efecto invernadero?",
            userAnswer: "Nitrógeno (N₂)",
            explanation: "El N₂ es el gas más abundante de la atmósfera, pero no absorbe radiación infrarroja como los principales gases de efecto invernadero.",
        },
        {
            id: "q7",
            status: "correct",
            prompt: "La cadena alimentaria siempre comienza con organismos...",
            userAnswer: "Productores (autótrofos)",
            explanation: "Los productores o autótrofos sintetizan materia orgánica a partir de fuentes inorgánicas mediante fotosíntesis o quimiosíntesis. Por eso forman el primer eslabón de la cadena alimentaria.",
        },
        {
            id: "q8",
            status: "correct",
            prompt: "¿Cuál es la principal causa de pérdida de biodiversidad a nivel global, según la IPBES?",
            userAnswer: "Destrucción y fragmentación de hábitats",
            explanation: "La pérdida y degradación de hábitat es una de las principales amenazas para la biodiversidad, seguida de otros factores como explotación directa, cambio climático, contaminación y especies invasoras.",
        },
        {
            id: "q9",
            status: "correct",
            prompt: "¿Cuál es la unidad funcional básica de estudio en ecología?",
            userAnswer: "El ecosistema",
            explanation: "El ecosistema integra componentes bióticos y abióticos, lo que permite estudiar los flujos de energía y los ciclos de materia de manera conjunta.",
        },
        {
            id: "q10",
            status: "correct",
            prompt: "¿Qué acuerdo internacional adoptado en 2015 establece el objetivo de limitar el calentamiento global a 1.5 °C?",
            userAnswer: "Acuerdo de París",
            explanation: "El Acuerdo de París, adoptado en 2015, establece compromisos para limitar el aumento de temperatura global y reducir emisiones.",
        },
    ],
};

export default function ExamResultPage() {
    return (
        <>
            <NavBarDesktop />
            <NavBarMovile />

            <main className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col gap-7 px-5 pb-28 pt-6 text-base-dark md:px-8 md:pb-20">
                <MarginTop />
                <ResultQuestionsHeader completedAt={examResult.completedAt} duration={examResult.duration} />
                <ResultQuestionsSummary summary={examResult.summary} />
                <QuestionsBreakdown questions={examResult.questions} />
                <MarginBottom />
            </main>
        </>
    );
}
