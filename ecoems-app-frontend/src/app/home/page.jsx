import NavBarMovile from "@/components/NavBar";
import { MdShutterSpeed } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUnlockAlt, FaBookReader } from "react-icons/fa";

function HomePage() {
    return ( 
    <div className="flex flex-col min-h-screen justify-center items-center">
        <div className=" flex flex-col rounded-box-standard bg-base-hard p-10 pl-3.5 pr-3.5 gap-5">
            <h2 className="font-extrabold tracking-wide text-xl text-center mb-1.5">Realizar Examén</h2>
            <div className="text-white grid grid-cols-2 gap-2 tracking-wide
            [&_div>h3]:font-semibold [&_div]:max-w-[154px]
            [&_div]:flex [&_div]:items-center [&_div]:justify-between [&_div]:gap-3 [&_div]:min-h-[60px]
            [&>div]:bg-base-dark [&>div]:p-1.5 [&>div]:rounded-[15px]">
                <div>
                    <h3>Examén Rápido</h3>
                    <div className="flex items-center justify-center w-10 h-10">
                        <MdShutterSpeed size={40}/>
                    </div>
                </div>
                <div>
                    <h3>Examén de seguimiento</h3>
                    <div className="flex items-center justify-center w-10 h-10">
                        <RiCalendarScheduleFill size={30}/>
                    </div>
                </div>
                <div>
                    <h3>Examén Libre</h3>
                    <div className="flex items-center justify-center w-10 h-10">
                        <FaUnlockAlt size={30}/>
                    </div>
                </div>
            </div>
            <div className="bg-base-dark p-1.5 rounded-[15px] text-white flex flex-col items-center">
                <h3 className="font-semibold text-xl">Examén Simulacro</h3>
                <div className="flex items-center justify-center w-10 h-10">
                        <FaBookReader size={30}/>
                </div>
            </div>
        </div>
        <NavBarMovile/>
    </div>
    );
}

export default HomePage;