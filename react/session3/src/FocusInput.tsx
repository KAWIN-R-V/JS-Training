import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus(): void {
    inputRef.current?.focus();
  }

  function handleClear(): void {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  return (
    <div className="card">
      <h2>Focus Input</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Type something..."
      />

      <br />
      <br />

      <button onClick={handleFocus}>
        Focus Input
      </button>

      <button
        onClick={handleClear}
        style={{ marginLeft: "10px" }}
      >
        Clear and Focus
      </button>

      {/*
        Optional chaining (?.) is used because inputRef.current
        can be null before the input element is mounted or after
        it is unmounted.

        Using ?. safely calls focus() only when current contains
        a valid HTMLInputElement, preventing runtime errors.
      */}
    </div>
  );
}

export default FocusInput;