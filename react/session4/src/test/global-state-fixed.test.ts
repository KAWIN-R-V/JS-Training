import { test, expect } from "vitest";

function addItem(cart: string[], item: string): string[] {
  return [...cart, item];
}

// function removeItem(cart: string[], item: string): string[] {
//   return cart.filter((i) => i !== item);
// }

test("cart starts empty", () => {
  const cart: string[] = [];
  expect(cart).toHaveLength(0);
});

test("can add an item", () => {
  const cart: string[] = [];
  const result = addItem(cart, "Rahul");
  expect(result).toHaveLength(1);
});

test("can add two items", () => {
  let cart: string[] = [];
  cart = addItem(cart, "Rahul");
  cart = addItem(cart, "Priya");
  expect(cart).toHaveLength(2);
});

test("cart is empty again", () => {
  const cart: string[] = [];
  expect(cart).toHaveLength(0);
});

// Which FIRST principles does the fixed version satisfy that the broken version violated?

// The fixed version follows the FIRST principles by making each test Independent and Repeatable. Each test creates its own cart instead of sharing global state, so tests can run in any order without affecting one another.