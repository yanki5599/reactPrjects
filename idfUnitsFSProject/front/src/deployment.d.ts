import React from "react";
type DeploymentContextType = {
  units: {
    [key: string]: string;
  };
  setUnitStatus: (unit: string, status: string) => void;
};
declare const DeploymentContext: React.Context<
  DeploymentContextType | undefined
>;
interface DeploymentProviderProps {
  children: React.ReactNode;
}
declare const DeploymentProvider: React.FC<DeploymentProviderProps>;
export {
  DeploymentContext,
  DeploymentProvider,
  DeploymentContextType,
  DeploymentProviderProps,
};
