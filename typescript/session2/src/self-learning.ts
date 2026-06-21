interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "editor" | "viewer";
}

/* =====================================
   PARTIAL<T>
===================================== */

function updateUser(
  user: User,
  updates: Partial<User>
): User {
  return {
    ...user,
    ...updates
  };
}

const user1: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  role: "admin"
};

const updatedUser = updateUser(
  user1,
  {
    age: 25
  }
);

console.log(updatedUser);

/* =====================================
   PICK<T, K>
===================================== */

type UserContact = Pick<
  User,
  "name" | "email"
>;

function sendWelcomeEmail(
  user: UserContact
): void {
  console.log(
    `Welcome ${user.name}! Email sent to ${user.email}`
  );
}

sendWelcomeEmail({
  name: "Bob",
  email: "bob@example.com"
});

/* =====================================
   OMIT<T, K>
===================================== */

type NewUser = Omit<User, "id">;

function createUser(
  user: NewUser
): User {

  return {
    id: Math.floor(
      Math.random() * 1000
    ),
    ...user
  };
}

const createdUser = createUser({
  name: "Charlie",
  email: "charlie@example.com",
  role: "viewer"
});

console.log(createdUser);

/* =====================================
   RECORD<K, V>
===================================== */

type Role = User["role"];

type PermissionMap = Record<
  Role,
  string[]
>;

const permissions: PermissionMap = {
  admin: [
    "create",
    "update",
    "delete",
    "manage"
  ],
  editor: [
    "create",
    "update"
  ],
  viewer: [
    "read"
  ]
};

function getPermissions(
  role: Role
): string[] {
  return permissions[role];
}

console.log(
  getPermissions("admin")
);
export {};