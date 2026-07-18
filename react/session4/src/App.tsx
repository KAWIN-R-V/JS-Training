import Navbar from "./components/Navbar";
import ScoreStats from "./components/ScoreStats";
import AddInternForm from "./components/AddInternForm";
import InternSearch from "./components/InternSearch";
import InternListWithCallback from "./components/InternListWithCallback";
import CounterDemo from "./components/CounterDemo";

function App() {
  /*
    Contexts:
    - Store global application state such as theme and intern data.

    Custom Hooks:
    - Encapsulate reusable business logic like counters, forms and searching.

    Components:
    - Render the UI and consume data from contexts and hooks.
    - They focus only on presentation and user interaction.
  */

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <ScoreStats />

        <AddInternForm />

        <InternSearch />

        <CounterDemo />

        <InternListWithCallback />
      </div>
    </div>
  );
}

export default App;