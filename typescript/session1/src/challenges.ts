function throwError(message: string): never {
  throw new Error(message);
}

function calculateDiscount(
  price: number,
  discountPercent?: number
): number {
  if (!discountPercent) return price;

  if (discountPercent >= 100) {
    throwError("Invalid discount");
  }

  return price - (price * discountPercent) / 100;
}

function formatUserList(
  users: [string, number][]
): string[] {
  return users.map(
    ([name, age]) => `${name} (${age} years)`
  );
}

function findFirst(
  arr: string[],
  term: string
): string | undefined {
  return arr.find(item => item === term);
}