/*
Task 1.1 — Logger Singleton

If the private constructor were removed, anyone could create multiple Logger
objects using "new Logger()". That would break the Singleton pattern because
different parts of the application would have separate log buffers instead of
sharing one instance.

The breakage can be detected by creating two Logger objects with "new Logger()"
and observing that they are different objects (a !== b) and do not share the
same logs.
*/

class Logger {
  // Stores the single Logger instance
  private static instance: Logger | null = null;

  // Stores log messages
  private logs: string[] = [];

  // Prevent object creation from outside the class
  private constructor() {}

  // Returns the single Logger instance
  public static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  // Adds a timestamped log entry
  public log(message: string): void {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}`;

    this.logs.push(entry);
    console.log(entry);
  }

  // Returns a copy of the logs
  public getLogs(): string[] {
    return [...this.logs];
  }
}

// ----------------------
// Expected usage
// ----------------------

const a = Logger.getInstance();
const b = Logger.getInstance();

a.log("system started");
b.log("request received");

console.log("Same object:", a === b);
console.log("Total logs:", a.getLogs().length);





/*
Task 1.3 — Testing Problem

The second test produces the wrong result because Logger is a Singleton.
Both tests share the same Logger instance and the same internal log buffer.
Data created by the first test remains in memory and affects the second test.

This demonstrates that Singleton objects break test isolation because tests
are no longer independent.

In a real test suite, this problem can be solved by adding a method such as
clearLogs() (or reset()) to the Logger class, allowing each test to start
with a clean state.
*/

// ----------------------
// Manual test functions
// ----------------------

function testLoggerStartsEmpty(): void {
  const logger = Logger.getInstance();

  logger.log("left over from a previous operation");

  const fresh = Logger.getInstance();

  console.log("Logs should be empty:", fresh.getLogs());
}

function testLoggerCountsCorrectly(): void {
  const logger = Logger.getInstance();

  logger.log("entry one");

  console.log(
    "Expected 1 log, got:",
    logger.getLogs().length
  );
}

// Run tests

console.log("\n--- Test 1 ---");
testLoggerStartsEmpty();

console.log("\n--- Test 2 ---");
testLoggerCountsCorrectly();


/*
Comments:
> Why did the second test get a wrong result? What does this
    The second test gets the wrong result because it shares the same Singleton instance and log buffer as the first test.
> tell you about Singleton and test isolation? How would you fix this in a real test suite
    This shows that Singletons can break test isolation because state persists across tests.
> (think: what method would you add to the Logger class to support testing)?
    A common solution is to add a clearLogs() or reset() method that tests can call before each test to ensure a clean starting state. This directly addresses the assignment's request to explain how you would support testing.
*/