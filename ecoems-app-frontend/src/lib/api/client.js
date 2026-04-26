import { createClient } from '@/utils/supabase/client'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function getAccessToken() {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? null
}

/**
 * Fetcher base. Inyecta el JWT de Supabase como Authorization: Bearer.
 * Retorna siempre { data, error } — nunca lanza excepciones.
 *
 * @param {string} path  Ruta relativa, ej: '/api/v1/profile'
 * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} method
 * @param {object|null} body  Se serializa a JSON automáticamente
 * @returns {{ data: any, error: string|null }}
 */
async function apiFetch(path, method = 'GET', body = null) {
  const token = await getAccessToken()

  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      ...(body !== null ? { body: JSON.stringify(body) } : {}),
    })

    // Respuestas 204 No Content no tienen cuerpo
    if (res.status === 204) return { data: null, error: null, status: 204 }

    let json
    try {
      json = await res.json()
    } catch {
      json = null
    }

    if (!res.ok) {
      // FastAPI usa { detail: "..." }, Express usa { message: "..." }
      const message = json?.detail ?? json?.message ?? `Error ${res.status}`
      return { data: null, error: message, status: res.status }
    }

    return { data: json, error: null, status: res.status }
  } catch (err) {
    // Error de red (backend caído, CORS, etc.)
    return { data: null, error: 'No se pudo conectar con el servidor.', status: null }
  }
}

export const api = {
  get:    (path)         => apiFetch(path, 'GET'),
  post:   (path, body)   => apiFetch(path, 'POST', body),
  put:    (path, body)   => apiFetch(path, 'PUT', body),
  patch:  (path, body)   => apiFetch(path, 'PATCH', body),
  delete: (path)         => apiFetch(path, 'DELETE'),
}
