import { FC } from "react";
import useTime from "./hooks/useTime";
import "./App.css";

const App: FC = () => {
  const { time } = useTime();

  return <div className="App">{time}</div>;
};

export default App;
