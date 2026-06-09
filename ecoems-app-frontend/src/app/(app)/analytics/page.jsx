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
            
            <DashboardSummary
                value={value}
                topSubjectsScores={top_subjects_scores}
                lastSubjectsScores={last_subjects_scores}
                subjectItemsSelectable
            />
            <div className="mt-10 flex justify-center items-center w-full">
                <ExamProgressChart/>
            </div>
            
            <NavBarMovile/>
            <MarginBottom/>
        </div>
     );
}

export default AnalyticsPage;
