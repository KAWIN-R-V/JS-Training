import { test, expect, beforeEach } from "vitest";

let interns: { id: number; name: string }[];

beforeEach(() => {
  interns = [];
});

test("can add first intern", () => {
  interns.push({ id: 1, name: "Rahul" });

  expect(interns).toHaveLength(1);
});

test("can add second intern", () => {
  interns.push({ id: 2, name: "Priya" });

  expect(interns).toHaveLength(1);
});

/*
Fix:
beforeEach() resets the array before every test.
Each test is now independent and can run in any order.
*/