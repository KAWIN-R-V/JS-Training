// Internal helper functions.
// These are used only inside the services layer.
// Do NOT export them.

function roundScore(score: number): number {
  return Math.round(score);
}

function normalizeName(name: string): string {
  return name.trim();
}

function isValidScore(score: number): boolean {
  return score >= 0 && score <= 100;
}