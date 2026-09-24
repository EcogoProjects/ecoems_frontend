"use client"

import { useState, useEffect } from "react";

export default function Timer({ initialMinutes = 0, initialSeconds = 0, onTimeUp }) {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const storageKey = 'exam_end_time';
        const savedEndTime = Number.parseInt(localStorage.getItem(storageKey), 10);
        const endTime = Number.isFinite(savedEndTime)
            ? savedEndTime : Date.now() + (initialMinutes * 60 + initialSeconds) * 1000;
        localStorage.setItem(storageKey, String(endTime));

        // Sincronizar con el reloj real, incluso al volver de una pestaña suspendida.
        const update = () => setTimeLeft(Math.max(0, Math.floor((endTime - Date.now()) / 1000)));
        const frame = requestAnimationFrame(update);
        const interval = setInterval(update, 1000);
        return () => {
            cancelAnimationFrame(frame);
            clearInterval(interval);
        };
    }, [initialMinutes, initialSeconds]);

    useEffect(() => {
        if (timeLeft === null) return;

        if (timeLeft <= 0) {
            if (onTimeUp) onTimeUp();
            return;
        }

    }, [timeLeft, onTimeUp]);

    if (timeLeft === null) {
        return (
            <div className="flex font-semibold items-baseline select-none opacity-50">
                <p className="text-4xl">--</p>
                <p className="font-bold">m</p>
                <p className="text-4xl">:--</p>
                <p className="font-bold">s</p>
            </div>
        );
    }

    const displayMinutes = Math.floor(timeLeft / 60);
    const displaySeconds = timeLeft % 60;
    const formattedSeconds = String(displaySeconds).padStart(2, '0');

    return (
        <div className="flex font-semibold items-baseline select-none">
            <p className="text-4xl">{displayMinutes}</p>
            <p className="font-bold">m</p>
            <p className="text-4xl">:{formattedSeconds}</p>
            <p className="font-bold">s</p>
        </div>
    );
}
