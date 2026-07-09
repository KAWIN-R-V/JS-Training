// TSX expressions are written inside {} and return a value to display.
// Statements like if and for cannot be used directly inside TSX because
// they do not return a value. Use ternary operators or Array.map() instead.

function Profile() {
  const name: string = "Kawin R V";
  const role: string = "Intern";
  const score: number = 92;
  const joinDate: string = "2026-06-30";

  // Used for TSX attribute expressions
  const avatarUrl: string = "https://i.pravatar.cc/100";
  const altText: string = `Avatar of ${name}`;

  return (
    <div>
      <h2>{name}</h2>

      <img src={avatarUrl} alt={altText} width={100} />

      <p>Role: {role}</p>

      <p>Score: {score} / 100</p>

      <p>Name uppercase: {name.toUpperCase()}</p>

      <p>Score doubled: {score * 2}</p>

      <p>Joined: {new Date(joinDate).toDateString()}</p>

      {/* width={100} passes a number, while width="100" passes a string.
          Use {} when passing JavaScript values or expressions. */}
    </div>
  );
}

export default Profile;