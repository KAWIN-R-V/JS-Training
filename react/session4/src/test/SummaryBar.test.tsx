import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { SummaryBar } from "../components/SummaryBar";

describe("SummaryBar", () => {
  test("shows correct total", () => {
    render(
      <SummaryBar
        total={3}
        presentCount={2}
        averageScore={80}
      />
    );

    expect(screen.getByText("Total Interns: 3")).toBeInTheDocument();
  });

  test("shows correct present count", () => {
    render(
      <SummaryBar
        total={5}
        presentCount={2}
        averageScore={75}
      />
    );

    expect(screen.getByText("Present: 2")).toBeInTheDocument();
  });

  test("shows average score 0", () => {
    render(
      <SummaryBar
        total={0}
        presentCount={0}
        averageScore={0}
      />
    );

    expect(screen.getByText("Average Score: 0")).toBeInTheDocument();
  });

  test("updates when props change", () => {
    const { rerender } = render(
      <SummaryBar
        total={2}
        presentCount={1}
        averageScore={70}
      />
    );

    rerender(
      <SummaryBar
        total={4}
        presentCount={3}
        averageScore={90}
      />
    );

    expect(screen.getByText("Total Interns: 4")).toBeInTheDocument();
    expect(screen.getByText("Present: 3")).toBeInTheDocument();
    expect(screen.getByText("Average Score: 90")).toBeInTheDocument();
  });
});


//Do any of these tests use vi.mock? Do they need a Provider? What does that tell you?

// No. These tests do not use vi.mock and do not require an InternProvider because SummaryBar is now a presentational component that receives all its data through props. This makes it easier to test in isolation than the container component.