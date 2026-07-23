import Greeting from "./Greeting";
import TsxRules from "./TsxRules";
import StyledCard from "./StyledCard";
import Profile from "./Profile";
import SkillList from "./SkillList";
import ScoreCard from "./ScoreCard";
import StatusBadge from "./StatusBadge";
import InternCard from "./InternCard";
import Dashboard from "./Dashboard";
import SelfLearning from "./SelfLearning";
import "./App.css";

// A React component is a reusable piece of UI that returns TSX to display on the screen.
function App() {
  return (
    <>
      <h1>React Session 1 Activity</h1>

      {/* Reusing components avoids duplicate code and improves maintainability. */}
      <Greeting />
      <Greeting />
      <Greeting />

      {/* Fragments group elements without creating an extra div in the DOM. */}
      <TsxRules />
      <StyledCard />
      <Profile />
      <SkillList />
      <ScoreCard />
      <StatusBadge />
      <InternCard />
      <Dashboard />
      <SelfLearning />
    </>
  );
}

export default App;