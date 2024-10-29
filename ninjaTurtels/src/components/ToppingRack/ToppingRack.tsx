import React from "react";
import { PizzaTopping } from "../../types/types";
import ToppingCard from "../ToppingCard/ToppingCard";
import "./ToppingRack.css";

interface ToppingRackProps {
  pizzaToppings: PizzaTopping[];
}

const ToppingRack: React.FC<ToppingRackProps> = ({ pizzaToppings }) => {
  return (
    <div className="ToppingRack">
      {pizzaToppings.map((pt, idx) => (
        <ToppingCard
          topping={pt}
          isRackFull={pizzaToppings.length === 5}
          key={"topping" + idx.toString()}
        />
      ))}
    </div>
  );
};

export default ToppingRack;
