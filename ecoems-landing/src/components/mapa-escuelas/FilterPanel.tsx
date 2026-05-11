"use client";

import { useState, useRef, useEffect } from "react";
import type { FilterState } from "./types";

// Composite: Select Primitives
type DropdownProps = {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  label: string;
};

function CustomDropdown({ value, onChange, options, placeholder, label }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Dismiss handler: click outside bounds
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const selected = value || placeholder;
  const isDefault = !value;

  return (
    <div className="mb-3" ref={ref}>
      <label className="block text-[0.65rem] font-extrabold text-[#4A3320] mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`w-full flex items-center justify-between px-3 py-2 bg-[#F5EFE6] border-2 rounded-xl text-[0.8rem] font-semibold text-left transition-all duration-200 outline-none ${
            open
              ? "border-[#C89F6B] bg-white shadow-[0_0_0_3px_rgba(200,159,107,0.15)]"
              : "border-transparent hover:border-[#E6C8A1]"
          } ${isDefault ? "text-[#2B1D14]/40" : "text-[#2B1D14]"}`}
        >
          <span className="truncate pr-2">{selected}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C89F6B"
            strokeWidth="2.5"
            className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>


        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E6C8A1] rounded-2xl shadow-[0_20px_40px_rgba(43,29,20,0.15)] z-[100] overflow-hidden">

            <button
              type="button"
              onClick={() => { onChange(""); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-[0.73rem] font-semibold transition-colors flex items-center gap-2 ${
                !value
                  ? "bg-[#4A3320] text-white"
                  : "text-[#8b6a4a] hover:bg-[#F5EFE6] hover:text-[#4A3320]"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${!value ? "bg-[#C89F6B]" : "bg-transparent"}`} />
              {placeholder}
            </button>

            <div className="max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(74,51,32,0.2)] scrollbar-track-transparent divide-y divide-black/[0.04]">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-[0.73rem] font-semibold transition-colors flex items-center gap-2 ${
                    value === opt
                      ? "bg-[#F5EFE6] text-[#4A3320] font-extrabold"
                      : "text-[#2B1D14] hover:bg-[#F5EFE6] hover:text-[#4A3320]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${value === opt ? "bg-[#C89F6B]" : "bg-transparent"}`} />
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Feature: Filtering Interface
type FilterPanelProps = {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isPanelOpen: boolean;
  onTogglePanel: () => void;
  stats: {
    total: number;
    conExamen: number;
    sinExamen: number;
  };
  municipios: string[];
  instituciones: string[];
};

export default function FilterPanel({
  filters,
  onFiltersChange,
  isPanelOpen,
  onTogglePanel,
  stats,
  municipios,
  instituciones,
}: FilterPanelProps) {
  const { total, conExamen, sinExamen } = stats;
  const wExam = total === 0 ? 50 : (conExamen / total) * 100;
  const wNoExam = total === 0 ? 50 : (sinExamen / total) * 100;

  // Exit animation lifecycle hook
  const [shouldRender, setShouldRender] = useState(isPanelOpen);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isPanelOpen) {
      setShouldRender(true);
      // Force mount pipeline align to trigger entrance transform
      const raf = requestAnimationFrame(() => setAnimateIn(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setAnimateIn(false);
      // Post-exit DOM detachment
      const t = setTimeout(() => setShouldRender(false), 420);
      return () => clearTimeout(t);
    }
  }, [isPanelOpen]);

  return (
    <div className={`absolute top-6 left-6 max-lg:left-auto max-lg:right-6 w-[300px] max-lg:w-auto max-w-[calc(100vw-48px)] flex flex-col max-lg:items-end ${isPanelOpen ? "z-[1000]" : "z-[500]"}`}>

      <div
        onClick={onTogglePanel}
        className="w-fit bg-white/90 backdrop-blur-xl border-2 border-white px-5 py-3 rounded-full shadow-[0_20px_50px_rgba(43,29,20,0.12)] cursor-pointer flex justify-between items-center font-bold text-[0.95rem] text-[#4A3320] transition-all hover:shadow-[0_20px_50px_rgba(200,159,107,0.2)] hover:-translate-y-0.5 active:scale-[0.98] group gap-3"
      >
        <span className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#C89F6B]">
            <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
          </svg>
          <span>Filtros</span>
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`text-[#C89F6B] transition-transform duration-300 ${isPanelOpen ? "rotate-180" : ""}`}
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </div>


      {shouldRender && (
        <div
          className={`w-full max-lg:w-[280px] mt-2 transition-all duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top max-lg:origin-top-right ${
            animateIn
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-3 scale-95"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-3xl border-2 border-white rounded-[24px] p-5 max-lg:p-4 max-h-[70vh] max-lg:max-h-[60vh] overflow-y-auto overflow-x-visible scrollbar-thin scrollbar-thumb-[rgba(74,51,32,0.2)] scrollbar-track-transparent shadow-[0_30px_60px_rgba(43,29,20,0.15)]">

        <div className="bg-gradient-to-br from-[#4A3320] to-[#2B1D14] p-4 rounded-2xl text-white mb-4 shadow-inner relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#C89F6B] rounded-full opacity-20 blur-xl pointer-events-none" />
          <div className="text-[0.6rem] uppercase tracking-[0.15em] opacity-80 mb-1 font-bold text-[#C89F6B]">
            Opciones
          </div>
          <div className="text-[2rem] font-black text-white leading-none mb-3 tracking-tight">{total}</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2 flex relative z-10">
            <div className="h-full bg-[#C89F6B] transition-all duration-500" style={{ width: `${wExam}%` }} />
            <div className="h-full bg-[#F5EFE6] transition-all duration-500" style={{ width: `${wNoExam}%` }} />
          </div>
          <div className="flex justify-between text-[0.65rem] font-bold text-white/90 relative z-10">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89F6B]" /> Examen ({conExamen})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5EFE6]" /> Sin Ex. ({sinExamen})
            </span>
          </div>
        </div>


        <div className="mb-4">
          <label className="block text-[0.65rem] font-extrabold text-[#4A3320] mb-1.5 uppercase tracking-wide">
            Clave Institucional
          </label>
          <input
            type="text"
            value={filters.clave}
            onChange={(e) => onFiltersChange({ ...filters, clave: e.target.value })}
            placeholder="Ej. A301087"
            className="w-full p-2.5 px-3.5 bg-[#F5EFE6] border-2 border-transparent rounded-xl text-[0.85rem] font-semibold text-[#2B1D14] placeholder:text-[#2B1D14]/40 outline-none transition-all focus:bg-white focus:border-[#C89F6B] focus:shadow-[0_0_0_4px_rgba(200,159,107,0.15)]"
          />
        </div>


        <CustomDropdown
          label="Municipio"
          value={filters.municipio}
          onChange={(val) => onFiltersChange({ ...filters, municipio: val })}
          options={municipios}
          placeholder="Todo el Estado"
        />


        <CustomDropdown
          label="Institución"
          value={filters.institucion}
          onChange={(val) => onFiltersChange({ ...filters, institucion: val })}
          options={instituciones}
          placeholder="Cualquier Institución"
        />


        <button
          onClick={() => onFiltersChange({ clave: "", municipio: "", institucion: "" })}
          className="w-full p-2.5 text-[0.85rem] rounded-xl font-bold bg-[#F5EFE6] text-[#8b6a4a] transition-all hover:bg-[#e8dfd1] hover:text-[#4A3320]"
        >
          Limpiar filtros
        </button>
          </div>
        </div>
      )}
    </div>
  );
}
