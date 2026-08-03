export function getScoreLabel(score: number): string {
  return score >= 50 ? "Pass" : "Fail";
}