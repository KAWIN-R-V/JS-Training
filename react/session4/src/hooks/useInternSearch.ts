import { useState, useMemo } from "react";

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
    () =>
      interns.filter((intern) =>
        intern.name.toLowerCase().includes(search.toLowerCase())
      ),
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