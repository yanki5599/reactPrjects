import React from "react";
import "./MilitaryApp.css";
import AddMissionForm from "../AddMissionForm/AddMissionForm";
import MissionItemList from "../MissionItemList/MissionItemList";
import { Mission } from "../../types/mission";

interface MilitaryAppProps {}

const MilitaryApp: React.FC<MilitaryAppProps> = ({}) => {
  function addMission(mission: Mission): void {}
  function deleteMission(missionId: string): void {}
  function progressMission(missionId: string): void {}

  return (
    <div className="MilitaryApp">
      <h1>Military Operations Dashboard</h1>
      <AddMissionForm handleSubmitFunc={addMission} />
      <MissionItemList />
    </div>
  );
};

export default MilitaryApp;
