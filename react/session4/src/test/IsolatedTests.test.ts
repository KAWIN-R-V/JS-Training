import { describe, test, expect } from "vitest";

describe("Isolated Tests", () => {
  test("creates one intern", () => {
    // Arrange
    const interns: { id: number; name: string }[] = [];

    // Act
    interns.push({ id: 1, name: "Rahul" });

    // Assert
    expect(interns).toHaveLength(1);
  });

  test("creates two interns independently", () => {
    // Arrange
    const interns: { id: number; name: string }[] = [];

    // Act
    interns.push({ id: 1, name: "Rahul" });
    interns.push({ id: 2, name: "Priya" });

    // Assert
    expect(interns).toHaveLength(2);
  });

  test("new test starts with an empty array", () => {
    // Arrange
    const interns: { id: number; name: string }[] = [];

    // Assert
    expect(interns).toEqual([]);
  });
});