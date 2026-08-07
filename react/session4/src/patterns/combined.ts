/*
Task 3.1 — Singleton Logger Inside a Factory

The three report generators are different objects, but they all write to the
same Logger instance because Logger is implemented as a Singleton.

Without the Singleton pattern, each report generator would need a Logger object
passed into its constructor or generate() method (dependency injection). Every
caller would be responsible for creating and passing the same Logger instance
to each generator, making the code more complicated.
*/


/*
Task 3.2 — Pattern Recognition Audit

Pattern Recognition Audit

File reviewed: src/contexts/intern-context.tsx

1. Is there any object that is created more than once but should be shared?
   → Possible Singleton? Yes.
   Reason:
   The Intern Context provides a single shared source of intern data that is
   accessed throughout the application. A single shared instance avoids
   duplicate state and keeps all components synchronized.

2. Is there any conditional block (if/else or switch) that creates different
   objects based on a type or string value?
   → Possible Factory? Yes.
   Reason:
   The application creates different intern objects from form input. This
   creation logic could be centralized in a factory (or service) instead of
   being scattered throughout the application.

3. If a pattern applies: what would the refactored structure look like in one sentence?

   The InternProvider would manage one shared repository (Singleton-like
   shared state), while a factory or service would be responsible for creating
   Intern objects from form data.

4. If no pattern applies: what is missing that would make the pattern
   unnecessary complexity here?

   The project is relatively small and creates only one type of Intern object,
   so introducing additional factories beyond the existing service layer would
   add unnecessary complexity without providing significant benefits.
*/


// ----------------------
// Logger Singleton
// ----------------------

class Logger {
  private static instance: Logger | null = null;

  private logs: string[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: string): void {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}`;

    this.logs.push(entry);
    console.log(entry);
  }

  public getLogs(): string[] {
    return [...this.logs];
  }
}

// ----------------------
// Report Factory
// ----------------------

interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string;
}

class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `CSVReportGenerator: generated report with ${data.length} rows`
    );

    if (data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0]).join(",");

    const rows = data.map((row) =>
      Object.values(row).join(",")
    );

    return [headers, ...rows].join("\n");
  }
}

class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `JSONReportGenerator: generated report with ${data.length} rows`
    );

    return JSON.stringify(data, null, 2);
  }
}

class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    Logger.getInstance().log(
      `HTMLReportGenerator: generated report with ${data.length} rows`
    );

    const rows = data
      .map((row) => {
        const cells = Object.values(row)
          .map((value) => `<td>${value}</td>`)
          .join("");

        return `<tr>${cells}</tr>`;
      })
      .join("");

    return `<table>${rows}</table>`;
  }
}

// ----------------------
// Factory
// ----------------------

function createReportGenerator(
  format: string
): ReportGenerator {
  switch (format.toLowerCase()) {
    case "csv":
      return new CSVReportGenerator();

    case "json":
      return new JSONReportGenerator();

    case "html":
      return new HTMLReportGenerator();

    default:
      throw new Error(
        `createReportGenerator: unknown format '${format}', expected one of: csv, json, html`
      );
  }
}

// ----------------------
// Test Data
// ----------------------

const data = [
  {
    name: "Alice",
    score: 91,
    department: "Backend",
  },
  {
    name: "Bob",
    score: 84,
    department: "Frontend",
  },
];

// ----------------------
// Generate Reports
// ----------------------

const csv = createReportGenerator("csv");
const json = createReportGenerator("json");
const html = createReportGenerator("html");

csv.generate(data);
json.generate(data);
html.generate(data);

// ----------------------
// Print Shared Log
// ----------------------

console.log("\nComplete Logger Output:");
console.log(Logger.getInstance().getLogs());