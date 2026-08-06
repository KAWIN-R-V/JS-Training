/*
Task 2.2 — Notification Factory

The send() call is identical for all notification channels because each concrete
class implements the same Notifier interface.

The interface provides a common contract, allowing the caller to work with any
notification type without knowing its implementation.

Without the interface, the caller would need to create each concrete class
directly and the loop would contain multiple if/else or switch statements,
making the code more complex and tightly coupled to the implementations.
*/




/*
Task 2.3 — Extend the Factory

Only one existing line in the factory (adding a new switch case) and one
existing line in the channels array needed to change to support Slack.
All other code was added without modifying the existing notification logic.

This demonstrates that the Factory pattern is easy to extend. New types can
be added with minimal changes to existing code, following the Open/Closed
Principle (open for extension, closed for modification).
*/

interface Notifier {
  send(recipient: string, message: string): void;
}

// Email
class EmailNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Email] To: ${recipient} — ${message}`);
  }
}

// SMS
class SMSNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[SMS] To: ${recipient} — ${message}`);
  }
}

// Push
class PushNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Push] To: ${recipient} — ${message}`);
  }
}

// NEW: Slack
class SlackNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Slack] To: ${recipient} — ${message}`);
  }
}

// Factory
function createNotifier(channel: string): Notifier {
  switch (channel.toLowerCase()) {
    case "email":
      return new EmailNotifier();

    case "sms":
      return new SMSNotifier();

    case "push":
      return new PushNotifier();

    // NEW
    case "slack":
      return new SlackNotifier();

    default:
      throw new Error(
        `createNotifier: unknown channel '${channel}', expected one of: email, sms, push, slack`
      );
  }
}

// ----------------------
// Test
// ----------------------

const channels = [
  "email",
  "sms",
  "push",
  "slack", // NEW
];

for (const channel of channels) {
  const notifier = createNotifier(channel);

  notifier.send(
    "user@example.com",
    "Your order has been confirmed."
  );
}


/**
Comments:

To support the new Slack notification type, only two existing pieces of code needed to change:

1. Added one new `case "slack"` in the factory.
2. Added `"slack"` to the channels array.

All other changes were additions rather than modifications. This shows that the Factory pattern makes the system easy to extend because new implementations can be introduced with minimal impact on existing code.

*/
