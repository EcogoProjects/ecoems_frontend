"use client"

import Image from "next/image";
import AppLink from "@/components/AppLink";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { LuBookOpen, LuChevronDown, LuHouse, LuNewspaper, LuUserRound } from "react-icons/lu";
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
            return;
        }

        clearOnboardingCookie();
        clearProfileCache();
        useUserStore.getState().clear();
        router.push('/login');
    };

    const navItemClass = (active) => (
        `flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
            active
                ? 'bg-base-hard-alt text-base-dark shadow-sm'
                : 'text-base-extra-light/75 hover:bg-white/10 hover:text-base-extra-light'
        }`
    );

    return (
        <>
            {menuOpen && (
                <div className="fixed inset-0 z-40 hidden md:block" onClick={() => setMenuOpen(false)} />
            )}

            <header className="fixed top-3 right-4 left-4 z-50 hidden rounded-2xl border border-white/10 bg-base-dark shadow-[0_8px_24px_rgba(56,31,13,0.22)] md:block">
                <div className="grid h-[68px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 text-base-extra-light xl:px-6">
                    <div className="flex min-w-0 items-center">
                        <AppLink href="/home" className="group flex items-center gap-2.5 rounded-2xl pr-2 transition-opacity hover:opacity-85">
                            <div className="flex rounded-xl bg-base-extra-light p-1 shadow-sm transition-transform duration-200 group-hover:scale-105">
                                <Image src="/assets/logo.png" alt="Ecogo" width={38} height={38} />
                            </div>
                            <div className="leading-none [&>p:last-child]:hidden xl:[&>p:last-child]:block">
                                <p className="text-[25px] font-semibold tracking-tight">Ecogo</p>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-base-hard-alt">Prepárate para ECOEMS</p>
                            </div>
                        </AppLink>

                    </div>

                    <nav aria-label="Navegación principal" className="flex items-center gap-1 rounded-2xl border border-white/10 bg-black/10 p-1.5">
                            <AppLink href="/home" className={navItemClass(pathname === '/home')}>
                                <LuHouse size={16} />
                                <span>Inicio</span>
                            </AppLink>
                            <AppLink href="/program" className={navItemClass(pathname === '/program')}>
                                <LuBookOpen size={16} />
                                <span>Temario</span>
                            </AppLink>
                            <a href="https://ecogo.mx/blog" className={navItemClass(false)}>
                                <LuNewspaper size={16} />
                                <span>Blog</span>
                            </a>
                    </nav>

                    <div className="relative flex min-w-0 items-center justify-self-end">
                        <button
                            type="button"
                            aria-expanded={menuOpen}
                            aria-haspopup="menu"
                            onClick={() => setMenuOpen(prev => !prev)}
                            className={`flex items-center gap-2.5 rounded-2xl border px-2.5 py-2 text-left transition-all active:scale-[0.98] ${
                                menuOpen
                                    ? 'border-base-hard-alt/60 bg-white/10'
                                    : 'border-white/10 bg-black/10 hover:border-white/25 hover:bg-white/10'
                            }`}
                        >
                            <div className="rounded-xl bg-base-hard-alt p-0.5 shadow-sm">
                                <Image src={image_url || avatarDefault} alt="Foto de perfil" width={32} height={32} className="rounded-[10px] object-cover" />
                            </div>
                            <span className="hidden max-w-24 truncate text-sm font-semibold lg:block xl:max-w-32">{name || 'Mi cuenta'}</span>
                            <LuChevronDown size={15} className={`text-base-hard-alt transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {menuOpen && (
                            <div role="menu" className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-base-dark shadow-[0_18px_40px_rgba(0,0,0,0.38)]">
                                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
                                    <div className="rounded-xl bg-base-hard-alt/20 p-2 text-base-hard-alt">
                                        <LuUserRound size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-base-extra-light/45">Tu cuenta</p>
                                        <p className="mt-0.5 truncate text-sm font-semibold text-base-extra-light">{name || 'Mi cuenta'}</p>
                                    </div>
                                </div>
                                <AppLink href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5">
                                    <LuUserRound size={16} className="text-base-hard-alt" />
                                    <span>Ver mi perfil</span>
                                </AppLink>
                                <div className="mx-4 border-t border-white/10" />
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={signingOut}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-300 transition-colors hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <FaSignOutAlt size={14} />
                                    <span>{signingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
                                </button>
                                {signOutError && (
                                    <p role="alert" className="px-4 pb-3 text-xs text-red-300">{signOutError}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}

export default NavBarDesktop;
