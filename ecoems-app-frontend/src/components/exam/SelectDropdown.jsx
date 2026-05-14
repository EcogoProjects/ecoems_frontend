'use client'

import { useState, useRef, useEffect } from 'react';

export default function SelectDropdown({ options, value, onChange, placeholder, disabled = false, label, id }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const selectedOption = options.find(o => o.value === value);

    useEffect(() => {
        if (!isOpen) return;
        const closeOnOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('mousedown', closeOnOutside);
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('mousedown', closeOnOutside);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [isOpen]);

    return (
        <div className="flex flex-col gap-1 w-full" ref={containerRef}>
            {label && (
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 pl-1">
                    {label}
                </span>
            )}
            <div className="relative">
                <button
                    id={id}
                    type="button"
                    disabled={disabled}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(prev => !prev)}
                    className={`w-full flex items-start justify-between gap-2 bg-[#FFF9E4] text-base-dark pl-3 pr-3 py-3 md:pl-4 md:py-2.5 rounded-xl text-sm border-2 font-semibold shadow-sm transition-all text-left
                        ${isOpen ? 'border-base-dark shadow-md' : 'border-transparent hover:bg-white hover:shadow-md'}
                        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    <span className={`flex-1 leading-snug ${!value ? 'text-base-dark/40 font-medium' : ''}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <svg
                        className={`fill-current h-4 w-4 shrink-0 mt-0.5 text-base-dark opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </button>

                {isOpen && (
                    <ul
                        role="listbox"
                        className="absolute z-30 top-full mt-1.5 w-full rounded-xl shadow-xl border border-base-dark/10 overflow-hidden bg-[#FFF9E4]"
                    >
                        <div className="max-h-52 overflow-y-auto bg-[#FFF9E4]">
                            {options.map(option => (
                                <li key={option.value} role="option" aria-selected={value === option.value}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 md:py-2.5 text-sm font-semibold text-base-dark transition-colors leading-snug
                                            ${value === option.value
                                                ? 'bg-base-hard/40'
                                                : 'bg-[#FFF9E4] hover:bg-base-dark/5 active:bg-base-dark/10'
                                            }
                                        `}
                                    >
                                        {option.label}
                                    </button>
                                </li>
                            ))}
                        </div>
                    </ul>
                )}
            </div>
        </div>
    );
}
