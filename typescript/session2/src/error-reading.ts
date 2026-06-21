/*
ERROR 1

Property 'username' does not exist on type 'User'

CAUSE
Trying to access a property that is not defined.
*/

interface User {
  name: string;
}

const user: User = {
  name: "Alice"
};

// user.username

/*
FIX

Use:

user.name
*/

/* ------------------------------------------------ */

/*
ERROR 2

Argument of type 'string'
is not assignable to parameter of type 'number'
*/

function square(
  value: number
): number {
  return value * value;
}

// square("5")

/*
FIX

square(5)
*/

/* ------------------------------------------------ */

/*
ERROR 3

Parameter 'data'
implicitly has an 'any' type
*/

// function print(data) {
//   console.log(data);
// }

/*
FIX
*/

function print(
  data: string
): void {
  console.log(data);
}

/* ------------------------------------------------ */

/*
ERROR 4

Object is possibly undefined
*/

const users = ["Alice"];

const foundUser = users.find(
  user => user === "Bob"
);

// foundUser.toUpperCase()

/*
FIX
*/

if (foundUser) {
  console.log(
    foundUser.toUpperCase()
  );
}

/* ------------------------------------------------ */

/*
ERROR 5

Type 'string | undefined'
is not assignable to type 'string'
*/

interface Person {
  name?: string;
}

// const personName: string = person.name;

/*
FIX

Provide default value
*/

const person: Person = {};

const personName: string =
  person.name ?? "Unknown";

console.log(personName);