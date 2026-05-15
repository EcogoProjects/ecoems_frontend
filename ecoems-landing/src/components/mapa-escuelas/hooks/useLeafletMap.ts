"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Escuela } from "../types";
import { MAP_CENTER, MAP_DEFAULT_ZOOM, TILE_URL } from "../constants";

type UseLeafletMapCallbacks = {
  onDrawerOpen: (schools: Escuela[]) => void;
  onDrawerClose: () => void;
  onMapFocus: (focused: boolean) => void;
  onViewModeChange: (mode: "map") => void;
};

export function useLeafletMap(
  filteredSchools: Escuela[],
  allSchools: Escuela[],
  callbacks: UseLeafletMapCallbacks
) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const clusterGroupRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  const activeRadarRef = useRef<any>(null);

  // Ref pattern: bypass stale closure
  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  // Synced ref: event loop stability
  const filteredSchoolsRef = useRef(filteredSchools);
  filteredSchoolsRef.current = filteredSchools;
  const allSchoolsRef = useRef(allSchools);
  allSchoolsRef.current = allSchools;

  // Idempotent projected render
  const renderMarkers = useCallback((data: Escuela[], L: any, cg: any) => {
    cg.clearLayers();
    data.forEach((e) => {
      if (!e.lat || !e.lng) return;
      const icon = L.divIcon({
        className: "",
        html: `<div class="relative w-6 h-6"><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-[#C89F6B] z-[1] animate-map-pulse"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#4A3320] border-[3px] border-white rounded-full z-[2]"></div></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const marker = L.marker([e.lat, e.lng], { icon, schoolData: e });
      marker.on("click", () => {
        openDrawerInternal(e, mapInstanceRef.current, L);
      });
      cg.addLayer(marker);
    });
  }, []);

  // Singleton overlay management
  const drawRadar = useCallback((lat: number, lng: number, radius: number, map: any, L: any) => {
    if (activeRadarRef.current) map.removeLayer(activeRadarRef.current);
    activeRadarRef.current = L.circle([lat, lng], {
      color: "#C89F6B",
      fillColor: "#C89F6B",
      fillOpacity: 0.1,
      weight: 2,
      dashArray: "10, 15",
      className: "animate-map-radar",
      radius,
    }).addTo(map);
  }, []);

  // Viewport alignment: layout offset compensation
  const openDrawerInternal = useCallback(
    (school: Escuela, map: any, L: any) => {
      callbacksRef.current.onDrawerOpen([school]);
      callbacksRef.current.onMapFocus(true);
      if (!map || !L || !school.lat || !school.lng) return;

      drawRadar(school.lat, school.lng, 800, map, L);
      if (window.innerWidth > 900) {
        map.panTo([school.lat, school.lng]);
        map.panBy([-150, 0]);
      } else {
        map.panTo([school.lat, school.lng]);
      }
    },
    [drawRadar]
  );

  // Recursive spiderfy unwrapper
  const openClusterDrawerInternal = useCallback(
    (schools: Escuela[], map: any, L: any) => {
      callbacksRef.current.onDrawerOpen(schools);
      callbacksRef.current.onMapFocus(true);
      const center = schools[0];
      if (!map || !L || !center.lat || !center.lng) return;

      drawRadar(center.lat, center.lng, 1500, map, L);
      if (window.innerWidth > 900) {
        map.panTo([center.lat, center.lng]);
        map.panBy([-150, 0]);
      } else {
        map.panTo([center.lat, center.lng]);
      }
    },
    [drawRadar]
  );

  // Instance hydration + GC cleanup logic
  useEffect(() => {
    let cancelled = false;

    const initMap = async () => {
      try {
        const leafletModule = await import("leaflet");
        await import("leaflet.markercluster");

        const L = ((leafletModule as any).default ?? leafletModule) as any;
        if (cancelled || !mapElementRef.current || mapInstanceRef.current) return;

        leafletRef.current = L;

        const map = L.map(mapElementRef.current, { zoomControl: false }).setView(MAP_CENTER, MAP_DEFAULT_ZOOM);

        L.tileLayer(TILE_URL, { maxZoom: 19 }).addTo(map);
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
            openClusterDrawerInternal(schoolsInCluster, map, L);
          } else {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 18 });
          }
        });

        mapInstanceRef.current = map;
        clusterGroupRef.current = markerClusterGroup;

        renderMarkers(filteredSchoolsRef.current, L, markerClusterGroup);
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
  }, [renderMarkers, openClusterDrawerInternal]);

  // Reactive to Imperative bridge sync
  useEffect(() => {
    if (leafletRef.current && clusterGroupRef.current) {
      renderMarkers(filteredSchools, leafletRef.current, clusterGroupRef.current);
    }
  }, [filteredSchools, renderMarkers]);

  // Exposed orchestration handlers
  const openDrawer = useCallback((school: Escuela) => {
    openDrawerInternal(school, mapInstanceRef.current, leafletRef.current);
  }, [openDrawerInternal]);

  const closeDrawer = useCallback(() => {
    callbacksRef.current.onDrawerClose();
    callbacksRef.current.onMapFocus(false);
    if (activeRadarRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(activeRadarRef.current);
      activeRadarRef.current = null;
    }
  }, []);

  const viewInMap = useCallback(
    (lat: number | null, lng: number | null, clave: string) => {
      if (!lat || !lng) return;
      callbacksRef.current.onViewModeChange("map");
      const map = mapInstanceRef.current;
      if (map) map.flyTo([lat, lng], 16, { duration: 1.5 });
      const school = allSchoolsRef.current.find((e) => e.clave === clave);
      if (school) setTimeout(() => openDrawerInternal(school, mapInstanceRef.current, leafletRef.current), 1500);
    },
    [openDrawerInternal]
  );

  const setMapInteraction = useCallback((interactive: boolean) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (interactive) {
      if (map.dragging && !map.dragging.enabled()) map.dragging.enable();
      if (map.touchZoom && !map.touchZoom.enabled()) map.touchZoom.enable();
      if (map.scrollWheelZoom && !map.scrollWheelZoom.enabled()) map.scrollWheelZoom.enable();
      if (map.doubleClickZoom && !map.doubleClickZoom.enabled()) map.doubleClickZoom.enable();
      if (map.boxZoom && !map.boxZoom.enabled()) map.boxZoom.enable();
    } else {
      if (map.dragging && map.dragging.enabled()) map.dragging.disable();
      if (map.touchZoom && map.touchZoom.enabled()) map.touchZoom.disable();
      if (map.scrollWheelZoom && map.scrollWheelZoom.enabled()) map.scrollWheelZoom.disable();
      if (map.doubleClickZoom && map.doubleClickZoom.enabled()) map.doubleClickZoom.disable();
      if (map.boxZoom && map.boxZoom.enabled()) map.boxZoom.disable();
    }
  }, []);

  return {
    mapElementRef,
    openDrawer,
    closeDrawer,
    viewInMap,
    setMapInteraction,
  };
}
