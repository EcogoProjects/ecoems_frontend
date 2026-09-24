"use client"

import { FaHome, FaRegNewspaper, FaSignOutAlt, FaThList } from "react-icons/fa";
import AppLink from "@/components/AppLink";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/api";
import { useUserStore } from "@/store/userStore";
import { clearOnboardingCookie } from "@/utils/onboardingCookie";
import { clearProfileCache } from "@/hooks/useProfile";

function NavBarMovile() {
    const imageUrl = useUserStore((s) => s.avatar_url);
    const name = useUserStore((s) => s.name);
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    const [signOutError, setSignOutError] = useState(null);
    const avatarDefault = "/assets/ecogo_avatar_01.png";

    const handleSignOut = async () => {
        setSigningOut(true);
        setSignOutError(null);
        const { error } = await signOut();
        if (error) {
            setSignOutError("No se pudo cerrar sesión. Intenta de nuevo.");
            setSigningOut(false);
            return;
        }

        clearOnboardingCookie();
        clearProfileCache();
        useUserStore.getState().clear();
        router.push("/login");
    };

    const navItemClass = (active) => (
        `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold transition-all ${
            active ? "bg-base-hard-alt text-base-dark shadow-sm" : "text-base-extra-light/75 active:scale-95"
        }`
    );

    return (
        <>
            {menuOpen && <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)} />}

            <nav aria-label="Navegación móvil" className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-50 w-[calc(100%_-_1.5rem)] max-w-[430px] -translate-x-1/2 md:hidden">
                <div className="grid grid-cols-4 items-center gap-1 rounded-[24px] border border-white/10 bg-base-dark/95 p-1.5 text-base-extra-light shadow-[0_16px_36px_rgba(0,0,0,0.28)] backdrop-blur-md">
                    <AppLink href="/home" className={navItemClass(pathname === "/home")}>
                        <FaHome size={17} />
                        <span>Inicio</span>
                    </AppLink>
                    <AppLink href="/program" className={navItemClass(pathname === "/program")}>
                        <FaThList size={17} />
                        <span>Temario</span>
                    </AppLink>
                    <a href="https://ecogo.mx/blog" className={navItemClass(false)}>
                        <FaRegNewspaper size={17} />
                        <span>Blog</span>
                    </a>

                    <div className="relative flex min-w-0 flex-1">
                        {menuOpen && (
                            <div className="absolute bottom-full right-0 mb-3 max-h-[calc(100dvh_-_7rem_-_env(safe-area-inset-bottom))] w-56 overflow-y-auto rounded-2xl border border-white/10 bg-base-dark shadow-[0_-12px_32px_rgba(0,0,0,0.35)]">
                                <AppLink href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/5">
                                    <Image src={imageUrl || avatarDefault} alt="Perfil" width={30} height={30} className="rounded-xl" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-base-extra-light/45">Mi cuenta</p>
                                        <p className="truncate text-sm font-semibold">{name || "Mi perfil"}</p>
                                    </div>
                                </AppLink>
                                <div className="mx-4 border-t border-white/10" />
                                <AppLink href="/program" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5">
                                    <FaThList size={15} className="text-base-hard-alt" />
                                    <span>Temario</span>
                                </AppLink>
                                <a href="https://ecogo.mx/blog" className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5">
                                    <FaRegNewspaper size={15} className="text-base-hard-alt" />
                                    <span>Blog</span>
                                </a>
                                <div className="mx-4 border-t border-white/10" />
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={signingOut}
                                    className="flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium text-red-300 transition-colors hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <FaSignOutAlt size={14} />
                                    <span>{signingOut ? "Cerrando sesión..." : "Cerrar sesión"}</span>
                                </button>
                                {signOutError && <p role="alert" className="px-4 pb-3 text-xs text-red-300">{signOutError}</p>}
                            </div>
                        )}

                        <button
                            type="button"
                            aria-expanded={menuOpen}
                            aria-haspopup="menu"
                            onClick={() => setMenuOpen(prev => !prev)}
                            className={`${navItemClass(pathname === "/profile" || menuOpen)} w-full`}
                        >
                            <Image src={imageUrl || avatarDefault} alt="Perfil" width={18} height={18} className="rounded-md" />
                            <span>Perfil</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBarMovile;
