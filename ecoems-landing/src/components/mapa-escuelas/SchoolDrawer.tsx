"use client";

import type { Escuela } from "./types";
import { DRAWER_BG } from "./constants";

type SchoolDrawerProps = {
  isOpen: boolean;
  schools: Escuela[];
  onClose: () => void;
};

export default function SchoolDrawer({ isOpen, schools, onClose }: SchoolDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#2B1D14]/40 backdrop-blur-sm z-[1001] transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 w-[400px] max-w-full h-full bg-[#F5EFE6] z-[1002] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.15)] transition-transform duration-500 max-lg:h-[85%] max-lg:top-auto max-lg:bottom-0 max-lg:rounded-t-3xl ${
          isOpen
            ? "translate-x-0 max-lg:translate-y-0"
            : "translate-x-full max-lg:translate-x-0 max-lg:translate-y-full"
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white border-none cursor-pointer text-lg z-10 hover:bg-white/30 transition-colors"
        >
          ✕
        </button>

        {schools.length === 1 ? (
          <SingleSchoolContent school={schools[0]} />
        ) : schools.length > 1 ? (
          <MultiSchoolContent schools={schools} />
        ) : null}
      </div>
    </>
  );
}

// Subview: Atomic details
function SingleSchoolContent({ school }: { school: Escuela }) {
  return (
    <>
      <div className="relative pt-[30px] pb-[20px] px-6 text-white" style={{ background: DRAWER_BG }}>
        <div className="inline-block bg-[#C89F6B] text-[#2B1D14] px-2.5 py-1 rounded-md text-[0.65rem] font-extrabold mb-2 mr-8">
          {school.clave}
        </div>
        <div className="text-[1.25rem] font-extrabold leading-tight pr-2">{school.nombre}</div>
      </div>

      <div className="p-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-[rgba(74,51,32,0.2)] scrollbar-track-transparent">
        <div className="bg-white p-3 md:p-4 rounded-xl mb-3 border border-black/5">
          <label className="block text-[0.65rem] text-[#8b6a4a] uppercase font-bold mb-1">Institución</label>
          <span className="block text-[0.95rem] font-semibold text-[#2B1D14]">{school.institucion}</span>
        </div>

        <div className="bg-white p-3 md:p-4 rounded-xl mb-3 border border-black/5">
          <label className="block text-[0.65rem] text-[#8b6a4a] uppercase font-bold mb-1">Ubicación</label>
          <span className="block text-[0.95rem] font-semibold text-[#2B1D14]">
            {school.direccion}, {school.municipio}
          </span>
        </div>

        <div className="bg-white p-3 md:p-4 rounded-xl mb-3 border border-black/5 border-l-4 !border-l-[#C89F6B]">
          <label className="block text-[0.65rem] text-[#8b6a4a] uppercase font-bold mb-1">
            Tipo de Participación
          </label>
          <span className="block text-[0.95rem] font-semibold text-[#2B1D14]">{school.tipoParticipacion}</span>
        </div>

        {school.especialidad && (
          <div className="bg-white p-3 md:p-4 rounded-xl mb-3 border border-black/5">
            <label className="block text-[0.65rem] text-[#8b6a4a] uppercase font-bold mb-1">Especialidad</label>
            <span className="block text-[0.95rem] font-semibold text-[#2B1D14]">{school.especialidad}</span>
          </div>
        )}

        <a
          href={`https://www.google.com/maps?q=${school.lat},${school.lng}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex items-center justify-center gap-2 w-full bg-white text-[#4A3320] border-2 border-[#E6C8A1] p-4 rounded-2xl font-extrabold text-[1.1rem] no-underline transition-all shadow-[0_10px_20px_rgba(200,159,107,0.15)] hover:bg-[#C89F6B] hover:text-white hover:border-[#C89F6B] hover:-translate-y-1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Trazar Ruta en Maps
        </a>
      </div>
    </>
  );
}

// Subview: Cluster enumeration
function MultiSchoolContent({ schools }: { schools: Escuela[] }) {
  return (
    <>
      <div className="relative pt-[30px] pb-[30px] px-6 text-white" style={{ background: DRAWER_BG }}>
        <div className="inline-block bg-white text-[#4A3320] px-2.5 py-1 rounded-md text-[0.65rem] font-extrabold mb-2">
          Multi-Escuela
        </div>
        <div className="text-[1.5rem] font-extrabold leading-tight mt-2">
          {schools.length} Escuelas en esta ubicación
        </div>
      </div>

      <div className="p-6 overflow-y-auto flex-1 bg-[#f8f5f0] scrollbar-thin scrollbar-thumb-[rgba(74,51,32,0.2)] scrollbar-track-transparent">
        {schools.map((school) => (
          <div
            key={school.clave}
            className="bg-white p-4 rounded-2xl mb-4 border border-black/5 shadow-[0_4px_15px_rgba(0,0,0,0.02)]"
          >
            <div className="inline-block bg-[#C89F6B] text-[#2B1D14] px-2.5 py-1 rounded-md text-[0.65rem] font-extrabold mb-2">
              {school.clave}
            </div>
            <div className="text-[1.1rem] font-extrabold text-[#2B1D14] leading-tight mb-3">{school.nombre}</div>
            <div className="text-[0.85rem] text-[#4A3320] mb-1 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#C89F6B] shrink-0">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
              </svg>
              <strong>Institución:</strong> {school.institucion}
            </div>
            <div className="text-[0.85rem] text-[#4A3320] mb-3 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#C89F6B] shrink-0">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zM13 9V3.5L18.5 9H13z" />
              </svg>
              <strong>Participación:</strong> {school.tipoParticipacion}
            </div>
            <a
              href={`https://www.google.com/maps?q=${school.lat},${school.lng}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#F5EFE6] text-[#4A3320] border border-[#E6C8A1] p-3 rounded-xl font-bold text-[0.95rem] transition-colors hover:bg-[#4A3320] hover:text-white hover:border-[#4A3320]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Ver Ruta
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
