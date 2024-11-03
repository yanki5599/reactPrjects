import React from "react";
import "./Card.css";
import { CardModel } from "../../types/CardModel";

interface CardProps {
  card: CardModel;
  cardClickedFunc: (card: CardModel) => void;
}

const Card: React.FC<CardProps> = ({ card, cardClickedFunc }) => {
  return (
    <div className="Card flip" onClick={() => cardClickedFunc(card)}>
      <img className="Image" src={card.img} alt={card.name} title={card.name} />
    </div>
  );
};

export default Card;
