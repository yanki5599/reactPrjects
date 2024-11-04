import React from "react";
import "./UnitStatus.css";
import { useGlobalUnits } from "../../context/DeploymentContext/DeploymentContext";
import { MissionStatus } from "../../types/MissionStatus";

interface UnitStatusProps {
  unitName: string;
}

const ColorMap = {
  [MissionStatus.Idle]: "black",
  [MissionStatus.Deployed]: "blue",
  [MissionStatus.Completed]: "green",
};

const UnitStatus: React.FC<UnitStatusProps> = ({ unitName }) => {
  const { units } = useGlobalUnits();
  const status = units[unitName];
  return (
    <div className="UnitStatus">
      <span>{unitName}</span>:
      <span style={{ color: ColorMap[status] }}> {status}</span>
    </div>
  );
};

export default UnitStatus;
