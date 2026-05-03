import { useEffect } from "react";
import renderMathInElement from "katex/dist/contrib/auto-render.mjs";

export const useLatexScanner = (ref, dependency) => {
    useEffect(() => {
        if (ref.current) {
            const render = () => {
                renderMathInElement(ref.current, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "$", right: "$", display: false },
                    ],
                    throwOnError: false,
                });
            };

            render();

            const observer = new MutationObserver(() => {
                render();
            });

            observer.observe(ref.current, {
                childList: true,
                subtree: true,
            });

            return () => observer.disconnect();
        }
    }, [dependency]);
};
