function logEvent(event: string): void {
  console.log(event);
}

function fail(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}