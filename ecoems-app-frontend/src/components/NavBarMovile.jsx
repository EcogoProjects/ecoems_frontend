"use client"
import { ChartBarBigColumns } from "@boxicons/react";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function NavBarMovile() {
    const image_url = "/assets/ecogo_avatar_04.png";
    const pathname = usePathname();

    return (  
        <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-50 md:hidden">
            {/* Barra con efecto Glassmorphism y bordes muy redondeados */}
            <div className="bg-base-dark/90 backdrop-blur-md border border-white/10 flex items-center justify-around py-3 px-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white">
                
                {/* Analytics */}
                <Link href="/analytics" className={`p-2 transition-transform active:scale-90 hover:opacity-80 ${pathname === '/analytics' ? 'bg-white/10 rounded-2xl' : ''}`}>
                    <ChartBarBigColumns height="28px" width="28px" pack="filled"/>
                </Link>

                {/* Home - Icono central un poco más grande */}
                <Link href="/home" className={`p-3 rounded-2xl transition-all active:scale-90 shadow-inner ${pathname === '/home' ? 'bg-white/10' : ''}`}>
                    <FaHome size={28}/>
                </Link>

                {/* Profile */}
                <Link href="/profile" className={`transition-transform active:scale-90 ${pathname === '/profile' ? 'bg-white/10 rounded-2xl p-2' : ''}`}>
                    <div className="rounded-full ring-2 ring-base-hard-alt/60 p-0.5 overflow-hidden">
                        <Image 
                            src={image_url}
                            alt="Profile" 
                            width={32} 
                            height={32}
                            className="rounded-full"
                        />    
                    </div>
                </Link>

            </div>
        </div>
    );
}

export default NavBarMovile;