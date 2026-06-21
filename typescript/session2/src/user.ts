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

// Error Example
// const invalidUser: User = {
//   id: 4,
//   name: "David",
//   email: "david@example.com",
//   role: "superuser"
// };

// Error Example
// adminUser.id = 100;

/*
readonly prevents accidental modification of the id.
It is safer than relying on developers to remember not to change it.
*/