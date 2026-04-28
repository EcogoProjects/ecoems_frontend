"use client"
import CircleAvgIndicator from "@/components/analytics/CircleAvgIndicator";
import ExamProgressChart from "@/components/analytics/ExamProgressChart";
import SubjectScoreItem from "@/components/analytics/SubjectScoreItem";
import MarginBottom from "@/components/MarginBottom";
import MarginTop from "@/components/MarginTop";
import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";

function AnalyticsPage() {
    const value = 80;
    const top_subjects_scores = [
        { subject: "Matemáticas", score: 85 },
        { subject: "Ciencias", score: 78 },
        { subject: "Historia", score: 72 }
    ];
    const last_subjects_scores = [
        { subject: "Literatura", score: 55 },
        { subject: "Geografía", score: 48 },
        { subject: "Arte", score: 40 }
    ];
    return ( 
        <div className="flex flex-col min-h-screen justify-center items-center">
            <MarginTop/>
            <NavBarDesktop/>
            <div className="flex flex-col md:grid md:grid-cols-3 w-4/5 gap-6">
                {/*Contenedor izquierdo - Resumen general */}
                <div className="bg-base p-4 rounded-box-standard pt-12 pb-12 
                flex flex-col gap-5 shadow-lg md:col-span-1">
                    <div className="flex items-center justify-center gap-1 pl-6 pr-6 md:flex-col md:items-center
                    md:justify-center xl:flex-row">
                        <div className="w-1/2 md:w-fit">
                            <CircleAvgIndicator size={120} value={value} /> 
                        </div>
                    <p className="text-[16px] font-black w-1/2 text-center md:w-full lg:w-fit">
                        Haz obtenido un promedio de aciertos igual a {value}%
                        </p>
                    </div>
                    {/* Contenedor de materias dominadas */}
                    <div>
                        <h2 className="w-full text-base bg-base-dark rounded-[11px] p-1.5 text-center
                        tracking-wider font-bold mb-2.5">
                            Materias que más dominas
                        </h2>
                        <div className="flex flex-col pl-2 pr-2 gap-2">
                            {top_subjects_scores.map((item, index) => (
                                <SubjectScoreItem
                                    key={index}
                                    position={index + 1}
                                    subject={item.subject}
                                    score={item.score}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Contenedor de materias a mejorar */}
                    <div>
                        <h2 className="w-full text-base bg-base-dark rounded-[11px] p-1.5 text-center
                        tracking-wider font-bold mb-2.5">
                            Materias que debes repasar
                        </h2>
                        <div className="flex flex-col pl-2 pr-2 gap-2">
                            {last_subjects_scores.map((item, index) => (
                                <SubjectScoreItem
                                    key={index}
                                    position={index + 1}
                                    subject={item.subject}
                                    score={item.score}
                                />
                            ))}
                        </div>
                    </div>  
                           
                </div>
                <div className="flex flex-col bg-base p-4 rounded-box-standard pt-12 pb-12 md:col-span-2 shadow-lg">
                    <ExamProgressChart/>   
                </div>
            </div>
            
            <NavBarMovile/>
            <MarginBottom/>
        </div>
     );
}

export default AnalyticsPage;