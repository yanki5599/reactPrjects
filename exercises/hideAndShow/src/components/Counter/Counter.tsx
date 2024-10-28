import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  function increase() {
    count < 10 && setCount((prev) => prev + 1);
  }
  function decrease() {
    count > -10 && setCount((prev) => prev - 1);
  }

  return (
    <div>
      <button onClick={decrease}>-</button>
      <label
        style={{ color: count < 0 ? "red" : count === 0 ? "black" : "green" }}
      >
        {count}
      </label>
      <button onClick={increase}>+</button>
    </div>
  );
};

export default Counter;
