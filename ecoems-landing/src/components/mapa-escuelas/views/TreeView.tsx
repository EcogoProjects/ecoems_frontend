"use client";

import { useMemo, useState } from "react";
import type { Escuela } from "../types";

const MAX_SCHOOLS_PER_INST = 20;

type TreeViewProps = {
  schools: Escuela[];
  onSchoolClick: (school: Escuela) => void;
  onViewInMap: (lat: number | null, lng: number | null, clave: string) => void;
  isActive: boolean;
};

export default function TreeView({ schools, onSchoolClick, onViewInMap, isActive }: TreeViewProps) {
  // H-index adjacency mapping
  const treeData = useMemo(() => {
    const grouped: Record<string, Record<string, Escuela[]>> = {};
    schools.forEach((e) => {
      if (!grouped[e.municipio]) grouped[e.municipio] = {};
      if (!grouped[e.municipio][e.institucion]) grouped[e.municipio][e.institucion] = [];
      grouped[e.municipio][e.institucion].push(e);
    });
    return grouped;
  }, [schools]);

  // Visibility state for heavy nodes
  const [expandedInsts, setExpandedInsts] = useState<Set<string>>(new Set());

  const toggleExpanded = (key: string) => {
    setExpandedInsts((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full transition-all duration-500 bg-[#F5EFE6] scrollbar-thin scrollbar-thumb-[rgba(74,51,32,0.2)] scrollbar-track-transparent overflow-y-auto pt-[120px] pb-10 px-6 md:px-10 ${
        isActive ? "opacity-100 z-[3] translate-y-0" : "opacity-0 z-[1] translate-y-5 pointer-events-none"
      }`}
    >
      <div className="max-w-[900px] mx-auto bg-white rounded-[24px] p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
        {Object.keys(treeData)
          .sort()
          .map((muni) => {
            const insts = treeData[muni];
            const totalMuni = Object.values(insts).reduce((acc, curr) => acc + curr.length, 0);

            return (
              <details key={muni} className="mb-3 group/muni">
                <summary className="list-none p-4 md:px-6 md:py-4 bg-[#fdfbf9] border border-black/5 rounded-2xl text-[1.1rem] md:text-[1.2rem] font-extrabold cursor-pointer flex justify-between items-center transition-all text-[#2B1D14] hover:border-[#E6C8A1] hover:shadow-sm group-open/muni:bg-[#4A3320] group-open/muni:text-white group-open/muni:border-[#4A3320] group-open/muni:rounded-b-none active:scale-[0.99]">
                  <span className="flex items-center gap-2.5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="opacity-80 group-open/muni:opacity-100"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {muni}
                  </span>
                  <span className="font-normal text-[0.9rem] opacity-80">{totalMuni} escuelas</span>
                </summary>

                <div className="p-5 border border-t-0 border-black/5 rounded-b-2xl bg-white space-y-2">
                  {Object.keys(insts)
                    .sort()
                    .map((inst) => {
                      const allSchools = insts[inst];
                      const instKey = `${muni}::${inst}`;
                      const isExpanded = expandedInsts.has(instKey);
                      const visibleSchools =
                        allSchools.length > MAX_SCHOOLS_PER_INST && !isExpanded
                          ? allSchools.slice(0, MAX_SCHOOLS_PER_INST)
                          : allSchools;
                      const hasMore = allSchools.length > MAX_SCHOOLS_PER_INST && !isExpanded;

                      return (
                        <details key={inst} className="group/inst">
                          <summary className="list-none px-4 py-3 bg-[#f8f5f0] rounded-xl font-bold cursor-pointer text-[#4A3320] text-[1rem] transition-all flex justify-between items-center group-open/inst:bg-[#E6C8A1] group-open/inst:text-[#2B1D14] group-open/inst:rounded-b-none active:scale-[0.99]">
                            <span className="flex items-center gap-2">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                className="transition-transform duration-300 group-open/inst:rotate-90"
                              >
                                <path d="M9 5l7 7-7 7" />
                              </svg>
                              {inst}{" "}
                              <span className="opacity-60 text-[0.8rem] ml-1">({allSchools.length})</span>
                            </span>
                          </summary>

                          <div className="p-3 md:px-4 md:py-3 bg-[#faf9f7] rounded-b-xl flex flex-col gap-2">
                            {visibleSchools.map((e) => (
                              <div
                                key={e.clave}
                                onClick={() => onSchoolClick(e)}
                                className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white rounded-lg border border-black/5 hover:border-[#C89F6B] gap-3 md:gap-0 transition-colors cursor-pointer group/item"
                              >
                                <div className="flex-1">
                                  <span className="font-extrabold text-[#C89F6B] text-[0.85rem] mr-2">
                                    {e.clave}
                                  </span>
                                  <span className="font-bold text-[#2B1D14] text-[0.95rem] mr-2">
                                    {e.nombre}
                                  </span>
                                  <span className="text-[0.75rem] text-[#8b6a4a] block md:inline mt-1 md:mt-0">
                                    {e.tipoParticipacion}
                                  </span>
                                </div>
                                <button
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    onViewInMap(e.lat, e.lng, e.clave);
                                  }}
                                  className="bg-white border border-[#E6C8A1] text-[#4A3320] px-3 py-1.5 rounded-lg text-[0.8rem] font-bold transition-all hover:bg-[#C89F6B] hover:text-white w-fit active:scale-95 group-hover/item:border-[#C89F6B]"
                                >
                                  Mapa
                                </button>
                              </div>
                            ))}

                            {hasMore && (
                              <button
                                onClick={() => toggleExpanded(instKey)}
                                className="self-center mt-1 px-4 py-2 rounded-lg text-[0.8rem] font-bold text-[#C89F6B] bg-[#F5EFE6] hover:bg-[#E6C8A1] hover:text-[#2B1D14] transition-colors"
                              >
                                Ver {allSchools.length - MAX_SCHOOLS_PER_INST} más...
                              </button>
                            )}
                          </div>
                        </details>
                      );
                    })}
                </div>
              </details>
            );
          })}
      </div>
    </div>
  );
}
