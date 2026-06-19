let dangerousValue: any = "hello";
dangerousValue = 42;
dangerousValue = { name: "Alice" };

let safeValue: unknown = "hello";

if (typeof safeValue === "string") {
  console.log(safeValue.toUpperCase());
}

// Type narrowing means reducing a broad type to a specific type.