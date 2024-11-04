import React, { createContext, DOMElement, useContext, useState } from "react";
import { MissionStatus } from "../../types/MissionStatus";

type Units = { [key: string]: MissionStatus }; // ? wtf is that what you want Tommer??? hu?

type DeploymentContextType = {
  units: Units;
  setUnitStatus: (unit: string, status: MissionStatus) => void;
};

const DeploymentContext = createContext<DeploymentContextType>({
  units: {},
  setUnitStatus: () => {},
});

interface DeploymentProviderProps {
  children: React.ReactNode;
}

const DeploymentProvider: React.FC<DeploymentProviderProps> = ({
  children,
}) => {
  const [units, setUnits] = useState({
    Golani: MissionStatus.Idle,
    Paratroopers: MissionStatus.Idle,
    Givati: MissionStatus.Idle,
    cannonians: MissionStatus.Idle,
    navy: MissionStatus.Idle,
  });

  const setUnitStatus = (unit: string, status: MissionStatus) => {
    setUnits((prev) => ({ ...prev, [unit]: status }));
  };

  return (
    <DeploymentContext.Provider value={{ units, setUnitStatus }}>
      {children}
    </DeploymentContext.Provider>
  );
};

export const useGlobalUnits = () => {
  return useContext(DeploymentContext);
};

export { DeploymentContext, DeploymentProvider };
