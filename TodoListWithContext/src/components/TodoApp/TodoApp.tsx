import { FormEvent, useState } from "react";
import TodoList from "../TodoList/TodoList";
import "./TodoApp.css";
import { useGlobalTodos } from "../../context/TodoContext/TodoContext";
import GenericButton, {
  ButtonStyle,
} from "../shared/GenericButton/GenericButton";

const TodoApp = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { addTodo } = useGlobalTodos();

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addTodo({ done: false, todo: inputValue });
    setInputValue("");
  }

  return (
    <div className="todo-app">
      <form className="AddTodoForm" onSubmit={handleSubmit}>
        <h1>Todo App</h1>
        <h3>add todo</h3>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          value={inputValue}
        />
        <GenericButton
          text={"Add"}
          ButtonType={ButtonStyle.WARNING}
          style={`${inputValue.trim() ? "beat" : ""}`}
        />
      </form>
      <TodoList />
    </div>
  );
};

export default TodoApp;
