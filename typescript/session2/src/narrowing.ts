function describe(
  value:
    | string
    | number
    | boolean
    | null
): string {

  if (value === null) {
    return "No value provided";
  }

  if (typeof value === "string") {
    return `String of length ${value.length}: ${value}`;
  }

  if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  }

  return `Boolean: ${value}`;
}

console.log(describe("TypeScript"));
console.log(describe(12.567));
console.log(describe(true));
console.log(describe(null));

interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function makeSound(
  animal: Cat | Dog
): void {

  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}

const cat: Cat = {
  meow() {
    console.log("Meow");
  }
};

const dog: Dog = {
  bark() {
    console.log("Woof");
  }
};

makeSound(cat);
makeSound(dog);

function summarise(
  input:
    | string
    | number[]
    | { label: string }
): string {

  if (typeof input === "string") {
    return `String: ${input}`;
  }

  if (Array.isArray(input)) {
    return `Array with ${input.length} numbers`;
  }

  return `Object Label: ${input.label}`;
}

console.log(
  summarise("Hello")
);

console.log(
  summarise([1, 2, 3])
);

console.log(
  summarise({
    label: "Product"
  })
);

/*
Discriminated Union Example

interface Cat2 {
  kind: "cat";
  meow(): void;
}

interface Dog2 {
  kind: "dog";
  bark(): void;
}

type Animal = Cat2 | Dog2;

function sound(animal: Animal) {
  if (animal.kind === "cat") {
    animal.meow();
  } else {
    animal.bark();
  }
}

Why better?

The kind property clearly identifies
the exact type and avoids ambiguity.
*/