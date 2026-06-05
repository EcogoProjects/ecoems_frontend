"use client"

import { useRef, useEffect } from "react";

export default function NavExamResult({ questions, currentIndex, answers, onNavigate }) {
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

    const getStatusStyles = (status, isActive) => {
        let baseColor = '';
        if (status === 'correct') {
            baseColor = 'bg-[#2c7a4a] text-white';
        } else if (status === 'incorrect') {
            baseColor = 'bg-[#a83030] text-white';
        } else if (status === 'partial') {
            baseColor = 'bg-[#a06000] text-white';
        } else {
            baseColor = 'bg-base-dark text-white';
        }

        const activeStyles = isActive 
            ? 'w-10 h-10 text-lg shadow-md z-10 border-[3px] border-white opacity-100' 
            : 'w-6 h-6 text-xs hover:scale-110 cursor-pointer opacity-50 hover:opacity-100 border-none';

        return `${baseColor} ${activeStyles}`;
    };

    return (
        <div className="w-[180px] overflow-hidden relative mx-4">
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
                    const displayIndex = q.originalIndex !== undefined ? q.originalIndex : index;
                    const isActive = displayIndex === currentIndex;
                    const statusClass = getStatusStyles(q.status, isActive);

                    return (
                        <div
                            key={q.id}
                            onClick={() => {
                                if (!isDragging.current) onNavigate(displayIndex);
                            }}
                            className={`flex-shrink-0 flex items-center justify-center rounded-full font-bold transition-all duration-300 box-content ${statusClass}`}
                        >
                            {displayIndex + 1}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
