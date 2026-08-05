// Code Smell Audit — useInternSearch.ts
// Smell 1: Duplicate logic — average score calculation duplicates business logic.
// Smell 2: Multiple responsibilities — manages search state and performs calculations.
// Smell 3: Business logic inside hook — filtering and statistics belong in the service layer.

import { useMemo, useState } from "react";
import {
  filterInterns,
  calculateAverageScore,
} from "../services/intern-service";

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

interface UseInternSearchReturn {
  search: string;
  setSearch: (value: string) => void;
  filtered: Intern[];
  stats: {
    total: number;
    present: number;
    avg: number;
  };
}

function useInternSearch(
  interns: Intern[]
): UseInternSearchReturn {
  const [search, setSearch] = useState("");

  // Filtering is delegated to the service layer
  const filtered = useMemo(
    () => filterInterns(interns, search),
    [interns, search]
  );

  // Average score calculation is delegated to the service layer
  const stats = useMemo(
    () => ({
      total: interns.length,
      present: interns.filter(
        (intern) => intern.isPresent
      ).length,
      avg: calculateAverageScore(interns),
    }),
    [interns]
  );

  return {
    search,
    setSearch,
    filtered,
    stats,
  };
}

export default useInternSearch;

// Smell to fix first:
// The duplicated average score calculation has been moved to
// calculateAverageScore() in the service layer.
// This removes duplication, improves reuse, and ensures that
// changes to the calculation only need to be made in one place.