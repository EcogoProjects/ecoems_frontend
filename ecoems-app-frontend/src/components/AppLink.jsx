'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavigationStore } from '@/store/navigationStore';

// Wrapper de next/link que enciende el overlay de navegación (NavigationOverlay).
// Usar este componente en lugar de Link para toda navegación interna entre páginas.
export default function AppLink({ href, onNavigate, children, ...props }) {
    const pathname = usePathname();
    const startNavigation = useNavigationStore((s) => s.startNavigation);

    // onNavigate solo dispara en navegación SPA (no en ctrl+click, target _blank, etc.)
    const handleNavigate = (e) => {
        onNavigate?.(e);
        if (e.defaultPrevented) return;
        const targetPath = typeof href === 'string' ? href.split('?')[0] : href?.pathname;
        if (targetPath && targetPath !== pathname) startNavigation();
    };

    return (
        <Link href={href} onNavigate={handleNavigate} {...props}>
            {children}
        </Link>
    );
}
