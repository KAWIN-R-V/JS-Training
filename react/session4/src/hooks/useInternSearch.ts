// Testability audit — useInternSearch.ts
// Q1 Predictable output? YES — given the same interns and search term, it always returns the same filtered list.
// Q2 No external deps? YES — no network, timers, or browser APIs.
// Q3 Dependencies injectable? YES — interns are provided as input and the filtering logic can be extracted.
// Verdict: HIGHLY TESTABLE

import { useState, useMemo } from "react";
import { filterInterns } from "../utils/intern-utils";

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