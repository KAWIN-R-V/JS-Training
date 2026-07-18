import { render, screen } from "../test/test-utils";
import InternListWithCallback from "./InternListWithCallback";

describe("InternListWithCallback", () => {
  test("renders Intern List heading", () => {
    render(<InternListWithCallback />);

    expect(
      screen.getByText("Intern List")
    ).toBeInTheDocument();
  });

  test("renders remove buttons", async () => {
    render(<InternListWithCallback />);

    const buttons = await screen.findAllByRole("button", {
      name: "Remove",
    });

    expect(buttons.length).toBeGreaterThan(0);
  });
});