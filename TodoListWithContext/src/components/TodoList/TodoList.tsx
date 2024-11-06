import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { GlobalTodos } from "../../context/TodoContext/TodoContext";
import "./TodoList.css";

const TodoList: React.FC = () => {
  const { todos } = GlobalTodos();

  return (
    <ul className="TodoList">
      {todos.map((td) => (
        <TodoItem key={td.id} todo={td} />
      ))}
    </ul>
  );
};

export default TodoList;
