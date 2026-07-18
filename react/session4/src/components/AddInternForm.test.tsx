import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import AddInternForm from "./AddInternForm";

describe("AddInternForm", () => {
  test("updates name when user types", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    const nameInput = screen.getByPlaceholderText("Name");

    await user.type(nameInput, "Rahul");

    expect(nameInput).toHaveValue("Rahul");
  });

  test("updates score when user types", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    const scoreInput = screen.getByPlaceholderText("Score");

    await user.clear(scoreInput);
    await user.type(scoreInput, "92");

    expect(scoreInput).toHaveValue(92);
  });

  test("resets name input when Reset is clicked", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    const nameInput = screen.getByPlaceholderText("Name");

    await user.type(nameInput, "Rahul");

    await user.click(
      screen.getByRole("button", { name: "Reset" })
    );

    expect(nameInput).toHaveValue("");
  });

  test("checkbox toggles correctly", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeChecked();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  test("role dropdown changes value", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    const role = screen.getByRole("combobox");

    await user.selectOptions(role, "Backend");

    expect(role).toHaveValue("Backend");
  });
});

/*
userEvent simulates real user behaviour such as typing,
clicking and selecting options. It is preferred over
fireEvent because it triggers browser events in the
same order as an actual user interaction.
*/