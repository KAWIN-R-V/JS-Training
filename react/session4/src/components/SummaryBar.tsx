// Job: This file displays summary information about interns.
// Concerns mixed (if any):
// - Presentational UI
// - Container logic (retrieving data from context)

import { useInterns } from "../contexts/intern-context";
import { calculateAverageScore } from "../services/intern-service";

interface SummaryBarProps {
  total: number;
  presentCount: number;
  averageScore: number;
}

// Presentational Component
export function SummaryBar({
  total,
  presentCount,
  averageScore,
}: SummaryBarProps) {
  return (
    <div>
      <p>Total Interns: {total}</p>
      <p>Present: {presentCount}</p>
      <p>Average Score: {averageScore}</p>
    </div>
  );
}

// Container Component
export function SummaryBarContainer() {
  const { interns } = useInterns();

  const total = interns.length;

  const presentCount = interns.filter(
    (intern) => intern.isPresent
  ).length;

  // Business logic delegated to the service layer
  const averageScore = calculateAverageScore(interns);

  return (
    <SummaryBar
      total={total}
      presentCount={presentCount}
      averageScore={averageScore}
    />
  );
}