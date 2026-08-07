// src/services/intern-tracker.ts

export interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

export class InternTracker {
  #interns: Intern[] = [];
  #apiUrl = "/api/interns";
  #lastFetchedAt = new Date(0);
  #localCache = new Map<number, Intern>();

  async loadAll(): Promise<void> {
    const response = await fetch(this.#apiUrl);

    const data = (await response.json()) as Intern[];

    this.#interns = data;
    this.#lastFetchedAt = new Date();

    this.#localCache.clear();

    for (const intern of data) {
      this.#updateCache(intern);
    }
  }

  getAll(): readonly Intern[] {
    return [...this.#interns];
  }

  getById(id: number): Intern | undefined {
    return this.#localCache.get(id);
  }

  updateScore(internId: number, score: number): void {
    // Requirement 1
    if (score < 0 || score > 100) {
      throw new RangeError(
        "updateScore: score must be between 0 and 100"
      );
    }

    // Requirement 2
    const intern = this.#localCache.get(internId);

    if (!intern) {
      throw new Error("Intern not found");
    }

    // Requirement 3
    intern.score = score;

    const index = this.#interns.findIndex(
      (i) => i.id === internId
    );

    if (index !== -1) {
      this.#interns[index] = intern;
    }

    this.#updateCache(intern);
  }

  // --------------------------
  // Private helper methods
  // --------------------------

  #buildUrl(id: number): string {
    return `${this.#apiUrl}/${id}`;
  }

  #updateCache(intern: Intern): void {
    this.#localCache.set(intern.id, intern);
  }
}