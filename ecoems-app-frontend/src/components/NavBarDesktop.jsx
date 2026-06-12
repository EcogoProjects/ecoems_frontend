"use client"
import Image from "next/image";
import AppLink from "@/components/AppLink";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { LuHouse, LuChevronDown } from "react-icons/lu";
import { signOut } from "@/lib/api";
import { useUserStore } from "@/store/userStore";
import { clearOnboardingCookie } from "@/utils/onboardingCookie";
import { clearProfileCache } from "@/hooks/useProfile";

function NavBarDesktop() {
    const image_url = useUserStore((s) => s.avatar_url);
    const name = useUserStore((s) => s.name);
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    const [signOutError, setSignOutError] = useState(null);
    const avatarDefault = '/assets/ecogo_avatar_01.png';

    const handleSignOut = async () => {
        setSigningOut(true);
        setSignOutError(null);
        const { error } = await signOut();
        if (error) {
            setSignOutError('No se pudo cerrar sesión. Intenta de nuevo.');
            setSigningOut(false);
        } else {
            clearOnboardingCookie();
            clearProfileCache();
            useUserStore.getState().clear();
            router.push('/login');
        }
    };

    return (
        <>
            {menuOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            )}
            <div className="hidden md:flex bg-base-dark fixed top-0 w-full h-14 items-stretch px-3 text-base-extra-light z-50">
                {/* Izquierda: logo + navegación */}
                <div className="flex-1 flex items-center gap-1">
                    <AppLink href="/home" className="flex items-center gap-2 px-3 h-full">
                        <div className="flex bg-base-extra-light rounded-full p-1">
                            <Image
                                src="/assets/logo.png"
                                alt="Ecoems Logo"
                                width={36}
                                height={36}
                            />
                        </div>
                        <p className="text-3xl font">Ecogo</p>
                    </AppLink>

                    <ul className="flex h-full items-center">
                        <AppLink href="/home" className="relative flex items-center h-full px-4">
                            <li className="list-none">Home</li>
                            <span className={`absolute bottom-0 left-0 right-0 h-1 rounded-t transition-colors ${pathname === '/home' ? 'bg-[var(--base-hard-color)]' : 'bg-transparent'}`} />
                        </AppLink>
                        <AppLink href="/program" className="relative flex items-center h-full px-4">
                            <li className="list-none">Temario</li>
                            <span className={`absolute bottom-0 left-0 right-0 h-1 rounded-t transition-colors ${pathname === '/program' ? 'bg-[var(--base-hard-color)]' : 'bg-transparent'}`} />
                        </AppLink>
                        {/* <AppLink href="/analytics" className="relative flex items-center h-full px-4">
                            <li className="list-none">Dashboard</li>
                            <span className={`absolute bottom-0 left-0 right-0 h-1 rounded-t transition-colors ${pathname === '/analytics' ? 'bg-[var(--base-hard-color)]' : 'bg-transparent'}`} />
                        </AppLink> */}
                    </ul>
                </div>

                {/* Derecha: Mi perfil */}
                <div className="relative flex items-center">
                    <button
                        onClick={() => setMenuOpen(prev => !prev)}
                        className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-full transition-colors hover:bg-white/10 active:scale-95 ${menuOpen ? 'bg-white/10' : ''}`}
                    >
                        <Image
                            src={image_url || avatarDefault}
                            alt="Profile Icon"
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                        <span className="text-sm font-medium">{name}</span>
                        <LuChevronDown size={14} className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {menuOpen && (
                        <div className="absolute top-full right-0 mt-2.5 w-64 bg-base-dark border border-white/10 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                            <div className="px-4 py-3.5 border-b border-white/10">
                                <p className="text-xs text-white/40 uppercase tracking-wider font-medium">Cuenta</p>
                                <p className="text-sm font-semibold text-base-extra-light mt-0.5 truncate">{name}</p>
                            </div>
                            <AppLink
                                href="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                            >
                                <LuHouse size={15} />
                                <span>Mi perfil</span>
                            </AppLink>
                            <div className="border-t border-white/10 mx-3" />
                            <button
                                onClick={handleSignOut}
                                disabled={signingOut}
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

        </>
    );
}

export default NavBarDesktop;