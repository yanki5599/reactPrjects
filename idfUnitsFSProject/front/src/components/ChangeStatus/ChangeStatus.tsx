import React from "react";
import "./ChangeStatus.css";
import { useGlobalUnits } from "../../context/DeploymentContext/DeploymentContext";
import { MissionStatus } from "../../types/MissionStatus";

interface ChangeStatusProps {
  unitName: string;
}

const ChangeStatus: React.FC<ChangeStatusProps> = ({ unitName }) => {
  const { units, setUnitStatus } = useGlobalUnits();

  function updateStatus() {
    if (units[unitName] === MissionStatus.Completed) return;
    const keys = Object.keys(MissionStatus);
    const myIdx = keys.findIndex((s) => s === units[unitName]);
    setUnitStatus(unitName, keys[(myIdx + 1) % keys.length] as MissionStatus);
  }
  return (
    <div className="ChangeStatus">
      <button onClick={updateStatus}>Deploy</button>
    </div>
  );
};

export default ChangeStatus;
