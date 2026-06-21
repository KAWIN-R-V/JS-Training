type UserId = string;
type ProductId = string;
type Timestamp = number;

type Status = "active" | "inactive" | "pending";

type Direction = "north" | "south" | "east" | "west";

function getUserById(id: UserId): void {
  console.log(`Fetching user: ${id}`);
}

function updateStatus(id: UserId, status: Status): void {
  console.log(`User ${id} updated to ${status}`);
}

function move(direction: Direction, steps: number): void {
  console.log(`Moving ${steps} steps towards ${direction}`);
}

getUserById("USR001");

updateStatus("USR001", "active");

move("north", 10);

/*
Observation:

UserId is simply an alias for string.

This works:

getUserById("ABC123");

TypeScript allows it because UserId and string
are structurally the same type.
*/

/*
Structural Typing:

UserId and ProductId are both strings.

TypeScript treats them as compatible because
it compares structure rather than type names.

Limitation:
A ProductId can accidentally be passed where
a UserId is expected.
*/