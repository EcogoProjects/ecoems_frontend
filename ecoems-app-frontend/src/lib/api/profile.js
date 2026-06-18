import { api } from './client'

// El backend identifica al usuario por el JWT — no se necesita pasar userId.

/**
 * Obtiene el perfil del usuario autenticado.
 * GET /api/v1/profile
 * @returns {{ data: object|null, error: string|null }}
 */
export async function getProfile() {
  return api.get('/api/v1/profile')
}

/**
 * Obtiene información básica del usuario para poblar el store global.
 * GET /users/me/basic-info
 * @returns {{ data: { name, avatar_url, onboarding_completed, plan_type }|null, error: string|null }}
 */
export async function getUserBasicInfo() {
  return api.get('/users/me/basic-info')
}

/**
 * Obtiene el perfil completo del usuario autenticado.
 * GET /users/me
 * @returns {{ data: { name, last_name, phone, gender, state, town, avatar_url, active_plan, target_school }|null, error: string|null }}
 */
export async function getUserMe() {
  return api.get('/users/me')
}

/**
 * Actualiza perfil + completa el onboarding del usuario.
 * PATCH /users/me
 * @param {{ avatar_url, state, town, target_school_id, gender, phone?, onboarding_completed }} data
 * @returns {{ data: object|null, error: string|null }}
 */
export async function patchUserMe(data) {
  return api.patch('/users/me', data)
}

/**
 * Crea el perfil del usuario en el backend (llamada inicial post-registro).
 * Usado como recuperación cuando el perfil no fue creado en el /auth/callback
 * (ej: usuarios OAuth cuyo callback falló silenciosamente).
 * POST /users/me
 * @param {{ name: string, last_name?: string|null }} data
 * @returns {{ data: object|null, error: string|null }}
 */
export async function createUserProfile(data) {
  return api.post('/users/me', data)
}

/**
 * Actualiza campos del perfil. Solo se envían los campos que cambian.
 * PUT /api/v1/profile
 * @param {{ username?: string, phone?: string, school?: string, city?: string, address?: string }} updates
 * @returns {{ data: object|null, error: string|null }}
 */
export async function updateProfile(updates) {
  return api.put('/api/v1/profile', updates)
}

/**
 * Actualiza solo el avatar del usuario.
 * PATCH /api/v1/profile/avatar
 * @param {string} avatarUrl  Ruta local (ej: "/assets/ecogo_avatar_01.png") o URL
 * @returns {{ data: object|null, error: string|null }}
 */
export async function updateAvatar(avatarUrl) {
  return api.patch('/api/v1/profile/avatar', { avatar_url: avatarUrl })
}
