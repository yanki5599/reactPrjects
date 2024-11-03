import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { useGlobalTodos } from "../context/TodoContext/TodoContext";

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = () => {
  const { todos: todoList } = useGlobalTodos();

  return (
    <ul className="TodoList">
      {todoList.map((td) => (
        <TodoItem key={td.id} todo={td} />
      ))}
    </ul>
  );
};

export default TodoList;
