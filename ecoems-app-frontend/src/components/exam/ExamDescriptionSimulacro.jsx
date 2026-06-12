'use client'

import { IoMdClose } from 'react-icons/io';
import { FaBookReader, FaLock } from 'react-icons/fa';

const SIMULACRO_EXAMS = [
    { id: 1, title: 'Simulacro 1' },
    { id: 2, title: 'Simulacro 2' },
    { id: 3, title: 'Simulacro 3' },
];

export default function ExamDescriptionSimulacro({ onClose, onSelect, isStarting = false, unlockedCount = SIMULACRO_EXAMS.length }) {
    return (
        <div className="bg-base-dark text-base-soft p-4 md:p-6 rounded-[28px] flex flex-col items-center w-full shadow-2xl relative">
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 text-base-soft/50 hover:text-base-soft transition-colors p-1 cursor-pointer"
                >
                    <IoMdClose size={22} />
                </button>
            )}

            <h2 className="text-xl md:text-2xl text-center font-extrabold mb-4 md:mb-6 tracking-tight">
                Examen Simulacro
                <div className="h-1.5 w-16 bg-premium-box mx-auto mt-3 rounded-full opacity-90"></div>
            </h2>

            <p className="text-[14px] md:text-[15px] leading-relaxed text-center mb-5 md:mb-7 font-medium px-2">
                {isStarting ? 'Iniciando...' : 'Selecciona un examen para empezar'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-items-center">
                {SIMULACRO_EXAMS.map(exam => {
                    const isLocked = exam.id > unlockedCount;
                    return (
                        <button
                            key={exam.id}
                            type="button"
                            onClick={isLocked ? undefined : () => onSelect?.(exam.id)}
                            disabled={isStarting || isLocked}
                            title={isLocked ? 'Disponible con Ecogo Pro' : undefined}
                            className={`w-[120px] h-[120px] rounded-2xl font-bold
                                flex flex-col items-center justify-center gap-2.5 shadow-md transition-all duration-200
                                ${isLocked
                                    ? 'bg-base-hard/40 text-base-dark/50 cursor-not-allowed'
                                    : isStarting
                                        ? 'bg-base-hard text-base-dark opacity-60 cursor-not-allowed'
                                        : 'bg-base-hard text-base-dark hover:bg-premium-box hover:-translate-y-0.5 active:scale-[0.97] cursor-pointer'}`}
                        >
                            {isLocked ? <FaLock size={28} /> : <FaBookReader size={32} />}
                            <span className="text-sm tracking-wide">{exam.title}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
