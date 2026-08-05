// Code Smell Audit — useInternSearch.ts
// Smell 1: Duplicate logic — average score calculation duplicates business logic.
// Smell 2: Multiple responsibilities — manages search state and performs calculations.
// Smell 3: Business logic inside hook — filtering and statistics belong in the service layer.

import { useState, useMemo } from "react";
import { filterInterns } from "../utils/intern-utils";
import { assert } from "../utils/assert";

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

function useInternSearch(interns: Intern[]): UseInternSearchReturn {
  const [search, setSearch] = useState("");

  
  const filtered = useMemo(
    
    () => filterInterns(interns, search),
    [interns, search]
  );

  const stats = useMemo(
    () => ({
      total: interns.length,
      present: interns.filter((i) => i.isPresent).length,
      avg:
        interns.length > 0
          ? Math.round(
              interns.reduce((sum, i) => sum + i.score, 0) /
                interns.length
            )
          : 0,
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
// The duplicated average score calculation should be moved into the service layer.
// This reduces duplication and makes the calculation reusable.