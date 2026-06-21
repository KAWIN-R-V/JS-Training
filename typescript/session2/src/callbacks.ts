type Predicate<T> = (value: T) => boolean;

type Transform<T, U> = (value: T) => U;

type EventHandler = (
  eventName: string,
  payload: unknown
) => void;

function filter<T>(
  items: T[],
  predicate: Predicate<T>
): T[] {
  return items.filter(predicate);
}

function transform<T, U>(
  items: T[],
  fn: Transform<T, U>
): U[] {
  return items.map(fn);
}

const numbers = [1, 2, 3, 4, 5];

const evenNumbers = filter(
  numbers,
  num => num % 2 === 0
);

const stringNumbers = transform(
  numbers,
  num => num.toString()
);

console.log(evenNumbers);
console.log(stringNumbers);

const logEvent: EventHandler = (
  eventName,
  payload
) => {
  console.log(eventName, payload);
};

logEvent("login", {
  username: "admin"
});