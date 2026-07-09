// 1. React.StrictMode
// React.StrictMode is a development tool that helps identify potential
// problems by highlighting unsafe lifecycle methods, detecting deprecated
// APIs, and checking for unexpected side effects. It only affects development
// mode and does not change the production build.

// 2. Controlled vs Uncontrolled Components
// A controlled component stores its form data in React state and updates
// through event handlers. An uncontrolled component stores its own data
// in the DOM and is accessed using refs.

// 3. key Prop
// The key prop uniquely identifies list items so React can efficiently
// update the UI. Using the array index as a key is not recommended for
// dynamic lists because item positions may change. A unique ID should
// be used whenever possible.

// 4. Fragments
// Fragments allow multiple elements to be grouped without adding extra
// DOM nodes. The shorthand syntax <>...</> cannot receive a key prop.
// To assign a key, use <React.Fragment key={value}>...</React.Fragment>.

function SelfLearning() {
  return (
    <div>
      <h2>Self Learning Tasks</h2>
      <p>Research completed. Check the comments in this file.</p>
    </div>
  );
}

export default SelfLearning;