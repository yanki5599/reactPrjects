import React from "react";
import "./MissionItem.css";

enum MissionStatus {
  Pending = "Pending",
  Progress = "Progress",
  Completed = "Completed",
}

interface MissionItemProps {}

const MissionItem: React.FC<MissionItemProps> = ({}) => {
  return (
    <div className="MissionItem">
      <h1>MissionItem Component</h1>
    </div>
  );
};

export default MissionItem;
