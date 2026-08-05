import { test, expect } from "vitest";

function getAverage(scores: number[]): number {
  return (
    scores.reduce((sum, score) => sum + score, 0) /
    scores.length
  );
}

test("calculates average score correctly", () => {
  // Arrange
  const scores = [80, 90, 100];

  // Act
  const average = getAverage(scores);

  // Assert
  expect(average).toBe(90);
});