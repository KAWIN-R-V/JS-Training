interface InvoiceItem {
  price: number;
  quantity: number;
}

interface User {
  title?: string;
  firstName: string;
  lastName: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

function calculateInvoiceTotal(
  items: InvoiceItem[],
  taxRate: number
): number {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }

  const tax = total * taxRate;

  return total + tax;
}

function formatCurrency(
  amount: number,
  currencyCode: string
): string {
  return `${currencyCode}${amount.toFixed(2)}`;
}

function getUserDisplayName(
  user: User
): string {
  if (user.title) {
    return `${user.title} ${user.firstName} ${user.lastName}`;
  }

  return `${user.firstName} ${user.lastName}`;
}

function findProductByCategory(
  products: Product[],
  category: string
): Product[] {
  return products.filter(
    product => product.category === category
  );
}