import React from "react";
import "./MissionCompleted.css";
import { useGlobalUnits } from "../../context/DeploymentContext/DeploymentContext";

interface MissionCompletedProps {}

const MissionCompleted: React.FC<MissionCompletedProps> = ({}) => {
  const { units } = useGlobalUnits();
  const allComplete = Object.values(units).every((s) => s === "Completed");
  return (
    <div className="MissionCompleted">
      {allComplete && <h2>כל היחידות הושלמו בהצלחה!</h2>}
    </div>
  );
};

export default MissionCompleted;
