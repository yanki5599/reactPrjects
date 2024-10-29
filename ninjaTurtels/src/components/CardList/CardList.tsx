import TurtleCard from "../TurtleCard/TurtleCard";
import turtlesData from "../../data/turtleData";
import { PizzaTopping, TurtleData } from "../../types/types";
import "./CardList.css";

interface CardListProps {
  addToppingFunc: (pizzaTopping: PizzaTopping) => void;
}

const CardList: React.FC<CardListProps> = ({ addToppingFunc }) => {
  const turtles: TurtleData[] = turtlesData;

  const TurtleCards = turtles.map((t, idx) => (
    <TurtleCard
      name={t.name}
      img={t.img}
      pizzaToppings={t.pizzaToppings}
      btnFunc={addToppingFunc}
      key={"turtle" + idx.toString()}
    />
  ));
  return <div className="CardList">{TurtleCards}</div>;
};

export default CardList;
