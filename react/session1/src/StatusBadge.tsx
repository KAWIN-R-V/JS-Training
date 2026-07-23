function StatusBadge() {
  const isAdmin: boolean = true;
  const hasWarning: boolean = false;
  const isVerified: boolean = true;
  const messages: string[] = [
    "Assignment submitted",
    "PR created",
  ];

  return (
    <div>
      {/* Show only if admin */}
      {isAdmin && <span>Admin</span>}

      <br />

      {/* Show only if warning */}
      {hasWarning && (
        <p style={{ color: "orange" }}>
          Warning: Incomplete tasks
        </p>
      )}

      {/* Show only if verified */}
      {isVerified && <span>Verified</span>}

      {/* Show empty state */}
      {messages.length === 0 && <p>No messages yet</p>}

      {/* Show list */}
      {messages.length > 0 && (
        <ul>
          {messages.map((msg: string, i: number) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}

      {/* If you replace messages.length > 0 with messages.length,
          React renders 0 when the array is empty because 0 is rendered
          as text, while false is ignored. */}
    </div>
  );
}

export default StatusBadge;