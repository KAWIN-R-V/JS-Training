interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "editor" | "viewer";
}

const adminUser: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 25,
  role: "admin"
};

const editorUser: User = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  role: "editor"
};

const viewerUser: User = {
  id: 3,
  name: "Charlie",
  email: "charlie@example.com",
  role: "viewer"
};

/*
readonly prevents accidental changes
to the id after object creation.
*/

export {};