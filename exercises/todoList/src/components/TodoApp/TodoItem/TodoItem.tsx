import React from "react";
import "./TodoItem.css";
interface TodoItemProps {
  todo: string;
  done: boolean;
  changeStateFunc: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, done, changeStateFunc }) => {
  return (
    <div className="TodoItem">
      <span className="DoneMark" onClick={changeStateFunc}>
        {done ? "✅" : "❌"}
      </span>
      - {todo}
    </div>
  );
};

export default TodoItem;
