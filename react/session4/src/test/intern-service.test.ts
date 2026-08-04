import {
  createIntern,
  validateInternForm,
  calculateAverageScore,
  getScoreLabel,
  filterInterns,
} from "../services/intern-service";

describe("createIntern", () => {
  test("generates an id", () => {
    const intern = createIntern(
      {
        name: "Rahul",
        score: 92,
        role: "Frontend",
        isPresent: true,
      },
      () => 123
    );

    expect(intern.id).toBe(123);
  });

  test("trims the name", () => {
    const intern = createIntern(
      {
        name: " Rahul ",
        score: 92,
        role: "Frontend",
        isPresent: true,
      },
      () => 1
    );

    expect(intern.name).toBe("Rahul");
  });

  test("rounds the score", () => {
    const intern = createIntern(
      {
        name: "Rahul",
        score: 92.7,
        role: "Frontend",
        isPresent: true,
      },
      () => 1
    );

    expect(intern.score).toBe(93);
  });
});

describe("validateInternForm", () => {
  test("returns error for empty name", () => {
    expect(
      validateInternForm({
        name: "",
        score: 50,
        role: "Frontend",
        isPresent: true,
      })
    ).toBe("Name is required");
  });

  test("returns error for score above 100", () => {
    expect(
      validateInternForm({
        name: "Rahul",
        score: 101,
        role: "Frontend",
        isPresent: true,
      })
    ).toBe("Score must be 0–100");
  });

  test("returns null when valid", () => {
    expect(
      validateInternForm({
        name: "Rahul",
        score: 80,
        role: "Frontend",
        isPresent: true,
      })
    ).toBeNull();
  });
});

describe("calculateAverageScore", () => {
  test("returns 0 for empty list", () => {
    expect(calculateAverageScore([])).toBe(0);
  });

  test("returns correct average", () => {
    expect(
      calculateAverageScore([
        {
          id: 1,
          name: "A",
          score: 80,
          role: "Frontend",
          isPresent: true,
        },
        {
          id: 2,
          name: "B",
          score: 100,
          role: "Backend",
          isPresent: true,
        },
      ])
    ).toBe(90);
  });

  test("rounds correctly", () => {
    expect(
      calculateAverageScore([
        {
          id: 1,
          name: "A",
          score: 80,
          role: "Frontend",
          isPresent: true,
        },
        {
          id: 2,
          name: "B",
          score: 81,
          role: "Backend",
          isPresent: true,
        },
      ])
    ).toBe(81);
  });
});

describe("getScoreLabel", () => {
  test("returns Pass for 50", () => {
    expect(getScoreLabel(50)).toBe("Pass");
  });

  test("returns Fail for 49", () => {
    expect(getScoreLabel(49)).toBe("Fail");
  });

  test("returns Pass for 100", () => {
    expect(getScoreLabel(100)).toBe("Pass");
  });
});

describe("filterInterns", () => {
  const interns = [
    {
      id: 1,
      name: "Rahul",
      score: 90,
      role: "Frontend",
      isPresent: true,
    },
    {
      id: 2,
      name: "Priya",
      score: 85,
      role: "Backend",
      isPresent: true,
    },
  ];

  test("returns all when query is empty", () => {
    expect(filterInterns(interns, "")).toHaveLength(2);
  });

  test("matches on name", () => {
    expect(filterInterns(interns, "rahul")).toHaveLength(1);
  });

  test("matches on role", () => {
    expect(filterInterns(interns, "backend")).toHaveLength(1);
  });

  test("is case insensitive", () => {
    expect(filterInterns(interns, "FRONTEND")).toHaveLength(1);
  });
});