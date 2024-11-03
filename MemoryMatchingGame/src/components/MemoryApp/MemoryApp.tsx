import React, { useEffect, useState } from "react";
import "./MemoryApp.css";
import { TimerSettings, useTimer } from "react-timer-hook";
import CardTable from "../CardTable/CardTable";
import cardsModel from "../../data/cards";
import { shuffle } from "../../utils";
import { CardModel } from "../../types/CardModel";
import Modal from "../Modal/Modal";

const LIMIT_TIME: number = 1;

const timerSettings: TimerSettings = {
  autoStart: false,
  expiryTimestamp: getDateAndAddMin(LIMIT_TIME),
};

function getDateAndAddMin(min: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + min);
  return date;
}

interface MemoryAppProps {}

const MemoryApp: React.FC<MemoryAppProps> = ({}) => {
  const [moves, setMoves] = useState<number>(0);
  const [cards, setCards] = useState<CardModel[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const {
    minutes,
    seconds,
    restart: restartTimer,
    start: startTimer,
  } = useTimer(timerSettings);

  useEffect(() => {
    setUp();
  }, []);

  function timeOut() {
    setGameOver(true);
  }

  function setUp() {
    const dupArr = cardsModel.concat(cardsModel);
    const shuffled: CardModel[] = shuffle<CardModel>(dupArr);
    setCards(shuffled);
    startTimer();
  }

  function restart(): void {
    setMoves(0);
    restartTimer(getDateAndAddMin(LIMIT_TIME));
  }

  function cardClicked(card: CardModel): void {}

  return (
    <div className="MemoryApp">
      {gameOver && (
        <Modal
          message="Game Over"
          element={<button onClick={restart}>Restart</button>}
        />
      )}
      <h1>Memory App Game</h1>
      <div className="info">
        <h3>{moves} Moves</h3>
        <h3>
          {"Timer:   "}
          {`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}
        </h3>
        <button onClick={restart}></button>
      </div>
      <CardTable cards={cards} cardClickedFunc={cardClicked} />
    </div>
  );
};

export default MemoryApp;
