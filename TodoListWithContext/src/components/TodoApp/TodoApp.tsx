import { FormEvent, useEffect, useState } from "react";
import TodoList from "../TodoList/TodoList";
import "./TodoApp.css";
import {
  TodosProvider,
  useGlobalTodos,
} from "../context/TodoContext/TodoContext";

const TodoApp = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { addTodo } = useGlobalTodos();

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addTodo({ done: false, todo: inputValue });
  }

  return (
    <TodosProvider>
      <div className="todo-app">
        <form className="AddTodoForm" onSubmit={handleSubmit}>
          <h1>Todo App</h1>
          <h4>add todo</h4>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            value={inputValue}
          />
          <button type="submit">Add</button>
        </form>
        <TodoList />
      </div>
    </TodosProvider>
  );
};

export default TodoApp;
