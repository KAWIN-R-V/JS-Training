import Navbar from "./components/Navbar";
import ScoreStats from "./components/ScoreStats";
import AddInternForm from "./components/AddInternForm";
import InternSearch from "./components/InternSearch";
import InternListWithCallback from "./components/InternListWithCallback";
import CounterDemo from "./components/CounterDemo";

function App() {
  // Application Architecture:
  // Contexts: Store shared application state (theme and intern data).
  // Hooks: Contain reusable logic (counter, form handling, searching).
  // Components: Render the user interface using data from contexts and hooks.

  return (
    <div>
      <Navbar />

      <div style={{ padding: "16px" }}>
        <ScoreStats />

        <AddInternForm />

        <InternSearch />

        <InternListWithCallback />

        <CounterDemo />
      </div>
    </div>
  );
}

export default App;