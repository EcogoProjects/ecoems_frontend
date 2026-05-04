export function setOnboardingCookie(): void {
  document.cookie = 'onboarding=done; path=/; SameSite=Strict; Secure';
}
