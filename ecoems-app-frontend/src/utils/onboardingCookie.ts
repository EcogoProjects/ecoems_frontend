export function setOnboardingCookie(): void {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  document.cookie = `onboarding=done; path=/; SameSite=Lax${!isLocalhost ? '; Secure' : ''}`;
}

export function clearOnboardingCookie(): void {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  document.cookie = `onboarding=; path=/; SameSite=Lax${!isLocalhost ? '; Secure' : ''}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

