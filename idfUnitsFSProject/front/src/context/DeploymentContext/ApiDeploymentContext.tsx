import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Unit {
  name: string;
  description: string;
  image: string;
}

interface UnitsData {
  [category: string]: Unit[];
}

interface DeploymentContextType {
  units: UnitsData | null;
}

const DeploymentContext = createContext<DeploymentContextType | undefined>(
  undefined
);

export const ApiDeploymentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [units, setUnits] = useState<UnitsData | null>(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get<UnitsData>(
          "http://localhost:3000/api/units"
        );
        if (response.status != 200)
          throw new Error("error fetching from server");
        setUnits(response.data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };
    fetchUnits();
  }, []);

  return (
    <DeploymentContext.Provider value={{ units }}>
      {children}
    </DeploymentContext.Provider>
  );
};

export const useDeployment = () => {
  const context = React.useContext(DeploymentContext);
  if (!context) {
    throw new Error("useDeployment must be used within a DeploymentProvider");
  }
  return context;
};
