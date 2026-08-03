export interface InternFormState {
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

export function prepareInternPayload(
  data: InternFormState
): InternFormState {
  return {
    ...data,
  };
}

export async function saveIntern(
  payload: InternFormState,
  fetcher: typeof fetch = fetch
): Promise<void> {
  await fetcher("/api/interns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}