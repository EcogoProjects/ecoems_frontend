import { api } from './client'

/**
 * Obtiene la suscripción activa del usuario autenticado.
 * GET /api/v1/subscription
 * @returns {{ data: { plan: string, startDate: string, endDate: string, isActive: boolean }|null, error: string|null }}
 */
export async function getSubscription() {
  const { data, error } = await api.get('/api/v1/subscription')
  if (error) return { data: null, error }

  return {
    data: {
      plan:      data.plan,
      startDate: data.start_date,
      endDate:   data.end_date,
      isActive:  data.is_active,
    },
    error: null,
  }
}

/**
 * Verifica si el usuario tiene un plan premium activo.
 * @returns {{ data: boolean|null, error: string|null }}
 */
export async function isPremium() {
  const { data, error } = await getSubscription()
  if (error) return { data: null, error }
  return { data: data.plan !== 'free' && data.isActive, error: null }
}
