import type { Intern } from "../utils/intern-utils";

export interface InternFormState {
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

/**
 * Creates a new Intern object from form data.
 * Business logic only – no React code.
 */
export function createIntern(
  form: InternFormState,
  generateId: () => number = Date.now
): Intern {
  return {
    id: generateId(),
    name: form.name.trim(),
    score: Math.round(form.score),
    isPresent: form.isPresent,
    role: form.role,
  };
}

/**
 * Validates the intern form.
 * Returns an error message if invalid, otherwise null.
 */
export function validateInternForm(
  form: InternFormState
): string | null {
  if (!form.name.trim()) {
    return "Name is required";
  }

  if (form.score < 0 || form.score > 100) {
    return "Score must be 0–100";
  }

  return null;
}

/**
 * Calculates the average score.
 * Returns 0 when the list is empty.
 */
export function calculateAverageScore(
  interns: Intern[]
): number {
  if (interns.length === 0) {
    return 0;
  }

  const total = interns.reduce(
    (sum, intern) => sum + intern.score,
    0
  );

  return Math.round(total / interns.length);
}

/**
 * Returns the score label.
 */
export function getScoreLabel(
  score: number
): "Pass" | "Fail" {
  return score >= 50 ? "Pass" : "Fail";
}

/**
 * Filters interns by name or role.
 * Search is case-insensitive.
 * Returns all interns when the query is empty.
 */
export function filterInterns(
  interns: Intern[],
  query: string
): Intern[] {
  const search = query.trim().toLowerCase();

  if (!search) {
    return interns;
  }

  return interns.filter(
    (intern) =>
      intern.name.toLowerCase().includes(search) ||
      intern.role.toLowerCase().includes(search)
  );
}