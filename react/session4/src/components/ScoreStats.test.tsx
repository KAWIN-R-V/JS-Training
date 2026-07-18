import { render, screen } from "../test/test-utils";
import ScoreStats from "./ScoreStats";

describe("ScoreStats", () => {
  test("renders heading", () => {
    render(<ScoreStats />);

    expect(
      screen.getByText("Score Statistics")
    ).toBeInTheDocument();
  });

  test("shows statistic labels", () => {
    render(<ScoreStats />);

    expect(screen.getByText(/Highest/i)).toBeInTheDocument();
    expect(screen.getByText(/Lowest/i)).toBeInTheDocument();
    expect(screen.getByText(/Average/i)).toBeInTheDocument();
    expect(screen.getByText(/Passing/i)).toBeInTheDocument();
  });
});