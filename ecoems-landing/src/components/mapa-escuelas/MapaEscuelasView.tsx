"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// --- TIPOS ---
export type Escuela = {
  id: number;
  nombre: string;
  lat: number | null;
  lng: number | null;
  direccion: string;
  especialidad: string;
  clave: string;
  institucion: string;
  institucionLogo: string;
  municipio: string;
  conAccesibilidad: boolean;
  ubicacionAproximada: boolean;
  distancia: number | null;
  tipoParticipacion: string;
  infraestructura: string;
};

// --- ESTILOS COMPLEJOS Y ANIMACIONES LEAFLET ---
const CUSTOM_STYLES = `
  /* Pines Animados */
  .pulse-pin { position: relative; width: 24px; height: 24px; }
  .pulse-core { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: #4A3320; border: 3px solid #FFFFFF; border-radius: 50%; z-index: 2; }
  .pulse-ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; border-radius: 50%; background: #C89F6B; z-index: 1; animation: pulse-anim 2s infinite cubic-bezier(0.4, 0, 0.2, 1); }
  @keyframes pulse-anim { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; } 100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; } }

  /* Efecto Araña */
  path.leaflet-spider-leg {
      stroke: #C89F6B !important;
      stroke-width: 2.5px !important;
      stroke-opacity: 0.8 !important;
      stroke-dasharray: 8 6 !important;
      animation: dash-flow 1.5s linear infinite !important;
  }
  @keyframes dash-flow {
      from { stroke-dashoffset: 28; }
      to { stroke-dashoffset: 0; }
  }

  /* Enfoque Cinemático */
  .map-focus .leaflet-tile-pane {
      filter: grayscale(0.6) brightness(0.7) contrast(1.2);
  }
  .leaflet-tile-pane {
      transition: filter 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  /* Radar */
  .radar-pulse-circle {
      animation: radar-anim 3s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes radar-anim {
      0% { fill-opacity: 0.05; stroke-opacity: 0.2; transform: scale(0.98); transform-origin: center; }
      100% { fill-opacity: 0.15; stroke-opacity: 0.8; transform: scale(1.02); transform-origin: center; }
  }

  /* Scrollbar personalizado */
  .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(74, 51, 32, 0.2); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(74, 51, 32, 0.4); }

  /* Ocultar el triangulito de <details> nativo en safari/chrome */
  details > summary::-webkit-details-marker {
    display: none;
  }

  /* Ajustar z-index del contenedor de Leaflet a 0 para no romper UI */
  .leaflet-container { z-index: 0 !important; font-family: 'Outfit', sans-serif; }
  
  /* Ajuste botones de zoom */
  .leaflet-control-zoom { border: none !important; box-shadow: 0 10px 20px rgba(43,29,20,0.1) !important; }
  .leaflet-control-zoom a { color: #4A3320 !important; border: 1px solid rgba(0,0,0,0.05) !important; }
`;

const DRAWER_BG = "url('data:image/svg+xml;utf8,%3Csvg width=%22400%22 height=%22200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%234A3320%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%22150%22 fill=%22%23C89F6B%22 opacity=%220.1%22/%3E%3Ccircle cx=%22350%22 cy=%22150%22 r=%22100%22 fill=%22%232B1D14%22 opacity=%220.3%22/%3E%3C/svg%3E') center/cover";

export default function MapaEscuelasView({ escuelas }: { escuelas: Escuela[] }) {
  // --- ESTADO ---
  const [viewMode, setViewMode] = useState<"map" | "list" | "table" | "tree">("map");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSchools, setDrawerSchools] = useState<Escuela[]>([]);
  const [mapFocus, setMapFocus] = useState(false);

  // Filtros
  const [fClave, setFClave] = useState("");
  const [fMuni, setFMuni] = useState("");
  const [fInst, setFInst] = useState("");

  // Paginación (Para evitar congelamientos con miles de elementos)
  const [visibleCount, setVisibleCount] = useState(50);

  useEffect(() => {
    setVisibleCount(50);
  }, [fClave, fMuni, fInst, viewMode]);



  // --- REFERENCIAS ---
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const clusterGroupRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  const activeRadarRef = useRef<any>(null);

  // --- DATA COMPUTADA ---
  const filteredSchools = useMemo(() => {
    return escuelas.filter(
      (e) =>
        (!fClave || e.clave.toLowerCase().includes(fClave.toLowerCase())) &&
        (!fMuni || e.municipio === fMuni) &&
        (!fInst || e.institucion === fInst)
    );
  }, [escuelas, fClave, fMuni, fInst]);

  const municipiosDisponibles = useMemo(() => [...new Set(escuelas.map((e) => e.municipio))].sort(), [escuelas]);
  const institucionesDisponibles = useMemo(() => [...new Set(escuelas.map((e) => e.institucion))].sort(), [escuelas]);

  const totalFiltered = filteredSchools.length;
  const exam = filteredSchools.filter((e) => e.tipoParticipacion === "Con Examen").length;
  const noExam = filteredSchools.filter((e) => e.tipoParticipacion === "Sin Examen").length;
  const wExam = totalFiltered === 0 ? 50 : (exam / totalFiltered) * 100;
  const wNoExam = totalFiltered === 0 ? 50 : (noExam / totalFiltered) * 100;

  // --- INICIALIZACIÓN DE LEAFLET ---
  useEffect(() => {
    let cancelled = false;
    const initMap = async () => {
      try {
        const leafletModule = await import("leaflet");
        await import("leaflet.markercluster");

        const L = ((leafletModule as any).default ?? leafletModule) as any;
        if (cancelled || !mapElementRef.current || mapInstanceRef.current) return;

        leafletRef.current = L;

        const map = L.map(mapElementRef.current, { zoomControl: false }).setView([19.35, -99.6], 9);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png", {
          maxZoom: 19,
        }).addTo(map);

        L.control.zoom({ position: "bottomleft" }).addTo(map);

        const markerClusterGroup = L.markerClusterGroup({
          maxClusterRadius: 40,
          spiderfyOnMaxZoom: true,
          zoomToBoundsOnClick: false,
          spiderLegPolylineOptions: { weight: 2, color: "#C89F6B", opacity: 0.8 },
          polygonOptions: { fillColor: "#C89F6B", color: "#4A3320", weight: 2, opacity: 1, fillOpacity: 0.3 },
        });
        map.addLayer(markerClusterGroup);

        markerClusterGroup.on("clusterclick", function (a: any) {
          const bounds = a.layer.getBounds();
          const currentZoom = map.getZoom();
          const nextZoom = map.getBoundsZoom(bounds);

          if (nextZoom >= 18 || currentZoom >= 18 || bounds.getNorthEast().equals(bounds.getSouthWest())) {
            a.layer.spiderfy();
            const markers = a.layer.getAllChildMarkers();
            const schoolsInCluster = markers.map((m: any) => m.options.schoolData);
            openClusterDrawer(schoolsInCluster, map, L);
          } else {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 18 });
          }
        });

        mapInstanceRef.current = map;
        clusterGroupRef.current = markerClusterGroup;

        renderMarkers(filteredSchools, L, markerClusterGroup);

        setTimeout(() => setIsPanelOpen(true), 800);
      } catch (e) {
        console.error("Error cargando Leaflet", e);
      }
    };
    initMap();
    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Run once on mount

  // --- EFECTO: ACTUALIZAR MARCADORES AL FILTRAR ---
  useEffect(() => {
    if (leafletRef.current && clusterGroupRef.current) {
      renderMarkers(filteredSchools, leafletRef.current, clusterGroupRef.current);
    }
  }, [filteredSchools]);

  // --- LOGICA DE MAPA ---
  const renderMarkers = (data: Escuela[], L: any, cg: any) => {
    cg.clearLayers();
    data.forEach((e) => {
      if (!e.lat || !e.lng) return;
      const icon = L.divIcon({
        className: "",
        html: `<div class="pulse-pin"><div class="pulse-ring"></div><div class="pulse-core"></div></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const marker = L.marker([e.lat, e.lng], { icon, schoolData: e });
      marker.on("click", () => openDrawer(e, mapInstanceRef.current, L));
      cg.addLayer(marker);
    });
  };

  const drawRadar = (lat: number, lng: number, radius: number, map: any, L: any) => {
    if (activeRadarRef.current) map.removeLayer(activeRadarRef.current);
    activeRadarRef.current = L.circle([lat, lng], {
      color: "#C89F6B",
      fillColor: "#C89F6B",
      fillOpacity: 0.1,
      weight: 2,
      dashArray: "10, 15",
      className: "radar-pulse-circle",
      radius: radius,
    }).addTo(map);
  };

  const openDrawer = (school: Escuela, map = mapInstanceRef.current, L = leafletRef.current) => {
    setDrawerSchools([school]);
    setIsDrawerOpen(true);
    setMapFocus(true);
    if (!map || !L || !school.lat || !school.lng) return;

    drawRadar(school.lat, school.lng, 800, map, L);
    if (window.innerWidth > 900) {
      map.panTo([school.lat, school.lng]);
      map.panBy([-150, 0]);
    } else {
      map.panTo([school.lat, school.lng]);
    }
  };

  const openClusterDrawer = (schools: Escuela[], map = mapInstanceRef.current, L = leafletRef.current) => {
    setDrawerSchools(schools);
    setIsDrawerOpen(true);
    setMapFocus(true);
    const center = schools[0];
    if (!map || !L || !center.lat || !center.lng) return;

    drawRadar(center.lat, center.lng, 1500, map, L);
    if (window.innerWidth > 900) {
      map.panTo([center.lat, center.lng]);
      map.panBy([-150, 0]);
    } else {
      map.panTo([center.lat, center.lng]);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setMapFocus(false);
    if (activeRadarRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(activeRadarRef.current);
      activeRadarRef.current = null;
    }
    setTimeout(() => setDrawerSchools([]), 300);
  };

  const viewInMap = (lat: number | null, lng: number | null, clave: string) => {
    if (!lat || !lng) return;
    setViewMode("map");
    const map = mapInstanceRef.current;
    if (map) map.flyTo([lat, lng], 16, { duration: 1.5 });
    const school = escuelas.find((e) => e.clave === clave);
    if (school) setTimeout(() => openDrawer(school), 1500);
  };

  const geolocate = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const map = mapInstanceRef.current;
        const L = leafletRef.current;
        if (map && L) {
          map.flyTo([lat, lng], 13, { duration: 2 });
          L.marker([lat, lng], {
            icon: L.divIcon({
              className: "",
              html: '<div style="width:16px;height:16px;background:#2563eb;border:3px solid white;border-radius:50%;box-shadow:0 0 10px rgba(0,0,0,0.5);"></div>',
            }),
          })
            .addTo(map)
            .bindPopup("Tu ubicación aproximada")
            .openPopup();
        }
      });
    } else {
      alert("La geolocalización no está soportada por tu navegador.");
    }
  };

  // --- LOGICA DE VISTAS (ÁRBOL) ---

  const treeData = useMemo(() => {
    const grouped: Record<string, Record<string, Escuela[]>> = {};
    filteredSchools.forEach((e) => {
      if (!grouped[e.municipio]) grouped[e.municipio] = {};
      if (!grouped[e.municipio][e.institucion]) grouped[e.municipio][e.institucion] = [];
      grouped[e.municipio][e.institucion].push(e);
    });
    return grouped;
  }, [filteredSchools]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CUSTOM_STYLES }} />

      {/* Contenedor Principal (Workspace) */}
      <section className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12 font-['Outfit'] overflow-x-clip max-md:overflow-hidden">
        
        {/* --- DECORACIONES DE FONDO --- */}
        {/* Círculo relleno arriba izquierda */}
        <div className="pointer-events-none absolute -left-16 -top-10 z-0 opacity-[0.08] mix-blend-multiply md:-left-24 md:-top-16">
          <div className="h-[250px] w-[250px] rounded-full bg-[#C89F6B] md:h-[400px] md:w-[400px]" />
        </div>
        
        {/* Círculo sólido abajo derecha */}
        <div className="pointer-events-none absolute -bottom-10 -right-20 z-0 opacity-[0.06] md:-bottom-20 md:-right-32">
          <div className="h-[350px] w-[350px] rounded-full bg-[#4A3320] md:h-[600px] md:w-[600px]" />
        </div>
        
        {/* Anillos punteados abajo izquierda */}
        <div className="pointer-events-none absolute bottom-10 left-4 z-0 opacity-30 md:bottom-20 md:left-12">
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[spin_60s_linear_infinite] md:w-[200px] md:h-[200px]">
            <circle cx="75" cy="75" r="70" stroke="#C89F6B" strokeWidth="2" strokeDasharray="10 10" />
            <circle cx="75" cy="75" r="45" stroke="#4A3320" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
          </svg>
        </div>
        
        {/* Círculo relleno arriba derecha */}
        <div className="pointer-events-none absolute right-10 top-20 z-0 opacity-[0.15] md:right-24 md:top-12">
          <div className="h-32 w-32 rounded-full bg-[#C89F6B] md:h-56 md:w-56" />
        </div>

        {/* Contenedor Principal (Workspace) */}
        <div className="relative z-10 w-full h-[75vh] min-h-[600px] max-h-[850px] overflow-hidden bg-[#F5EFE6] text-[#2B1D14] rounded-[2rem] border-4 sm:border-8 border-white shadow-[0_20px_60px_rgba(43,29,20,0.12)] flex">

        {/* Toggle Vistas */}
        <div className="absolute top-6 right-6 z-[1000] max-lg:top-auto max-lg:bottom-6 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:right-auto">
          {/* Version Escritorio */}
          <div className="hidden lg:flex bg-white/85 backdrop-blur-md p-1.5 rounded-full gap-1 shadow-[0_20px_50px_rgba(43,29,20,0.12)] border border-white/60">
            {[
              { id: "map", label: "Mapa", icon: <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /> },
              { id: "list", label: "Tarjetas", icon: <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" /> },
              { id: "table", label: "Tabla", icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></>, stroke: true },
              { id: "tree", label: "Directorio", icon: <><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></>, stroke: true }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setViewMode(v.id as any)}
                className={`px-5 py-2.5 rounded-full border-none font-bold text-[0.95rem] cursor-pointer transition-all duration-300 flex items-center gap-2 whitespace-nowrap active:scale-95 ${viewMode === v.id ? "bg-[#4A3320] text-white shadow-[0_4px_15px_rgba(74,51,32,0.3)]" : "bg-transparent text-[#4A3320] hover:bg-black/5"}`}
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill={v.stroke ? "none" : "currentColor"} stroke={v.stroke ? "currentColor" : "none"} strokeWidth={v.stroke ? "2" : undefined}>
                  {v.icon}
                </svg>
                {v.label}
              </button>
            ))}
          </div>

          {/* Version Movil (Menu Desplegable) */}
          <details className="lg:hidden group/vistas relative">
            <summary className="list-none bg-[#4A3320] text-white px-6 py-3.5 rounded-full font-bold shadow-[0_10px_30px_rgba(43,29,20,0.3)] flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all hover:bg-[#2B1D14] border-2 border-transparent hover:border-[#C89F6B]/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <span>Vistas</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-open/vistas:-rotate-180"><path d="M6 9l6 6 6-6" /></svg>
            </summary>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white/95 backdrop-blur-xl border-2 border-white p-2 rounded-[24px] shadow-[0_20px_50px_rgba(43,29,20,0.2)] flex flex-col gap-1 w-[220px] opacity-0 pointer-events-none group-open/vistas:opacity-100 group-open/vistas:pointer-events-auto transition-all duration-300 origin-bottom">
              {[
                { id: "map", label: "Mapa", icon: <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /> },
                { id: "list", label: "Tarjetas", icon: <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" /> },
                { id: "table", label: "Tabla", icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></>, stroke: true },
                { id: "tree", label: "Directorio", icon: <><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></>, stroke: true }
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={(e) => { setViewMode(v.id as any); (e.target as HTMLElement).closest('details')?.removeAttribute('open'); }}
                  className={`w-full px-4 py-3 rounded-xl border-none font-bold text-[0.95rem] cursor-pointer transition-all duration-300 flex items-center gap-3 active:scale-95 ${viewMode === v.id ? "bg-[#F5EFE6] text-[#4A3320]" : "bg-transparent text-[#2B1D14] hover:bg-black/5"}`}
                >
                  <svg viewBox="0 0 24 24" className={`w-[18px] h-[18px] ${viewMode === v.id ? "text-[#C89F6B]" : "text-black/50"}`} fill={v.stroke ? "none" : "currentColor"} stroke={v.stroke ? "currentColor" : "none"} strokeWidth={v.stroke ? "2" : undefined}>
                    {v.icon}
                  </svg>
                  {v.label}
                </button>
              ))}
            </div>
          </details>
        </div>

        {/* Botón Geolocalización */}
        <button onClick={geolocate} title="Mi Ubicación" className="absolute bottom-6 right-6 z-[1000] bg-white text-[#4A3320] w-[50px] h-[50px] rounded-full shadow-[0_20px_50px_rgba(43,29,20,0.12)] flex items-center justify-center transition-all duration-300 hover:bg-[#C89F6B] hover:text-white hover:scale-110 max-lg:bottom-[100px] max-lg:right-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" /></svg>
        </button>

        {/* VISTA: MAPA */}
        <div className={`absolute inset-0 w-full h-full transition-all duration-500 z-0 ${mapFocus ? "map-focus" : ""}`}>
          <div ref={mapElementRef} className="w-full h-full bg-[#E4DFD6]" />
        </div>

        {/* VISTA: TARJETAS */}
        <div onScroll={(e) => {
          if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 200) {
            if (visibleCount < filteredSchools.length) setVisibleCount(v => v + 50);
          }
        }} className={`absolute inset-0 w-full h-full transition-all duration-500 bg-[#F5EFE6] custom-scrollbar overflow-y-auto pt-[120px] pb-10 px-6 md:px-10 ${viewMode === 'list' ? 'opacity-100 z-[3] translate-y-0' : 'opacity-0 z-[1] translate-y-5 pointer-events-none'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSchools.slice(0, visibleCount).map((e) => (
              <div key={e.clave} onClick={() => openDrawer(e)} className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(74,51,32,0.12)] hover:border-[#E6C8A1] group relative overflow-hidden cursor-pointer">
                {/* Línea decorativa superior */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#C89F6B] to-[#4A3320] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex justify-between items-start mb-3">
                  <div className="inline-block bg-[#F5EFE6] text-[#C89F6B] px-2.5 py-1 rounded-md text-[0.65rem] font-extrabold tracking-widest">{e.clave}</div>
                  <div className="text-[0.65rem] font-bold text-[#8b6a4a] uppercase bg-black/5 px-2 py-1 rounded-md">{e.tipoParticipacion}</div>
                </div>
                
                <div className="text-[1.15rem] font-extrabold text-[#2B1D14] leading-[1.2] mb-4 flex-1 group-hover:text-[#4A3320] transition-colors">{e.nombre}</div>
                
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex items-center gap-2.5 text-[0.8rem] text-[#8b6a4a] font-semibold">
                    <div className="w-6 h-6 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#C89F6B]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    </div>
                    {e.municipio}
                  </div>
                  <div className="flex items-center gap-2.5 text-[0.8rem] text-[#8b6a4a] font-semibold">
                    <div className="w-6 h-6 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#C89F6B]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" /></svg>
                    </div>
                    {e.institucion}
                  </div>
                </div>
                
                <button onClick={(ev) => { ev.stopPropagation(); viewInMap(e.lat, e.lng, e.clave); }} className="w-full bg-white border-2 border-[#E6C8A1] text-[#4A3320] text-center p-3 rounded-xl font-bold transition-all hover:bg-[#C89F6B] hover:border-[#C89F6B] hover:text-white flex justify-center items-center gap-2 hover:shadow-[0_10px_20px_rgba(200,159,107,0.2)] active:scale-[0.98]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg>
                  Trazar en Mapa
                </button>
              </div>
            ))}
          </div>
          {visibleCount < filteredSchools.length && (
            <div className="w-full flex justify-center mt-8">
              <div className="w-8 h-8 border-4 border-[#E6C8A1] border-t-[#C89F6B] rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* VISTA: TABLA */}
        <div onScroll={(e) => {
          if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 200) {
            if (visibleCount < filteredSchools.length) setVisibleCount(v => v + 50);
          }
        }} className={`absolute inset-0 w-full h-full transition-all duration-500 bg-[#F5EFE6] custom-scrollbar overflow-y-auto pt-[120px] pb-10 px-6 md:px-10 ${viewMode === 'table' ? 'opacity-100 z-[3] translate-y-0' : 'opacity-0 z-[1] translate-y-5 pointer-events-none'}`}>
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
                        { key: "tipoParticipacion", label: "Participación" }
                      ].map((col, index) => (
                        <th key={col.key} className={`bg-[#4A3320] text-white py-3.5 px-5 font-bold text-[0.75rem] uppercase tracking-[0.15em] text-left sticky top-0 z-10 shadow-md ${index === 0 ? 'rounded-l-full pl-6' : ''}`}>
                          {col.label}
                        </th>
                      ))}
                      <th className="bg-[#4A3320] text-white py-3.5 px-5 font-bold text-[0.75rem] uppercase tracking-[0.15em] text-center sticky top-0 z-10 rounded-r-full pr-6 shadow-md">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchools.slice(0, visibleCount).map((e) => (
                      <tr key={e.clave} onClick={() => openDrawer(e)} className="bg-white shadow-[0_5px_15px_rgba(43,29,20,0.03)] hover:shadow-[0_15px_30px_rgba(200,159,107,0.15)] transition-all duration-300 group cursor-pointer relative">
                        <td className="p-4 pl-6 rounded-l-[20px] relative">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E6C8A1] rounded-l-[20px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="inline-block bg-[#F5EFE6] text-[#C89F6B] px-3 py-1.5 rounded-[8px] text-[0.75rem] font-extrabold tracking-widest">{e.clave}</span>
                        </td>
                        <td className="p-4 px-5 text-[0.95rem] font-extrabold text-[#2B1D14] leading-tight group-hover:text-[#4A3320] transition-colors">{e.nombre}</td>
                        <td className="p-4 px-5 text-[0.85rem] font-bold text-[#8b6a4a]">{e.institucion}</td>
                        <td className="p-4 px-5 text-[0.85rem] font-bold text-[#8b6a4a]">{e.municipio}</td>
                        <td className="p-4 px-5">
                          <span className={`inline-block px-3 py-1.5 rounded-[8px] text-[0.7rem] font-bold tracking-wide ${e.tipoParticipacion === 'Con Examen' ? 'bg-[#C89F6B]/15 text-[#C89F6B]' : 'bg-[#4A3320]/5 text-[#4A3320]'}`}>
                            {e.tipoParticipacion}
                          </span>
                        </td>
                        <td className="p-4 pr-6 rounded-r-[20px] text-center">
                          <button onClick={(ev) => { ev.stopPropagation(); viewInMap(e.lat, e.lng, e.clave); }} className="bg-white border border-[#E6C8A1] text-[#4A3320] px-4 py-2 rounded-[10px] text-[0.75rem] font-extrabold transition-all hover:bg-[#C89F6B] hover:text-white hover:shadow-[0_5px_15px_rgba(200,159,107,0.25)] whitespace-nowrap flex items-center justify-center gap-1.5 mx-auto active:scale-[0.95]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg>
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
          {visibleCount < filteredSchools.length && (
            <div className="w-full flex justify-center mt-2">
              <div className="w-8 h-8 border-4 border-[#E6C8A1] border-t-[#C89F6B] rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* VISTA: ÁRBOL (DIRECTORIO) */}
        <div className={`absolute inset-0 w-full h-full transition-all duration-500 bg-[#F5EFE6] custom-scrollbar overflow-y-auto pt-[120px] pb-10 px-6 md:px-10 ${viewMode === 'tree' ? 'opacity-100 z-[3] translate-y-0' : 'opacity-0 z-[1] translate-y-5 pointer-events-none'}`}>
          <div className="max-w-[900px] mx-auto bg-white rounded-[24px] p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            {Object.keys(treeData).sort().map((muni) => {
              const insts = treeData[muni];
              const totalMuni = Object.values(insts).reduce((acc, curr) => acc + curr.length, 0);

              return (
                <details key={muni} className="mb-3 group/muni">
                  <summary className="list-none p-4 md:px-6 md:py-4 bg-[#fdfbf9] border border-black/5 rounded-2xl text-[1.1rem] md:text-[1.2rem] font-extrabold cursor-pointer flex justify-between items-center transition-all text-[#2B1D14] hover:border-[#E6C8A1] hover:shadow-sm group-open/muni:bg-[#4A3320] group-open/muni:text-white group-open/muni:border-[#4A3320] group-open/muni:rounded-b-none active:scale-[0.99]">
                    <span className="flex items-center gap-2.5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-80 transition-transform duration-300 group-open/muni:rotate-90 group-open/muni:opacity-100"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                      {muni}
                    </span>
                    <span className="font-normal text-[0.9rem] opacity-80">{totalMuni} escuelas</span>
                  </summary>
                  <div className="p-5 border border-t-0 border-black/5 rounded-b-2xl bg-white space-y-2">
                    {Object.keys(insts).sort().map((inst) => {
                      const schools = insts[inst];
                      return (
                        <details key={inst} className="group/inst">
                          <summary className="list-none px-4 py-3 bg-[#f8f5f0] rounded-xl font-bold cursor-pointer text-[#4A3320] text-[1rem] transition-all flex justify-between items-center group-open/inst:bg-[#E6C8A1] group-open/inst:text-[#2B1D14] group-open/inst:rounded-b-none active:scale-[0.99]">
                            <span className="flex items-center gap-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-open/inst:rotate-90"><path d="M9 5l7 7-7 7" /></svg>
                              {inst} <span className="opacity-60 text-[0.8rem] ml-1">({schools.length})</span>
                            </span>
                          </summary>
                          <div className="p-3 md:px-4 md:py-3 bg-[#faf9f7] rounded-b-xl flex flex-col gap-2">
                            {schools.map(e => (
                              <div key={e.clave} onClick={() => openDrawer(e)} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white rounded-lg border border-black/5 hover:border-[#C89F6B] gap-3 md:gap-0 transition-colors cursor-pointer group/item">
                                <div className="flex-1">
                                  <span className="font-extrabold text-[#C89F6B] text-[0.85rem] mr-2">{e.clave}</span>
                                  <span className="font-bold text-[#2B1D14] text-[0.95rem] mr-2">{e.nombre}</span>
                                  <span className="text-[0.75rem] text-[#8b6a4a] block md:inline mt-1 md:mt-0">{e.tipoParticipacion}</span>
                                </div>
                                <button onClick={(ev) => { ev.stopPropagation(); viewInMap(e.lat, e.lng, e.clave); }} className="bg-white border border-[#E6C8A1] text-[#4A3320] px-3 py-1.5 rounded-lg text-[0.8rem] font-bold transition-all hover:bg-[#C89F6B] hover:text-white w-fit active:scale-95 group-hover/item:border-[#C89F6B]">
                                  Mapa
                                </button>
                              </div>
                            ))}
                          </div>
                        </details>
                      )
                    })}
                  </div>
                </details>
              )
            })}
          </div>
        </div>

        {/* ISLA INTELIGENTE (Filtros) */}
        <div className="absolute top-6 left-6 max-lg:left-auto max-lg:right-6 z-[1000] w-[300px] max-lg:w-[280px] max-w-[calc(100vw-48px)] flex flex-col max-lg:items-end">
          <div onClick={() => setIsPanelOpen(!isPanelOpen)} className="w-fit bg-white/90 backdrop-blur-xl border-2 border-white px-5 py-3 rounded-full shadow-[0_20px_50px_rgba(43,29,20,0.12)] cursor-pointer flex justify-between items-center font-bold text-[0.95rem] text-[#4A3320] transition-all hover:shadow-[0_20px_50px_rgba(200,159,107,0.2)] hover:-translate-y-0.5 active:scale-[0.98] group gap-3">
            <span className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#C89F6B]"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" /></svg>
              <span>Filtros</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={`text-[#C89F6B] transition-transform duration-300 ${isPanelOpen ? "rotate-180" : ""}`}><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" /></svg>
          </div>

          <div suppressHydrationWarning={true} className={`w-full bg-white/95 backdrop-blur-3xl border-2 border-white rounded-[24px] p-5 max-lg:p-4 mt-2 shadow-[0_30px_60px_rgba(43,29,20,0.15)] custom-scrollbar max-h-[70vh] max-lg:max-h-[60vh] overflow-y-auto transition-all duration-500 origin-top-left max-lg:origin-top-right ${isPanelOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>

            {/* Dashboard Mini Premium */}
            <div className="bg-gradient-to-br from-[#4A3320] to-[#2B1D14] p-4 rounded-2xl text-white mb-4 shadow-inner relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#C89F6B] rounded-full opacity-20 blur-xl pointer-events-none"></div>
              <div className="text-[0.6rem] uppercase tracking-[0.15em] opacity-80 mb-1 font-bold text-[#C89F6B]">Opciones</div>
              <div className="text-[2rem] font-black text-white leading-none mb-3 tracking-tight">{totalFiltered}</div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2 flex relative z-10">
                <div className="h-full bg-[#C89F6B] transition-all duration-500" style={{ width: `${wExam}%` }}></div>
                <div className="h-full bg-[#F5EFE6] transition-all duration-500" style={{ width: `${wNoExam}%` }}></div>
              </div>
              <div className="flex justify-between text-[0.65rem] font-bold text-white/90 relative z-10">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#C89F6B]"></span> Examen ({exam})</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F5EFE6]"></span> Sin Ex. ({noExam})</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[0.65rem] font-extrabold text-[#4A3320] mb-1.5 uppercase tracking-wide">Clave Institucional</label>
              <input type="text" value={fClave} onChange={(e) => setFClave(e.target.value)} placeholder="Ej. A301087" className="w-full p-2.5 px-3.5 bg-[#F5EFE6] border-2 border-transparent rounded-xl text-[0.85rem] font-semibold text-[#2B1D14] placeholder:text-[#2B1D14]/40 outline-none transition-all focus:bg-white focus:border-[#C89F6B] focus:shadow-[0_0_0_4px_rgba(200,159,107,0.15)]" />
            </div>

            <div className="mb-4">
              <label className="block text-[0.65rem] font-extrabold text-[#4A3320] mb-1.5 uppercase tracking-wide">Municipio</label>
              <select value={fMuni} onChange={(e) => setFMuni(e.target.value)} className="w-full p-2.5 px-3.5 bg-[#F5EFE6] border-2 border-transparent rounded-xl text-[0.85rem] font-semibold text-[#2B1D14] outline-none transition-all focus:bg-white focus:border-[#C89F6B] focus:shadow-[0_0_0_4px_rgba(200,159,107,0.15)] cursor-pointer appearance-none" style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C89F6B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}>
                <option value="">Todo el Estado</option>
                {municipiosDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-[0.65rem] font-extrabold text-[#4A3320] mb-1.5 uppercase tracking-wide">Institución</label>
              <select value={fInst} onChange={(e) => setFInst(e.target.value)} className="w-full p-2.5 px-3.5 bg-[#F5EFE6] border-2 border-transparent rounded-xl text-[0.85rem] font-semibold text-[#2B1D14] outline-none transition-all focus:bg-white focus:border-[#C89F6B] focus:shadow-[0_0_0_4px_rgba(200,159,107,0.15)] cursor-pointer appearance-none" style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C89F6B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}>
                <option value="">Cualquier Institución</option>
                {institucionesDisponibles.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div className="flex gap-2">
              <button onClick={() => { setFClave(""); setFMuni(""); setFInst(""); }} className="flex-1 p-2.5 text-[0.85rem] rounded-xl font-bold bg-[#F5EFE6] text-[#8b6a4a] transition-all hover:bg-[#e8dfd1] hover:text-[#4A3320]">Limpiar</button>
              <button onClick={() => { if (window.innerWidth <= 900) setIsPanelOpen(false); }} className="flex-[1.5] p-2.5 text-[0.85rem] rounded-xl font-bold bg-gradient-to-r from-[#4A3320] to-[#2B1D14] text-white shadow-[0_10px_20px_rgba(43,29,20,0.2)] transition-all hover:shadow-[0_10px_20px_rgba(200,159,107,0.3)] hover:-translate-y-0.5 active:scale-95">Aplicar Filtros</button>
            </div>
          </div>
        </div>

        {/* OVERLAY DEL DRAWER */}
        <div onClick={closeDrawer} className={`absolute inset-0 bg-[#2B1D14]/40 backdrop-blur-sm z-[1001] transition-opacity duration-500 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}></div>

        {/* DRAWER LATERAL */}
        <div className={`absolute top-0 right-0 w-[400px] max-w-full h-full bg-[#F5EFE6] z-[1002] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.15)] transition-transform duration-500 max-lg:h-[85%] max-lg:top-auto max-lg:bottom-0 max-lg:rounded-t-3xl ${isDrawerOpen ? "translate-x-0 max-lg:translate-y-0" : "translate-x-full max-lg:translate-x-0 max-lg:translate-y-full"}`}>
          <button onClick={closeDrawer} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white border-none cursor-pointer text-lg z-10 hover:bg-white/30 transition-colors">✕</button>

          {drawerSchools.length === 1 ? (
            // TEMPLATE 1 ESCUELA
            <>
              <div className="relative pt-[30px] pb-[20px] px-6 text-white" style={{ background: DRAWER_BG }}>
                <div className="inline-block bg-[#C89F6B] text-[#2B1D14] px-2.5 py-1 rounded-md text-[0.65rem] font-extrabold mb-2 mr-8">{drawerSchools[0].clave}</div>
                <div className="text-[1.25rem] font-extrabold leading-tight pr-2">{drawerSchools[0].nombre}</div>
              </div>
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <div className="bg-white p-3 md:p-4 rounded-xl mb-3 border border-black/5">
              <label className="block text-[0.65rem] text-[#8b6a4a] uppercase font-bold mb-1">Institución</label>
              <span className="block text-[0.95rem] font-semibold text-[#2B1D14]">{drawerSchools[0].institucion}</span>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-xl mb-3 border border-black/5">
              <label className="block text-[0.65rem] text-[#8b6a4a] uppercase font-bold mb-1">Ubicación</label>
              <span className="block text-[0.95rem] font-semibold text-[#2B1D14]">{drawerSchools[0].direccion}, {drawerSchools[0].municipio}</span>
            </div>
            <div className="bg-white p-3 md:p-4 rounded-xl mb-3 border border-black/5 border-l-4 !border-l-[#C89F6B]">
              <label className="block text-[0.65rem] text-[#8b6a4a] uppercase font-bold mb-1">Tipo de Participación</label>
              <span className="block text-[0.95rem] font-semibold text-[#2B1D14]">{drawerSchools[0].tipoParticipacion}</span>
            </div>
            {drawerSchools[0].especialidad && (
              <div className="bg-white p-3 md:p-4 rounded-xl mb-3 border border-black/5">
                <label className="block text-[0.65rem] text-[#8b6a4a] uppercase font-bold mb-1">Especialidad</label>
                <span className="block text-[0.95rem] font-semibold text-[#2B1D14]">{drawerSchools[0].especialidad}</span>
              </div>
            )}

            <a href={`https://www.google.com/maps?q=${drawerSchools[0].lat},${drawerSchools[0].lng}`} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 w-full bg-white text-[#4A3320] border-2 border-[#E6C8A1] p-4 rounded-2xl font-extrabold text-[1.1rem] no-underline transition-all shadow-[0_10px_20px_rgba(200,159,107,0.15)] hover:bg-[#C89F6B] hover:text-white hover:border-[#C89F6B] hover:-translate-y-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
              Trazar Ruta en Maps
            </a>
          </div>
        </>
          ) : drawerSchools.length > 1 ? (
        // TEMPLATE MULTI-ESCUELA (CLUSTER)
        <>
          <div className="relative pt-[30px] pb-[30px] px-6 text-white" style={{ background: DRAWER_BG }}>
                <div className="inline-block bg-white text-[#4A3320] px-2.5 py-1 rounded-md text-[0.65rem] font-extrabold mb-2">Multi-Escuela</div>
                <div className="text-[1.5rem] font-extrabold leading-tight mt-2">{drawerSchools.length} Escuelas en esta ubicación</div>
              </div>
        <div className="p-6 overflow-y-auto flex-1 bg-[#f8f5f0] custom-scrollbar">
          {drawerSchools.map(school => (
            <div key={school.clave} className="bg-white p-4 rounded-2xl mb-4 border border-black/5 shadow-[0_4px_15px_rgba(0,0,0,0.02)]">
              <div className="inline-block bg-[#C89F6B] text-[#2B1D14] px-2.5 py-1 rounded-md text-[0.65rem] font-extrabold mb-2">{school.clave}</div>
              <div className="text-[1.1rem] font-extrabold text-[#2B1D14] leading-tight mb-3">{school.nombre}</div>
              <div className="text-[0.85rem] text-[#4A3320] mb-1"><strong>🏫 Institución:</strong> {school.institucion}</div>
              <div className="text-[0.85rem] text-[#4A3320] mb-3"><strong>📋 Participación:</strong> {school.tipoParticipacion}</div>
              <a href={`https://www.google.com/maps?q=${school.lat},${school.lng}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#F5EFE6] text-[#4A3320] border border-[#E6C8A1] p-3 rounded-xl font-bold text-[0.95rem] transition-colors hover:bg-[#4A3320] hover:text-white hover:border-[#4A3320]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                Ver Ruta
              </a>
            </div>
          ))}
        </div>
      </>
          ) : null}
    </div >
        </div>
      </section>
    </>
  );
}
