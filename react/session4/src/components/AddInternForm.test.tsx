import { describe, test, expect, vi, beforeEach } from "vitest";

// Mock BEFORE importing the component
const mockAddIntern = vi.fn();

vi.mock("../contexts/intern-context", () => ({
  useInterns: () => ({
    interns: [],
    isLoading: false,
    addIntern: mockAddIntern,
    removeIntern: vi.fn(),
  }),
}));

import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import AddInternForm from "./AddInternForm";

describe("AddInternForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("name input is empty", () => {
    render(<AddInternForm />);
    expect(screen.getByPlaceholderText("Name")).toHaveValue("");
  });

  test("score input starts at 0", () => {
    render(<AddInternForm />);
    expect(screen.getByPlaceholderText("Score")).toHaveValue(0);
  });

  test("role defaults to Frontend", () => {
    render(<AddInternForm />);
    expect(screen.getByRole("combobox")).toHaveValue("Frontend");
  });

  test("updates name when user types", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    await user.type(
      screen.getByPlaceholderText("Name"),
      "Rahul"
    );

    expect(screen.getByDisplayValue("Rahul")).toBeInTheDocument();
  });

  test("updates score when user types", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    const scoreInput = screen.getByPlaceholderText("Score");

    await user.clear(scoreInput);
    await user.type(scoreInput, "92");

    expect(screen.getByDisplayValue("92")).toBeInTheDocument();
  });

  test("shows error when name is empty", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    await user.click(
      screen.getByRole("button", { name: "Add Intern" })
    );

    expect(
      screen.getByText("Name is required")
    ).toBeInTheDocument();
  });

  test("shows error when score is above 100", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    await user.type(
      screen.getByPlaceholderText("Name"),
      "Rahul"
    );

    const scoreInput = screen.getByPlaceholderText("Score");

    await user.clear(scoreInput);
    await user.type(scoreInput, "150");

    await user.click(
      screen.getByRole("button", { name: "Add Intern" })
    );

    expect(
      screen.getByText("Score must be between 0 and 100")
    ).toBeInTheDocument();
  });

  test("calls addIntern when form is valid", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    await user.type(
      screen.getByPlaceholderText("Name"),
      "Rahul"
    );

    const scoreInput = screen.getByPlaceholderText("Score");

    await user.clear(scoreInput);
    await user.type(scoreInput, "90");

    await user.click(
      screen.getByRole("button", { name: "Add Intern" })
    );

    expect(mockAddIntern).toHaveBeenCalledTimes(1);
  });

  test("resets form when Reset button is clicked", async () => {
    const user = userEvent.setup();

    render(<AddInternForm />);

    await user.type(
      screen.getByPlaceholderText("Name"),
      "Rahul"
    );

    await user.click(
      screen.getByRole("button", { name: "Reset" })
    );

    expect(
      screen.getByPlaceholderText("Name")
    ).toHaveValue("");
  });
});