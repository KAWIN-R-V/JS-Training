import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

interface User {
  id: string;
  name: string;
  email: string;
}

const cache: Record<string, User> = {};

function fetchUserFromCache(
  id: string
): User | null {
  return cache[id] || null;
}

function saveUserToCache(
  user: User
): void {
  cache[user.id] = user;
}

function processUsers<T, U>(
  users: T[],
  filterFn: (user: T) => boolean,
  transformFn: (user: T) => U
): U[] {
  return users
    .filter(filterFn)
    .map(transformFn);
}

function buildQueryString(
  params: Record<string, string>
): string {
  return Object.keys(params)
    .map(
      key =>
        `${key}=${encodeURIComponent(
          params[key]
        )}`
    )
    .join("&");
}

async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  delay: number
): Promise<T> {

  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      attempt++;

      if (attempt >= maxAttempts) {
        throw error;
      }

      await new Promise(resolve =>
        setTimeout(resolve, delay)
      );
    }
  }

  throw new Error("Retry failed");
}

const user: User = {
  id: "1",
  name: "Alice",
  email: "alice@example.com"
};

saveUserToCache(user);

console.log(
  fetchUserFromCache("1")
);

console.log(
  buildQueryString({
    page: "1",
    search: "typescript"
  })
);

processUsers(
  [user],
  u => u.name === "Alice",
  u => u.email
);

export {
  eventEmitter,
  fetchUserFromCache,
  saveUserToCache,
  processUsers,
  buildQueryString,
  retry
};
