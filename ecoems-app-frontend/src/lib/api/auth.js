import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

/**
 * Inicia sesión con email y contraseña.
 * @param {string} email
 * @param {string} password
 * @returns {{ data: import('@supabase/supabase-js').User|null, error: string|null }}
 */
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { data: null, error: 'Correo o contraseña incorrectos.' }
  return { data: data.user, error: null }
}

/**
 * Inicia sesión con Google OAuth.
 * Redirige al navegador — no retorna usuario directamente.
 * @param {string} redirectTo  URL a la que vuelve Supabase tras autenticar
 * @returns {{ error: string|null }}
 */
export async function signInWithGoogle(redirectTo) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  })
  if (error) return { error: error.message }
  return { error: null }
}

/**
 * Registra un usuario nuevo.
 * Flujo:
 *   1. Supabase crea el usuario y devuelve el JWT
 *   2. Frontend llama al backend con JWT en header + datos de registro en body
 *   3. Backend crea el perfil y retorna la respuesta
 *
 * Nota: si tienes confirmación de email activada en Supabase, `session` llega null
 * y el paso 2 se omite — el backend deberá crearse el perfil al primer login.
 *
 * @param {{ email: string, password: string, name: string, lastName: string }}
 * @returns {{ data: import('@supabase/supabase-js').User|null, error: string|null }}
 */
export async function signUp({ email, password, name, lastName }) {
  // Paso 1: registrar en Supabase.
  // emailRedirectTo apunta a /auth/callback, que maneja la llamada al backend
  // después de que el usuario confirme su correo.
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, last_name: lastName },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) {
    // Sin confirmación de email, Supabase sí devuelve este mensaje directamente
    if (error.message === 'User already registered') {
      return { data: null, error: 'Este email ya existe' }
    }
    return { data: null, error: error.message }
  }

  // Con confirmación de email activada, Supabase no revela si el correo existe
  // (previene enumeración) pero devuelve identities: [] cuando ya está registrado.
  if (data.user?.identities?.length === 0) {
    return { data: null, error: 'Este email ya existe' }
  }

  return { data: data.user, error: null }
}

/**
 * Cierra la sesión del usuario actual.
 * @returns {{ error: string|null }}
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) return { error: error.message }
  return { error: null }
}

/**
 * Devuelve el usuario autenticado actualmente, o null si no hay sesión.
 * @returns {{ data: import('@supabase/supabase-js').User|null, error: string|null }}
 */
export async function getUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) return { data: null, error: error.message }
  return { data: data.user, error: null }
}

/**
 * Devuelve la sesión activa, o null si el usuario no está autenticado.
 * @returns {{ data: import('@supabase/supabase-js').Session|null, error: string|null }}
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) return { data: null, error: error.message }
  return { data: data.session, error: null }
}

/**
 * Suscribe un callback a cambios de estado de autenticación.
 * Retorna la función de cleanup que debes llamar en el useEffect de retorno.
 * @param {(user: import('@supabase/supabase-js').User|null) => void} callback
 * @returns {() => void} cleanup
 */
export function onAuthStateChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })
  return () => subscription.unsubscribe()
}
