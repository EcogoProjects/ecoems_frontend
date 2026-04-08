import { ChartBarBigColumns, User } from "@boxicons/react";
import { FaHome, FaUser } from "react-icons/fa";
import Link from "next/link";

function NavBarMovile() {
    return (  
        <div className="bg-base-dark flex items-center text-white min-w-screen justify-around pt-2.5 pb-2.5  fixed bottom-0 
        md:hidden">
            <Link href="/analytics">
                <ChartBarBigColumns height="50px" width="50px" pack="filled"/>
            </Link>
            <Link href="/home">
                <FaHome size={50}/>
            </Link>
            <Link href="/profile">
                <FaUser size={40}/>
            </Link>
        </div>
    );
}

export default NavBarMovile;