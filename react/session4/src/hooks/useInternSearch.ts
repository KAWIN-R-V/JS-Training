// Silent Failure Audit — useInternSearch.ts
// Pattern 1: Average score silently defaults to 0 when the intern list is empty.
// Pattern 2: Empty search string returns all interns without indicating whether data was loaded or simply empty.
// Pattern 3: Statistics continue to calculate even when the input list may be invalid.

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

// Most likely silent failure:
// Returning an average score of 0 for an empty intern list can hide missing or failed data loading.
// It becomes difficult to distinguish between "no interns" and "failed to load interns".