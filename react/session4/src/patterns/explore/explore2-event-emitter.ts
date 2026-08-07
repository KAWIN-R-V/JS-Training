/*
Explore 2 — EventEmitter

EventEmitter already provides listener registration, removal,
event names, once() listeners, and event dispatch.

It removes the need to manually implement the Subject class.
*/

import { EventEmitter } from "events";

type Order = {
  id: string;
  customerEmail: string;
  total: number;
};

class OrderStore extends EventEmitter {
  placeOrder(order: Order): void {
    this.emit("orderPlaced", order);
  }
}

const store = new OrderStore();

store.on("orderPlaced", (order: Order) => {
  console.log(
    `[Shipment] ${order.id}`
  );
});

store.on("orderPlaced", (order: Order) => {
  console.log(
    `[Email] ${order.customerEmail}`
  );
});

store.placeOrder({
  id: "ORD-001",
  customerEmail: "alice@example.com",
  total: 1500,
});