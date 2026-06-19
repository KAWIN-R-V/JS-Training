type Id = string | number;

let value: Id = "abc";
value = 123;

function sendRequest(method: "GET" | "POST") {
  console.log(method);
}

const numbers: readonly number[] = [1, 2, 3];

// numbers.push(4); // Error

let nameOrNull: string | null = "Alice";

if (nameOrNull !== null) {
  console.log(nameOrNull.toUpperCase());
}