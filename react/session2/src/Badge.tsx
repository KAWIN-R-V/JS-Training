interface BadgeProps {
  label: string;
  color: string;
}

/*
Single Responsibility:
This component displays a reusable badge
with a customizable label and color.
*/

function Badge({ label, color }: BadgeProps) {
  return (
    <span
      style={{
        background: color,
        color: "white",
        padding: "4px 10px",
        borderRadius: "5px",
        fontSize: "12px",
      }}
    >
      {label}
    </span>
  );
}

export default Badge;