import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { useGlobalTodos } from "../context/TodoContext/TodoContext";
import "./TodoList.css";
interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = () => {
  const { todos } = useGlobalTodos();

  return (
    <ul className="TodoList">
      {todos.map((td) => (
        <TodoItem key={td.id} todo={td} />
      ))}
    </ul>
  );
};

export default TodoList;
