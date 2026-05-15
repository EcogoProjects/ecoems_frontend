import data from '@/lib/data/estados-municipios.json';

const estadosData = data as Record<string, string[]>;

export const ESTADOS_LIST: string[] = Object.keys(estadosData).sort((a, b) =>
  a.localeCompare(b, 'es')
);

export function useEstadosMunicipios(estadoSeleccionado: string) {
  const municipios = estadoSeleccionado ? (estadosData[estadoSeleccionado] ?? []) : [];
  return { estados: ESTADOS_LIST, municipios };
}
