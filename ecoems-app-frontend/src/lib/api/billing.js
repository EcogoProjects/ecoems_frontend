import { api } from './client'

/**
 * Crea una sesión de checkout de Stripe.
 * POST /billing/create-checkout-session
 * @param {string|null} couponCode - Código de cupón opcional
 * @returns {{ data: any, error: string|null }}
 */
export async function createCheckoutSession(couponCode = null) {
  return await api.post('/billing/create-checkout-session', {
    coupon_code: couponCode
  })
}
