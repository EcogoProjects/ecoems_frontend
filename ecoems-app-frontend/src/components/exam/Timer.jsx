"use client"

import { useState, useEffect } from "react";

export default function Timer({ initialMinutes = 0, initialSeconds = 0, onTimeUp }) {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const storageKey = 'exam_end_time';
        const savedEndTime = localStorage.getItem(storageKey);

        if (!savedEndTime) {
            const totalMs = (initialMinutes * 60 + initialSeconds) * 1000;
            const newEndTime = new Date().getTime() + totalMs;

            localStorage.setItem(storageKey, newEndTime.toString());
            setTimeLeft(Math.floor(totalMs / 1000));
        } else {
            const remainingMs = parseInt(savedEndTime) - new Date().getTime();

            if (remainingMs > 0) {
                setTimeLeft(Math.floor(remainingMs / 1000));
            } else {
                setTimeLeft(0);
            }
        }
    }, [initialMinutes, initialSeconds]);

    useEffect(() => {
        if (timeLeft === null) return;

        if (timeLeft <= 0) {
            if (onTimeUp) onTimeUp();
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(intervalId);
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
