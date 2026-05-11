export function setOnboardingCookie(): void {
  document.cookie = 'onboarding=done; path=/; SameSite=Strict; Secure';
}

export function clearOnboardingCookie(): void {
  document.cookie = 'onboarding=; path=/; SameSite=Strict; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
