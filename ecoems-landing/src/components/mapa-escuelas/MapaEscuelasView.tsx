"use client";

import { useEffect, useState, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import type { Escuela, ViewMode, FilterState } from "./types";
import { PAGINATION_STEP } from "./constants";
import { useLeafletMap } from "./hooks/useLeafletMap";
import ViewToggle from "./ViewToggle";
import FilterPanel from "./FilterPanel";
import SchoolDrawer from "./SchoolDrawer";
import CardView from "./views/CardView";
import TableView from "./views/TableView";
import TreeView from "./views/TreeView";

// Contract export
export type { Escuela };

export default function MapaEscuelasView({ escuelas }: { escuelas: Escuela[] }) {
  // State orchestration
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSchools, setDrawerSchools] = useState<Escuela[]>([]);
  const [mapFocus, setMapFocus] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ clave: "", municipio: "", institucion: "" });
  const [visibleCount, setVisibleCount] = useState(PAGINATION_STEP);
  const [isMapLocked, setIsMapLocked] = useState(false);

  // Purge pagination stale-state
  useEffect(() => {
    setVisibleCount(PAGINATION_STEP);
  }, [filters.clave, filters.municipio, filters.institucion, viewMode]);

  // Memoized derivations
  const filteredSchools = useMemo(() => {
    return escuelas.filter(
      (e) =>
        (!filters.clave || e.clave.toLowerCase().includes(filters.clave.toLowerCase())) &&
        (!filters.municipio || e.municipio === filters.municipio) &&
        (!filters.institucion || e.institucion === filters.institucion)
    );
  }, [escuelas, filters]);

  const municipios = useMemo(() => [...new Set(escuelas.map((e) => e.municipio))].sort(), [escuelas]);
  const instituciones = useMemo(() => [...new Set(escuelas.map((e) => e.institucion))].sort(), [escuelas]);

  const totalFiltered = filteredSchools.length;
  const conExamen = filteredSchools.filter((e) => e.tipoParticipacion === "Con Examen").length;
  const sinExamen = filteredSchools.filter((e) => e.tipoParticipacion === "Sin Examen").length;

  // Imperative hook decouple
  const { mapElementRef, openDrawer, closeDrawer, viewInMap, setMapInteraction } = useLeafletMap(
    filteredSchools,
    escuelas,
    {
      onDrawerOpen: (schools) => {
        setDrawerSchools(schools);
        setIsDrawerOpen(true);
      },
      onDrawerClose: () => {
        setIsDrawerOpen(false);
        setTimeout(() => setDrawerSchools([]), 300);
      },
      onMapFocus: setMapFocus,
      onViewModeChange: setViewMode,
    }
  );

  // Performance mount deferment
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      const timer = setTimeout(() => setIsPanelOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Interactivity sync
  useEffect(() => {
    setMapInteraction(!isMapLocked);
  }, [isMapLocked, setMapInteraction]);

  // Event callbacks
  const handleSchoolClick = (school: Escuela) => openDrawer(school);
  const handleLoadMore = () => setVisibleCount((v) => v + PAGINATION_STEP);
  const handleCloseDrawer = () => closeDrawer();

  return (
    <section className="relative w-full overflow-x-clip font-['Outfit']">
      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Decor flow decoupling */}
      <div className="pointer-events-none absolute -left-16 -top-10 z-0 opacity-[0.08] mix-blend-multiply md:-left-24 md:-top-16">
        <div className="h-[250px] w-[250px] rounded-full bg-[#C89F6B] md:h-[400px] md:w-[400px]" />
      </div>
      <div className="pointer-events-none absolute -bottom-10 -right-20 z-0 opacity-[0.06] md:-bottom-20 md:-right-32">
        <div className="h-[350px] w-[350px] rounded-full bg-[#4A3320] md:h-[600px] md:w-[600px]" />
      </div>
      <div className="pointer-events-none absolute bottom-10 left-4 z-0 opacity-30 md:bottom-20 md:left-12">
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-[spin_60s_linear_infinite] md:w-[200px] md:h-[200px]"
        >
          <circle cx="75" cy="75" r="70" stroke="#C89F6B" strokeWidth="2" strokeDasharray="10 10" />
          <circle cx="75" cy="75" r="45" stroke="#4A3320" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-10 top-20 z-0 opacity-[0.15] md:right-24 md:top-12">
        <div className="h-32 w-32 rounded-full bg-[#C89F6B] md:h-56 md:w-56" />
      </div>

      {/* Layout root */}
      <div className="relative z-10 w-full h-[75vh] min-h-[600px] max-h-[850px] overflow-hidden bg-[#F5EFE6] text-[#2B1D14] rounded-[2rem] border-4 sm:border-8 border-white shadow-[0_20px_60px_rgba(43,29,20,0.12)] flex">
        {/* View orchestration */}
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

        {/* Touch trap barrier toggle */}
        {viewMode === "map" && (
          <button
            onClick={() => setIsMapLocked(!isMapLocked)}
            title={isMapLocked ? "Desbloquear mapa" : "Bloquear mapa"}
            className={`absolute bottom-[100px] right-4 z-[1000] w-[50px] h-[50px] rounded-full shadow-[0_20px_50px_rgba(43,29,20,0.12)] flex items-center justify-center transition-all duration-300 lg:hidden ${
              isMapLocked ? "bg-[#4A3320] text-white" : "bg-white text-[#C89F6B]"
            }`}
          >
            {isMapLocked ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
              </svg>
            )}
          </button>
        )}

        {/* Map instance mount */}
        <div className={`absolute inset-0 w-full h-full transition-all duration-500 z-0 ${mapFocus ? "map-focus" : ""}`}>
          <div ref={mapElementRef} className="w-full h-full bg-[#E4DFD6] touch-manipulation" />
        </div>

        {/* View fallback: List */}
        <CardView
          schools={filteredSchools}
          visibleCount={visibleCount}
          onLoadMore={handleLoadMore}
          onSchoolClick={handleSchoolClick}
          onViewInMap={viewInMap}
          isActive={viewMode === "list"}
        />

        {/* View fallback: Grid */}
        <TableView
          schools={filteredSchools}
          visibleCount={visibleCount}
          onLoadMore={handleLoadMore}
          onSchoolClick={handleSchoolClick}
          onViewInMap={viewInMap}
          isActive={viewMode === "table"}
        />

        {/* View fallback: Graph */}
        <TreeView
          schools={filteredSchools}
          onSchoolClick={handleSchoolClick}
          onViewInMap={viewInMap}
          isActive={viewMode === "tree"}
        />

        {/* Query Orchestrator */}
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          isPanelOpen={isPanelOpen}
          onTogglePanel={() => setIsPanelOpen(!isPanelOpen)}
          stats={{ total: totalFiltered, conExamen, sinExamen }}
          municipios={municipios}
          instituciones={instituciones}
        />

        {/* Detail inspector */}
        <SchoolDrawer isOpen={isDrawerOpen} schools={drawerSchools} onClose={handleCloseDrawer} />
      </div>
      </div>
    </section>
  );
}
