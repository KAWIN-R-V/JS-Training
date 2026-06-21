type Identifiable = {
  readonly id: string;
};

type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type SoftDeletable = {
  deletedAt?: Date;
  isDeleted: boolean;
};

type BaseRecord =
  Identifiable &
  Timestamped;

type UserRecord =
  BaseRecord & {
    name: string;
    email: string;
  };

type AuditedUserRecord =
  UserRecord &
  SoftDeletable;

function isDeleted(
  record: SoftDeletable
): boolean {
  return record.isDeleted;
}

const baseRecord: BaseRecord = {
  id: "1",
  createdAt: new Date(),
  updatedAt: new Date()
};

const userRecord: UserRecord = {
  id: "2",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Alice",
  email: "alice@example.com"
};

const auditedUser: AuditedUserRecord = {
  id: "3",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Bob",
  email: "bob@example.com",
  isDeleted: false
};

console.log(isDeleted(auditedUser));

/*
Intersection Conflict Example

type A = {
  value: string;
};

type B = {
  value: number;
};

type C = A & B;

Result:

value becomes never

No object can satisfy both
string and number simultaneously.

Therefore C cannot be created.
*/