"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "@/lib/api";

function NavBarDesktop() {
    const image_url = "/assets/ecogo_avatar_04.png";
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
            <div className="hidden md:flex bg-base-dark fixed top-0 w-full flex-nowrap items-center justify-between px-3 py-2 text-base-extra-light z-50">
                <Link href="/home" className="flex items-center gap-2">
                    <div className="flex bg-base-extra-light rounded-full p-1">
                        <Image
                            src="/assets/logo.png"
                            alt="Ecoems Logo"
                            width={40}
                            height={40}
                        />
                    </div>
                    <p className="text-3xl font">Ecogo</p>
                </Link>

                <div className="flex gap-2.5 items-center">
                    <ul className="flex gap-3 items-center">
                        {/*
                        <Link href="/program">
                            <li>Temario</li>
                        </Link>
                        */}
                        <Link href="/analytics">
                            <li>Dashboard</li>
                        </Link>
                        <li>Nombre de Usuario</li>
                    </ul>

                    {/* Avatar — abre el menú desplegable */}
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(prev => !prev)}
                            className={`rounded-full overflow-hidden transition-opacity hover:opacity-80 active:scale-95 ring-2 ring-transparent ${menuOpen ? 'ring-base-hard' : ''}`}
                        >
                            <Image
                                src={image_url}
                                alt="Profile Icon"
                                width={40}
                                height={40}
                            />
                        </button>

                        {menuOpen && (
                            <div className="absolute top-full right-0 mt-2.5 w-52 bg-base-dark border border-white/10 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                                <div className="flex items-center gap-3 px-4 py-3.5">
                                    <div className="rounded-full overflow-hidden ring-1 ring-white/20 flex-shrink-0">
                                        <Image
                                            src={image_url}
                                            alt="Avatar"
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <p className="text-sm font-semibold text-base-extra-light truncate">Nombre de Usuario</p>
                                </div>
                                <div className="border-t border-white/10 mx-3" />
                                <button
                                    onClick={handleSignOut}
                                    disabled={signingOut}
                                    className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaSignOutAlt size={14} />
                                    <span>{signingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
                                </button>
                                {signOutError && (
                                    <p className="px-4 pb-3 text-xs text-red-400/80">{signOutError}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBarDesktop;