import { FC } from "react";
import TodoApp from "./components/TodoApp/TodoApp";
import ShoppingApp from "./components/ShoppingApp/ShoppingApp";

const App: FC = () => {
  return (
    <div>
      <h1>Main App</h1>
      {/* <TodoApp /> */}
      <ShoppingApp />
    </div>
  );
};

export default App;
