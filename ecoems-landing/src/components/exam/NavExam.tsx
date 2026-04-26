"use client"

import { useRef, useEffect, MouseEvent } from "react";

interface DiagnosticQuestion {
    id: number;
    [key: string]: any;
}

interface NavExamProps {
    questions: DiagnosticQuestion[];
    currentIndex: number;
    answers: Record<number, string>;
    onNavigate: (index: number) => void;
}

export default function NavExam({ questions, currentIndex, answers, onNavigate }: NavExamProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Referencias para controlar el arrastre con el mouse
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // 1. Centrar automáticamente la pregunta actual cuando cambia por los botones Prev/Next
    useEffect(() => {
        if (scrollRef.current) {
            const activeElement = scrollRef.current.children[currentIndex] as HTMLElement;
            if (activeElement) {
                const container = scrollRef.current;
                const elementOffset = activeElement.offsetLeft;
                const elementWidth = activeElement.offsetWidth;
                const containerWidth = container.offsetWidth;

                // Mueve el scroll horizontal para que el círculo activo quede en el medio
                container.scrollTo({
                    left: elementOffset - (containerWidth / 2) + (elementWidth / 2),
                    behavior: 'smooth'
                });
            }
        }
    }, [currentIndex]);

    // 2. Convertir el scroll vertical (rueda del mouse) en scroll horizontal
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    // 3. Lógica para deslizar el contenedor arrastrando con el clic del mouse
    const handleMouseDown = (e: MouseEvent) => {
        if (!scrollRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
        if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        e.preventDefault(); // Evita seleccionar texto o elementos por error
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Multiplicador de velocidad de arrastre
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        // Limitamos el ancho del padre para que simule una "ventana" de ~5 elementos
        <div className="w-[180px]  overflow-hidden relative mx-4">
            <div
                ref={scrollRef}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                // Ocultamos la barra de scroll usando utilidades combinadas
                className="flex items-center gap-2 overflow-x-auto p-2 cursor-grab [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] select-none"
            >
                {questions.map((q, index) => {
                    const isAnswered = !!answers[q.id];
                    const isActive = index === currentIndex;

                    return (
                        <div
                            key={q.id}
                            onClick={() => {
                                // Solo navega si el usuario hizo clic real (no si soltó el mouse tras arrastrar)
                                if (!isDragging.current) onNavigate(index);
                            }}
                            // Agregamos flex-shrink-0 para que los círculos no se aplasten si hay muchos
                            className={`
                                flex-shrink-0 flex items-center justify-center rounded-full font-bold transition-all duration-300
                                ${isActive
                                    ? 'w-10 h-10 bg-base text-base-dark text-lg shadow-md z-10'
                                    : 'w-6 h-6 text-white text-xs hover:scale-110 cursor-pointer'
                                }
                                ${!isActive && isAnswered ? 'bg-base/50 hover:bg-base/70' : ''}
                                ${!isActive && !isAnswered ? 'bg-white/10 opacity-50 hover:opacity-100' : ''}
                            `}
                        >
                            {index + 1}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}