import NavBarMovile from "@/components/NavBarMovile";
import NavBarDesktop from "@/components/NavBarDesktop";
import ExamSelector from "@/components/homepage/ExamSelector";

function HomePage() {
    return ( 
    <div className="flex flex-col min-h-screen justify-center items-center">
        <NavBarDesktop/>
        <ExamSelector/>
        <NavBarMovile/>
    </div>
    );
}

export default HomePage;