// Silent Failure Audit — intern-context.tsx
// Pattern 1: generateId() is silently used when intern.id is missing.
// Pattern 2: Initial intern data is loaded using setTimeout with no error handling.
// Pattern 3: addIntern accepts any Intern object without validating required fields.
// Pattern 4: removeIntern silently succeeds even if the given id does not exist.

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
  const [interns, setInterns] = useState<Intern[]>([]);
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

      setInterns(validatedInterns);
      setIsLoading(false);
    }, 800);
  }, []);

  function addIntern(intern: Intern): void {
    if (intern.id == null) {
      throw new Error(
        "addIntern: id is required, got: " + intern.id
      );
    }

    setInterns((prev) => [
      ...prev,
      intern,
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

// Most likely silent failure:
// addIntern accepts invalid data without validation.
// Invalid interns could be stored in state and cause bugs much later in the application.