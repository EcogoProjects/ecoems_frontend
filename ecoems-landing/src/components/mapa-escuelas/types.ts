// Domain entity contracts

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

export type ViewMode = "map" | "list" | "table" | "tree";

export type FilterState = {
  clave: string;
  municipio: string;
  institucion: string;
};
