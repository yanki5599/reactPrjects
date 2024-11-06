import { useState } from "react";
import style from "./CounterPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  decrement,
  increment,
  setCounter,
} from "../store/features/counter/counterSlice";

const CounterPage = () => {
  const [inputValue, setInputValue] = useState(0);
  const { counter } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  const handleSetCounter = () => {
    dispatch(setCounter({ counter: inputValue }));
  };

  return (
    <div className="Page">
      <div className={style.Counter}>
        <h3>{counter}</h3>
        <button onClick={() => dispatch(setCounter({ counter: 0 }))}>
          Reset
        </button>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(+e.target.value)}
        />
        <button onClick={handleSetCounter}>Set Counter</button>

        <div className={style.actionsContainer}>
          <button onClick={() => dispatch(decrement())}>-</button>
          <button onClick={() => dispatch(increment())}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CounterPage;
