import React from "react";
import "./MissionItem.css";
import { Mission } from "../../types/mission";

interface MissionItemProps {
  mission: Mission;
}

const MissionItem: React.FC<MissionItemProps> = ({ mission }) => {
  return (
    <div className="MissionItem">
      <h1>MissionItem Component</h1>
    </div>
  );
};

export default MissionItem;
