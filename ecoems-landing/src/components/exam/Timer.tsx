"use client"

import { useState, useEffect } from "react";

interface TimerProps {
    initialMinutes?: number;
    initialSeconds?: number;
    onTimeUp?: () => void;
}

export default function Timer({ initialMinutes = 0, initialSeconds = 0, onTimeUp }: TimerProps) {
    // Usamos null inicialmente para saber que aún no hemos leído el localStorage
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    // EFECTO 1: Calcular o recuperar la hora de finalización al cargar
    useEffect(() => {
        const storageKey = 'exam_end_time';
        const savedEndTime = localStorage.getItem(storageKey);

        if (!savedEndTime) {
            // Si no existe, es un examen nuevo. Calculamos la hora de finalización
            const totalMs = (initialMinutes * 60 + initialSeconds) * 1000;
            const newEndTime = new Date().getTime() + totalMs;

            localStorage.setItem(storageKey, newEndTime.toString());
            setTimeLeft(Math.floor(totalMs / 1000));
        } else {
            // Si ya existe, restamos la hora final guardada menos la hora actual
            const remainingMs = parseInt(savedEndTime) - new Date().getTime();

            if (remainingMs > 0) {
                setTimeLeft(Math.floor(remainingMs / 1000));
            } else {
                setTimeLeft(0); // El tiempo se acabó mientras no estaba en la página
            }
        }
    }, [initialMinutes, initialSeconds]);

    // EFECTO 2: Manejar la cuenta regresiva cada segundo
    useEffect(() => {
        if (timeLeft === null) return; // No hacer nada si aún está cargando

        if (timeLeft <= 0) {
            if (onTimeUp) onTimeUp();
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, onTimeUp]);

    // Renderizado mientras carga (evita parpadeos o errores de Next.js)
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

    // Cálculos para mostrar en pantalla
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