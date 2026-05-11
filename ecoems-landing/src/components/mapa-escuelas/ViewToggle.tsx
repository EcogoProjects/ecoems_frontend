"use client";

import type { ViewMode } from "./types";
import { type ReactNode } from "react";

type ViewDef = {
  id: ViewMode;
  label: string;
  icon: ReactNode;
  stroke?: boolean;
};

const VIEW_OPTIONS: ViewDef[] = [
  {
    id: "map",
    label: "Mapa",
    icon: (
      <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
    ),
  },
  {
    id: "list",
    label: "Tarjetas",
    icon: (
      <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
    ),
  },
  {
    id: "table",
    label: "Tabla",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </>
    ),
    stroke: true,
  },
  {
    id: "tree",
    label: "Directorio",
    icon: (
      <>
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </>
    ),
    stroke: true,
  },
];

type ViewToggleProps = {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
};

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="absolute top-6 right-6 z-[1000] max-lg:top-auto max-lg:bottom-6 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:right-auto">
      {/* Versión Escritorio */}
      <div className="hidden lg:flex bg-white/85 backdrop-blur-md p-1.5 rounded-full gap-1 shadow-[0_20px_50px_rgba(43,29,20,0.12)] border border-white/60">
        {VIEW_OPTIONS.map((v) => (
          <button
            key={v.id}
            onClick={() => onViewModeChange(v.id)}
            className={`px-5 py-2.5 rounded-full border-none font-bold text-[0.95rem] cursor-pointer transition-all duration-300 flex items-center gap-2 whitespace-nowrap active:scale-95 ${
              viewMode === v.id
                ? "bg-[#4A3320] text-white shadow-[0_4px_15px_rgba(74,51,32,0.3)]"
                : "bg-transparent text-[#4A3320] hover:bg-black/5"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px]"
              fill={v.stroke ? "none" : "currentColor"}
              stroke={v.stroke ? "currentColor" : "none"}
              strokeWidth={v.stroke ? "2" : undefined}
            >
              {v.icon}
            </svg>
            {v.label}
          </button>
        ))}
      </div>

      {/* Versión Móvil (Menú Desplegable) */}
      <details className="lg:hidden group/vistas relative">
        <summary className="list-none bg-[#4A3320] text-white px-6 py-3.5 rounded-full font-bold shadow-[0_10px_30px_rgba(43,29,20,0.3)] flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all hover:bg-[#2B1D14] border-2 border-transparent hover:border-[#C89F6B]/30">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>Vistas</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="transition-transform duration-300 group-open/vistas:-rotate-180"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </summary>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white/95 backdrop-blur-xl border-2 border-white p-2 rounded-[24px] shadow-[0_20px_50px_rgba(43,29,20,0.2)] flex flex-col gap-1 w-[220px] opacity-0 pointer-events-none group-open/vistas:opacity-100 group-open/vistas:pointer-events-auto transition-all duration-300 origin-bottom">
          {VIEW_OPTIONS.map((v) => (
            <button
              key={v.id}
              onClick={(e) => {
                onViewModeChange(v.id);
                (e.target as HTMLElement).closest("details")?.removeAttribute("open");
              }}
              className={`w-full px-4 py-3 rounded-xl border-none font-bold text-[0.95rem] cursor-pointer transition-all duration-300 flex items-center gap-3 active:scale-95 ${
                viewMode === v.id
                  ? "bg-[#F5EFE6] text-[#4A3320]"
                  : "bg-transparent text-[#2B1D14] hover:bg-black/5"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className={`w-[18px] h-[18px] ${viewMode === v.id ? "text-[#C89F6B]" : "text-black/50"}`}
                fill={v.stroke ? "none" : "currentColor"}
                stroke={v.stroke ? "currentColor" : "none"}
                strokeWidth={v.stroke ? "2" : undefined}
              >
                {v.icon}
              </svg>
              {v.label}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
