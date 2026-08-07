/*
Explore 4 — Strategy Factory

The Factory pattern hides strategy creation from callers.

The caller only specifies the strategy name, while the factory
creates the correct object. This reduces coupling and makes it
easy to add new strategies later.
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

class SortByName implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
}

class SortByPrice implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort(
      (a, b) => a.price - b.price
    );
  }
}

class SortByRating implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort(
      (a, b) => b.rating - a.rating
    );
  }
}

class SortByPopularity implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort(
      (a, b) => b.salesCount - a.salesCount
    );
  }
}

class SortStrategyFactory {
  static create(type: string): SortStrategy {
    switch (type) {
      case "name":
        return new SortByName();

      case "price":
        return new SortByPrice();

      case "rating":
        return new SortByRating();

      case "popularity":
        return new SortByPopularity();

      default:
        throw new Error(
          `Unknown strategy: ${type}`
        );
    }
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

const strategy =
  SortStrategyFactory.create("rating");

console.log(strategy.sort(products));