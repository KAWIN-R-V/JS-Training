import { renderHook, act } from "@testing-library/react";
import useInternForm from "./useInternForm";

describe("useInternForm", () => {
  test("initialises with empty form", () => {
    const { result } = renderHook(() => useInternForm());

    expect(result.current.form.name).toBe("");
    expect(result.current.form.score).toBe(0);
    expect(result.current.form.role).toBe("Frontend");
    expect(result.current.form.isPresent).toBe(true);
    expect(result.current.error).toBe("");
  });

  test("returns false when name is empty", () => {
    const { result } = renderHook(() => useInternForm());

    let valid = false;

    act(() => {
      valid = result.current.isValid();
    });

    expect(valid).toBe(false);
    expect(result.current.error).toBe("Name is required");
  });

  test("returns false when score is greater than 100", () => {
    const { result } = renderHook(() => useInternForm());

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as any);

      result.current.handleChange({
        target: {
          name: "score",
          value: "150",
          type: "number",
        },
      } as any);
    });

    let valid = false;

    act(() => {
      valid = result.current.isValid();
    });

    expect(valid).toBe(false);
    expect(result.current.error).toBe(
      "Score must be between 0 and 100"
    );
  });

  test("returns true for valid form", () => {
    const { result } = renderHook(() => useInternForm());

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as any);

      result.current.handleChange({
        target: {
          name: "score",
          value: "92",
          type: "number",
        },
      } as any);
    });

    let valid = false;

    act(() => {
      valid = result.current.isValid();
    });

    expect(valid).toBe(true);
    expect(result.current.error).toBe("");
  });

  test("reset clears the form", () => {
    const { result } = renderHook(() => useInternForm());

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as any);

      result.current.handleReset();
    });

    expect(result.current.form.name).toBe("");
    expect(result.current.form.score).toBe(0);
    expect(result.current.form.role).toBe("Frontend");
    expect(result.current.form.isPresent).toBe(true);
    expect(result.current.error).toBe("");
  });
});

/*
Hook tests focus on the business logic directly.
They are faster, simpler, and make it easier to
verify the hook's behavior without involving UI
components.
*/