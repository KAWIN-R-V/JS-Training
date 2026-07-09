// This component demonstrates the correct TSX syntax and explains
// how TSX differs from standard HTML.

function TsxRules() {
  return (
    <>
      {/* Fix 1: input is a self-closing element in TSX */}
      <input type="text" />

      {/* Fix 2: Use className instead of class because class is a reserved keyword in JavaScript */}
      <p className="highlight">Styled paragraph</p>

      {/* Fix 3: Use htmlFor instead of for because "for" is a JavaScript keyword */}
      <label htmlFor="email">Email</label>

      {/* Fix 4: Empty input elements must be self-closing */}
      <input id="email" type="email" />

      {/* Fix 5: Inline styles must be a JavaScript object with camelCase property names */}
      <p style={{ color: "red", fontSize: "16px" }}>
        Red text
      </p>

      {/* Fix 6: Comments in TSX must use this syntax instead of HTML comments */}
      {/* This is a TSX comment */}
    </>
  );
}

export default TsxRules;