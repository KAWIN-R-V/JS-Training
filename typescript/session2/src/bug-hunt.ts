interface Product {
  id: string;
  name: string;
  price: number;
  tags: string[];
  discount?: number;
}

// Bug 1

function applyDiscount(
  product: Product
): number {

  const discount =
    product.discount ?? 0;

  return product.price - discount;
}

/*
Without fix:
price - undefined
results in NaN.
*/

// Bug 2

function getTagSummary(
  product: Product
): string {

  return product.tags
    .join(", ")
    .toUpperCase();
}

/*
Bug:
toUppercase()

Correct:
toUpperCase()
*/

// Bug 3

function createProduct(
  name: string,
  price: number
): Product {

  return {
    id: Math.random().toString(),
    name,
    price,
    tags: []
  };
}

/*
Without types:
parameters become implicit any.
*/

// Bug 4

function findCheapest(
  products: Product[]
): Product {

  if (products.length === 0) {
    throw new Error(
      "No products available"
    );
  }

  const sorted = [...products]
    .sort(
      (a, b) =>
        a.price - b.price
    );

  return sorted[0];
}

/*
Without check:
sorted[0]
could be undefined.
*/

// Bug 5

function printProduct(
  product: Product
): void {

  console.log(
    `${product.name} costs ₹${product.price}`
  );
}

/*
Function declared void.

Returning:
return product.name;

causes a type error.
*/

const laptop = createProduct(
  "Laptop",
  50000
);

console.log(
  applyDiscount({
    ...laptop,
    discount: 5000
  })
);

console.log(
  getTagSummary({
    ...laptop,
    tags: [
      "electronics",
      "computer"
    ]
  })
);

printProduct(laptop);