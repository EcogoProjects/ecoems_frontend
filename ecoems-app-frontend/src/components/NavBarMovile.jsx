"use client"
import { ChartBarBigColumns } from "@boxicons/react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/api";

function NavBarMovile() {
    const image_url = "/assets/ecogo_avatar_04.png";
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    const [signOutError, setSignOutError] = useState(null);

    const handleSignOut = async () => {
        setSigningOut(true);
        setSignOutError(null);
        const { error } = await signOut();
        if (error) {
            setSignOutError('No se pudo cerrar sesión. Intenta de nuevo.');
            setSigningOut(false);
        } else {
            router.push('/login');
        }
    };

    return (
        <>
            {menuOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            )}
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

                    {/* Profile — abre el menú desplegable */}
                    <div className="relative">
                        {menuOpen && (
                            <div className="absolute bottom-full right-0 mb-3 w-52 bg-base-dark/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_-12px_32px_rgba(0,0,0,0.35)] overflow-hidden">
                                <div className="flex items-center gap-2.5 px-4 py-3.5">
                                    <div className="rounded-full overflow-hidden ring-1 ring-white/20 flex-shrink-0">
                                        <Image
                                            src={image_url}
                                            alt="Avatar"
                                            width={28}
                                            height={28}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <p className="text-sm font-semibold text-white truncate">Nombre de Usuario</p>
                                </div>
                                <div className="border-t border-white/10 mx-3" />
                                <button
                                    onClick={handleSignOut}
                                    disabled={signingOut}
                                    className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors active:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaSignOutAlt size={14} />
                                    <span>{signingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
                                </button>
                                {signOutError && (
                                    <p className="px-4 pb-3 text-xs text-red-400/80">{signOutError}</p>
                                )}
                            </div>
                        )}

                        <button
                            onClick={() => setMenuOpen(prev => !prev)}
                            className={`transition-transform active:scale-90 p-2 rounded-2xl ${menuOpen ? 'bg-white/10' : ''}`}
                        >
                            <div className="rounded-full ring-2 ring-base-hard-alt/60 p-0.5 overflow-hidden">
                                <Image
                                    src={image_url}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default NavBarMovile;