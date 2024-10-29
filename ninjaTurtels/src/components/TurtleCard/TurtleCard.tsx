import "./TurtleCard.css";
import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { PizzaTopping } from "../../types/types";

interface TurtleCardProps {
  name: string;
  img: string;
  pizzaToppings: PizzaTopping[];
  btnFunc: (PizzaTopping: PizzaTopping) => void;
}

const TurtleCard: React.FC<TurtleCardProps> = ({
  name,
  img,
  pizzaToppings,
  btnFunc,
}) => {
  const toppingButtons = pizzaToppings.map((pizzaTopping, idx) => (
    <Button
      onClick={() => btnFunc(pizzaTopping)}
      variant="primary"
      key={"topping" + idx.toString()}
    >
      {pizzaTopping.name}
    </Button>
  ));
  return (
    <Card className="Card" style={{ width: "18rem" }}>
      <Card.Header className="CardHeader">{name}</Card.Header>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <div className="ButtonList">{toppingButtons}</div>
      </Card.Body>
    </Card>
  );
};

export default TurtleCard;
