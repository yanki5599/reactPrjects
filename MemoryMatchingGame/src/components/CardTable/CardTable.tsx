import React, { useEffect, useState } from "react";
import "./CardTable.css";

import Card from "../Card/Card";
import { CardModel } from "../../types/CardModel";

interface CardTableProps {
  cards: CardModel[];
  cardClickedFunc: (card: CardModel) => void;
}

const CardTable: React.FC<CardTableProps> = ({ cards, cardClickedFunc }) => {
  return (
    <div className="CardTable">
      <div className="container">
        {cards.map((card, idx) => (
          <Card
            card={card}
            key={"card" + idx}
            cardClickedFunc={cardClickedFunc}
          />
        ))}
      </div>
    </div>
  );
};

export default CardTable;
