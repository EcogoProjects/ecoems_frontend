"use client"

import { useRef, useEffect } from "react";

export default function NavExam({ questions, currentIndex, answers, onNavigate }) {
    const scrollRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        if (scrollRef.current) {
            const activeElement = scrollRef.current.children[currentIndex];
            if (activeElement) {
                const container = scrollRef.current;
                const elementOffset = activeElement.offsetLeft;
                const elementWidth = activeElement.offsetWidth;
                const containerWidth = container.offsetWidth;

                container.scrollTo({
                    left: elementOffset - (containerWidth / 2) + (elementWidth / 2),
                    behavior: 'smooth'
                });
            }
        }
    }, [currentIndex]);

    const handleWheel = (e) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    const handleMouseDown = (e) => {
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

    const handleMouseMove = (e) => {
        if (!isDragging.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div className="w-[180px]  overflow-hidden relative mx-4">
            <div
                ref={scrollRef}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex items-center gap-2 overflow-x-auto p-2 cursor-grab [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] select-none"
            >
                {questions.map((q, index) => {
                    const isAnswered = !!answers[q.id];
                    const isActive = index === currentIndex;

                    return (
                        <div
                            key={q.id}
                            onClick={() => {
                                if (!isDragging.current) onNavigate(index);
                            }}
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
