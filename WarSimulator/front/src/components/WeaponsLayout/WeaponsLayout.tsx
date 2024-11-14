import React from "react";
import "./WeaponsLayout.css";
import { Arsenal } from "../../types/user";

interface WeaponsLayoutProps {
  arsenal: Arsenal;
}

const WeaponsLayout: React.FC<WeaponsLayoutProps> = ({ arsenal }) => {
  return (
    <div className="WeaponsLayout">
      <h1>Weapons Layout</h1>
      <div>
        {arsenal.resources.map((res) => (
          <button key={res.missileId._id}>
            {res.missileId.name} X {res.amount}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeaponsLayout;
