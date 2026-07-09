// React uses the key prop to uniquely identify each list item.
// Without a key, React shows a warning because it cannot efficiently
// track which items have changed, been added, or removed.

function SkillList() {
  const skills: string[] = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React",
  ];

  return (
    <div>
      <h3>Skills Covered</h3>

      <ul>
        {skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <p>Total: {skills.length} skills</p>

      {/* Removing the key prop causes React to display a warning.
          Keys help React identify which items have changed.
          Using the array index as a key is acceptable for static lists,
          but a unique ID is preferred for dynamic lists. */}
    </div>
  );
}

export default SkillList;