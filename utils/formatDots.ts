export function formatDots(termsCondition : string): string[] {
  if (!termsCondition) return [];

  return termsCondition
    .split(/\r?\n/) // pecah enter
    .map(term => term.trim())
    .filter(term => term.length > 0);
}
