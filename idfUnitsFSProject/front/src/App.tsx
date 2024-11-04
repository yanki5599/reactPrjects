import { FC } from "react";
import UnitList from "./components/UnitList/UnitList";
import MissionCompleted from "./components/MissionCompleted/MissionCompleted";
import { useGlobalUnits } from "./context/DeploymentContext/DeploymentContext";
import { MissionStatus } from "./types/MissionStatus";
import "./App.css";
const App: FC = () => {
  const { setUnitStatus, units } = useGlobalUnits();

  function setAllToIdle() {
    for (const unit in units) {
      if (Object.prototype.hasOwnProperty.call(units, unit)) {
        setUnitStatus(unit, MissionStatus.Idle);
      }
    }
  }

  return (
    <div className="App">
      <h1>מעקב פריסת יחידות צה"ל</h1>
      <button onClick={setAllToIdle}>refresh</button>
      <UnitList />
      <MissionCompleted />
    </div>
  );
};

export default App;
