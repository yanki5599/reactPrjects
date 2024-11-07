import { useState, useEffect } from "react";
import buildings from "../data/building.json";

export interface Floor {
  name: string;
  soldiers: number;
  purpose: string;
  description: string;
  activity: string;
}

const useBuildingData = () => {
  const [buildingData, setBuildingData] = useState<Floor[]>(buildings);

  const getFloorByIndex = (floorIndex: number): Floor | undefined => {
    return buildingData[floorIndex];
  };
  const getListOfActivities = (): string[] => {
    return buildingData.map((building) => building.activity);
  };
  return {
    buildingData,
    getFloorByIndex,
    getListOfActivities,
  };
};

export default useBuildingData;
