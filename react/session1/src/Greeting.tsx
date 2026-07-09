// Greeting is a reusable component.
// Reusing components is better than copying HTML because changes only need
// to be made in one place, making the code easier to maintain.

function Greeting() {
  return (
    <div>
      <h2>Welcome to React</h2>
      <p>This is a separate component.</p>
    </div>
  );
}

export default Greeting;