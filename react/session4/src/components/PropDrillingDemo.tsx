interface User {
  name: string;
  isAdmin: boolean;
}

// Grandchild component
function UserBadge({ user }: { user: User }) {
  return (
    <div>
      <p>Logged in as: {user.name}</p>

      {user.isAdmin && <span>Admin</span>}
    </div>
  );
}

// Middle component
function InternCard({ user }: { user: User }) {
  // Prop drilling:
  // This component doesn't use the user object.
  // It only receives it so it can pass it to UserBadge.
  // If the User interface changes, this component must also change
  // even though it doesn't actually use the data.
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "8px",
        marginBottom: "10px",
      }}
    >
      <p>Intern Card Content</p>

      <UserBadge user={user} />
    </div>
  );
}

// Parent component
function InternList({ user }: { user: User }) {
  // Prop drilling:
  // InternList only forwards the user prop to its children.
  // It doesn't use the data itself.
  // This creates unnecessary dependency between components.
  return (
    <div>
      <InternCard user={user} />
      <InternCard user={user} />
    </div>
  );
}

// Top-level component
function PropDrillingDemo() {
  const user: User = {
    name: "Rahul",
    isAdmin: true,
  };

  return <InternList user={user} />;
}

export default PropDrillingDemo;