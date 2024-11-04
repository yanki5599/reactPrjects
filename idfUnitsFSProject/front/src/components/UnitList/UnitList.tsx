import React, { useContext } from "react";
import "./UnitList.css";
import { DeploymentContext } from "../../context/DeploymentContext/DeploymentContext";
import UnitStatus from "../UnitStatus/UnitStatus";
import ChangeStatus from "../ChangeStatus/ChangeStatus";

interface UnitListProps {}

const UnitList: React.FC<UnitListProps> = ({}) => {
  const { units } = useContext(DeploymentContext);

  return (
    <div className="UnitList">
      <h2>רשימת יחידות</h2>
      {Object.keys(units).map((k, idx) => (
        <div className="Unit" key={idx}>
          <UnitStatus unitName={k} />
          <ChangeStatus unitName={k} />
        </div>
      ))}
    </div>
  );
};

export default UnitList;
