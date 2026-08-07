/*
Explore 3 — Configurable Strategy

A class-based strategy can store configuration, helper methods,
and internal state.

A function strategy is simpler but less suitable for configurable behaviour.
*/

type Product = {
  name: string;
  price: number;
  rating: number;
  salesCount: number;
};

interface SortStrategy {
  sort(products: Product[]): Product[];
}

type SortField =
  | "name"
  | "price"
  | "rating"
  | "salesCount";

type Direction =
  | "asc"
  | "desc";

class SortByField implements SortStrategy {
    private field: SortField;
    private direction: Direction;

    constructor(
        field: SortField,
        direction: Direction
    ) {
        this.field = field;
        this.direction = direction;
    }

  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
      const left = a[this.field];
      const right = b[this.field];

      if (left < right) {
        return this.direction === "asc"
          ? -1
          : 1;
      }

      if (left > right) {
        return this.direction === "asc"
          ? 1
          : -1;
      }

      return 0;
    });
  }
}

const products: Product[] = [
  {
    name: "Keyboard",
    price: 2499,
    rating: 4.3,
    salesCount: 1200,
  },
  {
    name: "Mouse",
    price: 899,
    rating: 4.5,
    salesCount: 3400,
  },
];

const strategy = new SortByField(
  "price",
  "asc"
);

console.log(strategy.sort(products));