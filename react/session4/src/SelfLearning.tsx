function SelfLearning() {
  return (
    <div>
      <h2>Self Learning Tasks</h2>

      {/*

1. React.memo

React.memo prevents unnecessary re-rendering of functional components.
If the props have not changed, React reuses the previous rendered output.
It works well with useCallback because useCallback keeps function
references stable between renders.

-----------------------------------------------------

2. When NOT to use useMemo/useCallback

Example 1:
Simple calculations like x + y do not need useMemo.
The overhead of memoization is greater than the calculation itself.

Example 2:
Functions that are not passed to child components usually do not
need useCallback. Adding it only increases code complexity.

-----------------------------------------------------

3. useReducer

useReducer is preferred when:

- State has multiple related values.
- State transitions become complex.
- Multiple actions modify the same state.

It keeps update logic organized inside one reducer function.

-----------------------------------------------------

4. Zustand vs Redux Toolkit vs Context

Context + useState:
Good for small applications and simple global state.

Zustand:
Simpler API with better performance for medium-sized applications.

Redux Toolkit:
Best for very large applications where state management,
middleware, debugging, and predictable updates are important.

      */}
    </div>
  );
}

export default SelfLearning;