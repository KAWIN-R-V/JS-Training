import React from "react";

interface User {
  name: string;
  isAdmin: boolean;
}

// Grandchild — actually uses the user
function UserBadge({ user }: { user: User }) {
  return (
    <div>
      <p>Logged in as: {user.name}</p>
      {user.isAdmin && <span>Admin</span>}
    </div>
  );
}

// Middle component
// Prop drilling forces this component to receive and pass props
// even though it doesn't use them. If User gains new fields,
// this component may also need updates unnecessarily.
function InternCard({ user }: { user: User }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <p>Intern Card Content</p>
      <UserBadge user={user} />
    </div>
  );
}

// Parent
// This component only forwards the user prop.
// As the application grows, prop drilling makes components harder
// to maintain because intermediate components depend on props they don't use.
function InternList({ user }: { user: User }) {
  return (
    <div>
      <InternCard user={user} />
      <InternCard user={user} />
    </div>
  );
}

function PropDrillingDemo() {
  const user: User = {
    name: "Rahul",
    isAdmin: true,
  };

  return <InternList user={user} />;
}

export default PropDrillingDemo;