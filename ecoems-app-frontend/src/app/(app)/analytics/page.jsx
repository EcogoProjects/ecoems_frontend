"use client"
import ExamProgressChart from "@/components/analytics/ExamProgressChart";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
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
                <DashboardSummary
                    value={value}
                    topSubjectsScores={top_subjects_scores}
                    lastSubjectsScores={last_subjects_scores}
                />
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
