import React from "react";
import "./TodoItem.css";
import { useDispatch } from "react-redux";
import { Todo, toggleComplete } from "../../store/features/todos/todosSlice";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="TodoItem">
      <h1>{todo.text}</h1>
      <button onClick={() => dispatch(toggleComplete({ id: todo.id }))}>
        {todo.completed ? "✅" : "❌"}
      </button>
    </div>
  );
};

export default TodoItem;
