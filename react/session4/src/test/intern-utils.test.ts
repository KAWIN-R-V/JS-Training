import { describe, expect, test } from "vitest";
import { filterInterns, type Intern } from "../utils/intern-utils";

const interns: Intern[] = [
  { id: 1, name: "Rahul", score: 92, role: "Frontend", isPresent: true },
  { id: 2, name: "Priya", score: 88, role: "Backend", isPresent: true },
  { id: 3, name: "Amit", score: 75, role: "Frontend", isPresent: false },
];

describe("filterInterns", () => {
  test("returns all interns when searchTerm is empty", () => {
    expect(filterInterns(interns, "")).toHaveLength(3);
  });

  test("returns interns whose name matches", () => {
    expect(filterInterns(interns, "rahul")).toEqual([interns[0]]);
  });

  test("returns interns whose role matches", () => {
    expect(filterInterns(interns, "backend")).toEqual([interns[1]]);
  });

  test("returns an empty array when no interns match", () => {
    expect(filterInterns(interns, "xyz")).toEqual([]);
  });

  test("returns interns matching either name or role", () => {
    expect(filterInterns(interns, "frontend")).toHaveLength(2);
  });
});

// The assignment asks you to compare these tests with hook tests.

// The tests for filterInterns are much simpler than hook tests. They require no rendering, no mocks, and no React setup because filterInterns is a pure function that depends only on its inputs.