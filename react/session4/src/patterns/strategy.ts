// src/patterns/strategy.ts

/*
Task 2.1

Comment:

Each sort() method must return a new array instead of sorting the original
array in place. If the original array were modified, every caller holding a
reference to that array would unexpectedly see the new order.

Example:

const products = [...];
const byName = strategy.sort(products);

// If sort() modified the original array:
console.log(products); // Original order is lost.

Returning a copy keeps the original data unchanged, avoids unexpected side
effects, and allows different strategies to sort the same data independently.
*/

// --------------------
// Product type
// --------------------

type Product = {
  name: string;
  price: number;
  rating: number;
  salesCount: number;
};

// --------------------
// Strategy interface
// --------------------

interface SortStrategy {
  sort(products: Product[]): Product[];
}

// --------------------
// Sort by Name
// --------------------

class SortByName implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
}

// --------------------
// Sort by Price
// --------------------

class SortByPrice implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort(
      (a, b) => a.price - b.price
    );
  }
}

// --------------------
// Sort by Rating
// --------------------

class SortByRating implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort(
      (a, b) => b.rating - a.rating
    );
  }
}

// --------------------
// Sort by Popularity
// --------------------

class SortByPopularity implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort(
      (a, b) => b.salesCount - a.salesCount
    );
  }
}

// --------------------
// Sort by Price (Descending)
// --------------------

class SortByPriceDesc implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort(
      (a, b) => b.price - a.price
    );
  }
}

/*
Task 2.2

Comment:

The sort() call on ProductCatalogue remains exactly the same regardless of
which sorting strategy is selected.

catalogue.sort(products)

The only thing that changes is the strategy object. This demonstrates the role
of the Strategy interface: it provides a common contract so ProductCatalogue
can work with any sorting algorithm without knowing its implementation.

Compared to an if/else or switch statement, the Strategy pattern removes
conditional logic from ProductCatalogue and makes it easy to add new sorting
algorithms without modifying existing code.
*/

// --------------------
// ProductCatalogue
// --------------------

class ProductCatalogue {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  sort(products: Product[]): Product[] {
    return this.strategy.sort(products);
  }
}

// --------------------
// Test Data
// --------------------

const products: Product[] = [
  {
    name: "Keyboard",
    price: 2499,
    rating: 4.3,
    salesCount: 1200,
  },
  {
    name: "Monitor",
    price: 18999,
    rating: 4.7,
    salesCount: 340,
  },
  {
    name: "Headset",
    price: 3499,
    rating: 4.1,
    salesCount: 870,
  },
  {
    name: "Webcam",
    price: 1999,
    rating: 3.9,
    salesCount: 2100,
  },
  {
    name: "Mouse",
    price: 899,
    rating: 4.5,
    salesCount: 3400,
  },
];

// --------------------
// Demonstration
// --------------------

const catalogue = new ProductCatalogue(
  new SortByName()
);

console.log(
  "By name:",
  catalogue.sort(products).map((product) => product.name)
);

catalogue.setStrategy(new SortByPrice());

console.log(
  "By price:",
  catalogue.sort(products).map((product) => product.name)
);

catalogue.setStrategy(new SortByRating());

console.log(
  "By rating:",
  catalogue.sort(products).map((product) => product.name)
);

catalogue.setStrategy(new SortByPopularity());

console.log(
  "By popularity:",
  catalogue.sort(products).map((product) => product.name)
);

catalogue.setStrategy(new SortByPriceDesc());

console.log(
  "By price desc:",
  catalogue.sort(products).map((product) => product.name)
);


/*
Task 2.3

Comment:

To add SortByPriceDesc, no existing strategy classes or ProductCatalogue
needed to be modified.

Only a new strategy class was added along with one new test call.

If ProductCatalogue had used a large if/else or switch statement, the existing
code would have needed to be modified to add another branch, increasing the
risk of introducing bugs and making the class harder to maintain.
*/



/*
Task 2.4

Comment:

Function-based strategies are a good choice for simple, stateless algorithms
because they are concise and easy to pass around.

A class-based strategy is preferable when the strategy needs its own state,
configuration, or helper methods. For example, a sorting strategy that stores
user preferences, caches previous results, or depends on configuration values
is better represented as a class. In those cases, a single function is not
sufficient because it cannot naturally encapsulate state and related behavior.
*/

// --------------------
// Function-based Strategies
// --------------------

type SortFn = (products: Product[]) => Product[];

const sortByName: SortFn = (products) =>
  [...products].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

const sortByPrice: SortFn = (products) =>
  [...products].sort(
    (a, b) => a.price - b.price
  );

function applySort(
  products: Product[],
  fn: SortFn
): Product[] {
  return fn(products);
}

console.log("\nFunction-based strategies:");

console.log(
  "By name:",
  applySort(products, sortByName).map(
    (product) => product.name
  )
);

console.log(
  "By price:",
  applySort(products, sortByPrice).map(
    (product) => product.name
  )
);

// Inline strategy
console.log(
  "By rating inline:",
  applySort(
    products,
    (productList) =>
      [...productList].sort(
        (a, b) => b.rating - a.rating
      )
  ).map((product) => product.name)
);