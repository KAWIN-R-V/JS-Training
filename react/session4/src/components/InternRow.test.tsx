import { describe, test, expect, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import InternRow from "./InternRow";

describe("InternRow", () => {
  test("renders intern information", () => {
    render(
      <InternRow
        id={1}
        name="Rahul"
        score={92}
        onRemove={() => {}}
      />
    );

    expect(screen.getByText(/Rahul/)).toBeInTheDocument();
    expect(screen.getByText(/92/)).toBeInTheDocument();
  });

  test("calls onRemove when Remove button is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <InternRow
        id={5}
        name="Rahul"
        score={92}
        onRemove={onRemove}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: /remove/i,
      })
    );

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(5);
  });

  test("does not call callback before clicking", () => {
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
});