export default function CircleAvgIndicator({ value = 0, size = 160, strokeWidth = 30, label }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    // Contenedor principal: relativo para que el texto absoluto se posicione respecto a este
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      
      {/* El SVG ahora tiene z-index bajo para no tapar el texto */}
      <svg width={size} height={size} className="rotate-[180deg] absolute">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--base-dark-color)"
          strokeWidth={strokeWidth}
          className="opacity-40"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--base-dark-color)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.35s ease' }}
        />
      </svg>

      {/* Contenedor del texto: Centrado absoluto */}
      <div className="flex flex-col items-center justify-center z-10 pointer-events-none">
        <span className="text-2xl font-black leading-none text-base-dark">
          {value}%
        </span>
        {label && (
          <span className="text-sm mt-1 text-base-dark/70 text-center leading-tight">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}