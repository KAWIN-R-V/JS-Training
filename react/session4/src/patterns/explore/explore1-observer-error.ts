/*
Explore 1 — Observer Error Handling

When one observer throws an exception, execution stops and the remaining
observers are never notified.

Wrapping each observer call in a try/catch allows the remaining observers to
continue executing, making the Observer chain more robust.
*/

interface Observer {
  update(data: unknown): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  protected notify(data: unknown): void {
    this.observers.forEach((observer) => {
      try {
        observer.update(data);
      } catch (error) {
        console.error(error);
      }
    });
  }
}

type Order = {
  id: string;
  customerEmail: string;
  total: number;
};

class OrderStore extends Subject {
  placeOrder(order: Order): void {
    this.notify(order);
  }
}

class ShipmentQueue implements Observer {
  update(data: unknown): void {
    const order = data as Order;
    console.log(
      `[ShipmentQueue] scheduling delivery for ${order.id}`
    );
  }
}

class EmailService implements Observer {
  update(data: unknown): void {
    const order = data as Order;

    if (order.total > 1000) {
      throw new Error(
        "EmailService: simulated email server failure"
      );
    }

    console.log(
      `[EmailService] sending confirmation to ${order.customerEmail}`
    );
  }
}

class AuditLog implements Observer {
  update(data: unknown): void {
    const order = data as Order;

    console.log(
      `[AuditLog] recorded order ${order.id}`
    );
  }
}

const store = new OrderStore();

store.subscribe(new ShipmentQueue());
store.subscribe(new EmailService());
store.subscribe(new AuditLog());

store.placeOrder({
  id: "ORD-001",
  customerEmail: "alice@example.com",
  total: 1500,
});