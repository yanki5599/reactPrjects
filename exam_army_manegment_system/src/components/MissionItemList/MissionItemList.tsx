import React from "react";
import "./MissionItemList.css";
import { Mission } from "../../types/mission";
import MissionItem from "../MissionItem/MissionItem";

interface MissionItemListProps {
  missions: Mission[];
  deleteMission: (missionId: string) => void;
  progressMission: (missionId: string) => void;
}

const MissionItemList: React.FC<MissionItemListProps> = ({
  missions,
  deleteMission,
  progressMission,
}) => {
  return (
    <div className="MissionItemList">
      <div className="title">
        <h1>Missions</h1>
      </div>
      {missions.map((m, idx) => (
        <MissionItem
          key={"missionItem" + idx}
          mission={m}
          deleteMission={deleteMission}
          progressMission={progressMission}
        />
      ))}
    </div>
  );
};

export default MissionItemList;
