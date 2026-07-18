import { render, screen } from "../test/test-utils";
import InternCard from "./InternCard";

// getBy - use when the element must exist
test("getByText finds an existing element", () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />);

  expect(screen.getByText("Rahul")).toBeInTheDocument();

  // Uncommenting this will throw an error because "Priya" isn't rendered
  // screen.getByText("Priya");
});

// queryBy - use when checking something should NOT exist
test("queryBy returns null when element is missing", () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />);

  expect(screen.queryByText("Absent")).not.toBeInTheDocument();
});

// getAllBy - finds multiple matching elements
test("getAllByText finds multiple Present labels", () => {
  render(
    <div>
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
    </div>
  );

  const badges = screen.getAllByText("Present");

  expect(badges).toHaveLength(2);
});

/*
getByRole() is used when only one matching element should exist.

getAllByRole() is used when multiple matching elements are expected,
such as several buttons, links or checkboxes.
*/