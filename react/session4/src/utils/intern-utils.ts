export interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

export function filterInterns(
  interns: Intern[],
  searchTerm: string
): Intern[] {
  const search = searchTerm.toLowerCase();

  return interns.filter(
    (intern) =>
      intern.name.toLowerCase().includes(search) ||
      intern.role.toLowerCase().includes(search)
  );
}