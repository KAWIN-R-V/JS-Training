import { test, expect } from "vitest";
import { render, screen } from "../test/test-utils";
import InternCard from "./InternCard";

// getBy - throws an error if the element is not found
test("getByText throws when element is missing", () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />);

  expect(screen.getByText("Rahul")).toBeInTheDocument();

  // Uncomment to see the error
  // screen.getByText("Priya");
});

// queryBy - returns null instead of throwing
test("queryBy returns null when element is missing", () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />);

  expect(screen.queryByText("Absent")).not.toBeInTheDocument();
});

// getAllBy - returns multiple matching elements
test("getAllBy finds multiple elements", () => {
  render(
    <>
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
    </>
  );

  const presentBadges = screen.getAllByText("Present");

  expect(presentBadges).toHaveLength(2);
});

// getAllByRole is used when multiple elements of the same role are expected.
// getByRole is used when only one matching element should exist.