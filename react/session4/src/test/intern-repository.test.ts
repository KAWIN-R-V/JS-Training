import { renderHook, act } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { useInternRepository } from "../repositories/intern-repository";
import type { Intern } from "../utils/intern-utils";

const RAHUL: Intern = {
  id: 1,
  name: "Rahul",
  score: 92,
  isPresent: true,
  role: "Frontend",
};

const PRIYA: Intern = {
  id: 2,
  name: "Priya",
  score: 78,
  isPresent: false,
  role: "Backend",
};

describe("useInternRepository", () => {
  test("starts with an empty list", () => {
    const { result } = renderHook(() => useInternRepository());

    expect(result.current.interns).toEqual([]);
  });

  test("add() adds an intern", () => {
    const { result } = renderHook(() => useInternRepository());

    act(() => {
      result.current.add(RAHUL);
    });

    expect(result.current.interns).toEqual([RAHUL]);
  });

  test("add() twice results in two interns", () => {
    const { result } = renderHook(() => useInternRepository());

    act(() => {
      result.current.add(RAHUL);
      result.current.add(PRIYA);
    });

    expect(result.current.interns).toHaveLength(2);
  });

  test("remove() removes an intern by id", () => {
    const { result } = renderHook(() => useInternRepository());

    act(() => {
      result.current.add(RAHUL);
      result.current.remove(1);
    });

    expect(result.current.interns).toEqual([]);
  });

  test("remove() on a non-existent id does nothing", () => {
    const { result } = renderHook(() => useInternRepository());

    act(() => {
      result.current.add(RAHUL);
      result.current.remove(999);
    });

    expect(result.current.interns).toEqual([RAHUL]);
  });

  test("update() replaces the matching intern", () => {
    const { result } = renderHook(() => useInternRepository());

    act(() => {
      result.current.add(RAHUL);

      result.current.update({
        ...RAHUL,
        score: 100,
      });
    });

    expect(result.current.interns[0].score).toBe(100);
  });

  test("update() does not affect other interns", () => {
    const { result } = renderHook(() => useInternRepository());

    act(() => {
      result.current.add(RAHUL);
      result.current.add(PRIYA);

      result.current.update({
        ...RAHUL,
        score: 95,
      });
    });

    expect(result.current.interns[1]).toEqual(PRIYA);
  });
});