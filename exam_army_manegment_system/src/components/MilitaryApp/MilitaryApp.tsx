import React, { useEffect, useState } from "react";
import "./MilitaryApp.css";
import AddMissionForm from "../AddMissionForm/AddMissionForm";
import MissionItemList from "../MissionItemList/MissionItemList";
import { Mission } from "../../types/mission";
import * as apiService from "../../api/apiMissions";

interface MilitaryAppProps {}

const MilitaryApp: React.FC<MilitaryAppProps> = ({}) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  function addMission(mission: Mission): void {
    if (!mission) return;
    apiService
      .createMission(mission)
      .then((added) => {
        setMissions((prev) => [added, ...prev]);
        setRefresh((prev) => !prev);
      })
      .catch((err) => showError(err.message));
  }
  function deleteMission(missionId: string): void {
    if (!missionId) return;
    setMissions(missions.filter((m) => m._id != missionId));

    apiService
      .deleteMission(missionId)
      .then(() => {
        setRefresh((prev) => !prev);
      })
      .catch((err) => showError(err.message));
  }
  function progressMission(missionId: string): void {
    if (!missionId) return;

    apiService
      .updateMission(missionId)
      .then(() => setRefresh((prev) => !prev))
      .catch((err) => showError(err.message));
  }
  function showError(msg: string): void {
    console.error(msg);
  }

  useEffect(() => {
    apiService
      .getMissions()
      .then((data: Mission[]) => setMissions(data))
      .catch((err: any) => showError(err.message));
  }, [refresh]);

  return (
    <div className="MilitaryApp">
      <h1 className="Title">Military Operations Dashboard</h1>
      <AddMissionForm handleSubmitFunc={addMission} />
      <MissionItemList
        missions={missions}
        deleteMission={deleteMission}
        progressMission={progressMission}
      />
    </div>
  );
};

export default MilitaryApp;
