import { useState, useEffect } from 'react';

interface Floor {
  name: string;
  soldiers: number;
  purpose: string;
  description: string;
  activity:string
}

const useBuildingData = () => {
  const [buildingData, setBuildingData] = useState<Floor[]>([]);

  //FILL HERE LOGIC TO SET THE BUILDING DATA


  const getFloorByIndex = (floorIndex:number): Floor |undefined =>
  {
    //FILL HERE
  }
  const getListOfActivities = ():string[]=>{
    //FILL HERE
  }
  return {
    buildingData,
    getFloorByIndex,
    getListOfActivities
  };
};

export default useBuildingData;
