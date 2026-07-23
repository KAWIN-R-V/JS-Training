import { test, expect } from "vitest";

const interns: { id: number; name: string }[] = [];

test("can add first intern", () => {
  interns.push({ id: 1, name: "Rahul" });
  expect(interns).toHaveLength(1);
});

test("can add second intern", () => {
  interns.push({ id: 2, name: "Priya" });
  expect(interns).toHaveLength(2);
});

/*
FIRST Principle Violated:
Independent

Reason:
The tests share the same interns array.
The second test depends on the first test.
If it runs by itself, it fails because the array starts empty.
*/