// 1 año: la cookie debe sobrevivir el cierre del navegador. Sin Max-Age sería una
// cookie de sesión y caducaría al cerrar el navegador, mandando al usuario ya
// registrado de vuelta a /initial-registration (la compuerta del proxy depende de ella).
const ONBOARDING_MAX_AGE = 60 * 60 * 24 * 365;

export function setOnboardingCookie(): void {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  document.cookie = `onboarding=done; path=/; Max-Age=${ONBOARDING_MAX_AGE}; SameSite=Lax${!isLocalhost ? '; Secure' : ''}`;
}

export function clearOnboardingCookie(): void {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  document.cookie = `onboarding=; path=/; SameSite=Lax${!isLocalhost ? '; Secure' : ''}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

