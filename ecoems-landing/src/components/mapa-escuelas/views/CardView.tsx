"use client";

import type { Escuela } from "../types";

type CardViewProps = {
  schools: Escuela[];
  visibleCount: number;
  onLoadMore: () => void;
  onSchoolClick: (school: Escuela) => void;
  onViewInMap: (lat: number | null, lng: number | null, clave: string) => void;
  isActive: boolean;
};

export default function CardView({
  schools,
  visibleCount,
  onLoadMore,
  onSchoolClick,
  onViewInMap,
  isActive,
}: CardViewProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {schools.slice(0, visibleCount).map((e) => (
          <div
            key={e.clave}
            onClick={() => onSchoolClick(e)}
            className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(74,51,32,0.12)] hover:border-[#E6C8A1] group relative overflow-hidden cursor-pointer"
          >
            {/* Línea decorativa superior */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#C89F6B] to-[#4A3320] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex justify-between items-start mb-3">
              <div className="inline-block bg-[#F5EFE6] text-[#C89F6B] px-2.5 py-1 rounded-md text-[0.65rem] font-extrabold tracking-widest">
                {e.clave}
              </div>
              <div className="text-[0.65rem] font-bold text-[#8b6a4a] uppercase bg-black/5 px-2 py-1 rounded-md">
                {e.tipoParticipacion}
              </div>
            </div>

            <div className="text-[1.15rem] font-extrabold text-[#2B1D14] leading-[1.2] mb-4 flex-1 group-hover:text-[#4A3320] transition-colors">
              {e.nombre}
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <div className="flex items-center gap-2.5 text-[0.8rem] text-[#8b6a4a] font-semibold">
                <div className="w-6 h-6 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#C89F6B]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                {e.municipio}
              </div>
              <div className="flex items-center gap-2.5 text-[0.8rem] text-[#8b6a4a] font-semibold">
                <div className="w-6 h-6 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#C89F6B]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  </svg>
                </div>
                {e.institucion}
              </div>
            </div>

            <button
              onClick={(ev) => {
                ev.stopPropagation();
                onViewInMap(e.lat, e.lng, e.clave);
              }}
              className="w-full bg-white border-2 border-[#E6C8A1] text-[#4A3320] text-center p-3 rounded-xl font-bold transition-all hover:bg-[#C89F6B] hover:border-[#C89F6B] hover:text-white flex justify-center items-center gap-2 hover:shadow-[0_10px_20px_rgba(200,159,107,0.2)] active:scale-[0.98]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
              </svg>
              Trazar en Mapa
            </button>
          </div>
        ))}
      </div>

      {visibleCount < schools.length && (
        <div className="w-full flex justify-center mt-8">
          <div className="w-8 h-8 border-4 border-[#E6C8A1] border-t-[#C89F6B] rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
