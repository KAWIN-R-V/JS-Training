function SelfLearning() {
  return null;
}

export default SelfLearning;

/*
====================================================
Self Learning Task 1 - React.memo
====================================================

React.memo is a higher-order component that prevents
a component from re-rendering if its props have not changed.

It improves performance by reusing the previous rendered
output instead of rendering again.

React.memo works well with useCallback because
useCallback prevents function props from changing on
every render.

Example:

const MemoizedInternRow = React.memo(InternRow);

====================================================
Self Learning Task 2 - When NOT to use useMemo/useCallback
====================================================

1. Do not use useMemo for simple calculations.

Example:

const total = price * quantity;

Using useMemo here adds unnecessary complexity because
the calculation is already very fast.

----------------------------------------------------

2. Do not use useCallback for functions that are not
passed to child components.

Example:

const handleClick = () => {
    console.log("Clicked");
};

Wrapping this with useCallback provides little or no
performance benefit and makes the code harder to read.

====================================================
Self Learning Task 3 - useReducer
====================================================

Example:

import { useReducer } from "react";

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return state + 1;

    case "decrement":
      return state - 1;

    case "reset":
      return 0;

    default:
      return state;
  }
}

const [count, dispatch] = useReducer(reducer, 0);

Why useReducer?

useReducer is preferred when:

• State logic becomes complex.
• Multiple state values depend on each other.
• Many actions modify the same state.
• State transitions are easier to manage using actions.

====================================================
Self Learning Task 4 - Context API vs Redux Toolkit vs Zustand
====================================================

Context API

• Built into React.
• Best for small to medium applications.
• Good for sharing simple global state such as themes,
  authentication and language.

Redux Toolkit

• Designed for large applications.
• Excellent for complex state management.
• Includes debugging tools, middleware and predictable
  state updates.

Zustand

• Lightweight state management library.
• Very little boilerplate.
• Easier to learn than Redux.
• Suitable for medium and large applications that need
  global state without Redux complexity.

Comparison:

Context API
✔ Simple
✔ Built into React
✔ Best for small apps

Redux Toolkit
✔ Powerful
✔ Best for enterprise projects
✔ Excellent debugging

Zustand
✔ Lightweight
✔ Easy to use
✔ Good balance between simplicity and scalability
*/