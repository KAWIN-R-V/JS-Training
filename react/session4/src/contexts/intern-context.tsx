// Testability audit — intern-context.tsx
// Q1 Predictable output? PARTIALLY — useEffect and setTimeout introduce timing.
// Q2 No external deps? NO — depends on React Context and timer.
// Q3 Dependencies injectable? NO — timeout and data source are hard-coded.
// Verdict: LOW TESTABILITY

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

interface InternContextType {
  interns: Intern[];
  isLoading: boolean;
  addIntern: (intern: Intern) => void;
  removeIntern: (id: number) => void;
}

interface InternProviderProps {
  children: ReactNode;
  generateId?: () => number;
}

const InternContext = createContext<InternContextType | null>(null);

export function InternProvider({
  children,
  generateId = () => Date.now(),
}: InternProviderProps) {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInterns([
        {
          id: 1,
          name: "Rahul",
          score: 92,
          role: "Frontend",
          isPresent: true,
        },
        {
          id: 2,
          name: "Priya",
          score: 78,
          role: "Backend",
          isPresent: true,
        },
        {
          id: 3,
          name: "Amit",
          score: 45,
          role: "Frontend",
          isPresent: false,
        },
        {
          id: 4,
          name: "Sneha",
          score: 95,
          role: "Fullstack",
          isPresent: true,
        },
      ]);

      setIsLoading(false);
    }, 800);
  }, []);

  function addIntern(intern: Intern): void {
    setInterns((prev) => [
      ...prev,
      {
        ...intern,
        id: intern.id ?? generateId(),
      },
    ]);
  }

  function removeIntern(id: number): void {
    setInterns((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <InternContext.Provider
      value={{
        interns,
        isLoading,
        addIntern,
        removeIntern,
      }}
    >
      {children}
    </InternContext.Provider>
  );
}

export function useInterns(): InternContextType {
  const context = useContext(InternContext);

  if (!context) {
    throw new Error("useInterns must be used inside InternProvider");
  }

  return context;
}