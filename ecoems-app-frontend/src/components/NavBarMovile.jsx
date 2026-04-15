import { ChartBarBigColumns, User } from "@boxicons/react";
import { FaHome, FaUser } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function NavBarMovile() {
    const image_url = "/assets/ecogo_avatar_04.png";
    return (  
        <div className="bg-base-dark flex items-center text-white min-w-screen justify-around pt-2.5 pb-2.5  fixed bottom-0 
        md:hidden z-50">
            <Link href="/app/analytics">
                <ChartBarBigColumns height="50px" width="50px" pack="filled"/>
            </Link>
            <Link href="/app/home">
                <FaHome size={50}/>
            </Link>
            <div className="rounded-full overflow-hidden">
                    <Link href="/app/profile" >
                        <Image 
                        src= {image_url}
                        alt="Profile Icon" 
                        width={50} 
                        height={50}
                        />    
                    </Link>
            </div>
        </div>
    );
}

export default NavBarMovile;