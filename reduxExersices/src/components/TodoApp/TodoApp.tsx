import React from "react";
import "./TodoApp.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TodoItem from "../TodoItem/TodoItem";

interface TodoAppProps {}

const TodoApp: React.FC<TodoAppProps> = ({}) => {
  const { tasks: todos } = useSelector((state: RootState) => state.todos);
  return (
    <div className="TodoApp">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <h3>
        Total completed: {todos.filter((t) => t.completed).length}/
        {todos.length}
      </h3>
    </div>
  );
};

export default TodoApp;
