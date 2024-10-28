import { useState } from "react";
import "./App.css";
import { generateRandom } from "./utils/utils";
import ModalMsg from "./components/ModalMsg";

const LIMITED_TRIES = 10;
const MIN_GUESS = 1;
const MAX_GUESS = 100;

function App() {
  const [tries, setTries] = useState<number>(0);
  const [guess, setGuess] = useState<number>(0);

  const [modalMsg, setModalMsg] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const [generatedNumber, setGeneratedNumber] = useState<number>(
    generateRandom(MIN_GUESS, MAX_GUESS)
  );

  console.log(generatedNumber);

  function resetGame() {
    setTries(0);
    setShowModal(false);
    setGeneratedNumber(generateRandom(MIN_GUESS, MAX_GUESS));
  }

  function alertModal(msg: string, duration: number, callback?: () => void) {
    setModalMsg(msg);
    setShowModal(true);
    setTimeout(() => {
      setModalMsg("");
      setShowModal(false);
      callback ? callback() : {};
    }, duration);
  }

  function makeGuess() {
    if (guess <= 0) return;

    if (guess === generatedNumber) {
      win();
      return;
    }
    setTries((prev) => prev + 1);
    tries + 1 === LIMITED_TRIES ? gameOver() : {};
  }

  function win() {
    alertModal("you won", 3000);
  }

  function gameOver() {
    alertModal(`you lost, you are over ${tries + 1} tries`, 3000, resetGame);
  }

  return (
    <div className="header">
      <h1>welcome to the guessing game</h1>
      <h2>guess the number 1-100</h2>
      <h4>number of guesses: {tries}</h4>
      <ModalMsg modalMsg={modalMsg} showModal={showModal} />
      <input
        min={MIN_GUESS}
        max={MAX_GUESS}
        type="number"
        onChange={(e) => setGuess(+e.target.value)}
      />
      <button disabled={tries >= LIMITED_TRIES} onClick={makeGuess}>
        Guess
      </button>
    </div>
  );
}

export default App;
