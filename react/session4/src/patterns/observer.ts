// src/patterns/observer.ts

/*
Task 1.1

Comment:
notify() is marked as protected because only the Subject itself should decide
when observers are notified.

If notify() were public, any external code could trigger notifications without
changing the Subject's state. For example:

const store = new OrderStore();
store.notify(fakeOrder);

Observers would receive a notification even though no real order was placed,
leading to inconsistent application state and incorrect behaviour.

------------------------------------------------------------

Task 1.2

Comment:
Adding the AuditLog observer required only one new line in OrderStore usage:

store.subscribe(audit);

No changes were required inside OrderStore itself.

This demonstrates the Open/Closed Principle. The Observer pattern allows new
behaviour to be added by introducing new observers rather than modifying the
Subject, making the system easier to extend.

------------------------------------------------------------

Task 1.3

Comment:

In a real system, observers may be unsubscribed at runtime when they are no
longer needed.

Example 1:
A user signs out of an application. UI observers that update the screen should
unsubscribe so they no longer receive notifications.

Example 2:
A temporary analytics or logging service is disabled after collecting enough
data. Unsubscribing prevents unnecessary processing while allowing the rest of
the system to continue receiving notifications.

------------------------------------------------------------

Task 1.4

Comment:

From reading placeOrder() alone, it is not obvious that four different
operations occur when an order is placed. The method simply calls
this.notify(order), while the actual work is hidden inside the observers.

This is usually a benefit because OrderStore remains simple and does not need
to know about shipment, email, audit logging, or analytics.

However, it can become a problem when there are many observers or when the
observers perform expensive work. It becomes harder to understand the complete
effect of placing an order, debugging is more difficult, and processing time
increases because every observer executes when notify() is called.
*/
// --------------------
// Observer interface
// --------------------

interface Observer {
  update(data: unknown): void;
}

// --------------------
// Subject base class
// --------------------

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(
      (observerItem) => observerItem !== observer
    );
  }

  protected notify(data: unknown): void {
    this.observers.forEach((observerItem) =>
      observerItem.update(data)
    );
  }
}

// --------------------
// Order type
// --------------------

type Order = {
  id: string;
  customerEmail: string;
  total: number;
};

// --------------------
// OrderStore (Subject)
// --------------------

class OrderStore extends Subject {
  private orders: Order[] = [];

  placeOrder(order: Order): void {
    this.orders.push(order);
    this.notify(order);
  }

  cancelOrder(id: string): void {
    const index = this.orders.findIndex(
      (order) => order.id === id
    );

    if (index === -1) {
      return;
    }

    const [order] = this.orders.splice(index, 1);

    this.notify({
      cancelled: true,
      order,
    });
  }

  getOrders(): Order[] {
    return [...this.orders];
  }
}

// --------------------
// Observers
// --------------------

class ShipmentQueue implements Observer {
  update(data: unknown): void {
    const payload = data as Order;

    console.log(
      `[ShipmentQueue] scheduling delivery for ${payload.id}`
    );
  }
}

class EmailService implements Observer {
  update(data: unknown): void {
    const payload = data as Order;

    console.log(
      `[EmailService] sending confirmation to ${payload.customerEmail}`
    );
  }
}

class AuditLog implements Observer {
  update(data: unknown): void {
    const payload = data as Order;

    console.log(
      `[AuditLog] recorded order ${payload.id} at ${new Date().toISOString()}`
    );
  }
}

class AnalyticsService implements Observer {
  update(data: unknown): void {
    const order = data as Order;

    console.log(
      `[AnalyticsService] tracking purchase event for order ${order.id}, value: ${order.total}`
    );
  }
}

// --------------------
// Demo
// --------------------

const store = new OrderStore();

const shipment = new ShipmentQueue();
const email = new EmailService();
const audit = new AuditLog();

const analytics = new AnalyticsService();

store.subscribe(shipment);
store.subscribe(email);
store.subscribe(audit);

store.subscribe(analytics);

store.placeOrder({
  id: "ORD-001",
  customerEmail: "alice@example.com",
  total: 1500,
});

store.placeOrder({
  id: "ORD-002",
  customerEmail: "bob@example.com",
  total: 800,
});


console.log("\n--- Unsubscribe AuditLog ---");

store.unsubscribe(audit);

store.placeOrder({
  id: "ORD-003",
  customerEmail: "carol@example.com",
  total: 200,
});

console.log("\n--- Re-subscribe AuditLog ---");

store.subscribe(audit);

store.placeOrder({
  id: "ORD-004",
  customerEmail: "david@example.com",
  total: 500,
});

console.log("\n--- Analytics Service Added ---");

store.placeOrder({
  id: "ORD-005",
  customerEmail: "eve@example.com",
  total: 1200,
});