'use client'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigationStore } from '@/store/navigationStore';

// Overlay global de navegación: se monta en el root layout y se muestra
// encima de la página actual mientras carga la página destino.
// Lo enciende AppLink y se apaga solo cuando el pathname cambia.
export default function NavigationOverlay() {
    const isNavigating = useNavigationStore((s) => s.isNavigating);
    const stopNavigation = useNavigationStore((s) => s.stopNavigation);
    const pathname = usePathname();

    useEffect(() => {
        stopNavigation();
    }, [pathname, stopNavigation]);

    // Red de seguridad: si la navegación nunca completa (ej. error de red),
    // el overlay no puede quedarse pegado bloqueando la página.
    useEffect(() => {
        if (!isNavigating) return;
        const timeout = setTimeout(stopNavigation, 8000);
        return () => clearTimeout(timeout);
    }, [isNavigating, stopNavigation]);

    if (!isNavigating) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-base-dark/30 flex items-center justify-center cursor-wait animate-spinner-appear">
            <div className="w-12 h-12 rounded-full border-4 border-base-soft/40 border-t-base-soft animate-spin" />
        </div>
    );
}
