import { TodosProvider } from "./components/context/TodoContext/TodoContext";
import TodoApp from "./components/TodoApp/TodoApp";

function App() {
  return (
    <>
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </>
  );
}

export default App;
