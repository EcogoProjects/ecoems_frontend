import { api } from './client'

/**
 * Devuelve el promedio global de aciertos y total de exámenes del usuario.
 * GET /api/v1/analytics/stats
 * @returns {{ data: { average: number, totalExams: number }|null, error: string|null }}
 */
export async function getUserStats() {
  return api.get('/api/v1/analytics/stats')
}

/**
 * Devuelve el puntaje promedio agrupado por materia.
 * GET /api/v1/analytics/subjects
 * @returns {{ data: Array<{ subject: string, score: number }>|null, error: string|null }}
 */
export async function getSubjectStats() {
  return api.get('/api/v1/analytics/subjects')
}

/**
 * Devuelve las N materias con mejor puntaje promedio.
 * GET /api/v1/analytics/subjects/top?limit=
 * @param {number} limit
 * @returns {{ data: Array<{ subject: string, score: number }>|null, error: string|null }}
 */
export async function getTopSubjects(limit = 3) {
  return api.get(`/api/v1/analytics/subjects/top?limit=${limit}`)
}

/**
 * Devuelve las N materias con peor puntaje promedio.
 * GET /api/v1/analytics/subjects/weak?limit=
 * @param {number} limit
 * @returns {{ data: Array<{ subject: string, score: number }>|null, error: string|null }}
 */
export async function getWeakSubjects(limit = 3) {
  return api.get(`/api/v1/analytics/subjects/weak?limit=${limit}`)
}

/**
 * Devuelve el historial de puntajes ordenado por fecha para la gráfica de progreso.
 * GET /api/v1/analytics/progress?limit=
 * @param {number} limit  Últimos N exámenes
 * @returns {{ data: Array<{ date: string, score: number }>|null, error: string|null }}
 */
export async function getProgressHistory(limit = 20) {
  return api.get(`/api/v1/analytics/progress?limit=${limit}`)
}
