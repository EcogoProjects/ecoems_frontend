import Image from "next/image";
import Link from "next/link";

function NavBarDesktop() {
    return (  
        <div className="hidden md:flex bg-base-dark fixed top-0 w-full flex-nowrap items-center justify-between px-3 py-2 text-base-extra-light z-50">
            <Link href="/app/home" className="flex items-center gap-2">
                <div className="flex bg-base-extra-light rounded-full p-1">
                   <Image 
                    src="/assets/logo.png" 
                    alt="Ecoems Logo" 
                    width={40} 
                    height={40}
                    />    
                </div>
                <p className=" text-3xl font">Ecogo</p>
            </Link>
            <div className="flex gap-2.5">
                <ul className="flex gap-3 items-center">
                    {
                        /*
                        <Link href="/app/program">
                            <li>Temario</li>
                        </Link>
                     */
                    }
                    <Link href="/app/analytics">
                        <li>Dashboard</li>
                    </Link>
                    <li>Nombre de Usuario</li>
                </ul>
                <div className="rounded-full overflow-hidden">
                    <Link href="/app/profile" >
                        <Image 
                        src="/assets/ecogo_avatar_04.png" 
                        alt="Profile Icon" 
                        width={40} 
                        height={40}
                        />    
                    </Link>
                </div>
                
            </div>
            
        </div>
    );
}

export default NavBarDesktop;