import React from "react";
import "./MissionItem.css";
import { Mission } from "../../types/mission";

interface MissionItemProps {
  mission: Mission;
  deleteMission: (missionId: string) => void;
  progressMission: (missionId: string) => void;
}

const MissionItem: React.FC<MissionItemProps> = ({
  mission,
  deleteMission,
  progressMission,
}) => {
  return (
    <div className="MissionItem">
      <div className="info">
        <h3>Name: {mission.name}</h3>
        <h4>Status: {mission.status}</h4>
        <h4>Priority: {mission.priority}</h4>
        <h4>Description: {mission.description}</h4>
      </div>
      <div className="ActionButtons">
        <button onClick={() => deleteMission(mission._id!)}>Delete</button>
        <button onClick={() => progressMission(mission._id!)}>Progress</button>
      </div>
    </div>
  );
};

export default MissionItem;
