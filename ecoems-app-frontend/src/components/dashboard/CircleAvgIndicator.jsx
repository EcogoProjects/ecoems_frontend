"use client"
import { useState, useEffect } from 'react';

export default function CircleAvgIndicator({ value = 0, size = 160, strokeWidth = 30, label, background='--base-dark-color' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    setAnimatedValue(value);
  }, [value]);

  const dashOffset = circumference - (animatedValue / 100) * circumference;

  return (
    // Contenedor principal: relativo para que el texto absoluto se posicione respecto a este
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      
      <svg width={size} height={size} className="rotate-[180deg] absolute">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`var(${background})`}
          strokeWidth={strokeWidth}
          className="opacity-40"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`var(${background})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.6s ease' }}
        />
      </svg>

      {/* Contenedor del texto: Centrado absoluto */}
      <div className="flex flex-col items-center justify-center z-10 pointer-events-no w-[60px]">
        <span className="text-2xl font-black leading-none text-base-dark">
          {value}%
        </span>
        {label && (
          <span className="text-sm mt-1 text-base-dark/70 text-center ">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}