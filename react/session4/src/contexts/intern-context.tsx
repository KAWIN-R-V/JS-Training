// Code Smell Audit — intern-context.tsx
// Smell 1: Large component — manages loading, state, and context wiring.
// Smell 2: Multiple responsibilities — coordinates repository, service, and loading logic.
// Smell 3: Long functions — the provider still contains initialization and state management logic.

import { useInternRepository } from "../repositories/intern-repository";
import {
  createIntern,
  calculateAverageScore,
} from "../services/intern-service";

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

function validateInternResponse(data: unknown): Intern[] {
  if (!Array.isArray(data)) {
    throw new Error(
      `validateInternResponse: expected array, got: ${typeof data}`
    );
  }

  return data.map((item, index) => {
    const intern = item as Intern;

    if (
      typeof intern.name !== "string" ||
      !intern.name.trim()
    ) {
      throw new Error(
        `validateInternResponse: item[${index}].name is invalid`
      );
    }

    if (
      typeof intern.score !== "number" ||
      intern.score < 0 ||
      intern.score > 100
    ) {
      throw new Error(
        `validateInternResponse: item[${index}].score is invalid, got: ${intern.score}`
      );
    }

    return intern;
  });
}


export function InternProvider({
  children,
}: InternProviderProps) {
  const repo = useInternRepository();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = [
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
      ];

      const validatedInterns = validateInternResponse(data);

      validatedInterns.forEach(repo.add);
      setIsLoading(false);
    }, 800);
  }, []);
    function addIntern(form: Omit<Intern, "id">): void {
      const intern = createIntern(form);

      repo.add(intern);
    }

  function removeIntern(id: number): void {
      repo.remove(id);
  }

  return (
    <InternContext.Provider
      value={{
      interns: repo.interns,
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

// Smell to fix first:
// The multiple responsibilities in InternProvider should be reduced.
// Separating loading, business logic, and state management makes the file easier to understand and maintain.