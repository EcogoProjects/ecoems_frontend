"use client";

import type { Escuela } from "../types";

type TableViewProps = {
  schools: Escuela[];
  visibleCount: number;
  onLoadMore: () => void;
  onSchoolClick: (school: Escuela) => void;
  onViewInMap: (lat: number | null, lng: number | null, clave: string) => void;
  isActive: boolean;
};

export default function TableView({
  schools,
  visibleCount,
  onLoadMore,
  onSchoolClick,
  onViewInMap,
  isActive,
}: TableViewProps) {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 200) {
      if (visibleCount < schools.length) onLoadMore();
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className={`absolute inset-0 w-full h-full transition-all duration-500 bg-[#F5EFE6] scrollbar-thin scrollbar-thumb-[rgba(74,51,32,0.2)] scrollbar-track-transparent overflow-y-auto pt-[120px] pb-10 px-6 md:px-10 ${
        isActive ? "opacity-100 z-[3] translate-y-0" : "opacity-0 z-[1] translate-y-5 pointer-events-none"
      }`}
    >
      <div className="w-full overflow-x-auto pb-5">
        <div className="inline-block min-w-full align-middle">
          <div className="bg-transparent">
            <table className="w-full min-w-[950px] border-separate border-spacing-y-3">
              <thead>
                <tr>
                  {[
                    { key: "clave", label: "Clave" },
                    { key: "nombre", label: "Nombre" },
                    { key: "institucion", label: "Institución" },
                    { key: "municipio", label: "Municipio" },
                    { key: "tipoParticipacion", label: "Participación" },
                  ].map((col, index) => (
                    <th
                      key={col.key}
                      className={`bg-[#4A3320] text-white py-3.5 px-5 font-bold text-[0.75rem] uppercase tracking-[0.15em] text-left sticky top-0 z-10 shadow-md ${
                        index === 0 ? "rounded-l-full pl-6" : ""
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="bg-[#4A3320] text-white py-3.5 px-5 font-bold text-[0.75rem] uppercase tracking-[0.15em] text-center sticky top-0 z-10 rounded-r-full pr-6 shadow-md">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {schools.slice(0, visibleCount).map((e) => (
                  <tr
                    key={e.clave}
                    onClick={() => onSchoolClick(e)}
                    className="bg-white shadow-[0_5px_15px_rgba(43,29,20,0.03)] hover:shadow-[0_15px_30px_rgba(200,159,107,0.15)] transition-all duration-300 group cursor-pointer relative"
                  >
                    <td className="p-4 pl-6 rounded-l-[20px] relative">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E6C8A1] rounded-l-[20px] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="inline-block bg-[#F5EFE6] text-[#C89F6B] px-3 py-1.5 rounded-[8px] text-[0.75rem] font-extrabold tracking-widest">
                        {e.clave}
                      </span>
                    </td>
                    <td className="p-4 px-5 text-[0.95rem] font-extrabold text-[#2B1D14] leading-tight group-hover:text-[#4A3320] transition-colors">
                      {e.nombre}
                    </td>
                    <td className="p-4 px-5 text-[0.85rem] font-bold text-[#8b6a4a]">{e.institucion}</td>
                    <td className="p-4 px-5 text-[0.85rem] font-bold text-[#8b6a4a]">{e.municipio}</td>
                    <td className="p-4 px-5">
                      <span
                        className={`inline-block px-3 py-1.5 rounded-[8px] text-[0.7rem] font-bold tracking-wide ${
                          e.tipoParticipacion === "Con Examen"
                            ? "bg-[#C89F6B]/15 text-[#C89F6B]"
                            : "bg-[#4A3320]/5 text-[#4A3320]"
                        }`}
                      >
                        {e.tipoParticipacion}
                      </span>
                    </td>
                    <td className="p-4 pr-6 rounded-r-[20px] text-center">
                      <button
                        onClick={(ev) => {
                          ev.stopPropagation();
                          onViewInMap(e.lat, e.lng, e.clave);
                        }}
                        className="bg-white border border-[#E6C8A1] text-[#4A3320] px-4 py-2 rounded-[10px] text-[0.75rem] font-extrabold transition-all hover:bg-[#C89F6B] hover:text-white hover:shadow-[0_5px_15px_rgba(200,159,107,0.25)] whitespace-nowrap flex items-center justify-center gap-1.5 mx-auto active:scale-[0.95]"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
                        </svg>
                        Mapa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {visibleCount < schools.length && (
        <div className="w-full flex justify-center mt-2">
          <div className="w-8 h-8 border-4 border-[#E6C8A1] border-t-[#C89F6B] rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
