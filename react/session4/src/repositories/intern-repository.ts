import { useState } from "react";
import type { Intern } from "../utils/intern-utils";

export function useInternRepository() {
  const [interns, setInterns] = useState<Intern[]>([]);

  const add = (intern: Intern): void => {
    setInterns((prev) => [...prev, intern]);
  };

  const remove = (id: number): void => {
    setInterns((prev) => prev.filter((i) => i.id !== id));
  };

  const update = (intern: Intern): void => {
    setInterns((prev) =>
      prev.map((i) => (i.id === intern.id ? intern : i))
    );
  };

  return {
    interns,
    add,
    remove,
    update,
  };
}