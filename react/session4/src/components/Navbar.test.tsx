import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("renders dashboard title", () => {
    render(<Navbar />);

    expect(
      screen.getByText("Intern Dashboard")
    ).toBeInTheDocument();
  });

  test("theme toggle button is visible", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("button")
    ).toBeInTheDocument();
  });

  test("changes button text after clicking", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Switch to Dark Mode");

    await user.click(button);

    expect(button).toHaveTextContent("Switch to Light Mode");
  });
});

/*
The Navbar depends on ThemeProvider.
Using render() from test-utils automatically wraps
the component inside ThemeProvider.
*/