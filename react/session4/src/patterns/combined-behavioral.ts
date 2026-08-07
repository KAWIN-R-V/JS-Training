// src/patterns/combined-behavioral.ts

/*
Task 3.1

Comment:

Monitor: 18999 -> 14999
- DiscountAlertObserver fires because the price dropped by more than 10%.
- PriceHistoryObserver always fires because it records every price change.
- BudgetTrackerObserver does not fire because 14999 is still above the 2000 threshold.

Keyboard: 2499 -> 1999
- DiscountAlertObserver fires because the price dropped by about 20%.
- PriceHistoryObserver fires because it records every change.
- BudgetTrackerObserver fires because the new price is now below the budget threshold (2000).

Mouse: 899 -> 849
- DiscountAlertObserver does not fire because the price drop is less than 10%.
- PriceHistoryObserver fires because it records every change.
- BudgetTrackerObserver fires because the price is below 2000.
*/


/*
Behavioral Pattern Audit

File reviewed: src/hooks/useInternSearch.ts

1. Is there any object that directly calls methods on multiple other objects
   in response to a state change?
   → Possible Observer problem? No.
   Reason:
   The hook computes filtered data and statistics but does not notify multiple
   independent objects when its state changes.

2. Is there any function or method with a growing if/else block that selects
   different behaviour based on a type, mode, or string value?
   → Possible Strategy problem? Yes.
   Reason:
   Different filtering or sorting behaviours could eventually be selected based
   on user preferences (for example, by name, score, role, or attendance). If
   implemented using multiple if/else or switch statements, the hook would
   become harder to maintain.

3. Rule of three check:
   - Observer:
     No. The hook does not repeatedly notify multiple objects.
   - Strategy:
     Yes. If additional filtering or sorting options continue to be added, the
     selection logic would continue to grow and would benefit from the Strategy
     pattern.

4. If a pattern fits:
   The filtering and sorting behaviour could be extracted into separate strategy
   classes (or functions), while the hook simply chooses and executes the
   selected strategy.

5. If no pattern fits:
   The current implementation is still relatively small. A simple function-based
   solution is sufficient until multiple independent behaviours or repeated
   conditional logic appear. Introducing additional patterns too early would add
   unnecessary complexity.
*/


// -------------------------------------------------
// Observer Infrastructure
// -------------------------------------------------

interface Observer {
  update(data: unknown): void;
}

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

// -------------------------------------------------
// Event Type
// -------------------------------------------------

type PriceChangeEvent = {
  product: string;
  oldPrice: number;
  newPrice: number;
};

// -------------------------------------------------
// Subject
// -------------------------------------------------

class PricingEngine extends Subject {
  updatePrice(
    product: string,
    oldPrice: number,
    newPrice: number
  ): void {
    this.notify({
      product,
      oldPrice,
      newPrice,
    });
  }
}

// -------------------------------------------------
// Observers
// -------------------------------------------------

class DiscountAlertObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent;

    const percent =
      ((event.oldPrice - event.newPrice) /
        event.oldPrice) *
      100;

    if (percent > 10) {
      console.log(
        `[Discount] ${event.product} dropped by ${percent.toFixed(
          1
        )}% — alert sent`
      );
    }
  }
}

class PriceHistoryObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent;

    console.log(
      `[History] ${event.product}: ${event.oldPrice} -> ${event.newPrice}`
    );
  }
}

class BudgetTrackerObserver implements Observer {
  private readonly threshold = 2000;

  update(data: unknown): void {
    const event = data as PriceChangeEvent;

    if (event.newPrice < this.threshold) {
      console.log(
        `[Budget] ${event.product} is now under budget at ${event.newPrice}`
      );
    }
  }
}

// -------------------------------------------------
// Demo
// -------------------------------------------------

const engine = new PricingEngine();

engine.subscribe(new DiscountAlertObserver());
engine.subscribe(new PriceHistoryObserver());
engine.subscribe(new BudgetTrackerObserver());

engine.updatePrice(
  "Monitor",
  18999,
  14999
);

engine.updatePrice(
  "Keyboard",
  2499,
  1999
);

engine.updatePrice(
  "Mouse",
  899,
  849
);