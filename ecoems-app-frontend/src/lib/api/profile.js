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
