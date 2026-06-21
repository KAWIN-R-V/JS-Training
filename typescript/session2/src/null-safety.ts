// Function 1

function getFirstWord(
  sentence: string | null
): string {
  if (sentence === null) {
    return "";
  }

  return sentence.split(" ")[0];
}

/*
Without this check:
sentence.split(...)
would crash if sentence is null.
*/

// Function 2

function getUserAge(
  user: {
    name: string;
    age?: number;
  }
): string {
  if (user.age === undefined) {
    return `${user.name}'s age is unknown`;
  }

  return `${user.name} is ${user.age.toString()} years old`;
}

/*
Without the check:
user.age.toString()
would fail if age is undefined.
*/

// Function 3

const config = {
  database: {
    host: "localhost",
    port: 5432
  }
};

function getDbPort(): number {
  return config.database.port;
}

/*
Safe because port always exists.
*/

// Function 4

const users = [
  "Alice",
  "Bob",
  "Charlie"
];

function findUser(
  name: string
): string {
  const found = users.find(
    user => user === name
  );

  if (!found) {
    return "User not found";
  }

  return found.toUpperCase();
}

/*
Without the check:
found may be undefined.

Calling toUpperCase()
would throw a runtime error.
*/

console.log(getFirstWord("Hello World"));
console.log(getUserAge({ name: "Alice", age: 25 }));
console.log(getDbPort());
console.log(findUser("Bob"));

export {};