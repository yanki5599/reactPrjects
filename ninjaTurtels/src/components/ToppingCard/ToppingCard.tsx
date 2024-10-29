import React from "react";
import { PizzaTopping } from "../../types/types";
import { Card } from "react-bootstrap";
import "./ToppingCard.css";

interface ToppingCardProps {
  topping: PizzaTopping;
  isRackFull: boolean;
}

const ToppingCard: React.FC<ToppingCardProps> = ({ topping, isRackFull }) => {
  return (
    <Card className={(isRackFull ? "RedBorder " : "") + "ToppingCard"}>
      <Card.Img variant="top" src={topping.img} />
      <Card.Body>
        <Card.Title>{topping.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ToppingCard;
