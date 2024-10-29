import { useState } from "react";
import "./App.css";
import CardList from "./components/CardList/CardList";
import ToppingRack from "./components/ToppingRack/ToppingRack";
import { PizzaTopping } from "./types/types";
import ErrorMsg from "./components/ErrorMsg/ErrorMsg";

function App() {
  const [currToppings, setCurrToppings] = useState<PizzaTopping[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  function alertErrorMsg(msg: string): void {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  }

  function addTopping(toping: PizzaTopping): void {
    if (currToppings.length === 5)
      return alertErrorMsg("You cannot pick more than 5 toppings!");

    if (currToppings.find((t) => t.name === toping.name))
      return alertErrorMsg("Topping already exist in the rack!");

    setCurrToppings((prev) => [...prev, toping]);
  }
  return (
    <>
      <CardList addToppingFunc={addTopping} />
      <ToppingRack pizzaToppings={currToppings} />
      {errorMsg != "" && <ErrorMsg msg={errorMsg} />}
    </>
  );
}

export default App;
