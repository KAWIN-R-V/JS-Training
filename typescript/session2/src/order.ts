interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface Product {
  readonly id: string;
  name: string;
  price: number;
  category: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  readonly id: string;
  customer: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: "pending" | "shipped" | "delivered";
  createdAt: Date;
}

function calculateTotal(order: Order): number {
  return order.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}

const order: Order = {
  id: "ORD001",
  customer: "Kawin",
  items: [
    {
      product: {
        id: "P1",
        name: "Laptop",
        price: 50000,
        category: "Electronics"
      },
      quantity: 1
    },
    {
      product: {
        id: "P2",
        name: "Mouse",
        price: 1000,
        category: "Accessories"
      },
      quantity: 2
    }
  ],
  shippingAddress: {
    street: "123 Main Street",
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    postalCode: "641001"
  },
  status: "pending",
  createdAt: new Date()
};

console.log(calculateTotal(order));

/*
Recursive Type Example

interface TreeNode {
  value: string;
  children: TreeNode[];
}
*/