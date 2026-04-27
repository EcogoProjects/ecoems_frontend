"use client";
import { useEffect } from "react";
import renderMathInElement from "katex/dist/contrib/auto-render.mjs";

export const useLatexScanner = (ref: React.RefObject<HTMLElement | null>, dependency: any) => {
    useEffect(() => {
        if (ref.current) {
            // Función que ejecuta el renderizado
            const render = () => {
                renderMathInElement(ref.current!, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "$", right: "$", display: false },
                    ],
                    throwOnError: false,
                });
            };

            // 1. Renderizado inicial
            render();

            // 2. Observador: Si algo cambia dentro del div (pistas que aparecen, etc)
            const observer = new MutationObserver(() => {
                render();
            });

            observer.observe(ref.current, {
                childList: true, // detecta si se añaden/quitan elementos
                subtree: true,   // detecta cambios en hijos profundos
            });

            return () => observer.disconnect();
        }
    }, [dependency]); // Se reinicia si cambias de pregunta
};