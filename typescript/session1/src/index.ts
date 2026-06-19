console.log("TypeScript is running");

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));

// TypeScript types disappear after compilation.
// Type safety exists only during development.