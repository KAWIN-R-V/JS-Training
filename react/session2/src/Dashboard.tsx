import Card from "./Card";
import InternCard from "./InternCard";

interface Intern {
  id: number;
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

const interns: Intern[] = [
  {
    id: 1,
    name: "Rahul",
    score: 92,
    isPresent: true,
    role: "Frontend",
  },
  {
    id: 2,
    name: "Priya",
    score: 78,
    isPresent: true,
    role: "Backend",
  },
  {
    id: 3,
    name: "Amit",
    score: 45,
    isPresent: false,
    role: "Frontend",
  },
  {
    id: 4,
    name: "Sneha",
    score: 95,
    isPresent: true,
    role: "Fullstack",
  },
];

function Dashboard(): React.ReactElement {
  const total: number = interns.length;

  const present: number = interns.filter(
    (intern: Intern) => intern.isPresent
  ).length;

  const averageScore: number =
    interns.reduce(
      (sum: number, intern: Intern) => sum + intern.score,
      0
    ) / total;

  return (
    <Card title="Intern Dashboard">
      <h2>Summary</h2>

      <p>
        <strong>Total:</strong> {total}
      </p>

      <p>
        <strong>Present:</strong> {present}
      </p>

      <p>
        <strong>Average Score:</strong> {averageScore.toFixed(2)}
      </p>

      <hr />

      {interns.map((intern: Intern) => (
        <InternCard
          key={intern.id}
          name={intern.name}
          score={intern.score}
          isPresent={intern.isPresent}
          role={intern.role}
        />
      ))}
    </Card>
  );
}

export default Dashboard;