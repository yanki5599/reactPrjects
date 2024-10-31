import React from "react";
import "./MissionItem.css";
import { Mission, MissionStatus } from "../../types/mission";

interface MissionItemProps {
  mission: Mission;
  deleteMission: (missionId: string) => void;
  progressMission: (missionId: string) => void;
}

const colorMap = (status: MissionStatus) => {
  switch (status) {
    case MissionStatus.InProgress:
      return "InProgress";
    case MissionStatus.Pending:
      return "Pending";
    case MissionStatus.Completed:
      return "Completed";
  }
};

const MissionItem: React.FC<MissionItemProps> = ({
  mission,
  deleteMission,
  progressMission,
}) => {
  return (
    <div className={"MissionItem" + " " + colorMap(mission.status)}>
      <div className="info">
        <h3>Name: {mission.name}</h3>
        <h4>Status: {mission.status}</h4>
        <h4>Priority: {mission.priority}</h4>
        <h4>Description: {mission.description}</h4>
      </div>
      <div className="ActionButtons">
        <button className="red" onClick={() => deleteMission(mission._id!)}>
          Delete
        </button>
        {
          <button
            style={{
              visibility:
                mission.status !== MissionStatus.Completed
                  ? "visible"
                  : "hidden",
            }}
            className="green"
            onClick={() => progressMission(mission._id!)}
          >
            Progress
          </button>
        }
      </div>
    </div>
  );
};

export default MissionItem;
