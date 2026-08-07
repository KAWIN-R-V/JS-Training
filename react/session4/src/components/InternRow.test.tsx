import { test, expect, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";

import InternRow from "./InternRow";
import InternCard from "./InternCard";

test("finds the Remove button by role", () => {
  render(
    <InternRow
      id={1}
      name="Rahul"
      score={92}
      onRemove={() => {}}
    />
  );

  const removeButton = screen.getByRole("button", {
    name: "Remove",
  });

  expect(removeButton).toBeInTheDocument();
});

// screen.debug() prints the current DOM to the console.
// It helps identify available elements and choose the best query.

test("calls onRemove with correct id", async () => {
  const user = userEvent.setup();
  const onRemove = vi.fn();

  render(
    <InternRow
      id={1}
      name="Rahul"
      score={92}
      onRemove={onRemove}
    />
  );

  await user.click(
    screen.getByRole("button", {
      name: "Remove",
    })
  );

  expect(onRemove).toHaveBeenCalledTimes(1);
  expect(onRemove).toHaveBeenCalledWith(1);
});

test("does not call onRemove on initial render", () => {
  const onRemove = vi.fn();

  render(
    <InternRow
      id={1}
      name="Rahul"
      score={92}
      onRemove={onRemove}
    />
  );

  expect(onRemove).not.toHaveBeenCalled();
});

test("does not log console errors", () => {
  const spy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  render(
    <InternCard
      name="Rahul"
      score={92}
      isPresent={true}
    />
  );

  expect(spy).not.toHaveBeenCalled();

  spy.mockRestore();
});

// vi.fn() creates a mock function.
// vi.mock() replaces an entire module.
// vi.spyOn() observes an existing function without permanently replacing it.