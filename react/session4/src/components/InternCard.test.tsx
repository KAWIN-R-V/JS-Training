import { render, screen } from "../test/test-utils";
import InternCard from "./InternCard";

// We import render and screen from test-utils instead of directly from
// Testing Library because test-utils automatically wraps components with
// the required providers (such as ThemeProvider).

test("renders the intern name", () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />);

  expect(screen.getByText("Rahul")).toBeInTheDocument();
});

test("renders the score", () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />);

  expect(screen.getByText("Score: 92")).toBeInTheDocument();
});

test("shows Present when isPresent is true", () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />);

  expect(screen.getByText("Present")).toBeInTheDocument();
});

test("shows Absent when isPresent is false", () => {
  render(<InternCard name="Amit" score={45} isPresent={false} />);

  expect(screen.getByText("Absent")).toBeInTheDocument();
});

// getBy is used when an element should exist.
// queryBy is used when checking that an element should NOT exist.

test("does not show Absent when intern is present", () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />);

  expect(screen.queryByText("Absent")).not.toBeInTheDocument();
});

test("does not show Present when intern is absent", () => {
  render(<InternCard name="Amit" score={45} isPresent={false} />);

  expect(screen.queryByText("Present")).not.toBeInTheDocument();
});


// Testing boundary values like 0 and 100 helps catch edge-case bugs
// that may not appear with typical values.

test("renders score of 0 correctly", () => {
  render(<InternCard name="Neha" score={0} isPresent={false} />);

  expect(screen.getByText("Score: 0")).toBeInTheDocument();
  expect(screen.getByText("Absent")).toBeInTheDocument();
});

test("renders score of 100 correctly", () => {
  render(<InternCard name="Neha" score={100} isPresent={true} />);

  expect(screen.getByText("Score: 100")).toBeInTheDocument();
  expect(screen.getByText("Present")).toBeInTheDocument();
});

test("renders a different name and score without mixing up values", () => {
  render(<InternCard name="Priya" score={75} isPresent={true} />);

  expect(screen.getByText("Priya")).toBeInTheDocument();
  expect(screen.getByText("Score: 75")).toBeInTheDocument();
});