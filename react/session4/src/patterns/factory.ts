/*
Task 2.1 — Report Generator Factory

The caller only depends on the ReportGenerator interface and the
createReportGenerator() factory function. It does not need to know which
concrete class (CSV, JSON, or HTML) is being created.

Benefits:
- Reduces coupling between the caller and implementation classes.
- Makes it easy to add new report formats without changing caller code.
- The caller only requests a format and receives an object that implements
  the ReportGenerator interface.

Without a factory, the caller would need code like:

if (format === "csv")
    generator = new CSVReportGenerator();
else if (format === "json")
    generator = new JSONReportGenerator();
else if (format === "html")
    generator = new HTMLReportGenerator();

If there were five or more formats, the caller would become harder to read
and maintain.
*/

interface ReportGenerator {
  generate(data: Record<string, unknown>[]): string;
}

// CSV Report
class CSVReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
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

// JSON Report
class JSONReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    return JSON.stringify(data, null, 2);
  }
}

// HTML Report
class HTMLReportGenerator implements ReportGenerator {
  generate(data: Record<string, unknown>[]): string {
    if (data.length === 0) {
      return "<table></table>";
    }

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

// Factory
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

const csv = createReportGenerator("csv");
const json = createReportGenerator("json");
const html = createReportGenerator("html");

console.log("----- CSV -----");
console.log(csv.generate(data));

console.log("\n----- JSON -----");
console.log(json.generate(data));

console.log("\n----- HTML -----");
console.log(html.generate(data));