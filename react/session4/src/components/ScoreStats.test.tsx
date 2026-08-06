import { test, expect } from "vitest";
import { render, screen } from "../test/test-utils";
import { InternProvider } from "../contexts/intern-context";
import ScoreStats from "./ScoreStats";

test("shows score statistics after data loads", async () => {
  render(
    <InternProvider>
      <ScoreStats />
    </InternProvider>
  );

  const highest = await screen.findByText(/Highest/i);

  expect(highest).toBeInTheDocument();
});

test("shows average score", async () => {
  render(
    <InternProvider>
      <ScoreStats />
    </InternProvider>
  );

  expect(await screen.findByText(/Average/i)).toBeInTheDocument();
});

// findBy automatically waits for an element to appear.
// waitFor is used when checking more complex conditions
// involving multiple assertions.