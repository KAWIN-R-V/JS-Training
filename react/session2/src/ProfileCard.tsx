interface ProfileCardProps {
  name?: string;
  role?: string;
  score?: number;
  skills?: string[];
}

/*
The ? symbol makes a prop optional.
If the parent component doesn't pass a value,
the default value defined in the function parameters is used.
*/

function ProfileCard({
  name = "Unknown",
  role = "Intern",
  score = 0,
  skills = [],
}: ProfileCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>

      <p>Role: {role}</p>

      <p>Score: {score}</p>

      {skills.length > 0 && (
        <div>
          <h4>Skills</h4>

          <ul>
            {skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/*
      If skills = [] is removed, TypeScript shows:
      'skills' is possibly 'undefined'.

      The default empty array ensures .length and .map()
      can be used safely without runtime errors.
      */}
    </div>
  );
}

export default ProfileCard;